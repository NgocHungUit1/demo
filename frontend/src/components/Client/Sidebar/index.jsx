import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import { ReactComponent as LogoIcon } from "@/assets/images/logo.svg";
import { Drawer } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const cx = classNames.bind(styles);

function Sidebar(props) {
    return (
        <Drawer
            headerStyle={{ background: "rgba(47,47,47, 1)", color: "#fff" }}
            bodyStyle={{ background: "rgba(47,47,47, 1)", color: "#fff" }}
            title={<LogoIcon/>}
            placement="left"
            onClose={props.onClose}
            open={props.open}
            closeIcon={<CloseOutlined style={{color: "#fff"}}/>}
        >
            <div className={cx("item")}>
                <div className={cx("title")}>Truyện tranh</div>
                <ul>
                    <li>Manga</li>
                    <li>Manhua</li>
                    <li>Manhwa</li>
                    <li>Doujinshi</li>
                </ul>
            </div>
            <div className={cx("item")}>
                <div className={cx("title")}>Truyện tranh</div>
                <ul>
                    <li>Manga</li>
                    <li>Manhua</li>
                    <li>Manhwa</li>
                    <li>Doujinshi</li>
                </ul>
            </div>
            <div className={cx("item")}>
                <div className={cx("title")}>Bảng xếp hạng</div>
                
            </div>
            <div className={cx("item")}>
                <div className={cx("title")}>Mới cập nhật</div>
                
            </div>
        </Drawer>
    );
}

export default Sidebar;
