import React, { Component } from 'react';
import Sidebar from './Sidebar';

class AppIndex extends Component {
  render() {
    return (
      <div>
        
        <Sidebar />

        <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
          {this.props.children}
        </div>

      </div>
    );
  }
}


export default AppIndex;