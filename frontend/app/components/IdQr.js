// app/components/IdQr.js
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import PhotoUploadModal from './PhotoUploadModal'; // 경로 수정
import QRCodeGeneratorModal from './QRCodeGeneratorModal'; // 경로 수정




function IdQr() {
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showQRModal, setShowQRModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const toggleUploadModal = () => {
        setShowUploadModal(!showUploadModal);
    };

    const toggleQRModal = () => {
        setShowQRModal(!showQRModal);
    };


    const handleUploadComplete = async (file) => {
        setSelectedFile(file);

        const formData = new FormData();
        formData.append('myImage', file);

        try {
            const response = await fetch('./idcard/idmodels/', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload file');
            }

            const data = await response.json();
            console.log('File uploaded successfully:', data);
            // 서버로부터 받은 데이터를 적절히 처리하는 추가 로직을 추가할 수 있습니다.
        } catch (error) {
            console.error('Error uploading file:', error.message);
            // 오류 처리 로직 추가
        }
    };



    return (
        <div className="IdQR">
            <div className="bg-gray-100 min-h-screen p-4">
                <div className="max-w-md mx-auto">
                    {/* 로고 */}
                    <div className="flex justify-end mb-4">
                        <div className="flex-shrink-0 w-[60px] h-[20px]">
                            <Image src="/assets/image/logo_medi.png" alt="Mediease Logo" width={50} height={30} />
                        </div>
                    </div>

                    {/* 사용자 정보와 사진 */}
                    <div className="flex items-center mb-4">
                        {/* 왼쪽 사진 */}
                        <div className="flex-grow-0 flex-shrink-0 w-[100px] h-[100px] relative overflow-hidden rounded-[48px] bg-[#b5dbff]"></div>
                        {/* 사용자 정보 */}
                        <div className="ml-4 text-black">
                            <div className="mb-2">
                                <p className="text-base text-right">여성</p>
                            </div>
                            <div className="mb-2">
                                <p className="text-base text-right">22세</p>
                            </div>
                            <div>
                                <p className="text-base text-right">김유저님, 환영해요 :)</p>
                            </div>
                        </div>
                    </div>

                    {/* 메디이즈와 함께한 날 및 기타 정보 */}
                    <div className="flex flex-col justify-start items-start relative gap-4">
                        {/* 핸드폰 번호 */}
                        <div className="flex justify-between items-center w-full">
                            <p className="text-base text-left">핸드폰 번호</p>
                            <div className="flex justify-center items-center relative gap-1 px-1 py-1 rounded-lg bg-white border border-[#e0e0e0]">
                                <p className="flex-grow-0 flex-shrink-0 w-[136px] text-base text-center text-[#333]">010-2222-2222</p>
                            </div>
                        </div>

                        {/* 메디이즈와 함께한 날 */}
                        <div className="flex justify-between items-center w-full">
                            <p className="text-base text-left">메디이즈와 함께한 날</p>
                            <div className="flex justify-center items-center relative gap-1 px-1 py-1 rounded-lg bg-white border border-[#e0e0e0]">
                                <p className="flex-grow-0 flex-shrink-0 w-[136px] text-base text-center text-[#333]">37일</p>
                            </div>
                        </div>

                        {/* 신분증 확인 */}
                        <div className="flex justify-between items-center w-full">
                            <p className="text-base text-left">신분증 확인</p>
                            <div className="flex justify-center items-center relative gap-1 px-1 py-1 rounded-lg bg-white border border-[#e0e0e0]">
                                <p className="flex-grow-0 flex-shrink-0 w-[136px] text-base text-center text-[#333]">정회원</p>
                            </div>
                        </div>

                        {/* 신분증 등록 */}
                        <button onClick={toggleUploadModal}>
                            <div className="flex justify-center items-center w-[350px] h-40 relative gap-1 px-1 py-1 rounded-lg bg-white border border-[#e0e0e0]">
                                <img src="/assets/image/image-4.png" className="flex-grow-0 flex-shrink-0 w-[100px] h-[50px] object-cover" alt="신분증 등록" />
                                <p className="flex-grow-0 flex-shrink-0 w-[100px] text-lg text-center text-[#333]">신분증 등록</p>
                            </div>
                        </button>

                        {/* 사진 업로드 모달 */}
                        <PhotoUploadModal isOpen={showUploadModal} onClose={toggleUploadModal} onUpload={handleUploadComplete} />

                        {/* 얼굴 인식이 어렵다면? */}
                        <div className="flex items-center">
                            <p className="text-[15px] text-left text-black mr-2">얼굴 인식이 어렵다면?</p>
                            <img src="/assets/image/arrow.png" className="flex-grow-0 flex-shrink-0 w-[15px] h-[15px] object-cover" />
                            <div className="w-[50px] h-[40px] opacity-50 border-0 border-black"></div>
                        </div>

                        {/* QR 서비스 등록 버튼 */}
                        <button onClick={toggleQRModal}>
                            <div className="flex justify-center items-center w-[350px] h-10 relative gap-1 px-1 py-1 rounded-lg bg-white border border-[#e0e0e0]">
                                <img src="/assets/image/image-6.png" className="flex-grow-0 flex-shrink-0 w-[20px] h-[20px] object-cover" />
                                <p className="flex-grow-0 flex-shrink-0 w-[150px] text-lg text-center text-[#333]">QR서비스 등록</p>
                            </div>
                        </button>

                        {/* QR 코드 생성 모달 */}
                        <QRCodeGeneratorModal isOpen={showQRModal} onClose={toggleQRModal} />

                    </div>

                    {/* 하단 네비게이션 바 */}
                    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
                        <div className="max-w-md mx-auto">
                            <p className="text-center text-gray-500 text-sm">&copy; 2024 Mediease. All rights reserved.</p>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}

export default IdQr;
