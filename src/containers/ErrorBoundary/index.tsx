import * as React from 'react';

export class ErrorBoundary extends React.Component<any, any> {
  public state = { hasError: false };

  public componentDidCatch(error: any, _info: any) {
    console.log(error);
    this.setState({ hasError: true });
  }

  public render() {
    if (this.state.hasError) {
      return <p>Something went wrong</p>;
    }

    return this.props.children;
  }
}
