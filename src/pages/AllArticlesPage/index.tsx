import { Error } from 'components/Error';
import { Loading } from 'components/Loading';
import { SharedTable } from 'components/SharedTable';
import * as React from 'react';
import { Fetch } from 'react-refetch-component';
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

export class AllArticlesPage extends React.Component<any, any> {
  public state = {
    view: 'table',
  };
  public toggle = (tab: string) => {
    this.setState({ view: tab });
  }
  public renderOrderView = () => {
    return <OrderItems resource="articles" />;
  }
  public renderTableView = () => {
    return (
      <Fetch
        url={`${API_URL}/articles/unfiltered`}
        method="GET"
        lifecycle="onMount"
      >
        {({ loading, error, data }) => {
          if (loading) {
            return <Loading />;
          }
          if (error) {
            return <Error error={error} />;
          }
          if (data.error) {
            return <Error error={data.error} />;
          }
          const articles = data.data;
          return (
            <SharedTable
              data={articles}
              title="Discoveries"
              location="/dashboard/articles/new"
              otherLocation="articles"
              children="New Discovery"
            />
          );
        }}
      </Fetch>
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
        </CardBody>
      </Card>
    );
  }
}
