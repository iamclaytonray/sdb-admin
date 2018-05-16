import { Error } from 'components/Error';
import * as Raven from 'raven-js';
import * as React from 'react';

function logException(ex: any, context: any) {
  Raven.captureException(ex, {
    extra: context,
  });
  // window.console && console.error && console.error(ex);
  console.error(ex);
}

export class ErrorBoundary extends React.Component<any, any> {
  public state = { hasError: false };

  public componentDidCatch(error: any, info: any) {
    this.setState({ hasError: true });
    logException(error, info);
  }

  public render() {
    if (this.state.hasError) {
      return <Error error="Something went wrong" />;
    }
    return this.props.children;
  }
}
