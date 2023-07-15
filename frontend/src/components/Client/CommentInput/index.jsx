import classNames from "classnames/bind";
import styles from "./CommentInput.module.scss";
import { Input } from "antd";
import { ReactComponent as SendIcon } from "@/assets/images/Manga/send-2-svgrepo-com.svg";
import { ReactComponent as EmojiIcon } from "@/assets/images/Manga/smile-circle-svgrepo-com.svg";
import { SettingOutlined } from "@ant-design/icons";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";

const cx = classNames.bind(styles);

function CommentInput(props) {
    const { client } = useSelector((st) => st.client);

    const commentClassName = cx("wrapper", {
        open: props.isComment,
    });
    const [comment, setComment] = useState("@" + props.name + " ");
    const createMangaComment = async (comment, commentId, userId) => {
        try {
            const response = await axios.post(
                `${process.env.BASE_URL}api/manga/${props.mangaId}/comments`,
                {
                    comment: comment,
                    comment_id: commentId,
                    id: userId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${client.access_token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            setComment("");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={commentClassName}>
            <Input.TextArea
                rows={4}
                onChange={(e) => setComment(e.target.value)}
                value={comment}
            />
            <div className={cx("send")}>
                <button>
                    <SettingOutlined />
                </button>
                <button>
                    <EmojiIcon />
                </button>
                <button
                    onClick={() =>
                        createMangaComment(
                            comment,
                            props.commentId,
                            client.user.id
                        )
                    }
                >
                    <SendIcon />
                </button>
            </div>
        </div>
    );
}

export default CommentInput;
