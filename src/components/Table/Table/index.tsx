import * as React from 'react';

export const Table = ({ children, ...props }) => {
  return <table {...props}>{children}</table>;
};
