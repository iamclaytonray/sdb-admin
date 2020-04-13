import { CssBaseline } from '@material-ui/core';
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { ErrorBoundary } from './containers/ErrorBoundary';
import { Root } from './router';
import { persistor, store } from './store/store';

render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <CssBaseline />
      <BrowserRouter>
        <ErrorBoundary>
          <Root />
        </ErrorBoundary>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
