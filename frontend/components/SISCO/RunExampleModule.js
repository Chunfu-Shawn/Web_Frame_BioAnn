import {Button, Dropdown, message} from "antd";
import {throttle} from "../util";
import {useRouter} from "next/router";

export default function RunExampleModule(props){
    const { setUploading } = props
    const DEMO_URL = `/osha/demo/`
    const router = useRouter()
    const onRunExample = (title) => function (){
        let rid = ""
        setUploading(true);
        fetch(DEMO_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json', 'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title:title,
                isDemo:'true',
                type: "scRNA-seq",
            })
        }).then(response => response.json())
            .then(json => rid = json.rid)
            .then(() => {
                message.success({
                    content:'Run example successfully!',
                    style:{
                        marginTop: '12vh',
                    },
                });
                //nextjs路由跳转到结果页面
                router.push('/mapping/resultPage/'+rid)
            })
            .catch(() => {
                message.error({
                        content:'Run example unsuccessfully.',
                        style:{
                            marginTop: '12vh',
                        },
                        duration:3,
                    }
                );
                //router.reload()
            })
            .finally(() => {
                setUploading(false);
            });
    };
    const items=[
        {
            key: '1',
            label: (
                <Button type={"link"}>
                    <a href={"/mapping/resultPage/52fa0100-909b-11ed-9249-979b422f6c75"}>
                        <span>
                            Mouse fetal brain <b><i>(FINISHED)</i></b>
                        </span>
                    </a>
                </Button>
            ),
        },
        /*{
            key: '2',
            label: (
                <Button type={"link"}>
                    <a href={"/mapping/resultPage/1fdb50c0-726a-11ed-a8ae-05b48e1b9d52"}>
                        <span>
                            Mouse organogenesis <b><i>(FINISHED)</i></b>
                        </span>
                    </a>
                </Button>
            ),
        },*/
        {
            key: '3',
            label: (
                <Button type={"link"}>
                    <a href={"/mapping/resultPage/b3ae1730-90b3-11ed-9695-b54d6690f34b"}>
                        <span>
                            Human Squamous Cell Carcinoma <b><i>(FINISHED)</i></b>
                        </span>
                    </a>
                </Button>
            ),
        },
        {
            key: '4',
            label: (
                <Button type={"link"} onClick={throttle(1000,onRunExample("Mouse fetal brain spatial cellular map"))}>
                    <span>
                        Mouse fetal brain <b><i>(FROM SCRATCH)</i></b>
                    </span>
                </Button>
            ),
        },
        {
            key: '6',
            label: (
                <Button type={"link"} onClick={throttle(2000,onRunExample("Spatial patterning of human cutaneous squamous cell carcinoma"))}>
                    <span>
                        Human Squamous Cell Carcinoma <b><i>(FROM SCRATCH)</i></b>
                    </span>
                </Button>
            ),
        },
    ]

    return(
        <Dropdown
            menu={{ items, }}
            trigger={['click']}
        >
            <Button htmlType="button">
                Run Example
            </Button>
        </Dropdown>
    )
}