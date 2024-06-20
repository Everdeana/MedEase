
// components/IdQr.js
"use client";

import React, { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import PhotoUploadModal from './PhotoUploadModal';
import QRCodeGeneratorModal from './QRCodeGeneratorModal';
import NavigationBar from './NavigationBar';

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

  const handleUploadComplete = (file) => {
    setSelectedFile(file); // 신분증 이미지가 업로드되면 상태를 업데이트합니다.
  };

  return (
    <div className="IdQR">
      <header style={{ backgroundColor: '#53b0db', padding: '20px', color: 'white', marginBottom: '20px', position: 'relative' }}>
        <div style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)' }}>
          <IoIosArrowBack className="mr-2 cursor-pointer" onClick={() => window.location.href = '/'} />
        </div>
        <h1 style={{ textAlign: 'center' }} className="text-lg font-bold">마이 페이지</h1>
      </header>
      <div className="bg-white min-h-screen p-4">
        <div className="max-w-md mx-auto">
          {/* 사용자 정보와 사진 */}
          <div className="flex items-center mb-4 ml-10">
            {/* 왼쪽 사진 */}
            <img src="/assets/image/profile.png" alt="사용자 이미지" className="flex-grow-0 flex-shrink-0 w-[100px] h-[100px] relative overflow-hidden rounded-[48px]" />
            {/* 사용자 정보 */}
            <div className="flex justify-end w-full">
              <div className="ml-4 text-black text-center">
                <div className="mb-2">
                  <p className="text-base">남성</p>
                </div>
                <div className="mb-2">
                  <p className="text-base">22세</p>
                </div>
                <div>
                  <p className="text-lg">강우진님, 환영해요 :)</p>
                </div>
              </div>
            </div>
          </div>
          {/* 메디이즈와 함께한 날 및 기타 정보 */}
          <div className="flex flex-col justify-start items-start relative gap-4">
            {/* 핸드폰 번호 */}
            <div className="flex justify-between items-center w-full">
              <p className="text-lg text-left ml-10">핸드폰 번호</p>
              <div className="flex justify-center items-center relative gap-1 px-1 py-1 rounded-lg bg-white border border-[#E0E0E0]">
                <p className="flex-grow-0 flex-shrink-0 w-[136px] text-base text-center text-[#333]">010-2222-2222</p>
              </div>
            </div>
            {/* 메디이즈와 함께한 날 */}
            <div className="flex justify-between items-center w-full">
              <p className="text-lg text-left">메디이즈와 함께한 날</p>
              <div className="flex justify-center items-center relative gap-1 px-1 py-1 rounded-lg bg-white border border-[#E0E0E0]">
                <p className="flex-grow-0 flex-shrink-0 w-[136px] text-base text-center text-[#333]">37일</p>
              </div>
            </div>
            {/* 신분증 등록 */}
            <button onClick={toggleUploadModal}>
              <div className="flex justify-center items-center w-[350px] h-40 relative gap-1 px-1 py-1 rounded-lg bg-white border border-[#E0E0E0]">
                {/* 선택된 파일이 있다면 해당 이미지를 표시 */}
                {selectedFile ? (
                  <img src={URL.createObjectURL(selectedFile)} className="flex-grow-0 flex-shrink-0 w-auto h-auto max-h-[150px] object-cover" alt="신분증 등록" />
                ) : (
                  <img src="/assets/image/image-4.png" className="flex-grow-0 flex-shrink-0 w-auto h-auto max-h-[50px] object-cover" alt="신분증 등록" />
                )}
                <p className="flex-grow-0 flex-shrink-0 w-[150px] text-lg text-center text-[#333]">신분증 등록</p>
              </div>
            </button>
            {/* 사진 업로드 모달 */}
            <PhotoUploadModal isOpen={showUploadModal} onClose={toggleUploadModal} onUpload={handleUploadComplete} />
            {/* 얼굴 인식이 어렵다면? */}
            <div className="flex items-center">
              <p className="text-lg text-left text-black mr-2">얼굴 인식이 어렵다면?</p>
              <img src="/assets/image/arrow.png" className="flex-grow-0 flex-shrink-0 w-[15px] h-[15px] object-cover" />
              <div className="w-[50px] h-[40px] opacity-50 border-0 border-black"></div>
            </div>
            {/* QR 서비스 등록 버튼 */}
            <button onClick={toggleQRModal}>
              <div className="flex justify-center items-center w-[350px] h-10 relative gap-1 px-1 py-1 rounded-lg bg-white border border-[#E0E0E0]">
                <img src="/assets/image/image-6.png" className="flex-grow-0 flex-shrink-0 w-[20px] h-[20px] object-cover" />
                <p className="flex-grow-0 flex-shrink-0 w-[150px] text-lg text-center text-[#333]">QR서비스 등록</p>
              </div>
            </button>
            {/* QR 코드 생성 모달 */}
            <QRCodeGeneratorModal isOpen={showQRModal} onClose={toggleQRModal} />
          </div>
          {/* 하단 네비게이션 바 */}
          <NavigationBar />
        </div>
      </div>
    </div>
  );
}

export default IdQr;





// // components/IdQr.js
// "use client";
// import React, { useState } from 'react';
// import { IoIosArrowBack } from 'react-icons/io'; // IoIosArrowBack 아이콘 임포트 추가
// import Image from 'next/image';
// import PhotoUploadModal from './PhotoUploadModal'; // 경로 수정
// import QRCodeGeneratorModal from './QRCodeGeneratorModal'; // 경로 수정
// import NavigationBar from './NavigationBar';  // NavigationBar를 현재 폴더에서 가져옵니다.

// function IdQr() {
//   const [showUploadModal, setShowUploadModal] = useState(false);
//   const [showQRModal, setShowQRModal] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);

