import React from "react";
import {div} from "react-dom";
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import BaseAppBar from "material-ui/AppBar";
import BaseToolbar from "material-ui/Toolbar";
import MenuIcon from "material-ui-icons/Menu";
import IconButton from "material-ui/IconButton";
import Typography from "material-ui/Typography";
import styled from "styled-components";

import AppDrawer, {
    toggleDrawer,
    messages as drawerMessages
} from "../drawer";
import AppToolbar from "../toolbar";

import messages from "./Message";
import reducer, {frameSelector} from "./Reducer";
import {changeTitle} from "./Action";

const AppBar = styled(BaseAppBar).attrs({
    "color": "primary",
    "position": "static"
})``;

const Toolbar = styled(BaseToolbar)``;

const MenuButton = ({onClick}) => (
    <IconButton
        color="contrast"
        aria-label={"Menu"}
        onClick={onClick}
    >
        <MenuIcon />
    </IconButton>
);

const MenuTitle = styled(Typography).attrs({
    "type": "title",
    "color": "inherit"
})``;

export {reducer, changeTitle};

const Frame = injectIntl(({
    intl, onShowDrawer, children, title
}) => (
    <div>
        <AppDrawer />
        <AppBar >
            <Toolbar>
                <MenuButton onClick={onShowDrawer} />
                <MenuTitle>
                    {title ? intl.formatMessage(title) :
                        intl.formatMessage(messages.title)}
                </MenuTitle>
            </Toolbar>
        </AppBar>
        <AppToolbar />
        {children}
    </div>
));

const routeSelector = (state) => state.router || {};

export default connect(
    (state) => {
        const routeState = routeSelector(state);
        const frameState = frameSelector(state);

        if (routeState.location) {
            const {pathname} = routeState.location;
            const baseRouteName = pathname.split("/")[1];
            const drawerMessage = drawerMessages[baseRouteName];

            return {
                ...frameState,
                "title": drawerMessage || ""
            };
        } else {
            return frameState;
        }
    },
    {"onShowDrawer": () => toggleDrawer(true)}
)(Frame);
