import React from "react";
import {connect} from "react-redux";
import {injectIntl} from "react-intl";
import Input from "material-ui/Input";
import Button from "material-ui/Button";
import Toolbar from "material-ui/Toolbar";
import styled from "styled-components";

import reducer from "./Reducer";
import messages from "./Message";
import {
    changeStartDate,
    changeEndDate,
    clearFilters,
    refreshData
} from "./Action";

export {reducer};

const DatePicker = styled(Input).attrs({"type": "date"})`
  margin-left: 10px;
  margin-right: 10px;
`;

const ActionButton = styled(Button).attrs({
    "raised": true,
    "color": "primary"
})`
  margin-left: 10px;
  margin-right: 10px;
`;

const ToolbarContainer = styled(Toolbar)`
  background-color: ${(props) => props.theme.palette.background.contentFrame};
`;

const AppToolbar = injectIntl(({
    intl,
    minDate,
    maxDate,
    startDate,
    endDate,
    onStartDateChange,
    onEndDateChange,
    onClear,
    onRefresh
}) => (
    <ToolbarContainer>
        <DatePicker
            id={"startDate"}
            inputProps={{
                "min": minDate,
                "max": endDate || maxDate,
                "value": startDate
            }}
            value={startDate}
            onChange={(_event) =>
                onStartDateChange(document.getElementById("startDate").value)}
        />
        <DatePicker
            id={"endDate"}
            inputProps={{
                "min": startDate || minDate,
                "max": maxDate,
                "value": endDate
            }}
            value={endDate}
            onChange={(_event) =>
                onEndDateChange(document.getElementById("endDate").value)}
        />
        <ActionButton
            onClick={(_event) => onClear()}
        >
            {intl.formatMessage(messages.clear)}
        </ActionButton>
        <ActionButton
            onClick={() => onRefresh()}
        >
            {intl.formatMessage(messages.refresh)}
        </ActionButton>
    </ToolbarContainer>
));

const toolbarSelector = (state) => state.toolbar;
const appSelector = (state) => state.app;

const appToolbarSelector = (state) => ({
    ...toolbarSelector(state),
    ...appSelector(state)
});

export default connect(
    appToolbarSelector,
    {
        "onStartDateChange": changeStartDate,
        "onEndDateChange": changeEndDate,
        "onClear": clearFilters,
        "onRefresh": refreshData
    }
)(AppToolbar);
