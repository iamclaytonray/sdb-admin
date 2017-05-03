import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Sidebar extends Component {
  render () {
    return (
      <div className="sidebar">
        <Link to="admin">
          <div className="home">
            <i className='fa fa-home fa-2x'></i>
          </div>
        </Link>
        <Link to="admin/media">
          <div className="analytics">
            <i className='fa fa-picture-o fa-2x'></i>
          </div>
        </Link>
        <Link to="admin/posts">
          <div className="analytics">
            <i className='fa fa-pencil-square fa-2x'></i>
          </div>
        </Link>
        <Link to="admin/services">
          <div className="identity">
            <i className='fa fa-video-camera fa-2x'></i>
          </div>
        </Link>
        <Link to="admin/store">
          <div className="seo">
            <i className='fa fa-shopping-cart fa-2x'></i>
          </div>
        </Link>
        <Link to="admin/users">
          <div className="social">
            <i className='fa fa-user fa-2x'></i>
          </div>
        </Link>
        <Link to="admin/settings">
          <div className="settings">
            <i className='fa fa-cog fa-2x'></i>
          </div>
        </Link>
        <Link to="logout">
          <div className="signout">
            <i className='fa fa-sign-out fa-2x'></i>
          </div>
        </Link>
      </div>
    );
  }
}