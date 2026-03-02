import React, { useState } from "react";
import "./QuizPage.css";

const quizData = {
  question: "React hook nào dùng để quản lý state?",
  options: ["useEffect", "useState", "useMemo", "useRef"],
  correct: 1,
};

const QuizPage = () => {
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);

  const handleSelect = (index) => {
    if (selected !== null) return;
    setSelected(index);

    if (index === quizData.correct) {
      setScore(score + 10);
    }
  };

  return (
    <div className="quiz-container">
      {/* Top bar */}
      <div className="quiz-header">
        <div className="progress-bar">
          <div className="progress-fill"></div>
        </div>
        <div className="score">⭐ {score}</div>
      </div>

      {/* Question */}
      <div className="quiz-card">
        <h2>{quizData.question}</h2>

        <div className="options-grid">
          {quizData.options.map((option, index) => (
            <button
              key={index}
              className={`option-btn 
                ${selected === index && index === quizData.correct ? "correct" : ""}
                ${selected === index && index !== quizData.correct ? "wrong" : ""}
              `}
              onClick={() => handleSelect(index)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="quiz-footer">Câu 1 / 10</div>
    </div>
  );
};

export default QuizPage;