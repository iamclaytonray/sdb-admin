import { NavItem } from 'components/NavItem';
import * as React from 'react';

export const Sidebar = () => {
  return (
    <React.Fragment>
      <nav className="col-md-2 d-none d-md-block bg-light sidebar">
        <div className="sidebar-sticky">
          <ul className="nav flex-column">
            <NavItem
              to="/dashboard/dashboard"
              name="Dashboard"
              icon="fa fa-home"
            />
            <NavItem
              to="/dashboard/announcements"
              name="Announcements"
              icon="fa fa-home"
            />
            <NavItem
              to="/dashboard/articles"
              name="Articles"
              icon="fa fa-home"
            />
            <NavItem to="/dashboard/email" name="Email" icon="fa fa-envelope" />
            <NavItem to="/dashboard/media" name="Media" icon="fa fa-home" />
            <NavItem
              to="/dashboard/products"
              name="Products"
              icon="fa fa-home"
            />
            <NavItem
              to="/dashboard/services"
              name="Services"
              icon="fa fa-home"
            />
            <NavItem to="/dashboard/users" name="Users" icon="fa fa-users" />
          </ul>
        </div>
      </nav>
    </React.Fragment>
  );
};
