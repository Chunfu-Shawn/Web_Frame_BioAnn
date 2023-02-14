import Head from 'next/head'
import LayoutCustom, { siteTitle } from '../components/LayoutCustom.js'
import {Space, Row, Col} from 'antd';
import Guidance from "../components/Mapping/index/Guidance";
import Link from "next/link.js";
import {QuestionCircleOutlined} from "@ant-design/icons";
import React from "react";
import UploadModule from "../components/Mapping/index/UploadModule";

export default function Mapping() {

    return (
        <LayoutCustom>
            <Head>
                <title>{siteTitle +'| Spatial Mapping'}</title>
            </Head>
            <Row style={{width:"100vw",minWidth:1440}}>
                <Col style={{width:"35%"}}>
                    <div className={"modal-body-stw"} style={
                        {
                            borderStyle:"inset",
                            borderColor:"lightgray",
                            borderBottom:"none",
                            backgroundColor:"rgba(221,221,248,0.18)",
                            padding:"150px 80px 150px 100px",
                            width:"auto",
                            minWidth:500,
                            height:"100%",
                        }}>
                        <div style={{width:350,float:"right"}}>
                            <Guidance></Guidance>
                        </div>
                    </div>
                </Col>
                <Col style={{width:"65%"}}>
                    <div className="modal-body-stw" style={{width:"auto",padding:'120px 100px',textAlign:"left"}}>
                        <div style={{margin:"40px 0px 50px 0"}}>
                            <Space align="start">
                                <h1 style={
                                    {
                                        fontSize:"46px",
                                    }
                                }>Spatial Mapping</h1>
                                <Link href={'/help/manual/mapping'}>
                                    <a target={'_blank'} rel={"noreferrer"}>
                                        <QuestionCircleOutlined  style={{fontSize:"20px",color:"#2b1970"}}/>
                                    </a>
                                </Link>
                            </Space>
                        </div>
                        <UploadModule/>
                    </div>
                </Col>
            </Row>
        </LayoutCustom>
    )
}