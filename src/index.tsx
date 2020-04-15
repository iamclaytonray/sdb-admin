import { CssBaseline } from '@material-ui/core';
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import './assets/application.css';
import { ErrorBoundary } from './containers/ErrorBoundary';
import { ToastProvider } from './context/ToastContext';
import { Root } from './router';
import { persistor, store } from './store/store';

render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <CssBaseline />
      <BrowserRouter>
        <ErrorBoundary>
          <ToastProvider>
            <Root />
          </ToastProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
