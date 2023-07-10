import classNames from "classnames/bind";
import styles from "./Comment.module.scss";
import { Avatar } from "antd";
import { ReactComponent as ReplyIcon } from "@/assets/images/Manga/reply.svg";
import { ReactComponent as ActionIcon } from "@/assets/images/Manga/more-horizontal-svgrepo-com.svg";
import { UserOutlined } from "@ant-design/icons";
import CommentInput from "../Client/CommentInput";
import { useState } from "react";
const cx = classNames.bind(styles);

function Comment(props) {
    const [isComment, setIsComment] = useState(false);

    const handleOpenComment = () => {
        setIsComment((open) => !open);
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
                    <button onClick={handleOpenComment}>
                        <ReplyIcon />
                    </button>
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
            <CommentInput isComment={isComment} name={props.comment.user.name} />
        </div>
    );
}

export default Comment;
