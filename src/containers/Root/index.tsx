import * as React from 'react';
import { Route, Switch } from 'react-router';

// Components
import { DashboardWrapper } from 'components/DashboardWrapper';
import { Sidebar } from 'components/Sidebar';

// Pages
import { AllAnnouncementsPage } from 'pages/AllAnnouncementsPage';
import { AllArticlesPage } from 'pages/AllArticlesPage';
import { AllProductsPage } from 'pages/AllProductsPage';
import { AllServicesPage } from 'pages/AllServicesPage';
import { DashboardPage } from 'pages/DashboardPage';
import { LoginPage } from 'pages/LoginPage';
import { NewAnnouncementPage } from 'pages/NewAnnouncementPage';
import { NewArticlePage } from 'pages/NewArticlePage';
import { NewProductPage } from 'pages/NewProductPage';
import { NewServicePage } from 'pages/NewServicePage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { SingleAnnouncementPage } from 'pages/SingleAnnouncementPage';
import { SingleArticlePage } from 'pages/SingleArticlePage';
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

          {/* Announcements */}
          <Route
            exact
            path="/dashboard/announcements"
            component={AllAnnouncementsPage}
          />
          <Route
            exact
            path="/dashboard/announcements/new"
            component={NewAnnouncementPage}
          />
          <Route
            exact
            path="/dashboard/announcements/:slug"
            component={SingleAnnouncementPage}
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
