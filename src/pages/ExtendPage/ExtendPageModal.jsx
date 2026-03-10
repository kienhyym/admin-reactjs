import { Modal, Form, Input, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const AddExtendModal = ({ open, onCancel, onSubmit, loading }) => {

    const [form] = Form.useForm();

    const handleOk = () => {
        form.validateFields().then(values => {
            onSubmit(values);
            form.resetFields();
        });
    };

    return (
        <Modal
            title="Thêm nội dung mở rộng"
            open={open}
            onCancel={onCancel}
            onOk={handleOk}
            confirmLoading={loading}
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
                    <Input placeholder="Nhập tiêu đề nội dung bài giảng" />
                </Form.Item>

                <Form.Item
                    label="đường dẫn tài liệu"
                    name="link"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="Nhập url" />
                </Form.Item>

                <Form.Item
                    label="Upload video"
                    name="videos"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => e?.fileList}
                >
                    <Upload beforeUpload={() => false} >
                        <Button icon={<UploadOutlined />}>
                            Chọn video
                        </Button>
                    </Upload>
                </Form.Item>

            </Form>

        </Modal>
    );
};

export default AddExtendModal;