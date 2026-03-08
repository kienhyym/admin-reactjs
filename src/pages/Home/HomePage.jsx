import React, { useContext } from "react";
import { Card, Row, Col } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  FileTextOutlined,
  DollarOutlined
} from "@ant-design/icons";
import { AuthContext } from "../../component/context/authContext";
import "./HomePage.css";

const HomePage = () => {

  const { auth } = useContext(AuthContext);

  return (
    <div className="dashboard-container">

      <div className="dashboard-header">
        <h1>Xin chào {auth?.user?.name || "Admin"} 👋</h1>
        <p>Chào mừng bạn quay lại hệ thống quản trị</p>
      </div>

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

    </div>
  );
};

export default HomePage;