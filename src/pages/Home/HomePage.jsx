import React, { useContext, useEffect, useState } from "react";
import { Card, Row, Col, Table, message } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  FileTextOutlined,
  DollarOutlined
} from "@ant-design/icons";
import { AuthContext } from "../../component/context/authContext";
import "./HomePage.css";
import { getAchievements } from "../../util/api";

const HomePage = () => {
  const [data, setData] = useState([])

  const { auth } = useContext(AuthContext);
  useEffect(() => {
    const getData = async () => {
      const res = await getAchievements()
      if (res) {
        setData(res.data)
      }
      else {
        message.error("lỗi nhận dữ liệu")
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
      title: "Tên học sinh",
      dataIndex: "name",
      width: 370
    },
    {
      title: "Lớp",
      dataIndex: "class",
      width: 250
    },
    {
      title: "Điểm",
      dataIndex: "result",
      width: 150
    },
    {
      title: "Bài giảng",
      render: (item) => (
        <p>
          {item?.lecture.title}
        </p>
      )
    },
    {
      title: "Thời gian nộp bài",
      render: (item) => (
        <p>
          {new Date(item?.createdAt).toLocaleString("vi-VN")}
        </p>
      )
    },
  ];


  return (
    <div className="dashboard-container">

      <div className="dashboard-header">
        <h1>Xin chào {auth?.user?.name || "Admin"} 👋</h1>
        <p>Chào mừng bạn quay lại hệ thống quản trị</p>
      </div>
      <h3>Danh sách học sinh nộp bài</h3>
      <br />
      {/* <Row gutter={20}>

        <Col span={6}>
          <Card className="stat-card">
            <UserOutlined className="stat-icon blue" />
            <div>
              <h2>120</h2>
              <p>Người dùng</p>
            </div>
          </Card>
        </Col>

        <Col span={6}>
          <Card className="stat-card">
            <ShoppingCartOutlined className="stat-icon green" />
            <div>
              <h2>58</h2>
              <p>Sản phẩm</p>
            </div>
          </Card>
        </Col>

        <Col span={6}>
          <Card className="stat-card">
            <FileTextOutlined className="stat-icon orange" />
            <div>
              <h2>32</h2>
              <p>Đơn hàng</p>
            </div>
          </Card>
        </Col>

        <Col span={6}>
          <Card className="stat-card">
            <DollarOutlined className="stat-icon red" />
            <div>
              <h2>$12,500</h2>
              <p>Doanh thu</p>
            </div>
          </Card>
        </Col>

      </Row> */}
      <Table
        columns={columns}
        dataSource={data}
        rowKey="_id"
      />

    </div>
  );
};

export default HomePage;