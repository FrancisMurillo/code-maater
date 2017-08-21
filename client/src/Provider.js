import React from "react";
import {Provider as StoreProvider} from "react-redux";

import store from "./Store";
import {
    InternalizationProvider,
    PersistenceProvider,
    RoutingProvider,
    ThemeProvider
} from "./app";


export default ({children}) => (
    <StoreProvider store={store}>
        <ThemeProvider>
            <PersistenceProvider store={store}>
                <InternalizationProvider>
                    <RoutingProvider>
                        {children}
                    </RoutingProvider>
                </InternalizationProvider>
            </PersistenceProvider>
        </ThemeProvider>
    </StoreProvider>
);
