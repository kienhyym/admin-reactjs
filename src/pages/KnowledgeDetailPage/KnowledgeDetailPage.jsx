import React, { useContext, useState } from "react";
import "./KnowledgeDetailPage.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { deleteLKnowledge, getKnowledgeDetail, updateKnowledge } from "../../util/api";
import { Card, Form, Input, Upload, Button, message, Image } from "antd";
import {
    DeleteOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import { AuthContext } from "../../component/context/authContext";

const KnowledgeDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [knowledge, setKnowledge] = useState([])
    const [form] = Form.useForm();
    const [thumbnail, setThumbnail] = useState(null);
    const { setFullPageLoading } = useContext(AuthContext)

    const onDelete = async () => {
        setFullPageLoading(true)
        try {
            await deleteLKnowledge(id);
            setFullPageLoading(false)
            navigate(-1)
            message.success("Xoá nội dung mở rộng thành công");
        } catch (error) {
            setFullPageLoading(false)
            message.error("Xoá thất bại");
        }


    }
    const handleUpdate = async (values) => {
        setFullPageLoading(true)
        try {
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("image", thumbnail);
            if (values.image && values.image.length > 0) {
                formData.append("image", values.image[0].originFileObj);
            }
            await updateKnowledge(id, formData);
            setFullPageLoading(false)
            message.success("Cập nhật bài giảng thành công");
            getData()
            form.setFieldsValue({
                image: null,
            });
        } catch (error) {
            setFullPageLoading(false)
            message.error("Cập nhật thất bại");

        }

    };
    const getData = async () => {
        setFullPageLoading(true)
        const res = await getKnowledgeDetail(id)
        if (res) {
            setKnowledge(res.data)
            setThumbnail(res?.data?.imageUrl)

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
        if (knowledge) {
            form.setFieldsValue({
                title: knowledge?.title,
            });
        }
    }, [knowledge]);

    if (!knowledge) {
        return <h2 style={{ padding: 40 }}>Không tìm thấy bài học</h2>;
    }

    return (
        <Card title="Chỉnh sửa nội kiến thức tổng hợp">

            <Form
                className="card-container"
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


                <label>Nội dung</label>
                <div className="cover-image-container" >
                    <div className="cover-image">
                        {thumbnail ? (knowledge?.imageUrl?.slice(-4) === '.pdf' ?
                            <iframe
                                src={`https://docs.google.com/gview?url=${knowledge.imageUrl}&embedded=true`}
                                width="100%"
                                height="220"
                            />
                            : <Image src={thumbnail} className="cover-main" />
                        )
                            : <p>NO DATA</p>
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
                <br /> <br />
                <Form.Item
                    label="Tải tài liệu mới"
                    name="image"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => {
                        return e?.fileList;
                    }}

                >
                    <Upload
                        beforeUpload={() => false}
                        maxCount={1}
                        listType="picture"
                        accept=".pdf,image/*"
                    >
                        <Button icon={<UploadOutlined />}>
                            Tải tài liệu lên
                        </Button>
                    </Upload>
                </Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                >
                    Cập nhật
                </Button>

                <Button
                    type="dashed"
                    onClick={onDelete}
                >
                    Xoá nội dung
                </Button>
            </Form>
        </Card>
    );
};

export default KnowledgeDetailPage;