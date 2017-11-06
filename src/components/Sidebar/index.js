import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export const Sidebar = () => {
    return (
      <div>
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link to="admin" className="navbar-brand">Shoresh David Brandon | Admin</Link>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
              <ul className="nav navbar-nav navbar-right">
                <li><Link to="admin">Dashboard</Link></li>
                <li><Link to="settings">Settings</Link></li>
                <li><Link to="users">Profile</Link></li>
              </ul>
              <form className="navbar-form navbar-right">
                <input type="text" className="form-control" placeholder="Search..." />
              </form>
            </div>
          </div>
        </nav>

        <div>
          <div className="row">
            <div className="col-sm-3 col-md-2 sidebar">
              <ul className="nav nav-sidebar">
                <li><NavLink to="/">Dashboard</NavLink></li>
                <li><NavLink to="announcements">Announcements</NavLink></li>
                <li><NavLink to="articles">Articles</NavLink></li>
                <li><NavLink to="services">Services</NavLink></li>
                <li><NavLink to="products">Products</NavLink></li>
                <li><NavLink to="logout">Logout</NavLink></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
}
