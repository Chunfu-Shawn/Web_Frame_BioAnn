import {Button, Divider, Form, Input, message, Modal, Space} from "antd";
import {validateMessages} from "../../pages/login";
import {ExclamationCircleFilled, LockOutlined} from "@ant-design/icons";
import {useState} from "react";
import {useRouter} from "next/router";

export default function DeleteUserModal(props){
    const router = useRouter()
    const [form] = Form.useForm()
    const [changing, setChanging] = useState(false);
    const url = '/change_password'
    const {
        username,
        isDeleteModalOpen,
        setIsModalOpen,
        handleCancel
    } = props

    const handleChangePassword = (formValues) => {
        setChanging(true)
        console.log(JSON.stringify(formValues))

        fetch(url,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(formValues),
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


    return(
        <Modal title="Confirm to delete this user?"
               icon={<ExclamationCircleFilled />}
               open={isDeleteModalOpen}
               onOk={handleChangePassword} onCancel={handleCancel}
        >
            <p>User Name: <b>{username}</b></p>
        </Modal>
    )
}