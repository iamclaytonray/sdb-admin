import { combineReducers } from 'redux';
import announcements from './announcement_reducer';
import posts from './post_reducer';
import products from './product_reducer';
import services from './service_reducer';

const rootReducer = combineReducers({
  announcements,
  posts,
  products,
  services
});

export default rootReducer;