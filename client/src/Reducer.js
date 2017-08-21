import {combineReducers} from "redux";

import {
    internalizationReducer,
    routingReducer
} from "./app";


export default combineReducers({
    "intl": internalizationReducer,
    "router": routingReducer
});
