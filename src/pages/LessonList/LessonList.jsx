import React from "react";
import LessonCard from "./LessonCard/LessonCard";
import "./LessonList.css";

const lessons = [
  {
    id: 1,
    title: "Giới thiệu ReactJS",
    thumbnail: "https://img.youtube.com/vi/dGcsHMXbSOA/maxresdefault.jpg",
  },
  {
    id: 2,
    title: "React Hooks từ A-Z",
    thumbnail: "https://img.youtube.com/vi/Tn6-PIqc4UM/maxresdefault.jpg",
  },
  {
    id: 3,
    title: "Quản lý State nâng cao",
    thumbnail: "https://img.youtube.com/vi/35lXWvCuM8o/maxresdefault.jpg",
  },
  {
    id: 4,
    title: "Quản lý State nâng cao",
    thumbnail: "https://img.youtube.com/vi/35lXWvCuM8o/maxresdefault.jpg",
  },
  {
    id: 5,
    title: "Quản lý State nâng cao",
    thumbnail: "https://img.youtube.com/vi/35lXWvCuM8o/maxresdefault.jpg",
  },
  {
    id: 6,
    title: "Quản lý State nâng cao",
    thumbnail: "https://img.youtube.com/vi/35lXWvCuM8o/maxresdefault.jpg",
  },
  {
    id: 7,
    title: "Quản lý State nâng cao",
    thumbnail: "https://img.youtube.com/vi/35lXWvCuM8o/maxresdefault.jpg",
  },
];

const LessonList = () => {
  return (
    <div className="lesson-container">
      <h1>📚 Danh sách bài giảng</h1>

      <div className="lesson-grid">
        {lessons.map((lesson) => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </div>
  );
};

export default LessonList;