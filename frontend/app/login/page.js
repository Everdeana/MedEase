'use client';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { VscAccount } from "react-icons/vsc";
import { CiLock } from "react-icons/ci";
import Link from 'next/link';
import Swal from 'sweetalert2';
import Reg_Top from '../components/Reg_Top';
import LoadingProcess from '../components/LoadingProcess';


function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      Swal.fire({
        icon: 'error',
        text: '아이디와 비밀번호를 모두 입력해주세요.',
      });
      return;
    }

    try {
      const response = await axios.post(
        'http://211.216.177.2:12000/api/token/',
        { username, password },
        // { withCredentials: true }
      );

      if (response.status === 200) {
        const data = response.data;
      
      // localStorage에 access 토큰과 refresh 토큰 저장
      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);


        Swal.fire({
          icon: 'success',
          text: '로그인 되었습니다!',
        }).then(() => {
          router.push('/');
        });
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorData = err.response?.data;
        let errorMessage = '다시 시도해주세요.';

        // Django 오류 메시지에 따른 처리
        if (errorData && errorData.detail) {
          if (errorData.detail.includes('활성화된')) {
            errorMessage = '사용자를 찾을 수 없습니다.';
          } else if (errorData.detail.includes('자격 증명')) {
            errorMessage = '아이디 또는 비밀번호가 잘못되었습니다.';
          } 
        }

        Swal.fire({
          icon: 'error',
          text: errorMessage,
        });
      }
    }
  };

  if (loading) {
    return <LoadingProcess />;
  }

  return (
    <>
      <Reg_Top />
      <div className="container mx-auto p-11 pt-2 ">
        <img
          src="assets/image/mainlogo.png"
          className="text-3xl font-bold mb-2 mx-auto"/>
        
        <form onSubmit={handleSubmit} >
          <div className="w-[287px] h-[41px] relative mx-auto">
            <input type='text' 
                   id="username" 
                   value={username} 
                   onChange={(e) => setUsername(e.target.value)}
                   className="pl-5 w-[287px] h-[41px] rounded-lg bg-[#f9f9f9]" />
            {!username ?
              <>
                <VscAccount
                  className="w-[22px] h-[22px] absolute left-[20px] top-[10.5px] rounded-lg object-cover"
                />
                <label htmlFor='username' className="absolute left-[50px] top-[11px] text-sm text-left text-[#7d7d7d]">
                  아이디
                </label>
              </>
              : ""}
          </div>

          <div className="w-[287px] h-[41px] mt-3 relative mx-auto">
            <input type="password" 
                   id="password" 
                   value={password} 
                   onChange={(e) => setPassword(e.target.value)} className="pl-5 w-[287px] h-[41px] rounded-lg bg-[#f9f9f9]" />
            {!password ?
              <>
                <CiLock
                  className="w-[22px] h-[22px] absolute left-[20px] top-[10.5px] rounded-lg object-cover"
                />
                <label htmlFor="password" className="absolute left-[50px] top-[11px] text-sm text-left text-[#7d7d7d]">
                  비밀번호
                </label>
              </>
              : ""}
          </div>
          <div className="w-[287px] h-[41px] mt-3 mx-auto">
            <button className="bg-gradient-to-r from-blue-300 to-purple-400 w-[287px] h-[40px] left-[px] rounded-lg">로그인</button>
          </div>

          <div className="w-[287px] h-[41px] mt-3 mx-auto">
            <button className="w-[287px] h-[40px] left-[px] rounded-lg bg-[#fddc3f] ">카카오 로그인</button>
          </div>

          <div className="w-[287px] h-[41px] mt-3 mx-auto">
            <button className="w-[287px] h-[40px] left-[px] rounded-lg bg-[#8c897b]/[0.12]">구글 로그인</button>
          </div>

          <div>
            <p className="text-sm text-left text-[#7d7d7d] mt-5 text-center">계정이 없나요? <a className="underline" href="/login/signup">
              회원가입
            </a>
            </p>
          </div>

        </form>
      </div>
    </>
    
  );
}

export default LoginForm;