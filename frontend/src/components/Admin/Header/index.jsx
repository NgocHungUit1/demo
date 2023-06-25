import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { Avatar, Badge, Button } from "antd";
import images from "@/assets/images";
import { BellOutlined, MenuFoldOutlined, NotificationOutlined } from "@ant-design/icons";
const cx = classNames.bind(styles);

function Header(props) {
    return (
        <div className={cx("wrapper")}>
            <Button
                className={cx("sidebar-toggle")}
                icon={<MenuFoldOutlined />}
                onClick={props.showSideBar}
            />
            <div className={cx("information")}>
            <Badge count={1}>
                    <NotificationOutlined style={{fontSize: "20px"}}/>
                </Badge>
                <Badge count={1}>
                    <BellOutlined style={{fontSize: "20px"}}/>
                </Badge>
                <Avatar size={50} src={images.avatar_meow} />
            </div>
        </div>
    );
}

export default Header;
