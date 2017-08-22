import {createAction} from "redux-actions";

export const createActionCreator = (prefix) => {
    const actionCreator =
          (actionType, ...args) => createAction(prefix + actionType, ...args);

    return actionCreator;
};
