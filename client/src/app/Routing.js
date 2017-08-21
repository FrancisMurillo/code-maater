import React from "react";
import {
    ConnectedRouter,
    routerReducer,
    routerMiddleware
} from "react-router-redux";
import createHistory from "history/createBrowserHistory";

const history = createHistory();

export const middleware = routerMiddleware(history);

export const reducer = routerReducer;

export const Provider = ({children}) => (
    <ConnectedRouter history={history}>
        {children}
    </ConnectedRouter>
);
