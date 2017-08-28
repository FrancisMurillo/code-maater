import React from "react";
import {div} from "react-dom";

import {analysisFetchSelector} from "../Selector";
import {webService, analysis} from "../api";
import {RequestLoader, messages as componentMessages} from "../component";
import Grid, {columnType} from "../grid";
import reduxRequest from "../request";
import TabContainer from "../tab";

const pageKey = "absoluteChurn";

export default reduxRequest({
    "key": pageKey,
    "fetch": (startDate, endDate) =>
        webService.fetchAnalysis({
            "analysis": analysis.absoluteChurn,
            startDate,
            endDate
        }),
    "fetchArgs": analysisFetchSelector,
    "initialData": [],
    "loading": RequestLoader
})(({data}) => (
    <div>
        <TabContainer tabKey={pageKey}>
            <Grid
                tabLabel={componentMessages.record}
                gridKey={pageKey}
                columns={[
                    {"key": "date"},
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
        </TabContainer>
    </div>
));
