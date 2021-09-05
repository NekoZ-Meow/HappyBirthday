import React from "react";
import ReactDOM from "react-dom";
import styled from 'styled-components'

const TitleStyle = styled.h1`
    text-align: center;
    color:white;
    font-size: 10vw;
    margin-top: 2%;
    margin-bottom: 2%;
`;

export default class Title extends React.Component {

    render() {
        return (
            <TitleStyle>Happy Birthday!!</TitleStyle>
        );
    }
}