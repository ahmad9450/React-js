import React, { useRef, useState, useEffect } from 'react';
import { AiOutlineReload } from 'react-icons/ai';
import useFullscreen from '../Utility/useFullscreen.js';

const Video = ({ videoRef, handleLeavePiP, onClick }) => {
  const repeatRef = useRef(null);
  const containerRef = useRef(null);
  const [showRepeatButton, setShowRepeatButton] = useState(false);

  const { isFullscreen, handleFullscreen } = useFullscreen(containerRef);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('ended', handleVideoEnd);
      return () => {
        videoElement.removeEventListener('ended', handleVideoEnd);
      };
    }
  }, [videoRef]);

  const handleVideoEnd = () => {
    setShowRepeatButton(true);
  };

  const handleRepeat = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setShowRepeatButton((prev) => {
        
        return false;
      });
    }
  };
  useEffect(()=>{
    setShowRepeatButton(false);
  },[showRepeatButton])

  return (
    <div ref={containerRef} className={`relative w-full h-auto ${isFullscreen ? 'fullscreen' : ''}`}>
      <video
        id="myVideo"
        ref={videoRef}
        autoPlay
        className="w-full h-auto"
        onClick={onClick}
      />
      {showRepeatButton && (
        <button
          onClick={handleRepeat}
          ref={repeatRef}
          className="flex items-center justify-center text-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white bg-black bg-opacity-50 p-4 rounded-full"
        >
          <AiOutlineReload />
        </button>
      )}
    </div>
  );
};

export default Video;