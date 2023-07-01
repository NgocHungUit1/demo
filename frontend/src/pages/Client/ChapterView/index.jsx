import classNames from "classnames/bind";
import styles from "./ChapterView.module.scss";
import { ReactComponent as LogoIcon } from "@/assets/images/logo.svg";
import { Drawer, Row, Col, Input } from "antd";
import {
    ArrowLeftOutlined,
    ArrowRightOutlined,
    CloseOutlined,
    FilterOutlined,
    LeftOutlined,
    RightOutlined,
} from "@ant-design/icons";
import { ReactComponent as BookIcon } from "@/assets/images/Manga/book-icon.svg";

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const cx = classNames.bind(styles);

function ChapterView() {
    const location = useLocation();
    const props = location.state;
    const [chapterData, setChapterData] = useState();
    function handleOpenSidebar() {
        const sidebar = document.querySelector(".ChapterView_sidebar__4YGUY");
        sidebar.classList.add("ChapterView_open__LiMCZ");
    }
    const [isChapter, setIsChapter] = useState();
    function handleCloseSidebar() {
        const sidebar = document.querySelector(".ChapterView_sidebar__4YGUY");
        sidebar.classList.remove("ChapterView_open__LiMCZ");
    }
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(
                `http://localhost:8000/api/mangas/chapter/${props[3]}`
            );
            const data = await response.json();
            if (data) {
                setChapterData(data.data);
            }
        }
        fetchData();
    }, [props]);
    const [filterValue, setFilterValue] = useState("");

    const handleInputChange = (e) => {
        setFilterValue(e.target.value);
    };

    const filteredChapters = props[0].chapters.filter((item) =>
        item.name.includes(filterValue)
    );
    
    return (
        <Row className={cx("wrapper")}>
            <div className={cx("open-btn")} onClick={handleOpenSidebar}>
                <RightOutlined />
            </div>

            <div className={cx("sidebar")}>
                <div className={cx("head")}>
                    <Link to={`/manga-details/${props[0].slug}`} state={props[0]}>
                        <ArrowLeftOutlined />
                    </Link>
                    <LogoIcon />
                    <div onClick={handleCloseSidebar}>
                        <LeftOutlined />
                    </div>
                </div>
                <h3 className={cx("manga-name")}>{props[0].name}</h3>
                <p className={cx("chapter-name")}>{props[1]}</p>
                <div className={cx("action")}>
                    <div className={cx("prev")}>
                        <ArrowLeftOutlined />
                    </div>
                    <div className={cx("next")}>
                        <ArrowRightOutlined />
                    </div>
                </div>
                <div className={cx("chapter-list")}>
                    <Input
                        style={{
                            background: "rgb(95, 95, 95)",
                            color: "#fff",
                            height: 32,
                            borderRadius: 8,
                        }}
                        size="small"
                        placeholder="Đi đến chương..."
                        value={filterValue}
                        onChange={handleInputChange}
                        suffix={<FilterOutlined style={{ fontSize: 12 }} />}
                    />
                    <div className={cx("items")}>
                        {filteredChapters.map((item) => (
                            <Link
                                key={item.id}
                                className={cx("item", {
                                    "is-in": item.id === props[3],
                                })}
                                to={`/manga-details/${props[0].slug}/${item.slug_chapter}/${item.id}`}
                                state={[
                                    props[0],
                                    item.name,
                                    item.slug_chapter,
                                    item.id,
                                ]}
                            >
                                <div className={cx("inner")}>
                                    <p className={cx("name")}>
                                        <b>{item.name}</b>
                                    </p>
                                    <div className={cx("date")}>
                                        <p>{item.created_at.split("T")[0]}</p>
                                        <BookIcon />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <Col span={24}>
                <div className={cx("content")}>
                    <div className={cx("image")}>
                        {chapterData ? (
                            chapterData.chapter.pages

                                .map((item) => (
                                    <img
                                        key={item.id}
                                        src={item.image_path}
                                        alt=""
                                    />
                                ))
                                .reverse()
                        ) : (
                            <p>khong co du lieu</p>
                        )}
                    </div>
                </div>
            </Col>
        </Row>
    );
}
export default ChapterView;
