import React, { useRef, useState } from 'react';
import Video from './Video';
import CenterControls from '.';
import TopControls from './TopControls';
import useFullscreen from './Utility/useFullscreen';
import usePiP from './Utility/usePiP';
import formatTime from "./Utility/formatTime";

const VideoPlayer = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const currentVidTimeRef = useRef(null);
  const videoDurationRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [hideControlsTimeout, setHideControlsTimeout] = useState(null);
  const [showControls, setShowControls] = useState(true);

  const togglePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const skipBackward = () => {
    videoRef.current.currentTime -= 10;
  };

  const skipForward = () => {
    videoRef.current.currentTime += 10;
  };

  const toggleMute = () => {
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const changePlaybackSpeed = () => {
    const newSpeed = playbackSpeed === 1 ? 1.5 : 1; // Toggle between 1x and 1.5x speed
    videoRef.current.playbackRate = newSpeed;
    setPlaybackSpeed(newSpeed);
  };

  const { isFullscreen, handleFullscreen } = useFullscreen(containerRef);
  const { handleEnterPiP } = usePiP(videoRef);

  const handleInteraction = () => {
    setShowControls(true); // Show controls on interaction
    if (hideControlsTimeout) {
      clearTimeout(hideControlsTimeout);
    }
    const timeoutId = setTimeout(() => {
      setShowControls(false); // Hide controls after 3 seconds
    }, 3000);
    setHideControlsTimeout(timeoutId);
  };

  const handleVideoClick = () => {
    setShowControls(true);
  };

  return (
    <div
      className="relative w-full max-w-4xl mx-auto bg-black rounded overflow-hidden"
      ref={containerRef}
      onMouseMove={handleInteraction}
      onTouchStart={handleInteraction}
    >
      <Video videoRef={videoRef} onClick={handleVideoClick} />
      {showControls && (
        <>
          <CenterControls
            videoRef={videoRef}
            togglePlayPause={togglePlayPause}
            skipBackward={skipBackward}
            skipForward={skipForward}
            toggleMute={toggleMute}
            changePlaybackSpeed={changePlaybackSpeed}
            isPlaying={isPlaying}
            isMuted={isMuted}
          />
          <TopControls
            fileInputRef={fileInputRef}
            handleEnterPiP={handleEnterPiP}
            handleFullscreen={handleFullscreen}
            isFullscreen={isFullscreen}
          />
        </>
      )}
    </div>
  );
};

export default VideoPlayer;