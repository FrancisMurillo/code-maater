import {handleActions} from "redux-actions";

import {
    registerTab,
    changeTab
} from "./Action";

const initialState = {};
const initialTabState = {
    "registered": false,
    "tabIndex": 0
};

const tabsSelector = (state) => state.tab || {};
export const tabSelector = (key) =>
    (state) => tabsSelector(state)[key] || {};

const tabReducer = handleActions({
    [registerTab]: (state, _action) => ({
        ...state,
        "registered": true,
        "tabIndex": 0
    }),
    [changeTab]: (state, action) => ({
        ...state,
        "tabIndex": action.payload
    })
}, initialTabState);

export default (state = initialState, action) => {
    if (action.meta && action.meta.tab) {
        const tabKey = action.meta.tab;
        const tabState = state[tabKey];

        return {
            ...state,
            [tabKey]: tabReducer(tabState, action)
        };
    } else {
        return state;
    }
};
