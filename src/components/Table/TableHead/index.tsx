import * as React from 'react';

export const TableHead = ({ children, ...props }) => {
  return <th {...props}>{children}</th>;
};
