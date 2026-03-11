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
                    label="đường dẫn tài liệu"
                    name="link"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="Nhập url" />
                </Form.Item>

               <Form.Item
                    label="image"
                    name="image"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => e?.fileList}
                >
                    <Upload
                        beforeUpload={() => false}
                        maxCount={1}
                        listType="picture"
                    >
                        <Button icon={<UploadOutlined />}>
                            Upload image
                        </Button>
                    </Upload>
                </Form.Item>

            </Form>

        </Modal>
    );
};

export default AddKnowledgeModal;