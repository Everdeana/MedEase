"use client";
import React from 'react';
import { IoIosArrowBack } from 'react-icons/io'; // 아이콘 불러오기
import NavigationBar from '../components/NavigationBar'; // 네비게이션 바 컴포넌트 임포트

const Confirm = () => {
  // 예시 데이터
  const userData = {
    name: '강우진',
    hospital: '서울척병원',
    appointmentDate: '2024. 6. 28 11:00',
    purpose: '치료',
    symptoms: ['떨림', '오한', '피로', '고열', '기침'],
    hos_phone: '02-307-9107',
  };

  // 확인 버튼 클릭 시 처리할 함수
  const handleConfirmation = () => {
    window.location.href = '/'; // (홈으로 이동)
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white min-h-screen">
      {/* 전체 배경을 흰색으로 설정하고 최소 높이를 화면 전체로 설정 */}
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        {/* 내부 컨텐츠를 담는 박스 설정 */}
        <header style={{ backgroundColor: '#53b0db', padding: '20px', color: 'white', marginBottom: '20px', position: 'relative' }}>
          <div style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)' }}>
            <IoIosArrowBack className="mr-2 cursor-pointer" onClick={() => window.location.href='/' } /> {/* 아이콘 추가 */}
          </div>
          <h1 style={{ textAlign: 'center' }} className="text-lg font-bold">예약 확인</h1> {/* 제목 */}
        </header>
        
        {/* 안내 텍스트 */}
        <div className="bg-gray-100 p-2 rounded-md mb-4 flex items-center justify-center">
          <p className="text-center text-sm mb-0 font-semibold text-blue-500">Woojin님, 방문시 이 페이지를 의료진에게 보여주세요 :)</p>
        </div>

        {/* 사용자 정보 섹션 */}
        <div className="flex items-center mb-4">
          <img src="/assets/image/profile.png" alt="사용자 이미지" className="w-16 h-16 rounded-full mr-4" />
          <div>
            <p className="font-semibold">예약자: {userData.name}</p>
          </div>
        </div>

        {/* 예약 정보 섹션 */}
        <div className="mb-4">
          <div className="mb-2">
            <span className="font-semibold">방문 병원:</span>
            <span className="ml-2 text-gray-700">{userData.hospital}</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold">예약일:</span>
            <span className="ml-2 text-gray-700">{userData.appointmentDate}</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold">방문 목적:</span>
            <span className="ml-2 text-gray-700">{userData.purpose}</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold">증상:</span>
            <span className="ml-2 text-gray-700">{userData.symptoms.join(', ')}</span>
          </div>
        </div>

        {/* 안내 텍스트 */}
        <p className="text-gray-500 text-center mb-4">
          {userData.name}님, 혹시나 변경사항이 생겼을 경우 아래 전화번호로 연락 부탁드립니다.
        </p>

        {/* 병원 정보 섹션 */}
        <div className="bg-gray-100 p-4 rounded-md mb-4 text-center">
          <p className="font-semibold">{userData.hospital}</p>
          <p className="text-gray-700">{userData.hos_phone}</p>
        </div>

        {/* 예약 상태 */}
        <div className="bg-gray-100 p-4 rounded-md mb-4 text-center">
          <p className="font-semibold">예약 상태:</p>
          <p className="text-gray-700">완료</p>
        </div>

        {/* 안내 및 확인 버튼 */}
        <div className="text-center">
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg " onClick={handleConfirmation}>
            확인
          </button>
        </div>
      </div>
      <NavigationBar /> {/* NavigationBar 컴포넌트 추가 */}
    </div>
  );
};

export default Confirm;
