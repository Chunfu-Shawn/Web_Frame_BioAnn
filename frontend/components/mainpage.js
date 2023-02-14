import React from "react";
import { Carousel } from 'antd';
const contentStyle = {
    height: '800px',
    color: '#fff',
    lineHeight: '800px',
    textAlign: 'center',
    background: '#364d79',
    marginBlockStart: 0,
};

export default function MainPage() {
    return(
        <>
            <Carousel autoplay effect="fade">
                <div>
                    <h3 style={contentStyle}>1</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>2</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>3</h3>
                </div>
                <div>
                    <h3 style={contentStyle}>4</h3>
                </div>
            </Carousel>
        </>
    )


}