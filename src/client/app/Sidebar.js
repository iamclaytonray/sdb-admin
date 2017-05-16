import React from 'react';
import { Link } from 'react-router';

const Sidebar = () => {
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
                <li><Link to="admin/settings">Settings</Link></li>
                <li><Link to="admin/users">Profile</Link></li>
              </ul>
              <form className="navbar-form navbar-right">
                <input type="text" className="form-control" placeholder="Search..." />
              </form>
            </div>
          </div>
        </nav>

        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-3 col-md-2 sidebar">
              <ul className="nav nav-sidebar">
                <li><Link to="admin">Dashboard</Link></li>
                <li><Link to="admin/announcements">Announcements</Link></li>
                <li><Link to="admin/categories">Categories</Link></li>
                <li><Link to="admin/email">Email</Link></li>
                <li><Link to="admin/media">Media</Link></li>
                <li><Link to="admin/posts">Posts</Link></li>
                <li><Link to="admin/services">Services</Link></li>
                <li><Link to="admin/store">Store</Link></li>
                <li><Link to="admin/store/coupons">Coupons</Link></li>
                <li><Link to="admin/store/orders">Orders</Link></li>
                <li><Link to="admin/store/products">Products</Link></li>
                <li><Link to="admin/settings">Settings</Link></li>
                <li><Link to="logout">Logout</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Sidebar;