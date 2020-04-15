import { combineReducers } from 'redux';

import { eventsReducer } from './events';
import { resourcesReducer } from './resources';
import { sermonsReducer } from './sermons';

export const rootReducer = combineReducers({
  events: eventsReducer,
  resources: resourcesReducer,
  sermons: sermonsReducer,
});
