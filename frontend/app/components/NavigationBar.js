"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter } from "next/navigation";

const NavigationBar = () => {
    const router = useRouter()
    const handleNavigation = (url) => {
        window.location.href = url;
    };

    const handleClick = (e) => {
        e.preventDefault();
      
        const token = localStorage.getItem('accessToken');
      
        if (token) {
          router.push('/mypage');
        } else {
          router.push('/login');
        }
      }; 
      const handleClick1 = (e) => {
        e.preventDefault();
      
        const token = localStorage.getItem('accessToken');
      
        if (token) {
          router.push('/reservation');
        } else {
          router.push('/login');
        }
      }; 

      



    return (
        <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
            <div className="flex justify-around p-2">
                <div
                    className="flex flex-col items-center cursor-pointer hover:text-blue-500"
                    onClick={() => handleNavigation('/')}
                >
                    <Image src="/assets/image/bar-1.png" alt="홈" width={32} height={32} />
                    <span className="text-xs font-bold">홈</span>
                </div>
                <div
                    className="flex flex-col items-center cursor-pointer hover:text-blue-500"
                    onClick={() => handleNavigation('/Location')}
                >
                    <Image src="/assets/image/bar2.png" alt="검색" width={32} height={32} />
                    <span className="text-xs font-bold">검색</span>
                </div>
                <div
                    className="flex flex-col items-center cursor-pointer hover:text-blue-500"
                    onClick={handleClick}
                >
                    <Image src="/assets/image/bar3.png" alt="마이페이지" width={32} height={32} />
                    <span className="text-xs font-bold">마이페이지</span>
                </div>
                <div
                    className="flex flex-col items-center cursor-pointer hover:text-blue-500"
                    onClick={() => handleNavigation('/chatbot')}
                >
                    <Image src="/assets/image/bar4.png" alt="챗봇 서비스" width={32} height={32} />
                    <span className="text-xs font-bold">챗봇 서비스</span>
                </div>
                <div
                    className="flex flex-col items-center cursor-pointer hover:text-blue-500"
                    onClick={handleClick1}
                >
                    <Image src="/assets/image/bar5.png" alt="예약 확인" width={32} height={32} />
                    <span className="text-xs font-bold">예약 확인</span>
                </div>
            </div>
        </footer>
    );
};

export default NavigationBar;
