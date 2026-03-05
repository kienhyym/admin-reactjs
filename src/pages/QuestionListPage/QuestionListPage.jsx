import React from "react";
import { useNavigate } from "react-router-dom";
import lessons from "../../data/LessonListdata";
import "./QuestionListPage.css";

const QuestionListPage = () => {
  const navigate = useNavigate();

  return (
    <div className="question-container">
      <h1 className="page-title">🧪 Câu hỏi ôn tập theo bài</h1>

      <div className="question-grid">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="question-card">
            <div className="question-info">
              <h3>{lesson.title}</h3>
              <p>{lesson.videoUrl.length * 5} câu hỏi</p>
            </div>

            <button
              className="start-btn"
              onClick={() => navigate(`/quiz/${lesson.id}`)}
            >
              Làm bài
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionListPage;