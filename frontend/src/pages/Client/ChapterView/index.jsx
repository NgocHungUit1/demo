import classNames from "classnames/bind";
import styles from "./ChapterView.module.scss";
import { ReactComponent as LogoIcon } from "@/assets/images/logo.svg";
import { Row, Col, Input, Modal } from "antd";
import Slider from "react-slick";
import {
    ArrowLeftOutlined,
    ArrowRightOutlined,
    CloseOutlined,
    FilterOutlined,
    LeftOutlined,
    RightOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { ReactComponent as BookIcon } from "@/assets/images/Manga/book-icon.svg";
import { ReactComponent as VerticalIcon } from "@/assets/images/Manga/vertical.svg";
import { ReactComponent as HorizontalIcon } from "@/assets/images/Manga/horizontal.svg";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ArrowButton from "@/components/Client/ArrowButton";
import imagesHome from "@/assets/images/Home";

const cx = classNames.bind(styles);

function ChapterView() {
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        speed: 2000,
        autoplaySpeed: 4000,
        nextArrow: (
            <ArrowButton small style2_next>
                <RightOutlined />
            </ArrowButton>
        ),
        prevArrow: (
            <ArrowButton small style2_prev>
                <LeftOutlined />
            </ArrowButton>
        ),
    };
    const location = useLocation();
    const props = location.state;
    const [chapterData, setChapterData] = useState();
    const [nextChapter, setNextChapter] = useState(null);
    const [previousChapter, setPreviousChapter] = useState(null);
    const [openSetting, setOpenSetting] = useState(false);

    const [isOpen, setIsOpen] = useState(false);
    var currentMode = localStorage.getItem("readingMode");

    const [readingMode, setReadingMode] = useState(
        currentMode ? currentMode : "vertical"
    );

    const handelChangeMode = (mode) => {
        localStorage.setItem("readingMode", mode);
        setReadingMode(mode);
        setOpenSetting(false);
    };

    const handleOpenSidebar = () => {
        setIsOpen(true);
    };

    const handleCloseSidebar = () => {
        setIsOpen(false);
    };

    const sidebarClassName = cx("sidebar", {
        open: isOpen,
    });

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(
                `${process.env.BASE_URL}api/mangas/chapter/${props[3]}`
            );
            const data = await response.json();
            if (data) {
                setChapterData(data.data);
                setNextChapter(data.data.next_chapter);
                setPreviousChapter(data.data.previous_chapter);
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

            <div className={sidebarClassName}>
                <div className={cx("head")}>
                    <Link
                        to={`/manga-details/${props[0].slug}`}
                        state={props[0]}
                    >
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
                        {previousChapter && (
                            <Link
                                to={`/manga-details/${props[0].slug}/${previousChapter.slug_chapter}/${previousChapter.id}`}
                                state={[
                                    props[0],
                                    previousChapter.name,
                                    previousChapter.slug_chapter,
                                    previousChapter.id,
                                ]}
                            >
                                <ArrowLeftOutlined />
                            </Link>
                        )}
                    </div>
                    <div className={cx("next")}>
                        {nextChapter && (
                            <Link
                                to={`/manga-details/${props[0].slug}/${nextChapter.slug_chapter}/${nextChapter.id}`}
                                state={[
                                    props[0],
                                    nextChapter.name,
                                    nextChapter.slug_chapter,
                                    nextChapter.id,
                                ]}
                            >
                                <ArrowRightOutlined />
                            </Link>
                        )}
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
                        onFocus={() => {}} // Thêm dòng này để tránh lỗi
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
                <div
                    className={cx("setting")}
                    onClick={() => setOpenSetting(true)}
                >
                    <SettingOutlined />
                    <p>Cài đặt</p>
                </div>
                <Modal
                    className={cx("search-popup")}
                    maskStyle={{ backdropFilter: "blur(8px)" }}
                    style={{
                        top: 40,
                    }}
                    bodyStyle={{
                        overflowX: "hidden",
                        overflowY: "scroll",
                        maxHeight: "80vh",
                    }}
                    title="Chế độ đọc"
                    open={openSetting}
                    onCancel={() => setOpenSetting(false)}
                    footer={false}
                    width="60%"
                    closeIcon={<CloseOutlined style={{ color: "#fff" }} />}
                >
                    <div className={cx("inner")}>
                        <p>Chọn chế độ đọc mà bạn muốn</p>
                        <div
                            onClick={() => handelChangeMode("vertical")}
                        >
                            <VerticalIcon />
                            <p>Đọc theo chiều dọc</p>
                        </div>
                        <div
                            onClick={() => handelChangeMode("horizontal")}
                        >
                            <HorizontalIcon />
                            <p>Đọc theo chiều ngang</p>
                        </div>
                    </div>
                </Modal>
            </div>

            <Col span={24}>
                <div className={cx("content")}>
                    {readingMode === "vertical" ? (
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
                    ) : (
                        <Slider
                            style={{
                                position: "relative",
                                width: "80%",
                                height: "90%",
                            }}
                            {...settings}
                        >
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
                        </Slider>
                    )}
                </div>
            </Col>
        </Row>
    );
}
export default ChapterView;
