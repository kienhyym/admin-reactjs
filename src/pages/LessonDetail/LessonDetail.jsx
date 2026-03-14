import React, { useState } from "react";
import "./LessonDetail.css";
import { useParams, useNavigate } from "react-router-dom";
import { Modal } from "antd"; import { useEffect } from "react";
import { deleteLectureDetailApi, getLectureDetailApi, updateBaiGiang, updateTitleVideo } from "../../util/api";
import { Card, Form, Input, Upload, Button, List, Space, message, Spin, Image } from "antd";
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
    const [thumbnail, setThumbnail] = useState([]);

    const [editVideoModal, setEditVideoModal] = useState(false);
    const [editingVideo, setEditingVideo] = useState(null);
    const [videoTitle, setVideoTitle] = useState("");

    const openEditVideo = (video) => {
        setEditingVideo(video);
        setVideoTitle(video.displayName);
        setEditVideoModal(true);
    };

    const handleUpdateVideoTitle = async () => {

        try {
            const res = await updateTitleVideo(editingVideo._id, { title: videoTitle })
            if (res.data) {
                setLesson(prev => ({
                    ...prev,
                    videos: prev.videos.map(v =>
                        v._id === editingVideo._id
                            ? { ...v, displayName: videoTitle }
                            : v
                    )
                }));
                setEditVideoModal(false);
                message.success("Cập nhật tiêu đề video thành công");
            } else {
                setEditVideoModal(false);
                message.error(res.message);
            }
        } catch (error) {
            setEditVideoModal(false);
            message.error(error.message);

        }

    };



    console.log('lesson', lesson)
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
            // thumbnail mới
            if (thumbnail.length > 0) {
                formData.append("thumbnail", thumbnail[0].originFileObj);
            }
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
                <div style={{ marginBottom: 20 }}>
                    <h4>Thumbnail hiện tại</h4>

                    {lesson?.lecture?.thumbnail && (
                        <Image
                            src={lesson?.lecture?.thumbnail}
                            height={200}
                        />
                    )}
                </div>
                <Form.Item
                    label="Thumbnail"
                    name="thumbnail"
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
                            Upload thumbnail
                        </Button>
                    </Upload>
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
                                    </Button>,
                                    <Button
                                        type="primary"
                                        onClick={() => openEditVideo(video)}
                                    >
                                        Sửa tiêu đề
                                    </Button>
                                ]}
                            >
                                <Space direction="vertical">
                                    <span>{video?.displayName}</span>
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
            <Modal
                title="Sửa tiêu đề video"
                open={editVideoModal}
                onCancel={() => setEditVideoModal(false)}
                onOk={handleUpdateVideoTitle}
            >
                <Input
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    placeholder="Nhập tiêu đề video"
                />
            </Modal>
        </Card>
    );
};

export default LessonDetail;