
"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import styles from '/home/ai/ai/snowball/frontend/app/chatbot.module.css';
axios.defaults.baseURL = "http://211.216.177.2:12000/api";

const ChatBot = () => {

    const [data, setData] = useState('');

    const getData = async () => {
        const getMsg = await axios.get("/chatbot/");
        console.log(getMsg.data)
        setData(getMsg.data)
    };

    useEffect(() => {
        getData()
    }, []);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>MEDEASE CHATBOT</h1>
            </header>

            <main className={styles.main}>
                <p className={styles.introText}>{data}</p>

                <iframe
                    src="http://localhost:8501"
                    className={styles.iframe}
                    title="Streamlit Chatbot"
                ></iframe>
            </main>

            <footer className={styles.footer}>
                <div className={styles.footerNav}>
                    <div className={styles.navItem}>
                        <Image src="/assets/image/bar-1.png" alt="홈" width={32} height={32} />
                        <span className={styles.navText}>홈</span>
                    </div>
                    <div className={styles.navItem}>
                        <Image src="/assets/image/bar2.png" alt="검색" width={32} height={32} />
                        <span className={styles.navText}>검색</span>
                    </div>
                    <div className={styles.navItem}>
                        <Image src="/assets/image/bar3.png" alt="마이페이지" width={32} height={32} />
                        <span className={styles.navText}>마이페이지</span>
                    </div>
                    <div className={styles.navItem}>
                        <Image src="/assets/image/bar4.png" alt="챗봇 서비스" width={32} height={32} />
                        <span className={styles.navText}>챗봇 서비스</span>
                    </div>
                    <div className={styles.navItem}>
                        <Image src="/assets/image/bar5.png" alt="병원 예약" width={32} height={32} />
                        <span className={styles.navText}>병원 예약</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};


export default ChatBot;