'use client';

import axios from 'axios';
import { VscAccount } from "react-icons/vsc";
import { CiLock } from "react-icons/ci";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import Reg_Top from '@/app/components/Reg_Top';
import { useRouter } from "next/navigation";


export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState(null);
  const [csrfToken, setCsrfToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const csrfResponse = await fetch('/api/csrf', { credentials: 'include' });
  

        if (!csrfResponse.ok) {
          throw new Error('CSRF 토큰을 가져오는 데 실패했습니다.'); 
        }

        const csrfData = await csrfResponse.json();
        setCsrfToken(csrfData.csrfToken);
      } catch (error) {
        console.error('CSRF 토큰 오류:', error);
        setError('CSRF 토큰을 가져오는 중 오류가 발생했습니다.');
      }
    };

    fetchCsrfToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password || !password2) {
      Swal.fire({
        icon: 'error',
        title: '모두 입력해주세요!',
      });
      return;
    }

    if (password !== password2) {
      Swal.fire({
        icon: 'error',
        title: '비밀번호가 일치하지 않습니다!',
      });
      return;
    }

    try {
      const response = await axios.post(
        'http://211.216.177.2:12000/api/register/',
        { username, password, password2,},
        {
          headers: {
            'X-CSRFToken': csrfToken,
          },
          // withCredentials: true, // 쿠키 전송 허용
    
        }
      );

      console.log('Response:', response);
      Swal.fire({
        icon: 'success',
        title: '회원가입 성공!',
      }).then(() => {
        router.push('/login');
      });
      setError(null); 
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorData = err.response?.data;
  
        
        if (errorData && errorData.error && errorData.error.username) {
          Swal.fire({
            icon: 'error',
            text: errorData.error.username[0], 
          });
        } 
  
       
        else if (errorData && errorData.error && errorData.error.password) {
          Swal.fire({
            icon: 'error',
            text: errorData.error.password[0], 
          });
        } 
  
        // 기타 오류 처리
        else {
          Swal.fire({
            icon: 'error',
            text: '알 수 없는 오류가 발생했습니다.',
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          text: '알 수 없는 오류가 발생했습니다.',
        });
      }
    }
  };

    return (
      <>
      <Reg_Top />
      <div className="containertwo mx-auto p-11 pt-2 ">
      <img
        src="../assets/image/mainlogo.png"
        className="text-3xl font-bold mb-2 mx-auto"
      />
      <form onSubmit={handleSubmit}>
        <div className="w-[287px] h-[41px] relative mx-auto"> 
          <input type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-[287px] h-[41px] rounded-lg bg-[#f9f9f9] pl-5"/>
          {!username && ( 
          <>
            <VscAccount
            className="w-[22px] h-[22px] absolute left-[20px] top-[10.5px] rounded-lg object-cover"
            />
            <label htmlFor='username' className="absolute left-[50px] top-[11px] text-sm text-left text-[#7d7d7d]">
              아이디
            </label>
          </>
          )}
        </div>

        <div className="w-[287px] h-[41px] mt-3 relative mx-auto"> 
          <input 
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          className=" pl-5 w-[287px] h-[41px] rounded-lg bg-[#f9f9f9]"
          />
          {!password && (
          <>
          <CiLock
            className="w-[22px] h-[22px] absolute left-[20px] top-[10.5px] rounded-lg object-cover"
          />
          <label htmlFor="password"  className="absolute left-[50px] top-[11px] text-sm text-left text-[#7d7d7d]">
            비밀번호
          </label>
          </>
          )}
        </div>
        
        <div>
        <div className="flex w-[287px] h-[41px] mt-3 relative mx-auto"> 
          <input 
          type="password"
          id="password2"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)} 
          className="pl-5 w-[287px] h-[41px] rounded-lg bg-[#f9f9f9]" />
          {!password2 && (
          <>
          <CiLock
            className="w-[22px] h-[22px] absolute left-[20px] top-[10.5px] rounded-lg object-cover"
          />
          <label htmlFor='password2' className="absolute left-[50px] top-[11px] text-sm text-left text-[#7d7d7d]">
            비밀번호 확인
          </label>
          </>
          )}
          
        </div>
        </div>

        <div className="w-[287px] h-[43px] mt-2 mx-auto pt-4">
        <button className="bg-gradient-to-r from-blue-300 to-purple-400 w-[287px] h-[40px] left-[px] rounded-lg" >회원가입
        </button>
        </div>

        <div>
        <p className="text-sm text-left text-[#7d7d7d] mt-5 text-center pt-3">이미 계정이 있나요? <a className="underline" href="/login">
          로그인
        </a>
        </p>
        </div>
      </form>
      </div>
      </>
      
  );
}
