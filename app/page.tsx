"use client";

import React, { useEffect, useState } from 'react';
import FromCard from './compoents/FromCard';
import ToCard from './compoents/ToCard';
import Image from 'next/image';


const Page = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('ko');

  const handleTranslate = async () => {
    if (!inputText) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputText,
          selectedLanguage,  // 번역할 언어
        }),
      });

      const data = await response.json();
      if (data.translatedText) {
        setTranslatedText(data.translatedText);
      } else {
        console.error('번역 실패:', data.error);
      }
    } catch (error) {
      console.error('번역 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleTranslate()
  }, [selectedLanguage]);

  return (
    <div className='flex bg-black min-h-screen flex-col items-center pt-10'>
      <div className='mt-10 flex items-center gap-4'>
        <h1 className='text-6xl font-bold'>Goats <span className='text-[#f67216]'>Speak</span></h1>
        <Image src="/goatius.png" width={60} height={60} alt='염소 로고'/>
      </div>

      <div className='mt-20 w-full flex flex-col md:flex-row items-center justify-center gap-20'>
        <FromCard
            handleTranslate={handleTranslate}
            loading={loading}
            placeholder='번역할 내용을 입력해주세요.'
            onTextChange={setInputText}
        />

        <ToCard
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          translatedText={translatedText} 
          />
      </div>

    </div>
  );
};

export default Page;
