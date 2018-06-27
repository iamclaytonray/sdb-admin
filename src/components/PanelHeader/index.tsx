import * as React from 'react';

export const PanelHeader = ({ size, children }) => {
  return (
    <div
      className={
        'panel-header ' + (size !== undefined ? 'panel-header-' + size : '')
      }
    >
      {children}
    </div>
  );
};
