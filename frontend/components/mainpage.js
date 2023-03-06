import React from "react";
import { Carousel } from 'antd';
const contentStyle = {
    padding: '400px 400px',
    color: '#000000',
    fontSize: 35,
    textAlign: 'center',
    marginBlockStart: 0,
};

const home = <h3 style={contentStyle}>siRNA分析软件平台<br/>Analysis software platform for siRNA</h3>

export default function MainPage() {
    return(
        <>
            <Carousel autoplay effect="fade">
                <div>
                    {home}
                </div>
                <div>
                    {home}
                </div>
                <div>
                    {home}
                </div>
            </Carousel>
        </>
    )


}