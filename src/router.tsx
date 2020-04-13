import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import { Layout } from './components/Layout';
import { PrivateRoute } from './containers/PrivateRoute';
import { All } from './pages/All';
import { Dashboard } from './pages/Dashboard';
import { LoginPage } from './pages/LoginPage';
import { NewArticlePage } from './pages/NewArticlePage';
import { NewEventPage } from './pages/NewEventPage';
import { NewJewishPage } from './pages/NewJewishPage';
import { NewServicePage } from './pages/NewServicePage';
import { NewTabPage } from './pages/NewTabPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { SingleArticlePage } from './pages/SingleArticlePage';
import { SingleEventPage } from './pages/SingleEventPage';
import { SingleJewishPage } from './pages/SingleJewishPage';
import { SingleServicePage } from './pages/SingleServicePage';
import { SingleTabPage } from './pages/SingleTabPage';

export const Root = () => (
  <Switch>
    <Route exact path="/" component={LoginPage} />
    <PrivateRoute exact path="/dashboard" component={Dashboard} />

    {/* Articles */}
    <Route
      exact
      path="/dashboard/articles"
      render={(props: any) =>
        localStorage.getItem('token') !== null ? (
          <Layout title="Articles">
            <All
              resource="articles"
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
      path="/dashboard/articles/new"
      component={NewArticlePage}
    />
    <PrivateRoute
      exact
      path="/dashboard/articles/:slug"
      component={SingleArticlePage}
    />

    {/* Jewish */}
    <Route
      exact
      path="/dashboard/jewish"
      render={(props: any) =>
        localStorage.getItem('token') !== null ? (
          <Layout title="Jewish">
            <All
              resource="jewish"
              title="Jewish"
              buttonText="Jewish"
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
      path="/dashboard/jewish/new"
      component={NewJewishPage}
    />
    <PrivateRoute
      exact
      path="/dashboard/jewish/:slug"
      component={SingleJewishPage}
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
    <PrivateRoute exact path="/dashboard/events/new" component={NewEventPage} />
    <PrivateRoute
      exact
      path="/dashboard/events/:slug"
      component={SingleEventPage}
    />

    {/* Tabs */}
    <Route
      exact
      path="/dashboard/tabs"
      render={(props: any) =>
        localStorage.getItem('token') !== null ? (
          <Layout title="Menu Items">
            <All
              resource="tabs"
              title="Menu Items"
              buttonText="Menu Item"
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
    <PrivateRoute exact path="/dashboard/tabs/new" component={NewTabPage} />
    <PrivateRoute
      exact
      path="/dashboard/tabs/:slug"
      component={SingleTabPage}
    />

    {/* Services */}
    <Route
      exact
      path="/dashboard/services"
      render={(props: any) =>
        localStorage.getItem('token') !== null ? (
          <Layout title="Sermons">
            <All
              resource="services"
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
      path="/dashboard/services/new"
      component={NewServicePage}
    />
    <PrivateRoute
      exact
      path="/dashboard/services/:slug"
      component={SingleServicePage}
    />

    <Route component={NotFoundPage} />
  </Switch>
);
