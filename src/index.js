import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
// import routes from './routes';
// import reducers from './redux/reducers/index';
// import './scss/application.scss';

import { App } from 'components/App';
import { ErrorBoundary } from 'containers/ErrorBoundary';

// // create store with middleware
// const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

// // redux store setup
// const store = createStoreWithMiddleware(
//   reducers,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

// render
render(
  <Provider store={store}>
    <BrowserRouter>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);