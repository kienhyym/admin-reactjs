import React, { useState } from 'react';
import {
    PlayCircleOutlined,
    QuestionCircleOutlined,
    BookOutlined,
    AppstoreOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import "./header.css"

const Header = () => {
    const navifate = useNavigate();
    const { auth, setAtuh } = useContext(AuthContext)
    const location = useLocation();

    console.log('auth:', auth)
    const items = [
        {
            label: <Link to="/lessons">Video bài giảng</Link>,
            key: 'lessons',
            icon: <PlayCircleOutlined />,
        },
        {
            label: <Link to="/quiz">Câu hỏi ôn tập</Link>,
            key: 'quiz',
            icon: <QuestionCircleOutlined />,
        },
        {
            label: <Link to="/knowledge">Tổng hợp kiến thức</Link>,
            key: 'knowledge',
            icon: <BookOutlined />,
        },
        {
            label: <Link to="/extend">Mở rộng</Link>,
            key: 'extend',
            icon: <AppstoreOutlined />,
        },
    ];

    return <Menu
        className="header-menu"
        selectedKeys={[location.pathname]}
        mode="horizontal" items={items} />;
};
export default Header;