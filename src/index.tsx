import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// containers
import { ErrorBoundary } from 'containers/ErrorBoundary';
import { Root } from 'containers/Root';

import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.css';
import './assets/scss/dashboard.scss';

render(
  <BrowserRouter>
    <ErrorBoundary>
      <Root />
    </ErrorBoundary>
  </BrowserRouter>,
  document.getElementById('root'),
);

registerServiceWorker();
