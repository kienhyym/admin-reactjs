import React, { useContext, useEffect, useState } from "react";
import { Card, Upload, Button, Table, message, Space } from "antd";
import { EyeOutlined, UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { createQuestion, getQuestions, importQuizz } from "../../util/api";
import AddQuestionModal from "./AddQuestionModal";
import { AuthContext } from "../../component/context/authContext";

const QuizDetail = () => {
  const navigate = useNavigate()
  const { examId } = useParams();
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const { setFullPageLoading } = useContext(AuthContext)

  const handleAddQuestion = async (values) => {
    try {
      setFullPageLoading(true)
      const res = await createQuestion(examId, values)
      if (res?.status === 'ok') {
        message.success("Tạo thành công")
        getData()
        setOpenModal(false)
      } else {
        message.error(res.message)
      }
      setFullPageLoading(false)
    } catch (error) {
      message.error(error.message)
    }
  };
  const getData = async () => {
    try {
      setFullPageLoading(true)
      const res = await getQuestions(examId)
      if (res) {
        setQuestions(res.data.questions)
        setTitle(`${res.data.lectureTitle}: ${res.data.examTitle}`)
      }
      else {
        message.error(res?.message)
      }
      setFullPageLoading(false)
    } catch (error) {
      setFullPageLoading(false)
      message.error(error?.message)
    }

  }
  useEffect(() => {
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
          <Button type="primary" icon={<EyeOutlined />} onClick={() => navigate("question/" + item._id)} />
        </Space>
      )
    }
  ];
  
  const handleImport = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      await importQuizz(examId, formData);
      message.success("Import câu hỏi thành công");
    } catch (error) {
      message.error("Import thất bại");
    }
  };

  return (
    <div style={{ padding: 20 }}>

      <Card
        title={title}
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
          pagination={false}
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