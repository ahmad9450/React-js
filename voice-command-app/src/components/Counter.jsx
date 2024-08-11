import React, { useState, useCallback, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Counter = () => {
  const [count, setCount] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const { transcript, resetTranscript, listening } = useSpeechRecognition();

  const startCounter = () => {
    if (window.counterInterval) clearInterval(window.counterInterval);
    window.counterInterval = setInterval(() => {
      setCount(prevCount => prevCount + 1);
    }, 1000);
    setIsListening(true);
  };

  const stopCounter = () => {
    clearInterval(window.counterInterval);
    setIsListening(false);
  };

  const resetCounter = () => {
    setCount(0);
    clearInterval(window.counterInterval);
    setIsListening(false);
  };

  const checkCommand = useCallback(() => {
    const command = transcript.toLowerCase();
    if (command.includes('start') && command.includes('counter')) {
      startCounter();
      resetTranscript();
    } else if (command.includes('stop') && command.includes('counter')) {
      stopCounter();
      resetTranscript();
    } else if (command.includes('continue') && command.includes('counter')) {
      startCounter();
      resetTranscript();
    } else if (command.includes('reset') && command.includes('counter')) {
      resetCounter();
      resetTranscript();
    }
  }, [transcript, resetTranscript]);

  useEffect(() => {
    if (isListening) {
      SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
    } else {
      SpeechRecognition.stopListening();
    }
  }, [isListening]);

  useEffect(() => {
    checkCommand();
  }, [transcript, checkCommand]);

  useEffect(() => {
    const handleFocus = () => {
      if (!isListening) {
        setIsListening(true);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && !isListening) {
        setIsListening(true);
      }
    };

    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isListening]);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Counter</h1>
      <div style={{ marginBottom: '20px', fontSize: '100px' }}>{count}</div>
      <button onClick={() => setIsListening(true)} style={{ margin: '10px' }}>Start Listening</button>
      <button onClick={() => setIsListening(false)} style={{ margin: '10px' }}>Stop Listening</button>
    </div>
  );
};

export default Counter;