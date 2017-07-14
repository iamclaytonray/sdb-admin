import React from 'react';
import Sidebar from './Sidebar';

const AppIndex = props => {
  return (
    <div>  
      <Sidebar />
      {props.children}
    </div>
  );
}

export default AppIndex;