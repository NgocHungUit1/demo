import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { Avatar, Badge, Button, Input, Modal, Popover } from "antd";
import images from "@/assets/images";
import { ReactComponent as LogoIcon } from "@/assets/images/logo.svg";
import { ReactComponent as SidebarIcon } from "@/assets/images/bar-2-svgrepo-com.svg";
import {
    BellFilled,
    BellOutlined,
    MenuFoldOutlined,
    NotificationOutlined,
    RightOutlined,
    SearchOutlined,
    UpOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { ReactComponent as SliderIcon } from "@/assets/images/Home/slider-vertical-svgrepo-com.svg";
import { useState, useEffect } from "react";
import Sidebar from "../Sidebar";

const cx = classNames.bind(styles);

function Header() {
    const [openSidebar, setOpenSidebar] = useState(false);

  const showSidebar = () => {
    setOpenSidebar(true);
  };

  const onCloseSidebar = () => {
    setOpenSidebar(false);
  };
    const [openSearch, setOpenSearch] = useState(false);
    const categoriesData = [
        { id: 1, name: "Action" },
        { id: 2, name: "Adventure" },
        { id: 3, name: "Comedy" },
        { id: 4, name: "Horror" },
    ];
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("http://localhost:8000/api/genres");
            const data = await response.json();
            if (Array.isArray(data.data)) {
                setGenres(data.data);
            }
        }
        fetchData();
    }, []);
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <div className={cx("logo")}>
                    <div onClick={showSidebar}>
                    <SidebarIcon style={{margin: 5}}  />
                    </div>
                    
                    <LogoIcon />
                </div>
                <Sidebar onClose={onCloseSidebar} open={openSidebar}/>
                <div className={cx("tab")}>
                    <div className={cx("item")}>
                        <p>
                            <b>Thể loại</b>
                        </p>
                        <UpOutlined style={{ fontSize: "15px" }} />
                        <div className={cx("menu")}>
                            <ul>
                                {genres.slice(1,8).map((item) => (
                                    <li key={item.id}>{item.name}</li>
                                ))}
                                <li>Xem them <RightOutlined/></li>
                            </ul>
                        </div>
                    </div>
                    <div className={cx("item")}>
                        <p>
                            <b>Truyện tranh</b>
                        </p>
                        <UpOutlined style={{ fontSize: "15px" }} />
                        <div className={cx("menu")}>
                            <ul>
                                {categoriesData.map((item) => (
                                    <li key={item.id}>{item.name}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className={cx("item")}>
                        <p>
                            <b>Mới cập nhật</b>
                        </p>
                    </div>
                    <div className={cx("item")}>
                        <p>
                            <b>Bảng xếp hạng</b>
                        </p>
                    </div>
                </div>
                <div className={cx("search-info")}>
                    <div
                        className={cx("search")}
                        onClick={() => setOpenSearch(true)}
                    >
                        <div>
                            <SliderIcon />
                        </div>
                        <p>Tìm truyện...</p>
                        <SearchOutlined />
                    </div>
                    <Modal
                        className={cx("search-popup")}
                        maskStyle={{ backdropFilter: "blur(8px)" }}
                        style={{ top: 40 }}
                        title="Tìm truyện"
                        open={openSearch}
                        onOk={() => setOpenSearch(false)}
                        onCancel={() => setOpenSearch(false)}
                        footer={false}
                        width="85%"
                    >
                        <Input
                            style={{
                                background: "rgb(63,63,63)",
                                color: "#fff",
                                margin: "20px 0",
                            }}
                            size="large"
                            prefix={<SearchOutlined style={{ fontSize: 20 }} />}
                        />
                    </Modal>
                    <div className={cx("button")}>
                        <BellFilled />
                    </div>
                    <Avatar
                        size={55}
                        icon={<UserOutlined />}
                        style={{ background: "rgba(47,47,47, 1)" }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Header;
