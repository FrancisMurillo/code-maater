/* eslint react/no-set-state: [0]*/
import React from "react";
import ReactLoading from "react-loading";
import {persistStore} from "redux-persist";
import styled from "styled-components";

const LoadingScreen = styled.div`
  background-color: ${(props) => props.theme.palette.primary[500]};
  width: 100%;
  height: 100%;
`;

const Loader = styled(ReactLoading).attrs({
    "color": (props) => props.theme.palette.text.primary,
    "type": "cubes"
})`
  width: inherit !important;
  height: inherit !important;
`;

export class Provider extends React.Component {
    constructor() {
        super();

        this.state = {"rehydrated": false};
    }

    componentWillMount() {
        persistStore(this.props.store, {}, () => {
            this.setState({"rehydrated": true});
        });
    }

    render() {
        if (this.state.rehydrated) {
            return this.props.children;
        } else {
            return (
                <LoadingScreen>
                    <Loader />
                </LoadingScreen>
            );
        }
    }
}
