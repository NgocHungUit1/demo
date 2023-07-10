import classNames from "classnames/bind";
import styles from "./Manga.module.scss";
import { Avatar, Col, Input, Modal, Row } from "antd";
import {
    UserOutlined,
    ArrowUpOutlined,
    FilterOutlined,
    CloseOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import { ReactComponent as BookOutlineIcon } from "@/assets/images/Manga/book-ouline.svg";
import { ReactComponent as NewestIcon } from "@/assets/images/Manga/newst-icon.svg";
import { ReactComponent as BookIcon } from "@/assets/images/Manga/book-icon.svg";
import { ReactComponent as ReplyIcon } from "@/assets/images/Manga/reply.svg";
import { ReactComponent as ActionIcon } from "@/assets/images/Manga/more-horizontal-svgrepo-com.svg";
import { ReactComponent as SaveIcon } from "@/assets/images/Manga/save-icon.svg";
import { ReactComponent as BellOutlineIcon } from "@/assets/images/Manga/bell-outline.svg";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Follow from "./Follow";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);

function Manga() {
    const location = useLocation();
    const props = location.state;
    const [mangaData, setMangaData] = useState();
    const [lastChapter, setLastChapter] = useState();
    const [firstChapter, setFirstChapter] = useState();
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(
                `http://localhost:8000/api/manga/details/${props.slug}`
            );
            const data = await response.json();
            if (data) {
                setMangaData(data.manga);

                setLastChapter(data.last_chapter);
                setFirstChapter(data.first_chapter);
            }
        }
        fetchData();
    }, [props.slug]);

    const [isFollowOpen, setIsFollowOpen] = useState(false);
    const { client } = useSelector((st) => st.client);
    console.log(mangaData);
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
                                        <Link
                                            to={`/manga-details/${mangaData.slug}/${lastChapter.slug_chapter}/${lastChapter.id}`}
                                            state={[
                                                mangaData,
                                                lastChapter.name,
                                                lastChapter.slug_chapter,
                                                lastChapter.id,
                                            ]}
                                        >
                                            <BookOutlineIcon /> Đọc ngay
                                        </Link>
                                        <Link
                                            to={`/manga-details/${mangaData.slug}/${firstChapter.slug_chapter}/${firstChapter.id}`}
                                            state={[
                                                mangaData,
                                                firstChapter.name,
                                                firstChapter.slug_chapter,
                                                firstChapter.id,
                                            ]}
                                        >
                                            <NewestIcon />
                                            Chap mới nhất
                                        </Link>
                                        <div
                                            onClick={() =>
                                                setIsFollowOpen(true)
                                            }
                                        >
                                            <SaveIcon />
                                        </div>
                                        <div>
                                            <BellOutlineIcon />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Follow
                            image={mangaData.image}
                            name={mangaData.name}
                            open={isFollowOpen}
                            onCancel={() => setIsFollowOpen(false)}
                        />
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
                                    <Link
                                        key={item.id}
                                        className={cx("item")}
                                        to={`/manga-details/${mangaData.slug}/${item.slug_chapter}/${item.id}`}
                                        state={[
                                            mangaData,
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
                        {client ? (
                            <div className={cx("comment-input")}>
                                <p>
                                    <i>
                                        Hãy bình luận văn minh, lịch sự và mang
                                        tính xây dựng
                                    </i>
                                </p>
                                <Input.TextArea
                                    rows={6}
                                    placeholder="Để lại bình luận..."
                                />
                            </div>
                        ) : (
                            <div className={cx("login-require")}>
                                <Link to="/login">Đăng nhập</Link> để bình luận
                                bạn nhé
                            </div>
                        )}
                        <div className={cx("comment-wrapper")}>
                            {mangaData.comments.map((comment) => (
                                <div className={cx("comment")} key={comment.id}>
                                    <div className={cx("parent")}>
                                        <div className={cx("user-action")}>
                                            <div className={cx("user")}>
                                                {comment.user.image ? (
                                                    <Avatar
                                                        size={50}
                                                        src={comment.user.image}
                                                    />
                                                ) : (
                                                    <Avatar
                                                        size={50}
                                                        icon={<UserOutlined />}
                                                        style={{
                                                            backgroundColor:
                                                                "rgb(63,63,63)",
                                                        }}
                                                    />
                                                )}
                                                <p>{comment.user.name}</p>
                                            </div>
                                            <div className={cx("action")}>
                                                <button>
                                                    <ActionIcon />
                                                </button>
                                            </div>
                                        </div>
                                        <p className={cx("des")}>
                                            {comment.comment}
                                        </p>
                                        <div className={cx("reply")}>
                                            <div className={cx("emoji")}>
                                                <button>
                                                    <ReplyIcon />
                                                </button>
                                            </div>
                                            <div className={cx("emoji")}>
                                                <button>👍</button>
                                                <p>0</p>
                                            </div>
                                            <div className={cx("emoji")}>
                                                <button>❤</button>
                                                <p>0</p>
                                            </div>
                                            <div className={cx("emoji")}>
                                                <button>🤡</button>
                                                <p>0</p>
                                            </div>
                                            <div className={cx("emoji")}>
                                                <button>😡</button>
                                                <p>0</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx("child")}>
                                        {comment.replies.map((reply) => (
                                            <div className={cx(
                                                "item"
                                            )} >
                                                <div
                                                    className={cx(
                                                        "user-action"
                                                    )}
                                                >
                                                    <div className={cx("user")}>
                                                        <Avatar
                                                            size={50}
                                                            icon={
                                                                <UserOutlined />
                                                            }
                                                            style={{
                                                                backgroundColor:
                                                                    "rgb(63,63,63)",
                                                            }}
                                                        />

                                                        <p>{reply.user_id }</p>
                                                    </div>
                                                    <div
                                                        className={cx("action")}
                                                    >
                                                        <button>
                                                            <ActionIcon />
                                                        </button>
                                                    </div>
                                                </div>
                                                <p className={cx("des")}>
                                                    {reply.comment}
                                                </p>
                                                <div className={cx("reply")}>
                                                    <div
                                                        className={cx("emoji")}
                                                    >
                                                        <button>
                                                            <ReplyIcon />
                                                        </button>
                                                    </div>
                                                    <div
                                                        className={cx("emoji")}
                                                    >
                                                        <button>👍</button>
                                                        <p>0</p>
                                                    </div>
                                                    <div
                                                        className={cx("emoji")}
                                                    >
                                                        <button>❤</button>
                                                        <p>0</p>
                                                    </div>
                                                    <div
                                                        className={cx("emoji")}
                                                    >
                                                        <button>🤡</button>
                                                        <p>0</p>
                                                    </div>
                                                    <div
                                                        className={cx("emoji")}
                                                    >
                                                        <button>😡</button>
                                                        <p>0</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
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
