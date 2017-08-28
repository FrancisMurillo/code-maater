import {createAction} from "redux-actions";

export const changeStartDate = createAction(
    "TOOLBAR/CHANGE_START_DATE",
    (startDate) => startDate);
export const changeEndDate = createAction(
    "TOOLBAR/CHANGE_END_DATE",
    (endDate) => endDate);

export const clearFilters = createAction(
    "TOOLBAR/CLEAR_FILTERS");

export const refreshData = createAction(
    "TOOLBAR/REFRESH_DATA");
