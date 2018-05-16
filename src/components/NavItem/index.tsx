import * as React from 'react';
import { NavLink } from 'react-router-dom';

export const NavItem = ({ to, name, icon }) => {
  return (
    <li className="nav-item">
      <NavLink to={to} className="nav-link" activeClassName="active">
        <i className={icon} style={{ marginRight: 10 }} />
        {name}
      </NavLink>
    </li>
  );
};
