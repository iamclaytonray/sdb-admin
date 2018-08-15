import Axios from 'axios';
import * as React from 'react';
import { API_URL } from '../../constants';

interface Props {
  children(props: State): React.ReactNode;
}

interface State {
  loading: boolean;
  error: string | null;
  articles: Array<Object>;
}

export class AllArticlesContainer extends React.Component<Props, State> {
  public state = {
    loading: true,
    error: null,
    articles: [],
  };
  public componentDidMount() {
    Axios.get(`${API_URL}/articles`)
      .then(res => {
        this.setState({
          loading: false,
          articles: res.data,
        });
      })
      .catch(err => this.setState({ loading: false, error: err }));
  }
  public render() {
    return this.props.children({
      loading: this.state.loading,
      error: this.state.error,
      articles: this.state.articles,
    });
  }
}
