import React from "react";
import {Provider as StoreProvider} from "react-redux";

import store from "./Store";
import {
    InternalizationProvider,
    ThemeProvider
} from "./app";


export default ({children}) => (
    <StoreProvider store={store}>
        <ThemeProvider>
            <InternalizationProvider>
                {children}
            </InternalizationProvider>
        </ThemeProvider>
    </StoreProvider>
);
