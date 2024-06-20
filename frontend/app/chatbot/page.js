
"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoIosArrowBack } from 'react-icons/io';
import Image from 'next/image';
import NavigationBar from '../components/NavigationBar';
// import styles from '/home/ai/ai/snowball/frontend/app/chatbot.module.css';
axios.defaults.baseURL = "http://211.216.177.2:12000/api";
// LoadingProcess 컴포넌트 import(로딩중... 처리)
import LoadingProcess from "../components/LoadingProcess";
const ChatBot = () => {

  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);


  // const getData = async () => {
  //   const getMsg = await axios.get("/chatbot/");
  //   console.log(getMsg.data)
  //   setData(getMsg.data)
  // };

  // useEffect(() => {
  //   getData()
  // }, []);

  // const getUserData = async () => {
  //   try {
  //     const response = await axios.get("/user/profile"); // 유저 데이터를 가져오는 API 엔드포인트
  //     setUserName(response.data.username); // 유저 데이터에서 이름 가져오기
  //   } catch (error) {
  //     console.error("유저 데이터를 불러오는데 실패했습니다:", error);
  //   }
  // };

  // useEffect(() => {
  //   getUserData();
  // }, []);
  
  useEffect(() => {
    setLoading(false);
    console.log("페이지가 로드되었습니다.");
  }, []);
  // 로딩 중일 때 로딩 화면을 표시
  if (loading) {
    return <LoadingProcess />;
  }
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f9f9f9', fontFamily: 'Arial, sans-serif' }}>
    <header style={{ backgroundColor: '#53b0db', padding: '20px', color: 'white', textAlign: 'center', display: 'flex', alignItems: 'center' }}>
        <IoIosArrowBack style={{ cursor: 'pointer', marginRight: '10px' }} onClick={() => window.location.href = '/'} />
        <h1 style={{ flex: 1, margin: 0 }}>MEDEASE CHATBOT</h1>
    </header>

    <main style={{ flex: 1, padding: '20px' }}>
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h2>Woojin님 안녕하세요! 메디이즈 챗봇입니다.</h2>
        </div>
      <iframe 
        src="http://211.216.177.2:12001/" 
        style={{ width: '100%',
                 height: '580px', 
                 border: '2px solid lightgray', 
                 borderRadius: '8px', 
                 boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                 marginTop: '30px' }}
        title="Streamlit Chatbot"
      ></iframe>
    </main>

   
        {/* 하단 네비게이션 바 */}
        <NavigationBar />

      
  </div>
);
};


export default ChatBot;