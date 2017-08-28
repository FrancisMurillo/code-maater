import React from "react";
import {div} from "react-dom";

import {analysisFetchSelector} from "../Selector";
import {webService, analysis} from "../api";
import {
    RequestLoader,
    AnalysisTabs,
    RecordTab
} from "../component";
import Grid, {columnType} from "../grid";
import reduxRequest from "../request";

const requestKey = "entityChurn";
const gridKey = requestKey;

export default reduxRequest({
    "key": requestKey,
    "fetch": (startDate, endDate) =>
        webService.fetchAnalysis({
            "analysis": analysis.entityChurn,
            startDate,
            endDate
        }),
    "fetchArgs": analysisFetchSelector,
    "initialData": [],
    "loading": RequestLoader
})(({data}) => (
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
                {"key": "entity"},
                {
                    "key": "commits",
                    "mapper": columnType.integer
                },
                {
                    "key": "added",
                    "mapper": columnType.integer
                },
                {
                    "key": "deleted",
                    "mapper": columnType.integer
                }
            ]}
            data={data}
        />
    </div>
));
