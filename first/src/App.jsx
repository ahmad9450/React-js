import React, { useState } from "react";
import "./App.css";
import { LuVibrate, LuVibrateOff } from "react-icons/lu";
import { MdDeleteForever, MdLightMode, MdNightlight } from "react-icons/md";
import { RiDeleteBack2Line } from "react-icons/ri";
import { IoColorPalette } from "react-icons/io5";
import { IoIosRadioButtonOn } from "react-icons/io";
import soundFile from "./assets/Tasbeeh.wav";


function App() {
  const [count, setCount] = useState(0);
  const [isVibrateOn, setVibrateOn] = useState(false);
  const [themeMode, setThemeMode] = useState("dark");
  const [bgColor, setBgColor] = useState("");

  const vibrate = () => {
    setVibrateOn(!isVibrateOn);
  };

  const increase = () => {
    setCount((prevCount) => prevCount + 1);
    const sound = new Audio(soundFile);
    sound.play();
    if (isVibrateOn) {
      navigator.vibrate(250);
    }
  };

  const decrease = () => {
    setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
  };

  const reset = () => {
    setCount(0);
  };

  const toggleTheme = () => {
    setThemeMode((prevMode) => {
      const newMode = prevMode === "dark" ? "light" : "dark";
      setBgColor(newMode === "dark" ? "black" : "white");
      return newMode;
    });
  };

  const changeBgColor = () => {
    let hex = "abcdef0123456789";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += hex[Math.floor(Math.random() * hex.length)];
    }
    setBgColor(color);
  };

  const handlePointerDown = (action) => {
    action();
  };

  return (
    <div className="main" style={{ backgroundColor: bgColor, color: bgColor === "white" ? "black" : "white" }}>
      <div className="top-cont">
        <button onPointerDown={() => handlePointerDown(decrease)}>
          <RiDeleteBack2Line />
        </button>
        <button onPointerDown={() => handlePointerDown(reset)}>
          <MdDeleteForever />
        </button>
        <button onPointerDown={() => handlePointerDown(vibrate)}>
          {isVibrateOn ? <LuVibrate /> : <LuVibrateOff />}
        </button>
        <button onPointerDown={() => handlePointerDown(toggleTheme)} style={{ backgroundColor: themeMode === "dark" ? "white" : "black", color: themeMode === "dark" ? "black" : "white" }}>
          {themeMode === "dark" ? <MdLightMode /> : <MdNightlight />}
        </button>
        <button onPointerDown={() => handlePointerDown(changeBgColor)}>
          <IoColorPalette />
        </button>
      </div>
      <h2>Tasbeeh</h2>
      <h1>{count}</h1>
      <button className="counter" onPointerDown={() => handlePointerDown(increase)}>
        <IoIosRadioButtonOn />
      </button>
    </div>
  );
}

export default App;