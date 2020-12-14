import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import * as React from 'react';
import {  Redirect, Route, Switch } from 'react-router';

import { ToastContext } from './context/ToastContext';
import * as Pages from './pages';
import { CreateEventPage } from './pages/CreateEvent';
import { CreateResourcePage } from './pages/CreateResource';
import { CreateSermonPage } from './pages/CreateSermon';
import { Dashboard } from './pages/Dashboard';
import { EventDetailsPage } from './pages/EventDetails';
import { LoginPage } from './pages/Login';
import { NotFoundPage } from './pages/NotFound';
import { ResourceDetailsPage } from './pages/ResourceDetails';
import { SermonDetailsPage } from './pages/SermonDetails';

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
   
      return localStorage.getItem('token') !== null ? (
          <Component {...props} />
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

export const Root = () => {
  const toast = React.useContext(ToastContext);

  return (
    <>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />

        {/* Resources */}
        <Route
          exact
          path="/dashboard/resources"
          component={Pages.Resources}
        />
        <PrivateRoute
          exact
          path="/dashboard/resources/new"
          component={CreateResourcePage}
        />
        <PrivateRoute
          exact
          path="/dashboard/resources/:id"
          component={ResourceDetailsPage}
        />

        {/* Events */}
        <Route
          exact
          path="/dashboard/events"
          component={Pages.Events}
        />
        <PrivateRoute
          exact
          path="/dashboard/events/new"
          component={CreateEventPage}
        />
        <PrivateRoute
          exact
          path="/dashboard/events/:id"
          component={EventDetailsPage}
        />

        {/* Sermons */}
        <Route
          exact
          path="/dashboard/sermons"
          component={Pages.Sermons}
        />
        <PrivateRoute
          exact
          path="/dashboard/sermons/new"
          component={CreateSermonPage}
        />
        <PrivateRoute
          exact
          path="/dashboard/sermons/:id"
          component={SermonDetailsPage}
        />

        <Route component={NotFoundPage} />
      </Switch>
      <Snackbar
        open={toast.isOpen}
        message={toast.message}
        autoHideDuration={5000}
        onClose={toast.handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={toast.handleClose}
          severity={toast.message === 'Success' ? 'success' : 'error'}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  );
};
