import classNames from "classnames/bind";
import styles from "./FollowPopup.module.scss";
import { Modal, notification } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);

function Follow(props) {
    const { client } = useSelector((st) => st.client);

    const actions = [
        { id: 1, action: "Đang đọc", value: "reading" },
        { id: 2, action: "Hoàn thành", value: "completed" },
        { id: 3, action: "Tạm ngưng", value: "dropped" },
        { id: 4, action: "Dự định đọc", value: "plan-to-read" },
    ];
    const [actionPopup, setActionPopup] = useState(false);

    const handleOpenActionPopup = () => {
        setActionPopup((open) => !open);
    };

    const actionClassName = cx("inner", {
        open: actionPopup,
    });

    const [actionState, setActionState] = useState(["Đang đọc", "reading"]);

    const [api, contextHolder] = notification.useNotification();
    const openFollowNotification = (type) => {
        if (type === "success") {
            api[type]({
                message: "Bạn đã theo dõi thành công nhé",
            });
        }
        if (type === "warning") {
            api[type]({
                message: "Opps! Có lỗi rồi nè",
            });
        }
    };

    const handelFollow = async () => {
        try {
            await axios
                .post(
                    `${process.env.BASE_URL}api/follows-status/${props.mangaData.id}`,
                    {
                        status: actionState[1],
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${client.access_token}`,
                            "Content-Type": "application/json",
                        },
                    }
                )

                .then(() => openFollowNotification("success"));
        } catch (error) {
            openFollowNotification("warning");
            console.log(error);
        }
    };

    return (
        <Modal
            open={props.open}
            onCancel={props.onCancel}
            title="Thêm vào danh sách"
            closeIcon={<CloseOutlined style={{ color: "#fff" }} />}
            footer={false}
            width="75%"
        >
            {contextHolder}
            <div className={cx("content")}>
                <div className={cx("image")}>
                    <img src={props.mangaData.image} alt="" />
                </div>
                <div className={cx("info")}>
                    <div className={cx("action")}>
                        <h2>{props.mangaData.name}</h2>
                        <p>Danh sách:</p>
                        <div>
                            <p onClick={handleOpenActionPopup}>
                                {actionState[0]}
                            </p>
                            <ul className={actionClassName}>
                                {actions.map((action) => (
                                    <li
                                        key={action.id}
                                        onClick={() =>
                                            setActionState([
                                                action.action,
                                                action.value,
                                            ])
                                        }
                                        className={cx("item", {
                                            "is-in":
                                                action.value === actionState[1],
                                        })}
                                    >
                                        {action.action}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className={cx("save")} onClick={handelFollow}>
                        <button>Lưu</button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
export default Follow;
