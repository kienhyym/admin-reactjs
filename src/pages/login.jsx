import React, { useContext } from 'react';
import { Button, Form, Input, notification } from 'antd';
import { loginApi } from '../util/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../component/context/authContext';


const LoginPage = () => {
    const navigate = useNavigate();
    const { setAtuh } = useContext(AuthContext)
    const onFinish = async (values) => {
        const { email, password } = values;
        const res = await loginApi(email, password);
        console.log('res:', res);

        if (res && res.EC === 0) {
            localStorage.setItem("token", res.access_token);
            notification.success({
                message: 'Đăng nhập thành công',
                description: 'Bạn đã đăng nhập thành công tài khoản',
            });
            setAtuh({
                isAuthenticated: true,
                user: {
                    name: res?.user?.name,
                    email: res?.user?.email1
                },
            })
            navigate('/');
        } else {
            notification.error({
                message: 'Đăng nhập thất bại',
                description: 'Có lỗi xảy ra khi đăng nhập tài khoản',
            });
        }
    };
    return (
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off"
        >

            <Form.Item
                label="email"
                name="email"
                values='kienhyym@gmail.com'
                rules={[
                    {
                        required: true,
                        message: 'Please input your email!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                defaultValue="123"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',

                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form >
    )
};
export default LoginPage;
