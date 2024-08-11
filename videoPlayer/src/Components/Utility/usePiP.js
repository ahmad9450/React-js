import { useEffect } from 'react';

const usePiP = (videoRef) => {
  const handleEnterPiP = () => {
    if (videoRef.current) {
      videoRef.current.requestPictureInPicture();
    }
  };

  const handleLeavePiP = () => {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
    }
  };

  useEffect(() => {
    const handleLeavePiPEvent = () => {
      // Handle any additional logic when leaving PiP
    };

    videoRef.current.addEventListener('leavepictureinpicture', handleLeavePiPEvent);

    return () => {
      videoRef.current.removeEventListener('leavepictureinpicture', handleLeavePiPEvent);
    };
  }, [videoRef]);

  return { handleEnterPiP, handleLeavePiP };
};

export default usePiP;