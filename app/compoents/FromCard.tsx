"use client";

import React, { useState } from 'react';
import { MdContentCopy } from "react-icons/md";
import { GiSpeaker } from "react-icons/gi";

interface Props {
  placeholder?: string;
  onTextChange: (text: string) => void;
  handleTranslate: () => void;
  loading: boolean;
}

const FromCard = ({handleTranslate, loading, placeholder = "", onTextChange }: Props) => {
  const [inputText, setInputText] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    onTextChange(e.target.value);  // 부모 컴포넌트로 입력 텍스트 전달
  };

  const handleTextToSpeech = async () => {
    if (!inputText) return;
  
    try {
      const response = await fetch('/api/texttospeech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputText, ttsLanguage: "ko" }),
      });
  
      const data = await response.json();
      if (data.audioContent) {
        // Base64 디코딩 후 오디오 재생
        const audio = new Audio(`data:audio/mp3;base64,${data.audioContent}`);
        audio.play();
      } else {
        console.error('TTS 변환 실패:', data.error);
      }
    } catch (error) {
      console.error('TTS 오류:', error);
    }
  };
  


  return (
    <div className='flex flex-col border rounded-2xl bg-[#151515] border-gray-600 w-[400px] h-[400px]'>
      <div className='border-b border-gray-500 h-[50px]'>

      </div>
      <textarea
        className='p-4 resize-none text-xl h-[320px] outline-none focus:outline-none'
        placeholder={placeholder}
        value={inputText}
        onChange={handleChange}
      />
      <div className='h-[40px] border-t border-gray-500 flex items-center justify-between'>
        <div className='flex items-center gap-4 ml-4'>
          <GiSpeaker onClick={handleTextToSpeech} className='text-4xl hover:scale-110 cursor-pointer'/>
          <MdContentCopy className='text-2xl hover:scale-110 cursor-pointer'/>
        </div>
        <button onClick={handleTranslate}
          className='bg-white h-full p-2 rounded text-black cursor-pointer'>
          {loading ? "번역 중..." : "번역하기"}
        </button>
      </div>
    </div>
  );
};

export default FromCard;
