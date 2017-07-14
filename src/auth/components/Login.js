import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div style={{padding: 50}}></div>
        <div className="col-lg-6 col-lg-offset-3">
          <div className="row">
            <h1>Login</h1>
            <div style={{padding: 50}}></div>
            <form>
              <input className="form-control" type="text" name="email" placeholder="someone@somewhere.com" />
              <p></p>
              <p></p>
              <p></p>
              <input className="form-control" type="password" name="password" placeholder="********" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}


export default Login;