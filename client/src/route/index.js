import React from "react";
import {Route} from "react-router";

import SummaryScreen from "../summary";

export default () => (
    <div>
        <Route
            exact
            path={"/"}
        />
        <Route
            path={"/summary"}
            component={SummaryScreen}
        />
        <Route
            path={"/revision"}
        />
        <Route
            path={"/coupling"}
        />
        <Route
            path={"/age"}
        />
        <Route
            path={"/absoluteChurn"}
        />
        <Route
            path={"/authorChurn"}
        />
        <Route
            path={"/entityChurn"}
        />
        <Route
            path={"/entityOwnership"}
        />
        <Route
            path={"/entityEffort"}
        />
    </div>
);
