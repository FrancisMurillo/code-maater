import React from "react";
import {injectIntl} from "react-intl";
import {connect} from "react-redux";
import Tabs, {Tab} from "material-ui/Tabs";
import styled from "styled-components";

import reducer, {tabSelector} from "./Reducer";
import {
    registerTab,
    changeTab
} from "./Action";

const TabsContainer = styled(Tabs).attrs({
    "fullWidth": true,
    "indicatorColor": "primary",
    "textColor": "primary"
})``;


const TabContainer = injectIntl(class BaseTab extends React.Component {
    componentWillMount() {
        if (!this.props._tabProps.registered) {
            this.props._tab.onRegister(this.props);
        }
    }

    componentWillUpdate(nextProps) {
        if (!nextProps._tabProps.registered) {
            this.props._tab.onRegister(nextProps);
        }
    }

    render() {
        if (this.props._tabProps.registered) {
            const {
                intl,
                "_tabProps": {tabIndex},
                "_tab": {on}
            } = this.props;

            return (
                <div>
                    <TabsContainer
                        value={tabIndex}
                        onChange={(_event, index) =>
                            this.props._tab.onChangeTab(index)}
                    >
                        {React.Children.map(this.props.children, (child) => {
                            const {props} = child;
                            const {
                                tabLabel,
                                ...otherProps
                            } = props;

                            return (
                                <Tab
                                    label={intl.formatMessage(tabLabel)}
                                    {...otherProps}
                                />
                            );
                        })}
                    </TabsContainer>
                    {this.props.children}
                </div>
            );
        } else {
            return null;
        }
    }
});

export {
    reducer,
    changeTab
};

export default connect(
    (state, props) => ({"_tabProps": tabSelector(props.tabKey)(state)}),
    (dispatch, props) => ({
        "_tab": {
            "onRegister": (_currentProps) =>
                dispatch(registerTab(props.tabKey)),
            "onChangeTab": (tabIndex) =>
                dispatch(changeTab(props.tabKey, tabIndex))
        }
    })
)(TabContainer);
