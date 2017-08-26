import React from "react";
import {h1} from "react-dom";
import {Route} from "react-router";

export default () => (
    <div>
        <Route
            exact
            path={"/"}
        />
        <Route
            path={"/summary"}
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
