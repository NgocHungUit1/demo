import classNames from "classnames/bind";
import styles from "./ChapterView.module.scss";
import { ReactComponent as LogoIcon } from "@/assets/images/logo.svg";
import { Drawer, Row, Col, Input } from "antd";
import {
    ArrowLeftOutlined,
    ArrowRightOutlined,
    CloseOutlined,
    FilterOutlined,
    RightOutlined,
} from "@ant-design/icons";
import { ReactComponent as BookIcon } from "@/assets/images/Manga/book-icon.svg";

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const cx = classNames.bind(styles);

function ChapterView() {
    const location = useLocation();
    const props = location.state;
    const [mangaData, setMangaData] = useState();
    console.log(props);
   
    return (
        <Row full className={cx("wrapper")}>
            <div className={cx("sidebar")}>
                <div className={cx("head")}>
                    <div>
                        <ArrowLeftOutlined />
                    </div>
                    <LogoIcon />
                    <div>
                        <RightOutlined />
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
                            borderRadius: 8
                        }}
                        size="small"
                        placeholder="Đi đến chương..."
                        suffix={<FilterOutlined style={{ fontSize: 12 }} />}
                    />
                    <div className={cx("items")}>
                                {props[0].chapters.map((item) => (
                                    
                                        <Link  key={item.id}className={cx("item")}
                                            to={`/manga-details/${props[0].slug}/${item.slug_chapter}`}
                                            state={[mangaData, item.name, item.slug_chapter]}
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
            </div>
            <Col span={24}>
                <div className={cx("content")}>
                    <LogoIcon />
                </div>
            </Col>
        </Row>
    );
}
export default ChapterView;
