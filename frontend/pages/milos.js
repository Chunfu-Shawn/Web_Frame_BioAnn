import Head from 'next/head'
import LayoutCustom, { siteTitle } from '../components/LayoutCustom.js'
import {Card} from "antd";
import RunModule from "../components/MILOS/RunModule";
import {validateMessages} from "./login";

export default function MILOS() {

    return (
        <LayoutCustom>
            <Head>
                <title>{siteTitle+" | MILOS"}</title>
            </Head>
            <div className="modal-body-stw" >
                <div style={{margin:80}}>
                    <h2>miRNA-like脱靶分析<br/>miRNA-like off-target screening (MILOS)</h2>
                </div>
                <Card style={{padding: "20px 150px"}}>
                    <RunModule validateMessages={validateMessages}/>
                </Card>
            </div>
        </LayoutCustom>
    )
}