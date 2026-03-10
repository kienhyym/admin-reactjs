import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./QuestionListPage.css";
import {  getLecturesApi } from "../../util/api";
import QuestionListPageCard from "./QuestionListPageCard/QuestionListPageCard";

const QuestionListPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([])
  useEffect(() => {
    const festAccount = async () => {
      const res = await getLecturesApi()
      if (res) {
        setData(res.data)
      }
      else {
        console.log("res lectures error:");
      }
    }
    festAccount()
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