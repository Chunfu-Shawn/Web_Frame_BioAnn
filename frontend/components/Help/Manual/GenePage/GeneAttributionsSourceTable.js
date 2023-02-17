import {Collapse, Table} from "antd";
import React from "react";
const { Panel } = Collapse;
const data = [
    {
        "Datasets": "Gene Info",
        "Attribute": "Symbol",
        "Source": "Ensembl Database"
    },
    {
        "Datasets": "Gene Info",
        "Attribute": "Ensembl ID",
        "Source": "Ensembl Database"
    },
    {
        "Datasets": "Gene Info",
        "Attribute": "Description",
        "Source": "Ensembl Database"
    },
    {
        "Datasets": "Gene Info",
        "Attribute": "Gene Type",
        "Source": "Ensembl Database"
    },
    {
        "Datasets": "Gene Info",
        "Attribute": "Organism",
        "Source": "Ensembl Database"
    },
    {
        "Datasets": "Gene Info",
        "Attribute": "Chromosome, Start, End, Strand",
        "Source": "Ensembl Database"
    },
    {
        "Datasets": "Gene Info",
        "Attribute": "Gene Source",
        "Source": "Ensembl Database"
    },
    {
        "Datasets": "Gene Info",
        "Attribute": "Gene Version",
        "Source": "Ensembl Database"
    },
    {
        "Datasets": "Gene Info",
        "Attribute": "Entrez ID",
        "Source": "NCBI Gene Database"
    },
    {
        "Datasets": "Gene Info",
        "Attribute": "Aliases / Gene Synonyms",
        "Source": "NCBI Gene Database"
    },
    {
        "Datasets": "Gene Info",
        "Attribute": "Chromosomal Location",
        "Source": "NCBI Gene Database"
    },
    {
        "Datasets": "Gene Info",
        "Attribute": "Other Designations",
        "Source": "NCBI Gene Database"
    },
    {
        "Datasets": "Gene Info",
        "Attribute": "Identifiers in Other DB",
        "Source": "NCBI Gene Database"
    },
    {
        "Datasets": "Transcript",
        "Attribute": "Transcript ID",
        "Source": "Ensembl Database"
    },
    {
        "Datasets": "Transcript",
        "Attribute": "Name",
        "Source": "Ensembl Database"
    },
    {
        "Datasets": "Transcript",
        "Attribute": "Length",
        "Source": "Ensembl Database"
    },
    {
        "Datasets": "Transcript",
        "Attribute": "Type",
        "Source": "Ensembl Database"
    },
    {
        "Datasets": "Transcript",
        "Attribute": "Transcription Start Sites (TSS)",
        "Source": "Ensembl Database"
    },
    {
        "Datasets": "Transcript",
        "Attribute": "Refseq mRNA ID",
        "Source": "Ensembl Database"
    },
    {
        "Datasets": "Transcript",
        "Attribute": "Refseq ncRNA ID",
        "Source": "Ensembl Database"
    },
    {
        "Datasets": "Transcript",
        "Attribute": "Version",
        "Source": "Ensembl Database"
    },
    {
        "Datasets": "Transcript",
        "Attribute": "Start - End",
        "Source": "Ensembl Database"
    },
    {
        "Datasets": "Transcript",
        "Attribute": "Count",
        "Source": "Ensembl Database"
    },
    {
        "Datasets": "Transcript",
        "Attribute": "Transcript Support Level (TSL)",
        "Source": "Ensembl Database"
    },
]
const columns =[
    {
        title: 'Datasets',
        dataIndex: 'Datasets',
        key: 'Datasets',
        width: '4%',
        align:"center",
        render: text => { return <b>{text}</b> },
        onCell: (_,index)=>{
            if (index === 0) return { rowSpan: 13 }
            else if (index === 13 )return { rowSpan: 11}
            else return { rowSpan: 0 }
        }
    },
    {
        title: 'Attribute',
        dataIndex: 'Attribute',
        key: 'Attribute',
        width:'10%',
        onCell: ()=>{ return { rowSpan: 1} }
    },
    {
        title: 'Source',
        dataIndex: 'Source',
        key: 'Source',
        width:'10%',
        onCell: ()=>{ return { rowSpan: 1} }
    }
]

export default function GeneAttributionsSourceTable(){
    return(
        <Collapse defaultActiveKey={['1']} bordered={false} style={{width:"80%", margin:"10px 100px"}} >
            <Panel key={1} header={<b>Datasets Attribution and Source (click to hide or show this panel)</b>}>
                <Table dataSource={
                    data.map( item => {
                        return { key:item.Attribute,...item}
                    })
                } columns={columns} size={"small"} bordered={true} pagination={false}/>
            </Panel>
        </Collapse>
    )
}