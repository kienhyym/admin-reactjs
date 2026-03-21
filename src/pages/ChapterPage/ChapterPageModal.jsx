import { Modal, Form, Input, Upload, Button } from "antd";

const AddChapterModal = ({ open, onCancel, onSubmit }) => {

    const [form] = Form.useForm();

    const handleOk = () => {
        form.validateFields().then(values => {
            onSubmit(values);
            form.resetFields();
        });
    };

    return (
        <Modal
            title="Thêm nội dung chương học"
            open={open}
            onCancel={onCancel}
            onOk={handleOk}
        >

            <Form
                form={form}
                layout="vertical"
            >

                <Form.Item
                    label="Tiêu đề"
                    name="title"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="Nhập tiêu đề chương học" />
                </Form.Item>

                <Form.Item
                    label="Tên chương"
                    name="name"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="Nhập tên chương học" />
                </Form.Item>
            </Form>

        </Modal>
    );
};

export default AddChapterModal;