import {IntlProvider, intlReducer} from "react-intl-redux";
import React from "react";

const defaultLocale = "en";

const initialState = {"locale": defaultLocale};

export const reducer = (state = initialState, action) => {
    return intlReducer(state, action);
};

export const Provider = ({children}) => (
    <IntlProvider >
        {children}
    </IntlProvider>
);
