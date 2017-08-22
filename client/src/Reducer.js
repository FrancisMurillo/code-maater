import {combineReducers} from "redux";

import {
    internalizationReducer,
    routingReducer
} from "./app";
import {drawerReducer} from "./frame";

export default combineReducers({
    "drawer": drawerReducer,
    "intl": internalizationReducer,
    "router": routingReducer
});
