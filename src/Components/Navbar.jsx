import React from 'react';
import './Navbar.css'; // Import the CSS file for styling

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">LearnHub</a>
        <ul className="navbar-menu">
          <li className="navbar-item"><a href="/" className="navbar-link">Home</a></li>
          <li className="navbar-item"><a href="/about" className="navbar-link">About</a></li>
          <li className="navbar-item"><a href="/problem" className="navbar-link">Problem</a></li>
          <li className="navbar-item"><a href="/courses" className="navbar-link">Courses</a></li>
          <li className="navbar-item"><a href="/login" className="navbar-link">Login</a></li>
          <li className="navbar-item"><a href="/register" className="navbar-link">Signup</a></li>
        </ul>
      </div>
    </nav>
  );
};
