import React from "react";
import {connect} from "react-redux";

import reducer, {requestSelector} from "./Reducer";
import {
    registerRequest,
    fetchData,
    receiveData
} from "./Action";


export {
    reducer,
    receiveData
};

export default (options) => {
    const {
        key,
        fetch,
        fetchArgs,
        onFetch,
        initialData = null,
        loading = null
    } = options;

    const selector = requestSelector(key);

    return (Component) => {
        class RequestContainer extends React.Component {
            componentWillMount() {
                if (!this.props._requestProps.registered) {
                    this.props._request.onMount(this.props);
                }
            }

            componentDidMount() {
                this.props._request.onMounted(this.props);
            }

            render() {
                const {
                    _request,
                    "_requestProps": {
                        data,
                        fetching
                    },
                    ...otherProps
                } = this.props;

                const loadingElement = loading ?
                    React.createElement(loading) : null;

                return this.props._requestProps.registered &&
                    !this.props._requestProps.empty ? (
                        <Component
                            {...otherProps}
                            data={data}
                            fetching={fetching}
                        />
                    ) : loadingElement;
            }
        }

        return connect(
            (state) => ({
                "_requestProps": selector(state),
                "_fetchArgs": fetchArgs(state)
            }),
            (dispatch) => ({
                "_request": {
                    "onMount": (currentProps) => {
                        dispatch(registerRequest(key, {initialData}));
                    },
                    "onMounted": (currentProps) => {
                        dispatch(fetchData(key));

                        const fetchRequest = fetch(...currentProps._fetchArgs);

                        fetchRequest
                            .then((data) => {
                                dispatch(receiveData(key, data));

                                if (onFetch) {
                                    onFetch(data, dispatch);
                                }
                            });
                    }
                }
            })
        )(RequestContainer);
    };
};
