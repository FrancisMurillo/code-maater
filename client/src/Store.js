import {createStore} from "redux";

import middleware from "./Middleware";
import reducer from "./Reducer";


const store = createStore(reducer, middleware);

export default store;
