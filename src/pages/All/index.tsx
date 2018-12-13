import Axios from 'axios';
import * as React from 'react';

import { Error } from 'components/Error';
import { Loading } from 'components/Loading';
import { SharedTable } from 'components/SharedTable';
import { OrderItems } from 'pages/OrderItems';

import { API_URL } from '../../constants';

export class All extends React.Component<any, any> {
  public state = {
    view: 'table',

    loading: true,
    error: null,
    data: null as any,

    isToastOpen: false,
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
    try {
      const res = await Axios.get(
        `${API_URL}/${this.props.resource}/unfiltered`,
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          } as any,
        },
      );
      this.setState({ loading: false, data: res.data.data });
    } catch (error) {
      this.setState({ loading: false, error: error.response.data.message });
    }
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
    if (this.state.error) {
      return <Error error={this.state.error} />;
    }
    return (
      <div className="card">
        <div className="card-body">
          <ul className="nav-pills-primary nav-pills nav nav-tabs">
            <li className="nav-item">
              <a
                onClick={() => {
                  this.toggle('table');
                }}
                className={
                  this.state.view === 'table' ? 'nav-link active' : 'nav-link'
                }
                style={{ border: 'none' }}
              >
                Table View
              </a>
            </li>
            <li className="nav-item">
              <a
                onClick={() => this.toggle('order')}
                className={
                  this.state.view === 'order' ? 'nav-link active' : 'nav-link'
                }
                style={{ border: 'none' }}
              >
                Order View
              </a>
            </li>
          </ul>
          <div className="tab-content">
            <div
              className={
                this.state.view === 'table' ? 'tab-pane active' : 'tab-pane'
              }
            >
              {this.renderTableView()}
            </div>
            <div
              className={
                this.state.view === 'order' ? 'tab-pane active' : 'tab-pane'
              }
            >
              {this.renderOrderView()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
