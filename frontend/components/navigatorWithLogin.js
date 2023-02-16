import Link from "next/link";
import {useEffect} from "react";
import {Button} from "antd";
import {useRouter} from "next/router";

export default function NavigatorWithLogin(){
    const router = useRouter()

    const onHandleLogin = ()=>{
        //nextjs路由跳转到结果页面
        router.push('/login')
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
        <nav id="topheader" className="navbar-inverse navbar-fixed-top">
            <div className="container">
                <div>
                    <Link href="/">
                        <a className="navbar-brand" >
                            <h4>WEB FRAME</h4>
                        </a>
                    </Link>
                </div>
                <ul className={"nav navbar-nav"} >
                    <li id="mapping" className="nav-item"><Link href="/mapping"><a className="nav-link" >Mapping</a></Link></li>
                    <li id="datasets" className="nav-item"><Link href="/datasets"><a className="nav-link" >Datasets</a></Link></li>
                    <li id="search" className="nav-item"><Link href="/search"><a className="nav-link" >Search</a></Link></li>
                    <li id="help" className="nav-item"><Link href="/help/manual/mapping"><a className="nav-link" >Help</a></Link></li>
                    <li id="about" className="nav-item"><Link href="/about"><a className="nav-link" >About</a></Link></li>
                    <li id="contact" className="nav-item"><Link href="/contact"><a className="nav-link" >Contact</a></Link></li>
                </ul>
                <div style={{float:"right",padding: '25px 15px'}}>
                    <Button onClick={onHandleLogin}>
                        Login
                    </Button>
                </div>
            </div>
        </nav>
    )
}