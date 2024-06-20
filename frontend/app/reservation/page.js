"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoIosArrowBack } from "react-icons/io";
import Swal from 'sweetalert2';
import NavigationBar from '../components/NavigationBar';

const HospitalReservation = () => {
  const [hospitalName, setHospitalName] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [symptoms, setSymptoms] = useState([]);
  const [hospitalImage, setHospitalImage] = useState('');

  useEffect(() => {
    const fetchReservationData = async () => {
      try {
        const response = await axios.get('/api/reservation');
        const data = response.data;
        setHospitalName(data.hospitalName);
        setAppointmentDate(data.appointmentDate);
        setSymptoms(data.symptoms);
      } catch (error) {
        console.error('Error fetching reservation data:', error);
      }
    };
    fetchReservationData();

    const selectedHospitalImage = localStorage.getItem('selectedHospitalImage');
    const selectedHospitalName = localStorage.getItem('selectedHospitalName');
    if (selectedHospitalImage && selectedHospitalName) {
      setHospitalImage(selectedHospitalImage);
      setHospitalName(selectedHospitalName);
    }
  }, []);

  const handleBackClick = () => {
    window.location.href = '/';
  };

  const handleConfirmClick = () => {
    Swal.fire({
      title: '<span style="font-size: 24px;">병원 예약을 하시겠습니까?</span>',
      showCancelButton: true,
      cancelButtonText: '아니오',
      confirmButtonText: '예',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '/confirm';
      }
    });
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
        <p className="text-center text-gray-700">Woojin님이 선택하신 병원은</p>
        <div className="flex justify-center my-4">
          <img
            src={hospitalImage || "https://www.xn--vb0bn4ez00az8aj4j.kr/data/widget/img/main/mobile/st1_bn06.jpg"}
            alt="병원 이미지"
            className="w-60 h-60 object-contain rounded-md"
          />
        </div>
        <p className="text-center text-gray-700 font-semibold">{hospitalName}</p>
        <p className="text-center font-semibold text-blue-500 mb-6">의료진들이 Woojin님을 진료하기 위해 기다리고 있어요!</p>
        <div className="bg-gray-100 p-4 rounded-md mb-4">
          <p className="text-gray-700 text-center">예약일시 : 2024.06.28 11:00 </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-md mb-4 w-full">
          <p className="text-gray-700 text-center">선택해주신 증상</p>
        </div>
        <div className="bg-white border border-gray-300 p-4 rounded-md mb-4">
          <p className="text-gray-700 text-center">떨림,오한,피로,고열,기침</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-md mb-20">
          <p className="text-gray-700 text-center">예약 상태 : 진행중</p>
        </div>
        <div className="text-center mt-6">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
            onClick={handleConfirmClick}
          >
            확인
          </button>
        </div>
      </div>
      <NavigationBar /> {/* NavigationBar 컴포넌트 추가 */}
    </div>
  );
};

export default HospitalReservation;
