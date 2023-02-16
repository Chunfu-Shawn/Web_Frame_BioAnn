import {Button, Form, Input, message, Space} from 'antd';
import React, {useState} from "react";
import {useRouter} from "next/router";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {validateMessages} from "./login";
import createHash from "create-hash";


export default function Register() {
    const router = useRouter()
    const [form] = Form.useForm();
    const [logging, setLogging] = useState(false);
    const url = '/register/validate'

    const handleRegister = (formValues) => {
        setLogging(true)
        let formJSON = JSON.parse(JSON.stringify(formValues))
        // hash 加密密码
        let hashPassword = createHash('sha224',) // 定义加密方法和密钥
            .update(formJSON.password) // 要编码的数据
            .digest('hex') // 定义编码类型，synchronously get result with optional encoding paramete
        fetch(url,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                username: formJSON.username,
                password: hashPassword
            }),
        }).then(response => response.json())
            .then(json => {
                message.info({
                        content: json.signal + " for " + json.user,
                        style: {
                            marginTop: '10vh',
                        },
                        duration: 3,
                    }
                );
                setLogging(false);
                router.push('/manage')
            })
            .catch(() => {
                message.error({
                        content: 'Username already exists! Enter again!',
                        style: {
                            marginTop: '2vh',
                        },
                        duration: 3,
                    }
                );
                setLogging(false);
            })
            .finally(() => {
                setLogging(false);
            });
    };

    const onHandleBackHome = () => {
        //nextjs路由跳转到结果页面
        router.push('/manage')
    }
    const onReset = () => {
        form.resetFields();
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
    return (
            <div className="modal-body-stw">
                <div className="inner cover" style={{width:1000}}>
                    <h1>Register a new user</h1>
                </div>
                <Form
                    {...layout}
                    style={{
                        maxWidth: 600,
                        margin:"auto"
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    form={form}
                    name="control-hooks"
                    onFinish={handleRegister}
                    validateMessages={validateMessages}
                    autoComplete="off"
                ><br/>
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                max: 20,
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username"/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                min: 6,
                                max: 30,
                            },
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password"/>
                    </Form.Item>

                    <Form.Item
                        label="Confirm Password"
                        name="confirmPassword"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                min: 6,
                                max: 30,
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password"/>
                    </Form.Item>

                    <Form.Item
                        {...tailLayout}
                    >
                        <Space>
                            <Button type="primary" htmlType="submit"
                                    className="login-form-button"
                                    loading={logging}
                            >
                                Register
                            </Button>
                            <Button onClick={onReset}>
                                Reset
                            </Button>
                            <Button onClick={onHandleBackHome} type={"link"}>
                                Back
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
    )
}