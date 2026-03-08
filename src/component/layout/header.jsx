import React, { useContext } from "react";
import {
    PlayCircleOutlined,
    QuestionCircleOutlined,
    BookOutlined,
    AppstoreOutlined,
    LogoutOutlined
} from "@ant-design/icons";
import { Menu, Button } from "antd";
import { Link, useLocation, } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import "./header.css";

const Header = () => {
    const location = useLocation();
    const { setAtuh, setLoading } = useContext(AuthContext);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setAtuh({
            isAuthenticated: false,
            user: { EC: 0 }
        });
        setLoading(true);
    };

    const items = [
        {
            label: <Link to="/lessons">Quản lý bài giảng</Link>,
            key: "/lessons",
            icon: <PlayCircleOutlined />,
        },
        {
            label: <Link to="/quiz">Quản lý câu hỏi</Link>,
            key: "/quiz",
            icon: <QuestionCircleOutlined />,
        },
        {
            label: <Link to="/knowledge">Quản lý kiến thức</Link>,
            key: "/knowledge",
            icon: <BookOutlined />,
        },
        {
            label: <Link to="/extend">Quản lý mở rộng</Link>,
            key: "/extend",
            icon: <AppstoreOutlined />,
        },
    ];

    return (
        <div className="sidebar">

            {/* Logo */}
            <Link to="/" className="logo">
                <img
                    src="/image/logo8_transparent.png"
                    alt="logo"
                    className="menu-logo"
                />
            </Link>

            {/* Menu */}
            <Menu
                className="sidebar-menu"
                selectedKeys={[location.pathname]}
                mode="inline"
                items={items}
            />

            {/* Logout */}
            <div className="logout-container">
                <Button
                    danger
                    icon={<LogoutOutlined />}
                    onClick={handleLogout}
                    block
                >
                    Đăng xuất
                </Button>
            </div>

        </div>
    );
};

export default Header;