import classNames from "classnames/bind";
import styles from "./Follow.module.scss";
import { Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useState } from "react";

const cx = classNames.bind(styles);

function Follow(props) {
    const actions = [
        { id: 1, action: "Đang đọc" },
        { id: 2, action: "Hoàn thành" },
        { id: 3, action: "Tạm ngưng" },
        { id: 4, action: "Giữ lại" },
        { id: 5, action: "Dự định đọc" },
        { id: 6, action: "Đọc lại" },
        { id: 7, action: "Tác giả" },
    ];
    const [actionPopup, setActionPopup] = useState(false);

    const handleOpenActionPopup = () => {
        setActionPopup((open) => !open);
    };

    const actionClassName = cx("inner", {
        open: actionPopup,
    });

    const [actionState, setActionState] = useState("Đang đọc");

    return (
        <Modal
            open={props.open}
            onCancel={props.onCancel}
            title="Thêm vào danh sách"
            closeIcon={<CloseOutlined style={{ color: "#fff" }} />}
            footer={false}
            width="75%"
        >
            <div className={cx("content")}>
                <div className={cx("image")}>
                    <img src={props.image} alt="" />
                </div>
                <div className={cx("info")}>
                    <div className={cx("action")}>
                        <h2>{props.name}</h2>
                        <p>Danh sách:</p>
                        <div>
                            <p onClick={handleOpenActionPopup}>{actionState}</p>
                            <ul className={actionClassName}>
                                {actions.map((action) => (
                                    <li
                                        key={action.id}
                                        onClick={() =>
                                            setActionState(action.action)
                                        }
                                        className={cx("item", {
                                            "is-in":
                                                action.action === actionState,
                                        })}
                                    >
                                        {action.action}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className={cx("save")}>
                        <button>Lưu</button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
export default Follow;
