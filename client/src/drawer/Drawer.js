import React from "react";
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
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
import {replace} from "react-router-redux";

import messages from "./Message";

const Drawer = styled(BaseDrawer).attrs({"anchor": "left"})``;

const MenuList = styled(BaseList).attrs({"disablePadding": true})`
  flex: initial;
  overflow-y: hidden;
`;

const MenuDivider = styled(Divider).attrs({"inset": false})``;

const MenuItem = injectIntl(({
    intl,
    "icon": Icon,
    label,
    onClick
}) => (
    <ListItem
        button
        onClick={onClick}
    >
        <ListItemIcon>
            <Icon />
        </ListItemIcon>
        <ListItemText
            primary={intl.formatMessage(label)}
        />
    </ListItem>
));


const AppDrawer = ({
    intl, open, onRequestClose, navigate
}) => (
    <Drawer
        open={open}
        onRequestClose={onRequestClose}
    >
        <MenuList>
            <MenuItem
                icon={DashboardIcon}
                label={messages.dashboard}
                onClick={() => navigate("/")}
            />
        </MenuList>
        <MenuDivider />
        <MenuList>
            <MenuItem
                icon={SummaryIcon}
                label={messages.summary}
                onClick={() => navigate("/summary")}
            />
            <MenuItem
                icon={RevisionIcon}
                label={messages.revision}
                onClick={() => navigate("/revision")}
            />
            <MenuItem
                icon={CouplingIcon}
                label={messages.coupling}
                onClick={() => navigate("/coupling")}
            />
            <MenuItem
                icon={AgeIcon}
                label={messages.age}
                onClick={() => navigate("/age")}
            />
            <MenuItem
                icon={AbsoluteChurnIcon}
                label={messages.absoluteChurn}
                onClick={() => navigate("/absoluteChurn")}
            />
            <MenuItem
                icon={AuthorChurnIcon}
                label={messages.authorChurn}
                onClick={() => navigate("/authorChurn")}
            />
            <MenuItem
                icon={EntityChurnIcon}
                label={messages.entityChurn}
                onClick={() => navigate("/entityChurn")}
            />
            <MenuItem
                icon={EntityOwnershipIcon}
                label={messages.entityOwnership}
                onClick={() => navigate("/entityOwnership")}
            />
            <MenuItem
                icon={EntityEffortIcon}
                label={messages.entityEffort}
                onClick={() => navigate("/entityEffort")}
            />
        </MenuList>
        <MenuDivider />
        <MenuList>
            <MenuItem
                icon={SettingIcon}
                label={messages.setting}
                onClick={() => navigate("/setting")}
            />
        </MenuList>
    </Drawer>
);

export default connect(
    null,
    {"navigate": (...args) => replace(...args)}
)(AppDrawer);
