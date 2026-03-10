import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./QuestionListPageCard.css";
import { getCountExamStatusByLecture } from "../../../util/api";
import { message } from "antd";

const QuestionListPageCard = ({ data }) => {
    const navigate = useNavigate();
    const [count, setCount] = useState([])
    useEffect(() => {
        const festAccount = async () => {
            const res = await getCountExamStatusByLecture(data._id)
            if (res) {
                setCount(res)
            }
            else {
                console.log("res lectures error:");
            }
        }
        festAccount()
    }, [])
    return (
        <div key={data._id} className="question-card">
            <div className="question-info">
                <h3>{data?.title}</h3>
                <p>{count?.open} câu hỏi đang mở - {count?.closed} câu hỏi đang đóng</p>
            </div>

            <button
                className="start-btn" 
                onClick={() => navigate(`/quiz/${data._id}`)}
            >
                Làm bài
            </button>
        </div>
    );
};

export default QuestionListPageCard;