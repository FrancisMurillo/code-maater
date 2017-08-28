import React from "react";
import {div} from "react-dom";
import {AreaStackChart} from "react-d3-basic";

import {analysisFetchSelector} from "../Selector";
import {webService, analysis} from "../api";
import {RequestLoader, messages as componentMessages} from "../component";
import Grid, {columnType} from "../grid";
import reduxRequest from "../request";
import TabContainer from "../tab";

const pageKey = "absoluteChurn";

const ChurnChart = ({data}) => {
    return (
        <AreaStackChart
            chartSeries={[
                {
                    "field": "deleted",
                    "name": "Deleted"
                },
                {
                    "field": "added",
                    "name": "Added"
                }
            ]}
            x={(item) => new Date(item.date)}
            xScale={"time"}
            data={data}
            width={700}
            height={400}
        />
    );
};

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
            <ChurnChart
                tabLabel={componentMessages.chart}
                data={data}
            />
        </TabContainer>
    </div>
));
