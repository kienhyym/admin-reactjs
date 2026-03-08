import React, { useState } from "react";
import { Form, Input, Upload, Button, message, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { uploadBaiGiang } from "../../util/api";

const AddLectureForm = () => {

  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = ({ fileList: newFileList }) => {

    const uniqueFiles = [];
    const fileNames = new Set();

    newFileList.forEach(file => {
      if (!fileNames.has(file.name)) {
        fileNames.add(file.name);
        uniqueFiles.push(file);
      } else {
        message.warning(`File ${file.name} đã được chọn`);
      }
    });

    setFileList(uniqueFiles);
  };

  const handleSubmit = async (values) => {

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", values.title);

      fileList.forEach(file => {
        formData.append("videos", file.originFileObj);
      });

      await uploadBaiGiang(formData)

      message.success("Upload thành công");

      setFileList([]);

    } catch (error) {
      message.error("Upload thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading} tip="Đang upload video...">

      <Form layout="vertical" onFinish={handleSubmit}>

        <Form.Item
          label="Tên bài giảng"
          name="title"
          rules={[{ required: true }]}
        >
          <Input placeholder="Nhập tên bài giảng" />
        </Form.Item>

        <Form.Item label="Upload video">

          <Upload
            beforeUpload={() => false}
            multiple
            fileList={fileList}
            onChange={handleChange}
          >
            <Button icon={<UploadOutlined />}>
              Chọn video
            </Button>
          </Upload>

        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
        >
          Lưu bài giảng
        </Button>

      </Form>

    </Spin>
  );
};

export default AddLectureForm;