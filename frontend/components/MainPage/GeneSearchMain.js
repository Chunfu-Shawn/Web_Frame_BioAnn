import {Input, Select} from "antd";
import {useState} from "react";
import {useRouter} from "next/router";
const { Search } = Input;
const { Option } = Select;

export default function GeneSearchMain(){

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
    return(
        <Input.Group className={"mainBrowser"} style={{margin:"20px 0px"}} compact>
            <Select defaultValue="All" style={{width:100}} size={"large"} onChange={onSpeciesChange}>
                <Option value="All">All</Option>
                <Option value="Human">Human</Option>
                <Option value="Mouse">Mouse</Option>
            </Select>
            <Select defaultValue="Symbol" style={{width:150}} size={"large"} onChange={onIDTypeChange}>
                <Option value="Symbol">Symbol</Option>
                <Option value="Ensembl">Ensembl ID</Option>
                <Option value="Entrez">Entrez ID</Option>
            </Select>
            <Search
                placeholder="Enter a gene of interest"
                id={"search"}
                allowClear
                onSearch={onSearch}
                size={"large"}
                style={{
                    width:450
                }}
                loading={searching}
            />
        </Input.Group>
    )
}