import Head from 'next/head'
import LayoutCustom, { siteTitle } from '../components/LayoutCustom.js'

export default function MILOS() {

    return (
        <LayoutCustom>
            <Head>
                <title>{siteTitle+" | MILOS"}</title>
            </Head>
            <div className="modal-body-stw" style={{height:"90vh"}}>
            </div>
        </LayoutCustom>
    )
}