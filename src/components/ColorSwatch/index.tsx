import * as React from 'react';

interface Props {
  color: string;
}

export const ColorSwatch = ({ color }: Props) => (
  <div
    style={{
      backgroundColor: color,
      width: 50,
      height: 50,
      marginTop: 20,
      marginBottom: 20,
    }}
  />
);
