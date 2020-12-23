import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import * as Pages from './pages';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Redirect to={{ pathname: '/' }} />;
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export const Root = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Pages.Login} />

        {/* Resources */}
        <PrivateRoute
          exact
          path="/dashboard/resources"
          component={Pages.Resources}
        />
        <PrivateRoute
          exact
          path="/dashboard/resources/new"
          component={Pages.CreateResource}
        />
        <PrivateRoute
          exact
          path="/dashboard/resources/:id"
          component={Pages.ResourceDetails}
        />

        {/* Events */}
        <PrivateRoute exact path="/dashboard/events" component={Pages.Events} />
        <PrivateRoute
          exact
          path="/dashboard/events/new"
          component={Pages.CreateEvent}
        />
        <PrivateRoute
          exact
          path="/dashboard/events/:id"
          component={Pages.EventDetails}
        />

        {/* Sermons */}
        <PrivateRoute
          exact
          path="/dashboard/sermons"
          component={Pages.Sermons}
        />
        <PrivateRoute
          exact
          path="/dashboard/sermons/new"
          component={Pages.CreateSermon}
        />
        <PrivateRoute
          exact
          path="/dashboard/sermons/:id"
          component={Pages.SermonDetails}
        />

        <Route component={Pages.NotFound} />
      </Switch>
    </>
  );
};
