import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { Col, Row } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import { useState, useEffect } from "react";
import ArrowButton from "@/components/Client/ArrowButton";

import MangaCard from "@/components/Client/MangaCard";
import {
    newUpdateSettings,
    comicsSeasonSettings,
} from "@/services/HomeService";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Home() {
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        speed: 2000,
        autoplaySpeed: 4000,
        nextArrow: (
            <ArrowButton small style1_next>
                <RightOutlined />
            </ArrowButton>
        ),
        prevArrow: (
            <ArrowButton small style1_prev>
                <LeftOutlined />
            </ArrowButton>
        ),
    };
    const [mangaLastUpdate, setMangaLastUpdate] = useState([]);
    const [mangaPopularS, setMangaPopularS] = useState([]);
    // truyện mới
    const [mangaNew, setMangaNew] = useState([]);
    const [mangaPopular, setMangaPopular] = useState({
        popular: [],
        popularDay: [],
        popularWeek: [],
        popularMonth: [],
    });
    useEffect(() => {
        async function fetchData() {
            const response = await fetch("http://localhost:8000/api/home");
            const data = await response.json();
            if (data) {
                setMangaPopularS(data.getMangaPopular);
                setMangaLastUpdate(data.getMangaLastUpdate);
                setMangaNew(data.getMangaNew);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(
                "http://localhost:8000/api/home/topviews"
            );
            const data = await response.json();
            // if(data) {
            //     setMangaPopular(popular = )
            // }
            if (data) {
                setMangaPopular({
                    popular: data.getMostViewedMangas,
                    popularDay: data.getMostViewedMangasThisDay,
                    popularWeek: data.getMostViewedMangasThisWeek,
                    popularMonth: data.getMostViewedMangasThisMonth,
                });
            }
        }
        fetchData();
    }, []);

    return (
        <div className={cx("wrapper")}>
            <Row style={{ position: "relative", height: "450px" }}>
                <Slider
                    {...settings}
                    style={{ position: "unset", width: "100%" }}
                >
                    {mangaPopularS && mangaPopularS.length ? (
                        mangaPopularS.map((item) => (
                            <div key={item.id}>
                                <div
                                    className={cx("chapter-newest-bg")}
                                    style={{
                                        backgroundImage: `url(${item.image})`,
                                    }}
                                ></div>
                                <div className={cx("chapter-newest")}>
                                    <div className={cx("content")}>
                                        <h3>{item.chapters[0].name}</h3>
                                        <h1>{item.name}</h1>
                                        <h5>{item.des}</h5>
                                        <ul>
                                            {item.genres.map((genre) => (
                                                <li key={genre.id}>
                                                    {genre.name}
                                                </li>
                                            ))}
                                        </ul>
                                        <div>
                                            <button>
                                                <Link
                                                    to={`/manga-details/${item.slug}/${item.chapters[0].slug_chapter}/${item.chapters[0].id}`}
                                                    state={[
                                                        item,
                                                        item.chapters[0].name,
                                                        item.chapters[0].slug_chapter,
                                                        item.chapters[0].id,
                                                    ]}
                                                >
                                                    Đọc ngay
                                                </Link>
                                            </button>
                                            <button>
                                                <Link
                                                    to={`/manga-details/${item.slug}`}
                                                    state={item}
                                                >
                                                    Chi tiết
                                                </Link>
                                            </button>
                                        </div>
                                    </div>
                                    <div className={cx("img")}>
                                        <img src={item.image} alt="" />
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Không có kết quả.</p>
                    )}
                </Slider>
            </Row>
            <Row style={{ margin: "20px 100px" }}>
                <Col
                    span={24}
                    style={{
                        margin: "20px 0",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                    }}
                >
                    <h2 className={cx("title")}>Mới cập nhật</h2>
                    <RightOutlined />
                </Col>
                <Col span={24} style={{ marginBottom: 40 }}>
                    <Slider {...newUpdateSettings}>
                        {mangaLastUpdate.map((item) => (
                            <MangaCard
                                key={item.id}
                                id={item.id}
                                slug={item.slug}
                                image={item.image}
                                name={item.name}
                                updated_at={item.updated_at}
                                chapters={item.chapters}
                                last_chapter_uploaded_at={
                                    item.last_chapter_uploaded_at
                                }
                            />
                        ))}
                    </Slider>
                </Col>

                <Col
                    span={24}
                    style={{
                        margin: "20px 0",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                    }}
                >
                    <h2 className={cx("title")}>Comics Mùa Xuân</h2>
                </Col>
                <Col span={24} style={{ marginBottom: 40 }}>
                    <Slider {...comicsSeasonSettings}>
                        {mangaLastUpdate.map((item) => (
                            <div key={item.id}>
                                <div className={cx("comic-by-season")}>
                                    <div className={cx("img")}>
                                        <img src={item.image} alt="" />
                                    </div>
                                    <div className={cx("content")}>
                                        <h2>{item.name}</h2>
                                        <p>{item.des}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </Col>

                <Col xl={6} sm={12}>
                    <div className={cx("comic-outstanding")}>
                        <h2>Manga nổi bật nhất</h2>
                        <ul>
                            {mangaPopular.popular.slice(0, 5).map((item) => (
                                <li className={cx("item")} key={item.id}>
                                    <img src={item.image} alt="" />
                                    <div>
                                        <h3>{item.name}</h3>
                                        <h4>{item.views_count}</h4>
                                        <ul>
                                            {item.genres.map((genre) => (
                                                <li key={genre.id}>
                                                    {genre.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className={cx("more")}>
                            <p>Xem thêm</p>
                            <RightOutlined />
                        </div>
                    </div>
                </Col>
                <Col xl={6} sm={12}>
                    <div className={cx("comic-outstanding")}>
                        <h2>Manga nổi bật tháng</h2>
                        <ul>
                            {mangaPopular.popularMonth
                                .slice(0, 5)
                                .map((item) => (
                                    <li className={cx("item")} key={item.id}>
                                        <img src={item.image} alt="" />
                                        <div>
                                            <h3>{item.name}</h3>
                                            <h4>{item.views_count}</h4>
                                            <ul>
                                                {item.genres.map((genre) => (
                                                    <li key={genre.id}>
                                                        {genre.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </li>
                                ))}
                        </ul>
                        <div className={cx("more")}>
                            <p>Xem thêm</p>
                            <RightOutlined />
                        </div>
                    </div>
                </Col>
                <Col xl={6} sm={12}>
                    <div className={cx("comic-outstanding")}>
                        <h2>Manga nổi bật tuần</h2>
                        <ul>
                            {mangaPopular.popularWeek
                                .slice(0, 5)
                                .map((item) => (
                                    <li className={cx("item")} key={item.id}>
                                        <img src={item.image} alt="" />
                                        <div>
                                            <h3>{item.name}</h3>
                                            <h4>{item.views_count}</h4>
                                            <ul>
                                                {item.genres.map((genre) => (
                                                    <li key={genre.id}>
                                                        {genre.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </li>
                                ))}
                        </ul>
                        <div className={cx("more")}>
                            <p>Xem thêm</p>
                            <RightOutlined />
                        </div>
                    </div>
                </Col>
                <Col xl={6} sm={12}>
                    <div className={cx("comic-outstanding")}>
                        <h2>Manga nổi bật ngày</h2>
                        <ul>
                            {mangaPopular.popularDay.slice(0, 5).map((item) => (
                                <li className={cx("item")} key={item.id}>
                                    <img src={item.image} alt="" />
                                    <div>
                                        <h3>{item.name}</h3>
                                        <h4>{item.views_count}</h4>
                                        <ul>
                                            {item.genres.map((genre) => (
                                                <li key={genre.id}>
                                                    {genre.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className={cx("more")}>
                            <p>Xem thêm</p>
                            <RightOutlined />
                        </div>
                    </div>
                </Col>

                <Col
                    span={24}
                    style={{
                        margin: "20px 0",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                    }}
                >
                    <h2 className={cx("title")}>Truyện mới</h2>
                    <RightOutlined />
                </Col>
                <Col span={24} style={{ marginBottom: 40 }}>
                    <Slider {...newUpdateSettings}>
                        {mangaNew.map((item) => (
                            <MangaCard
                                key={item.id}
                                id={item.id}
                                slug={item.slug}
                                image={item.image}
                                name={item.name}
                                updated_at={item.updated_at}
                                chapters={item.chapters}
                                last_chapter_uploaded_at={
                                    item.last_chapter_uploaded_at
                                }
                            />
                        ))}
                    </Slider>
                </Col>
            </Row>
        </div>
    );
}

export default Home;
