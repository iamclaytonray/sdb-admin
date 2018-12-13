import * as React from 'react';

interface Props {
  error: any;
}

export const Error = ({ error }: Props) => (
  <div className="card">
    <div className="card-body">
      <div style={{ backgroundColor: 'red', color: 'white', padding: 25 }}>
        <p style={{ fontWeight: 600, fontSize: 18 }}>{error}</p>
        <p style={{ fontWeight: 600, fontSize: 16 }}>
          Try refreshing or calling Clayton.
        </p>
      </div>
    </div>
  </div>
);
