import Axios from 'axios';
import * as React from 'react';
import { API_URL } from '../../constants';

interface Props {
  children(props: State): React.ReactNode;
}

interface State {
  loading: boolean;
  error: string | null;
  products: Array<Object>;
}

export class AllProductsContainer extends React.Component<Props, State> {
  public state = {
    loading: true,
    error: null,
    products: [],
  };
  public componentDidMount() {
    Axios.get(`${API_URL}/products`)
      .then(res => {
        this.setState({
          loading: false,
          products: res.data,
        });
      })
      .catch(err => this.setState({ loading: false, error: err }));
  }
  public render() {
    return this.props.children({
      loading: this.state.loading,
      error: this.state.error,
      products: this.state.products,
    });
  }
}
