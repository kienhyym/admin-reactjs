import React, { useContext, useEffect, useState } from "react";
import { Table, Button, Space, Input, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import "./ChapterPage.css";
import AddChapterModal from "./ChapterPageModal";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../component/context/authContext";
import { createChapter, getChapters } from "../../util/api";

const ChapterPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const { setFullPageLoading } = useContext(AuthContext)

  const getData = async () => {
    setFullPageLoading(true)
    const res = await getChapters()
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
      dataIndex: "title"
    },
    {
      title: "Tên chương",
      dataIndex: "name"
    },
    {
      title: "Trạng thái",
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
      render: (item) => (
        <Space>
          <Button type="primary" icon={<EyeOutlined />} onClick={() => navigate(item._id)} />
        </Space>
      )
    }
  ];
  // thêm bài giảng
  const handleAddLesson = async (values) => {
    try {
      setFullPageLoading(true)
      const res = await createChapter(values);
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
    <div className="chapter-page">

      <div className="chapter-header">

        <h2>Quản lý chương học</h2>

        <div className="chapter-actions">

          <Input.Search
            placeholder="Tìm kiếm..."
            style={{ width: 250 }}
          />

          <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpenModal(true)}>
            Thêm chương học
          </Button>

        </div>

      </div>

      <Table
        columns={columns}
        dataSource={data}
        rowKey="_id"
      />

      <AddChapterModal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onSubmit={handleAddLesson}
      />

    </div>
  );
};

export default ChapterPage;