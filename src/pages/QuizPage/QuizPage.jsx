import React, { useEffect, useState } from "react";
import { Card, Upload, Button, Table, message, Space } from "antd";
import { EyeOutlined, UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { createQuestionWithOptions, getQuestionsByLecture, importQuizz } from "../../util/api";
import AddQuestionModal from "./AddQuestionModal";

const QuizDetail = () => {
  const navigate = useNavigate()
  const { lessonId } = useParams();
  const id = lessonId
  const [questions, setQuestions] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const handleAddQuestion = async (values) => {
    try {
      console.log("12345676809", id)
      await createQuestionWithOptions(id, values)
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    const getData = async () => {
      const res = await getQuestionsByLecture(id)
      if (res) {
        setQuestions(res.questions)
      }
      else {
        console.log("res lectures error:");
      }
    }
    getData()
  }, [])

  const columns = [
    {
      title: "STT",
      render: (_, __, index) => index + 1,
      width: 60
    },
    {
      title: "Câu hỏi",
      dataIndex: "content"
    },
    {
      title: "Loại câu hỏi",
      dataIndex: "type"
    },
     {
      title: "hành động",
      render: (item) => (
        <Space>
          <Button type="primary" icon={<EyeOutlined />} onClick={() => navigate("question/"+item._id)} />
        </Space>
      )
    }
  ];
  const handleImport = async (file) => {

    try {

      const formData = new FormData();
      formData.append("file", file);
      await importQuizz(lessonId, formData);

      message.success("Import câu hỏi thành công");

    } catch (error) {

      message.error("Import thất bại");

    }

  };

  return (
    <div style={{ padding: 20 }}>

      <Card
        title={`Quiz ${id}`}
        extra={
          <Upload
            accept=".json"
            showUploadList={false}
            beforeUpload={(file) => {
              handleImport(file);
              return false;
            }}
          >

            <Button icon={<UploadOutlined />}>
              Import JSON
            </Button>
          </Upload>
        }
      >
        <Button type="primary" onClick={() => setOpenModal(true)}>
          Thêm câu hỏi
        </Button>
        <Table
          columns={columns}
          dataSource={questions}
          rowKey={(record, index) => {
            return record._id
          }}
        />

      </Card>

      <AddQuestionModal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onSubmit={handleAddQuestion} />

    </div>
  );
};

export default QuizDetail;