import React from "react";
import ReactDOM from "react-dom";
import styled from 'styled-components';

import Title from "./Title/title";
import Cake from "./Cake/cake";
import Candle from "./candle/candle";
import Cream from "./Cream/cream";
import StrawBerry from "./Strawberry/strawberry";
import StrawBerryHalf from "./Strawberry/strawberry_half";
import Star from "./Star/star";
import Tako from "./Tako/tako";
import Neko from "./Neko/neko";

const CAKE_WIDTH = Cake.getCakeWidth();
const CAKE_HEIGHT = Cake.getCakeHeight();
const CANDLE_NUM = 20;
const CREAM_NUM = 8;
const STRAWBERRY_NUM = 8;
const STRAWBERRY_HALF_NUM = 5;
// document.addEventListener('touchmove', function (e) { e.preventDefault(); }, { passive: false });

const BaseStyle = styled.div`
    position: relative;
    width:100vw;
    height:100vh;
    overflow:hidden;
`;

const CakeStyle = styled.div`
    //margin: auto;
    position:absolute;
    right: 0;
    top: 30%;
    left: 0;
    margin-left: auto; /*上下左右中央に*/
    margin-right: auto; /*上下左右中央に*/
    width:90%;
    height:70%;
`;

const RadialGradation = styled.div`
    position:absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin:auto;
    background: radial-gradient(circle closest-side,rgba(255,150,10,0.7) , black 80%);
    width:${CAKE_WIDTH}px * 2;
    height:${CAKE_HEIGHT}px * 2;
    z-index: -100;
`;

const BlackFilter = styled.div`
    position :absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin:auto;
    background-color: rgba(0,0,0,0);
    width :100%;
    height:100%;
    z-index:500;
    pointer-events: none;
`;

const InfoText = styled.p`
    position:absolute;
    color: white;
    bottom:0;
    font-size : ${Cake.getCakeWidth() / 20}px;
    width :100%;
    text-align:center;
`;


class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fires: CANDLE_NUM,
        }
        this.offFire = this.offFire.bind(this);
    }

    offFire() {
        this.setState(prev => ({
            fires: prev.fires - 1
        }));
    }

    render() {
        let candles = [];

        for (let i = 0; i < CANDLE_NUM; i++) {
            let degree = 360 / CANDLE_NUM * i + 270;
            let rad = Math.PI * degree / 180;
            let y = (CAKE_HEIGHT * Math.sin(rad) / 2 * 0.5);
            let x = (CAKE_WIDTH * Math.cos(rad) / 2 * 0.5);
            degree = (Math.round(degree) + 90) % 360;
            degree = degree > 180 ? 360 - degree : degree;
            let zIndex = degree % 181;
            candles.push(
                <Candle left={`${x}`} bottom={`${y}`} zIndex={`${360 - zIndex}`} onMouseOver={this.offFire} />
            );
        }

        let creams = [];
        for (let i = 0; i < CREAM_NUM; i++) {
            let degree = 360 / CREAM_NUM * i;
            let rad = Math.PI * degree / 180;
            let y = (CAKE_HEIGHT * Math.sin(rad) / 2 * 0.75);
            let x = (CAKE_WIDTH * Math.cos(rad) / 2 * 0.75);
            degree = (Math.round(degree) + 90) % 360;
            degree = degree > 180 ? 360 - degree : degree;
            let zIndex = degree % 181;
            creams.push(
                <Cream left={`${x}`} bottom={`${y}`} zIndex={`${360 - zIndex}`} />
            );
        }

        let creams2 = [];
        for (let i = 0; i < CREAM_NUM / 2; i++) {
            let degree = 360 / (CREAM_NUM / 2) * i + 45;
            let rad = Math.PI * degree / 180;
            let y = (CAKE_HEIGHT * Math.sin(rad) / 2 * 0.4);
            let x = (CAKE_WIDTH * Math.cos(rad) / 2 * 0.4);
            degree = (Math.round(degree) + 90) % 360;
            degree = degree > 180 ? 360 - degree : degree;
            let zIndex = degree % 181;
            creams.push(
                <Cream left={`${x}`} bottom={`${y}`} zIndex={`${360 - zIndex}`} />
            );
        }

        let strawberrys = [];
        for (let i = 0; i < STRAWBERRY_NUM; i++) {
            let degree = 360 / STRAWBERRY_NUM * i + (45 / 2);
            let rad = Math.PI * degree / 180;
            let y = (CAKE_HEIGHT * Math.sin(rad) / 2 * 0.75);
            let x = (CAKE_WIDTH * Math.cos(rad) / 2 * 0.75);
            degree = (Math.round(degree) + 90) % 360;
            degree = degree > 180 ? 360 - degree : degree;
            let zIndex = degree % 181;
            strawberrys.push(
                <StrawBerry left={`${x}`} bottom={`${y}`} zIndex={`${360 - zIndex}`} />
            );
        }

        let strawberry_halfs = [];
        for (let i = 0; i < STRAWBERRY_HALF_NUM; i++) {
            let degree = 180 / (STRAWBERRY_HALF_NUM - 1) * i + 180;
            let rad = Math.PI * degree / 180;
            let y = (CAKE_HEIGHT * Math.sin(rad) / 2 * 0.5);
            //let x = (CAKE_WIDTH * Math.cos(rad) / 2 * 0.8);
            let x = ((CAKE_WIDTH / STRAWBERRY_HALF_NUM) * i * 1.25 - (CAKE_WIDTH / 2)) * 0.8;
            strawberry_halfs.push(
                <StrawBerryHalf left={`${x}`} bottom={`${y}`} />
            );
        }

        let stars = [];
        for (let i = 0; i < 50; i++) {
            stars.push(<Star />)
        }

        if (this.state.fires == 0) {
            return (
                <BaseStyle>
                    <Tako />
                    {stars}
                    <Neko />
                </BaseStyle>
            );
        }

        return (
            <BaseStyle>
                <RadialGradation style={{
                    background: `radial-gradient(circle closest-side, rgba(255, 150, 10, 0.7), black ${70 * this.state.fires / CANDLE_NUM + 50}%)`,
                }} />
                <BlackFilter style={{
                    backgroundColor: `rgba(0,0,0,${this.state.fires == 0 ? 1 : 1 - this.state.fires / CANDLE_NUM * 8})`
                }} />
                <CakeStyle>
                    {creams2}
                    {candles}
                    {creams}
                    <StrawBerry zIndex={200} />
                    {strawberrys}
                    <Cake >
                    </Cake>
                    {strawberry_halfs}
                </CakeStyle>
                <InfoText>タップ/クリックで消せます</InfoText>
            </BaseStyle>
        );
    }
}

const app = document.getElementById('app');
ReactDOM.render(<Layout />, app);