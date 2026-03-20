import React, { useContext, useEffect, useState } from "react";
import { Card, Upload, Button, Table, message, Space } from "antd";
import { EyeOutlined, UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { createQuestionWithOptions, getQuestionsByLecture, importQuizz } from "../../util/api";
import AddQuestionModal from "./AddQuestionModal";
import { AuthContext } from "../../component/context/authContext";

const QuizDetail = () => {
  const navigate = useNavigate()
  const { lessonId } = useParams();
  const id = lessonId
  const [questions, setQuestions] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const { setFullPageLoading } = useContext(AuthContext)

  const handleAddQuestion = async (values) => {
    try {
      setFullPageLoading(true)
      const res = await createQuestionWithOptions(id, values)
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
      const res = await getQuestionsByLecture(id)
      if (res) {
        setQuestions(res.questions)
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