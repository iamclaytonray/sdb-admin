import Axios from 'axios';
import * as React from 'react';
import { API_URL } from '../../constants';

interface Props {
  children(props: State): React.ReactNode;
}

interface State {
  loading: boolean;
  error: string | null;
  events: Array<Object>;
}

export class AllEventsContainer extends React.Component<Props, State> {
  public state = {
    loading: true,
    error: null,
    events: [],
  };
  public componentDidMount() {
    Axios.get(`${API_URL}/events`)
      .then(res => {
        this.setState({
          loading: false,
          events: res.data,
        });
      })
      .catch(err => this.setState({ loading: false, error: err }));
  }
  public render() {
    return this.props.children({
      loading: this.state.loading,
      error: this.state.error,
      events: this.state.events,
    });
  }
}
