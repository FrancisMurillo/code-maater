import {combineReducers} from "redux";

import {
    internalizationReducer
} from "./app";


export default combineReducers({"intl": internalizationReducer});
