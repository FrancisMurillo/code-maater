import {combineReducers} from "redux";

import {
    appReducer,
    internalizationReducer,
    routingReducer
} from "./app";
import {drawerReducer} from "./frame";
import {reducer as gridReducer} from "./grid";
import {reducer as requestReducer} from "./request";

export default combineReducers({
    "app": appReducer,
    "drawer": drawerReducer,
    "grid": gridReducer,
    "intl": internalizationReducer,
    "request": requestReducer,
    "router": routingReducer
});
