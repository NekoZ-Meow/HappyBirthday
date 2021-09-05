import React from "react";
import ReactDOM from "react-dom";
import styled from 'styled-components';
import Cake from "../Cake/cake.js";
import Constants from "../Constants/constants";


const CAKE_HEIGHT = Cake.getCakeHeight();
const CAKE_VERTICAL = Cake.getVerticalHeight();
const STAR_COLOR = "white";

const BaseStyle = styled.div`
    position:absolute;
    width:10px;
    height:10px;
    z-index: 2000;
`;


const StarStyle = styled.div`
    position:absolute;
    background-color: ${STAR_COLOR};
    width:100%;
    height:100%;
    border:1px solid ${STAR_COLOR};
    border-radius:50%;
    z-index: 2000;
`;

export default class Star extends React.Component {
    constructor(props) {
        super(props);
        this.intervalId = null;
        this.state = {
            x: -50,
            y: 100,
            speed: 5,
            size: 100,
        }
    }

    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    initialize() {
        this.setState(prev => {
            return {
                x: this.randomInt(-150, -50),
                y: this.randomInt(1, Constants.getWindowHeight() - 1),
                speed: this.randomInt(5, 20),
                size: this.randomInt(50, 100),
            }
        }
        );
    }

    componentDidMount() {
        this.initialize();
        this.intervalId = window.setInterval(() => {
            if (this.state.x >= Constants.getWindowWidth()) {
                this.initialize();
            }
            else {
                this.setState(prev => {
                    return { x: prev.x + this.state.speed, };
                });
            };
        }, 100);
    }

    componentWillUnmount() {
        if (this.intervalId != null) {
            clearInterval(this.intervalId);
        }
    }

    render() {
        return (
            <BaseStyle style={{
                left: `${this.state.x}px`,
                top: `${this.state.y}px`
            }}>
                <StarStyle style={{
                    width: `${this.state.size}%`,
                    height: `${this.state.size}%`,
                }} />
            </BaseStyle>
        );
    }
}