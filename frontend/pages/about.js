import Head from 'next/head'
import LayoutCustom, { siteTitle } from '../components/LayoutCustom.js'
import Image from "next/image";
import { Divider } from 'antd';
import React from "react";


export default function About() {

    return (
        <LayoutCustom>
            <Head>
                <title>{siteTitle+"| Contact"}</title>
            </Head>
            <div className="modal-body-stw">
                <header className="page-header">
                    <h1>About STellaris</h1>
                </header>
                <div className="box">
                    <p>Single-cell RNA sequencing (scRNA-seq) can unbiasedly profile molecular signatures of diverse cell
                        types. However, spatial context was lost in dissociation steps, hindering the further interpretation
                        of crosstalk of different cell types that coordinates tissue formation and pathological states.
                        The emerging spatial transcriptome (ST) methods enable measuring gene expression while preserving
                        spatial information. These ST data have the potential to serve as a reference for mapping of
                        spatial location for the ever-growing scRNA-seq data, thereby increasing their value in deciphering
                        the cellular basis of tissue architecture, development and disease.</p>
                    <p><b>STellaris</b> is an integrated web application for accurate mapping of spatial location for
                        scRNA-seq, which is founded on a comprehensive compilation of public available ST datasets
                        spanning organs, developmental stages and diseases in human and mouse. With the inferred
                        spatial information of single cells, STellaris can characterize spatial microenvironment and
                        identify intercelluar communications from a spatial perspective, such as cellular colocalization
                        and ligand-receptor interaction.</p>
                    <p><b>STellaris</b> also provides an interface to help researchers explore molecular landscape of
                        spatial map in all curated ST datasets, which were processed using a centralized ST workflow.
                        Moreover, we also provide researchers with a gene query interface to access the expression profile
                        of candidate genes from the perspective of spatial localization, which was based on deep integration
                        of our compiled ST datasets, such as spatially variable genes.</p>
                    <p>STellaris could expand our understanding of scRNA-seq at spatial context, especially
                        the spatially resolved cell-cell communication.</p>
                    <p>This tool is developed and maintained by Xiangshang Li, Chunfu Xiao and Juntian Qi of Chuan-Yun Li’s
                        lab, Peking University.</p>
                </div>
                <Image src={'/images/figure1.png'} alt={"figure1"} width={800} height={660}/>
                <Divider><h2>License</h2></Divider>
                <div className="box">
                    <p>STellaris is open and free for everyone to use and there is no login requirement. Please be assured
                        that your submitted data will be kept private. We recommend that everyone could use this web server
                        in a rational manner, please limit your requests to no more than <b>3</b> concurrent jobs.</p>
                </div>
                <Divider><h2>Acknowledgement</h2></Divider>
                <div className="box">
                    <p>
                        STellaris is integrated and inspired by several analysis tools or methods that have been
                        <a href={"https://pubmed.ncbi.nlm.nih.gov/?term=35314812%2C31932730%2C34857954%2C36130281%2C29409532%2C34774128%2C32719530"}
                           target={"_blank"} rel={"noreferrer"}>
                            &nbsp;published earlier
                        </a>.
                    </p>
                    <p>
                        This project was supported by grants from the Ministry of Science and Technology of China
                        (National Key Research and Development Program of China, 2018YFA0801405 and 2019YFA0801801) and
                        the National Natural Science Foundation of China (31871272 and 31801103).
                    </p>
                </div>
                {/* eslint-disable-next-line @next/next/no-sync-scripts */}
            </div>
        </LayoutCustom>
    )
}