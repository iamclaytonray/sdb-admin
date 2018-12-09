import * as React from 'react';

import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { combineReducers, createStore } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

// containers
import { ErrorBoundary } from 'containers/ErrorBoundary';
import { Root } from 'containers/Root';

import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.css';
import './assets/scss/dashboard.scss';

const reducer = combineReducers({
  form: reduxFormReducer,
});

// const store = createStore(reducer);
const w: any = window;
const store = createStore(
  reducer,
  w.__REDUX_DEVTOOLS_EXTENSION__ && w.__REDUX_DEVTOOLS_EXTENSION__(),
);

render(
  <Provider store={store}>
    <BrowserRouter>
      <ErrorBoundary>
        <Root />
      </ErrorBoundary>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
