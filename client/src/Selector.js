export const selectDrawer = ({drawer}) => drawer;

export const analysisFetchSelector = (state) => [
    state.toolbar.startDate || state.app.minDate,
    state.toolbar.endDate || state.app.maxDate
];
