import { Error } from 'components/Error';
import * as React from 'react';

export class ErrorBoundary extends React.Component<any, any> {
  public state = { hasError: false };

  public componentDidCatch(error: any, info: any) {
    this.setState({ hasError: true });
  }

  public render() {
    if (this.state.hasError) {
      return <Error error="Something went wrong" />;
    }
    return this.props.children;
  }
}
