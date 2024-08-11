import React, { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = '';
    let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    if (numberAllowed) {
      str += '1234567890';
    }
    if (charAllowed) {
      str += '+=&#@%^_-=/!?+$';
    }

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipBoard = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select();
      document.execCommand('copy');
    }
  }, []);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed, generatePassword]);

  return (
    <div className="min-h-screen bg-gray-800 pt-16">
      <h1 className="mt-8 text-3xl font-bold text-center">Password Generator</h1>
      <div className="max-w-lg w-full mx-auto mt-4 bg-gray-600 rounded-xl p-6 shadow-md">
        <div className="flex items-center mb-4">
          <input
            className="flex-1 h-10 px-3 rounded-l-md bg-white text-black border outline-none"
            type="text"
            value={password}
            placeholder="Generated Password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="px-4 py-2 bg-blue-700 text-white rounded-r-md hover:bg-blue-600 hover:text-gray-300"
            onClick={copyPasswordToClipBoard}
          >
            Copy
          </button>
        </div>
        <div className="flex items-center flex-wrap">
          <div className="flex-1 md:order-2 md:mr-4 md:min-w-200">
            <input
              className="w-full h-10 bg-white border outline-none"
              type="range"
              min="6"
              max="100"
              step="1"
              name="range"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
          </div>
          <label className="md:order-1 mb-2 md:mb-0 md:mr-4" htmlFor="range">Length: {length}</label>
          <div className="md:order-3 flex items-center mt-2 md:mt-0">
            <input
              id="numbers"
              className="ml-4 mr-2"
              type="checkbox"
              checked={numberAllowed}
              onChange={() => setNumberAllowed(!numberAllowed)}
            />
            <label htmlFor="numbers">Numbers</label>
            <input
              id="characters"
              className="ml-4 mr-2"
              type="checkbox"
              checked={charAllowed}
              onChange={() => setCharAllowed(!charAllowed)}
            />
            <label htmlFor="characters">Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;