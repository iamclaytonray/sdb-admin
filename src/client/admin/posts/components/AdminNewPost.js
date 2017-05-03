import React, { Component } from 'react';

class AdminNewPost extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-lg-8">
            <h1 className="page-header">Forms</h1>
          </div>
        </div>
        <form role="form">
          <div className="form-group">
              <label>Text Input</label>
              <input className="form-control" />
              <p className="help-block">Example block-level help text here.</p>
          </div>
          <div className="form-group">
              <label>Text Input with Placeholder</label>
              <input className="form-control" placeholder="Enter text" />
          </div>
          <div className="form-group">
              <label>Static Control</label>
              <p className="form-control-static">email@example.com</p>
          </div>
          <div className="form-group">
              <label>File input</label>
              <input type="file" />
          </div>
          <div className="form-group">
              <label>Text area</label>
              <textarea className="form-control" rows="3"></textarea>
          </div>
        </form>
        </div>
    );
  }
}

export default AdminNewPost;
