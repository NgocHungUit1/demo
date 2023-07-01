import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { Avatar, Badge, Button, Input, Modal, Popover } from "antd";
import images from "@/assets/images";
import { ReactComponent as LogoIcon } from "@/assets/images/logo.svg";
import { ReactComponent as SidebarIcon } from "@/assets/images/bar-2-svgrepo-com.svg";
import {
    BellFilled,
    BellOutlined,
    CloseOutlined,
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
import { Link } from "react-router-dom";

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
        { id: 1, name: "Manga" },
        { id: 2, name: "Manhua" },
        { id: 3, name: "Manhwa" },
        { id: 4, name: "Doujinshi" },
    ];
    const [genres, setGenres] = useState([]);
    const [mangas, setMangas] = useState([]);

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
    useEffect(() => {
        async function fetchData() {
            const response = await fetch("http://localhost:8000/api/mangas");
            const data = await response.json();
            if (Array.isArray(data.data)) {
                setMangas(data.data);
            }
        }
        fetchData();
    }, []);
    const [filterValue, setFilterValue] = useState("");

    const handleInputChange = (e) => {
        setFilterValue(e.target.value);
    };

    const filteredMangas = mangas.filter((item) =>
        item.name.includes(filterValue)
    );
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <div className={cx("logo")}>
                    <div onClick={showSidebar}>
                        <SidebarIcon style={{ margin: 5 }} />
                    </div>
                    <Link to="/">
                        <LogoIcon />
                    </Link>
                </div>
                <Sidebar
                    onClose={onCloseSidebar}
                    open={openSidebar}
                    genres={genres}
                    categoriesData={categoriesData}
                />
                <div className={cx("tab")}>
                    <div className={cx("item")}>
                        <p>
                            <b>Thể loại</b>
                        </p>
                        <UpOutlined style={{ fontSize: "15px" }} />
                        <div className={cx("menu")}>
                            <ul>
                                {genres.slice(1, 8).map((item) => (
                                    <li key={item.id}>{item.name}</li>
                                ))}
                                <li>
                                    Xem them <RightOutlined />
                                </li>
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
                        style={{
                            top: 40,
                            overflowX: "hidden",
                            overflowY: "scroll",
                            maxHeight: "80vh",
                        }}
                        title="Tìm truyện"
                        open={openSearch}
                        onOk={() => setOpenSearch(false)}
                        onCancel={() => setOpenSearch(false)}
                        footer={false}
                        width="85%"
                        closeIcon={<CloseOutlined style={{ color: "#fff" }} />}
                    >
                        <Input
                            style={{
                                background: "rgb(63,63,63)",
                                color: "#fff",
                                margin: "20px 0",
                            }}
                            value={filterValue}
                            onChange={handleInputChange}
                            size="large"
                            prefix={<SearchOutlined style={{ fontSize: 20 }} />}
                        />
                        {filteredMangas ? (
                            filteredMangas.map((item) => (
                                <Link
                                    key={item.id}
                                    to={`/manga-details/${item.slug}`}
                                    state={item}
                                    className={cx("search-item")}
                                >
                                    <div className={cx("image")}>
                                        <img src={item.image} alt="" />
                                    </div>
                                    <div className={cx("content")}>
                                        <h2>{item.name}</h2>
                                        <ul>
                                            {item.genres.map((genres) => (
                                                <li key={genres.id}>
                                                    {genres.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className={cx("not-found")}>
                                Truyện bạn cần tìm chưa có
                            </div>
                        )}
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
