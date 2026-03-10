import React, { useContext } from "react";
import { Form, Input, Button, notification } from "antd";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../component/context/authContext";
import { loginApi } from "../../util/api";

const LoginPage = () => {

   const navigate = useNavigate();
  const { setAtuh } = useContext(AuthContext);

  const onFinish = async (values) => {
    const { email, password } = values;

    const res = await loginApi(email, password);
    if (res && res.EC === 0) {
      localStorage.setItem("token", res.access_token);

      notification.success({
        message: "Đăng nhập thành công",
        description: "Chào mừng bạn quay lại hệ thống",
      });

      setAtuh({
        isAuthenticated: true,
        user: {
          name: res?.user?.name,
          email: res?.user?.email,
        },
      });

      navigate("/");
    } else {
      notification.error({
        message: "Đăng nhập thất bại",
        description: "Sai email hoặc mật khẩu",
      });
    }
  };


  return (
    <div className="login-page">

      <div className="login-card">

        <h2 className="login-title">Admin Dashboard</h2>
        <p className="login-subtitle">Đăng nhập để tiếp tục</p>

        <Form layout="vertical" onFinish={onFinish}>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập email" }]}
          >
            <Input placeholder="example@gmail.com" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
          >
            <Input.Password placeholder="Nhập mật khẩu" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            className="login-button"
          >
            Đăng nhập
          </Button>

        </Form>

      </div>

    </div>
  );
};

export default LoginPage;