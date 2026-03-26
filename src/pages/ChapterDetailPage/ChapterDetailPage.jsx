import React, { useContext, useState } from "react";
import "./ChapterDetailPage.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { deleteChapter, getChapter, updateChapter } from "../../util/api";
import { Card, Form, Input, Button, message, Switch, } from "antd";
import { AuthContext } from "../../component/context/authContext";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
const ChapterDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [chapter, setChapter] = useState([])
    const [form] = Form.useForm();
    const { setFullPageLoading } = useContext(AuthContext)
    const [showDelete, setShowDelete] = useState(false);
    const handleDelete = async () => {
        setFullPageLoading(true)
        try {
            await deleteChapter(id);
            message.success("Xoá thành công");
            setFullPageLoading(false)
            setShowDelete(false)
            navigate(-1)
        } catch (error) {
            setFullPageLoading(false)
            setShowDelete(false)
            message.error("Xoá thất bại");
        }
    }
    const handleUpdate = async (values) => {
        setFullPageLoading(true)
        try {
            await updateChapter(id, {
                title: values.title,
                name: values.name,
                status: values.status
            });
            setFullPageLoading(false)
            message.success("Cập nhật chương học thành công");
            getData()
        } catch (error) {
            setFullPageLoading(false)
            message.error("Cập nhật thất bại");

        }

    };
    const getData = async () => {
        setFullPageLoading(true)
        const res = await getChapter(id)
        if (res) {
            setChapter(res.data)
        }
        else {
            message.error(res?.message)
        }
        setFullPageLoading(false)
    }
    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (chapter) {
            form.setFieldsValue({
                title: chapter?.title,
                name: chapter?.name,
                status: chapter?.status   // 👈 thêm dòng này
            });
        }
    }, [chapter]);

    if (!chapter) {
        return <h2 style={{ padding: 40 }}>Không tìm thấy bài học</h2>;
    }

    return (
        <Card title="Chỉnh sửa nội kiến thức tổng hợp">

            <Form
                form={form}
                layout="vertical"
                onFinish={handleUpdate}
            >

                <Form.Item
                    label="Tiêu đề"
                    name="title"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="Nhập tên tiêu đề" />
                </Form.Item>
                <Form.Item
                    label="Tên chương học"
                    name="name"
                >
                    <Input placeholder="Nhập url" />
                </Form.Item>
                <Form.Item
                    label="Trạng thái hiển thị"
                    name="status"
                    valuePropName="checked"
                >
                    <Switch
                        checkedChildren="Hiển thị"
                        unCheckedChildren="Ẩn"
                    />
                </Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                >
                    Cập nhật
                </Button>

                <Button
                    type="dashed"
                    onClick={() => setShowDelete(true)}
                >
                    Xoá nội dung
                </Button>
            </Form>
            <ConfirmDeleteModal
                visible={showDelete}
                title={chapter?.title}
                onCancel={() => setShowDelete(false)}
                onConfirm={() => handleDelete(chapter._id)}
            />
        </Card>
    );
};

export default ChapterDetailPage;