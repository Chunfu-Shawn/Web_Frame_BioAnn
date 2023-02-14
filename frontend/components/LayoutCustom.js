import Head from 'next/head'
import Navigator from "./navigator.js";
import FooterCustom from "./footer.js";
import {FloatButton} from "antd";
// eslint-disable-next-line @next/next/no-document-import-in-page

export const siteTitle = "WEB FRAME "

export default function LayoutCustom({ children }) {
    return (
        <>
            <Head>
                <meta charSet="UTF-8"/>
                <meta name="viewport" content="width=1440,height=1000,user-scalable=yes"/>
                <meta name="og:title" content='Welcome to WEB FRAME' />
            </Head>
            <Navigator></Navigator>
            <FloatButton.BackTop duration={100} visibilityHeight={1000} style={{right:60}}></FloatButton.BackTop>
            {children}
            <div style={{flexGrow:1}}></div>
            <FooterCustom></FooterCustom>
        </>
    )
}
