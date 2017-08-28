import React from "react";
import {div} from "react-dom";

import {analysisFetchSelector} from "../Selector";
import {webService, Analysis} from "../api";
import {
    RequestLoader,
    AnalysisTabs,
    RecordTab
} from "../component";
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
    "fetchArgs": analysisFetchSelector,
    "initialData": [],
    "loading": RequestLoader
})(({data, fetching}) => (
    <div>
        <AnalysisTabs
            onChange={() => null}
            value={0}
        >
            <RecordTab />
        </AnalysisTabs>
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
