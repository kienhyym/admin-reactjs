import React, { useContext, useEffect, useState } from "react";
import { Table, Button, Space, Input, message, Image } from "antd";
import {
  EditOutlined,
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
      message.error(res.message)
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
      key: "title",
    },
    {
      title: "Số lượng video",
      dataIndex: "videos",
      width: 170,
      render: (videos) => (
        <p >
          {videos?.length}
        </p>
      )
    },
    {
      title: "hình ảnh",
      dataIndex: "thumbnail",
      width: 170,
      render: (data) => (
        <div className="image-small">
          {data ? <  Image src={data} /> : <p>NO IMAGE</p>}
        </div>
      )
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
      width: 310,
      render: (item) => (
        <Space>
          <Button type="primary" icon={<EyeOutlined />} onClick={() => navigate(item._id)} >
            Chi tiết</Button>
          <Button type="primary" icon={<EditOutlined />} onClick={() => navigate("/exam/" + item._id)} >
            quản lý đề thi
          </Button>
        </Space>
      )
    }
  ];

  // thêm bài giảng
  const handleAddLesson = async (values, form) => {
    try {
      setFullPageLoading(true)
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("status", values.status);


      // thumbnail
      if (values?.thumbnail?.length > 0) {
        formData.append(
          "thumbnail",
          values.thumbnail[0].originFileObj
        );
      }
      if (values?.videos && values?.videos.length > 0) {
        values.videos.forEach(file => {
          formData.append("videos", file.originFileObj);
        });
      }

      const res = await uploadBaiGiang(values.chapterId, formData);
      if (res) {
        getData();
        message.success("Thêm bài giảng thành công");
        form.resetFields();
      }
      setFullPageLoading(false)
      setOpenModal(false);

    } catch (error) {
      setFullPageLoading(false)
      message.error("Tạo bài giảng thất bại");
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
            Thêm bài giảng
          </Button>

        </div>

      </div>
      {data.map((item) => {
        return (
          <div key={item._id}>
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
          </div>)
      })}


      <AddLessonModal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onSubmit={handleAddLesson}
        data={data}
      />

    </div>
  );
};

export default LessonList;