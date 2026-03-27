import React, { useContext, useState } from "react";
import "./LessonDetail.css";
import { useParams, useNavigate } from "react-router-dom";
import { Modal, Switch } from "antd"; import { useEffect } from "react";
import { deleteLectureDetailApi, getLectureDetailApi, updateBaiGiang, updateTitleVideo } from "../../util/api";
import { Card, Form, Input, Upload, Button, List, Space, message, Spin, Image } from "antd";
import {
    UploadOutlined,
    DeleteOutlined
} from "@ant-design/icons";
import { AuthContext } from "../../component/context/authContext";
import ConfirmDeleteModal from "../../component/layout/DeleteModal/ConfirmDeleteModal";


const LessonDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [lesson, setLesson] = useState([])
    const [form] = Form.useForm();
    const [deletedVideos, setDeletedVideos] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);

    const [editVideoModal, setEditVideoModal] = useState(false);
    const [editingVideo, setEditingVideo] = useState(null);
    const [videoTitle, setVideoTitle] = useState("");
    const { setFullPageLoading } = useContext(AuthContext)


    const getData = async () => {
        setFullPageLoading(true)
        const res = await getLectureDetailApi(id)
        if (res) {
            setLesson(res.data)
            setThumbnail(res?.data?.lecture?.thumbnail)
        }
        else {
            message.error(res.message)
        }
        setFullPageLoading(false)
    }

    const openEditVideo = (video) => {
        setEditingVideo(video);
        setVideoTitle(video.displayName);
        setEditVideoModal(true);
    };

    const handleUpdateVideoTitle = async () => {

        try {
            setFullPageLoading(true)
            const res = await updateTitleVideo(editingVideo._id, { title: videoTitle })
            if (res.data) {
                getData()
                setEditVideoModal(false);
                message.success("Cập nhật tiêu đề video thành công");
            } else {
                setEditVideoModal(false);
                message.error(res.message);
            }
            setFullPageLoading(false)
        } catch (error) {
            setEditVideoModal(false);
            message.error(error.message);
            setFullPageLoading(false)
        }

    };


    const handleDeleteVideo = (video) => {
        const newDeletedVideos = [...deletedVideos, video._id]
        setDeletedVideos(newDeletedVideos);
        setLesson(prev => ({
            ...prev,
            videos: prev.videos?.filter(v => v !== video)
        }));
    };
    const onDelete = async () => {
        setFullPageLoading(true)
        try {
            await deleteLectureDetailApi(id);
            setFullPageLoading(false)
            navigate(-1)
            message.success("Cập nhật bài giảng thành công");
        } catch (error) {
            setFullPageLoading(false)
            message.error("Cập nhật thất bại");
        }


    }
    const handleUpdate = async (values) => {
        setFullPageLoading(true)
        try {
            const formData = new FormData();

            formData.append("title", values.title);
            formData.append("status", values.status);
            formData.append("thumbnail", thumbnail);

            // thumbnail mới
            if (values.thumbnail && values.thumbnail.length > 0) {
                formData.append("thumbnail", values.thumbnail[0].originFileObj);
            }
            // video mới
            if (values.videos && values.videos.length > 0) {
                values.videos.forEach(file => {
                    formData.append("videos", file.originFileObj);
                });
            }

            // video bị xoá
            deletedVideos.forEach(video => {
                formData.append("deletedVideos", video);
            });

            await updateBaiGiang(id, formData);
            getData()
            setFullPageLoading(false)
            message.success("Cập nhật bài giảng thành công");

            form.setFieldsValue({
                thumbnail: null,
                videos: null
            });

        } catch (error) {
            setFullPageLoading(false)
            message.error("Cập nhật thất bại");

        }

    };

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (lesson) {
            form.setFieldsValue({
                title: lesson?.lecture?.title,
                status: lesson?.lecture?.status
            });
        }
    }, [lesson]);



    const [showDelete, setShowDelete] = useState(false);
    const handleDelete = async () => {
        setFullPageLoading(true)
        try {
            await onDelete();
            message.success("Xoá thành công");
            setFullPageLoading(false)
            setShowDelete(false)
            navigate("/lessons")
        } catch (error) {
            setFullPageLoading(false)
            setShowDelete(false)
            message.error("Xoá thất bại");
        }
    }

    if (!lesson) {
        return <h2 style={{ padding: 40 }}>Không tìm thấy bài học</h2>;
    }

    return (
        <Card title="Chỉnh sửa bài giảng">

            <Form
                className="card-container"
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
                <label>Ảnh bìa bài giảng</label>
                <div className="cover-image-container" >
                    <div className="cover-image">
                        {thumbnail ?
                            <Image src={thumbnail} className="cover-main" /> : <p>NO IMAGE</p>
                        }

                    </div>
                    {thumbnail &&
                        (<Button
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => setThumbnail(null)}
                        >
                            Xoá
                        </Button>)}
                </div>
                <br />
                <Form.Item
                    label="Hình bìa bài giảng"
                    name="thumbnail"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => {
                        return e?.fileList;
                    }}

                >
                    <Upload
                        beforeUpload={() => false}
                        maxCount={1}
                        listType="picture"
                        accept="image/*"
                    >
                        <Button icon={<UploadOutlined />}>
                            Tải tài liệu lên
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
                        return e?.fileList;
                    }}
                >
                    <Upload
                        beforeUpload={() => false}
                        multiple
                        accept="video/*"
                    >
                        <Button icon={<UploadOutlined />}>
                            Chọn video
                        </Button>
                    </Upload>
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
                    Xoá bài giảng
                </Button>


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
            <ConfirmDeleteModal
                visible={showDelete}
                title={lesson?.lecture?.title}
                onCancel={() => setShowDelete(false)}
                onConfirm={handleDelete}
            />
        </Card>
    );
};

export default LessonDetail;