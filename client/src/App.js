import React from "react";

import Provider from "./Provider";
import FrameContainer from "./frame";
import RouteContainer from "./route";

import "typeface-roboto";

export default (_props) => (
    <Provider>
        <FrameContainer>
            <RouteContainer />
        </FrameContainer>
    </Provider>
);
