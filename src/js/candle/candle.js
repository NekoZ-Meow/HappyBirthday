import React from "react";
import ReactDOM from "react-dom";
import styled from 'styled-components';
import Cake from "../Cake/cake.js";
import Constants from "../Constants/constants";


const FIRE_ORANGE = "rgba(255,150,10,1)";
const FIRE_MIDDLE = "white";
const FIRE_BORDER = "rgba(255,150,10,0.3)";

const CANDLE_COLOR = "rgba(255,140,150,1)"

const CAKE_WIDTH = Cake.getCakeWidth();
const CAKE_HEIGHT = Cake.getCakeHeight();
const CAKE_VERTICAL = Cake.getVerticalHeight();

const CANDLE_WIDTH = CAKE_WIDTH / 35;
const CANDLE_HEIGHT = CANDLE_WIDTH * 8;

const ArgumentBase = styled.div`
    position:absolute;
    top: 0;
    right: 0;
    bottom:  ${CAKE_VERTICAL + CAKE_HEIGHT * 1.2}px;
    left: 0;
    margin: auto; /*上下左右中央に*/
    width:${CANDLE_WIDTH}px;
    height:${CANDLE_HEIGHT}px;
`;


const CandleBase = styled.div`
    position:absolute;
    width : 100%;
    height :100%;
`;

const FireBase = styled.div`
    position:absolute;
    top: -${CANDLE_HEIGHT / 10}px;
    right: -${CANDLE_WIDTH / 2}px; /*上下左右中央に*/
    width : ${CANDLE_WIDTH * 2}px;
    height : ${CANDLE_HEIGHT * 0.5}px;
`;

const Fire = styled.div`
    margin-left: auto;
    margin-right: auto;
    right: 0;
    left: 0;
    top: ${CANDLE_HEIGHT / 10}px;
    position:absolute;
    background: linear-gradient(${FIRE_ORANGE} ,30%,${FIRE_MIDDLE} ,${FIRE_MIDDLE} 70%,${FIRE_ORANGE});
    width : ${CANDLE_WIDTH}px;
    height : ${CANDLE_HEIGHT * 0.3}px;
    border: 1px solid ${FIRE_BORDER};
`;

const Rectangle = styled.div`
    position:absolute;
    margin-left: auto;
    margin-right: auto;
    top:${CANDLE_HEIGHT * 0.3}px;
    width : ${CANDLE_WIDTH * 0.8}px;
    height : ${CANDLE_HEIGHT}px;
    background-color: ${CANDLE_COLOR};
    border-radius: 50% 50% 0% 0% / 30% 30% 0% 0%;
    background-image:repeating-linear-gradient(-65deg,#fff, #fff ${CANDLE_HEIGHT / 26}px,transparent 0, transparent ${CANDLE_HEIGHT / 13}px);
`;

export default class Candle extends React.Component {
    constructor(props) {
        super(props);
        this.intervalId = null;
        this.increaseCount = 15;
        this.state = {
            topRadius: 0,
            leftRadius: 0,
            rightRadius: 0,
            onFire: true,
        };
        this.dragHandler = this.dragHandler.bind(this);
    }

    randomSwitch(probability) {
        if (probability > Math.random()) {
            return 1;
        }
        return -1;
    }

    limitRange(value, min, max) {
        if (value < min) {
            value = min;
        }
        else if (value > max) {
            value = max;
        }
        return value;
    }

    componentDidMount() {
        this.intervalId = window.setInterval(() => {

            let topRadius = this.state.topRadius + (this.increaseCount * this.randomSwitch(0.5));
            let leftRadius = this.state.leftRadius + (this.increaseCount * this.randomSwitch(0.5));
            let rightRadius = this.state.rightRadius + (this.increaseCount * this.randomSwitch(0.5));
            topRadius = this.limitRange(topRadius, 0, 100);
            leftRadius = this.limitRange(leftRadius, 40, 70);
            rightRadius = this.limitRange(rightRadius, 40, 70);
            this.setState((state, props) => {
                return {
                    topRadius: topRadius,
                    leftRadius: leftRadius,
                    rightRadius: rightRadius,
                };
            });
        }, 100);
    }

    componentWillUnmount() {
        if (this.intervalId != null) {
            clearInterval(this.intervalId);
        }
    }

    dragHandler() {
        this.props.onMouseOver();
        clearInterval(this.intervalId);
        this.setState(prev => ({
            onFire: false

        }));

    }

    render() {
        let fire = (
            <FireBase onTouchStart={this.dragHandler} onClick={this.dragHandler} onTouchMove={this.dragHandler} onMouseOver={this.dragHandler}>
                <Fire style={{
                    borderRadius: `${this.state.topRadius}% ${100 - this.state.topRadius}% 50% 50% / ${this.state.leftRadius}% ${this.state.rightRadius}% ${100 - this.state.rightRadius}% ${100 - this.state.leftRadius}%`
                }} />
            </FireBase>
        );
        if (!this.state.onFire) {
            fire = <div style={{ pointerEvents: "none" }}></div>
        }

        return (
            <ArgumentBase >
                <CandleBase style={{
                    left: `${this.props.left}px`,
                    bottom: `${this.props.bottom}px`,
                    zIndex: this.props.zIndex ? this.props.zIndex : 3
                }}>
                    {fire}
                    <Rectangle>
                    </Rectangle>
                </CandleBase>
            </ArgumentBase>
        );
    }
}