import {Button, Checkbox, Col, Form, Input, InputNumber, message, Row, Select, Space} from "antd";
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
    const [overhang, setOverhang] = useState("SS 3'");
    const [end, setEnd] = useState("NN");
    const [uploading, setUploading] = useState(false);


    const router = useRouter()
    const [form] = Form.useForm();

    const onChangeOverhang = (value) => {
        setOverhang(value);
    }
    const onChangeEnd = (value) => {
        setEnd(value);
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

            <Form.Item name="title" label="fasta序列"
                       rules={[
                           {
                               required: true,
                               max: 80,
                           },
                       ]}
            >
                <TextArea rows={6}
                          autoSize={{
                              minRows: 4,
                              maxRows: 6,
                          }}
                          placeholder="粘贴oligo序列到此处"/>
            </Form.Item>

            <Form.Item label="选项" valuePropName="checked">
                <Row>
                    <Space size={20}>
                        <span>Length ( SS / AS ):</span>
                        <Space size={10}>
                            <InputNumber
                                size="small"
                                style={{
                                width: 40,
                            }}
                                controls={false}
                                precision={0}
                                min={1} max={22} defaultValue={19} />/
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
                    </Space>
                </Row><br/>
                <Row style={{height:80}}>
                    <Space size={50}>
                        <Col>
                            <span>Overhang: </span>
                            <Select
                                style={{
                                    width: "80px",
                                }}
                                value={overhang}
                                onChange={onChangeOverhang}
                            >
                                {["SS 3'","AS 3'","Both"].map((option) => (
                                    <Option key={option}>{option}</Option>
                                ))}
                            </Select>
                        </Col>
                        <Col>
                            <Row style={{height:40}}>
                                <Space>
                                    <span>SS 3'</span>
                                    <InputNumber
                                        size="small"
                                        style={{
                                            width: 40,
                                        }}
                                        controls={false}
                                        precision={0}
                                        min={1} max={22} defaultValue={19}
                                    />
                                </Space>
                            </Row>
                            <Row>
                                <Space>
                                    <span>SS 3'</span>
                                    <InputNumber
                                        size="small"
                                        style={{
                                            width: 40,
                                        }}
                                        controls={false}
                                        precision={0}
                                        min={1} max={22} defaultValue={19}
                                    />
                                </Space>
                            </Row>
                        </Col>
                        <Col>
                            <span>End with: </span>
                            <Select
                                style={{
                                    width: "80px",
                                }}
                                value={end}
                                onChange={onChangeEnd}
                            >
                                {["NN","UU","TT"].map((option) => (
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