import React, { useState } from "react";
import "./QuizPage.css";

const quizData = [

  {
    type: "multiple",
    question: "Quá trình nào sau đây là sự biến đổi vật lí?",
    options: [
      "Cho vôi sống CaO vào nước được vôi tôi",
      "Cồn để trong lọ không kín bị bay hơi",
      "Khí carbon dioxide làm đục nước vôi trong",
      "Nung đá vôi thành vôi sống"
    ],
    correct: 1
  },

  {
    type: "multiple",
    question: "Dấu hiệu nào giúp ta khẳng định có phản ứng hoá học xảy ra?",
    options: [
      "Có chất kết tủa (chất không tan)",
      "Có chất khí thoát ra (sủi bọt)",
      "Có sự thay đổi màu sắc",
      "Một trong số các dấu hiệu trên"
    ],
    correct: 3
  },

  {
    type: "multiple",
    question: "Cho các quá trình biến đổi hoá học sau: (1) Đốt cháy củi, than đá, than cốc. (2) Phân huỷ đá vôi ở nhiệt độ cao (900°C – 1000°C) thành vôi sống. Phát biểu nào sau đây đúng?",
    options: [
      "(1) là phản ứng toả nhiệt; (2) là phản ứng thu nhiệt",
      "(1) là phản ứng thu nhiệt; (2) là phản ứng toả nhiệt",
      "Cả (1) và (2) đều là phản ứng toả nhiệt",
      "Cả (1) và (2) đều là phản ứng thu nhiệt"
    ],
    correct: 0
  },

  {
    type: "multiple",
    question: "Iron tác dụng với chlorine tạo thành iron (III) chloride. Sản phẩm của phản ứng hoá học là",
    options: [
      "iron",
      "chloride",
      "iron (II) chloride",
      "iron (III) chloride"
    ],
    correct: 3
  },

  {
    type: "multiple",
    question: "Dung dịch là",
    options: [
      "hỗn hợp đồng nhất của chất tan và dung môi",
      "hỗn hợp đồng nhất của muối và nước",
      "hỗn hợp đồng nhất của muối và dung môi",
      "hỗn hợp đồng nhất của chất tan và nước"
    ],
    correct: 0
  },

  {
    type: "multiple",
    question: "Phát biểu nào sau đây đúng về mol?",
    options: [
      "12 gam carbon có NA nguyên tử C hay 1 mol nguyên tử carbon",
      "254 gam iodine có NA nguyên tử C hay 1 mol nguyên tử carbon",
      "300 gam nước có NA nguyên tử C hay 1 mol nguyên tử carbon",
      "108 gam argentum có NA nguyên tử C hay 1 mol nguyên tử carbon"
    ],
    correct: 0
  },

  {
    type: "multiple",
    question: "Quá trình nào sau đây là quá trình toả nhiệt?",
    options: [
      "Đá viên tan chảy",
      "Nước bay hơi",
      "Đốt cháy cồn",
      "Luộc trứng"
    ],
    correct: 2
  },

  {
    type: "multiple",
    question: "Mol là",
    options: [
      "lượng chất chứa NA (6,022×10^20) nguyên tử hoặc phân tử",
      "lượng chất chứa NA (6,022×10^21) nguyên tử hoặc phân tử",
      "lượng chất chứa NA (6,022×10^22) nguyên tử hoặc phân tử",
      "lượng chất chứa NA (6,022×10^23) nguyên tử hoặc phân tử"
    ],
    correct: 3
  },

  {
    type: "multiple",
    question: "Nồng độ phần trăm của dung dịch cho biết",
    options: [
      "số gam dung môi có trong 100 gam dung dịch",
      "số gam chất tan có trong 100 gam dung dịch",
      "số mol chất tan có trong một lít dung dịch",
      "số mol chất tan có trong dung dịch"
    ],
    correct: 1
  },

  {
    type: "multiple",
    question: "Nồng độ mol của dung dịch cho biết",
    options: [
      "số gam dung môi có trong 100 gam dung dịch",
      "số gam chất tan có trong 100 gam dung dịch",
      "số mol chất tan có trong một lít dung dịch",
      "số mol chất tan có trong dung dịch"
    ],
    correct: 2
  },

  {
    type: "boolean",
    question: "Trong quá trình sản xuất vôi chỉ xảy ra sự biến đổi hoá học.",
    correct: false,
      options: ["Đúng", "Sai"],

  },

  {
    type: "boolean",
    question: "Một trong các dấu hiệu nhận biết có phản ứng hoá học xảy ra là có khí CO2.",
    correct: true,
      options: ["Đúng", "Sai"],

  },

  {
    type: "boolean",
    question: "Quá trình xảy ra ở công đoạn 2 là sự biến đổi vật lí.",
    correct: false,
      options: ["Đúng", "Sai"],

  },

  {
    type: "boolean",
    question: "Cây nến thứ nhất không tan trong nước.",
    correct: true,  
      options: ["Đúng", "Sai"],

  },

  {
    type: "boolean",
    question: "Quá trình xảy ra ở cây nến thứ hai là hiện tượng hoá học.",
    correct: false,
      options: ["Đúng", "Sai"],

  },

  {
    type: "boolean",
    question: "Ở cây nến thứ ba xảy ra cả hai hiện tượng vật lí và hoá học.",
    correct: true,
      options: ["Đúng", "Sai"],

  },

  {
    type: "boolean",
    question: "Nến thứ ba sau khi đốt vẫn giữ nguyên kích thước ban đầu.",
    correct: false,
      options: ["Đúng", "Sai"],

  },

  {
    type: "input",
    question: "Thể tích CO2 sinh ra khi có 0,2 mol CO2 ở điều kiện chuẩn là bao nhiêu lít?",
    correctText: "4.958"
  },

  {
    type: "multiple",
    question: "Nếu số mol của khí methane là 0,1 mol thì khối lượng khí methane là bao nhiêu?",
    options: [
      "0,8 gam",
      "16 gam",
      "1,6 gam",
      "0,16 gam"
    ],
    correct: 2
  },

  {
    type: "multiple",
    question: "Cho hai khí carbon dioxide và khí methane xét cùng điều kiện, nếu số mol mỗi khí bằng nhau thì khí nào nhẹ hơn?",
    options: [
      "carbon dioxide",
      "methane"
    ],
    correct: 1
  },

  {
    type: "multiple",
    question: "Khí carbon dioxide và methane sinh ra ở hang hoặc giếng sâu. Khí nào tích tụ dưới đáy hang?",
    options: [
      "methane",
      "carbon dioxide"
    ],
    correct: 1
  },

  {
    type: "multiple",
    question: "Tính số mol H2SO4 có trong 100 ml dung dịch H2SO4 2M.",
    options: [
      "0,02 mol",
      "2 mol",
      "0,2 mol",
      "1 mol"
    ],
    correct: 2
  },

  {
    type: "multiple",
    question: "Hoà tan 20 gam Na2CO3 vào 50 gam nước thu được dung dịch muối. Nồng độ phần trăm của dung dịch muối là",
    options: [
      "20,89%",
      "40,23%",
      "28,57%",
      "51,05%"
    ],
    correct: 2
  }

]

