import { Button } from '@material-ui/core';
import * as React from 'react';
import { Link } from 'react-router-dom';

export const NewButton = ({ location, children }) => {
  return (
    <div style={{ textAlign: 'right' }}>
      <Link to={location}>
        <Button color="primary" variant="contained">
          {children}
        </Button>
      </Link>
    </div>
  );
};
