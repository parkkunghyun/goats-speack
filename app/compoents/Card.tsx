"use client";

import React, { useState } from 'react';

interface Props {
  placeholder?: string;
  type: string;
}

const Card = ({ placeholder = "", type }: Props) => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!inputText) {
      return;  // 입력 텍스트가 없으면 번역하지 않음
    }

    setLoading(true);  // 로딩 상태 시작
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputText,
          selectedLanguage: 'en',  // 번역할 언어 (예: 영어)
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
      setLoading(false);  // 로딩 상태 종료
    }
  };

  return (
    <div className='flex flex-col border rounded-2xl bg-[#151515] border-gray-600 w-[400px] h-[400px]'>
      <div className='border-2 h-[40px]'>
        <p></p>
      </div>
      {type === "from" ? (
        <textarea
          className='p-2 resize-none text-md h-[320px] outline-none focus:outline-none'
          placeholder={placeholder}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      ) : (
        <p className='p-2 resize-none text-md h-[320px] outline-none focus:outline-none'>
          {translatedText ? translatedText : '번역 결과가 여기에 표시됩니다.'}
        </p>
      )}
      <div className='h-[40px] border-2'>
        <button
          className='p-2 bg-blue-500 text-white rounded'
          onClick={handleTranslate}
          disabled={loading}
        >
          {loading ? '번역 중...' : '번역하기'}
        </button>
      </div>
    </div>
  );
};

export default Card;
