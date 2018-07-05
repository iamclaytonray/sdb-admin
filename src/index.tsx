import ApolloClient from 'apollo-boost';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// containers
import { ErrorBoundary } from 'containers/ErrorBoundary';
import { Root } from 'containers/Root';

import 'bootstrap/dist/css/bootstrap.css';
import './assets/scss/dashboard.scss';
import { API_URL } from './constants';

const client = new ApolloClient({
  uri: API_URL,
  request: async operation => {
    const token = await localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token,
      },
    });
  },
});

render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <ErrorBoundary>
        <Root />
      </ErrorBoundary>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root'),
);