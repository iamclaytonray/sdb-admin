// export const NavItem = ({ to, name, icon }) => {
//   return (
//     <li className="nav-item">
//       <NavLink to={to} className="nav-link" activeClassName="active">
//         <i className={icon} style={{ marginRight: 10 }} />
//         {name}
//       </NavLink>
//     </li>
//   );
// };

import * as React from 'react';
import { NavLink } from 'react-router-dom';

export const NavItem = ({ name, location, icon }) => {
  return (
    <React.Fragment>
      <li>
        <NavLink to={location} className="nav-link" activeClassName="active">
          <i className={`now-ui-icons ${icon}`} />
          <p>{name}</p>
        </NavLink>
      </li>
    </React.Fragment>
  );
};
