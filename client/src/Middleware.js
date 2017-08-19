import {applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";
import promiseMiddleware from "redux-promise";
import {composeWithDevTools} from "redux-devtools-extension/logOnlyInProduction";
import {autoRehydrate} from "redux-persist";

const composeEnhancers = composeWithDevTools({"shouldHotReload": true});

export default composeEnhancers(
    applyMiddleware(
        thunkMiddleware,
        promiseMiddleware),
    autoRehydrate());
