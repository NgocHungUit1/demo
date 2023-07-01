import classNames from "classnames/bind";
import styles from "./Manga.module.scss";
import { Col, Input, Row } from "antd";
import {
    UserOutlined,
    ArrowUpOutlined,
    FilterOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import { ReactComponent as BookOutlineIcon } from "@/assets/images/Manga/book-ouline.svg";
import { ReactComponent as NewestIcon } from "@/assets/images/Manga/newst-icon.svg";
import { ReactComponent as BookIcon } from "@/assets/images/Manga/book-icon.svg";
import { ReactComponent as SaveIcon } from "@/assets/images/Manga/save-icon.svg";
import { ReactComponent as BellOutlineIcon } from "@/assets/images/Manga/bell-outline.svg";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Manga() {
    const location = useLocation();
    const props = location.state;
    const [mangaData, setMangaData] = useState();

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(
                `http://localhost:8000/api/manga/details/${props.slug}`
            );
            const data = await response.json();
            if (data) {
                setMangaData(data.manga);
            }
        }
        fetchData();
    }, [props.slug]);
    return (
        <div className={cx("wrapper")}>
            <Row style={{ position: "relative", height: "450px" }}>
                {mangaData ? (
                    <div className={cx("banner")}>
                        {" "}
                        <div
                            className={cx("background")}
                            style={{
                                backgroundImage: `url(${mangaData.image})`,
                            }}
                        ></div>
                        <div className={cx("inner")}>
                            <div className={cx("information")}>
                                <div className={cx("img")}>
                                    <img src={mangaData.image} alt="" />
                                </div>
                                <div className={cx("content")}>
                                    <h1>{mangaData.name}</h1>
                                    <div className={cx("author")}>
                                        <UserOutlined /> {mangaData.author}
                                    </div>
                                    <h4>
                                        <span />
                                        Đang tiến hành
                                    </h4>
                                    <ul>
                                        <li>Thể loại: </li>
                                        {mangaData.genres.map((genre) => (
                                            <li key={genre.id}>{genre.name}</li>
                                        ))}
                                    </ul>
                                    <div className={cx("action")}>
                                        <div>
                                            <BookOutlineIcon /> Đọc ngay
                                        </div>
                                        <div>
                                            <NewestIcon />
                                            Chap mới nhất
                                        </div>
                                        <div>
                                            <SaveIcon />
                                        </div>
                                        <div>
                                            <BellOutlineIcon />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>null</p>
                )}
            </Row>
            {mangaData ? (
                <Row justify="center" style={{ marginTop: "70px" }}>
                    <Col span={22}>
                        <h4 className={cx("description")}>{mangaData.des}</h4>
                    </Col>
                    <Col span={22}>
                        <h2 className={cx("title")}>Bình chọn</h2>
                        <div className={cx("vote")}>
                            0<ArrowUpOutlined />
                        </div>
                    </Col>
                    <Col span={22}>
                        <h2 className={cx("title")}>Danh sách chương</h2>
                        <div className={cx("chapters")}>
                            <div className={cx("head")}>
                                <Input
                                    style={{
                                        background: "rgb(95, 95, 95)",
                                        color: "#fff",
                                        width: "40%",
                                        height: 40,
                                    }}
                                    size="small"
                                    placeholder="Đi đến chương..."
                                    suffix={
                                        <FilterOutlined
                                            style={{ fontSize: 15 }}
                                        />
                                    }
                                />
                            </div>
                            <div className={cx("items")}>
                                {mangaData.chapters.map((item) => (
                                    
                                        <Link key={item.id} className={cx("item")}
                                            to={`/manga-details/${mangaData.slug}/${item.slug_chapter}/${item.id}`}
                                            state={[mangaData, item.name, item.slug_chapter, item.id]}
                                        >
                                            <div className={cx("inner")}>
                                                <p className={cx("name")}>
                                                    <b>{item.name}</b>
                                                </p>
                                                <div className={cx("date")}>
                                                    <p>
                                                        {
                                                            item.created_at.split(
                                                                "T"
                                                            )[0]
                                                        }
                                                    </p>
                                                    <BookIcon />
                                                </div>
                                            </div>
                                        </Link>
                                    
                                ))}
                            </div>
                        </div>
                    </Col>
                    <Col span={22}>
                        <h2 className={cx("title")}>Bình luận</h2>
                        <div className={cx("login-require")}>
                            <Link to="/">Đăng nhập</Link> để bình luận bạn nhé
                        </div>
                    </Col>
                </Row>
            ) : (
                <p>null</p>
            )}
        </div>
    );
}

export default Manga;
