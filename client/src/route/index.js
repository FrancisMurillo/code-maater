import React from "react";
import {h1} from "react-dom";
import {Route} from "react-router";

export default () => (
    <div>
        <Route
            exact
            path={"/"}
            component={() => (<h1>{"AX"}</h1>)}
        />
        <Route
            path={"/summary"}
            component={() => (<h1>{"BET"}</h1>)}
        />
        <Route
            path={"/revision"}
            component={() => (<h1>{"MEOW"}</h1>)}
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
