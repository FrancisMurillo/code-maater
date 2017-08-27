import React from "react";

import Provider from "./Provider";
import LoadingScreen from "./Loading";
import {webService} from "./api";
import reduxRequest from "./request";
import FrameContainer from "./frame";
import RouteContainer from "./route";

import "typeface-roboto";

export const requestKey = "app";

const AppContainer = reduxRequest({
    "key": requestKey,
    "fetch": webService.fetchAppData,
    "fetchArgs": (_state) => [],
    "loading": LoadingScreen,
    "initialData": {}
})((props) => (
    <FrameContainer >
        <RouteContainer />
    </FrameContainer>
));

export default (_props) => (
    <Provider>
        <AppContainer />
    </Provider>
);
