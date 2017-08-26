/* eslint react/no-set-state: [0]*/
import React from "react";
import {persistStore} from "redux-persist";

import config from "../Config";
import LoadingScreen from "../Loading";

export class Provider extends React.Component {
    constructor() {
        super();

        this.state = {"rehydrated": false};
    }

    componentWillMount() {
        persistStore(this.props.store, config.persistStore, () => {
            this.setState({"rehydrated": true});
        });
    }

    render() {
        if (this.state.rehydrated) {
            return this.props.children;
        } else {
            return (
                <LoadingScreen />
            );
        }
    }
}
