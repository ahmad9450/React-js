import React, { useState, useEffect, useCallback } from 'react';
import { FaPlay, FaPause, FaBackward, FaForward } from 'react-icons/fa';

const CenterControls = ({ videoRef }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playIcon,setPlayIcon] = useState(false)
  
  useEffect(()=>{
    setPlayIcon(true)
  },[videoRef])

  const togglePlayPause = useCallback(() => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setPlayIcon(true)
      } else {
        videoRef.current.pause();
        setPlayIcon(false)
      }
    }
  }, [videoRef]);

  const skipBackward = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10;
    }
  }, [videoRef]);

  const skipForward = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10;
    }
  }, [videoRef]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);

      videoElement.addEventListener('play', handlePlay);
      videoElement.addEventListener('pause', handlePause);

      return () => {
        videoElement.removeEventListener('play', handlePlay);
        videoElement.removeEventListener('pause', handlePause);
      };
    }
  }, [videoRef]);

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center space-x-4 p-2 rounded transition-opacity duration-300">
      <button className="p-2 text-3xl shadow" title="Backward 10s" onClick={skipBackward}>
        <FaBackward className="text-white text-xl" />
      </button>
      <button className="p-2 text-3xl shadow" title={isPlaying ? 'Pause' : 'Play'} onClick={togglePlayPause}>
        {playIcon ? <FaPause className="text-white text-xl" /> : <FaPlay className="text-white text-xl" />}
      </button>
      <button className="p-2 text-3xl shadow" title="Forward 10s" onClick={skipForward}>
        <FaForward className="text-white text-xl" />
      </button>
    </div>
  );
};

export default CenterControls;