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
    const UPLOAD_URL = `/milos/run/`
    const [siRNAFileList, setSiRNAFileList] = useState([]);
    const [database, setDatabase] = useState("Homo sapiens");
    const [SSResults, setSSResults] = useState(true);
    const [seedRegion, setSeedRegion] = useState('1-9');
    const [maxMismatch, setMaxMismatch] = useState('none');
    const [uploading, setUploading] = useState(false);
    const router = useRouter()
    const [form] = Form.useForm();

    const onChangeDatabase = (value) => {
        setDatabase(value);
    }
    const onChangeSSResults = (e) => {
        setSSResults(e.target.checked);
    }
    const onChangeMaxMismatch = (e) => {
        setMaxMismatch(e.target.checked);
    }
    const onChangeSeedRegion = (e) => {
        setSeedRegion(e.target.value);
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


            <Form.Item label="数据库类型">
                <Select
                    style={{
                        width: "550px",
                    }}
                    value={database}
                    onChange={onChangeDatabase}
                >
                    {["Homo sapiens","Mus musculus","Rhesus"].map((option) => (
                        <Option key={option}>{option}</Option>
                    ))}
                </Select><br/><br/>
            </Form.Item>
            <OligoSeqFileUpload setFileList={setSiRNAFileList}
                                fileList={siRNAFileList}
                                uploading={uploading}
            />
            <Form.Item label="选项">
                <Row>
                    <Checkbox
                        checked={SSResults}
                        onChange={onChangeSSResults}
                    >
                        包含正义链匹配结果
                    </Checkbox>
                </Row>
                <Row style={{height:80}}>
                    <Space size={30}>
                        <Col>
                            种子区定义：
                            <Select
                                style={{
                                    width: "80px",
                                }}
                                value={seedRegion}
                                onChange={onChangeSeedRegion}
                            >
                                {["1-9","2-9","1-8","2-8","1-7","2-7"].map((option) => (
                                    <Option key={option}>{option}</Option>
                                ))}
                            </Select>
                        </Col>
                        <Col>
                            最大错配数：
                            <Select
                                style={{
                                    width: "80px",
                                }}
                                value={maxMismatch}
                                onChange={onChangeMaxMismatch}
                            >
                                {["none","1nt","2nt"].map((option) => (
                                    <Option key={option}>{option}</Option>
                                ))}
                            </Select>
                        </Col>
                    </Space>
                </Row>
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