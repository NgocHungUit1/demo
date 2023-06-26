import React from "react";
import { Modal, Button } from "antd";

const DeleteModal = ({ visible, onOk, onCancel }) => {
  return (
    <Modal
      title="Confirm Delete"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" danger onClick={onOk}>
          Delete
        </Button>,
      ]}
    >
      <p>Are you sure to delete this comic?</p>
    </Modal>
  );
};

export default DeleteModal;
