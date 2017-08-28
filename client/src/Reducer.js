import {combineReducers} from "redux";

import {
    appReducer,
    appRequestReducer,
    internalizationReducer,
    routingReducer
} from "./app";
import {reducer as drawerReducer} from "./drawer";
import {reducer as frameReducer} from "./frame";
import {reducer as gridReducer} from "./grid";
import {reducer as requestReducer} from "./request";
import {reducer as toolbarReducer} from "./toolbar";

export const joinReducers = (...reducers) => {
    return (state, action) => {
        return reducers.reduce((prevState, reducer) => {
            return reducer(prevState, action);
        }, state);
    };
};

export default joinReducers(
    combineReducers({
        "app": appReducer,
        "drawer": drawerReducer,
        "frame": frameReducer,
        "grid": gridReducer,
        "intl": internalizationReducer,
        "request": requestReducer,
        "router": routingReducer,
        "toolbar": toolbarReducer
    }),
    appRequestReducer);
