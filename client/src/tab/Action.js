import {createAction} from "redux-actions";

const tabMeta =
      (tabKey, ..._args) => ({"tab": tabKey});

export const registerTab = createAction(
    "TAB/REGISTER_TAB",
    (_tabKey, ..._args) => ({}),
    tabMeta);

export const changeTab = createAction(
    "TAB/CHANGE_TAB",
    (_tabKey, tabIndex) => tabIndex,
    tabMeta);
