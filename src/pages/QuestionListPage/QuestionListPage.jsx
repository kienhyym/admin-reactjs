import React, { useContext, useEffect, useState } from "react";
import "./QuestionListPage.css";
import { getLecturesApi } from "../../util/api";
import { AuthContext } from "../../component/context/authContext";
import { Button, message, Space, Table } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const QuestionListPage = () => {
  const navigate = useNavigate();
  const { setFullPageLoading } = useContext(AuthContext)
  const [data, setData] = useState([])
  const getData = async () => {
    try {
      setFullPageLoading(true)
      const res = await getLecturesApi()
      if (res) {
        setData(res.data)
      }
      else {
        message.error(res?.message)
      }
      setFullPageLoading(false)
    } catch (error) {
      message.error(error?.message)
      setFullPageLoading(false)
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
      title: "Bài giảng",
      dataIndex: "title"
    },
    {
      title: "hành động",
      render: (item) => (
        <Space>
          <Button type="primary" icon={<EyeOutlined />} onClick={() => navigate(item._id)} />
        </Space>
      )
    }
  ];

  return (
    <div className="question-list-page">
      <div className="question-list-header">
        <h2>Câu hỏi ôn tập theo bài</h2>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey={(lesson) => {
          return lesson._id
        }}
      />
    </div>
  );
};

export default QuestionListPage;