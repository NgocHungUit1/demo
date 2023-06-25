import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { Col, Row, Carousel, Button, Checkbox, Form, Input, Card } from "antd";
import {
    UserOutlined,
    LockOutlined,
    RightOutlined,
    LeftOutlined,
} from "@ant-design/icons";
import { ReactComponent as LogoIcon } from "@/assets/images/logo.svg";
import { ReactComponent as Slide_1 } from "@/assets/images/Login/slide-1.svg";
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
    const chapterNewest = [
        {
            id: 1,
            name: "Thất nghiệp chuyển sinh - Làm lại hết sức",
        },
    ];
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
    const [mangaPopular, setMangaPopular] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const response = await fetch("http://localhost:8000/api/home");
            const data = await response.json();
            if (Array.isArray(data.data)) {
                setMangaPopular(data.data);
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
                    <div>
                        <div
                            className={cx("chapter-newest-bg")}
                            style={{
                                backgroundImage: `url(${imagesHome.slide_1})`,
                            }}
                        ></div>
                        <div className={cx("chapter-newest")}>
                            <div className={cx("content")}>
                                <h3>Chapter 83.5</h3>
                                <h1>
                                    Thất nghiệp chuyển sinh - Làm lại hết sức
                                </h1>
                                <h5>
                                    Đại khái là một thanh niên neet không trẻ
                                    mấy sau có cơ hội được làm lại cuộc đời và
                                    trong lốt một thằng nhóc, anh ấy bắt đầu xây
                                    dựng.... harem cho tương lai thằng nhóc đó
                                    (mà thằng nhóc đó chính là ảnh)
                                </h5>
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
                                <img src={imagesHome.slide_1} alt="" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div
                            className={cx("chapter-newest-bg")}
                            style={{
                                backgroundImage: `url(${imagesHome.slide_1})`,
                            }}
                        ></div>
                        <div className={cx("chapter-newest")}>
                            <div className={cx("content")}>
                                <h3>Chapter 83.5</h3>
                                <h1>
                                    Thất nghiệp chuyển sinh - Làm lại hết sức
                                </h1>
                                <h5>
                                    Đại khái là một thanh niên neet không trẻ
                                    mấy sau có cơ hội được làm lại cuộc đời và
                                    trong lốt một thằng nhóc, anh ấy bắt đầu xây
                                    dựng.... harem cho tương lai thằng nhóc đó
                                    (mà thằng nhóc đó chính là ảnh)
                                </h5>
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
                                <img src={imagesHome.slide_1} alt="" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div
                            className={cx("chapter-newest-bg")}
                            style={{
                                backgroundImage: `url(${imagesHome.slide_1})`,
                            }}
                        ></div>
                        <div className={cx("chapter-newest")}>
                            <div className={cx("content")}>
                                <h3>Chapter 83.5</h3>
                                <h1>
                                    Thất nghiệp chuyển sinh - Làm lại hết sức
                                </h1>
                                <h5>
                                    Đại khái là một thanh niên neet không trẻ
                                    mấy sau có cơ hội được làm lại cuộc đời và
                                    trong lốt một thằng nhóc, anh ấy bắt đầu xây
                                    dựng.... harem cho tương lai thằng nhóc đó
                                    (mà thằng nhóc đó chính là ảnh)
                                </h5>
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
                                <img src={imagesHome.slide_1} alt="" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div
                            className={cx("chapter-newest-bg")}
                            style={{
                                backgroundImage: `url(${imagesHome.slide_1})`,
                            }}
                        ></div>
                        <div className={cx("chapter-newest")}>
                            <div className={cx("content")}>
                                <h3>Chapter 83.5</h3>
                                <h1>
                                    Thất nghiệp chuyển sinh - Làm lại hết sức
                                </h1>
                                <h5>
                                    Đại khái là một thanh niên neet không trẻ
                                    mấy sau có cơ hội được làm lại cuộc đời và
                                    trong lốt một thằng nhóc, anh ấy bắt đầu xây
                                    dựng.... harem cho tương lai thằng nhóc đó
                                    (mà thằng nhóc đó chính là ảnh)
                                </h5>
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
                                <img src={imagesHome.slide_1} alt="" />
                            </div>
                        </div>
                    </div>
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
                        <MangaCard
                            image={imagesHome.slide_1}
                            name="That nghiep chuyen sinh - làm lại hết sức"
                        />
                        <MangaCard
                            image={imagesHome.slide_1}
                            name="That nghiep chuyen sinh - làm lại hết sức"
                        />
                        <MangaCard
                            image={imagesHome.slide_1}
                            name="That nghiep chuyen sinh - làm lại hết sức"
                        />
                        <MangaCard
                            image={imagesHome.slide_1}
                            name="That nghiep chuyen sinh - làm lại hết sức"
                        />
                        <MangaCard
                            image={imagesHome.slide_1}
                            name="That nghiep chuyen sinh - làm lại hết sức"
                        />
                        <MangaCard
                            image={imagesHome.slide_1}
                            name="That nghiep chuyen sinh - làm lại hết sức"
                        />
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
                            <li className={cx("item")}>
                                <img src={imagesHome.slide_1} alt="" />
                                <div>
                                    <h3>Thanh guom giet quy</h3>
                                    <h4>Chappter 205</h4>
                                    <ul>
                                        <li>Fantasy</li>
                                        <li>Comedy</li>
                                        <li>Fantasy</li>
                                        <li>Fantasy</li>
                                    </ul>
                                </div>
                            </li>
                            <li className={cx("item")}>
                                <img src={imagesHome.slide_1} alt="" />
                                <div>
                                    <h3>Thanh guom giet quy</h3>
                                    <h4>Chappter 205</h4>
                                    <ul>
                                        <li>Fantasy</li>
                                        <li>Comedy</li>
                                        <li>Fantasy</li>
                                        <li>Fantasy</li>
                                    </ul>
                                </div>
                            </li>
                            <li className={cx("item")}>
                                <img src={imagesHome.slide_1} alt="" />
                                <div>
                                    <h3>Thanh guom giet quy</h3>
                                    <h4>Chappter 205</h4>
                                    <ul>
                                        <li>Fantasy</li>
                                        <li>Comedy</li>
                                        <li>Fantasy</li>
                                        <li>Fantasy</li>
                                    </ul>
                                </div>
                            </li>
                            <li className={cx("item")}>
                                <img src={imagesHome.slide_1} alt="" />
                                <div>
                                    <h3>Thanh guom giet quy</h3>
                                    <h4>Chappter 205</h4>
                                    <ul>
                                        <li>Fantasy</li>
                                        <li>Comedy</li>
                                        <li>Fantasy</li>
                                        <li>Fantasy</li>
                                    </ul>
                                </div>
                            </li>
                            <li className={cx("item")}>
                                <img src={imagesHome.slide_1} alt="" />
                                <div>
                                    <h3>Thanh guom giet quy</h3>
                                    <h4>Chappter 205</h4>
                                    <ul>
                                        <li>Fantasy</li>
                                        <li>Comedy</li>
                                        <li>Fantasy</li>
                                        <li>Fantasy</li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                        <div className={cx("more")}>
                            <p>Xem thêm</p>
                            <RightOutlined />
                        </div>
                    </div>
                </Col>
                <Col xl={6} sm={12}>
                    <div className={cx("comic-outstanding")}>
                        <h2>Manga nổi bật nhất</h2>
                        <ul>
                            <li className={cx("item")}>
                                <img src={imagesHome.slide_1} alt="" />
                                <div>
                                    <h3>Thanh guom giet quy</h3>
                                    <h4>Chappter 205</h4>
                                    <ul>
                                        <li>Fantasy</li>
                                        <li>Comedy</li>
                                        <li>Fantasy</li>
                                        <li>Fantasy</li>
                                    </ul>
                                </div>
                            </li>
                            <li className={cx("item")}>
                                <img src={imagesHome.slide_1} alt="" />
                                <div>
                                    <h3>Thanh guom giet quy</h3>
                                    <h4>Chappter 205</h4>
                                    <ul>
                                        <li>Fantasy</li>
                                        <li>Comedy</li>
                                        <li>Fantasy</li>
                                        <li>Fantasy</li>
                                    </ul>
                                </div>
                            </li>
                            <li className={cx("item")}>
                                <img src={imagesHome.slide_1} alt="" />
                                <div>
                                    <h3>Thanh guom giet quy</h3>
                                    <h4>Chappter 205</h4>
                                    <ul>
                                        <li>Fantasy</li>
                                        <li>Comedy</li>
                                        <li>Fantasy</li>
                                        <li>Fantasy</li>
                                    </ul>
                                </div>
                            </li>
                            <li className={cx("item")}>
                                <img src={imagesHome.slide_1} alt="" />
                                <div>
                                    <h3>Thanh guom giet quy</h3>
                                    <h4>Chappter 205</h4>
                                    <ul>
                                        <li>Fantasy</li>
                                        <li>Comedy</li>
                                        <li>Fantasy</li>
                                        <li>Fantasy</li>
                                    </ul>
                                </div>
                            </li>
                            <li className={cx("item")}>
                                <img src={imagesHome.slide_1} alt="" />
                                <div>
                                    <h3>Thanh guom giet quy</h3>
                                    <h4>Chappter 205</h4>
                                    <ul>
                                        <li>Fantasy</li>
                                        <li>Comedy</li>
                                        <li>Fantasy</li>
                                        <li>Fantasy</li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                        <div className={cx("more")}>
                            <p>Xem thêm</p>
                            <RightOutlined />
                        </div>
                    </div>
                </Col>
                <Col xl={6} sm={12}>
                    <div className={cx("comic-outstanding")}>
                        <h2>Manga nổi bật nhất</h2>
                        <ul>
                            <li className={cx("item")}>
                                <img src={imagesHome.slide_1} alt="" />
                                <div>
                                    <h3>Thanh guom giet quy</h3>
                                    <h4>Chappter 205</h4>
                                    <ul>
                                        <li>Fantasy</li>
                                        <li>Comedy</li>
                                        <li>Fantasy</li>
                                        <li>Fantasy</li>
                                    </ul>
                                </div>
                            </li>
                            <li className={cx("item")}>
                                <img src={imagesHome.slide_1} alt="" />
                                <div>
                                    <h3>Thanh guom giet quy</h3>
                                    <h4>Chappter 205</h4>
                                    <ul>
                                        <li>Fantasy</li>
                                        <li>Comedy</li>
                                        <li>Fantasy</li>
                                        <li>Fantasy</li>
                                    </ul>
                                </div>
                            </li>
                            <li className={cx("item")}>
                                <img src={imagesHome.slide_1} alt="" />
                                <div>
                                    <h3>Thanh guom giet quy</h3>
                                    <h4>Chappter 205</h4>
                                    <ul>
                                        <li>Fantasy</li>
                                        <li>Comedy</li>
                                        <li>Fantasy</li>
                                        <li>Fantasy</li>
                                    </ul>
                                </div>
                            </li>
                            <li className={cx("item")}>
                                <img src={imagesHome.slide_1} alt="" />
                                <div>
                                    <h3>Thanh guom giet quy</h3>
                                    <h4>Chappter 205</h4>
                                    <ul>
                                        <li>Fantasy</li>
                                        <li>Comedy</li>
                                        <li>Fantasy</li>
                                        <li>Fantasy</li>
                                    </ul>
                                </div>
                            </li>
                            <li className={cx("item")}>
                                <img src={imagesHome.slide_1} alt="" />
                                <div>
                                    <h3>Thanh guom giet quy</h3>
                                    <h4>Chappter 205</h4>
                                    <ul>
                                        <li>Fantasy</li>
                                        <li>Comedy</li>
                                        <li>Fantasy</li>
                                        <li>Fantasy</li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                        <div className={cx("more")}>
                            <p>Xem thêm</p>
                            <RightOutlined />
                        </div>
                    </div>
                </Col>
                <Col xl={6} sm={12}>
                    <div className={cx("comic-outstanding")}>
                        <h2>Manga nổi bật nhất</h2>
                        <ul>
                            <li className={cx("item")}>
                                <img src={imagesHome.slide_1} alt="" />
                                <div>
                                    <h3>Thanh guom giet quy</h3>
                                    <h4>Chappter 205</h4>
                                    <ul>
                                        <li>Fantasy</li>
                                        <li>Comedy</li>
                                        <li>Fantasy</li>
                                        <li>Fantasy</li>
                                    </ul>
                                </div>
                            </li>
                            <li className={cx("item")}>
                                <img src={imagesHome.slide_1} alt="" />
                                <div>
                                    <h3>Thanh guom giet quy</h3>
                                    <h4>Chappter 205</h4>
                                    <ul>
                                        <li>Fantasy</li>
                                        <li>Comedy</li>
                                        <li>Fantasy</li>
                                        <li>Fantasy</li>
                                    </ul>
                                </div>
                            </li>
                            <li className={cx("item")}>
                                <img src={imagesHome.slide_1} alt="" />
                                <div>
                                    <h3>Thanh guom giet quy</h3>
                                    <h4>Chappter 205</h4>
                                    <ul>
                                        <li>Fantasy</li>
                                        <li>Comedy</li>
                                        <li>Fantasy</li>
                                        <li>Fantasy</li>
                                    </ul>
                                </div>
                            </li>
                            <li className={cx("item")}>
                                <img src={imagesHome.slide_1} alt="" />
                                <div>
                                    <h3>Thanh guom giet quy</h3>
                                    <h4>Chappter 205</h4>
                                    <ul>
                                        <li>Fantasy</li>
                                        <li>Comedy</li>
                                        <li>Fantasy</li>
                                        <li>Fantasy</li>
                                    </ul>
                                </div>
                            </li>
                            <li className={cx("item")}>
                                <img src={imagesHome.slide_1} alt="" />
                                <div>
                                    <h3>Thanh guom giet quy</h3>
                                    <h4>Chappter 205</h4>
                                    <ul>
                                        <li>Fantasy</li>
                                        <li>Comedy</li>
                                        <li>Fantasy</li>
                                        <li>Fantasy</li>
                                    </ul>
                                </div>
                            </li>
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
                        <MangaCard
                            image={imagesHome.slide_1}
                            name="That nghiep chuyen sinh - làm lại hết sức"
                        />
                        <MangaCard
                            image={imagesHome.slide_1}
                            name="That nghiep chuyen sinh - làm lại hết sức"
                        />
                        <MangaCard
                            image={imagesHome.slide_1}
                            name="That nghiep chuyen sinh - làm lại hết sức"
                        />
                        <MangaCard
                            image={imagesHome.slide_1}
                            name="That nghiep chuyen sinh - làm lại hết sức"
                        />
                        <MangaCard
                            image={imagesHome.slide_1}
                            name="That nghiep chuyen sinh - làm lại hết sức"
                        />
                        <MangaCard
                            image={imagesHome.slide_1}
                            name="That nghiep chuyen sinh - làm lại hết sức"
                        />
                    </Slider>
                </Col>
            </Row>
        </div>
    );
}

export default Login;
