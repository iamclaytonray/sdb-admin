import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import { rootReducer } from './reducers';

const middlewares = [thunk];

const persistConfig = {
  key: 'SDB:',
  blacklist: [],
  whitelist: ['sermons', 'events', 'resources', 'user'],
  keyPrefix: 'SDB:',
  storage,
};

// If the app is not running in prod, add logger to the middleware
if (process.env.NODE_ENV !== 'production') {
  const logger = createLogger({
    duration: true,
  });
  middlewares.push(logger as any);
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middlewares)),
);

export const persistor = persistStore(store);
