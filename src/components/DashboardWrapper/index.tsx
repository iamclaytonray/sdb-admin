import * as React from 'react';

import { Header } from 'components/Header';
import { Sidebar } from 'components/Sidebar';

export const DashboardWrapper = props => {
  return (
    <div className="wrapper">
      <Sidebar {...props} />
      <div className="main-panel">
        <Header {...props} />
        <div className="panel-header panel-header-sm" />
        <div style={styles.content}>{props.children}</div>
      </div>
    </div>
  );
};

const styles = {
  content: {
    padding: '0 30px 30px',
    minHeight: 'calc(100vh - 123px)',
    marginTop: '-30px',
  },
};