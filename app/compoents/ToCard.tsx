"use client";

import React, { useEffect, useState } from 'react';
import { MdContentCopy } from "react-icons/md";
import { GiSpeaker } from "react-icons/gi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  translatedText: string;
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
}

const ToCard = ({ translatedText, selectedLanguage, setSelectedLanguage }: Props) => {
  const [speechLanguage, setSpeechLanguage] = useState('en');

  const handleTextToSpeech = async () => {
    if (!translatedText) return;
    try {
      const response = await fetch('/api/texttospeech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputText: translatedText, ttsLanguage: selectedLanguage }),
      });

      const data = await response.json();
      if (data.audioContent) {
        const audio = new Audio(`data:audio/mp3;base64,${data.audioContent}`);
        audio.play();
      } else {
        console.error('TTS 변환 실패:', data.error);
      }
    } catch (error) {
      console.error('TTS 오류:', error);
    }
  };

  const handleCopyToClipboard = () => {
    if (!translatedText) return;

    navigator.clipboard.writeText(translatedText)
      .then(() => {
        toast.success("📋 번역된 텍스트가 복사되었습니다!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      })
      .catch((err) => {
        console.error("복사 실패:", err);
        toast.error("❌ 복사에 실패했습니다.");
      });
  };

  useEffect(() => {
    switch (selectedLanguage) {
      case 'ko': setSpeechLanguage('ko-KR'); break;
      case 'en': setSpeechLanguage('en-US'); break;
      case 'zh': setSpeechLanguage('zh-CN'); break;
      case 'ja': setSpeechLanguage('ja-JP'); break;
      default: setSpeechLanguage('en-US');
    }
  }, [selectedLanguage]);

  return (
    <div className='flex flex-col border rounded-2xl bg-[#151515] border-gray-600 w-[400px] h-[400px]'>
      <ToastContainer />
      <div className='border-b flex items-center border-gray-500 h-[50px]'>
        <select className='px-2 outline-none focus:ring-0 focus:border-transparent' value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
          <option value="ko">한국어</option>
          <option value="en">영어</option>
          <option value="ja">일본어</option>
          <option value="zh">중국어</option>
        </select>
      </div>
      <p className='p-4 resize-none text-xl h-[320px] outline-none focus:outline-none'>
        {translatedText || '번역 결과가 여기에 표시됩니다.'}
      </p>
      <div className='h-[40px] border-t border-gray-500 flex items-center justify-between'>
        <div className='flex items-center gap-4 ml-4'>
          <GiSpeaker onClick={handleTextToSpeech} className='text-4xl hover:scale-110 cursor-pointer' />
          <MdContentCopy onClick={handleCopyToClipboard} className='text-2xl hover:scale-110 cursor-pointer' />
        </div>
      </div>
    </div>
  );
};

export default ToCard;
