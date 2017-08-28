import React from "react";
import {injectIntl} from "react-intl";
import {LinearProgress} from "material-ui/Progress";
import Tabs, {Tab} from "material-ui/Tabs";
import styled from "styled-components";

import messages from "./Message";

export const RequestLoader = () => (
    <LinearProgress
        mode={"query"}
        color={"accent"}
    />);

export const AnalysisTabs = styled(Tabs).attrs({
    "fullWidth": true,
    "indicatorColor": "primary",
    "textColor": "primary"
})``;

export const RecordTab = injectIntl(({intl, ...props}) => (
    <Tab
        label={intl.formatMessage(messages.record)}
        {...props}
    />
));
