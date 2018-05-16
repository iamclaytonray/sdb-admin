import * as React from 'react';

export const Error = ({ error }) => {
  return <p style={{ color: 'red' }}>{error.message}</p>;
};
