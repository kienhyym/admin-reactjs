import { notification, Table } from "antd";
import { getUsersApi } from "../util/api";
import { useEffect, useState } from "react";

const UserPage = () => {
    const [dataSource, setDataSource] = useState([])

    const columns = [
        {
            title: 'email',
            dataIndex: 'email',
        },
        {
            title: 'name',
            dataIndex: 'name',
        },
        {
            title: 'role',
            dataIndex: 'role',
        },
    ];

    useEffect(() => {
        const fetchData = async () => {
            const res = await getUsersApi();
            if (!res?.message) {
                setDataSource(res);
            }else{
                notification.error({
                    message: 'Lỗi',
                    description: res?.message || 'Có lỗi xảy ra khi lấy danh sách người dùng',
                });
            }
        }
        fetchData()
    }, [])


    return (
        <div>
            <Table rowKey={"_id"} dataSource={dataSource} columns={columns} />
        </div>
    )
}
export default UserPage;