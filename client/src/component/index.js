import React from "react";
import {LinearProgress} from "material-ui/Progress";

export const RequestLoader = () => (
    <LinearProgress
        mode={"query"}
        color={"accent"}
    />);
