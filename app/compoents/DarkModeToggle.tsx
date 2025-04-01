"use client";

import React, { useEffect } from 'react'
import { MdDarkMode } from "react-icons/md";
import { GoSun } from "react-icons/go";
import { useRecoilState } from 'recoil';
import { darkModeState } from '../recoil/atom';


const DarkModeToggle = () => {
    const [darkMode, setDarkMode] = useRecoilState(darkModeState);

    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode === 'true') {
            setDarkMode(true)
        } else {
            setDarkMode(false)
        }
    }, [setDarkMode]);

    const toggleTheme = () => {
        setDarkMode( (prev) => {
            const newMode = !prev;
            localStorage.setItem('darkMode', newMode.toString());
            return newMode;
        })
    }
  return (
    <button onClick={toggleTheme}>
        {darkMode ? <MdDarkMode/> : <GoSun/>}
    </button>
  )
}

export default DarkModeToggle