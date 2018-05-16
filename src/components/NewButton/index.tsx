import * as React from 'react';
import { Link } from 'react-router-dom';

export const NewButton = ({ location, children, ...props }) => {
  return (
    <div
      style={{
        textAlign: 'right',
        marginTop: 30,
        marginBottom: 50,
      }}
    >
      <Link to={location}>
        <button className="btn btn-primary">{children}</button>
      </Link>
    </div>
  );
};
