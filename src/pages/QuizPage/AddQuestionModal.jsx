import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Upload,
  Button,
  Radio,
  Checkbox,
  Space
} from "antd";
import {
  UploadOutlined,
  DeleteOutlined,
  PlusOutlined
} from "@ant-design/icons";

const { TextArea } = Input;

const QuizBuilderModal = ({ open, onCancel, onSubmit }) => {

  const [form] = Form.useForm();

  const [type, setType] = useState("single");
  const [correctAnswer, setCorrectAnswer] = useState(null);

  const handleOk = async () => {

    try {

      const values = await form.validateFields();

      const formData = new FormData();

      // question
      formData.append("question", values.question);

      formData.append("type", type);

      // question image
      if (values.questionImage?.length > 0) {
        formData.append(
          "questionImage",
          values.questionImage[0].originFileObj
        );
      }

      // single correct answer
      if (type === "single") {
        formData.append("correctAnswer", correctAnswer);
      }

      // boolean
      if (type === "boolean") {
        formData.append("correctAnswer", values.correctAnswer);
      }

      // options
      if (values.options) {

        values.options.forEach((option, index) => {

          formData.append(`options[${index}][text]`, option.text);

          if (type === "multiple") {
            formData.append(
              `options[${index}][isCorrect]`,
              option.isCorrect || false
            );
          }

          if (option.image?.length > 0) {
            formData.append(
              `options[${index}][image]`,
              option.image[0].originFileObj
            );
          }

        });

      }

      onSubmit(formData);

    } catch (error) {
    console.log('erroe',error);
    }

  };

  return (
    <Modal
      title="Thêm câu hỏi"
      open={open}
      onCancel={onCancel}
      onOk={handleOk}
      width={900}
    >

      <Form form={form} layout="vertical">

        {/* QUESTION */}

        <Form.Item label="Câu hỏi">

          <Space align="start">

            <Form.Item
              name="question"
              rules={[{ required: true, message: "Enter question" }]}
              noStyle
            >
              <TextArea
                rows={3}
                placeholder="Enter question..."
                style={{ width: 600, height: 100 }}
              />
            </Form.Item>

            <Form.Item
              name="questionImage"
              valuePropName="fileList"
              getValueFromEvent={(e) => e?.fileList}
              style={{ marginBottom: 0 }}
            >
              <Upload
                beforeUpload={() => false}
                maxCount={1}
                listType="picture-card"
              >
                <UploadOutlined />
              </Upload>
            </Form.Item>

          </Space>

        </Form.Item>

        {/* TYPE */}

        <Form.Item label="Loại câu hỏi">

          <Radio.Group
            value={type}
            onChange={(e) => setType(e.target.value)}
          >

            <Radio value="single">Single</Radio>

            <Radio value="multiple">Multiple</Radio>

          </Radio.Group>

        </Form.Item>

        {/* TRUE FALSE */}

        {type === "boolean" && (

          <Form.Item name="correctAnswer">

            <Radio.Group>

              <Radio value={true}>True</Radio>

              <Radio value={false}>False</Radio>

            </Radio.Group>

          </Form.Item>

        )}

        {/* ANSWERS */}

        {type !== "boolean" && (

          <Form.List
            name="options"
            initialValue={[{}, {}, {}, {}]}
          >

            {(fields, { add, remove }) => (

              <>

                {fields.map((field, index) => (

                  <Space
                    key={field.key}
                    align="center"
                    style={{
                      display: "flex",
                      marginBottom: 12
                    }}
                  >

                    {/* SINGLE */}

                    {type === "single" && (

                      <Radio
                        checked={correctAnswer === index}
                        onChange={() => setCorrectAnswer(index)}
                      />

                    )}

                    {/* MULTIPLE */}

                    {type === "multiple" && (

                      <Form.Item
                        name={[field.name, "isCorrect"]}
                        valuePropName="checked"
                        style={{ marginBottom: 0 }}
                      >

                        <Checkbox />

                      </Form.Item>

                    )}

                    {/* TEXT */}

                    <Form.Item
                      {...field}
                      name={[field.name, "text"]}
                      rules={[{ required: true }]}
                      style={{ marginBottom: 0 }}
                    >

                      <Input
                        placeholder={`Answer ${String.fromCharCode(
                          65 + index
                        )}`}
                        style={{ width: 350 }}
                      />

                    </Form.Item>

                    {/* IMAGE */}

                    <Form.Item
                      name={[field.name, "image"]}
                      valuePropName="fileList"
                      getValueFromEvent={(e) => e?.fileList}
                      style={{ marginBottom: 0 }}
                    >

                      <Upload
                        beforeUpload={() => false}
                        maxCount={1}
                        listType="picture-card"
                      >

                        <UploadOutlined />

                      </Upload>

                    </Form.Item>

                    {/* DELETE */}

                    <DeleteOutlined
                      onClick={() => remove(field.name)}
                      style={{
                        color: "red",
                        fontSize: 18
                      }}
                    />

                  </Space>

                ))}

                <Button
                  icon={<PlusOutlined />}
                  onClick={() => add()}
                >

                  Thêm câu trả lời

                </Button>

              </>

            )}

          </Form.List>

        )}

      </Form>

    </Modal>
  );

};

export default QuizBuilderModal;