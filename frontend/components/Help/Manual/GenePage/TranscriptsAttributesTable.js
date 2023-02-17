import {Table} from "antd";
import React from "react";
const data = [
    {
        "Attribute": "Transcript ID",
        "Description": "a stable identifier for this transcript from Ensembl"
    },
    {
        "Attribute": "Name",
        "Description": "a name for this transcript from Ensembl"
    },
    {
        "Attribute": "Length",
        "Description": "length of this transcript (bp)"
    },
    {
        "Attribute": "Type",
        "Description": <span>a transcript classification containing <b>protein coding, lncRNA, processed pseudogene, unprocessed pseudogene,
        miRNA, TEC, snRNA, misc_RNA, snoRNA and so on</b>, which is integrated from Ensembl Database</span>
    },
    {
        
        "Attribute": "Transcription Start Sites (TSS)",
        "Description": "the transcription start sites of this transcript"
    },
    {
        "Attribute": "Refseq mRNA ID",
        "Description": "a corresponding ID of this mRNA from NCBI's Reference Sequences (RefSeq) database"
    },
    {
        "Attribute": "Refseq ncRNA ID",
        "Description": "a corresponding ID of this non-coding RNA from NCBI's Reference Sequences (RefSeq) database"
    },
    {
        "Attribute": "Version",
        "Description": "the version of this trancript from Ensembl"
    },
    {
        "Attribute": "Start - End",
        "Description": "the start and end coordinate of this trancript"
    },
    {
        "Attribute": "Count",
        "Description": "the expression count"
    },
    {
        "Attribute": "Transcript Support Level (TSL)",
        "Description": <span>The Transcript Support Level (TSL) is a method to highlight the well-supported and poorly-supported
            transcript models for users, based on the type and quality of the alignments used to annotate the transcript.
            <ul>
                <li><b>TSL 1</b>: A transcript where all splice junctions are supported by at least one non-suspect mRNA</li>
                <li><b>TSL 2</b>: A transcript where the best supporting mRNA is flagged as suspect or the support is from multiple ESTs</li>
                <li><b>TSL 3</b>: A transcript where the only support is from a single EST</li>
                <li><b>TSL 4</b>: A transcript where the best supporting EST is flagged as suspect</li>
                <li><b>TSL 5</b>: A transcript where no single transcript supports the model structure</li>
                <li><b>TSL NA</b>: A transcript that was not analysed for TSL</li>
            </ul>
        </span>
    },
]
const columns =[
    {
        title: 'Attribute',
        dataIndex: 'Attribute',
        key: 'Attribute',
        width:'6%',
    },
    {
        title: 'Description',
        dataIndex: 'Description',
        key: 'Description',
        width:'30%',
    }
]

export default function TranscriptsAttributesTable(){
    return(
        <Table dataSource={
            data.map( item => {
                return { key:item.Attribute,...item}
            })
        } columns={columns} size={"small"} bordered={true} pagination={false}/>
    )
}