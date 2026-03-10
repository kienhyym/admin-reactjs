import React, { useState } from "react";
import "./ExtendDetailPage.css";
import { useParams, useNavigate } from "react-router-dom";
import lessons from "../../data/LessonListdata";
import { useEffect } from "react";
import { deleteLExtend, getExtendDetail, updateBaiGiang, updateExtend } from "../../util/api";
import { Card, Form, Input, Upload, Button, List, Space, message, Spin, Image } from "antd";
import {
    UploadOutlined,
} from "@ant-design/icons";
const ExtendDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [extend, setExtend] = useState([])
    const [form] = Form.useForm();
    const [deletedVideos, setDeletedVideos] = useState([]);
    const [newVideos, setNewVideos] = useState([]);
    const [loading, setloading] = useState(false)
    const [loading2, setloading2] = useState(false)
    const [thumbnail, setThumbnail] = useState([]);

    const handleDeleteVideo = (video) => {
        const newDeletedVideos = [...deletedVideos, video._id]
        setDeletedVideos(newDeletedVideos);
        setExtend(prev => ({
            ...prev,
            videos: prev.videos?.filter(v => v !== video)
        }));
    };
    const onDelete = async () => {
        setloading2(true)
        try {
            await deleteLExtend(id);
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
            if (values && values?.videos) {
                const file = values.videos[0];
                formData.append("videos", file.originFileObj);
            }


            await updateExtend(id, formData);
            setloading(false)
            message.success("Cập nhật bài giảng thành công");
            // window.location.reload();

        } catch (error) {
            console.log("error", error)
            setloading(false)
            message.error("Cập nhật thất bại");

        }

    };

    useEffect(() => {
        const festAccount = async () => {
            const res = await getExtendDetail(id)
            if (res) {
                setExtend(res.data)
            }
            else {
                console.log("res lectures error:");
            }
        }
        festAccount()
    }, [])

    useEffect(() => {
        if (extend) {
            form.setFieldsValue({
                title: extend?.title,
                link: extend?.link
            });
        }
    }, [extend]);

    if (!extend) {
        return <h2 style={{ padding: 40 }}>Không tìm thấy bài học</h2>;
    }

    return (
        <Card title="Chỉnh sửa nội dung mở rộng">

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
                <Form.Item label="video">
                    {
                        extend?.videoUrl ? <List
                            bordered
                            dataSource={[extend?.videoUrl]}
                            renderItem={(video, index) => (
                                <List.Item key={index}>
                                    <Space direction="vertical">
                                        <span>Video {index + 1}</span>
                                        <video
                                            width="300"
                                            controls
                                            src={video}
                                        />
                                    </Space>
                                </List.Item>
                            )}
                        /> : <></>
                    }


                </Form.Item>
                <Form.Item
                    label="Upload video mới"
                    name="videos"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => {
                        setNewVideos(e?.fileList || []);
                        return e?.fileList;
                    }}
                >
                    <Upload
                        beforeUpload={() => false}
                        multiple
                    >
                        <Button icon={<UploadOutlined />}>
                            Chọn video
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

export default ExtendDetailPage;