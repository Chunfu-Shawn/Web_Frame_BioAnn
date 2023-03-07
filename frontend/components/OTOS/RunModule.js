import {Button, Checkbox, Col, Form, Input, InputNumber, message, Radio, Row, Select, Space} from "antd";
import OligoSeqFileUpload from "./OligoSeqFileUpload";
import RunExampleModule from "./RunExampleModule";
import {throttle} from "../util";
import {useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
const { TextArea } = Input;
const { Option } = Select;


export default function RunModule(props) {
    const {
        validateMessages
    } = props
    const UPLOAD_URL = `/osha/run/`
    const [siRNAFileList, setSiRNAFileList] = useState([]);
    const [seqLength, setSeqLength] = useState(1);
    const [database, setDatabase] = useState("Homo sapiens");
    const [coding, setCoding] = useState(true);
    const [noncoding, setNoncoding] = useState(false);
    const [fullLength, setFullLength] = useState(true);
    const [onTargetGene, setOnTargetGene] = useState(true);
    const [uploading, setUploading] = useState(false);
    const router = useRouter()
    const [form] = Form.useForm();

    const onChangeDatabase = (value) => {
        setDatabase(value);
    }
    const onChangeCoding = (e) => {
        setCoding(e.target.checked);
    }
    const onChangeNoncoding = (e) => {
        setNoncoding(e.target.checked);
    }
    const onChangeSeqLength = (e) => {
        setSeqLength(e.target.value);
    }
    const onChangeFullLength = (e) => {
        setFullLength(e.target.checked);
    }
    const onChangeOnTargetGene = (e) => {
        setOnTargetGene(e.target.checked);
    }

    // 手动上传表单
    const handleUpload = () => {
        const formData = new FormData();
        siRNAFileList.forEach((file) => {
            file.percent = 0
            file.status = 'uploading'
            setSiRNAFileList([file])
            formData.append('siRNAFile', file);
        });
        formData.append('title', form.getFieldValue('title'))
        formData.append('emailAddress', form.getFieldValue('emailAddress'))
        formData.append('type', "scRNA-seq")
        formData.append('isDemo', "false")
        setUploading(true);
        // You can use any AJAX library you like
        axios({
            method: 'post',
            url: UPLOAD_URL,
            data: formData,
            onUploadProgress: progressEvent => {
                siRNAFileList.forEach((file) => {
                    file.percent = (progressEvent.loaded / progressEvent.total * 100 | 0);
                    setSiRNAFileList([file])
                })
            },
        }).then(response => response.data)
            .then(json => json.rid)
            .then(rid => {
                siRNAFileList.forEach((file) => {
                    file.status = 'done'
                    setSiRNAFileList([file])
                });
                message.success({
                    content: 'upload successfully!',
                    style: {
                        marginTop: '12vh',
                    },
                });
                //nextjs路由跳转到结果页面
                router.push('/mapping/resultPage/' + rid)
            })
            .catch(() => {
                siRNAFileList.forEach((file) => {
                    file.status = 'error'
                    setSiRNAFileList([file])
                });
                message.error({
                        content: 'upload unsuccessfully.',
                        style: {
                            marginTop: '12vh',
                        },
                        duration: 3,
                    }
                );
                setUploading(false);
                //router.reload()
            })
            .finally(() => {
                setUploading(false);
            });
    };

    const layout = {
        labelAlign: "left",
        labelCol: {
            span: 7,
        },
        wrapperCol: {
            span: 17,
        },
    };
    const tailLayout = {
        wrapperCol: {
            offset: 5,
            span: 19,
        },
    };
    const onReset = () => {
        form.resetFields();
        setSiRNAFileList([]);
    };

    return (
        <Form {...layout} layout={'horizontal'} form={form}
              onFinish={throttle(1000, handleUpload)}
              name="control-hooks"
              validateMessages={validateMessages}
              style={{width: 800}}>

            <OligoSeqFileUpload setFileList={setSiRNAFileList}
                                fileList={siRNAFileList}
                                uploading={uploading}
            />
            <Form.Item name="sequence length" label="比对序列长度">
                <Radio.Group onChange={onChangeSeqLength} value={seqLength}>
                    <Radio value={1}>全长</Radio>
                    <Radio value={2}>自定义起始</Radio>
                </Radio.Group>
                <Space size={5}>
                    <InputNumber
                        size="small"
                        style={{
                            width: 40,
                        }}
                        controls={false}
                        precision={0}
                        min={1} max={22} defaultValue={19}
                    />-
                    <InputNumber
                        size="small"
                        style={{
                            width: 40,
                        }}
                        controls={false}
                        precision={0}
                        min={1} max={22} defaultValue={21}
                    />
                </Space>
            </Form.Item>
            <Form.Item label="待比对的数据库名称">
                <Select
                    style={{
                        width: "500px",
                    }}
                    value={database}
                    onChange={onChangeDatabase}
                >
                    {["Homo sapiens","Mus musculus","Both"].map((option) => (
                        <Option key={option}>{option}</Option>
                    ))}
                </Select><br/><br/>
                <Checkbox
                    checked={coding}
                    onChange={onChangeCoding}
                >
                    编码转录本
                </Checkbox>
                <Checkbox
                    checked={noncoding}
                    onChange={onChangeNoncoding}
                >
                    非编码转录本
                </Checkbox>
            </Form.Item>
            <Form.Item name="fasta" label="筛选完全匹配序列的长度">
                <Space size={30}>
                    <InputNumber
                        size="small"
                        style={{
                            width: 100,
                        }}
                        controls={false}
                        precision={0}
                        min={1} max={22} defaultValue={19}
                        addonAfter="nt"
                    />
                    <Checkbox
                        checked={fullLength}
                        onChange={onChangeFullLength}
                    >
                        强制全长匹配
                    </Checkbox>
                    <Checkbox
                        checked={onTargetGene}
                        onChange={onChangeOnTargetGene}
                    >
                        on-target基因除外
                    </Checkbox>
                </Space>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" disabled={
                    siRNAFileList.length === 0
                }
                        loading={uploading} className={"btn-upload"}>
                    {uploading ? 'Start Running...' : 'Run'}
                </Button>
                <Button type="ghost" htmlType="button" onClick={onReset} className={"btn-upload"}>
                    Reset
                </Button>
                <RunExampleModule
                    setUploading={setUploading}
                />
            </Form.Item>
        </Form>
    )
}