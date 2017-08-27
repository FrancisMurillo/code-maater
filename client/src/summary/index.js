import React from "react";
import {LinearProgress} from "material-ui/Progress";

import {webService, Analysis} from "../api";
import Grid, {columnType} from "../grid";
import reduxRequest from "../request";

const requestKey = "summary";
const gridKey = requestKey;

export default reduxRequest({
    "key": requestKey,
    "fetch": (startDate, endDate) =>
        webService.fetchAnalysis({
            "analysis": Analysis.summary,
            startDate,
            endDate
        }),
    "fetchArgs": (state) => [
        state.app.minDate,
        state.app.maxDate
    ],
    "initialData": [],
    "loading": () => (
        <LinearProgress
            mode={"query"}
            color={"accent"}
        />)
})(({data, fetching}) => (
    <Grid
        gridKey={gridKey}
        columns={[
            {"key": "statistic"},
            {
                "key": "value",
                "mapper": columnType.integer
            }
        ]}
        data={data}
    />
));
