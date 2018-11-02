import { CustomButton as Button } from 'components/CustomButton';
import { NavItem } from 'components/NavItem';
import * as React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Nav } from 'reactstrap';

const logo =
  'https://yt3.ggpht.com/-R26L2yuqZno/AAAAAAAAAAI/AAAAAAAAAAA/ItklyVrs2gw/s288-mo-c-c0xffffffff-rj-k-no/photo.jpg';

class SidebarComponent extends React.Component<any, any> {
  public minimizeSidebar = () => {
    document.body.classList.toggle('sidebar-mini');
  }

  public render() {
    return (
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
              name="Discoveries"
              location="/dashboard/articles"
              pathName={this.props.location.pathname}
            />
            <NavItem
              name="Events"
              location="/dashboard/events"
              pathName={this.props.location.pathname}
            />
            <NavItem
              name="Jewish"
              location="/dashboard/jewish"
              pathName={this.props.location.pathname}
            />
            <NavItem
              name="Media"
              location="/dashboard/media"
              pathName={this.props.location.pathname}
            />
            <NavItem
              name="Parts"
              location="/dashboard/parts"
              pathName={this.props.location.pathname}
            />
            <NavItem
              name="Products"
              location="/dashboard/products"
              pathName={this.props.location.pathname}
            />
            <NavItem
              name="Menu Items"
              location="/dashboard/menu-items"
              pathName={this.props.location.pathname}
            />
            <NavItem
              name="Teachings"
              location="/dashboard/services"
              pathName={this.props.location.pathname}
            />
          </Nav>
        </div>
      </div>
    );
  }
}

export const Sidebar = withRouter(SidebarComponent);
