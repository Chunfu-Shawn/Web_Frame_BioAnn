import Head from 'next/head'
import LayoutCustom, { siteTitle } from '../components/LayoutCustom.js'
import {Button, message, Modal, Space, Table} from 'antd';
const { confirm } = Modal;
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import ChangePasswordModal from "../components/manage/ChangePasswordModal";
import DeleteUserModal from "../components/manage/DeleteUserModal";
import {ExclamationCircleFilled} from "@ant-design/icons";

export default function ManagePage() {
    const router = useRouter()
    const [users,setUsers] = useState(null)
    const [username,setUsername] = useState(null)
    const [sortedInfo, setSortedInfo] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [deleting, setDeleting] = useState(false)

    const onAddUser = () => {
        router.push('/register')
    };

    const handleModalOpen = (username) => () => {
        setIsModalOpen(true)
        setUsername(username)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const showDeleteConfirm = (username) => () => {
        confirm({
            title: 'Are you sure delete this user?',
            icon: <ExclamationCircleFilled />,
            content: <p>User Name: <b>{username}</b></p>,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                setDeleting(true)
                fetch('/delete_user',{
                    method: 'POST',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify({username: username}),
                }).then(response => response.json())
                    .then(json => {
                        setDeleting(false)
                        message.info({
                                content: 'Delete the user: '+ username +' successfully',
                                style: {
                                    marginTop: '10vh',
                                },
                                duration: 3,
                            }
                        );
                    })
                    .catch(() => {
                        setDeleting(false)
                        message.error({
                                content: 'Delete the user: '+ username +' unsuccessfully',
                                style: {
                                    marginTop: '10vh',
                                },
                                duration: 3,
                            }
                        );
                    })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    // column sort
    const handleChange = (pagination,filter,sorter) => {
        setSortedInfo(sorter);
    };


    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => {
                if(a.id > b.id) return 1
                else return -1
            },
            sortOrder: sortedInfo.columnKey === 'id' ? sortedInfo.order : null,
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'User Name',
            dataIndex: 'username',
            key: 'username',
            sorter: (a, b) => {
                if(a.username > b.username) return 1
                else return -1
            },
            sortOrder: sortedInfo.columnKey === 'username' ? sortedInfo.order : null,
        },
        {
            title: 'Action',
            key: 'action',
            width: "40%",
            render: (_, record) => (
                <Space size="large">
                    <a onClick={handleModalOpen(record.username)}>Change password</a>
                    <a onClick={showDeleteConfirm(record.username)}>Delete</a>
                </Space>
            ),
        },
    ];
    const fetchUsers = async () => {
        fetch("/api/users/")
            .then(res => res.json())
            .then(json => json.map(item => {
                return {
                    key: item.id,
                    id: item.id,
                    username : item.username,
                }
            }))
            .then( json => setUsers(json))
    }

    // 删除一个用户后刷新users
    useEffect(()=>{
        fetchUsers()
    },[deleting])

    return (
        <LayoutCustom>
            <Head>
                <title>{siteTitle+"| Gene Search"}</title>
            </Head>
            <div className="modal-body-stw" style={{height:"90vh"}}>
                <div className="inner cover" style={{width:1000}}>
                    <h1> Manage accounts</h1>
                </div>
                <ChangePasswordModal
                    username={username}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    handleCancel={handleCancel}
                />
                <Space align="center" style={{height:60,float:"right",width:300}}>
                    <Button onClick={onAddUser}>Add an user</Button>
                </Space>
                <Table style={{width:800,margin:"auto"}}
                       columns={columns}
                       dataSource={users}
                       size="small"
                       onChange={handleChange}/>
            </div>
        </LayoutCustom>
    )
}