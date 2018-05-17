import * as React from 'react';

export const TableColumn = ({ children, ...props }) => {
  return <td {...props}>{children}</td>;
};
