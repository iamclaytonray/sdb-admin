import React, { Component } from 'react';
import Sidebar from './Sidebar';

class AppIndex extends Component {
  render() {
    return (
      <div>
        
        <Sidebar />

        <div className="main-container">
          {this.props.children}
        </div>

      </div>
    );
  }
}


export default AppIndex;