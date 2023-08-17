import {GeneralAction} from '../actions';

const initialState = {
  isAppLoading: true,
  token: '',
  isFirstTimeUse: true,
  userData: {},
  isLoadingStart:-1

};

export default (state = initialState, action:any) => {
  switch (action.type) {
    
    case GeneralAction.types.SET_IS_APP_LOADING:
      return {...state, isAppLoading: action.payload};
    case GeneralAction.types.SET_TOKEN:
      return {...state, token: action.payload};
    case GeneralAction.types.SET_FIRST_TIME_USE:
      return {...state, isFirstTimeUse: action.payload};
    case GeneralAction.types.SET_USER_DATA:
        return {...state, userData: action.payload};
        case GeneralAction.types.SET_LOADING_START:
          return {...state, isLoadingStart: action.payload};
    default:
      return state;
  }
};