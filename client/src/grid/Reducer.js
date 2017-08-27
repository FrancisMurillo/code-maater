import {handleActions} from "redux-actions";

import {registerGrid, sortColumn, filterColumn} from "./Action";

const initialState = {};
const initialGridState = {
    "sorting": {},
    "filters": {}
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
    }),
    [filterColumn]: (state, action) => {
        if (action.payload) {
            const {filterTerm, column} = action.payload;

            if (filterTerm) {
                return {
                    ...state,
                    "filters": {
                        ...state.filters,
                        [column.key]: action.payload
                    }
                };
            } else {
                const {
                    "filters": {
                        [column.key]: _filter,
                        ...filters
                    }
                } = state;

                return {
                    ...state,
                    filters
                };
            }
        } else {
            return {};
        }
    }
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
