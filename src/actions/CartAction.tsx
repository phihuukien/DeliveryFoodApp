import {CartService, StorageService} from '../services';
import CartAction from './CartAction';
import { Dispatch } from "redux";

const types = {
  GET_CART_ITEMS: 'GET_CART_ITEMS',
  GET_CART_DETAIL: 'GET_CART_DETAIL',
};

const getCartItemsSetReduer = () =>{
  return (dispatch:Dispatch) => {
    CartService.getCartItems().then(cartResponse=>{
      dispatch({
        type: types.GET_CART_ITEMS,
        payload: cartResponse?.data,
      });
    }).catch((error)=>{
      console.log(error);
    })
  }
}

const getCartItemsdDetailSetReduer = () =>{
  return (dispatch:Dispatch) => {
    CartService.getCartItemsDetail().then(cartResponse=>{
      console.log(cartResponse?.data);
      dispatch({
        type: types.GET_CART_DETAIL,
        payload: cartResponse?.data,
      });
    }).catch((error)=>{
      console.log(error);
    })
  }
}

const addToCart = ({cart}:any) => {
  return (dispatch:Dispatch) => {
    CartService.addToCart(cart)
      .then(cartResponse => {  
        console.log(cartResponse.data.data);
        dispatch({
          type: types.GET_CART_DETAIL,
          payload: cartResponse?.data.data,
        });

        CartService.getCartItems().then(cartResponse=>{
          dispatch({
            type: types.GET_CART_ITEMS,
            payload: cartResponse?.data,
          });
        }).catch((error)=>{
          console.log(error);
        })
        
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
const removeFromCart = ({cart}:any) => {
  return (dispatch:Dispatch) => {
    CartService.removeFromCart(cart)
      .then(cartResponse => {
        dispatch({
          type: types.GET_CART_DETAIL,
          payload: cartResponse?.data.data,
        });

        CartService.getCartItems().then(cartResponse=>{
          dispatch({
            type: types.GET_CART_ITEMS,
            payload: cartResponse?.data,
          });
        }).catch((error)=>{
          console.log(error);
        })
      })
      .catch((error) => {
        console.log(error);
      });
  };
};


export default {
  addToCart,
  removeFromCart,
  getCartItemsSetReduer,
  types,
  getCartItemsdDetailSetReduer
};
