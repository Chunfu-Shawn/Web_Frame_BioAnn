import {Button, Divider, Form, Input, message, Modal, Space} from "antd";
import {validateMessages} from "../../pages/login";
import {LockOutlined} from "@ant-design/icons";
import {useState} from "react";
import {useRouter} from "next/router";
import createHash from "create-hash";

export default function ChangePasswordModal(props){
    const router = useRouter()
    const [form] = Form.useForm()
    const [changing, setChanging] = useState(false);
    const url = '/change_password'
    const {
        username,
        isModalOpen,
        setIsModalOpen,
        handleCancel
    } = props

    // initialValue不能被setState更新，需要手动更新form里面的username
    form.setFieldsValue({
        username: username,
    });

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

    const handleChangePassword = (formValues) => {
        setChanging(true)
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
                setChanging(false)
                setIsModalOpen(false)
                form.resetFields()
            })
            .catch(() => {
                message.error({
                        content: 'Change password unsuccessfully.',
                        style: {
                            marginTop: '10vh',
                        },
                        duration: 3,
                    }
                );
                setChanging(false)
                setIsModalOpen(false)
                form.resetFields()
            })
            .finally(() => {
                setChanging(false)
            });
    };

    const onReset = () => {
        form.resetFields();
    };


    return(
        <Modal title="Change the password"
               open={isModalOpen} footer={null} closable={false}
        >
            <Divider/>
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
                onFinish={handleChangePassword}
                validateMessages={validateMessages}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    initialValue={username}
                >
                    <b>{username}</b>
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
                    dependencies={['password']}
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
                                loading={changing}
                        >
                            Change password
                        </Button>
                        <Button onClick={onReset}>
                            Reset
                        </Button>
                        <Button onClick={handleCancel} type={"link"}>
                            Cancel
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    )
}