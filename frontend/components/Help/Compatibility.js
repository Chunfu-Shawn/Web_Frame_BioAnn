import {Breadcrumb, Table, Typography} from 'antd';
import {CheckSquareTwoTone, CheckSquareFilled} from "@ant-design/icons";
import React from 'react';
import {contentStyle} from "./SiderStaticMenu.js";
const { Title } = Typography;

const data = [
    {
        "OS": "Linux",
        "Version": "Ubuntu 20.04.4 LTS",
        "Chrome": <span><CheckSquareFilled style={{color:"#52c41a"}}/> 103.0.5060.134</span>,
        "Edge": "n/a",
        "Firefox": <span><CheckSquareFilled style={{color:"#52c41a"}}/> 108.0</span>,
        "Safari": "n/a"
    },
    {
        "OS": "MacOS",
        "Version": "macOS 12.3.1",
        "Chrome": <span><CheckSquareFilled style={{color:"#52c41a"}}/> 108.0.5359.124</span>,
        "Edge": "n/a",
        "Firefox": <span><CheckSquareFilled style={{color:"#52c41a"}}/> 102.6.0esr</span>,
        "Safari": <span><CheckSquareFilled style={{color:"#52c41a"}}/> 15.4</span>
    },
    {
        "OS": "Windows",
        "Version": "10",
        "Chrome": <span><CheckSquareFilled style={{color:"#52c41a"}}/> 104.0.5112.81</span>,
        "Edge": <span><CheckSquareFilled style={{color:"#52c41a"}}/> 108.0.1462.54</span>,
        "Firefox": <span><CheckSquareFilled style={{color:"#52c41a"}}/> 108.0</span>,
        "Safari": "n/a"
    }
]
const columns =[
    {
        title: 'OS',
        dataIndex: 'OS',
        key: 'OS',
        width:'16%',
    },
    {
        title: 'Version',
        dataIndex: 'Version',
        key: 'Version',
        width:'16%',
    },
    {
        title: 'Chrome',
        dataIndex: 'Chrome',
        key: 'Chrome',
        width:'16%',
    },
    {
        title: 'Edge',
        dataIndex: 'Edge',
        key: 'Edge',
        width:'16%',
    },
    {
        title: 'Firefox',
        dataIndex: 'Firefox',
        key: 'Firefox',
        width:'16%',
    },
    {
        title: 'Safari',
        dataIndex: 'Safari',
        key: 'Safari',
        width:'16%',
    }
]

export default function HelpCompatibility() {

    return (
        <div className="modal-body-stw" style={contentStyle}>
            <Breadcrumb>
                <Breadcrumb.Item>Help</Breadcrumb.Item>
                <Breadcrumb.Item>Browser Compatibility</Breadcrumb.Item>
            </Breadcrumb><br/>
            <Typography>
                <Title>Browser Compatibility</Title><br/>
                <Table dataSource={
                    data.map( item => {
                        return { key:item.OS,...item}
                    })
                } columns={columns} size={"large"} bordered={true} pagination={false}/>
            </Typography>
        </div>
    )
}