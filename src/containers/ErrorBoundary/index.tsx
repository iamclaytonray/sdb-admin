import * as React from 'react';

import { Error } from '../../components/Error';

export class ErrorBoundary extends React.Component<any, any> {
  public state = { hasError: false };

  public componentDidCatch(error: any, _info: any) {
    console.log(error);
    this.setState({ hasError: true });
  }

  public render() {
    if (this.state.hasError) {
      return <Error error="Something went wrong" />;
    }
    return this.props.children;
  }
}
