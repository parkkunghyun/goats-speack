"use client";

import React from 'react';

interface Props {
  translatedText: string;
}

const ToCard = ({ translatedText }: Props) => {
  return (
    <div className='flex flex-col border rounded-2xl bg-[#151515] border-gray-600 w-[400px] h-[400px]'>
      <div className='border-2 h-[40px]'>
        <p></p>
      </div>
      <p className='p-2 resize-none text-md h-[320px] outline-none focus:outline-none'>
        {translatedText || '번역 결과가 여기에 표시됩니다.'}
      </p>
      <div className='h-[40px] border-2'></div>
    </div>
  );
};

export default ToCard;
