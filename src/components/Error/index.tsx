import * as React from 'react';

export const Error = ({ error }) => {
  return (
    <div style={{ backgroundColor: 'red', color: 'white', padding: 25 }}>
      <p style={{ fontWeight: 600, fontSize: 16 }}>{error}</p>
    </div>
  );
};
