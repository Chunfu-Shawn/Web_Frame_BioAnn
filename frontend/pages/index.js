import Head from 'next/head'
import LayoutCustom, {Context, siteTitle} from '../components/LayoutCustom.js'
import MainPage from "../components/mainpage.js";
import {useContext, useEffect} from "react";


export default function Home() {
    const context = useContext(Context);
    return (
        <LayoutCustom>
            <Head>
                <title>{siteTitle+"- Home"}</title>
            </Head>
            <div id="home" className={"mainbody"}>
                <MainPage></MainPage>
            </div>
        </LayoutCustom>
    )
}