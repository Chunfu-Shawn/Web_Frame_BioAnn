import Head from 'next/head'
import LayoutCustom, { siteTitle } from '../components/LayoutCustom.js'
import MainPage from "../components/mainpage.js";

export default function Home() {

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