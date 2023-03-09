import Head from 'next/head'
import LayoutCustom, { siteTitle } from '../components/LayoutCustom.js'
import {Card} from "antd";
import RunModule from "../components/SIDER/RunModule";
import {validateMessages} from "./login";

export default function SIDER() {

    return (
        <LayoutCustom>
            <Head>
                <title>{siteTitle+" | SIDER"}</title>
            </Head>
            <div className="modal-body-stw" style={{padding: "80px 100px"}}>
                <div style={{margin:80}}>
                    <h2>siRNA设计软件<br/>siRNA designer (SIDER)</h2>
                </div>
                <Card style={{padding: "20px 60px"}}>
                    <RunModule validateMessages={validateMessages}/>
                </Card>
            </div>
        </LayoutCustom>
    )
}