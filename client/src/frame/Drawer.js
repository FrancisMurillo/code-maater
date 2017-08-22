import {connect} from "react-redux";
import {handleActions} from "redux-actions";
import BaseDrawer from "material-ui/Drawer";
import styled from "styled-components";

import {selectDrawer} from "../Selector";
import {createActionCreator} from "../shared";

const createAction = createActionCreator("DRAWER/");
export const toggleDrawer = createAction("TOGGLE_DRAWER");

const initialState = {"open": false};

export const reducer = handleActions({
    [toggleDrawer]: (state, action) => ({
        ...state,
        "open": action.payload
    })
}, initialState);

const Drawer = styled(BaseDrawer).attrs({"anchor": "left"})``;

export default connect(
    selectDrawer,
    {"onRequestClose": () => toggleDrawer(false)}
)(Drawer);
