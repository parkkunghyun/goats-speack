"use client";

import React, { useState } from 'react';
import FromCard from './compoents/FromCard';
import ToCard from './compoents/ToCard';


const Page = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);

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
          selectedLanguage: 'en',  // 번역할 언어
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

  return (
    <div className='flex bg-black min-h-screen flex-col items-center pt-10'>
      <h1 className='text-6xl mt-10 font-bold'>Goats <span className='text-[#f67216]'>Speak</span></h1>
      <div className='mt-20 w-full flex flex-col md:flex-row items-center justify-center gap-20'>
        <FromCard placeholder='번역할 내용을 입력해주세요.' onTextChange={setInputText} />
        <ToCard translatedText={translatedText} />
      </div>
      <button
        className='mt-4 p-2 bg-blue-500 text-white rounded'
        onClick={handleTranslate}
        disabled={loading}
      >
        {loading ? '번역 중...' : '번역하기'}
      </button>
    </div>
  );
};

export default Page;
