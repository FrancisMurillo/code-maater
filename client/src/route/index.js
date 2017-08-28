import React from "react";
import {Route} from "react-router";

import SummaryScreen from "../summary";
import RevisionScreen from "../revision";
import CouplingScreen from "../coupling";
import AgeScreen from "../age";
import AbsoluteChurnScreen from "../absoluteChurn";
import AuthorChurnScreen from "../authorChurn";
import EntityChurnScreen from "../entityChurn";
import EntityOwnershipScreen from "../entityOwnership";
import EntityEffortScreen from "../entityEffort";

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
            component={AgeScreen}
        />
        <Route
            path={"/absoluteChurn"}
            component={AbsoluteChurnScreen}
        />
        <Route
            path={"/authorChurn"}
            component={AuthorChurnScreen}
        />
        <Route
            path={"/entityChurn"}
            component={EntityChurnScreen}
        />
        <Route
            path={"/entityOwnership"}
            component={EntityOwnershipScreen}
        />
        <Route
            path={"/entityEffort"}
            component={EntityEffortScreen}
        />
    </div>
);
