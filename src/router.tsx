import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import { Layout } from './components/Layout';
import { PrivateRoute } from './containers/PrivateRoute';
import { All } from './pages/All';
import { CreateEventPage } from './pages/CreateEvent';
import { CreateResourcePage } from './pages/CreateResource';
import { CreateSermonPage } from './pages/CreateSermon';
import { Dashboard } from './pages/Dashboard';
import { EventDetailsPage } from './pages/EventDetails';
import { LoginPage } from './pages/Login';
import { NotFoundPage } from './pages/NotFound';
import { ResourceDetailsPage } from './pages/ResourceDetails';
import { SermonDetailsPage } from './pages/SermonDetails';

export const Root = () => (
  <Switch>
    <Route exact path="/" component={LoginPage} />
    <PrivateRoute exact path="/dashboard" component={Dashboard} />

    {/* Resources */}
    <Route
      exact
      path="/dashboard/resources"
      render={(props: any) =>
        localStorage.getItem('token') !== null ? (
          <Layout title="Resources">
            <All
              resource="resources"
              title="Discoveries"
              buttonText="Discovery"
              {...props}
            />
          </Layout>
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
    <PrivateRoute
      exact
      path="/dashboard/resources/new"
      component={CreateResourcePage}
    />
    <PrivateRoute
      exact
      path="/dashboard/resources/:slug"
      component={ResourceDetailsPage}
    />

    {/* Events */}
    <Route
      exact
      path="/dashboard/events"
      render={(props: any) =>
        localStorage.getItem('token') !== null ? (
          <Layout title="Events">
            <All
              resource="events"
              title="Events"
              buttonText="Event"
              {...props}
            />
          </Layout>
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
    <PrivateRoute
      exact
      path="/dashboard/events/new"
      component={CreateEventPage}
    />
    <PrivateRoute
      exact
      path="/dashboard/events/:slug"
      component={EventDetailsPage}
    />

    {/* Sermons */}
    <Route
      exact
      path="/dashboard/sermons"
      render={(props: any) =>
        localStorage.getItem('token') !== null ? (
          <Layout title="Sermons">
            <All
              resource="sermons"
              title="Teachings"
              buttonText="Teaching"
              {...props}
            />
          </Layout>
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
    <PrivateRoute
      exact
      path="/dashboard/sermons/new"
      component={CreateSermonPage}
    />
    <PrivateRoute
      exact
      path="/dashboard/sermons/:slug"
      component={SermonDetailsPage}
    />

    <Route component={NotFoundPage} />
  </Switch>
);
