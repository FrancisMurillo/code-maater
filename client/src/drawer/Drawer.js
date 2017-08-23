import React from "react";
import {div} from "react-dom";
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

import messages from "./Message";

const Drawer = styled(BaseDrawer).attrs({"anchor": "left"})``;

const MenuList = styled(BaseList).attrs({"disablePadding": true})`
  flex: initial;
`;

const MenuDivider = styled(Divider).attrs({"inset": false})``;

const MenuItem = injectIntl(({
    intl,
    "icon": Icon,
    label
}) => (
    <ListItem button>
        <ListItemIcon>
            <Icon />
        </ListItemIcon>
        <ListItemText
            primary={intl.formatMessage(label)}
        />
    </ListItem>
));


export default ({intl, open, onRequestClose}) => (
    <Drawer
        open={open}
        onRequestClose={onRequestClose}
    >
        <MenuList>
            <MenuItem
                icon={DashboardIcon}
                label={messages.dashboard}
            />
        </MenuList>
        <MenuDivider />
        <MenuList>
            <MenuItem
                icon={SummaryIcon}
                label={messages.summary}
            />
            <MenuItem
                icon={RevisionIcon}
                label={messages.revision}
            />
            <MenuItem
                icon={CouplingIcon}
                label={messages.coupling}
            />
            <MenuItem
                icon={AgeIcon}
                label={messages.age}
            />
            <MenuItem
                icon={AbsoluteChurnIcon}
                label={messages.absoluteChurn}
            />
            <MenuItem
                icon={AuthorChurnIcon}
                label={messages.authorChurn}
            />
            <MenuItem
                icon={EntityChurnIcon}
                label={messages.entityChurn}
            />
            <MenuItem
                icon={EntityOwnershipIcon}
                label={messages.entityOwnership}
            />
            <MenuItem
                icon={EntityEffortIcon}
                label={messages.entityEffort}
            />
        </MenuList>
        <MenuDivider />
        <MenuList>
            <MenuItem
                icon={SettingIcon}
                label={messages.setting}
            />
        </MenuList>
    </Drawer>
);
