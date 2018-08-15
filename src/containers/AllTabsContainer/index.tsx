import Axios from 'axios';
import * as React from 'react';
import { API_URL } from '../../constants';

interface Props {
  children(props: State): React.ReactNode;
}

interface State {
  loading: boolean;
  error: string | null;
  tabs: Array<Object>;
}

export class AllTabsContainer extends React.Component<Props, State> {
  public state = {
    loading: true,
    error: null,
    tabs: [],
  };
  public componentDidMount() {
    Axios.get(`${API_URL}/tabs`)
      .then(res => {
        this.setState({
          loading: false,
          tabs: res.data,
        });
      })
      .catch(err => this.setState({ loading: false, error: err }));
  }
  public render() {
    return this.props.children({
      loading: this.state.loading,
      error: this.state.error,
      tabs: this.state.tabs,
    });
  }
}
