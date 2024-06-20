'use client'; // 클라이언트 컴포넌트로 변환

import React, { useState } from 'react'; // React 및 useState 훅을 임포트
import { IoIosArrowBack } from 'react-icons/io'; // IoIosArrowBack 아이콘 임포트
import { useRouter } from 'next/navigation'; // Next.js 라우터 훅 임포트
import NavigationBar from '../components/NavigationBar'; // 네비게이션 바 컴포넌트 임포트

const UserClient = () => {
  const router = useRouter(); // 라우터 훅 초기화
  const [selectedHospital, setSelectedHospital] = useState(null); // 선택된 병원을 상태로 관리

  // 뒤로 가기 버튼 클릭 핸들러
  const handleBackClick = () => {
    router.push('/reservation'); // '/reservation' 페이지로 이동
  };

  // 병원 선택 버튼 클릭 핸들러
  const handleSelectHospitalClick = () => {
    if (selectedHospital) {
      // 선택된 병원이 있을 경우 로컬 스토리지에 병원 정보 저장
      localStorage.setItem('selectedHospitalImage', selectedHospital.image);
      localStorage.setItem('selectedHospitalName', selectedHospital.name);
      router.push('/reservation'); // '/reservation' 페이지로 이동
    } else {
      alert("병원을 선택해주세요."); // 선택된 병원이 없을 경우 알림 표시
    }
  };

  // 병원 이미지 클릭 핸들러
  const handleImageClick = (hospital) => {
    setSelectedHospital(hospital); // 선택된 병원을 상태로 업데이트
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white min-h-screen">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center mb-4 relative" style={{ backgroundColor: '#53b0db', padding: '10px', borderRadius: '5px' }}>
          {/* 뒤로 가기 아이콘 */}
          <IoIosArrowBack className="absolute left-0 cursor-pointer text-white" onClick={handleBackClick} />
          <div className="w-full text-center">
            <h2 className="text-lg font-bold text-white">병원 예약</h2> {/* 제목 */}
          </div>
        </div>
        <div className="text-center text-2xl text-blue-500 mt-10 font-bold mb-4">Woojin님에게 추천하는 병원은</div>
        
        {/* 첫 번째 병원 정보 */}
        <div className={`mb-6 ${selectedHospital?.name === '서울척병원' ? 'border-orange-500 border-4' : ''}`} onClick={() => handleImageClick({name: '서울척병원', image: 'https://ujb.seoulchuk.com/source/images/mo/hospital/img_hi2.jpg'})}>
          <img src="https://ujb.seoulchuk.com/source/images/mo/hospital/img_hi2.jpg" alt="병원 이미지" className="w-full h-32 object-contain rounded-md mb-2 cursor-pointer"/>
          <div className="text-center text-lg font-semibold mb-2">서울척병원</div>
          <div className="text-center text-gray-500 mb-1">토 휴무</div>
          <div className="text-center text-gray-500 mb-1">02-307-9107</div>
          <div className="text-center text-gray-500 mb-1">내과전문의</div>
          <div className="text-center text-gray-500 mb-1">서울특별시 마포구 월드컵북로 224</div>
          <div className="text-center text-gray-500 mb-1">운영 :08:00~18:00</div>
          <div className="text-center text-gray-500 mb-1">점심 : 13:00-14:00</div>
        </div>

        {/* 두 번째 병원 정보 */}
        <div className={`mb-6 ${selectedHospital?.name === '서울대병원' ? 'border-orange-500 border-4' : ''}`} onClick={() => handleImageClick({name: '서울대병원', image: 'https://www.snuh.org/asset/img/about/img_identity01_hi.jpg'})}>
          <img src="https://www.snuh.org/asset/img/about/img_identity01_hi.jpg" alt="병원 이미지" className="w-full h-32 object-contain rounded-md mb-2 cursor-pointer"/>
          <div className="text-center text-lg font-semibold mb-2">서울대병원</div>
          <div className="text-center text-gray-500 mb-1">일 휴무</div>
          <div className="text-center text-gray-500 mb-1">02-307-9107</div>
          <div className="text-center text-gray-500 mb-1">내과전문의</div>
          <div className="text-center text-gray-500 mb-1">서울특별시 마포구 월드컵북로 224</div>
          <div className="text-center text-gray-500 mb-1">운영 :08:00~18:00</div>
          <div className="text-center text-gray-500 mb-1">점심 : 13:00-14:00</div>
        </div>
        
        {/* 병원 선택하기 버튼 */}
        <div className="text-center mt-6">
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mb-10" onClick={handleSelectHospitalClick}>
            병원 선택하기
          </button>
        </div>
      </div>
      <NavigationBar /> {/* 네비게이션 바 컴포넌트 */}
    </div>
  );
};

export default UserClient;
