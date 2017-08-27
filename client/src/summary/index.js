import React from "react";
import {div} from "react-dom";
import Tabs, {Tab} from "material-ui/Tabs";

import {webService, Analysis} from "../api";
import {RequestLoader} from "../component";
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
    "loading": RequestLoader
})(({data, fetching}) => (
    <div>
        <Tabs
            fullWidth
            indicatorColor={"primary"}
            textColor={"primary"}
            onChange={() => null}
            value={0}
        >
            <Tab
                label={"Records"}
            />
        </Tabs>
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
    </div>
));
