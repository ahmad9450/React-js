import React, { useState } from 'react';
import { FaVideo, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { MdPictureInPictureAlt } from 'react-icons/md';

const TopControls = ({ videoRef, fileInputRef }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [speedText, setSpeedText] = useState('1×');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const objectURL = URL.createObjectURL(file);
    videoRef.current.src = objectURL;
    videoRef.current.play();
  };

  const handleEnterPiP = () => {
    if (videoRef.current !== document.pictureInPictureElement) {
      videoRef.current.requestPictureInPicture();
    } else {
      document.exitPictureInPicture();
    }
  };

  const toggleMute = () => {
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const changePlaybackSpeed = () => {
    let newPlayBackSpeed = videoRef.current.playbackRate + 0.25;
    if (newPlayBackSpeed > 2) newPlayBackSpeed = 0.25;
    videoRef.current.playbackRate = newPlayBackSpeed;
    setSpeedText(newPlayBackSpeed + '×');
  };

  return (
    <div className="absolute top-0 left-0 right-0 flex justify-around items-center p-2 bg-black bg-opacity-50">
      <button title="Picture in Picture" onClick={handleEnterPiP}>
        <MdPictureInPictureAlt className="text-white" />
      </button>
      <button title="Upload Video" onClick={() => fileInputRef.current.click()}>
        <FaVideo className="text-white" />
      </button>
      <input
        type="file"
        accept="video/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <button title="Mute" onClick={toggleMute}>
        {isMuted ? <FaVolumeMute className="text-white" /> : <FaVolumeUp className="text-white" />}
      </button>
      <button title="Playback Speed" onClick={changePlaybackSpeed} className="w-12 text-white font-bold">
        {speedText}
      </button>
    </div>
  );
};

export default TopControls;