import { Table } from "antd";
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
            console.log('res:', res);
            if (res) {
                setDataSource(res);
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