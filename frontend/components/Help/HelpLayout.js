import Head from 'next/head'
import LayoutCustom, { siteTitle } from '../LayoutCustom.js'
import {Affix, Col, Row} from 'antd';
import React from 'react';
import {SiderStaticMenu} from "./SiderStaticMenu";

export default function HelpLayout({children, opened, selected}) {
    return (
        <LayoutCustom>
            <Head>
                <title>{siteTitle+"| Help"}</title>
            </Head>
            <div className="modal-body-stw" style={{padding:"0px 0px"}}>
                <Row style={{width:"100%"}}>
                    <Col span={3}>
                        <Affix offsetTop={0}>
                            <SiderStaticMenu selected={selected} opened={opened}/>
                        </Affix>
                    </Col>
                    <Col span={21}>
                        <div style={{display:'inline-block',paddingBottom:'50px'}}>
                            {children}
                        </div>
                    </Col>
                </Row>
            </div>
        </LayoutCustom>
    )
}