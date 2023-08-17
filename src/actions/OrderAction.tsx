import { Dispatch } from "redux";
import { OrderService } from "../services";
const types = {
    GET_ORDERCOMMING: 'GET_ORDERCOMMING',
    GET_ORDERHISTORY: 'GET_ORDERHISTORY',
};
const getOrderComing = () => {
    return (dispatch: Dispatch) => {

        OrderService.getOrderComing().then((response) => {
            if (response?.status) {
                dispatch({
                    type: types.GET_ORDERCOMMING,
                    payload: response?.data,
                });
            } else {
                dispatch({
                    type: types.GET_ORDERCOMMING,
                    payload: [],
                });
            }
        }).catch((error) => {
            console.log(error);
        })
    }
}

const getOrderHistory = () => {
    return (dispatch: Dispatch) => {

        OrderService.getOrderHistory().then((response) => {
            if (response?.status) {
                dispatch({
                    type: types.GET_ORDERHISTORY,
                    payload: response?.data,
                });
            } else {
                console.log(response.message);
            }
        }).catch((error) => {
            console.log(error);
        })
    }
}


export default {
    getOrderComing,
    getOrderHistory,
    types,
};


