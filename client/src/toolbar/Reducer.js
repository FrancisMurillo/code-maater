import {handleActions} from "redux-actions";

import {
    changeStartDate,
    changeEndDate,
    clearFilters
} from "./Action";

const initialState = {
    "startDate": "",
    "endDate": ""
};

export default handleActions({
    [changeStartDate]: (state, action) => ({
        ...state,
        "startDate": action.payload
    }),
    [changeEndDate]: (state, action) => ({
        ...state,
        "endDate": action.payload
    }),
    [clearFilters]: (state, _action) => ({
        ...state,
        "startDate": "",
        "endDate": ""
    })
}, initialState);
