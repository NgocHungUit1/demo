import classNames from "classnames/bind";
import styles from "./Comment.module.scss";
import { Avatar, notification } from "antd";
import { ReactComponent as ReplyIcon } from "@/assets/images/Manga/reply.svg";
import { ReactComponent as ActionIcon } from "@/assets/images/Manga/more-horizontal-svgrepo-com.svg";
import { UserOutlined } from "@ant-design/icons";
import CommentInput from "../Client/CommentInput";
import { useState } from "react";
import { useSelector } from "react-redux";
const cx = classNames.bind(styles);

function Comment(props) {
    const [isComment, setIsComment] = useState(false);

    const handleOpenComment = () => {
        setIsComment((open) => !open);
    };

    const { client } = useSelector((st) => st.client);

    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type) => {
        api[type]({
            message: "Đăng nhập để bình luận bạn nhé",
        });
    };

    return (
        <div className={cx("wrapper")}>
            <div className={cx("user-action")}>
                <div className={cx("user")}>
                    {props.comment.user.image ? (
                        <Avatar size={50} src={props.comment.user.image} />
                    ) : (
                        <Avatar
                            size={50}
                            icon={<UserOutlined />}
                            style={{
                                backgroundColor: "rgb(63,63,63)",
                            }}
                        />
                    )}
                    <p>{props.comment.user.name}</p>
                </div>
                <div className={cx("action")}>
                    <button>
                        <ActionIcon />
                    </button>
                </div>
            </div>
            <p className={cx("des")}>{props.comment.comment}</p>
            <div className={cx("reply")}>
                <div className={cx("emoji")}>
                    {contextHolder}
                    {client ? (
                        <button onClick={handleOpenComment}>
                            <ReplyIcon />
                        </button>
                    ) : (
                        <button
                            onClick={() => openNotificationWithIcon("error")}
                        >
                            <ReplyIcon />
                        </button>
                    )}
                </div>
                <div className={cx("emoji")}>
                    <button>👍</button>
                    <p>0</p>
                </div>
                <div className={cx("emoji")}>
                    <button>❤</button>
                    <p>0</p>
                </div>
                <div className={cx("emoji")}>
                    <button>🤡</button>
                    <p>0</p>
                </div>
                <div className={cx("emoji")}>
                    <button>😡</button>
                    <p>0</p>
                </div>
            </div>
            <CommentInput
                isComment={isComment}
                name={props.comment.user.name}
                mangaId={props.mangaId}
                commentId={props.commentId}
            />
        </div>
    );
}

export default Comment;
