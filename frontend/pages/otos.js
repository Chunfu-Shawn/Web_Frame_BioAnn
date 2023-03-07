import Head from 'next/head'
import LayoutCustom, { siteTitle } from '../components/LayoutCustom.js'
import {Card} from "antd";
import RunModule from "../components/OTOS/RunModule";
import {validateMessages} from "./login";

export default function OTOS() {

    return (
        <LayoutCustom>
            <Head>
                <title>{siteTitle+" | OTOS"}</title>
            </Head>
            <div className="modal-body-stw" >
                <div style={{margin:80}}>
                    <h2>小核酸序列转录组脱靶分析工具<br/>Oligonucleotides transcriptome off-target scanner (OTOS)</h2>
                </div>
                <Card style={{padding: "20px 150px"}}>
                    <RunModule validateMessages={validateMessages}/>
                </Card>
            </div>
        </LayoutCustom>
    )
}