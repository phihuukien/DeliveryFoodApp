import { Dispatch } from "redux";
import {AuthenticationService, BookmarkService, StorageService, UserService} from '../services';
import GeneralAction from "./GeneralAction";

const types = {
  GET_BOOKMARKS: 'GET_BOOKMARKS',
  SET_IS_LOADING: 'SET_IS_LOADING',
};

const addBookmark = ({restaurantId}:any) => {
  return (dispatch:Dispatch) => {
    dispatch({
      type: types.SET_IS_LOADING,
      payload: true,
    });
    BookmarkService.addBookmark({restaurantId})
      .then(bookmarkResponse => {
        dispatch({
          type: types.GET_BOOKMARKS,
          payload: bookmarkResponse?.data?.data,
        });
      })
      .catch(() => {
        dispatch({
          type: types.SET_IS_LOADING,
          payload: false,
        });
      });
  };
};

const setDataBookmark = (data:any) =>{
  return {
    type: types.GET_BOOKMARKS,
    payload: data,
  };
}

const removeBookmark = ({restaurantId}:any) => {
  return (dispatch:Dispatch) => {
    dispatch({
      type: types.SET_IS_LOADING,
      payload: true,
    });
    BookmarkService.removeBookmark({restaurantId})
      .then(bookmarkResponse => {
        if(bookmarkResponse.status){
          dispatch({
            type: types.GET_BOOKMARKS,
            payload: bookmarkResponse?.data?.data,
          });
        }else if (bookmarkResponse?.statusCode === 401) {
          AuthenticationService.refreshToken().then(tokenResponse => {
            if (tokenResponse?.data.status) {
              dispatch<any>(GeneralAction.setToken(tokenResponse?.data.accessToken));
              StorageService.setToken(tokenResponse?.data.accessToken);
              BookmarkService.removeBookmark({restaurantId}).then(bookmarkResponse => {
                if (bookmarkResponse?.status) {
                  dispatch({
                    type: types.GET_BOOKMARKS,
                    payload: bookmarkResponse?.data?.data,
                  });
                }
              });
            } else {
              dispatch(GeneralAction.setToken(''));
              StorageService.setToken('');
            }
          });
        }
      })
  };
};

const getBookmarks = () => {
  return (dispatch:Dispatch) => {
    BookmarkService.getBookmarks()
      .then(bookmarkResponse => {
        if(bookmarkResponse.status){
          dispatch({
            type: types.GET_BOOKMARKS,
            payload: bookmarkResponse?.data,
          });
        }else if (bookmarkResponse?.statusCode === 401) {
          AuthenticationService.refreshToken().then(tokenResponse => {
            if (tokenResponse?.data.status) {
              dispatch<any>(GeneralAction.setToken(tokenResponse?.data.accessToken));
              StorageService.setToken(tokenResponse?.data.accessToken);
              BookmarkService.getBookmarks().then(bookmarkResponse => {
                if (bookmarkResponse?.status) {
                  dispatch({
                    type: types.GET_BOOKMARKS,
                    payload: bookmarkResponse?.data,
                  });
                }
              });
            } else {
              dispatch(GeneralAction.setToken(''));
              StorageService.setToken('');
            }
          });
        }
      })
  };
};

export default {types, addBookmark, removeBookmark, getBookmarks,setDataBookmark};