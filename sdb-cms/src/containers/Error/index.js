import React, { Component } from 'react';
import Raven from 'raven-js';

function logException(ex, context) {
  Raven.captureException(ex, {
    extra: context
  });
  window.console && console.error && console.error(ex);
}

export class Error extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    logException(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }
    return this.props.children
  }
}
