import classNames from "classnames/bind";
import styles from "./Manga.module.scss";
import { Col, Input, Row } from "antd";
import {
    UserOutlined,
    ArrowUpOutlined,
    FilterOutlined,
    SettingOutlined,
    ArrowDownOutlined,
    UpOutlined,
    DownOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import { ReactComponent as BookOutlineIcon } from "@/assets/images/Manga/book-ouline.svg";
import { ReactComponent as NewestIcon } from "@/assets/images/Manga/newst-icon.svg";
import { ReactComponent as BookIcon } from "@/assets/images/Manga/book-icon.svg";
import { ReactComponent as SaveIcon } from "@/assets/images/Manga/save-icon.svg";
import { ReactComponent as BellOutlineIcon } from "@/assets/images/Manga/bell-outline.svg";
import { ReactComponent as SendIcon } from "@/assets/images/Manga/send-2-svgrepo-com.svg";
import { ReactComponent as EmojiIcon } from "@/assets/images/Manga/smile-circle-svgrepo-com.svg";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Follow from "./Follow";
import { useSelector } from "react-redux";
import Comment from "@/components/Comment";
import axios from "axios";

const cx = classNames.bind(styles);

function Manga() {
    const { client } = useSelector((st) => st.client);
    const location = useLocation();
    const props = location.state;
    const [mangaData, setMangaData] = useState();
    const [lastChapter, setLastChapter] = useState();
    const [firstChapter, setFirstChapter] = useState();
    const [comments, setComments] = useState([]);
    const [commentOpen, setCommentOpen] = useState(false);
    const [isVote, setIsVote] = useState(false);
    const [isFollowOpen, setIsFollowOpen] = useState(false);
    const [comment, setComment] = useState("");
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
    }, [props.slug, isVote]);
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(
                `http://localhost:8000/api/comment/details/${props.id}`
            );
            const data = await response.json();
            if (data) {
                setComments(data.comments);
            }
        }
        fetchData();
    }, [props.id]);

    useEffect(() => {
        async function fetchData() {
            try {
                await axios
                    .get(`http://localhost:8000/api/likes/${props.id}`, {
                        headers: {
                            Authorization: `Bearer ${client.access_token}`,
                            "Content-Type": "application/json",
                        },
                    })
                    .then((response) => {
                        const { mangas } = response.data;
                        const liked = mangas === 1;
                        setIsVote(liked);
                    });
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [props.id]);
    const createMangaComment = async (comment, commentId, userId) => {
        try {
            const response = await axios.post(
                `http://localhost:8000/api/manga/${mangaData.id}/comments`,
                {
                    comment: comment,
                    id: userId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${client.access_token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            setComment("");
        } catch (error) {
            console.error(error);
        }
    };
    const handelVote = async () => {
        try {
            const type = isVote ? "down" : "up";

            await axios
                .post(
                    `http://localhost:8000/api/favourite-manga/${mangaData.id}`,
                    { type },
                    {
                        headers: {
                            Authorization: `Bearer ${client.access_token}`,
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then((response) => {
                    setIsVote((prevLiked) => !prevLiked);
                });
        } catch (error) {
            console.error(error);
        }
    };

    const commentClassName = cx("item", {
        open: commentOpen,
    });

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
                        <div
                            className={cx("vote")}
                            onClick={() => handelVote()}
                        >
                            {mangaData.like}
                            {isVote ? (
                                <ArrowDownOutlined />
                            ) : (
                                <ArrowUpOutlined />
                            )}
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
                                    onChange={(e) => setComment(e.target.value)}
                                    value={comment}
                                />
                                <div className={cx("send")}>
                                    <button>
                                        <SettingOutlined />
                                    </button>
                                    <button>
                                        <EmojiIcon />
                                    </button>
                                    <button
                                        onClick={() =>
                                            createMangaComment(
                                                comment,
                                                client.user.id
                                            )
                                        }
                                    >
                                        <SendIcon />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className={cx("login-require")}>
                                <Link to="/login">Đăng nhập</Link> để bình luận
                                bạn nhé
                            </div>
                        )}
                        <div className={cx("comment-wrapper")}>
                            {comments.map((comment) => (
                                <div className={cx("comment")} key={comment.id}>
                                    <div className={cx("parent")}>
                                        <Comment
                                            comment={comment}
                                            mangaId={mangaData.id}
                                            commentId={comment.id}
                                        />
                                    </div>
                                    <div className={cx("child")}>
                                        {comment.replies.map((reply) => (
                                            <div
                                                className={commentClassName}
                                                key={reply.id}
                                            >
                                                <Comment
                                                    comment={reply}
                                                    mangaId={mangaData.id}
                                                    commentId={comment.id}
                                                />
                                            </div>
                                        ))}
                                        {comment.replies.length > 0 ? (
                                            <div
                                                className={cx("reply-number")}
                                                onClick={() =>
                                                    setCommentOpen(
                                                        (open) => !open
                                                    )
                                                }
                                            >
                                                <p>
                                                    {comment.replies.length} câu
                                                    trả lời{" "}
                                                </p>
                                                {commentOpen ? (
                                                    <UpOutlined />
                                                ) : (
                                                    <DownOutlined />
                                                )}
                                            </div>
                                        ) : (
                                            ""
                                        )}
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
