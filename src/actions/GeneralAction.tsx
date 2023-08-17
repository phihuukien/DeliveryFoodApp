import { AuthenticationService, StorageService, UserService } from '../services';
import { Dispatch } from "redux";
import BookmarkAction from './BookmarkAction';
import { useDispatch } from 'react-redux';
import CartAction from './CartAction';

const types = {
  SET_IS_APP_LOADING: 'SET_IS_APP_LOADING',
  SET_FIRST_TIME_USE: 'SET_FIRST_TIME_USE',
  SET_TOKEN: 'SET_TOKEN',
  SET_USER_DATA: 'SET_USER_DATA',
  SET_LOADING_START:'SET_LOADING_START'
};

const setIsAppLoading = (isAppLoading: any) => {
  return {
    type: types.SET_IS_APP_LOADING,
    payload: isAppLoading,
  };
};
const setIsAppLoadingStart = (isAppLoadingStart: any) => {
  return {
    type: types.SET_LOADING_START,
    payload: isAppLoadingStart,
  };
};

const setIsFirstTimeUse = () => {
  return {
    type: types.SET_FIRST_TIME_USE,
    payload: false,
  };
};

const setToken = (token: any) => {
  return {
    type: types.SET_TOKEN,
    payload: token,
  };
};
const setUserData = () => {
  return  (dispatch: Dispatch)=> {
    UserService.getUserData().then(userResponse => {
        if (userResponse?.status) {
          dispatch({
            type: types.SET_USER_DATA,
            payload: userResponse?.data,
          });
        }
        dispatch<any>(CartAction.getCartItemsSetReduer());
        dispatch<any>(CartAction.getCartItemsdDetailSetReduer());
    })
  };
};
const appStart = () => {
  return (dispatch: Dispatch, getState: any) => {
    StorageService.getFirstTimeUse().then(isFirstTimeUse => {
      dispatch({
        type: types.SET_FIRST_TIME_USE,
        payload: isFirstTimeUse ? false : true,
      });
    });
    StorageService.getToken().then((token) => {
      if (token) {
        dispatch({
          type: types.SET_TOKEN,
          payload: token,
        }); 
       
        UserService.getUserData().then(userResponse => {
          if (userResponse?.status) {
            dispatch({
              type: types.SET_USER_DATA,
              payload: userResponse?.data,
            });
            dispatch<any>(CartAction.getCartItemsdDetailSetReduer());
            dispatch<any>(CartAction.getCartItemsSetReduer());
          } else if (userResponse?.statusCode === 401) {
            AuthenticationService.refreshToken().then(tokenResponse => {
              if (tokenResponse?.data.status) {
                dispatch({
                  type: types.SET_TOKEN,
                  payload: tokenResponse?.data.accessToken,
                });
                StorageService.setToken(tokenResponse?.data.accessToken);
                UserService.getUserData().then(userResponse => {
                  if (userResponse?.status) {
                    dispatch({
                      type: types.SET_USER_DATA,
                      payload: userResponse?.data,
                    });
                    dispatch<any>(CartAction.getCartItemsdDetailSetReduer());
                    dispatch<any>(CartAction.getCartItemsSetReduer());
                  }
                });
              } else {
                dispatch({
                  type: types.SET_TOKEN,
                  payload: '',
                });
                StorageService.setToken('');
              }
            });
          }
        });
       
      }
      dispatch({
        type: types.SET_IS_APP_LOADING,
        payload: false,
      });
    });
  };
};

export default {
  setIsAppLoading,
  setIsFirstTimeUse,
  setToken,
  types,
  appStart,
  setUserData,
  setIsAppLoadingStart
};