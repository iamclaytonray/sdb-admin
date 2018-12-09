import * as React from 'react';
import { Card } from 'reactstrap';

export const Error = ({ error }) => {
  return (
    <Card>
      <div style={{ backgroundColor: 'red', color: 'white', padding: 25 }}>
        <p style={{ fontWeight: 600, fontSize: 18 }}>{error}</p>
        <p style={{ fontWeight: 600, fontSize: 16 }}>
          Try refreshing or calling Clayton.
        </p>
      </div>
    </Card>
  );
};
