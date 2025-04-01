"use client";

import React, { useState } from 'react';

interface Props {
  placeholder?: string;
  onTextChange: (text: string) => void;
}

const FromCard = ({ placeholder = "", onTextChange }: Props) => {
  const [inputText, setInputText] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    onTextChange(e.target.value);  // 부모 컴포넌트로 입력 텍스트 전달
  };

  return (
    <div className='flex flex-col border rounded-2xl bg-[#151515] border-gray-600 w-[400px] h-[400px]'>
      <div className='border-2 h-[40px]'>
        <p></p>
      </div>
      <textarea
        className='p-2 resize-none text-md h-[320px] outline-none focus:outline-none'
        placeholder={placeholder}
        value={inputText}
        onChange={handleChange}
      />
      <div className='h-[40px] border-2'></div>
    </div>
  );
};

export default FromCard;
