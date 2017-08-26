import {handleActions} from "redux-actions";

import {
    registerRequest,
    fetchData,
    receiveData,
    clearData
} from "./Action";

const initialState = {};
const initialRequestState = {
    "fetching": false,
    "empty": true,
    "data": null,
    "initialData": null
};

const requestsSelector = (state) => state.request || {};
export const requestSelector = (key) =>
    (state) => requestsSelector(state)[key] || {};

const requestReducer = handleActions({
    [registerRequest]: (state, action) => ({
        ...state,
        ...action.payload,
        "registered": true
    }),
    [fetchData]: (state, _action) => ({
        ...state,
        "fetching": true,
        "empty": true,
        "data": null
    }),
    [receiveData]: (state, action) => ({
        ...state,
        "fetching": false,
        "empty": false,
        "data": action.payload
    }),
    [clearData]: (state, _action) => ({
        ...state,
        "fetching": false,
        "empty": true,
        "data": state.initialData
    })
}, initialRequestState);

export default (state = initialState, action) => {
    if (action.meta && action.meta.request) {
        const requestKey = action.meta.request;
        const requestState = state[requestKey];

        return {
            ...state,
            [requestKey]: requestReducer(requestState, action)
        };
    } else {
        return state;
    }
};
