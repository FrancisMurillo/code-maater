import React from "react";
import {div} from "react-dom";
import BaseDrawer from "material-ui/Drawer";
import Divider from "material-ui/Divider";
import BaseList, {ListItem, ListItemIcon, ListItemText} from "material-ui/List";
import DashboardIcon from "material-ui-icons/Dashboard";
import SummaryIcon from "material-ui-icons/TrackChanges";
import RevisionIcon from "material-ui-icons/LinearScale";
import CouplingIcon from "material-ui-icons/LeakRemove";
import AgeIcon from "material-ui-icons/AvTimer";
import AbsoluteChurnIcon from "material-ui-icons/ShowChart";
import AuthorChurnIcon from "material-ui-icons/People";
import EntityChurnIcon from "material-ui-icons/GroupWork";
import EntityOwnershipIcon from "material-ui-icons/BubbleChart";
import EntityEffortIcon from "material-ui-icons/DonutSmall";
import SettingIcon from "material-ui-icons/Settings";
import styled from "styled-components";

const Drawer = styled(BaseDrawer).attrs({"anchor": "left"})``;

const MenuList = styled(BaseList).attrs({"disablePadding": true})`
  flex: initial;
`;


export default ({open, onRequestClose}) => (
    <Drawer
        open={open}
        onRequestClose={onRequestClose}
    >
        <MenuList>
            <ListItem button>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>
        </MenuList>
        <Divider />
        <MenuList>
            <ListItem button>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>
        </MenuList>
    </Drawer>
);
