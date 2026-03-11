import React, { useEffect, useState } from "react";
import { Card, Upload, Button, Table, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { getQuestionsByLecture, importQuizz } from "../../util/api";

const QuizDetail = () => {

  const { lessonId } = useParams();
  const id = lessonId
  const [questions, setQuestions] = useState([]);
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

        <Table
          columns={columns}
          dataSource={questions}
          rowKey={(record, index) => {
            return record._id
          }}
        />

      </Card>

    </div>
  );
};

export default QuizDetail;