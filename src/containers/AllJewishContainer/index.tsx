import Axios from 'axios';
import * as React from 'react';
import { API_URL } from '../../constants';

interface Props {
  children(props: State): React.ReactNode;
}

interface State {
  loading: boolean;
  error: string | null;
  jewish: Array<Object>;
}

export class AllJewishContainer extends React.Component<Props, State> {
  public state = {
    loading: true,
    error: null,
    jewish: [],
  };
  public componentDidMount() {
    Axios.get(`${API_URL}/jewish`)
      .then(res => {
        this.setState({
          loading: false,
          jewish: res.data,
        });
      })
      .catch(err => this.setState({ loading: false, error: err }));
  }
  public render() {
    return this.props.children({
      loading: this.state.loading,
      error: this.state.error,
      jewish: this.state.jewish,
    });
  }
}
