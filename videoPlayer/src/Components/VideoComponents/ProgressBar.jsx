import React, { useRef, useState, useEffect } from 'react';
import formatTime from '../Utility/formatTime.js';
import useFullscreen from '../Utility/useFullscreen.js';
import { FaExpand, FaCompress } from "react-icons/fa";

const ProgressBar = ({ videoRef, currentVidTimeRef, videoDurationRef, containerRef }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [tooltipTime, setTooltipTime] = useState("00:00");
  const [thumbPosition, setThumbPosition] = useState(0);
  const tooltipTimeoutRef = useRef(null);
  const progressBarRef = useRef(null);
  const progressBarContainerRef = useRef(null);
  const isSeekingRef = useRef(false);

  useEffect(() => {
    const updateTimes = () => {
      if (!videoRef.current) return;
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      if (currentVidTimeRef.current) {
        currentVidTimeRef.current.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;
      }
      if (videoDurationRef.current) {
        videoDurationRef.current.textContent = formatTime(duration);
      }
      if (progressBarRef.current) {
        const progressPercentage = (currentTime / duration) * 100;
        progressBarRef.current.style.width = `${progressPercentage}%`;
        setThumbPosition(progressPercentage);
      }
    };

    const video = videoRef.current;
    if (video) {
      video.addEventListener('timeupdate', updateTimes);
      return () => {
        video.removeEventListener('timeupdate', updateTimes);
      };
    }
  }, [videoRef, currentVidTimeRef, videoDurationRef]);

  const handleTimelineInteraction = (e) => {
    if (!videoRef.current || !progressBarContainerRef.current) return;
    const container = progressBarContainerRef.current;
    const containerRect = container.getBoundingClientRect();
    const offsetX = (e.clientX - containerRect.left) / containerRect.width;
    const duration = videoRef.current.duration;

    // Calculate time based on the interaction position
    const time = offsetX * duration;

    // Clamp the time to be within the video's duration
    const clampedTime = Math.min(time, duration);

    // Update the tooltip and thumb position
    setTooltipTime(formatTime(clampedTime));
    setThumbPosition(Math.min((clampedTime / duration) * 100, 100));

    if (isSeekingRef.current) {
      videoRef.current.currentTime = clampedTime;
    }

    resetTooltipTimeout();
  };

  const handleMouseMove = (e) => {
    if (isSeekingRef.current) {
      handleTimelineInteraction(e);
    }
  };

  const handleTouchMove = (e) => {
    if (isSeekingRef.current) {
      handleTimelineInteraction(e.touches[0]);
    }
  };

  const handleMouseDown = (e) => {
    isSeekingRef.current = true;
    handleTimelineInteraction(e);
  };

  const handleMouseUp = (e) => {
    if (isSeekingRef.current) {
      isSeekingRef.current = false;
      handleTimelineInteraction(e);
    }
  };

  const handleTouchStart = (e) => {
    isSeekingRef.current = true;
    setIsTooltipVisible(true);
    handleTimelineInteraction(e.touches[0]);
  };

  const handleTouchEnd = () => {
    if (isSeekingRef.current) {
      isSeekingRef.current = false;
    }
    setIsTooltipVisible(false);
  };

  const handleTimelineClick = (e) => {
    if (!videoRef.current) return;
    handleTimelineInteraction(e);
  };

  const resetTooltipTimeout = () => {
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current);
    }
    tooltipTimeoutRef.current = setTimeout(() => {
      setIsTooltipVisible(false);
    }, 3000);
  };

  useEffect(() => {
    resetTooltipTimeout();
    return () => {
      if (tooltipTimeoutRef.current) {
        clearTimeout(tooltipTimeoutRef.current);
      }
    };
  }, []);

  const { isFullscreen, handleFullscreen } = useFullscreen(containerRef);

  return (
    <div className="relative px-1">
      <div className="flex justify-between items-center text-white text-xs mb-1">
        <p className="current-time" ref={currentVidTimeRef}>00:00 / 00:00</p>
        <button className="bg-gray-700 p-1 rounded" title="Fullscreen" onClick={handleFullscreen}>
          {!isFullscreen ? <FaExpand className="text-white" /> : <FaCompress className="text-white" />}
        </button>
      </div>
      <div
        className="relative h-1 bg-gray-700 cursor-pointer"
        onMouseMove={handleMouseMove}
        onClick={handleTimelineClick}
        onTouchMove={handleTouchMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        ref={progressBarContainerRef}
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
      >
        <div className={`absolute top-[-50px] left-1/2 transform -translate-x-1/2 text-white text-xs bg-black bg-opacity-75 p-1 rounded ${isTooltipVisible ? 'block' : 'hidden'}`}>
          {tooltipTime}
        </div>
        <div
          className="absolute top-0 left-0 h-full bg-blue-600"
          ref={progressBarRef}
          style={{ width: `${thumbPosition}%` }} // Ensure the progress bar width reflects the thumb position
        ></div>
        <div
          className={`absolute top-[-6px] bg-red-500 w-4 h-4 rounded-full ${isTooltipVisible ? 'block' : 'hidden'}`}
          style={{ left: `calc(${thumbPosition}% - 8px)` }} // Center align the thumb
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;