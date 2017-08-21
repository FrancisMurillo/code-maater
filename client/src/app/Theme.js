import React from "react";
import createMuiTheme from "material-ui/styles/theme";
import {MuiThemeProvider} from "material-ui/styles";
import {ThemeProvider as StyledThemeProvider} from "styled-components";

const theme = createMuiTheme();

export const Provider = ({children}) => (
    <MuiThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
            {children}
        </StyledThemeProvider>
    </MuiThemeProvider>
);
