import {createAction} from "redux-actions";

const requestMeta =
      (requestKey, ..._args) => ({"request": requestKey});

export const registerRequest = createAction(
    "REQUEST/REGISTER_REQUEST",
    (_requestKey, {initialData}) => ({initialData}),
    requestMeta);

export const fetchData = createAction(
    "REQUEST/FETCH_DATA",
    (_requestKey) => null,
    requestMeta);

export const receiveData = createAction(
    "REQUEST/RECEIVE_DATA",
    (_requestKey, data) => data,
    requestMeta);

export const clearData = createAction(
    "REQUEST/CLEAR_DATA",
    (_requestKey) => null,
    requestMeta);
