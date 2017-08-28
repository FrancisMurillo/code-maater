import {handleActions} from "redux-actions";

import {requestKey} from "../App";
import {receiveData} from "../request";

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
