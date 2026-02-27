import React from 'react';
import { Button, Checkbox, Form, Input, notification } from 'antd';
import { createrUserApi } from '../util/api';
import { useNavigate } from 'react-router-dom';


const RegisterPage = () => {
    const navigate = useNavigate();
    const onFinish = async (values) => {
        console.log('Success:', values);
        const { name, email, password } = values;
        const res = await createrUserApi(name, email, password);
                console.log('res:', res);

        if (res) {
            notification.success({
                message: 'Đăng ký thành công',
                description: 'Bạn đã đăng ký thành công tài khoản',
            });
            navigate('/login');
        } else {
            notification.error({
                message: 'Đăng ký thất bại',
                description: 'Có lỗi xảy ra khi đăng ký tài khoản',
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
                label="name"
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="email"
                name="email"
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
export default RegisterPage;