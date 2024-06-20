"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import NavigationBar from '../components/NavigationBar'; // 파일 경로 수정
import Slider from "react-slick"; // react-slick 라이브러리 import
import "slick-carousel/slick/slick.css"; // 슬라이더 기본 CSS
import "slick-carousel/slick/slick-theme.css"; // 슬라이더 테마 CSS

export default function Home() {
    const router = useRouter()

    const handleClick = (e) => {
        e.preventDefault()
        router.push("/mypage")
    }

    const predictClick = (e) => {
        e.preventDefault()
        router.push("/prediction")
    }

    const chatbotClick = (e) => {
        e.preventDefault()
        router.push("/chatbot")
    }

    const logoutClick = (e) => {
        e.preventDefault()
        // 로그아웃 처리 로직 추가
        console.log('Logout clicked');
    }

    const profileClick = (e) => {
        e.preventDefault()
        router.push("/")
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <>
            <div className="bg-gray-100 min-h-screen">
                <header className="bg-white p-4 flex justify-between items-center border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                        <img src="/assets/image/logo.png" alt="Mediease Logo" className="h-12 w-20" />
                    </div>
                    <div className="flex items-center space-x-3">
                        {/* <span className="text-xs font-medium"></span> */}
                        <Image
                            src="/assets/image/profile.png"
                            alt="Profile Picture"
                            className="w-10 h-10 rounded-full cursor-pointer"
                            width={48}
                            height={48}
                            onClick={profileClick}
                        />
                        <button onClick={logoutClick} className="flex items-center space-x-2 bg-blue-300 text-white px-4 py-2 rounded">
                            <Image src="/assets/image/logout-icon.png" alt="Logout Icon" className="w-6 h-6" width={24} height={24} />
                            <span className="text-xs font-medium">로그아웃</span>
                        </button>
                    </div>
                </header>
                <main className="p-4 mb-16 mt-0">
                    <div className="space-y-4">
                        {/* 슬라이더 */}
                        <Slider {...settings} className="mb-8">
                            <div>
                                <Image src="/assets/image/banner1.png" alt="Slide 1" width={800} height={50} />
                            </div>
                            <div>
                                <Image src="/assets/image/banner2.png" alt="Slide 2" width={800} height={50} />
                            </div>
                            <div>
                                <Image src="/assets/image/banner3.png" alt="Slide 3" width={800} height={50} />
                            </div>
                        </Slider>

                        {/* 신분증을 눌렀을때 로그인 상태면 마이페이지 창으로 (handleClick) */}
                        <div onClick={handleClick} className="card bg-white p-8 rounded-md shadow-md flex items-center space-x-4 cursor-pointer">
                            <Image src="/assets/image/img2.png" alt="신분증 확인" className="w-20 h-12" width={55} height={48} />
                            <span className="text-lg font-medium hover:text-blue-600">신분증 확인</span>
                        </div>

                        <div onClick={predictClick} className="card bg-white p-8 rounded-md shadow-md flex items-center space-x-4 cursor-pointer">
                            <Image src="/assets/image/img3.png" alt="질병 예상 진단" className="w-12 h-12" width={48} height={48} />
                            <span className="text-lg font-medium hover:text-blue-600">질병 예상 진단</span>
                        </div>
                        <div className="card bg-white p-8 rounded-md shadow-md flex items-center space-x-4 cursor-pointer" onClick={chatbotClick}>
                            <Image src="/assets/image/img4.png" alt="챗봇 서비스" className="w-12 h-12" width={48} height={48} />
                            <span className="text-lg font-medium hover:text-blue-600">챗봇 서비스</span>
                        </div>

                        {/* 이미지 공간 */}
                        <div className="mt-4">
                            <Image src="/assets/image/banner4.png" alt="Bottom Image" width={800} height={50} />
                        </div>
                    </div>
                </main>
                {/* 하단 네비게이션 바 */}
                <NavigationBar />
            </div>
        </>
    );
}
