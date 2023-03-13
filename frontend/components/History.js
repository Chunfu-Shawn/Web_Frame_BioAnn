import {Card, Table} from "antd";
import {useState} from "react";

export default function History(props){
    const [sortedInfo, setSortedInfo] = useState({});
    const columns = [
        {
            title: 'Job ID',
            dataIndex: 'st_id',
            key: 'st_id',
            width:'22%',
            render: text => <a href={'dataPage/'+text}>{text}</a>,
            sorter: (a, b) => {
                if(a.st_id > b.st_id) return 1
                else return -1
            },
            sortOrder: sortedInfo.columnKey === 'st_id' ? sortedInfo.order : null,
            ellipsis: true,
            //...getColumnSearchProps('st_id')
        },
        {
            title: 'Method',
            dataIndex: 'method',
            key: 'method',
            width:'10%',
            sorter: (a, b) => {
                if(a.method > b.method) return 1
                else return -1
            },
            sortOrder: sortedInfo.columnKey === 'method' ? sortedInfo.order : null,
        },
        {
            title: 'Species',
            dataIndex: 'species',
            key: 'species',
            sorter: (a, b) => {
                if(a.species > b.species) return 1
                else return -1
            },
            sortOrder: sortedInfo.columnKey === 'species' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Strain',
            dataIndex: 'strain',
            key: 'strain',
            width:'8%',
            render: (strain) => ( strain !== "null" ?
                    <Tooltip placement="topLeft" title={strain}>
                        {strain}
                    </Tooltip>
                    : '--'
            ),
            sorter: (a, b) => {
                if(a.strain > b.strain) return 1
                else return -1
            },
            sortOrder: sortedInfo.columnKey === 'strain' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Organ',
            dataIndex: 'organ',
            key: 'organ',
            width:'9%',
            render: (organ) => (
                <Tooltip placement="topLeft" title={organ}>
                    {organ}
                </Tooltip>
            ),
            sorter: (a, b) => {
                if(a.organ > b.organ) return 1
                else return -1
            },
            sortOrder: sortedInfo.columnKey === 'organ' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Pathological',
            dataIndex: 'pathological',
            key: 'pathological',
            width:'11%',
            ellipsis: true,
        },
        {
            title: 'Date Published',
            dataIndex: 'date_published',
            key: 'date_published',
            sorter: (a, b) => Date.parse(a.date_published) - Date.parse(b.date_published),
            sortOrder: sortedInfo.columnKey === 'date_published' ? sortedInfo.order : null,
            ellipsis: true,
        },
    ];

    return(
        <div style={{marginTop:30}}>
            <h3>History</h3>
            <Card style={{padding: 10, textAlign:"left"}}>
                <Table
                    bordered
                    columns={columns}
                />
            </Card>
        </div>

    )
}