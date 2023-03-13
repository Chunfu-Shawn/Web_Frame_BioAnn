import {Checkbox, Col, Divider, Form, Input, InputNumber, message, Radio, Row, Select, Space} from "antd";
import {useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
const { TextArea } = Input;
const { Option } = Select;

const optionNameStyle = {
    color:"black",
    fontWeight:"bolder"
}

const optionDividerStyle = {
    margin:"10px 0",
    borderTopColor:"black"
}

const optionTipStyle = {
    marginLeft:25,
    color:"gray",
}

export default function RunModule(props) {
    const UPLOAD_URL = `/milos/run/`
    const [siRNAFileList, setSiRNAFileList] = useState([]);
    const [targetRegion, setTargetRegion] = useState("5'-UTR");
    const [SSResults, setSSResults] = useState(true);
    const [seedRegion, setSeedRegion] = useState('1-9');
    const [maxMismatch, setMaxMismatch] = useState('none');
    const [uploading, setUploading] = useState(false);
    const router = useRouter()
    const [form] = Form.useForm();

    const onChangeTargetRegion = (e) => {
        setTargetRegion(e.target.checked);
        setTimeout(()=>console.log(targetRegion),100)
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
        <div style={{textAlign:"left"}}>
            <Row gutter={50}>
                <Col span={12}>
                    <Space
                        direction="vertical"
                        style={{width:"100%"}}
                    >
                        <h3>Enter an accession number and retrieve sequence</h3>
                        <Input placeholder="accession number" />
                        <p><b>Or</b> input your sequence</p>
                        <TextArea rows={8}
                                  autoSize={{
                                      minRows: 8,
                                      maxRows: 16,
                                  }}
                                  placeholder="your sequence"
                        />
                    </Space>
                </Col>
                <Col span={12}>
                    <h3>Options: (to configure your design rule!)</h3>
                    <Space
                        direction="vertical"
                        style={{width:"100%"}}
                    >
                        <span>Use Function Rule of Ui-Tei</span>
                        <Divider style={optionDividerStyle}/>
                        <span style={optionNameStyle}>Target Region Selection</span>
                        <Row>
                            <Checkbox
                                checked={targetRegion}
                                onChange={onChangeTargetRegion}
                            >
                                5'-UTR
                            </Checkbox>
                            <Checkbox
                                checked={SSResults}
                                onChange={onChangeSSResults}
                            >
                                Open Reading Frame
                            </Checkbox>
                            <Checkbox
                                checked={SSResults}
                                onChange={onChangeSSResults}
                            >
                                3'-UTR
                            </Checkbox>
                        </Row>
                        <Divider style={optionDividerStyle}/>
                        <span style={optionNameStyle}>Function Rules</span>
                        <Row>
                            <Checkbox
                                checked={SSResults}
                                onChange={onChangeSSResults}
                            >
                                The maximum length of invertRepeat:
                            </Checkbox>
                            <InputNumber
                                size="small"
                                style={{
                                    width: 50,
                                }}
                                controls={false}
                                precision={0}
                                min={1} max={22}
                                defaultValue={4} />
                        </Row>
                        <Row>
                            <Checkbox
                                checked={SSResults}
                                onChange={onChangeSSResults}
                            >
                                The maximum length of A/T/C/G invertRepeat (example AAAAA):
                            </Checkbox>
                            <InputNumber
                                size="small"
                                style={{
                                    width: 50,
                                }}
                                controls={false}
                                precision={0}
                                min={1} max={22}
                                defaultValue={4} />
                        </Row>
                        <Row>
                            <Checkbox
                                checked={SSResults}
                                onChange={onChangeSSResults}
                            >
                                The maximum length of GC stretch:
                            </Checkbox>
                            <InputNumber
                                size="small"
                                style={{
                                    width: 50,
                                }}
                                controls={false}
                                precision={0}
                                min={1} max={22}
                                defaultValue={7} />
                        </Row>
                        <Row>
                            <Checkbox
                                checked={SSResults}
                                onChange={onChangeSSResults}
                            >
                                Minimum G/C percentage:
                            </Checkbox>
                            <InputNumber
                                size="small"
                                style={{
                                    width: 80,
                                }}
                                addonAfter={"%"}
                                controls={false}
                                precision={0}
                                min={1} max={22}
                                defaultValue={7} />
                        </Row>
                        <Row>
                            <span style={{marginLeft:25}}>Maximum G/C percentage:&nbsp;&nbsp;</span>
                            <InputNumber
                                size="small"
                                style={{
                                    width: 80,
                                }}
                                addonAfter={"%"}
                                controls={false}
                                precision={0}
                                min={1} max={22}
                                defaultValue={7} />
                        </Row>
                        <Checkbox
                            checked={SSResults}
                            onChange={onChangeSSResults}
                        >
                            AU at 13-19 &ge; 5 OR AU at 15-19 &ge; 3
                        </Checkbox>
                        <Checkbox
                            checked={SSResults}
                            onChange={onChangeSSResults}
                        >
                            Nucleotide at 1 is G/C
                        </Checkbox>
                        <Checkbox
                            checked={SSResults}
                            onChange={onChangeSSResults}
                        >
                            Nucleotide at 19 is A/T
                        </Checkbox>
                        <Checkbox
                            checked={SSResults}
                            onChange={onChangeSSResults}
                        >
                            Nucleotide at 13 is G
                        </Checkbox>
                        <Divider style={optionDividerStyle}/>
                        <span style={optionNameStyle}>Minimization of seed-dependent off-target effects</span>
                        <Row>
                            <Checkbox
                                checked={SSResults}
                                onChange={onChangeSSResults}
                            >
                                Seed-duplex stability: Max Tm
                            </Checkbox>
                            <InputNumber
                                size="small"
                                style={{
                                    width: 80,
                                }}
                                addonAfter={"℃"}
                                controls={false}
                                precision={1}
                                min={1} max={100}
                                defaultValue={21.5} />
                        </Row>
                        <span style={optionTipStyle}>(for reducing seed-dependent off-target effects)</span>
                        <span style={optionTipStyle}><i>Ui-Tei et al., Nucleic Acids Res 36, 7100-7109 (2008)</i> Link</span>
                        <Divider style={optionDividerStyle}/>
                        <span style={optionNameStyle}>Specificity check</span>
                    </Space>
                </Col>
            </Row>
        </div>
    )
}