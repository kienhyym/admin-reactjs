import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

const Header = () => {
    const navifate = useNavigate();
    const { auth,setAtuh } = useContext(AuthContext)
    const [current, setCurrent] = useState('mail');

    console.log('auth:', auth)
    const items = [
        {
            label: <Link to="/">home page</Link>,
            key: 'home',
            icon: <MailOutlined />,
        },
        ...(auth?.isAuthenticated ? [{
            label: <Link to="/user">user page</Link>,
            key: 'user',
            icon: <MailOutlined />,
        }] : []),

        {
            label: `xin chao ${auth?.user?.name || "chua dang nhap"}`,
            key: 'SubMenu',
            icon: <SettingOutlined />,
            children: [

                ...(!auth?.isAuthenticated ? [{
                    label: <Link to="/login">login </Link>,
                    key: 'login',
                }] : [{
                    label: <span onClick={() => {
                        console.log('logout');
                        setAtuh({
                            isAuthenticated: false,
                            user: {
                                name: '',
                                email: ''
                            },
                        })
                        localStorage.clear("token");
                        
                        setCurrent("home");
                        navifate("/")
                    }}>logout</span>,
                    key: 'logout',
                }]),



            ],
        },
    ];
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};
export default Header;