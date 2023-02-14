import Link from "next/link.js";
import {Col, Row} from "antd";
import Image from "next/image";

export default function IntroductionModule(props){
    return(
        <Row gutter={[0,0]} style={{margin:"20px 0px"}}>
            <Col span={5}>
                <a href={props.link}>
                    <Image className="media-object"
                         src={props.pic}
                         alt="missing pic"
                         width={220} height={150}
                    />
                </a>
            </Col>
            <Col span={19}>
                <h3>
                    <a href={props.link} style={{color:"#1b103f"}}>{props.title}</a>
                </h3>
                <p style={{color:"gray"}}>{props.context}</p>
            </Col>
        </Row>
    )
}