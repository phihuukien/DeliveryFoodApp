import { Dispatch } from "redux";
import { OrderService } from "../services";
const types = {
    GET_REVIEW: 'GET_REVIEW',
};

const getREVIEW = () => {
    return (dispatch: Dispatch) => {
        OrderService.getOrderHistory().then((response) => {
            if (response?.status) {
                dispatch({
                    type: types.GET_REVIEW,
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
    getREVIEW,
    types,
};