//   const toggleUploadModal = () => {
//     setShowUploadModal(!showUploadModal);
//   };

//   const toggleQRModal = () => {
//     setShowQRModal(!showQRModal);
//   };

//   const handleUploadComplete = async (file) => {
//     setSelectedFile(file);
//     const formData = new FormData();
//     formData.append('myImage', file);

//     try {
//       const response = await fetch('./idcard/idmodels/', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error('Failed to upload file');
//       }

//       const data = await response.json();
//       console.log('File uploaded successfully:', data);
//       // 서버로부터 받은 데이터를 적절히 처리하는 추가 로직을 추가할 수 있습니다.
//     } catch (error) {
//       console.error('Error uploading file:', error.message);
//       // 오류 처리 로직 추가
//     }
//   };

//   return (
//     <div className="IdQR">
//       <header style={{ backgroundColor: '#53b0db', padding: '20px', color: 'white', marginBottom: '20px', position: 'relative' }}>
//         <div style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)' }}>
//           <IoIosArrowBack className="mr-2 cursor-pointer" onClick={() =>window.location.href = '/'} /> {/* 아이콘 추가 */}
//         </div>
//         <h1 style={{ textAlign: 'center' }} className="text-lg font-bold">마이 페이지</h1>
//       </header>
//       <div className="bg-white min-h-screen p-4">
//         <div className="max-w-md mx-auto">
//           {/* 사용자 정보와 사진 */}
//           <div className="flex items-center mb-4">
//             {/* 왼쪽 사진 */}
//             <img src="/assets/image/user1.png" alt="사용자 이미지" className="flex-grow-0 flex-shrink-0 w-[100px] h-[100px] relative overflow-hidden rounded-[48px]" />
//             {/* 사용자 정보 */}
//             <div className="flex justify-end w-full">
//             <div className="ml-4 text-black text-center"> {/* text-center 클래스 추가 */}
//               <div className="mb-2">
//                 <p className="text-base ">여성</p>
//               </div>
//               <div className="mb-2">
//                 <p className="text-base ">22세</p>
//               </div>
//               <div>
//                 <p className="text-lg">김유저님, 환영해요 :)</p>
//               </div>
//             </div>
//           </div>
//           </div>
//           {/* 메디이즈와 함께한 날 및 기타 정보 */}
//           <div className="flex flex-col justify-start items-start relative gap-4">
//             {/* 핸드폰 번호 */}
//             <div className="flex justify-between items-center w-full">
//               <p className="text-lg text-left">핸드폰 번호</p>
//               <div className="flex justify-center items-center relative gap-1 px-1 py-1 rounded-lg bg-white border border-[#E0E0E0]">
//                 <p className="flex-grow-0 flex-shrink-0 w-[136px] text-base text-center text-[#333]">010-2222-2222</p>
//               </div>
//             </div>
//             {/* 메디이즈와 함께한 날 */}
//             <div className="flex justify-between items-center w-full">
//               <p className="text-lg text-left">메디이즈와 함께한 날</p>
//               <div className="flex justify-center items-center relative gap-1 px-1 py-1 rounded-lg bg-white border border-[#E0E0E0]">
//                 <p className="flex-grow-0 flex-shrink-0 w-[136px] text-base text-center text-[#333]">37일</p>
//               </div>
//             </div>
//             {/* 신분증 확인 */}
//             <div className="flex justify-between items-center w-full">
//               <p className="text-lg text-left">신분증 확인</p>
//               <div className="flex justify-center items-center relative gap-1 px-1 py-1 rounded-lg bg-white border border-[#E0E0E0]">
//                 {/* 여기에 신분증 확인 내용 추가 */}
//               </div>
//             </div>
//             {/* 신분증 등록 */}
//             <button onClick={toggleUploadModal}>
//               <div className="flex justify-center items-center w-[350px] h-40 relative gap-1 px-1 py-1 rounded-lg bg-white border border-[#E0E0E0]">
//                 <img src="/assets/image/image-4.png" className="flex-grow-0 flex-shrink-0 w-[100px] h-[50px] object-cover" alt="신분증 등록" />
//                 <p className="flex-grow-0 flex-shrink-0 w-[100px] text-lg text-center text-[#333]">신분증 등록</p>
//               </div>
//             </button>
//             {/* 사진 업로드 모달 */}
//             <PhotoUploadModal isOpen={showUploadModal} onClose={toggleUploadModal} onUpload={handleUploadComplete} />
//             {/* 얼굴 인식이 어렵다면? */}
//             <div className="flex items-center">
//               <p className="text-lg text-left text-black mr-2">얼굴 인식이 어렵다면?</p>
//               <img src="/assets/image/arrow.png" className="flex-grow-0 flex-shrink-0 w-[15px] h-[15px] object-cover" />
//               <div className="w-[50px] h-[40px] opacity-50 border-0 border-black"></div>
//             </div>
//             {/* QR 서비스 등록 버튼 */}
//             <button onClick={toggleQRModal}>
//               <div className="flex justify-center items-center w-[350px] h-10 relative gap-1 px-1 py-1 rounded-lg bg-white border border-[#E0E0E0]">
//                 <img src="/assets/image/image-6.png" className="flex-grow-0 flex-shrink-0 w-[20px] h-[20px] object-cover" />
//                 <p className="flex-grow-0 flex-shrink-0 w-[150px] text-lg text-center text-[#333]">QR서비스 등록</p>
//               </div>
//             </button>
//             {/* QR 코드 생성 모달 */}
//             <QRCodeGeneratorModal isOpen={showQRModal} onClose={toggleQRModal} />
//           </div>
//           {/* 하단 네비게이션 바 */}
//           <NavigationBar />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default IdQr;
