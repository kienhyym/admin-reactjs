import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const Header = () => {
    const items = [
        {
            label: <Link to="/">home page</Link>,
            key: 'home',
            icon: <MailOutlined />,
        },
        {
            label: <Link to="/user">user page</Link>,
            key: 'user',
            icon: <MailOutlined />,
        },
        {
            label: 'Navigation Three - Submenu',
            key: 'SubMenu',
            icon: <SettingOutlined />,
            children: [
                {
                    label: 'đăng nhập',
                    key: 'login',
                },
                {
                    label: 'đăng xuất',
                    key: 'logout',
                },
            ],
        },
    ];
    const [current, setCurrent] = useState('mail');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};
export default Header;