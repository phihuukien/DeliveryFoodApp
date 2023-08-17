import OrderAction from "../actions/OrderAction";


const initialState = {
    orderComming: [], 
    orderHistory:[],
};

export default (state = initialState, action:any) => {
  switch (action.type) {
    case OrderAction.types.GET_ORDERCOMMING:
      return {...state, orderComming: action.payload};
      case OrderAction.types.GET_ORDERHISTORY:
        return {...state, orderHistory: action.payload};
    default:
      return state;
  }
};