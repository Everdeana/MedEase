// 클라이언트 측에서 실행
"use client";

// 상태(state)와 효과(effect) 사용
import { useState, useEffect } from "react";

// HTTP 요청을 보내기 위해 axios import
import axios from 'axios';

// Next.js의 useRouter 훅을 사용하여 페이지 이동 처리
import { useRouter } from 'next/navigation';

// React와 Next.js의 Image 컴포넌트 import 
import React from 'react';
import Image from 'next/image';

// 아이콘 임포트
import { IoIosArrowBack } from "react-icons/io";
// 네비게이션 바 컴포넌트 임포트
import NavigationBar from '../../components/NavigationBar';

// LoadingProcess 컴포넌트 import(로딩중... 처리)
import LoadingProcess from "../../components/loadingProcess";

// axios 기본 URL 설정. (모든 axios 요청이 이 기본 URL을 사용)
axios.defaults.baseURL = "http://211.216.177.2:12011/api";

// Result 컴포넌트 -> default export
export default function Result() {
    // loading state 생성 후 초기값을 true로 설정
    const [loading, setLoading] = useState(true);

    // predictions state 생성 후 초기값을 빈 배열로 설정
    const [predictions, setPredictions] = useState([]);

    // advice state 생성 후 초기값을 빈 문자열로 설정
    const [advice, setAdvice] = useState("");

    // ChatGPT 답변 로딩 상태를 위한 state 생성
    const [adviceLoading, setAdviceLoading] = useState(false);

    // useRouter 훅을 사용하여 router 객체 import 
    const router = useRouter();

    // useEffect or 컴포넌트가 처음 렌더링될 때 실행되는 함수
    useEffect(() => {
        // localStorage에서 저장된 증상 데이터 가져옴
        const savedSymptoms = localStorage.getItem('selectedSymptoms');

        // 저장된 증상이 있다면
        if (savedSymptoms) {
            // JSON 문자열을 JavaScript 객체로 변환
            const symptomsList = JSON.parse(savedSymptoms);

            // 증상 데이터를 Django 서버로 전송
            axios.post('/prediction/', { symptoms: symptomsList })
                .then(response => {
                    // Django 서버로부터 받은 데이터를 콘솔에 출력
                    console.log('Data sent to Django:', response.data);

                    // 받은 예측 데이터를 상태에 저장
                    setPredictions(response.data.predictions);

                    // 예측 데이터가 있으면
                    if (response.data.predictions.length > 0) {
                        // ChatGPT 답변 로딩 시작
                        setAdviceLoading(true);

                        // 가장 높은 확률의 질병에 대한 설명을 ChatGPT API를 통해 요청
                        axios.post('/get_advice/', { disease: response.data.predictions[0].disease })
                            .then(res => {
                                // 받은 내용을 상태에 저장
                                setAdvice(res.data.advice);
                            })
                            .catch(err => {
                                // 오류가 발생하면 콘솔에 출력
                                console.error('Error getting advice from ChatGPT:', err);
                            })
                            .finally(() => {
                                // ChatGPT 답변 로딩 종료
                                setAdviceLoading(false);
                            });
                    }
                })
                .catch(error => {
                    // 오류가 발생하면 콘솔에 출력
                    console.error('Error sending data to Django:', error);
                })
                .finally(() => {
                    // 페이지 로딩 상태를 false로 설정
                    setLoading(false);
                });
        } else {
            // 페이지 로딩 상태를 false로 설정
            setLoading(false);
        }
    }, []); // 빈 배열은 이 효과가 컴포넌트가 처음 렌더링될 때만 실행된다는 뜻

    // 로딩 중일 때 로딩 화면을 표시
    if (loading || adviceLoading) {
        return <LoadingProcess />;
    }

    // 결과 화면 렌더링
    return (
        <>
            <header style={{ backgroundColor: '#53b0db', padding: '20px', color: 'white', marginBottom: '20px', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)' }}>
                <IoIosArrowBack className="mr-2 cursor-pointer" onClick={() => window.location.href = '/prediction'} /> 
                </div>
                <h1 style={{ textAlign: 'center' }} className="text-lg font-bold">예측 결과</h1>
            </header>
            <section className="bg-white p-4">
                {/* 카드 형식의 컨테이너를 생성 -> 흰색 배경에 그림자와 패딩 적용 */}
                <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6" style={{ marginBottom: '50px' }}>
                    {/* 제목 설정 */}
                    <h2 className="text-xl font-semibold mb-4 text-center">증상 예측 결과</h2>
                    <div className="text-center mb-4">
                        {/* 이미지 컴포넌트를 사용하여 로고 표시 */}
                        <Image
                            src="/assets/image/logo.png"
                            alt="바이러스 이미지"
                            width={100}
                            height={100}
                            className="mx-auto mb-4"
                        />
                        {/* 예측 결과가 있는 경우 표시 */}
                        {predictions.length > 0 && (
                            <div>
                                {/* 사용자의 예상 질병 제목 표시 */}
                                <p className="text-lg font-bold text-blue-600">유저님의 예상 질병은</p>
                                {/* 각 예측 결과를 순위와 함께 표시 */}
                                {predictions.map((prediction, index) => (
                                    <p key={index} className="text-md text-blue-500">
                                        {index + 1}순위 : {prediction.disease}, 확률: {prediction.probability}%
                                    </p>
                                ))}
                            </div>
                        )}
                        {/* ChatGPT의 답변 표시 */}
                        {advice && (
                            <div className="bg-gray-100 rounded p-4 mt-4">
                                <p className="text-lg font-semibold text-blue-600">MedEase의 조언:</p>
                                <p className="text-gray-700">{advice}</p>
                            </div>
                        )}
                    </div>
                    {/* 메시지 표시 */}
                    <p className="text-center text-gray-500 mb-4">증상이 지속되거나 악화된 경우 <br /> 의료 전문가의 상담을 받는 것이 좋아요</p>
                    {/* 병원 예약 버튼 생성 */}
                    <div className="flex justify-center mt-4">
                        <button className="py-4 px-24 text-black font-bold rounded-full bg-gradient-to-r from-blue-300 to-blue-400 shadow-lg">
                            병원 예약
                        </button>
                    </div>
                </div>
            </section>
            <NavigationBar />
        </>
    );
}
