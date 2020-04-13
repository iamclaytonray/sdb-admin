import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { Layout } from '../../components/Layout';

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      // TODO(clayton): fixme
      const title =
        props.match.params && props.location.pathname.includes('services')
          ? 'Single Sermon'
          : 'Unknown';
      return localStorage.getItem('token') !== null ? (
        <Layout title={title}>
          <Component {...props} />
        </Layout>
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location },
          }}
        />
      );
    }}
  />
);
