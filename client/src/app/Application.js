import {handleActions} from "redux-actions";

import {requestKey} from "../App";
import {receiveData} from "../request";
import {refreshData} from "../toolbar";

const initialState = {
    "minDate": null,
    "maxDate": null
};

export const reducer = handleActions({
    [receiveData]: (state, action) => {
        if (action.meta.request === requestKey) {
            return {
                ...state,
                "minDate": action.payload.minDate,
                "maxDate": action.payload.maxDate
            };
        } else {
            return state;
        }
    }
}, initialState);

export const requestReducer = handleActions({
    [refreshData]: (state, _action) => ({
        ...state,
        "request": {"app": state.request.app},
        "grid": {}
    })
}, {});
