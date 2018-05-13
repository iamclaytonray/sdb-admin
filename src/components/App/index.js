import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './main.css';

// components
import { Dashboard } from 'components/Dashboard';
import { NotFound } from 'components/NotFound';
import { Sidebar } from 'components/Sidebar';

// containers
import AnnouncementList from 'containers/AnnouncementList';
import AnnouncementListItem from 'containers/AnnouncementListItem';
import ArticleList from 'containers/ArticleList';
import ArticleListItem from 'containers/ArticleListItem';
import ProductList from 'containers/ProductList';
import ProductListItem from 'containers/ProductListItem';
import ServiceList from 'containers/ServiceList';
import ServiceListItem from 'containers/ServiceListItem';

export const App = () => {
  return (
    <div>

      <Sidebar />

      <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route exact path='/announcements' component={AnnouncementList} />
        <Route exact path='/announcements/:slug' component={AnnouncementListItem} />
        <Route exact path='/articles' component={ArticleList} />
        <Route exact path='/articles/:slug' component={ArticleListItem} />
        <Route exact path='/products' component={ProductList} />
        <Route exact path='/products/:slug' component={ProductListItem} />
        <Route exact path='/services' component={ServiceList} />
        <Route exact path='/services/:slug' component={ServiceListItem} />
        <Route component={NotFound} />
      </Switch>

    </div>
  );
}