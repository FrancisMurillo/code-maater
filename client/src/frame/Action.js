import {createAction} from "redux-actions";

export const changeTitle = createAction(
    "FRAME/CHANGE_TITLE",
    (title) => title);
