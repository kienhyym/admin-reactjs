import React, { useEffect, useState } from "react";
import { Table, Button, Space, Input, message } from "antd";
import {
  EyeOutlined,
  PlusOutlined
} from "@ant-design/icons";
import "./LessonList.css";
import AddLessonModal from "./AddLessonModal";
import { getLecturesApi, uploadBaiGiang } from "../../util/api";
import { useNavigate } from "react-router-dom";

const LessonList = () => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([])
  const navigate = useNavigate()

 useEffect(() => {
    const festAccount = async () => {
      const res = await getLecturesApi()
      if (res) {
        setData(res.data)
        console.log("res lectures:",'res:', res.data);
      }
      else{
        console.log("res lectures error:");
      }
    }
    festAccount()
  }, [])
  const columns = [
    {
      title: "STT",
      render: (_, record, index) => index + 1,
      width: 70
    },
    {
      title: "Tên bài giảng",
      dataIndex: "title",
      key: "title"
    },
    {
      title: "Số lượng video",
      dataIndex: "videos",
      render: (videos) => (
        <p>
         {videos?.length}
        </p>
      )
    },
    // {
    //   title: "Thời lượng",
    //   dataIndex: "duration"
    // },
    {
      title: "Hành động",
      render: (item) => (
        <Space>
          <Button type="primary" icon={<EyeOutlined />}  onClick={()=> navigate(item._id)}/>
        </Space>
      )
    }
  ];

  // thêm bài giảng
  const handleAddLesson = async (values) => {

    try {

      setLoading(true);

      const formData = new FormData();
      formData.append("title", values.title);

      values.videos.forEach(file => {
        formData.append("videos", file.originFileObj);
      });

      const res = await uploadBaiGiang(formData);

      message.success("Thêm bài giảng thành công");

      // thêm vào table
      const newLesson = {
        key: Date.now(),
        title: values.title,
        video: "Video đã upload",
        duration: "-"
      };

      setData(prev => [newLesson, ...prev]);

      setOpenModal(false);

    } catch (error) {

      message.error("Upload thất bại");

    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="lesson-page">

      <div className="lesson-header">

        <h2>Quản lý bài giảng</h2>

        <div className="lesson-actions">

          <Input.Search
            placeholder="Tìm bài giảng..."
            style={{ width: 250 }}
          />

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setOpenModal(true)}
          >
            Thêm bài giảng
          </Button>

        </div>

      </div>

      <Table
        columns={columns}
        rowKey="_id"
        dataSource={data}
        pagination={{ pageSize: 10 }}
        loading={loading}
      />

      <AddLessonModal
        open={openModal}
        loading={loading}
        onCancel={() => setOpenModal(false)}
        onSubmit={handleAddLesson}
      />

    </div>
  );
};

export default LessonList;