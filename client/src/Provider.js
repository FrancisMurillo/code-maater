import React from "react";
import {Provider as StoreProvider} from "react-redux";

import store from "./Store";

export default ({children}) => (
        <StoreProvider store={store}>
        {children}
    </StoreProvider>
);
