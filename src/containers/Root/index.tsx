import * as React from 'react';
import { Route, Switch } from 'react-router';

// Components
import { DashboardWrapper } from 'components/DashboardWrapper';
import { Sidebar } from 'components/Sidebar';

// Pages
import { AllArticlesPage } from 'pages/AllArticlesPage';
import { AllEventsPage } from 'pages/AllEventsPage';
import { AllMediasPage } from 'pages/AllMediaPage';
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
          <Route exact path="/dashboard" component={DashboardPage} />

          {/* Events */}
          <Route exact path="/dashboard/events" component={AllEventsPage} />
          <Route exact path="/dashboard/events/new" component={NewEventPage} />
          <Route
            exact
            path="/dashboard/events/:slug"
            component={SingleEventPage}
          />

          {/* Articles */}
          <Route exact path="/dashboard/articles" component={AllArticlesPage} />
          <Route
            exact
            path="/dashboard/articles/new"
            component={NewArticlePage}
          />
          <Route
            exact
            path="/dashboard/articles/:slug"
            component={SingleArticlePage}
          />

          {/* Services */}
          <Route exact path="/dashboard/services" component={AllServicesPage} />
          <Route
            exact
            path="/dashboard/services/new"
            component={NewServicePage}
          />
          <Route
            exact
            path="/dashboard/services/:slug"
            component={SingleServicePage}
          />

          {/* Media */}
          <Route exact path="/dashboard/media" component={AllMediasPage} />
          <Route exact path="/dashboard/media/new" component={NewMediaPage} />

          {/* Products */}
          <Route exact path="/dashboard/products" component={AllProductsPage} />
          <Route
            exact
            path="/dashboard/products/new"
            component={NewProductPage}
          />
          <Route
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
