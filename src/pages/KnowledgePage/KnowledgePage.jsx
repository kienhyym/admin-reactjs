import React, { useEffect, useState } from "react";
import { Table, Button, Space, Input, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import "./KnowledgePage.css";
import AddKnowledgeModal from "./KnowledgePageModal";
import { getKnowledge, uploadKnowledge } from "../../util/api";
import { useNavigate } from "react-router-dom";

const KnowledgePage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const getData = async () => {
      const res = await getKnowledge()
      if (res) {
        setData(res.data)
      }
      else {
        console.log("res lectures error:");
      }
    }
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
      title: "Link",
      dataIndex: "link",
      render: (link) => (
        <a href={link} target="_blank" rel="noreferrer">
          {link}
        </a>
      )
    },
    // {
    //   title: "Video",
    //   dataIndex: "videoUrl",
    //   render: (video) => (
    //     <video width="180" controls>
    //       <source src={video} />
    //     </video>
    //   )
    // },
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

      setLoading(true);
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("link", values.link);
      formData.append("image", values.image[0].originFileObj);



      const res = await uploadKnowledge(formData);
      if (res) {
        message.success("Thêm bài giảng thành công");
      }

      // thêm vào table
      const newLesson = {
        key: Date.now(),
        title: values.title,
        link: "Video đã upload",
        duration: "-"
      };

      setData(prev => [newLesson, ...prev]);
      setOpenModal(false);
    } catch (error) {
      console.log('error', error)
      message.error("Upload thất bại");
    } finally {
      setLoading(false);
    }

  };
  return (
    <div className="knowledge-page">

      <div className="knowledge-header">

        <h2>Quản lý nội dung tổng hợp kiến thức</h2>

        <div className="knowledge-actions">

          <Input.Search
            placeholder="Tìm kiếm..."
            style={{ width: 250 }}
          />

          <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpenModal(true)}>
            Thêm Knowledge
          </Button>

        </div>

      </div>

      <Table
        columns={columns}
        dataSource={data}
        rowKey="_id"
      />

      <AddKnowledgeModal
        open={openModal}
        loading={loading}
        onCancel={() => setOpenModal(false)}
        onSubmit={handleAddLesson}
      />

    </div>
  );
};

export default KnowledgePage;