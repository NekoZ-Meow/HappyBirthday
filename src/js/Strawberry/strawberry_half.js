import React from "react";
import ReactDOM from "react-dom";
import styled from 'styled-components';
import Cake from "../Cake/cake.js";


const BERRY_COLOR = "red";
const BERRY_SHADOW = "rgba(100,100,100,1)"
const BERRY_SIZE = Cake.getCakeWidth() / 11;
const CAKE_HEIGHT = Cake.getCakeHeight();
const CAKE_VERTICAL = Cake.getVerticalHeight();
const BERRY_BORDER_COLOR = "#77461A";
const BERRY_INNER_COLOR = "#EB7E75";
const BERRY_INNER_SIZE = 80; //いちごの何%か

const BaseStyle = styled.div`
    position:absolute;
    top: ${CAKE_VERTICAL / 3}px;
    right: 0;
    bottom:0;
    left: 0;
    margin: auto; /*上下左右中央に*/
    width:${BERRY_SIZE}px;
    height:${BERRY_SIZE}px;
`;


const BerryStyle = styled.div`
    position:absolute;
    background-color:${BERRY_COLOR};
    border:1px solid ${BERRY_BORDER_COLOR};
    border-radius:90% 0% 50% 50% / 50% 10% 100% 50% ;
    transform:rotate(-45deg);
    width:100%;
    height:100%;
`;

const BerryInnerStyle = styled.div`
    position:absolute;
    top: ${BERRY_INNER_SIZE / 5}%;
    right: ${BERRY_INNER_SIZE / 5}%;
    bottom:0;
    left: 0;
    margin: auto;
    background-color:${BERRY_INNER_COLOR};
    border-radius:90% 0% 50% 50% / 50% 10% 100% 50% ;
    width:${BERRY_INNER_SIZE}%;
    height:${BERRY_INNER_SIZE}%;
`;

export default class StrawBerryHalf extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BaseStyle style={{ zIndex: this.props.zIndex ? this.props.zIndex : 3 }}>
                <BerryStyle style={{ left: `${this.props.left ? this.props.left : 0}px`, bottom: `${this.props.bottom ? this.props.bottom : 0}px` }} >
                    <BerryInnerStyle />
                </BerryStyle>
            </BaseStyle>
        );
    }
}