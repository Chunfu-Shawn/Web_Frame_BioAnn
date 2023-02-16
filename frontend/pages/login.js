import {Button, Form, Input, message, Space} from 'antd';
import React, {useState} from "react";
import {useRouter} from "next/router";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import createHash from 'create-hash'

export const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}!',
    },
    string: {
        max: "'${name}' cannot be longer than ${max} characters!",
    }
};

export default function Login() {
    const router = useRouter()
    const [form] = Form.useForm();
    const [logging, setLogging] = useState(false);
    const url = '/login/validate'

    const onLogIn = (formValues) => {
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
                        content: json.user+", welcome back!",
                        style: {
                            marginTop: '10vh',
                        },
                        duration: 3,
                    }
                );
                setLogging(false);
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
                                min: 6,
                                max: 30,
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