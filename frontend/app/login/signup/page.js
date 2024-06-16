"use client"

import Reg_Top from "../../components/Reg_Top";
import { VscAccount } from "react-icons/vsc";
import { CiLock } from "react-icons/ci";
import { FaCheckCircle } from "react-icons/fa";
import { useState } from "react";
import Swal from 'sweetalert2';

export default function SignUp() {

    const [emails, setEmails] = useState('');
    const [passwords, setPasswords] = useState('');
    const [passver, setPassver] = useState('');

    const handleEmail = (e) => {
        setEmails(e.target.value)
    };

    const handlePassword = (e) => {
        setPasswords(e.target.value)
    };

    const handlePassver = (e) => {
        setPassver(e.target.value);

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!emails || !passwords || !passver) {
            Swal.fire({
                icon: 'error',
                title: '모두 입력해주세요!',
                // text: '이메일, 비밀번호, 비밀번호 확인은 필수입니다.',
            });
            return;
        }

        if (passwords !== passver) {
            Swal.fire({
                icon: 'error',
                title: '비밀번호가 일치하지 않습니다!',
                // text: '비밀번호와 비밀번호 확인이 일치해야 합니다.',
            });
            return;
        }

        Swal.fire({
            icon: 'success',
            title: '회원가입 성공!',
            confirmButtonText: '확인',
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "/login";
            }
        });



        // TODO: 서버로 데이터 전송 및 회원가입 처리 로직 추가
        // fetch() 또는 axios 등을 사용하여 서버로 데이터를 전송할 수 있음
    };


    return (
        <>
            <Reg_Top />
            <div className="containertwo mx-auto p-11 pt-2 ">
                <img
                    src="../assets/image/mainlogo.png"
                    className="text-3xl font-bold mb-2 mx-auto"
                />
                <form onSubmit={handleSubmit} action="/register" method="post" >
                    <div className="w-[287px] h-[41px] relative mx-auto">
                        <input type='email' value={emails} onChange={handleEmail} className="w-[287px] h-[41px] rounded-lg bg-[#f9f9f9] pl-5" />
                        {!emails && (
                            <>
                                <VscAccount
                                    className="w-[22px] h-[22px] absolute left-[20px] top-[10.5px] rounded-lg object-cover"
                                />
                                <p className="absolute left-[50px] top-[11px] text-sm text-left text-[#7d7d7d]">
                                    이메일
                                </p>
                            </>
                        )}
                    </div>

                    <div className="w-[287px] h-[41px] mt-3 relative mx-auto">
                        <input id='password' value={passwords} name='password' type='password' onChange={handlePassword} className=" pl-5 w-[287px] h-[41px] rounded-lg bg-[#f9f9f9]"


                        />
                        {!passwords && (
                            <>
                                <CiLock
                                    className="w-[22px] h-[22px] absolute left-[20px] top-[10.5px] rounded-lg object-cover"
                                />
                                <p className="absolute left-[50px] top-[11px] text-sm text-left text-[#7d7d7d]">
                                    비밀번호
                                </p>
                            </>
                        )}
                    </div>

                    <div>
                        <div className="flex w-[287px] h-[41px] mt-3 relative mx-auto">
                            <input type='password' onChange={handlePassver} className="pl-5 w-[287px] h-[41px] rounded-lg bg-[#f9f9f9]" />
                            {!passver && (
                                <>
                                    <CiLock
                                        className="w-[22px] h-[22px] absolute left-[20px] top-[10.5px] rounded-lg object-cover"
                                    />
                                    <p className="absolute left-[50px] top-[11px] text-sm text-left text-[#7d7d7d]">
                                        비밀번호 확인
                                    </p>
                                </>
                            )}

                        </div>
                    </div>


                    <div className="w-[287px] h-[43px] mt-2 mx-auto pt-4">
                        <button className="bg-gradient-to-r from-blue-300 to-purple-400 w-[287px] h-[40px] left-[px] rounded-lg" >회원가입
                        </button>
                    </div>

                    <div>
                        <p class="text-sm text-left text-[#7d7d7d] mt-5 text-center pt-3">이미 계정이 있나요? <a className="underline" href="/login">
                            로그인
                        </a>
                        </p>
                    </div>

                </form>
            </div>
        </>

    );
}

