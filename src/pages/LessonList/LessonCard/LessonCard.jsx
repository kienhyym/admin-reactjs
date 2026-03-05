import React from "react";
import "./LessonCard.css";
import { Link } from "react-router-dom";

const LessonCard = ({ lesson }) => {
  return (
    <Link
      to={`/lessons/${lesson.id}`}
      style={{ textDecoration: "none", color: "inherit" ,backgroundColor:"white", borderRadius: 12,padding: 12,boxShadow: "0 4px 12px rgba(0,0,0,0.1)",}}
    >
      <div
        style={{
          width: "100%",
          borderRadius: 12,
          
          overflow: "hidden",
          cursor: "pointer",
          
        }}
      >
        <img
          src={lesson.thumbnail}
          alt={lesson.title}
          style={{ width: "100%", height: 160, objectFit: "cover" }}
        />

        <div style={{ padding: 16 ,textAlign: "center",}}>
          <h3>{lesson.title}</h3>
          <button
            className="learn-btn "
          >
            Vào học
          </button>
        </div>
      </div>
    </Link>
  );
};

export default LessonCard;