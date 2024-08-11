import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import ColorChanger from './components/ColorChange.jsx';
import Counter from './components/Counter.jsx';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div style={{ marginTop: '60px' }}> {/* Adjust margin to avoid overlap with fixed navbar */}
        <Routes>
          <Route path="/" element={<ColorChanger language="en-US" />} />
          <Route path="/counter" element={<Counter />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;