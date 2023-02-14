import Head from 'next/head'
import LayoutCustom, { siteTitle } from '../components/LayoutCustom.js'
import Image from "next/image";
import { Avatar, List, Divider } from 'antd';
import React from "react";
import {MailFilled} from "@ant-design/icons";


export default function Contact() {
    const data = [
        {
            name: 'Xiangshang Li',
            avatar: <Avatar src={"images/contact/uplee.svg"} size="large" shape="square"/>,
            description: <a target="_blank"  href="mailto:uplee@pku.edu.cn" rel="noreferrer">
                uplee@pku.edu.cn
            </a>
        },
        {
            name: 'Chunfu Xiao',
            avatar: <Avatar src={"images/contact/chunfu.svg"} size="large" shape="square"/>,
            description: <>
                <a target="_blank"  href="mailto:xiaochunfu@stu.pku.edu.cn" rel="noreferrer">
                    xiaochunfu@stu.pku.edu.cn
                </a>; <a target="_blank"  href="https://github.com/Chunfu-Shawn" rel="noreferrer">
                    https://github.com/Chunfu-Shawn
                </a>
                </>
        },
        {
            name: 'Juntian Qi',
            avatar: <Avatar src={"images/contact/juntian.svg"} size="large" shape="square"/>,
            description: <a target="_blank"  href="mailto:juntian_qi@stu.pku.edu.cn" rel="noreferrer">
                juntian_qi@stu.pku.edu.cn
            </a>
        }
    ];

    return (
        <LayoutCustom>
            <Head>
                <title>{siteTitle+"| Contact"}</title>
            </Head>
            <div className="modal-body-stw">
                <header className="page-header">
                    <h1>About Us</h1>
                </header>
                <div className="box" style={{width:850,margin:"50px auto",textAlign:"left"}}>
                    <p style={{fontSize:16}}><b>Department: </b>Laboratory of Bioinformatics & Genomic Medicine, College of Future Technology, Peking University</p>
                    <p style={{fontSize:16}}><b>Address: </b>Room 315, Integrated Science Research Center No.2, Peking University, Beijing, China</p>
                    <p style={{fontSize:16}}><b>Research Fields: </b>Bioinformatics, Genomic Medicine, Comparative Genomics</p>
                </div>

                <Image src="/images/CY_Lab_2022.jpg" alt="CY's Lab"  width={900} height={500}/>

                <ul className="people" style={{fontSize:16}}>
                    <li><b>Students: </b>Qi Peng, Xiangshang Li, Jie Zhang, Mingjun Ji, Xiaoge Liu, Ting Li,</li>
                    <li>Chunfu Xiao, Jiaxin Wang, Juntian Qi, Xinwei Xu, Chunqiong Li, Shuhan Yang</li>
                    <li><b>Co-PI/Post-Doc Researchers: </b>Dr. Ni N. An, Dr. Wanqiu Ding</li>
                    <li><b>PI:</b> Chuan-Yun Li</li>
                </ul>

                <div className="box" style={{width:900,fontSize:16,margin:"60px auto"}}>
                    <p>Our team is dedicated to the interpretation of large-scale genomics data and the studies of
                        human-specific traits. We mainly focus on: i) the refinement of genome annotations, integration
                        of large-scale data and development of bioinformatics tools through meta analyses and functional
                        genomics analyses, facilitating better understanding of gene functions and regulations in
                        well-established knowledge contexts; ii) combining population genetics analyses (within-species)
                        and comparative genomics analyses (between-species), performing molecular evolution studies to
                        understand the primate-specific gene-behavior relationships, especially the molecular mechanism
                        driving human-specific evolution.
                    </p>
                </div>
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
                <Divider><h2>Feedback</h2></Divider>
                <h4>Please feel free to contact us with any questions or comments.</h4>
                <span style={{fontSize:16}}>
                    For bug reports, please email to <b>Chunfu Xiao</b>&nbsp;
                    <a target="_blank"  href="mailto:xiaochunfu@stu.pku.edu.cn" rel="noreferrer">
                        <MailFilled />
                    </a>.
                    <br/><br/>
                    For any suggestions or ideas, please email to the corresponding author:
                    <br/>
                    <b>Wanqiu Ding:&nbsp;&nbsp;
                        <a target="_blank"  href="mailto:dingwq@pku.edu.cn" rel="noreferrer">
                            <MailFilled /> dingwq@pku.edu.cn
                        </a>
                    </b>
                </span>
            </div>
        </LayoutCustom>
    )
}