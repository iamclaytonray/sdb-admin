import Axios from 'axios';
import * as React from 'react';
import { API_URL } from '../../constants';

interface Props {
  children(props: State): React.ReactNode;
}

interface State {
  loading: boolean;
  error: string | null;
  media: Media[];
}

interface Media {
  slug: string;
  mediaUri: string;
  description: string;
}

export class AllMediaContainer extends React.Component<Props, State> {
  public state = {
    loading: true,
    error: null,
    media: [],
  };
  public componentDidMount() {
    Axios.get(`${API_URL}/media`)
      .then(res => {
        this.setState({
          loading: false,
          media: res.data.data,
        });
      })
      .catch(err => this.setState({ loading: false, error: err }));
  }
  public render() {
    return this.props.children({
      loading: this.state.loading,
      error: this.state.error,
      media: this.state.media,
    });
  }
}
