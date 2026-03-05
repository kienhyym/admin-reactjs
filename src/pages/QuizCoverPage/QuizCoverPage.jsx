import React from "react";
import { useNavigate } from "react-router-dom";
import "./QuizCoverPage.css";

const QuizCoverPage = () => {

    const navigate = useNavigate();

    return (
        <div className="home-wrapper">

            <div className="home-card">

                {/* logo */}


                <div className="content">

                    {/* left */}
                    <div className="left">
                        <div className="logo">
                            <img src="/image/logo8_transparent.png" alt="logo" />
                        </div>
                        <h1>
                            Chemistry <span className="dice">🎲</span>
                        </h1>

                        <p>
                            HỌC HÓA THCS
                            <br />
                            Khám phá thế giới điều kỳ qua thí nghiệm & bài giảng sinh động
                        </p>

                        <div className="buttons">

                            <button
                                onClick={() => navigate("/LessonList")}
                            >
                                📚 Vào học ngay
                            </button>

                            <button
                                className="secondary"
                                onClick={() => navigate("/quiz")}
                            >
                                Làm bài ôn tập
                            </button>

                        </div>

                    </div>

                    {/* right */}
                    <div className="right">

                        <img
                            src="/image/chemistry-doc.jpg"
                            alt="illustration"
                        />

                    </div>

                </div>

            </div>

        </div>
    );
};


export default QuizCoverPage;