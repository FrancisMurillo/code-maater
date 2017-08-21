import React from "react";
import {Provider as StoreProvider} from "react-redux";

import store from "./Store";
import {InternalizationProvider} from "./app";


export default ({children}) => (
    <StoreProvider store={store}>
        <InternalizationProvider>
            {children}
        </InternalizationProvider>
    </StoreProvider>
);
