import {Layout, Menu} from 'antd';
import React, {useState,useEffect} from "react";
const { Sider } = Layout;

export function SiderMenu(props){
    const [activeNav,setActiveNav] = useState([props.defaultAcitiveNav]);//与标识导航栏高亮
    const onClick = (e)=>{
        setTimeout(()=>setActiveNav(e.key),900)
    }
    const scrollEventListener = () => {
        //判断页面是否有divContent.current
        if(props.divContent.current !== null) {
            //获取导航栏显示内容区域信息
            let nav_contentReact = props.divContent.current.getBoundingClientRect();
            //获取导航栏显示内容区域直接子元素
            let groupList = Array.from(props.divContent.current.children);
            if (nav_contentReact) {
                groupList.forEach(item => {
                    let itemReact = item.getBoundingClientRect();
                    if (itemReact.y <= 300 && (itemReact.y + itemReact.height) > 300) {
                        //当该子元素距离顶部小于等于300时，说明此时导航栏应该高亮，
                        //同时在其高度范围内均应高亮。
                        if (item.getAttribute("name")) {
                            setActiveNav([item.getAttribute("name")])
                        }
                    }
                })
            }
        }
    }

    useEffect(()=>{
        document.addEventListener('scroll', ()=>scrollEventListener())
        return ()=> {
            document.removeEventListener('scroll', ()=>scrollEventListener())
        }
    },[])

    return(
        <Sider
            width={props.width?props.width:200}
            style={
                {
                    backgroundColor:"transparent",
                    height: '100vh',
                    zIndex: 105,
                }
            }
        >
            <Menu
                defaultOpenKeys={props.openKeys}
                selectedKeys={activeNav}
                onClick={onClick}
                mode="inline"
                items={props.items}
            />
        </Sider>
    )
}