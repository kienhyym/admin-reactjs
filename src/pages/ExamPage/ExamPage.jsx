import React, { useContext, useEffect, useState } from "react";
import { Table, Button, Space, Input, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import "./ExamPage.css";
import AddExamModal from "./ExamPageModal";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../component/context/authContext";
import { createExam, getChapters, getExams } from "../../util/api";

const ExamPage = () => {
    const { lessonId } = useParams()
    const [openModal, setOpenModal] = useState(false);
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const { setFullPageLoading } = useContext(AuthContext)

    const getData = async () => {
        setFullPageLoading(true)
        const res = await getExams(lessonId)
        if (res) {
            setData(res.data)
        }
        else {
            console.log("res lectures error:");
        }
        setFullPageLoading(false)
    }
    useEffect(() => {
        getData()
    }, [])



    const columns = [
        {
            title: "STT",
            render: (_, __, index) => index + 1,
            width: 70
        },
        {
            title: "Tiêu đề",
            dataIndex: "title",
            width: 270
        },
        {
            title: "Thời gian thi",
            width: 170,
            dataIndex: "timeLimit",
        },

        {
            title: "Số lượng câu hỏi",
            width: 170,
            dataIndex: "totalQuestion",
        },
        {
            title: "Loại đề thi",
            width: 170,
            render: (item) => (
                <>
                    {item.type === "experiment" ?
                        <p  >Đề ôn tập</p> :
                        <p >Đề thi</p>
                    }
                </>)
        },
        {
            title: "Trạng thái",
            width: 170,
            render: (item) => (
                <>
                    {item.status ?
                        <p className="status-open" >Mở</p> :
                        <p className="status-close">Đóng</p>
                    }
                </>)
        },
        {
            title: "Hành động",
            width: 170,
            render: (item) => (
                <Space>
                    <Button type="primary" icon={<EyeOutlined />} onClick={() => navigate("/exam/detail/" + item._id)} >Chi tiết</Button>
                    <Button type="primary" icon={<EyeOutlined />} onClick={() => navigate("/quiz/" + item._id)} >Quản lý câu hỏi</Button>

                </Space>
            )
        }
    ];
    // thêm bài giảng
    const handleAddLesson = async (values) => {
        try {
            const param = { ...values, lectureId: lessonId }
            setFullPageLoading(true)
            const res = await createExam(param);
            if (res) {
                message.success("Thêm chương học thành công");
                getData()
            }
            setOpenModal(false);
            setFullPageLoading(false)

        } catch (error) {
            message.error(error.message);
            setFullPageLoading(false)
        } finally {
            setFullPageLoading(false)
        }

    };
    return (
        <div className="exam-page">

            <div className="exam-header">

                <h2>Quản lý đề thi</h2>

                <div className="exam-actions">
                    {/* 
          <Input.Search
            placeholder="Tìm kiếm..."
            style={{ width: 250 }}
          /> */}

                    <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpenModal(true)}>
                        Thêm đề thi
                    </Button>
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={data}
                rowKey="_id"
            />

            <AddExamModal
                open={openModal}
                onCancel={() => setOpenModal(false)}
                onSubmit={handleAddLesson}
            />

        </div>
    );
};

export default ExamPage;