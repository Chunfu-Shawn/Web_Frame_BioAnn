import Link from "next/link.js";
import {Layout, Menu} from 'antd';
import {CheckCircleOutlined, SettingOutlined, CompassOutlined} from "@ant-design/icons";
import React from "react";
const { Sider } = Layout;

const items = [
    {
        label: 'Manual', key: 'manual', icon: <CompassOutlined />,
        children: [
            { label: <Link href={'/help/manual/mapping'}><a>Spatial Mapping</a></Link>, key: 'manual_mapping'},
            { label: <Link href={'/help/manual/datasets'}><a>Dataset Browser</a></Link>, key: 'manual_datasets' },
            { label: <Link href={'/help/manual/search'}><a>Gene Search</a></Link>, key: 'manual_search'}
        ],
    },
    {
        label: <Link href={'/help/api'}><a>API</a></Link>, key: 'api', icon: <SettingOutlined />
    },
    {
        label: <Link href={'/help/compatibility'}><a>Compatibility</a></Link>, key: 'compatibility', icon: <CheckCircleOutlined />
    }
]

export const contentStyle = {
    width:"1100px",
    padding: '10% 2%',
    textAlign: 'left'
}

export function SiderStaticMenu(props){
    return(
        <Sider  style={{backgroundColor:"transparent"}}>
            <Menu
                mode="inline"
                defaultSelectedKeys={[props.selected]}
                defaultOpenKeys={props.opened}
                style={{ marginTop:60 }}
                items={ items }
            />
        </Sider>
    )
}