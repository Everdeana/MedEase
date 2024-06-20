'use client'; // 클라이언트 컴포넌트로 변환
import React from 'react';
import Image from 'next/image';
import NavigationBar from '../components/NavigationBar';
import { IoIosArrowBack } from 'react-icons/io'; // IoIosArrowBack 아이콘 추가

export default function Location() {
    return (
        <div className="bg-white min-h-screen p-4">
            <div className="max-w-md mx-auto">
                {/* 상단 헤더 */}
                <header style={{ backgroundColor: '#53b0db', padding: '20px', color: 'white', marginBottom: '20px', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)' }}>
                    <IoIosArrowBack className="mr-2 cursor-pointer" onClick={() =>window.location.href = '/'} /> 
                    </div>
                    <h1 style={{ textAlign: 'center' }} className="text-lg font-bold">인근 병원 검색 결과</h1>
                </header>
                {/* 사용자 정보 */}
                <div className="flex items-center mb-4 justify-center">
                    {/* 사용자 사진 */}
                    <img src="/assets/image/profile.png" alt="사용자 이미지" className="flex-grow-0 flex-shrink-0 w-[100px] h-[100px] relative overflow-hidden rounded-[48px]" />
                </div>

                {/* 추가 정보 */}
                <div className="flex items-center justify-center text-base text-center text-black mb-5 bg-orange-200 p-2 rounded-lg font-bold">
                    <Image src={'/assets/image/hospital.png'} alt="병원" width={20} height={20} className="mr-2" />
                    Woojin님 근처에는 이런 병원들이 있어요!
                    <Image src={'/assets/image/hospital.png'} alt="병원" width={20} height={20} className="ml-2" />
                </div>

                {/* 병원 정보 1 */}
                <div className="flex items-center mb-4">
                    <div className="flex-grow-0 flex-shrink-0 w-[230px] h-44 relative overflow-hidden rounded-lg bg-white border border-[#e0e0e0] mr-4 flex justify-center items-center">
                        <Image src="/assets/image/kanghan.png" alt="Hospital Image" className="w-[212px] h-[134px] object-cover" width={212} height={134} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="px-2 py-1 rounded-lg bg-white border border-[#e0e0e0] text-sm text-center text-[#333]">강한<br />내과의원</div>
                        <div className="px-2 py-1 rounded-lg bg-white border border-[#e0e0e0] text-sm text-center text-[#333]">
                            <span>서울특별시</span><br />
                            <span>서대문구<br />증가로</span>
                        </div>
                        <div className="px-2 py-1 rounded-lg bg-white border border-[#e0e0e0] text-sm text-center text-[#333]">09:00~17:30</div>
                    </div>
                </div>

                {/* 병원 정보 2 */}
                <div className="flex items-center mb-10">
                    <div className="flex-grow-0 flex-shrink-0 w-[230px] h-44 relative overflow-hidden rounded-lg bg-white border border-[#e0e0e0] mr-4 flex justify-center items-center">
                        <Image src="/assets/image/seoulchuck.PNG" alt="Hospital Image" className="w-[212px] h-[134px] object-cover" width={212} height={134} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="px-2 py-1 rounded-lg bg-white border border-[#e0e0e0] text-sm text-center text-[#333]">서울척병원</div>
                        <div className="px-2 py-1 rounded-lg bg-white border border-[#e0e0e0] text-sm text-center text-[#333]">
                            <span>서울특별시</span><br />
                            <span>마포구<br />월드컵북로</span>
                        </div>
                        <div className="px-2 py-1.5 rounded-lg bg-white border border-[#e0e0e0] text-sm text-center text-[#333]">09:00~17:30</div>
                    </div>
                </div>

                {/* 하단 네비게이션 바 */}
                <NavigationBar />
            </div>
        </div>
    );
}
