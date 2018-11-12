import { Error } from 'components/Error';
import { Loading } from 'components/Loading';
import { SharedTable } from 'components/SharedTable';
// import { Toast } from 'components/Toast';
import * as React from 'react';
import {
  Card,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from 'reactstrap';

import { API_URL } from '../../constants';
import { OrderItems } from '../OrderItems';

export class All extends React.Component<any, any> {
  public state = {
    view: 'table',

    loading: true,
    error: null,
    data: null as any,

    isToastOpen: false
  };
  public componentDidMount() {
    this.fetch();
  }
  public componentDidUpdate(prevProps: any) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({ view: 'table', loading: true });
      this.fetch();
    }
  }
  public fetch = async () => {
    fetch(`${API_URL}/${this.props.resource}/unfiltered`, {
      method: 'get',
      headers: {
        Authorization: localStorage.getItem('token'),
      } as any,
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ loading: false, data: res.data });
      })
      .catch(error => this.setState({ loading: false, error: error }));
  }

  public toggle = (tab: string) => {
    this.setState({ view: tab });
  }

  public renderOrderView = () => {
    return <OrderItems resource={this.props.resource} />;
  }

  public renderTableView = () => {
    const { loading, error, data } = this.state;
    if (loading) {
      return <Loading />;
    }
    if (error) {
      return <Error error={error} />;
    }
    // console.log('data', data);
    // if (data.error) {
    //   return <Error error={data.error} />;
    // }
    return (
      <SharedTable
        data={data}
        title={this.props.title}
        newLink={`${this.props.resource}/new`}
        otherLocation={this.props.resource}
        children={`New ${this.props.buttonText}`}
        {...this.props}
      />
    );
  }
  public render() {
    return (
      <Card>
        <CardBody>
          <Nav tabs className="nav-pills-primary nav-pills">
            <NavItem>
              <NavLink
                onClick={() => {
                  this.toggle('table');
                }}
                className={this.state.view === 'table' ? 'active' : ''}
                style={{ border: 'none' }}
              >
                Table View
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                onClick={() => this.toggle('order')}
                className={this.state.view === 'order' ? 'active' : ''}
                style={{ border: 'none' }}
              >
                Order View
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.view}>
            <TabPane tabId="table">{this.renderTableView()}</TabPane>
            <TabPane tabId="order">{this.renderOrderView()}</TabPane>
          </TabContent>
          {/* <Toast type="danger" isOpen={false} />
          <Toast
            type="danger"
            visible={this.state.isOpen}
          /> */}
        </CardBody>
      </Card>
    );
  }
}
