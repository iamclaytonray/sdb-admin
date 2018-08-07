import * as React from 'react';
import { Route, Switch } from 'react-router';

// Containers
import { PrivateRoute } from 'containers/PrivateRoute';

// Components
import { DashboardWrapper } from 'components/DashboardWrapper';
import { Sidebar } from 'components/Sidebar';

// Pages
import { AllArticlesPage } from 'pages/AllArticlesPage';
import { AllEventsPage } from 'pages/AllEventsPage';
import { AllMediasPage } from 'pages/AllMediaPage';
import { AllPartsPage } from 'pages/AllPartsPage';
import { AllProductsPage } from 'pages/AllProductsPage';
import { AllServicesPage } from 'pages/AllServicesPage';
import { DashboardPage } from 'pages/DashboardPage';
import { LoginPage } from 'pages/LoginPage';
import { NewArticlePage } from 'pages/NewArticlePage';
import { NewEventPage } from 'pages/NewEventPage';
import { NewMediaPage } from 'pages/NewMediaPage';
import { NewProductPage } from 'pages/NewProductPage';
import { NewServicePage } from 'pages/NewServicePage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { SingleArticlePage } from 'pages/SingleArticlePage';
import { SingleEventPage } from 'pages/SingleEventPage';
import { SingleProductPage } from 'pages/SingleProductPage';
import { SingleServicePage } from 'pages/SingleServicePage';

export const Root = () => {
  return (
    <React.Fragment>
      <DashboardWrapper>
        <Sidebar />
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <PrivateRoute exact path="/dashboard" component={DashboardPage} />

          {/* Events */}
          <PrivateRoute
            exact
            path="/dashboard/events"
            component={AllEventsPage}
          />
          <PrivateRoute
            exact
            path="/dashboard/events/new"
            component={NewEventPage}
          />
          <PrivateRoute
            exact
            path="/dashboard/events/:slug"
            component={SingleEventPage}
          />

          {/* Articles */}
          <PrivateRoute
            exact
            path="/dashboard/articles"
            component={AllArticlesPage}
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

          {/* Parts */}
          <PrivateRoute
            exact
            path="/dashboard/parts"
            component={AllPartsPage}
          />
          {/* <Route exact path="/dashboard/parts/new" component={NewPartPage} />
          <Route
            exact
            path="/dashboard/parts/:slug"
            component={SinglePartPage}
          /> */}

          {/* Services */}
          <PrivateRoute
            exact
            path="/dashboard/services"
            component={AllServicesPage}
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

          {/* Media */}
          <PrivateRoute
            exact
            path="/dashboard/media"
            component={AllMediasPage}
          />
          <PrivateRoute
            exact
            path="/dashboard/media/new"
            component={NewMediaPage}
          />

          {/* Products */}
          <PrivateRoute
            exact
            path="/dashboard/products"
            component={AllProductsPage}
          />
          <PrivateRoute
            exact
            path="/dashboard/products/new"
            component={NewProductPage}
          />
          <PrivateRoute
            exact
            path="/dashboard/products/:slug"
            component={SingleProductPage}
          />

          <Route component={NotFoundPage} />
        </Switch>
      </DashboardWrapper>
    </React.Fragment>
  );
};
