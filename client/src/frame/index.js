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
    reducer as drawerReducer,
    toggleDrawer
} from "../drawer";

import messages from "./Message";

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

export {drawerReducer};

const Frame = injectIntl(({intl, onShowDrawer, children}) => (
    <div>
        <AppDrawer />
        <AppBar >
            <Toolbar>
                <MenuButton onClick={onShowDrawer} />
                <MenuTitle>
                    {intl.formatMessage(messages.title)}
                </MenuTitle>
            </Toolbar>
        </AppBar>
        {children}
    </div>
));

export default connect(
    null,
    {"onShowDrawer": () => toggleDrawer(true)}
)(Frame);
