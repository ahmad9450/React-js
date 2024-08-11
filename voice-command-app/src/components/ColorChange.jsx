import React, { useState, useCallback, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

// Comprehensive list of colors in English and Hindi
const colors = {
  'en-US': [
    'red', 'blue', 'green', 'yellow', 'pink', 'purple', 'orange', 'black', 'white',
    'gray', 'brown', 'cyan', 'magenta', 'lime', 'indigo', 'violet', 'teal', 'navy', 'maroon',"aqua",
    'olive', 'silver', 'gold', 'beige', 'salmon', 'coral', 'turquoise', 'peach', 'ivory'
  ],
  'hi-IN': [
    'लाल', 'नीला', 'हरा', 'पीला', 'गुलाबी', 'बैंगनी', 'नारंगी', 'काला', 'सफेद',
    'संतरा', 'भूरा', 'सलेटी', 'सुनहरा', 'सिल्वर', 'रात', 'सुनहरा', 'क्रीम', 'पीच'
  ]
};

const ColorChanger = ({ language }) => {
  const [color, setColor] = useState('white');
  const { transcript, resetTranscript, listening } = useSpeechRecognition();

  const checkAndSetColor = (transcript) => {
    const words = transcript.split(' ');
    const colorList = colors[language];
    const spokenColor = words.find(word => colorList.includes(word.toLowerCase()) || colorList.includes(word));
    if (spokenColor) {
      setColor(spokenColor.toLowerCase());
      resetTranscript(); // Optionally reset the transcript after recognizing the color
    }
  };

  const startListening = useCallback(() => {
    if (!listening) {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true, language });
    }
  }, [listening, resetTranscript, language]);

  const stopListening = useCallback(() => {
    if (listening) {
      SpeechRecognition.stopListening();
    }
  }, [listening]);

  // Automatically start listening on mount
  useEffect(() => {
    if (!listening) {
      startListening();
    }
  }, [listening, startListening]);

  // Handle page focus to resume listening
  useEffect(() => {
    const handleFocus = () => {
      if (!listening) {
        startListening();
      }
    };

    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [listening, startListening]);

  useEffect(() => {
    if (transcript) {
      checkAndSetColor(transcript);
    }
  }, [transcript]);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <div style={{ marginBottom: '20px', width: '100%', height: '100px', backgroundColor: color }}>
        <p style={{ color: 'black', lineHeight: '100px' }}>{color === 'white' ? 'Say a color to change my background!' : ''}</p>
      </div>
      <button onClick={startListening} style={{ margin: '10px' }}>Start Listening</button>
      <button onClick={stopListening} style={{ margin: '10px' }}>Stop Listening</button>
      <button onClick={resetTranscript} style={{ margin: '10px' }}>Reset</button>
      <p>{transcript}</p>
    </div>
  );
};

export default ColorChanger;