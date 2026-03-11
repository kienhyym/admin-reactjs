import React, { useState } from "react";
import "./KnowledgeDetailPage.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { deleteLKnowledge, getKnowledgeDetail, updateBaiGiang, updateKnowledge } from "../../util/api";
import { Card, Form, Input, Upload, Button, List, Space, message, Spin, Image } from "antd";
import {
    UploadOutlined,
} from "@ant-design/icons";
const KnowledgeDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [knowledge, setKnowledge] = useState([])
    const [form] = Form.useForm();
    const [deletedVideos, setDeletedVideos] = useState([]);
    const [loading, setloading] = useState(false)
    const [loading2, setloading2] = useState(false)
    const [thumbnail, setThumbnail] = useState([]);

    const handleDeleteVideo = (video) => {
        const newDeletedVideos = [...deletedVideos, video._id]
        setDeletedVideos(newDeletedVideos);
        setKnowledge(prev => ({
            ...prev,
            videos: prev.videos?.filter(v => v !== video)
        }));
    };
    const onDelete = async () => {
        setloading2(true)
        try {
            await deleteLKnowledge(id);
            setloading(false)
            navigate(-1)
            message.success("Xoá nội dung mở rộng thành công");
        } catch (error) {
            setloading2(false)
            message.error("Xoá thất bại");
        }


    }
    const handleUpdate = async (values) => {
        setloading(true)
        try {

            const formData = new FormData();

            formData.append("title", values.title);
            formData.append("link", values.link);
            console.log('thumbnail',thumbnail)
            if (thumbnail.length > 0) {
                formData.append("image", thumbnail[0].originFileObj);
            }

            await updateKnowledge(id, formData);
            setloading(false)
            message.success("Cập nhật bài giảng thành công");
            window.location.reload();

        } catch (error) {
            console.log("error", error)
            setloading(false)
            message.error("Cập nhật thất bại");

        }

    };

    useEffect(() => {
        const festAccount = async () => {
            const res = await getKnowledgeDetail(id)
            if (res) {
                setKnowledge(res.data)
            }
            else {
                console.log("res lectures error:");
            }
        }
        festAccount()
    }, [])

    useEffect(() => {
        if (knowledge) {
            form.setFieldsValue({
                title: knowledge?.title,
                link: knowledge?.link
            });
        }
    }, [knowledge]);

    if (!knowledge) {
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
                    label="đường dẫn thực hành"
                    name="link"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="Nhập url" />
                </Form.Item>
                <Image src={knowledge.imageUrl} height={200} />
                <Form.Item
                    label="Upload hình ảnh mới"
                    name="image"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => {
                        setThumbnail(e?.fileList || []);
                        return e?.fileList;
                    }}

                >
                    <Upload
                        beforeUpload={() => false}
                        maxCount={1}
                        listType="picture"
                    >
                        <Button icon={<UploadOutlined />}>
                            Upload image
                        </Button>
                    </Upload>
                </Form.Item>
                {
                    loading ? <Spin /> : <Button
                        type="primary"
                        htmlType="submit"
                    >
                        Cập nhật
                    </Button>
                }
                {
                    loading2 ? <Spin /> : <Button
                        type="dashed"
                        onClick={onDelete}
                    >
                        Xoá nội dung
                    </Button>
                }

            </Form>

        </Card>
    );
};

export default KnowledgeDetailPage;