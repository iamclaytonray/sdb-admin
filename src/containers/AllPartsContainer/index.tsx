import Axios from 'axios';
import * as React from 'react';
import { API_URL } from '../../constants';

interface Props {
  children(props: State): React.ReactNode;
}

interface State {
  loading: boolean;
  error: string | null;
  parts: any[];
}

export class AllPartsContainer extends React.Component<Props, State> {
  public state = {
    loading: true,
    error: null,
    parts: [],
  };
  public componentDidMount() {
    Axios.get(`${API_URL}/parts`)
      .then(res => {
        this.setState({
          loading: false,
          parts: res.data,
        });
      })
      .catch(err => this.setState({ loading: false, error: err }));
  }
  public render() {
    return this.props.children({
      loading: this.state.loading,
      error: this.state.error,
      parts: this.state.parts,
    });
  }
}
