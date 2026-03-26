import React, { useContext, useState } from "react";
import "./ExtendDetailPage.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { deleteLExtend, getExtendDetail, updateExtend } from "../../util/api";
import { Card, Form, Input, Upload, Button, List, Space, message, Image, } from "antd";
import {
    DeleteOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import { AuthContext } from "../../component/context/authContext";
const ExtendDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [extend, setExtend] = useState([])
    const [coverPhoto, setCoverPhoto] = useState(null)

    const [form] = Form.useForm();
    const { setFullPageLoading } = useContext(AuthContext)

    const onDelete = async () => {
        setFullPageLoading(true)
        try {
            await deleteLExtend(id);
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
            formData.append("link", values.link);
            formData.append("image", coverPhoto);
            if (values.image &&  values.image.length > 0) {
                formData.append("image", values.image[0].originFileObj);
            }
            await updateExtend(id, formData);
            setFullPageLoading(false)
            message.success("Cập nhật bài giảng thành công");
            getData()
            form.setFieldsValue({
                image: null
            });

        } catch (error) {
            console.log("error", error)
            setFullPageLoading(false)
            message.error("Cập nhật thất bại");
        }

    };
    const getData = async () => {
        setFullPageLoading(true)
        const res = await getExtendDetail(id)
        if (res) {
            setExtend(res.data)
            setCoverPhoto(res?.data?.imageUrl)
        }
        else {
            console.log("res lectures error:");
        }
        setFullPageLoading(false)

    }
    useEffect(() => {
        getData()
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
                <Form.Item
                    label="đường dẫn thực hành"
                    name="link"
                    rules={[
                        { required: true, message: "Vui lòng nhập URL" },
                        {
                            validator: (_, value) => {
                                if (!value) return Promise.resolve();

                                try {
                                    new URL(value);
                                    return Promise.resolve();
                                } catch {
                                    return Promise.reject("URL không hợp lệ");
                                }
                            }
                        }
                    ]}
                >
                    <Input placeholder="Nhập url" />
                </Form.Item>
                <label>Ảnh bìa hiện tại</label>
                <div className="cover-image-container" >
                    <div className="cover-image">
                        {coverPhoto ?
                            <Image src={coverPhoto} className="cover-main" /> : <p>NO IMAGE</p>
                        }

                    </div>
                    {coverPhoto &&
                        (<Button
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => setCoverPhoto(null)}
                        >
                            Xoá
                        </Button>)}
                </div>
                <br /> <br />
                <Form.Item
                    label="Hình bìa thì nghiệm"
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
                        accept="image/*"
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

export default ExtendDetailPage;