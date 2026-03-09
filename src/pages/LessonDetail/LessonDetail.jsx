import React, { useState } from "react";
import "./LessonDetail.css";
import { useParams, useNavigate } from "react-router-dom";
import lessons from "../../data/LessonListdata";
import { useEffect } from "react";
import { deleteLectureDetailApi, getLectureDetailApi, updateBaiGiang } from "../../util/api";
import { Card, Form, Input, Upload, Button, List, Space, message, Spin } from "antd";
import {
    UploadOutlined,
    DeleteOutlined
} from "@ant-design/icons";
const LessonDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [lesson, setLesson] = useState([])
    const [form] = Form.useForm();
    const [deletedVideos, setDeletedVideos] = useState([]);
    const [newVideos, setNewVideos] = useState([]);
    const [loading, setloading] = useState(false)
    const [loading2, setloading2] = useState(false)

    const handleDeleteVideo = (video) => {
        const newDeletedVideos = [...deletedVideos, video._id]
        setDeletedVideos(newDeletedVideos);
        setLesson(prev => ({
            ...prev,
            videos: prev.videos?.filter(v => v !== video)
        }));
    };
    const onDelete = async () => {
        setloading2(true)
        try {
            await deleteLectureDetailApi(id);
            setloading(false)
            navigate(-1)
            message.success("Cập nhật bài giảng thành công");
        } catch (error) {
            setloading2(false)
            message.error("Cập nhật thất bại");
        }


    }
    const handleUpdate = async (values) => {
        setloading(true)
        try {

            const formData = new FormData();

            formData.append("title", values.title);

            // video mới
            newVideos.forEach(file => {
                formData.append("videos", file.originFileObj);
            });
            // video bị xoá
            deletedVideos.forEach(video => {
                formData.append("deletedVideos", video);
            });

            await updateBaiGiang(id, formData);
            setloading(false)
         
            message.success("Cập nhật bài giảng thành công");
               window.location.reload();

        } catch (error) {
            setloading(false)
            message.error("Cập nhật thất bại");

        }

    };

    useEffect(() => {
        const festAccount = async () => {
            const res = await getLectureDetailApi(id)
            if (res) {
                console.log("res==========>res:", res.data?.videos);
                setLesson(res.data)
            }
            else {
                console.log("res lectures error:");
            }
        }
        festAccount()
    }, [])

    useEffect(() => {
        if (lesson) {
            form.setFieldsValue({
                title: lesson?.lecture?.title
            });
        }
    }, [lesson]);

    if (!lesson) {
        return <h2 style={{ padding: 40 }}>Không tìm thấy bài học</h2>;
    }

    return (
        <Card title="Chỉnh sửa bài giảng">

            <Form
                form={form}
                layout="vertical"
                onFinish={handleUpdate}
            >

                <Form.Item
                    label="Tên bài giảng"
                    name="title"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="Nhập tên bài giảng" />
                </Form.Item>


                <Form.Item label="Danh sách video">

                    <List
                        bordered
                        dataSource={lesson?.videos || []}
                        renderItem={(video, index) => (
                            <List.Item
                                actions={[
                                    <Button
                                        danger
                                        icon={<DeleteOutlined />}
                                        onClick={() => handleDeleteVideo(video)}
                                    >
                                        Xoá
                                    </Button>
                                ]}
                            >
                                <Space direction="vertical">
                                    <span>Video {index + 1}</span>
                                    <video
                                        width="300"
                                        controls
                                        src={video?.videoUrl}
                                    />

                                </Space>
                            </List.Item>
                        )}
                    />

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
                        Xoá bài giảng
                    </Button>
                }

            </Form>

        </Card>
    );
};

export default LessonDetail;