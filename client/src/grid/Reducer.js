import {handleActions} from "redux-actions";

import {registerGrid, sortColumn} from "./Action";

const initialState = {};
const initialGridState = {
    "sorting": {},
    "filters": []
};

const gridsSelector = (state) => state.grid || {};
export const gridSelector = (key) =>
    (state) => gridsSelector(state)[key] || {};

const gridReducer = handleActions({
    [registerGrid]: (state, action) => ({
        ...state,
        ...action.payload,
        "registered": true
    }),
    [sortColumn]: (state, action) => ({
        ...state,
        "sorting": {
            ...state.sorting,
            ...action.payload
        }
    })
}, initialGridState);

export default (state = initialState, action) => {
    if (action.meta && action.meta.grid) {
        const gridKey = action.meta.grid;
        const gridState = state[gridKey];

        return {
            ...state,
            [gridKey]: gridReducer(gridState, action)
        };
    } else {
        return state;
    }
};
