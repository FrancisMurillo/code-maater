import React from "react";
import {Route} from "react-router";

import SummaryScreen from "../summary";
import RevisionScreen from "../revision";
import CouplingScreen from "../coupling";

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
            component={RevisionScreen}
        />
        <Route
            path={"/coupling"}
            component={CouplingScreen}
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
