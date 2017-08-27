import {createAction} from "redux-actions";

const gridMeta =
      (gridKey, ..._args) => ({"grid": gridKey});

export const registerGrid = createAction(
    "GRID/REGISTER_GRID",
    (_gridKey, options) => options,
    gridMeta);

export const sortColumn = createAction(
    "GRID/SORT_COLUMN",
    (_gridKey, column, direction) => ({
        column,
        direction
    }),
    gridMeta);
