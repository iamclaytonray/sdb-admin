import * as React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';

const NavItem = ({ name, location, pathName }) => (
  <li className={pathName.includes(location) ? 'active' : ''}>
    <NavLink to={location} className="nav-link">
      {name}
    </NavLink>
  </li>
);

const minimizeSidebar = () => {
  document.body.classList.toggle('sidebar-mini');
};

const SidebarComponent = ({ location }) => (
  <div className="sidebar" data-color="orange">
    <div className="logo">
      <Link to="/dashboard" className="simple-text logo-mini">
        <div className="logo-img">
          <img
            src="http://sdb.netlify.com/static/media/sdb-logo-md.b45ce98a.png"
            alt="SDB logo"
          />
        </div>
      </Link>
      <Link to="/" className="simple-text logo-normal">
        Login
      </Link>
      <div className="navbar-minimize">
        <button
          id="minimizeSidebar"
          onClick={minimizeSidebar}
          className="btn btn-primary"
        >
          <i className="now-ui-icons text_align-center visible-on-sidebar-regular" />
          <i className="now-ui-icons design_bullet-list-67 visible-on-sidebar-mini" />
        </button>
      </div>
    </div>

    <div className="sidebar-wrapper">
      <ul className="nav">
        <NavItem
          name="Discoveries"
          location="/dashboard/articles"
          pathName={location.pathname}
        />
        <NavItem
          name="Events"
          location="/dashboard/events"
          pathName={location.pathname}
        />
        <NavItem
          name="Jewish"
          location="/dashboard/jewish"
          pathName={location.pathname}
        />
        <NavItem
          name="Menu Items"
          location="/dashboard/tabs"
          pathName={location.pathname}
        />
        <NavItem
          name="Teachings"
          location="/dashboard/services"
          pathName={location.pathname}
        />
      </ul>
    </div>
  </div>
);

export const Sidebar = withRouter(SidebarComponent);
