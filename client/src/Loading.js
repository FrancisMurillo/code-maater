import React from "react";
import ReactLoading from "react-loading";
import styled from "styled-components";

const LoadingContainer = styled.div`
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

export default () => (
    <LoadingContainer>
        <Loader />
    </LoadingContainer>
);
