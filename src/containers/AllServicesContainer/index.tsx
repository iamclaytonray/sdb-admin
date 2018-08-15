import Axios from 'axios';
import * as React from 'react';
import { API_URL } from '../../constants';

interface Props {
  children(props: State): React.ReactNode;
}

interface State {
  loading: boolean;
  error: string | null;
  services: Array<Object>;
}

export class AllServicesContainer extends React.Component<Props, State> {
  public state = {
    loading: true,
    error: null,
    services: [],
  };
  public componentDidMount() {
    Axios.get(`${API_URL}/services`)
      .then(res => {
        this.setState({
          loading: false,
          services: res.data,
        });
      })
      .catch(err => this.setState({ loading: false, error: err }));
  }
  public render() {
    return this.props.children({
      loading: this.state.loading,
      error: this.state.error,
      services: this.state.services,
    });
  }
}
