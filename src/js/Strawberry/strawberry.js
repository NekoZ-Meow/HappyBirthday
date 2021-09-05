import React from "react";
import ReactDOM from "react-dom";
import styled from 'styled-components';
import Cake from "../Cake/cake.js";


const BERRY_COLOR = "red";
const BERRY_SHADOW = "rgba(100,100,100,1)"
const BERRY_SIZE = Cake.getCakeWidth() / 8;
const CAKE_HEIGHT = Cake.getCakeHeight();
const CAKE_VERTICAL = Cake.getVerticalHeight();
const BERRY_BORDER_COLOR = "#77461A";
const HOLE_NUM = 10;

const BaseStyle = styled.div`
    position:absolute;
    top: 0;
    right: 0;
    bottom: ${CAKE_VERTICAL + BERRY_SIZE * 0.9}px;
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

const HoleBase = styled.div`
    position:absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width:60%;
    height:65%;
    margin: auto; /*上下左右中央に*/
`;

const Hole = styled.div`
    position:absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width:8%;
    height:15%;
    background-color: #F7AC04;
    border:1px solid #F7AC04;
    border-radius: 70%;
`;



export default class StrawBerry extends React.Component {
    constructor(props) {
        super(props);
    }

    holeGenerator(left, top) {
        return <Hole style={{
            left: `${left}%`,
            top: `${top}%`,
            transform: `rotate(45deg)`
        }} />;
    }


    render() {
        let holes = [];

        for (let i = 0; i < HOLE_NUM; i++) {
            holes.push(this.holeGenerator(i % 3 * 30 + 5, Math.floor(i / 3) * 30));
        }

        return (
            <BaseStyle style={{ zIndex: this.props.zIndex ? this.props.zIndex : 3 }}>
                <BerryStyle style={{
                    left: `${this.props.left ? this.props.left : 0}px`,
                    bottom: `${this.props.bottom ? this.props.bottom : 0}px`
                }} >
                    <HoleBase >
                        {holes}
                    </HoleBase>
                </BerryStyle>
            </BaseStyle>
        );
    }
}