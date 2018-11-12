import { DashboardWrapper } from 'components/DashboardWrapper';
import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('token') !== null ? (
        <DashboardWrapper>
          <Component {...props} />
        </DashboardWrapper>
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);
