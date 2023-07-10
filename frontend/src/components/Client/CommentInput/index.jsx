import classNames from "classnames/bind";
import styles from "./CommentInput.module.scss";
import { Input } from "antd";
import { ReactComponent as SendIcon } from "@/assets/images/Manga/send-2-svgrepo-com.svg";
import { ReactComponent as EmojiIcon } from "@/assets/images/Manga/smile-circle-svgrepo-com.svg";
import { SettingOutlined } from "@ant-design/icons";

const cx = classNames.bind(styles);

function CommentInput(props) {
    const commentClassName = cx("wrapper", {
        open: props.isComment,
    });
    return (
        <div className={commentClassName}>
            <Input.TextArea rows={4} defaultValue={"@" + props.name + " "} />
            <div className={cx("send")}>
                <button>
                    <SettingOutlined />
                </button>
                <button>
                    <EmojiIcon />
                </button>
                <button>
                    <SendIcon />
                </button>
            </div>
        </div>
    );
}

export default CommentInput;
