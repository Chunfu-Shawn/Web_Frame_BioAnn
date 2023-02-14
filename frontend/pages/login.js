import {Button, Form, Input, message, Space} from 'antd';
import React, {useState} from "react";
import {useRouter} from "next/router";
import {LockOutlined, UserOutlined} from "@ant-design/icons";

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
    string: {
        max: "'${name}' cannot be longer than ${max} characters",
    }
};

export default function Login() {
    const router = useRouter()
    const [form] = Form.useForm();
    const [logging, setLogging] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const url = '/login/validate'

    const onLogIn = () => {
        setLogging(true)
        fetch(url,{
            method: 'POST',
            headers: {'Content-Type':'multipart/form-data'},
            body: form,
        }).then(response => response.json())
            .then(json => {
                router.push('/')
            })
            .catch(() => {
                message.error({
                        content: 'Username or password wrong! Contact the administrator please!',
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
        router.push('/')
    }
    const onReset = () => {
        form.resetFields();
        setUsername('');
        setPassword('');
    };
    const layout = {
        labelAlign: "left",
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 18,
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
                    <h1> Log in for services</h1>
                </div>
                <Form
                    {...layout}
                    style={{
                        maxWidth: 400,
                        margin:"auto"
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    form={form}
                    name="control-hooks"
                    onFinish={onLogIn}
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
                        rules={[
                            {
                                required: true,
                                max: 50,
                            },
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
                                Log in
                            </Button>
                            <Button onClick={onReset}>
                                Reset
                            </Button>
                            <Button onClick={onHandleBackHome} type={"link"}>
                                Back home
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
    )
}