const QuizPage = () => {

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (qIndex, optionIndex) => {
    setAnswers({
      ...answers,
      [qIndex]: optionIndex
    });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const score = quizData.reduce((total, q, i) => {

    if (q.type === "input") {
      if (
        answers[i] &&
        answers[i].toLowerCase().trim() ===
        q.correctText.toLowerCase().trim()
      ) {
        return total + 1;
      }
    }

    if (q.type !== "input") {
      if (answers[i] === q.correct) {
        return total + 1;
      }
    }

    return total;

  }, 0);

  return (
    <div className="quiz-container">

      <h1 className="page-title">Bài kiểm tra</h1>

      {quizData?.map((q, qIndex) => (
        <div key={qIndex} className="question-block">

          <h3>{qIndex + 1}. {q.question}</h3>

          {q.image && (
            <img
              src={q.image}
              alt="question"
              className="question-image"
            />
          )}

          {/* MULTIPLE + BOOLEAN */}
          {(q.type === "multiple" || q.type === "boolean") &&
            q?.options?.map((opt, optIndex) => (
              <label
                key={optIndex}
                className={`option-label
          ${submitted && optIndex === q.correct ? "correct" : ""}
          ${submitted &&
                    answers[qIndex] === optIndex &&
                    optIndex !== q.correct
                    ? "wrong"
                    : ""}`}
              >
                <input
                  type="radio"
                  name={`question-${qIndex}`}
                  checked={answers[qIndex] === optIndex}
                  onChange={() => handleChange(qIndex, optIndex)}
                  disabled={submitted}
                />
                {opt}
              </label>
            ))}

          {/* INPUT TYPE */}
          {q.type === "input" && (
            <input
              type="text"
              className="answer-input"
              value={answers[qIndex] || ""}
              onChange={(e) =>
                setAnswers({
                  ...answers,
                  [qIndex]: e.target.value
                })
              }
              disabled={submitted}
              placeholder="Nhập đáp án..."
            />
          )}

        </div>
      ))}

      {!submitted && (
        <button className="submit-btn" onClick={handleSubmit}>
          Nộp bài
        </button>
      )}

      {submitted && (
        <div className="result-box">
          🎉 Bạn đạt {score} / {quizData.length} điểm
        </div>
      )}

    </div>
  );
};

export default QuizPage;