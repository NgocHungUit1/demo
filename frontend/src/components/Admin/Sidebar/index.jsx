import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import { Avatar, Button, Menu } from "antd";
import {
    AppstoreOutlined,
    LeftOutlined,
    RightOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import images from "@/assets/images";
import { ReactComponent as ComicsIcon } from "@/assets/images/books-svgrepo-com.svg";
import { ReactComponent as GenresIcon } from "@/assets/images/archive-book-svgrepo-com.svg";
import { ReactComponent as CategoryIcon } from "@/assets/images/category-svgrepo-com.svg";
import { ReactComponent as DashboardIcon } from "@/assets/images/dashboard-svgrepo-com.svg";
import { ReactComponent as LogoIcon } from "@/assets/images/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/store/Slice/user.slice";
const cx = classNames.bind(styles);

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem(
        <Link to="">
            <p className={cx("tab-item")}>
                <b>Dashboard</b>
            </p>
        </Link>,
        "home",
        <DashboardIcon style={{ fontSize: "22px" }} />
    ),
    getItem(
        <Link to="users">
            <p className={cx("tab-item")}>
                <b>Users</b>
            </p>
        </Link>,
        "categories",
        <CategoryIcon style={{ fontSize: "22px" }} />
    ),
    getItem(
        <Link to="all-genres">
            <p className={cx("tab-item")}>
                <b>Genres</b>
            </p>
        </Link>,
        "genres",
        <GenresIcon style={{ fontSize: "22px" }} />
    ),
    getItem(
        <Link to="all-comics">
            <p className={cx("tab-item")}>
                <b>Comics</b>
            </p>
        </Link>,
        "comics",
        <ComicsIcon style={{ fontSize: "22px" }} />
    ),
];

function Sidebar(props) {
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    const { user } = useSelector((st) => st.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () => {
        navigate("");
        dispatch(setUser(undefined));
        localStorage.removeItem("user");
    };
    return (
        <div
            className={cx("wrapper")}
            style={
                collapsed
                    ? { width: "auto" }
                    : { maxWidth: "250px", width: "100%" }
            }
        >
            <button onClick={toggleCollapsed} className={cx("btn-collapse")}>
                {collapsed ? <RightOutlined /> : <LeftOutlined />}
            </button>
            <div className={cx("title")}>
                <div className={cx("logo")}>
                    <LogoIcon />
                    {collapsed ? (
                        ""
                    ) : (
                        <p>
                            <b>GidGid</b>
                        </p>
                    )}
                </div>
                {/* <div className={cx("information")}>
                    <Avatar size={64} src={images.avatar_meow} />
                    {collapsed ? (
                        ""
                    ) : (
                        <div>
                            <p className={cx("name")}>
                                <b>meow meow</b>
                            </p>
                            <p className={cx("role")}>admin</p>
                        </div>
                    )}
                </div> */}
            </div>
            <Menu
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                mode="inline"
                inlineCollapsed={collapsed}
                items={items}
                style={{
                    margin: "2rem auto ",
                }}
            />
            <div className={cx("logout")}>
                <Button
                    onClick={() => handleLogout()}
                    shape="circle"
                    style={{ background: "#000" }}
                    icon={<LogoutOutlined style={{ color: "#fff" }} />}
                />
                {collapsed ? "" : <p>Logout</p>}
            </div>
        </div>
    );
}

export default Sidebar;
