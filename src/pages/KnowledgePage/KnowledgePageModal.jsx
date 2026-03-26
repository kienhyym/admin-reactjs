import { Modal, Form, Input, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const AddKnowledgeModal = ({ open, onCancel, onSubmit, loading }) => {

    const [form] = Form.useForm();

    const handleOk = () => {
        form.validateFields().then(values => {
            onSubmit(values);
            form.resetFields();
        });
    };

    return (
        <Modal
            title="Thêm nội dung kiến thức mở rộng"
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
                    label={<p>Nội dung (<i>hình ảnh hoặc pdf)</i></p>}
                    name="image"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => e?.fileList}
                >
                    <Upload
                        beforeUpload={() => false}
                        maxCount={1}
                        listType="picture"
                        accept=".pdf,image/*"
                    >
                        <Button icon={<UploadOutlined />}>
                          Tải nội dung lên
                        </Button>
                    </Upload>
                </Form.Item>

            </Form>
        </Modal>
    );
};

export default AddKnowledgeModal;