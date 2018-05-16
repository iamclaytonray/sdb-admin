import * as React from 'react';

export const TableRow = ({ children, ...props }) => {
  return <tr {...props}>{children}</tr>;
};
