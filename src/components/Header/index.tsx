import * as React from 'react';
import {
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
} from 'reactstrap';

export class Header extends React.Component<any, any> {
  public state = {
    isOpen: false,
    dropdownOpen: false,
    color: 'white',
  };

  public toggle = () => {
    if (this.state.isOpen) {
      this.setState({
        color: 'transparent',
      });
    } else {
      this.setState({
        color: 'white',
      });
    }
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  public dropdownToggle = e => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  public openSidebar = () => {
    document.documentElement.classList.toggle('nav-open');
    // this.refs.sidebarToggle.classList.toggle('toggled');
  }

  public componentDidUpdate() {
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf('nav-open') !== -1
    ) {
      document.documentElement.classList.toggle('nav-open');
      // this.refs.sidebarToggle.classList.toggle('toggled');
    }
  }

  public render() {
    return (
      <Navbar expand="lg" className="navbar-absolute fixed-top transparent">
        <Container fluid>
          <div className="navbar-wrapper">
            <div className="navbar-toggle">
              <button
                type="button"
                className="navbar-toggler"
                onClick={() => this.openSidebar()}
              >
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </button>
            </div>
            <NavbarBrand href="/">SDB CMS</NavbarBrand>
          </div>
          <NavbarToggler onClick={this.toggle}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>
          
        </Container>
      </Navbar>
    );
  }
}
