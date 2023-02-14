import Head from 'next/head'
import LayoutCustom, { siteTitle } from '../components/LayoutCustom.js'
import {Input, message, Select, Space} from 'antd';
import Image from "next/image";
import {useRouter} from "next/router";
import {useState} from "react";
import Link from "next/link.js";
import {QuestionCircleOutlined} from "@ant-design/icons";
const { Search } = Input;
const { Option } = Select;

export default function SearchPage() {
    const [searching, setSearching] = useState(false);
    const [idType, setIdType] = useState('Symbol');
    const [species, setSpecies] = useState('All');
    const router = useRouter()
    const onIDTypeChange = (value) => {
        setIdType(value)
    }
    const onSpeciesChange = (value) => {
        setSpecies(value)
    }
    const onSearch = (value) => {
        if (value !== ''){
            setSearching(true)
            router.push({
                pathname: `/search/results`,
                query: {
                    idType: idType,
                    species: species,
                    geneName: value
                },
            })
            setSearching(false)
        }
    }
    return (
        <LayoutCustom>
            <Head>
                <title>{siteTitle+"| Gene Search"}</title>
            </Head>
            <div className="modal-body-stw" style={{height:"90vh"}}>
                <div style={
                    {
                        marginTop:120,
                        marginBottom:60,
                    }
                }>
                    <h1 style={{fontSize:54}}>Gene Search</h1>
                </div>
                <Input.Group compact>
                    <Select defaultValue="All" style={{width:'10%'}} size={"large"} onChange={onSpeciesChange}>
                        <Option value="All">All</Option>
                        <Option value="Human">Human</Option>
                        <Option value="Mouse">Mouse</Option>
                    </Select>
                    <Select defaultValue="Symbol" style={{width:'15%'}} size={"large"} onChange={onIDTypeChange}>
                        <Option value="Symbol">Symbol</Option>
                        <Option value="Ensembl">Ensembl ID</Option>
                        <Option value="Entrez">Entrez ID</Option>
                    </Select>
                    <Search
                        placeholder="input a gene of interest"
                        enterButton="Search"
                        id={"search"}
                        allowClear
                        onSearch={onSearch}
                        size={"large"}
                        style={{
                            width: "60%",
                            color: '#22075e',
                        }}
                        loading={searching}
                    />
                </Input.Group>
                <div style={{marginTop:50,fontSize:16}}>
                    <span>
                        e.g. <b><a href={"search/genePage/ENSG00000115738"}>ID2</a></b> or
                        <b><a href={"search/genePage/ENSMUSG00000041147"}> Brca2</a></b> or
                        <b><a href={"search/genePage/ENSG00000017427"}> ENSG00000017427 </a></b>
                        |<Link href={'/help/manual/search#search_rule'}>
                            <a target={'_blank'} rel={"noreferrer"}>
                                <b> HELP </b>
                                <QuestionCircleOutlined  style={{fontSize:"16px",color:"#2b1970"}}/>
                            </a>
                        </Link>
                    </span>
                </div>
            </div>
        </LayoutCustom>
    )
}