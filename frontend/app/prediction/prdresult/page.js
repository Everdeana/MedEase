"use client";

import { useState, useEffect } from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';
import Image from 'next/image';
import LoadingProcess from "../../components/loadingProcess";

axios.defaults.baseURL = "http://211.216.177.2:12011/api";

export default function Result() {
    const [loading, setLoading] = useState(true);
    const [symptoms, setSymptoms] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const savedSymptoms = localStorage.getItem('selectedSymptoms');
        if (savedSymptoms) {
            const symptomsList = JSON.parse(savedSymptoms);
            setSymptoms(symptomsList);

            // 데이터를 Django 서버로 전송
            axios.post('/prediction/', { symptoms: symptomsList })
                .then(response => {
                    console.log('Data sent to Django:', response.data);
                })
                .catch(error => {
                    console.error('Error sending data to Django:', error);
                });
        }
        setLoading(false);
    }, []);

    if (loading) {
        return <LoadingProcess />;
    }

    return (
        <div className="min-h-screen bg-blue-50 flex items-center justify-center">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-center">증상 예측 결과</h2>
                <div className="text-center mb-4">
                    <Image 
                        src="/assets/image/logo.png" 
                        alt="바이러스 이미지" 
                        width={100} 
                        height={100} 
                        className="mx-auto mb-4" 
                    />
                    <p className="text-lg font-bold text-blue-600">유저님의 예상 질병은</p>
                    <p className="text-md text-blue-500">바이러스 감염일 가능성이 있습니다.</p>
                </div>
                <div className="flex justify-around mb-4">
                    <span className="text-gray-700">2순위 - 감기</span>
                    <span className="text-gray-700">3순위 - 파상풍</span>
                </div>
                <div className="mb-4">
                    <p className="text-center text-gray-700">바이러스 감염이라면 이런 활동은 피해해야 해요</p>
                    <div className="bg-gray-100 rounded p-2 mt-2">{symptoms.join(', ')}</div>
                </div>
                <div className="mb-4">
                    <p className="text-center text-gray-700">바이러스 감염에는 이런 음식이 좋아요</p>
                    <div className="bg-gray-100 rounded p-2 mt-2">비타민C</div>
                </div>
                <div className="mb-4">
                    <p className="text-center text-gray-700">바이러스 감염을 예방하는 방법</p>
                    <div className="bg-gray-100 rounded p-2 mt-2">예방법</div>
                </div>
                <p className="text-center text-gray-500 mb-4">증상이 지속되거나 악화된 경우 의료 전문가의 상담을 받는 것이 좋아요</p>
                <button className="py-4 px-24 text-black font-bold rounded-full bg-gradient-to-r from-blue-300 to-blue-400 shadow-lg">
                    병원 예약
                </button>
            </div>
        </div>
    );
}
