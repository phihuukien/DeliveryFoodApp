import ReviewAction from "../actions/ReviewAction";


const initialState = {
    review: []
};

export default (state = initialState, action: any) => {
    switch (action.type) {
        case ReviewAction.types.GET_REVIEW:
            return { ...state, review: action.payload };
        default:
            return state;
    }
};