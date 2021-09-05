import React from "react";
import ReactDOM from "react-dom";
import styled, { keyframes } from 'styled-components';
import Cake from "../Cake/cake.js";
import Constants from "../Constants/constants";


const STAR_COLOR = "white";
const IMAGE_PATH = "./src/image/neko.png";
const NEKO_SIZE = Cake.getCakeWidth() / 3;

const BaseStyle = styled.div`
    position:absolute;
    width:${NEKO_SIZE}px;
    height:${NEKO_SIZE}px;
    z-index: 2000;
`;

const rotate1 = keyframes`
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(-360deg); }
`;

const NekoStyle = styled.img`
    position:absolute;
    width:100%;
    height:100%;
    z-index: 2000;
    animation: ${rotate1} 3s linear infinite;
`;

export default class Neko extends React.Component {
    constructor(props) {
        super(props);
        this.intervalId = null;
        this.state = {
            x: -300,
            y: this.randomInt(Constants.getWindowHeight() * 0.2, Constants.getWindowHeight() * 0.8),
            speed: 5,
            size: Cake.getCakeWidth() / 3,
            isVisible: false,
        }
    }

    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    componentDidMount() {
        window.setInterval(() => {
            if (this.state.isVisible) {
                return;
            }
            if (this.randomInt(0, 3) == 0) {
                this.setState(prev => {
                    return {
                        x: -300,
                        y: this.randomInt(Constants.getWindowHeight() * 0.2, Constants.getWindowHeight() * 0.8),
                        speed: this.randomInt(3, 8),
                        size: this.randomInt(Cake.getCakeWidth() / 5, Cake.getCakeWidth() / 2),
                        isVisible: true,
                    };
                });
                this.intervalId = window.setInterval(() => {
                    if (this.state.x >= Constants.getWindowWidth() + NEKO_SIZE) {
                        clearInterval(this.intervalId);
                        this.setState(prev => {
                            return { isVisible: false, };
                        });
                    }
                    else {
                        this.setState(prev => {
                            return { x: prev.x + this.state.speed, };
                        });
                    };
                }, 100);
            }
        }, 3000);
    }

    componentWillUnmount() {
        if (this.intervalId != null) {
            clearInterval(this.intervalId);
        }
    }

    render() {
        if (this.state.isVisible) {
            return (
                <BaseStyle style={{
                    left: `${this.state.x}px`,
                    top: `${this.state.y}px`
                }}>
                    <NekoStyle src={`${IMAGE_PATH}`} />
                </BaseStyle>
            );
        }
        return (<div></div>)
    }
}