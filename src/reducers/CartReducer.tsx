import {CartAction} from '../actions';

const initialState = {
  cart: {}, 
  cartDetail:{},
};

export default (state = initialState, action:any) => {
  switch (action.type) {
    case CartAction.types.GET_CART_ITEMS:
      return {...state, cart: action.payload};
      case CartAction.types.GET_CART_DETAIL:
        return {...state, cartDetail: action.payload};
    default:
      return state;
  }
};