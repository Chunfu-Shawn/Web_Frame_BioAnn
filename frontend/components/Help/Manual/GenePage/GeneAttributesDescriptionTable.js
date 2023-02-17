import {Table} from "antd";
import React from "react";
const data = [
    {
        "Attribute": "Symbol",
        "Description": "official short-form abbreviation for a particular gene"
    },
    {
        "Attribute": "Entrez ID",
        "Description": "identifier for a gene from the NCBI Entrez database"
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
        "Attribute": "Gene Synonyms",
        "Description": "a comma-delimited set of unofficial symbols and descriptions that have been used for this gene integrated from NCBI Entrez Database"
    },
    {
        "Attribute": "Other Designations",
        "Description": "semicolon-delimited set of some alternate descriptions that have been assigned to a GeneID. '-' indicates none is being reported."
    },
    {
        "Attribute": "Identifiers in Other DB",
        "Description": <span>comma-delimited set of identifiers in other databases for this gene.
            The unit of the set is database:value. Note that HGNC and MGI include &apos;HGNC&apos; and &apos;MGI&apos;, respectively, in the value part of their identifier.
            Consequently, this attribution for these databases will appear like: <b>HGNC:HGNC:1100</b>, this would be interpreted as database=&apos;HGNC&apos;, value=&apos;HGNC:1100&apos;.
            Example for MGI: <b>MGI:MGI:104537</b>. This would be interpreted as database=&apos;MGI&apos;, value=&apos;MGI:104537&apos;.</span>
    },
    {
        "Attribute": "Location",
        "Description": "chromosome and coordinate where a gene locates, which is 0-based start"
    },
    {
        "Attribute": "Chromosome Location",
        "Description": "Cytogenetic location"
    },
    {
        "Attribute": "Gene Version",
        "Description": "gene version integrated from Ensembl Database"
    },
    {
        "Attribute": "Gene Source",
        "Description": "the annotation source for this gene integrated from Ensembl Database"
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

export default function GeneAttributesDescriptionTable(){
    return(
        <Table dataSource={
            data.map( item => {
                return { key:item.Attribute,...item}
            })
        } columns={columns} size={"small"} bordered={true} pagination={false}/>
    )
}