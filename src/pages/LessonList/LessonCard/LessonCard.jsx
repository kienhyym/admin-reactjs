import React from "react";
import "./LessonCard.css";
import { Link } from "react-router-dom";

const LessonCard = ({ lesson }) => {
  return (
    <Link
      to={`/lessons/${lesson.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div
        style={{
          width: 280,
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          overflow: "hidden",
          cursor: "pointer",
        }}
      >
        <img
          src={lesson.thumbnail}
          alt={lesson.title}
          style={{ width: "100%", height: 160, objectFit: "cover" }}
        />

        <div style={{ padding: 16 }}>
          <h3>{lesson.title}</h3>
          <button
            style={{
              padding: "8px 16px",
              borderRadius: 20,
              border: "none",
              background: "#667eea",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Vào học
          </button>
        </div>
      </div>
    </Link>
  );
};

export default LessonCard;