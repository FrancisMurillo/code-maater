import React from "react";
import createMuiTheme from "material-ui/styles/theme";
import {MuiThemeProvider} from "material-ui/styles";
import {ThemeProvider as StyledThemeProvider} from "styled-components";
import createGenerateClassName from "material-ui/styles/createGenerateClassName";
import {JssProvider} from "react-jss";
import {create} from "jss";
import preset from "jss-preset-default";

const jss = create(preset());
jss.options.createGenerateClassName = createGenerateClassName;
jss.options.insertionPoint = "material-ui";


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
