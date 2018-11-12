import * as React from 'react';
import { Link } from 'react-router-dom';

export const NewButton = ({ location, children, ...props }) => {
  return (
    <div style={{ textAlign: 'right' }}>
      <Link to={location}>
        <button className="btn btn-primary btn-lg">{children}</button>
      </Link>
    </div>
  );
};
