import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Sidebar extends Component {
  render () {
    return (
      <div className="sidebar">
        <Link to="admin">Dashboard</Link>
        <Link to="admin/media">Media</Link>
        <Link to="admin/announcements">Announcements</Link>
        <Link to="admin/services">Services</Link>
        <Link to="admin/posts">Posts</Link>
        <Link to="admin/store">Store</Link>
        <Link to="admin/users">Users</Link>
        <Link to="admin/email">Email</Link>
        <Link to="admin/settings">Settings</Link>
        <Link to="logout">Logout</Link>
      </div>
    );
  }
}