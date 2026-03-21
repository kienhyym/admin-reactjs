import React, { useContext, useEffect, useState } from "react";
import { Table, Button, Space, Input, message, Image } from "antd";
import {
  EyeOutlined,
  PlusOutlined
} from "@ant-design/icons";
import "./LessonList.css";
import AddLessonModal from "./AddLessonModal";
import { getLecturesApi, uploadBaiGiang } from "../../util/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../component/context/authContext";

const LessonList = () => {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const { setFullPageLoading } = useContext(AuthContext)
  const getData = async () => {
    setFullPageLoading(true)
    const res = await getLecturesApi()
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
    {
      title: "hình ảnh",
      dataIndex: "thumbnail",
      render: (data) => (
        <Image src={data} height={50} />
      )
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
      const formData = new FormData();
      formData.append("title", values.title);
      // thumbnail
      if (values.thumbnail?.length > 0) {
        formData.append(
          "thumbnail",
          values.thumbnail[0].originFileObj
        );
      }
      values.videos.forEach(file => {
        formData.append("videos", file.originFileObj);
      });

      const res = await uploadBaiGiang(formData);
      if (res) {
        getData();
        message.success("Thêm bài giảng thành công");
      }
      setFullPageLoading(false)
      setOpenModal(false);

    } catch (error) {
      setFullPageLoading(false)
      message.error("Upload thất bại");

    } finally {
      setFullPageLoading(false)
    }

  };

  return (
    <div className="lesson-page">

      <div className="lesson-header">

        <h2>Quản lý bài giảng</h2>

        <div className="lesson-actions">

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setOpenModal(true)}
          >
            Thêm chương học
          </Button>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setOpenModal(true)}
          >
            Thêm bài giảng
          </Button>

        </div>

      </div>
      {data.map((item) => {
        return (
          <>
            <div className="title-chapper"  >
              <h3 >{item.title} {item?.name}</h3>
              {
                item.status ?
                  <h3 className="title-chapper-open" >(Đang hiển thị)</h3>
                  :
                  <h3 className="title-chapper-close" >(Đang ẩn)</h3>
              }
            </div>

            <Table
              columns={columns}
              pagination={false}
              rowKey="_id"
              dataSource={item.lectures}
            />
          </>)
      })}


      <AddLessonModal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onSubmit={handleAddLesson}
      />

    </div>
  );
};

export default LessonList;