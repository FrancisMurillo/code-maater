import {handleActions} from "redux-actions";

import {requestKey} from "../App";
import {receiveData} from "../request";

const initialState = {};

export const reducer = handleActions({
    [receiveData]: (state, action) => {
        if (action.meta.request === requestKey) {
            return {
                ...state,
                ...action.payload
            };
        } else {
            return state;
        }
    }
}, initialState);
