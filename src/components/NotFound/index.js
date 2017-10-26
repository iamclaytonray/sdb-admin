import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound = () => (
  <div style={{textAlign: 'center'}}>
    <h1 className='page-header'>404 - Page Not Found</h1>
    <Link to='/login'>Login</Link>
    <Link to='/register'>Register</Link>
    <Link to='/forgot-password'>Forgot Password</Link>
  </div>
);
