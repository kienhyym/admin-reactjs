import React, { useContext, useEffect, useState } from "react";
import "./QuestionListPage.css";
import { getLecturesApi } from "../../util/api";
import QuestionListPageCard from "./QuestionListPageCard/QuestionListPageCard";
import { AuthContext } from "../../component/context/authContext";
import { message } from "antd";

const QuestionListPage = () => {
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
  return (
    <div className="question-container">
      <h1 className="page-title">🧪 Câu hỏi ôn tập theo bài</h1>
      <div className="question-grid">
        {data.map((lesson) => (<QuestionListPageCard data={lesson} key={lesson._id} />))}
      </div>

    </div>
  );
};

export default QuestionListPage;