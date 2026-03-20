import React from "react";
import { Spin } from "antd";
import "./FullPageLoading.css";

const FullPageLoading = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <Spin size="large" />
        <br/>
        <p>Đang xử lý dữ liệu...</p>
      </div>
    </div>
  );
};

export default FullPageLoading;