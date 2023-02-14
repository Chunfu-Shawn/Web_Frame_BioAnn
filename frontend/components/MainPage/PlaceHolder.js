import Link from "next/link.js";
import {Col} from "antd";
import Image from "next/image";

export default function PlaceHolder(props){
    return(
        <Col span={8}>
            <a className="thumbnail" href={props.link}>
                <Image src={`/images/index/${props.pic}`} alt="..." width={500} height={500}/>
                <div className="caption">
                    <h3>{props.title}</h3>
                    <p>{props.context}</p>
                </div>
            </a>
        </Col>
    )
}