import React from "react";
import "./ConfirmDeleteModal.css";

const ConfirmDeleteModal = ({ visible, onCancel, onConfirm, title }) => {
  if (!visible) return null;

  return (
    <div className="confirm-modal">
      <div className="confirm-modal-content">

        <h2>⚠ Xác nhận xoá</h2>

        <p>
          Bạn có chắc chắn muốn xoá <b>{title}</b> không?
        </p>

        <p className="warning-text">
          Hành động này không thể hoàn tác!
        </p>

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onCancel}>
            Huỷ
          </button>

          <button className="btn-delete" onClick={onConfirm}>
            Xoá
          </button>
        </div>

      </div>
    </div>
  );
};

export default ConfirmDeleteModal;