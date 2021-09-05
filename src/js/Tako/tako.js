import React from "react";
import ReactDOM from "react-dom";
import styled from 'styled-components';
import Cake from "../Cake/cake.js";
import Constants from "../Constants/constants";


const TAKO_SIZE = Cake.getCakeWidth() / 3;
const IMAGE_PATH = "./src/image/tako.png";
const MESSAGE = "Happy Birthday!!";
const MESSAGE_SIZE = Constants.getWindowWidth() / 6;

const BaseStyle = styled.div`
    position:absolute;
    width: max-content;
    height:max-content;
    z-index: 2001;
`;


const TakoStyle = styled.img`
    position:absolute;
    height:${TAKO_SIZE}px;
    width:auto;
    z-index: 2001;
`;

// const MessageStyle = styled.h3`
//     display: inline-block;
//     position: relative;
//     height: ${MESSAGE_SIZE}px;/*高さ*/
//     line-height: ${MESSAGE_SIZE}px;/*高さ*/
//     text-align: center;
//     padding: 0 ${MESSAGE_SIZE / 4}px 0 ${MESSAGE_SIZE / 6}px;/*文字の左右の余白*/
//     font-size: ${MESSAGE_SIZE / 3}px;/*文字サイズ*/
//     background: #ffc668;/*背景色*/
//     color: #FFF;/*文字色*/
//     box-sizing: border-box;
//     z-index:2001;
//     left:${TAKO_SIZE}px;

//     ::after{
//         position: absolute;
//         content: '';
//         width: 0px;
//         height: 0px;
//         z-index: 1;
//         z-index:2001;
//     };

//     ::after{
//         top: 0;
//         right: 0;
//         border-width: ${MESSAGE_SIZE / 2}px ${MESSAGE_SIZE / 6}px ${MESSAGE_SIZE / 2}px 0px;
//         border-color: transparent black transparent transparent;
//         border-style: solid;
//         z-index: 2002;
//     };
// `;

const MessageBase = styled.div`
    position:absolute;
    margin:auto;
    width: max-content;
    height:${MESSAGE_SIZE}px;
    left:${TAKO_SIZE}px;
    top:${(TAKO_SIZE - MESSAGE_SIZE) / 2}px;
`;


const RibbonStyle = styled.div`
    display: inline-block;
    position: relative;
    height: ${MESSAGE_SIZE}px;/*高さ*/
    line-height: ${MESSAGE_SIZE}px;/*高さ*/
    text-align: center;
    padding: ${MESSAGE_SIZE / 6}px 0;
    background: #7f9dfb;/*背景色*/
    color: #FFF;/*文字色*/
    box-sizing: border-box;

    ::after{
        position: absolute;
        content: '';
        z-index: 2001;
        top: 0;
        right: 0;
        width: 0px;
        height: 0px;
        border-width: ${MESSAGE_SIZE / 2}px  ${MESSAGE_SIZE / 4}px ${MESSAGE_SIZE / 2}px 0;
        border-color: transparent black transparent transparent;
        border-style: solid;
    };
`;

const MessageStyle = styled.h3`
    font-family: cursive ,fantasy;
    padding: 0 ${MESSAGE_SIZE / 2}px 0 ${MESSAGE_SIZE / 4}px;
    border-top: dashed 1px #FFF;
    border-bottom: dashed 1px #FFF;
    font-size: ${MESSAGE_SIZE / 3}px;/*文字サイズ*/
    line-height: ${MESSAGE_SIZE / 1.5}px;
`;


export default class Tako extends React.Component {
    constructor(props) {
        super(props);
        this.intervalId = null;
        this.yLimit = Constants.getBaseSize() / 10;
        this.degree = 0;
        this.ySpeed = 10;
        this.state = {
            x: Constants.getWindowWidth(),
            y: Constants.getWindowHeight() / 2,
            speed: 8,
            size: 100,
            isVisible: false,
        }
    }

    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }


    componentDidMount() {
        window.setTimeout(() => {
            this.setState((prev) => {
                return { isVisible: true };
            });
            this.intervalId = window.setInterval(() => {
                this.degree = (this.degree + this.ySpeed) % 360;
                if (this.state.x >= (Constants.getWindowWidth() * 0.1)) {
                    this.setState(prev => {
                        return {
                            x: prev.x - this.state.speed,
                            y: this.yLimit * Math.sin(this.degree / 180 * Math.PI) + (Constants.getWindowHeight() - TAKO_SIZE) / 2,
                        };
                    });
                } else {
                    this.setState(prev => {
                        return {
                            y: this.yLimit * Math.sin(this.degree / 180 * Math.PI) + (Constants.getWindowHeight() - TAKO_SIZE) / 2,
                        };
                    });
                }
            }, 100);
        }, Constants.getWindowWidth() / 16 * 100);
    }

    componentWillUnmount() {
        if (this.intervalId != null) {
            clearInterval(this.intervalId);
        }
    }

    render() {

        if (!this.state.isVisible) {
            return (
                <div></div>
            );
        }
        return (
            <BaseStyle style={{
                left: `${this.state.x}px`,
                top: `${this.state.y}px`
            }}>
                <TakoStyle src={`${IMAGE_PATH}`} />
                <MessageBase>
                    <RibbonStyle>
                        <MessageStyle>{MESSAGE}</MessageStyle>
                    </RibbonStyle>
                </MessageBase>
            </BaseStyle>
        );
    }
}