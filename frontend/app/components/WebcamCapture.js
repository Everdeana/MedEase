"use client";
import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import './WebcamCapture.css';  // CSS 파일을 추가합니다.

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [capturedImageUrl, setCapturedImageUrl] = useState('');
  const [similarImageUrl, setSimilarImageUrl] = useState('');

  useEffect(() => {
    let timer;
    const startDetection = async () => {
      let secondsElapsed = 0;
      while (secondsElapsed <= 10) {  // 최대 10초 동안 얼굴을 감지하도록 설정
        await sleep(5500);  // 5.5초 대기
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
          try {
            // 이미지를 Blob 형태로 변환
            const byteCharacters = atob(imageSrc.split(',')[1]);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'image/jpeg' });

            // FormData 객체 생성
            const formData = new FormData();
            formData.append('image', blob, 'captured_face.jpg');

            // 서버로 이미지 전송
            const response = await fetch('http://localhost:12032/web/id_capture/', {
              method: 'POST',
              body: formData,
              headers: {
                'Accept': 'application/json'
              }
            });

            if (!response.ok) {
              throw new Error('이미지 업로드 실패');
            }

            const data = await response.json();
            setUploadStatus('이미지 업로드 성공');
            console.log('서버 응답:', data);
            
            // Captured and similar images URLs
            setCapturedImageUrl(data.file_url);
            setSimilarImageUrl(data.similar_image_url);

            return;  // 이미지 업로드 성공 시 반복문 종료

          } catch (error) {
            setUploadStatus('이미지 업로드 오류');
            console.error('이미지 업로드 오류:', error);
          }
        }
        secondsElapsed += 1;
      }
      // 10초 동안 얼굴을 감지하지 못한 경우
      setUploadStatus('얼굴을 감지하지 못했습니다.');
    };

    // 10초 타이머 시작
    timer = startDetection();

    return () => {
      clearInterval(timer);
    };

  }, []);

  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  return (
        <>
        <div className="bg-neutral-900">
            <div className="max-w-5xl px-4 xl:px-0 py-10 lg:pt-20 mx-auto">
            <div className="max-w-3xl mb-10 lg:mb-14 text-center">
                <h2 className="text-white font-semibold text-2xl md:text-4xl md:leading-tight">메디이즈 사용방법</h2>
                <p className="mt-1 text-neutral-400">다음은 메디이즈의 본인인증 시스템 작동방법입니다.<br></br> 아래의 가이드에 맞춰서 움직여주세요.</p>
            </div>

            <div className=" grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-5 lg:items-center ml-20 mr-10">
                {/* Removed the image here */}

                <div className="lg:col-span-1">
                <div className="mb-4">
                    <h3 className="text-xl font-medium uppercase text-[#ff0] text-center">신분 확인 단계</h3>
                </div>

                <div className="flex gap-x-5 ms-1 items-center">
                    <div className="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-4 after:w-px after:-translate-x-[0.5px] after:bg-neutral-800">
                    <div className="relative z-10 size-8 flex justify-center items-center">
                        <span className="flex flex-shrink-0 justify-center items-center size-8 border border-neutral-800 text-[#ff0] font-semibold text-xs uppercase rounded-full">1</span>
                    </div>
                    </div>
                    <div className="grow pt-0.5 pb-8 sm:pb-12">
                    <p className="text-sm lg:text-base text-neutral-400"><span className="text-white">카메라 인식 안내:</span> 환자분이 웹캠 정중앙에 오도록 안내해주세요.</p>
                    </div>
                </div>

                <div className="flex gap-x-5 ms-1 items-center">
                    <div className="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-4 after:w-px after:-translate-x-[0.5px] after:bg-neutral-800">
                    <div className="relative z-10 size-8 flex justify-center items-center">
                        <span className="flex flex-shrink-0 justify-center items-center size-8 border border-neutral-800 text-[#ff0] font-semibold text-xs uppercase rounded-full">2</span>
                    </div>
                    </div>
                    <div className="grow pt-0.5 pb-8 sm:pb-12">
                    <p className="text-sm lg:text-base text-neutral-400"><span className="text-white">웹캠 인식 과정:</span> 1초 정도 환자분이 그대로 웹캠 인식 영역에 위치하면<br></br> 인식이 됩니다.</p>
                    </div>
                </div>

                <div className="flex gap-x-5 ms-1 items-center">
                    <div className="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-4 after:w-px after:-translate-x-[0.5px] after:bg-neutral-800">
                    <div className="relative z-10 size-8 flex justify-center items-center">
                        <span className="flex flex-shrink-0 justify-center items-center size-8 border border-neutral-800 text-[#ff0] font-semibold text-xs uppercase rounded-full">3</span>
                    </div>
                    </div>
                    <div className="grow pt-0.5 pb-8 sm:pb-12">
                    <p className="text-sm md:text-base text-neutral-400"><span className="text-white">인식이 성공할 경우</span> "인식에 성공하였습니다"라는 문구가 뜰 경우,<br></br> 환자분을 진료실로 안내해주세요.</p>
                    </div>
                </div>

                <div className="flex gap-x-5 ms-1 items-center">
                    <div className="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-4 after:w-px after:-translate-x-[0.5px] after:bg-neutral-800">
                    <div className="relative z-10 size-8 flex justify-center items-center">
                        <span className="flex flex-shrink-0 justify-center items-center size-8 border border-neutral-800 text-[#ff0] font-semibold text-xs uppercase rounded-full">4</span>
                    </div>
                    </div>
                    <div className="grow pt-0.5 pb-8 sm:pb-12">
                    <p className="text-sm md:text-base text-neutral-400"><span className="text-white">인식에 실패할 경우</span> 다시 한번 시도를 해주시거나, <br></br>다시 한번 시도했을 경우에도 안될 경우엔 QR코드로 인식이 가능하니, 환자분에게 메디이즈 앱의 QR코드를 보여달라고 말씀해주세요.</p>
                    </div>
                </div>

                <a className="group inline-flex items-center gap-x-2 py-2 px-3 bg-[#ff0] font-medium text-sm text-neutral-800 rounded-full focus:outline-none mt-4 justify-center" href="#">
                    <svg className="flex-shrink-0 size-4 text-center" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    <path className="opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-hover:delay-100 transition" d="M14.05 2a9 9 0 0 1 8 7.94"></path>
                    <path className="opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition" d="M14.05 6A5 5 0 0 1 18 10"></path>
                    </svg>
                    기술문의 : 02-111-1111
                </a>
                </div>
            </div>
            </div>
        </div>

        <div className="container text-center"> {/* 가운데 정렬을 위해 text-center 클래스 추가 */}
            <h1 className="title">카메라가 얼굴을 인식하고 있습니다.</h1>
            <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="webcam"
            width={900}
            height={1001}
            />
            {uploadStatus && <p className="status">{uploadStatus}</p>}
            <h1 className="subtitle">실제 촬영된 사진입니다.</h1>
            {capturedImageUrl && <img src={`http://localhost:12032${capturedImageUrl}`} alt="Captured" className="image" />}
            <h1 className="subtitle">고객님의 신분증입니다.</h1>
            {similarImageUrl && <img src={`http://localhost:12032${similarImageUrl}`} alt="Similar" className="image" />}
        </div>
        </>
  );
};

export default WebcamCapture;
