import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { App } from 'components/App';
import { Error } from 'containers/Error';
import { store } from 'sdb-redux';
import registerServiceWorker from './registerServiceWorker';

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
