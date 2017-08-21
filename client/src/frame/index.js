import React from "react";
import {div} from "react-dom";
import BaseAppBar from "material-ui/AppBar";
import BaseDrawer from "material-ui/Drawer";
import BaseToolbar from "material-ui/Toolbar";
import MenuIcon from "material-ui-icons/Menu";
import IconButton from "material-ui/IconButton";
import Typography from "material-ui/Typography";
import styled from "styled-components";

const AppBar = styled(BaseAppBar).attrs({
    "color": "primary",
    "position": "absolute"
})``;

const Drawer = styled(BaseDrawer).attrs({"anchor": "left"})``;

const Toolbar = styled(BaseToolbar)``;

const MenuButton = ({}) => (
    <IconButton
        color="contrast"
        aria-label="Menu"
    >
        <MenuIcon />
    </IconButton>
);

const MenuTitle = styled(Typography).attrs({
    "type": "title",
    "color": "inherit"
})``;

export default ({children}) => (
    <div>
        <Drawer
            open={false}
        />
        <AppBar >
            <Toolbar>
                <MenuButton />
                <MenuTitle>
                    {"Code Maat"}
                </MenuTitle>
            </Toolbar>
        </AppBar>
        {children}
    </div>
);
