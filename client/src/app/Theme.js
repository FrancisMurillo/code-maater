import React from "react";
import createMuiTheme from "material-ui/styles/theme";
import {MuiThemeProvider} from "material-ui/styles";
import {ThemeProvider as StyledThemeProvider} from "styled-components";
import {jss, JssProvider} from "react-jss";

jss.setup({"insertionPoint": "material-ui"});

const theme = createMuiTheme();

export const Provider = ({children}) => (
    <JssProvider jss={jss}>
        <MuiThemeProvider theme={theme}>
            <StyledThemeProvider theme={theme}>
                {children}
            </StyledThemeProvider>
        </MuiThemeProvider>
    </JssProvider>
);
