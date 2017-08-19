import {createStore} from "redux";
import {persistStore} from "redux-persist";

import middleware from "./Middleware";
import reducer from "./Reducer";

const store = createStore(reducer, middleware);

const _persistor = persistStore(store, {
    "whitelist": []
});

export default store;
