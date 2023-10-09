import {combineReducers} from 'redux';

import GeneralReducer from './GeneralReducer';
import CartReducer from './CartReducer';
import BookmarkReducer from './BookmarkReducer';
import OrderReducer from './OrderReducer';
import ReviewReducer from './ReviewReducer';

export default combineReducers({
  generalState: GeneralReducer,
  cartState: CartReducer,
  bookmarkState: BookmarkReducer,
  orderState: OrderReducer,
  reviewState: ReviewReducer
});