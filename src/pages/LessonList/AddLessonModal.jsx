import { Modal, Form, Input, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const AddLessonModal = ({ open, onCancel, onSubmit, loading }) => {

  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then(values => {
      onSubmit(values);
      form.resetFields();
    });
  };

  return (
    <Modal
      title="Thêm bài giảng"
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
          label="Tên bài giảng"
          name="title"
          rules={[{ required: true }]}
        >
          <Input placeholder="Nhập tên bài giảng" />
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
          >
            <Button icon={<UploadOutlined />}>
              Chọn video
            </Button>
          </Upload>
        </Form.Item>

      </Form>

    </Modal>
  );
};

export default AddLessonModal;