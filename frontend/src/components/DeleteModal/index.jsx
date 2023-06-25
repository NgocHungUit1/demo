import { Modal } from 'antd';
import { Button } from 'antd';

function DeleteModal({ visible, onOk, onCancel }) {
  return (
    <Modal
      title="Confirm Delete"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>Cancel</Button>,
        <Button key="delete" type="primary" danger onClick={onOk}>Delete</Button>,
      ]}
    >
      Are you sure you want to delete this comic?
    </Modal>
  );
}

export default DeleteModal;
