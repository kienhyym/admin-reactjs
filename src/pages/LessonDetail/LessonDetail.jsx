import React, { useState } from "react";
import "./LessonDetail.css";
import { useParams } from "react-router-dom";

const lessons = [
    { id: 1, title: "Giới thiệu ReactJS" },
    { id: 2, title: "JSX và Component" },
    { id: 3, title: "State và Props" },
    { id: 4, title: "React Hooks" },
];

const LessonDetail = () => {
    const [currentLesson, setCurrentLesson] = useState(lessons[0]);
    const { id } = useParams();
    const lesson = lessons.find((l) => l.id === Number(id));

    if (!lesson) {
        return <h2 style={{ padding: 40 }}>Không tìm thấy bài học</h2>;
    }

    return (
        <div className="lesson-detail-container">

            {/* Main Content */}
            <div className="lesson-main">
                <div className="video-wrapper">
                    <iframe
                        src="https://www.youtube.com/embed/cbzxdGT7TO4?si=yGKLKE1JnBhgG9qd"
                        title="Video bài giảng"
                        allowFullScreen
                    />
                </div>

                <div className="lesson-info">
                    <h2>{lesson.title}</h2>
                    <p>
                        Đây là nội dung bài giảng giúp bạn hiểu rõ kiến thức nền tảng
                        trước khi đi vào các phần nâng cao.
                    </p>

                    <div className="lesson-navigation">
                        <button className="nav-btn">⬅ Bài trước</button>
                        <button className="nav-btn primary">Bài tiếp theo ➡</button>
                    </div>
                </div>
            </div>

            {/* Sidebar */}
            <div className="lesson-sidebar">
                <h3>📚 Danh sách bài học</h3>
                {lessons.map((lesson) => (
                    <div
                        key={lesson.id}
                        className={`sidebar-item ${currentLesson.id === lesson.id ? "active" : ""
                            }`}
                        onClick={() => setCurrentLesson(lesson)}
                    >
                        {lesson.title}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LessonDetail;