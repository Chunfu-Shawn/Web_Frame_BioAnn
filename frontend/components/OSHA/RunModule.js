import {Button, Checkbox, Form, Input, message, Select, Space} from "antd";
import SiRNAFileUpload from "./SiRNAFileUpload";
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
    const [DNA2RNA, setDNA2RNA] = useState(true);
    const [maxMismatch, setMaxMismatch] = useState('1nt');
    const [uploading, setUploading] = useState(false);


    const router = useRouter()
    const [form] = Form.useForm();
    const onChangeDNA2RNA = (e) => {
        setDNA2RNA(e.target.checked);
    }
    const onChangeMaxMismatch = (value) => {
        setMaxMismatch(value);
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

            <SiRNAFileUpload setFileList={setSiRNAFileList}
                             fileList={siRNAFileList}
                             uploading={uploading}
            />

            <Form.Item name="title" label="长序列fasta序列"
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
                          placeholder="粘贴长核酸序列到此处"/>
            </Form.Item>

            <Form.Item label="选项" valuePropName="checked">
                <Space size={"large"}>
                    <Checkbox
                        checked={DNA2RNA}
                        onChange={onChangeDNA2RNA}
                    >
                        DNA -&gt; RNA
                    </Checkbox>
                    Max mismatch:
                    <Select
                        style={{
                            width: "80px",
                        }}
                        value={maxMismatch}
                        onChange={onChangeMaxMismatch}
                    >
                        {['1 nt','2 nt','3 nt'].map((option) => (
                            <Option key={option}>{option}</Option>
                        ))}
                    </Select>
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