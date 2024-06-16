"use client"

import Reg_Top from "../components/Reg_Top";
import { VscAccount } from "react-icons/vsc";
import { CiLock } from "react-icons/ci";
import { useState } from "react";
import Link from 'next/link'

export default function Login() {
    const [emails, setEmails] = useState('');
    const [passwords, setPasswords] = useState('');

    const handleEmail = (e) => {
        setEmails(e.target.value)
    }

    const handlePassword = (e) => {
        setPasswords(e.target.value)
    }

    return (
        <>
            <Reg_Top />
            <div className="container mx-auto p-11 pt-2 ">
                <img
                    src="assets/image/mainlogo.png"
                    className="text-3xl font-bold mb-2 mx-auto"
                />
                <form action="/register" method="post" >
                    <div className="w-[287px] h-[41px] relative mx-auto">
                        <input type='email' onChange={handleEmail} className="pl-5 w-[287px] h-[41px] rounded-lg bg-[#f9f9f9]" />
                        {!emails ?
                            <>
                                <VscAccount
                                    className="w-[22px] h-[22px] absolute left-[20px] top-[10.5px] rounded-lg object-cover"
                                />
                                <p className="absolute left-[50px] top-[11px] text-sm text-left text-[#7d7d7d]">
                                    이메일
                                </p>
                            </>
                            : ""}
                    </div>

                    <div className="w-[287px] h-[41px] mt-3 relative mx-auto">
                        <input type='password' onChange={handlePassword} className="pl-5 w-[287px] h-[41px] rounded-lg bg-[#f9f9f9]" />
                        {!passwords ?
                            <>
                                <CiLock
                                    className="w-[22px] h-[22px] absolute left-[20px] top-[10.5px] rounded-lg object-cover"
                                />
                                <p className="absolute left-[50px] top-[11px] text-sm text-left text-[#7d7d7d]">
                                    비밀번호
                                </p>
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
                        <p class="text-sm text-left text-[#7d7d7d] mt-5 text-center">계정이 없나요? <a className="underline" href="/login/signup">
                            회원가입
                        </a>
                        </p>
                    </div>

                </form>
            </div>
        </>
    );
}