import React from "react";
import ReactDOM from "react-dom";
import styled from 'styled-components';
import Constants from "../Constants/constants"

const CAKE_WIDTH = Constants.getBaseSize();
const CAKE_HEIGHT = CAKE_WIDTH / 4;
const BORDER_WIDTH = CAKE_WIDTH / 85;
const BORDER_COLOR = "#77461A";
const VERTICAL_HEIGHT = CAKE_WIDTH / 2.5;
const CAKE_COLOR = "white";
const SPONGE_COLOR = "#F2C868";

const CakeBase = styled.div`
    position:absolute;
    margin: auto; /*上下左右中央に*/
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: ${CAKE_WIDTH}px;
	height:${CAKE_HEIGHT + VERTICAL_HEIGHT}px;
    //bottom:${CAKE_HEIGHT + VERTICAL_HEIGHT}px;
`;

const Ellipse = styled.div`
    position:absolute;
    width: ${CAKE_WIDTH}px;
	height: ${CAKE_HEIGHT}px;
    border: ${BORDER_WIDTH}px solid ${BORDER_COLOR};
	border-radius: ${CAKE_WIDTH}px / ${CAKE_HEIGHT}px;
    background-color: ${CAKE_COLOR};
`;

const UpperEllipse = styled(Ellipse)`
    z-index:0;
`;

const MiddleEllipse = styled.div`
    position: absolute;
    left:0;
    right:0;
    margin: auto; /*上下左右中央に*/
    top: ${CAKE_HEIGHT / 2}px;
    width: ${CAKE_WIDTH - BORDER_WIDTH * 2}px;
	height: ${CAKE_HEIGHT}px;
    border: ${BORDER_WIDTH}px solid ${CAKE_COLOR};
	border-radius: ${CAKE_WIDTH - BORDER_WIDTH * 2}px / ${CAKE_HEIGHT}px;
    background-color: ${CAKE_COLOR};
    border-width: 0 0 ${BORDER_WIDTH}px 0;
    z-index:-2;
`;

const BottomEllipse = styled(Ellipse)`
    top: ${VERTICAL_HEIGHT}px;
    z-index:-3;
`;

const VerticalBar = styled.div`
    position: absolute;
    top: ${CAKE_HEIGHT / 2}px;
    width: ${CAKE_WIDTH}px;
	height: ${VERTICAL_HEIGHT}px;
    border:${BORDER_COLOR};
    border-width: 0 ${BORDER_WIDTH}px 0 ${BORDER_WIDTH}px;
    border-style: solid;
    background-color: ${SPONGE_COLOR};
    z-index:-2;
`;



export default class Cake extends React.Component {


    static getCakeWidth() {
        return CAKE_WIDTH;
    }

    static getCakeHeight() {
        return CAKE_HEIGHT;
    }

    static getVerticalHeight() {
        return VERTICAL_HEIGHT;
    }

    render() {
        return (
            <CakeBase>
                <UpperEllipse>
                </UpperEllipse>
                <VerticalBar>
                </VerticalBar>
                <VerticalBar style={{
                    backgroundColor: `${CAKE_COLOR}`,
                    height: `${VERTICAL_HEIGHT / 3}px`,
                    top: `${CAKE_HEIGHT / 4 + VERTICAL_HEIGHT / 2}px`
                }} />
                <MiddleEllipse style={{ top: `${CAKE_HEIGHT / 2 + VERTICAL_HEIGHT / 3}px` }} />
                <MiddleEllipse style={{ backgroundColor: `${SPONGE_COLOR}` }} />
                <BottomEllipse style={{ backgroundColor: `${SPONGE_COLOR}` }} />
            </CakeBase>
        );
    }
}