import Link from "next/link";
import {useContext, useEffect} from "react";
import {Button, Dropdown, message, Space} from "antd";
import {useRouter} from "next/router";
import {DownOutlined, UserOutlined, LogoutOutlined} from "@ant-design/icons";
import {Context} from "./LayoutCustom";

export default function Navigator(){
    const context = useContext(Context);
    const router = useRouter()

    const onHandleLogin = () => {
        router.push('/login')
    }

    const onHandleLogout = () => {
        fetch('/logout')
            .then(res => res.json())
            .then( json => {
                router.push('/').then(()=>router.reload())
            })
    }

    const onHandleManage = () => {
        //nextjs路由跳转到主页
        router.push('/manage')
    }

    const items = [
        {
            label: (
                <a onClick={onHandleLogout}>
                    Log out
                </a>
            ),
            key: '2',
            icon: <LogoutOutlined />,
            danger: true,
        },
    ];
    if (context.username === "admin"){
        items.unshift(
            {
                label: (
                    <a onClick={onHandleManage}>
                        Manage accounts
                    </a>
                ),
                key: '1',
                icon: <UserOutlined />,
            }
        )
    }

    const navAction = ()=>{
        let url = document.location;
        let navUl = document.querySelector("nav ul");
        let navUlChildren = navUl.children;
        for (let i = 0; i < navUlChildren.length; i++)
        {
            if(String(url).split('/')[3] === navUlChildren[i].id){
                navUlChildren[i].className = "active";
            }else
                delete navUlChildren[i].className;
        }
    }

    useEffect(()=>{
        navAction();
    },[navAction])


    return(
        <nav id="topheader" className="navbar-default navbar-fixed-top">
            <div className="container">
                <div>
                    <Link href="/">
                        <a className="navbar-brand" >
                            WEB FRAME
                        </a>
                    </Link>
                </div>
                <ul className={"nav navbar-nav"} >
                    {context.username ?
                        <>
                            <li id="osha" className="nav-item"><Link href="/osha"><a className="nav-link">OSHA</a></Link></li>
                            <li id="sisco" className="nav-item"><Link href="/sisco"><a className="nav-link">SISCO</a></Link></li>
                            <li id="otos" className="nav-item"><Link href="/otos"><a className="nav-link">OTOS</a></Link></li>
                            <li id="milos" className="nav-item"><Link href="/milos"><a className="nav-link">MILOS</a></Link></li>
                            <li id="sider" className="nav-item"><Link href="/sider"><a className="nav-link">SIDER</a></Link></li>
                        </>
                        :
                        <></>
                    }
                    <li id="help" className="nav-item"><Link href="/help/manual/mapping"><a className="nav-link" >Help</a></Link></li>
                    <li id="contact" className="nav-item"><Link href="/contact"><a className="nav-link" >Contact</a></Link></li>
                </ul>
                <div style={{float:"right",padding: '12px'}}>
                    {context.username ?
                        <Dropdown menu={{items}}>
                            <Button >
                                <Space>
                                    {context.username}
                                    <DownOutlined/>
                                </Space>
                            </Button>
                        </Dropdown>
                        :
                        <Button onClick={onHandleLogin} >
                            Login
                        </Button>
                    }
                </div>
            </div>
        </nav>
    )
}