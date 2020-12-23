import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import * as React from 'react';
import { render } from 'react-dom';
import 'react-mde/lib/styles/css/react-mde-all.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import './assets/application.scss';
import { ErrorBoundary } from './containers/ErrorBoundary';
import { ModalProvider } from './context/ModalContext';
import { ToastProvider } from './context/ToastContext';
import { Root } from './router';
import { persistor, store } from './store/store';
import { theme } from './utils/theme';

render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <ErrorBoundary>
            <ModalProvider>
              <ToastProvider>
                <Root />
              </ToastProvider>
            </ModalProvider>
          </ErrorBoundary>
        </BrowserRouter>
      </MuiThemeProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
