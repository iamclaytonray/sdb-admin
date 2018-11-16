import * as React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { Button, Nav } from 'reactstrap';

const logo =
  'https://yt3.ggpht.com/-R26L2yuqZno/AAAAAAAAAAI/AAAAAAAAAAA/ItklyVrs2gw/s288-mo-c-c0xffffffff-rj-k-no/photo.jpg';

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
          <img src={logo} alt="react-logo" />
        </div>
      </Link>
      <Link
        to="https://shoreshdavidbrandon.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="simple-text logo-normal"
      >
        SDB
      </Link>
      <div className="navbar-minimize">
        <Button id="minimizeSidebar" onClick={minimizeSidebar} color="primary">
          <i className="now-ui-icons text_align-center visible-on-sidebar-regular" />
          <i className="now-ui-icons design_bullet-list-67 visible-on-sidebar-mini" />
        </Button>
      </div>
    </div>

    <div className="sidebar-wrapper">
      <Nav>
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
      </Nav>
    </div>
  </div>
);

export const Sidebar = withRouter(SidebarComponent);
