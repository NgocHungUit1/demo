import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { Col, Row } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import imagesLogin from "@/assets/images/Login";
import { setUser } from "@/store/Slice/user.slice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArrowButton from "@/components/Client/ArrowButton";
import imagesHome from "@/assets/images/Home";
import MangaCard from "@/components/Client/MangaCard";
import {
    newUpdateSettings,
    comicsSeasonSettings,
} from "@/services/HomeService";

const cx = classNames.bind(styles);

function Login() {
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
                setMangaLastUpdate(data.getMangaLastUpdate);
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
                    {mangaLastUpdate.map((item) => (
                        <div>
                            <div
                                className={cx("chapter-newest-bg")}
                                style={{
                                    backgroundImage: `url(${item.image})`,
                                }}
                            ></div>
                            <div className={cx("chapter-newest")}>
                                <div className={cx("content")} key={item.id}>
                                    <h3>Chapter 83.5</h3>
                                    <h1>{item.name}</h1>
                                    <h5>{item.des}</h5>
                                    <ul>
                                        <li>Comedy</li>
                                        <li>Comedy</li>
                                        <li>Comedy</li>
                                        <li>Comedy</li>
                                    </ul>
                                    <div>
                                        <button>Đọc ngay</button>
                                        <button>Chi tiết</button>
                                    </div>
                                </div>
                                <div className={cx("img")}>
                                    <img src={item.image} alt="" />
                                </div>
                            </div>
                        </div>
                    ))}
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
                                image={item.image}
                                name={item.name}
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
                        <div>
                            <div className={cx("comic-by-season")}>
                                <div className={cx("img")}>
                                    <img src={item.image} alt="" />
                                </div>
                                <div className={cx("content")}>
                                    <h2>{item.name}</h2>
                                    <p>
                                        {item.des}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                        
                        <div>
                            <div className={cx("comic-by-season")}>
                                <div className={cx("img")}>
                                    <img src={imagesHome.slide_1} />
                                </div>
                                <div className={cx("content")}>
                                    <h2>Uzaki-chan muốn đi chơi</h2>
                                    <p>
                                        Tên khác: Uzaki-chan Wants to Hang Out!,
                                        Uzaki-chan Wants to Play!Phiền phức!
                                        Đáng yêu! Nhưng mà phiền phức!Câu truyện
                                        thường ngày của một sinh viên trầm lặng
                                        chỉ muốn được ở một mình, nhưng lại bị
                                        trêu chọc bởi nhỏ Kouhai đáng yêu, ngực
                                        bự
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={cx("comic-by-season")}>
                                <div className={cx("img")}>
                                    <img src={imagesHome.slide_1} />
                                </div>
                                <div className={cx("content")}>
                                    <h2>Uzaki-chan muốn đi chơi</h2>
                                    <p>
                                        Tên khác: Uzaki-chan Wants to Hang Out!,
                                        Uzaki-chan Wants to Play!Phiền phức!
                                        Đáng yêu! Nhưng mà phiền phức!Câu truyện
                                        thường ngày của một sinh viên trầm lặng
                                        chỉ muốn được ở một mình, nhưng lại bị
                                        trêu chọc bởi nhỏ Kouhai đáng yêu, ngực
                                        bự
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={cx("comic-by-season")}>
                                <div className={cx("img")}>
                                    <img src={imagesHome.slide_1} />
                                </div>
                                <div className={cx("content")}>
                                    <h2>Uzaki-chan muốn đi chơi</h2>
                                    <p>
                                        Tên khác: Uzaki-chan Wants to Hang Out!,
                                        Uzaki-chan Wants to Play!Phiền phức!
                                        Đáng yêu! Nhưng mà phiền phức!Câu truyện
                                        thường ngày của một sinh viên trầm lặng
                                        chỉ muốn được ở một mình, nhưng lại bị
                                        trêu chọc bởi nhỏ Kouhai đáng yêu, ngực
                                        bự
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={cx("comic-by-season")}>
                                <div className={cx("img")}>
                                    <img src={imagesHome.slide_1} />
                                </div>
                                <div className={cx("content")}>
                                    <h2>Uzaki-chan muốn đi chơi</h2>
                                    <p>
                                        Tên khác: Uzaki-chan Wants to Hang Out!,
                                        Uzaki-chan Wants to Play!Phiền phức!
                                        Đáng yêu! Nhưng mà phiền phức!Câu truyện
                                        thường ngày của một sinh viên trầm lặng
                                        chỉ muốn được ở một mình, nhưng lại bị
                                        trêu chọc bởi nhỏ Kouhai đáng yêu, ngực
                                        bự
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={cx("comic-by-season")}>
                                <div className={cx("img")}>
                                    <img src={imagesHome.slide_1} />
                                </div>
                                <div className={cx("content")}>
                                    <h2>Uzaki-chan muốn đi chơi</h2>
                                    <p>
                                        Tên khác: Uzaki-chan Wants to Hang Out!,
                                        Uzaki-chan Wants to Play!Phiền phức!
                                        Đáng yêu! Nhưng mà phiền phức!Câu truyện
                                        thường ngày của một sinh viên trầm lặng
                                        chỉ muốn được ở một mình, nhưng lại bị
                                        trêu chọc bởi nhỏ Kouhai đáng yêu, ngực
                                        bự
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={cx("comic-by-season")}>
                                <div className={cx("img")}>
                                    <img src={imagesHome.slide_1} />
                                </div>
                                <div className={cx("content")}>
                                    <h2>Uzaki-chan muốn đi chơi</h2>
                                    <p>
                                        Tên khác: Uzaki-chan Wants to Hang Out!,
                                        Uzaki-chan Wants to Play!Phiền phức!
                                        Đáng yêu! Nhưng mà phiền phức!Câu truyện
                                        thường ngày của một sinh viên trầm lặng
                                        chỉ muốn được ở một mình, nhưng lại bị
                                        trêu chọc bởi nhỏ Kouhai đáng yêu, ngực
                                        bự
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Slider>
                </Col>

                <Col xl={6} sm={12}>
                    <div className={cx("comic-outstanding")}>
                        <h2>Manga nổi bật nhất</h2>
                        <ul>
                            {mangaPopular.popular.slice(0, 5).map((item) => (
                                <li className={cx("item")}>
                                    <img src={item.image} alt="" />
                                    <div>
                                        <h3>{item.name}</h3>
                                        <h4>Chappter 205</h4>
                                        <ul>
                                            <li>Fantasy</li>
                                            <li>Comedy</li>
                                            <li>Fantasy</li>
                                            <li>Fantasy</li>
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
                            {mangaPopular.popularMonth.slice(0, 5).map((item) => (
                                <li className={cx("item")}>
                                    <img src={item.image} alt="" />
                                    <div>
                                        <h3>{item.name}</h3>
                                        <h4>Chappter 205</h4>
                                        <ul>
                                            <li>Fantasy</li>
                                            <li>Comedy</li>
                                            <li>Fantasy</li>
                                            <li>Fantasy</li>
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
                            {mangaPopular.popularWeek.slice(0, 5).map((item) => (
                                <li className={cx("item")}>
                                    <img src={item.image} alt="" />
                                    <div>
                                        <h3>{item.name}</h3>
                                        <h4>Chappter 205</h4>
                                        <ul>
                                            <li>Fantasy</li>
                                            <li>Comedy</li>
                                            <li>Fantasy</li>
                                            <li>Fantasy</li>
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
                                <li className={cx("item")}>
                                    <img src={item.image} alt="" />
                                    <div>
                                        <h3>{item.name}</h3>
                                        <h4>Chappter 205</h4>
                                        <ul>
                                            <li>Fantasy</li>
                                            <li>Comedy</li>
                                            <li>Fantasy</li>
                                            <li>Fantasy</li>
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
                        {mangaLastUpdate.map((item) => (
                            <MangaCard
                                key={item.id}
                                image={item.image}
                                name={item.name}
                            />
                        ))}
                    </Slider>
                </Col>
            </Row>
        </div>
    );
}

export default Login;
