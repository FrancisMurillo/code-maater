import {connect} from "react-redux";
import {handleActions} from "redux-actions";

import {selectDrawer} from "../Selector";
import {createActionCreator} from "../shared";

import Drawer from "./Drawer";

const createAction = createActionCreator("DRAWER/");
export const toggleDrawer = createAction("TOGGLE_DRAWER");

const initialState = {"open": false};

export const reducer = handleActions({
    [toggleDrawer]: (state, action) => ({
        ...state,
        "open": action.payload
    })
}, initialState);

export default connect(
    selectDrawer,
    {"onRequestClose": () => toggleDrawer(false)}
)(Drawer);
