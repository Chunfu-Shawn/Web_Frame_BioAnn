import Head from 'next/head'
import LayoutCustom, { siteTitle } from '../components/LayoutCustom.js'
import RunModule from "../components/OSHA/RunModule";
import {validateMessages} from "./login";
import {Card} from "antd";

export default function OSHA() {

    return (
        <LayoutCustom>
            <Head>
                <title>{siteTitle+" | OSHA"}</title>
            </Head>
            <div className="modal-body-stw" >
                <div style={{margin:80}}>
                    <h2>Oligonucleotides Species Homology Analytic System (OSHA)</h2>
                </div>
                <Card style={{padding: "20px 150px"}}>
                    <RunModule validateMessages={validateMessages}/>
                </Card>
            </div>
        </LayoutCustom>
    )
}