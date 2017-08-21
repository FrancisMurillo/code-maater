import React from "react";
import createMuiTheme from "material-ui/styles/theme";
import {MuiThemeProvider} from "material-ui/styles";

const theme = createMuiTheme();

export const Provider = ({children}) => (
    <MuiThemeProvider theme={theme}>
        {children}
    </MuiThemeProvider>
);
