import React, { Component } from 'react';
import { Link } from 'react-router';

const NotFound = () => (
  <div>
    <h1 className="page-header" style={{textAlign: 'center'}}>404 - Page Not Found</h1>
    <p style={{textAlign: 'center'}}>Human, the internet has failed you. Here are links to the dark side:</p>
    <Link to="/login">Login</Link>
    <Link to="/register">Register</Link>
    <Link to="/forgot-password">Forgot Password</Link>
  </div>
);

export default NotFound;