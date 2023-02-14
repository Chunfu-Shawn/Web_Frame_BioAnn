import { Steps } from 'antd';
import React from 'react';
import {SolutionOutlined, UpCircleOutlined, SelectOutlined, CheckCircleOutlined, SearchOutlined} from "@ant-design/icons";
import Link from "next/link";
const { Step } = Steps;

export default function GuidanceMain(){
    const itemsGene = [
        {
            title: "Gene Search",
            description: "Enter a gene of interest to search for spatially resolved gene expression heterogeneity.",
            icon: <SearchOutlined />
        }
    ]
    const items = [
        {
            title: "Spatial Mapping",
            description: 'First, please enter a name of your job and provide an email address (optional) to receive ' +
                'the notification of project progress.',
            icon: <SearchOutlined/>
        },
        {
            title: "Select Matched Species, Organ & Tissue",
            description: "Please select species, organ and tissue that match your scRNA-seq data.",
            icon: <SolutionOutlined />
        },
        {
            title: "Select scRNA-seq Data",
            description: "Please select your scRNA-seq data including count matrix file and label file with cell type annotation.",
            icon: <SelectOutlined />
        },
        {
            title: "Upload and Wait",
            description: "Click on the 'Upload' button and this will redirect you to a running page. Please wait!",
            icon: <CheckCircleOutlined />
        }]
    return(
        <>
            <Steps className={"mainGuidance"} direction="vertical" size="default" current={1} items={itemsGene}/>
            <Steps className={"mainGuidance"} direction="vertical" size="default" current={4} items={items}/>
            <br/>
            <div style={{color:"#efefef",textAlign:"left",font:"bold 18px"}}>
                CLICK ON <a style={{color:"#7653de",fontSize:16}} href={'/tutorial'}> &quot;Tutorial&quot; </a> FOR MORE INSTRUCTIONS!
            </div>
        </>

    )
}