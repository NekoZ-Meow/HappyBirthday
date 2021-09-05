import React from "react";
import ReactDOM from "react-dom";
import styled from 'styled-components';
import Cake from "../Cake/cake.js";


const CREAM_COLOR = "white";
const CREAM_SHADOW = "rgba(100,100,100,1)"
const CREAM_SIZE = Cake.getCakeWidth() / 10;
const CAKE_HEIGHT = Cake.getCakeHeight();
const CAKE_VERTICAL = Cake.getVerticalHeight();
const CREAM_BORDER_COLOR = "#77461A";;

const BaseStyle = styled.div`
    position:absolute;
    top: 0;
    right: 0;
    bottom: ${CAKE_VERTICAL * 1.1}px;
    left: 0;
    margin: auto; /*上下左右中央に*/
    width:${CREAM_SIZE * 1.2}px;
    height:${CREAM_SIZE}px;
`;


const CreamStyle = styled.div`
    position:absolute;
    background: linear-gradient(25deg,${CREAM_COLOR} 60%,${CREAM_SHADOW});
    border:1px solid ${CREAM_BORDER_COLOR};
    border-radius:0% 70% 100% 39% / 60% 40% 100% 70%  ;
    transform:rotate(45deg);
    width:100%;
    height:100%;
`;

export default class Cream extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BaseStyle style={{ zIndex: this.props.zIndex ? this.props.zIndex : 3 }}>
                <CreamStyle style={{
                    left: `${this.props.left ? this.props.left : 0}px`,
                    bottom: `${this.props.bottom ? this.props.bottom : 0}px`
                }} />
            </BaseStyle>
        );
    }
}