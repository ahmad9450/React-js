import React, { useRef, useState, useEffect, useCallback } from 'react';
import Video from './VideoComponents/Video.jsx';
import ProgressBar from './VideoComponents/ProgressBar.jsx';
import TopControls from './VideoComponents/TopControls.jsx';
import CenterControls from './VideoComponents/CenterControls.jsx';
import formatTime from './Utility/formatTime.js';

const VideoPlayer = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const currentVidTimeRef = useRef(null);
  const videoDurationRef = useRef(null);
  const [showControls, setShowControls] = useState(true);
  const [progress, setProgress] = useState(0);
  const hideControlsTimeout = useRef(null);

  const updateTimes = useCallback(() => {
    if (videoRef.current && currentVidTimeRef.current && videoDurationRef.current) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      currentVidTimeRef.current.textContent = formatTime(currentTime);
      videoDurationRef.current.textContent = formatTime(duration);
      setProgress((currentTime / duration) * 100);
    }
  }, []);

  const handleInteraction = useCallback(() => {
    setShowControls(true);
    if (hideControlsTimeout.current) {
      clearTimeout(hideControlsTimeout.current);
    }
    if (!videoRef.current.paused) {
      hideControlsTimeout.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;

    if (container && video) {
      container.addEventListener('mousemove', handleInteraction);
      container.addEventListener('touchstart', handleInteraction);
      video.addEventListener('timeupdate', updateTimes);

      return () => {
        container.removeEventListener('mousemove', handleInteraction);
        container.removeEventListener('touchstart', handleInteraction);
        video.removeEventListener('timeupdate', updateTimes);
      };
    }
  }, [handleInteraction, updateTimes]);

  const handleVideoClick = () => {
    setShowControls(true);
    if (videoRef.current && !videoRef.current.paused) {
      if (hideControlsTimeout.current) {
        clearTimeout(hideControlsTimeout.current);
      }
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    const handlePlay = () => {
      setShowControls(true);
      hideControlsTimeout.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    };

    const handlePause = () => {
      setShowControls(true);
      if (hideControlsTimeout.current) {
        clearTimeout(hideControlsTimeout.current);
      }
    };

    if (video) {
      video.addEventListener('play', handlePlay);
      video.addEventListener('pause', handlePause);

      return () => {
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
      };
    }
  }, []);

  return (
    <div
      className="video-container relative w-full max-w-4xl mx-auto bg-black rounded overflow-hidden"
      ref={containerRef}
    >
      <div className="flex justify-center items-center w-full h-full">
        <Video videoRef={videoRef} onClick={handleVideoClick} />
      </div>
      {showControls && (
        <>
          <TopControls videoRef={videoRef} fileInputRef={fileInputRef} />
          <CenterControls videoRef={videoRef} />
          <div className="controls absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-2">
            <ProgressBar
              videoRef={videoRef}
              currentVidTimeRef={currentVidTimeRef}
              videoDurationRef={videoDurationRef}
              progress={progress}
              containerRef={containerRef}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default VideoPlayer;