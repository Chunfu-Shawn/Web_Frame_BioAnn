import Head from 'next/head'
import LayoutCustom, { siteTitle } from '../components/LayoutCustom.js'
import { Avatar, List, Divider } from 'antd';
import React from "react";
import {UserOutlined} from "@ant-design/icons";


export default function Contact() {
    const data = [
        {
            name: 'Xiangshang Li',
            avatar: <Avatar icon={<UserOutlined />} size="large" shape="square"/>,
            description: <a target="_blank"  href="mailto:uplee@pku.edu.cn" rel="noreferrer">
                uplee@pku.edu.cn
            </a>
        },
        {
            name: 'Chunfu Xiao',
            avatar: <Avatar icon={<UserOutlined />} size="large" shape="square"/>,
            description: <>
                <a target="_blank"  href="mailto:xiaochunfu@stu.pku.edu.cn" rel="noreferrer">
                    xiaochunfu@stu.pku.edu.cn
                </a>; <a target="_blank"  href="https://github.com/Chunfu-Shawn" rel="noreferrer">
                    https://github.com/Chunfu-Shawn
                </a>
                </>
        }
    ];

    return (
        <LayoutCustom>
            <Head>
                <title>{siteTitle+" - Contact"}</title>
            </Head>
            <div className="modal-body-stw">
                <header className="page-header">
                    <h1>Contact Us</h1>
                </header>
                <Divider><h2>Development Team</h2></Divider>
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    size={"large"}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar shape="square" size={"large"} src={item.avatar} />}
                                title={<b>{item.name}</b>}
                                description={item.description}
                            />
                        </List.Item>
                    )}
                    style={{width:700, textAlign:"left",margin:"auto",marginBottom:50}}
                />
            </div>
        </LayoutCustom>
    )
}