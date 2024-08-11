import React, { useState } from 'react';

function FibonacciComponent() {
  const [number, setNumber] = useState(8);
  const [sequence, setSequence] = useState([]);

  const generateFibonacci = () => {
    const newSequence = [];
    for (let i = 0; i < number; i++) {
      newSequence.push(i);
    }
    setSequence(newSequence);
  };

  const colors = [
    'bg-red-500',
    'bg-yellow-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-pink-500',
    'bg-purple-500',
    'bg-indigo-500',
    'bg-teal-500',
  ];

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-black to-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-4">Colorful Spiral Animation</h2>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Enter a number"
        className="mb-4 p-2 rounded-lg text-black"
      />
      <button
        onClick={generateFibonacci}
        className="bg-yellow-400 text-black py-2 px-6 rounded-lg font-bold mb-6 hover:bg-yellow-300"
      >
        Generate
      </button>
      <div className="relative w-80 h-80">
        {sequence.map((_, index) => (
          <div
            key={index}
            className={`absolute rounded-full ${colors[index % colors.length]} w-12 h-12`}
            style={{
              top: '50%',
              left: '50%',
              marginTop: '-1.5rem', // Half of height (1.5rem is 24px for w-12)
              marginLeft: '-1.5rem', // Half of width (1.5rem is 24px for h-12)
              transform: `rotate(${index * 45}deg) translate(${index * 30}px)`,
              transition: 'transform 1s ease-in-out',
              animation: `spin 5s linear infinite`,
              animationDelay: `${index * 0.2}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default FibonacciComponent;