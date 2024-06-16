// app/components/QRCodeGeneratorModal.js
import React, { useState } from 'react';
import QRCode from 'qrcode.react'; // QR 코드 생성 라이브러리

const QRCodeGeneratorModal = ({ isOpen, onClose }) => {
    const [qrData, setQrData] = useState('');

    // QR 코드 생성 함수 (가상의 데이터로 예시)
    const generateQRCode = () => {
        // 가상의 QR 코드 데이터 생성
        const data = 'https://example.com/qrcode'; // 여기에 실제 QR 코드 데이터 생성 로직을 추가할 수 있습니다.
        setQrData(data);
    };

    // 모달 닫기 및 QR 코드 초기화
    const handleClose = () => {
        setQrData('');
        onClose();
    };

    return (
        <>
            {isOpen && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50">
                    {/* 배경 */}
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-500 opacity-50"></div>
                    {/* 모달 */}
                    <div className="bg-white p-8 rounded-lg shadow-lg relative z-10 max-w-3xl mx-auto w-[50vh] mx-auto h-[80vh] flex flex-col justify-center items-center">
                        {/* 닫기 버튼 */}
                        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={handleClose}>
                            {/* Close icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        {/* QR 코드 */}
                        <div className="mb-8">
                            {qrData && <QRCode value={qrData} size={200} />}
                            {!qrData && <p className="text-lg text-gray-700">QR 코드 데이터를 생성하세요.</p>}
                        </div>
                        {/* QR 코드 생성 버튼 */}
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                            onClick={generateQRCode}
                        >
                            Generate QR Code
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default QRCodeGeneratorModal;
