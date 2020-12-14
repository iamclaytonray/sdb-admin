import * as React from 'react';

interface Props {
  color: string;
}

export const ColorSwatch: React.FC<Props> = ({ color }) => (
  <div
    style={{
      backgroundColor: color,
      width: 54,
      height: 54,
      marginTop: 16,
      marginBottom: 16,
      borderRadius: 4,
    }}
  />
);
