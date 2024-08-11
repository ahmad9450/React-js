import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [language, setLanguage] = useState('en-US');

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <nav style={navStyles}>
      <div style={containerStyles}>
        <h1 style={titleStyles}>Voice Command App</h1>
        <select onChange={handleLanguageChange} value={language} style={selectStyles}>
          <option value="en-US">English</option>
          <option value="hi-IN">Hindi</option>
        </select>
        <div style={linkContainerStyles}>
          <Link to="/" style={linkStyles}>Color Changer</Link>
          <Link to="/counter" style={linkStyles}>Counter</Link>
        </div>
      </div>
    </nav>
  );
};

const navStyles = {
  backgroundColor: '#333',
  color: 'white',
  padding: '10px 20px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  position: 'sticky',
  top: 0,
  width: '100%',
  zIndex: 1000
};

const containerStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
};

const titleStyles = {
  margin: 0,
  fontSize: '24px'
};

const selectStyles = {
  marginLeft: '20px',
  padding: '5px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  backgroundColor: '#fff',
  color: '#333'
};

const linkContainerStyles = {
  display: 'flex',
  gap: '15px'
};

const linkStyles = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '16px',
  padding: '5px 10px',
  borderRadius: '4px',
  transition: 'background-color 0.3s, color 0.3s'
};

const linkHoverStyles = {
  backgroundColor: '#555'
};

export default Navbar;