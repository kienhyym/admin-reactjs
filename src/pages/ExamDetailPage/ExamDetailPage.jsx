import React, { useContext, useState } from "react";
import "./ExamDetailPage.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getExam, updateExam } from "../../util/api";
import { Card, Form, Input, Button, message, Switch, Select, } from "antd";
import { AuthContext } from "../../component/context/authContext";
const ExamDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [exam, setExam] = useState([])
    const [form] = Form.useForm();
    const { setFullPageLoading } = useContext(AuthContext)

    const onDelete = async () => {
        setFullPageLoading(true)
        try {
            // await deleteExam(id);
            // setFullPageLoading(false)
            // navigate(-1)
            message.error("Xoá nội dung đang được bảo trì");
            setFullPageLoading(false)
        } catch (error) {
            setFullPageLoading(false)
            message.error("Xoá thất bại");
        }
    }
    const handleUpdate = async (values) => {
        setFullPageLoading(true)
        try {
            await updateExam(id, {
                title: values?.title,
                status: values?.status,
                timeLimit: values?.timeLimit,
                totalQuestion: values?.totalQuestion,
                type: values?.type

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
        const res = await getExam(id)
        if (res) {
            setExam(res.data)
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
        if (exam) {
            form.setFieldsValue({
                title: exam?.title,
                status: exam?.status,
                timeLimit: exam?.timeLimit,
                totalQuestion: exam?.totalQuestion,
                type: exam?.type
            });
        }
    }, [exam]);

    if (!exam) {
        return <h2 style={{ padding: 40 }}>Không tìm thấy bài học</h2>;
    }

    return (
        <Card title="Chỉnh sửa đề thi">

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
                    <Input placeholder="Nhập tiêu đề chương học" />
                </Form.Item>

                <Form.Item
                    label="Thời gian thi"
                    name="timeLimit"
                >
                    <Input placeholder="Nhập thời gian thi" />
                </Form.Item>
                <Form.Item
                    label="Số lượng câu hỏi"
                    name="totalQuestion"
                >
                    <Input placeholder="Nhập số lượng câu hỏi" />
                </Form.Item>

                <Form.Item
                    label="loại đề"
                    name="type"
                    rules={[{ required: true, message: "Chọn loại đề" }]}
                >
                    <Select placeholder="Chọn chương học" >
                        {[{ value: "experiment", name: "Đề ôn tập" }, { value: "exam", name: "Đề thi" }]?.map((c) => (
                            <Select.Option key={c.value} value={c.value}>
                                {c.name}
                            </Select.Option>
                        ))}
                    </Select>
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
                    onClick={onDelete}
                >
                    Xoá đề thi
                </Button>
            </Form>
        </Card>
    );
};

export default ExamDetailPage;