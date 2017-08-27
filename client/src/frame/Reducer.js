import {handleActions} from "redux-actions";

import {changeTitle} from "./Action";

const initialState = {"title": ""};

export const frameSelector = (state) => state.frame;

export default handleActions({
    [changeTitle]: (state, action) => ({
        ...state,
        "title": action.payload
    })
}, initialState);
