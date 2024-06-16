import React from 'react';
import Image from 'next/image';

export default function Location() {
    return (
        <div className="Location">
            <div className="bg-gray-100 min-h-screen p-4">
                <div className="max-w-md mx-auto">
                    {/* 로고 */}
                    <div className="flex justify-end mb-4">
                        <div className="flex-shrink-0 w-[60px] h-[20px]">
                            <Image src="/assets/image/logo_medi.png" alt="Mediease Logo" width={50} height={30} />
                        </div>
                    </div>

                    {/* 사용자 정보 */}
                    <p className="text-sm text-center text-black">유저님은 현재 서울 서대문구에 있어요</p>
                    <div className="flex items-center mb-4 justify-center">
                        {/* 사용자 사진 */}
                        <div className="flex-grow-0 flex-shrink-0 w-[100px] h-[100px] relative overflow-hidden rounded-[48px] bg-[#b5dbff]">
                            {/* 실제 사용자 사진이 들어갈 부분 */}
                        </div>
                    </div>

                    {/* 추가 정보 */}
                    <p className="text-base text-center text-black">김유저님 근처에는 이런 병원들이 있어요!</p>

                    {/* 병원 정보 1 */}
                    <div className="flex items-center mb-4">
                        <div className="flex-grow-0 flex-shrink-0 w-[230px] h-44 relative overflow-hidden rounded-lg bg-white border border-[#e0e0e0] mr-4 flex justify-center items-center">
                            <Image src="/assets/image/kanghan.png" alt="Hospital Image" className="w-[212px] h-[134px] object-cover" width={212} height={134} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="px-2 py-1.5 rounded-lg bg-white border border-[#e0e0e0] text-base text-center text-[#333]">강한내과의원</div>
                            <div className="px-2 py-1.5 rounded-lg bg-white border border-[#e0e0e0] text-base text-center text-[#333]">
                                <span>서울특별시</span><br />
                                <span>서대문구 증가로</span>
                            </div>
                            <div className="px-2 py-1.5 rounded-lg bg-white border border-[#e0e0e0] text-base text-center text-[#333]">09:00~17:30</div>
                        </div>
                    </div>

                    {/* 병원 정보 2 */}
                    <div className="flex items-center mb-4">
                        <div className="flex-grow-0 flex-shrink-0 w-[230px] h-44 relative overflow-hidden rounded-lg bg-white border border-[#e0e0e0] mr-4 flex justify-center items-center">
                            <Image src="/assets/image/yonsei.png" alt="Hospital Image" className="w-[212px] h-[134px] object-cover" width={212} height={134} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="px-2 py-1.5 rounded-lg bg-white border border-[#e0e0e0] text-base text-center text-[#333]">세브란스병원</div>
                            <div className="px-2 py-1.5 rounded-lg bg-white border border-[#e0e0e0] text-base text-center text-[#333]">
                                <span>서울특별시</span><br />
                                <span>서대문구 연세로</span>
                            </div>
                            <div className="px-2 py-1.5 rounded-lg bg-white border border-[#e0e0e0] text-base text-center text-[#333]">09:00~17:30</div>
                        </div>
                    </div>

                    {/* 하단 네비게이션 바 */}
                    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
                        <div className="flex justify-around p-2">
                            <div className="flex flex-col items-center">
                                <Image src="/assets/image/bar-1.png" alt="홈" width={32} height={32} />
                                <span className="text-xs">홈</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <Image src="/assets/image/bar2.png" alt="검색" width={32} height={32} />
                                <span className="text-xs">검색</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <Image src="/assets/image/bar3.png" alt="마이페이지" width={32} height={32} />
                                <span className="text-xs">마이페이지</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <Image src="/assets/image/bar4.png" alt="챗봇 서비스" width={32} height={32} />
                                <span className="text-xs">챗봇 서비스</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <Image src="/assets/image/bar5.png" alt="병원 예약" width={32} height={32} />
                                <span className="text-xs">병원 예약</span>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}
