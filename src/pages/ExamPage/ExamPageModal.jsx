import { Modal, Form, Input, Upload, Button, Switch, Select } from "antd";

const AddExamModal = ({ open, onCancel, onSubmit }) => {

    const [form] = Form.useForm();

    const handleOk = () => {
        form.validateFields().then(values => {
            onSubmit(values);
            form.resetFields();
        });
    };

    return (
        <Modal
            title="Thêm đề thi"
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
                    label="Thời gian thi"
                    name="timeLimit"
                >
                    <Input placeholder="Nhập thời gian thi" />
                </Form.Item>
                <Form.Item
                    label="Số lượng câu hỏi"
                    name="totalQuestion"
                >
                    <Input placeholder="Nhập số lượng câu hỏi" />
                </Form.Item>

                <Form.Item
                    label="loại đề"
                    name="type"
                    rules={[{ required: true, message: "Chọn loại đề" }]}
                >
                    <Select placeholder="Chọn chương học" >
                        {[{ value: "experiment", name: "Đề ôn tập" }, { value: "exam", name: "Đề thi" }]?.map((c) => (
                            <Select.Option key={c.value} value={c.value}>
                                {c.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Trạng thái hiển thị"
                    name="status"
                    valuePropName="checked"
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

export default AddExamModal;