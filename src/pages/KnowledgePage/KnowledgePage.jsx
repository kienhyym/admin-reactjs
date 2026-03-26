import React, { useContext, useEffect, useState } from "react";
import { Table, Button, Space, message, Image } from "antd";
import { PlusOutlined, EyeOutlined } from "@ant-design/icons";
import "./KnowledgePage.css";
import AddKnowledgeModal from "./KnowledgePageModal";
import { getKnowledge, uploadKnowledge } from "../../util/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../component/context/authContext";

const KnowledgePage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const { setFullPageLoading } = useContext(AuthContext)
  const getData = async () => {
    setFullPageLoading(true)
    const res = await getKnowledge()
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
    },
    {
      title: "hình ảnh",
      dataIndex: "imageUrl",
      width: 170,
      render: (data) => (
        data?.slice(-4) === '.pdf' ?
          <div className="pdf-small"><p>PDF</p></div>
          :
          <div className="pdf-small">
            <  Image src={data} />
          </div>

      )
    },
    {
      title: "Hành động",
      width: 170,
      render: (item) => (
        <Space>
          <Button type="primary" icon={<EyeOutlined />} onClick={() => navigate(item._id)}>
            Chi tiết</Button>
        </Space>
      )
    }
  ];
  const handleAddLesson = async (values) => {
    try {
      setFullPageLoading(true);
      const formData = new FormData();
      formData.append("title", values.title);

       const file = values?.image;
      if (file && values?.image.length > 0) {
        formData.append("image", values?.image[0].originFileObj);
      }

      const res = await uploadKnowledge(formData);
      if (res) {
        message.success("Thêm bài giảng thành công");
        getData()
      }
      setFullPageLoading(false)
      setOpenModal(false);
    } catch (error) {
      message.error("Upload thất bại");
      setFullPageLoading(false)
    } finally {
      setFullPageLoading(false)
    }
  };
  return (
    <div className="knowledge-page">

      <div className="knowledge-header">

        <h2>Quản lý nội dung tổng hợp kiến thức</h2>

        <div className="knowledge-actions">
          {/* 
          <Input.Search
            placeholder="Tìm kiếm..."
            style={{ width: 250 }}
          /> */}

          <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpenModal(true)}>
            Thêm nội dung kiến thức tổng hợp
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
        onCancel={() => setOpenModal(false)}
        onSubmit={handleAddLesson}
      />

    </div>
  );
};

export default KnowledgePage;