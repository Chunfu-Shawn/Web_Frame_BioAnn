import {Table} from "antd";
import React from "react";
const data = [
    {
        "Attribute": "Symbol",
        "Description": "official short-form abbreviation for a particular gene"
    },
    {
        "Attribute": "Ensembl ID",
        "Description": "identifier for a gene as per the Ensembl (European Bioinformatics Institute and the Wellcome Trust Sanger Institute) database"
    },
    {
        "Attribute": "Entrez ID",
        "Description": "identifier for a gene per the NCBI Entrez database"
    },
    {
        "Attribute": "Description",
        "Description": "a descriptive name for this gene, and those words inside the square brackets show the source of this attribution"
    },
    {
        "Attribute": "Gene Type",
        "Description": <span>a gene classification containing <b>protein coding, lncRNA, processed pseudogene, unprocessed pseudogene,
        miRNA, TEC, snRNA, misc_RNA, snoRNA and so on</b>, which integrated from Ensembl Database</span>
    },
    {
        "Attribute": "Organism",
        "Description": "organism from which a gene came, containing only two species: Homo sapiens and Mus musculus"
    },
    {
        "Attribute": "Aliases",
        "Description": "a comma-delimited set of unofficial symbols and descriptions that have been used for this gene integrated from NCBI Entrez Database"
    },
    {
        "Attribute": "Chromosome and Location",
        "Description": "chromosome and coordinate where a gene locates, which is 0-based start"
    },
    {
        "Attribute": "Strand",
        "Description": "positive strand or negative strand where a gene locates"
    },
    {
        "Attribute": "Gene Version",
        "Description": "gene version, which is integrated from Ensembl Database"
    },
]
const columns =[
    {
        title: 'Attribute',
        dataIndex: 'Attribute',
        key: 'Attribute',
        width: '6%',
    },
    {
        title: 'Description',
        dataIndex: 'Description',
        key: 'Description',
        width:'30%',
    }
]

export default function SearchResultsAttributesTable(){
    return(
        <Table dataSource={
            data.map( item => {
                return { key:item.Attribute,...item}
            })
        } columns={columns} size={"small"} bordered={true} pagination={false}/>
    )
}