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
    const [matrixFileList, setMatrixFileList] = useState([]);
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
        matrixFileList.forEach((file) => {
            file.percent = 0
            file.status = 'uploading'
            setMatrixFileList([file])
            formData.append('matrixFile', file);
        });
        labelsFileList.forEach((file) => {
            file.percent = 0
            file.status = 'uploading'
            setLabelsFileList([file])
            formData.append('labelsFile', file);
        });
        formData.append('title', form.getFieldValue('title'))
        formData.append('emailAddress', form.getFieldValue('emailAddress'))
        formData.append('species', species)
        formData.append('organ', organ)
        formData.append('tissue', tissue)
        formData.append('type', "scRNA-seq")
        formData.append('isDemo', "false")
        setUploading(true);
        // You can use any AJAX library you like
        axios({
            method: 'post',
            url: UPLOAD_URL,
            data: formData,
            onUploadProgress: progressEvent => {
                matrixFileList.forEach((file) => {
                    file.percent = (progressEvent.loaded / progressEvent.total * 100 | 0);
                    setMatrixFileList([file])
                })
                labelsFileList.forEach((file) => {
                    file.percent = (progressEvent.loaded / progressEvent.total * 380 | 0);
                    setLabelsFileList([file])
                });
            },
        }).then(response => response.data)
            .then(json => json.rid)
            .then(rid => {
                matrixFileList.forEach((file) => {
                    file.status = 'done'
                    setMatrixFileList([file])
                });
                labelsFileList.forEach((file) => {
                    file.status = 'done'
                    setLabelsFileList([file])
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
                matrixFileList.forEach((file) => {
                    file.status = 'error'
                    setMatrixFileList([file])
                });
                labelsFileList.forEach((file) => {
                    file.status = 'error'
                    setLabelsFileList([file])
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
            span: 8,
        },
        wrapperCol: {
            span: 16,
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
        setMatrixFileList([]);
        setLabelsFileList([]);
    };

    return (
        <Form {...layout} layout={'horizontal'} form={form}
              onFinish={throttle(1000, handleUpload)}
              name="control-hooks"
              validateMessages={validateMessages}
              style={{width: 800}}>

            <SiRNAFileUpload setFileList={setMatrixFileList}
                             fileList={matrixFileList}
                             uploading={uploading}
            />

            <Form.Item name="title" label="Nucleotide sequence"
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
                          placeholder="Copy nucleotide sequence here"/>
            </Form.Item>

            <Form.Item label="Options" valuePropName="checked">
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
                    matrixFileList.length === 0 ||
                    labelsFileList.length === 0
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