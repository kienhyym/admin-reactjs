import { Modal, Form, Input, Upload, Button, Switch, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const AddLessonModal = ({ open, onCancel, onSubmit, data }) => {
    console.log("đâsd", data)

    const [form] = Form.useForm();
    const handleOk = () => {
        form.validateFields().then(values => {
            onSubmit(values,form);
        });
    };

    return (
        <Modal
            title="Thêm bài giảng"
            open={open}
            onCancel={onCancel}
            onOk={handleOk}
        >

            <Form
                form={form}
                layout="vertical"
            >
                <Form.Item
                    label="Chương học"
                    name="chapterId"
                    rules={[{ required: true, message: "Chọn chương học" }]}
                >
                    <Select placeholder="Chọn chương học">
                        {data?.map((c) => (
                            <Select.Option key={c._id} value={c._id}>
                                {c.title} {c.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Tên bài giảng"
                    name="title"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="Nhập tên bài giảng" />
                </Form.Item>
                <Form.Item
                    label="Hình ảnh"
                    name="thumbnail"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => e?.fileList}
                >
                    <Upload
                        beforeUpload={() => false}
                        maxCount={1}
                        listType="picture"
                        accept="image/*"
                    >
                        <Button icon={<UploadOutlined />}>
                            Upload hình ảnh
                        </Button>
                    </Upload>
                </Form.Item>
                <Form.Item
                    label="Upload video"
                    name="videos"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => e?.fileList}
                >
                    <Upload
                        beforeUpload={() => false}
                        multiple
                        accept="video/*"
                    >
                        <Button icon={<UploadOutlined />}>
                            Chọn video
                        </Button>
                    </Upload>
                </Form.Item>
                <Form.Item
                    label="Trạng thái hiển thị"
                    name="status"
                    valuePropName="checked"
                    initialValue={true}
                >
                    <Switch
                        checkedChildren="Hiển thị"
                        unCheckedChildren="Ẩn"
                    />
                </Form.Item>
            </Form>

        </Modal>
    );
};

export default AddLessonModal;