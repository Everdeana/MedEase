"use client";

import { useState } from "react";
import Swal from "sweetalert2";

export default function Home() {
    const messageClick = () => {
        // 선택된 증상 데이터 수집
        const selectedSymptoms = [];
        document.querySelectorAll(".form-checkbox:checked").forEach((checkbox) => {
            selectedSymptoms.push(checkbox.nextElementSibling.textContent);
        });

        // Django 서버로 데이터 전송 (Next.js 프록시 경유)
        fetch('/api/prediction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ symptoms: selectedSymptoms }),
        })
        .then(response => response.json())
        .then(data => {
            Swal.fire({
                title: "Success",
                text: "Data sent successfully!",
                icon: "success",
            });
        })
        .catch(error => {
            Swal.fire({
                title: "Error",
                text: "Failed to send data",
                icon: "error",
            });
        });
    };

    const [showSymptoms, setShowSymptoms] = useState({
        whole_body: false,
        skin: false,
        digestive: false,
        respiratory: false,
        urinary: false,
        nervous: false,
        musculoskeletal: false,
    });

    const [showMore, setShowMore] = useState({
        whole_body: false,
        skin: false,
        digestive: false,
        respiratory: false,
        urinary: false,
        nervous: false,
        musculoskeletal: false,
    });

    const toggleSymptoms = (category) => {
        setShowSymptoms((prev) => ({
            ...prev,
            [category]: !prev[category],
        }));
    };

    const toggleMore = (category) => {
        setShowMore((prev) => ({
            ...prev,
            [category]: !prev[category],
        }));
    };

    return (
        <>
            <section className="bg-gray-100 p-4">
                <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4 text-center">증상 선택</h2>
                    <p className="text-gray-700 mb-4 text-center">
                        안녕하세요! 유저님
                        <br />
                        혹시 어디가 아프실까요?
                    </p>
                    <p className="text-green-600 mb-4 text-center">
                        아프신 곳을 선택해주세요.
                        <br />
                        (중복 선택이 가능합니다.)
                    </p>

                    <div className="overflow-y-auto max-h-100">
                        <div className="space-y-4">
                            {[
                                { category: "whole_body", title: "전신 증상", symptoms: ["떨림", "오한", "피로", "체중 증가", "불안", "손발이 차가움", "체중 감소", "무기력", "복부 팽만", "고열", "발한", "빠른 심박수", "탈수"], img: "assets/image/symtom/body.png" },
                                { category: "skin", title: "피부 관련 증상", symptoms: ["가려움", "피부에 붉은 반점", "목의 반점", "피부 벗겨짐", "손톱의 작은 홈", "물집", "얼굴 및 눈의 부종", "멍", "황달"], img: "assets/image/symtom/face.png" },
                                { category: "digestive", title: "소화기계 관련 증상", symptoms: ["복통", "혀의 궤양", "구토", "변비", "복부 통증", "설사", "소화 불량", "메스꺼움", "식욕 감퇴", "복부 팽만", "복통", "불규칙한 혈당 수치", "비만", "과도한 식욕"], img: "assets/image/symtom/stomach.png" },
                                { category: "respiratory", title: "호흡기계 관련 증상", symptoms: ["계속되는 재채기", "숨 가쁨", "기침", "고열", "가래", "콧물", "충혈", "흉통", "점액성 가래", "객혈"], img: "assets/image/symtom/lungs.png" },
                                { category: "urinary", title: "비뇨기계 관련 증상", symptoms: ["배뇨 시 작열감", "소변에 혈점", "탈수", "짙은 소변", "황색 소변", "방광 불편감", "심한 소변 냄새", "지속적인 배뇨감", "다뇨"], img: "assets/image/symtom/kidneys.png" },
                                { category: "nervous", title: "신경계 관련 증상", symptoms: ["두통", "어지럼증", "경련", "시야 흐림 및 왜곡", "시각 장애", "균형 상실", "의식 변화", "후각 상실", "집중력 부족"], img: "assets/image/symtom/brain.png" },
                                { category: "musculoskeletal", title: "근골격계 관련 증상", symptoms: ["관절통", "요통", "목 통증", "무릎 통증", "고관절 통증", "관절 부종", "배변 시 통증", "항문 부위 통증"], img: "assets/image/symtom/bone.png" },
                            ].map((section) => (
                                <div key={section.category} className="flex flex-col space-y-2 border border-gray-200 p-4 rounded-md">
                                    <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSymptoms(section.category)}>
                                        <div className="flex items-center space-x-4">
                                            <img src={section.img} width="50" height="50" alt={`${section.title} 이미지`} />
                                            <h3 className="font-semibold">{section.title}</h3>
                                        </div>
                                        <span>{showSymptoms[section.category] ? "▲" : "▼"}</span>
                                    </div>
                                    <div className={`grid grid-cols-2 gap-2 transition-all duration-500 ease-in-out overflow-hidden ${showSymptoms[section.category] ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                        {section.symptoms.slice(0, 6).map((symptom) => (
                                            <label key={symptom} className="flex items-center space-x-2">
                                                <input type="checkbox" className="form-checkbox" />
                                                <span>{symptom}</span>
                                            </label>

                                        ))}
                                    </div>

                                    {showSymptoms[section.category] && section.symptoms.length > 6 && (
                                        <div className="mt-2">
                                            <div className="flex justify-center cursor-pointer" onClick={() => toggleMore(section.category)}>
                                                <span className="bg-gray-100 rounded-full px-4 py-1 shadow">{showMore[section.category] ? "접기 ▲" : "더 보기 ▼"}</span>
                                            </div>
                                            <div className={`grid grid-cols-2 gap-2 mt-2 transition-all duration-500 ease-in-out overflow-hidden ${showMore[section.category] ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                                {section.symptoms.slice(6).map((symptom) => (
                                                    <label key={symptom} className="flex items-center space-x-2">
                                                        <input type="checkbox" className="form-checkbox" />
                                                        <span>{symptom}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-center mt-4">
                        <button className="py-4 px-24 text-black font-bold rounded-full bg-gradient-to-r from-blue-300 to-blue-400 shadow-lg" onClick={messageClick}>
                            선택 완료
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}
