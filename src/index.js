import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

// will delete
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
// continue on


import { App } from 'components/App';
import { Error } from 'containers/Error';
import { rootReducer } from 'sdb-redux';
import registerServiceWorker from './registerServiceWorker';

// create store with middleware
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

// redux store setup
const store = createStoreWithMiddleware(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


render(
  <Provider store={store}>
    <BrowserRouter>
      <Error>
        <App />
      </Error>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
