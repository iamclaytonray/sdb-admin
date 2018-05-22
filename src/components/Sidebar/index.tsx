import { CustomButton as Button } from 'components/CustomButton';
import { NavItem } from 'components/NavItem';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'reactstrap';

const logo =
  'https://yt3.ggpht.com/-R26L2yuqZno/AAAAAAAAAAI/AAAAAAAAAAA/ItklyVrs2gw/s288-mo-c-c0xffffffff-rj-k-no/photo.jpg';

export class Sidebar extends React.Component<any, any> {
  public state = {
    openAvatar: false,
  };

  public minimizeSidebar = () => {
    document.body.classList.toggle('sidebar-mini');
  }

  public render() {
    return (
      <div className="sidebar" data-color="orange">
        <div className="logo">
          <Link to="/" className="simple-text logo-mini">
            <div className="logo-img">
              <img src={logo} alt="react-logo" />
            </div>
          </Link>
          <Link
            to="https://shoreshdavidbrandon.com/"
            target="_blank"
            className="simple-text logo-normal"
          >
            SDB
          </Link>
          <div className="navbar-minimize">
            <Button
              simple="true"
              neutral="true"
              icon="true"
              round="true"
              id="minimizeSidebar"
              onClick={this.minimizeSidebar}
            >
              <i className="now-ui-icons text_align-center visible-on-sidebar-regular" />
              <i className="now-ui-icons design_bullet-list-67 visible-on-sidebar-mini" />
            </Button>
          </div>
        </div>

        <div className="sidebar-wrapper">
          <Nav>
            <NavItem
              name="Announcements"
              location="/dashboard/announcements"
              icon="ui-1_calendar-60"
            />
            <NavItem
              name="Articles"
              location="/dashboard/articles"
              icon="files_paper"
            />
            <NavItem
              name="Email"
              location="/dashboard/email"
              icon="ui-1_email-85"
            />
            <NavItem
              name="Media"
              location="/dashboard/media"
              icon="media-1_album"
            />
            <NavItem
              name="Products"
              location="/dashboard/products"
              icon="shopping_shop"
            />
            <NavItem
              name="Services"
              location="/dashboard/services"
              icon="tech_tv"
            />
            <NavItem
              name="Users"
              location="/dashboard/users"
              icon="users_single-02"
            />
          </Nav>
        </div>
      </div>
    );
  }
}
