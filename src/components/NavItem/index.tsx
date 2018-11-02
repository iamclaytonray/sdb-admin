import * as React from 'react';
import { NavLink } from 'react-router-dom';

export const NavItem = ({ name, location, pathName }) => {
  return (
    <li className={pathName.includes(location) ? 'active' : ''}>
      <NavLink to={location} className="nav-link">
        {name}
      </NavLink>
    </li>
  );
};
