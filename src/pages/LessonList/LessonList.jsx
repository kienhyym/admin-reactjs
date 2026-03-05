import React from "react";
import LessonCard from "./LessonCard/LessonCard";
import "./LessonList.css";
import lessons from "../../data/LessonListdata";


const LessonList = () => {
  return (
    <div className="lesson-container">
      <h1 className="page-title">📚 Danh sách bài giảng</h1>

      <div className="lesson-grid">
        {lessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </div>
  );
};

export default LessonList;