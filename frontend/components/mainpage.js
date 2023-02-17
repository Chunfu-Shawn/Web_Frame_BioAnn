import React from "react";
import { Carousel } from 'antd';
const contentStyle = {
    padding: '400px 400px',
    color: '#000000',
    fontSize: 35,
    textAlign: 'center',
    marginBlockStart: 0,
};

export default function MainPage() {
    return(
        <>
            <Carousel autoplay effect="fade">
                <div>
                    <h3 style={contentStyle}>Software platform for siRNA</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>Software platform for siRNA</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>Software platform for siRNA</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>Software platform for siRNA</h3>
                </div>
            </Carousel>
        </>
    )


}