import {Table} from "antd";
import React from "react";
const data = [
    {
        "Attribute": "ID",
        "Description": "assigned unique ID for each dataset in this website"
    },
    {
        "Attribute": "Method",
        "Description": "the spatial transcriptome sequencing method for each dataset"
    },
    {
        "Attribute": "Date Published",
        "Description": "date when the data was published"
    },
    {
        "Attribute": "Species",
        "Description": "species where the dataset was captured"
    },
    {
        "Attribute": "Strain",
        "Description": 'strain of a species'
    },
    {
        "Attribute": "Organ",
        "Description": "organ where the sample was captured"
    },
    {
        "Attribute": "Tissue",
        "Description": "tissue where the sample was captured"
    },
    {
        "Attribute": "Pathological",
        "Description": "true / false meaning whether the sample was pathological"
    },
    {
        "Attribute": "Developmental Stage",
        "Description": "developmental stage when the donor was"
    },
    {
        "Attribute": "Number of Section",
        "Description": "the number of technologically sections in each dataset"
    },
    {
        "Attribute": "Section ID",
        "Description": "name of sections in this dataset"
    },
    {
        "Attribute": "Title",
        "Description": "title of the article where the dataset was published"
    },
    {
        "Attribute": "Journal",
        "Description": "journal name of the article where the dataset was published"
    },
    {
        "Attribute": "PMID",
        "Description": "PMID (pubmed id) of the article where the dataset was published"
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

export default function DatasetAttributesTable(){
    return(
        <div style={{marginLeft:100,width:800}}>
            <Table dataSource={
                data.map( item => {
                    return { key:item.Attribute,...item}
                })
            } columns={columns} size={"small"} bordered={true} pagination={false}/>
        </div>
    )
}