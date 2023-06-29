import classNames from "classnames/bind";
import styles from "./Manga.module.scss";
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
import { useLocation } from "react-router-dom";

const cx = classNames.bind(styles);

function Manga() {
    const location = useLocation();
    const slug= location.state?.slug;
    const [mangaData, setMangaData] = useState();
    
    useEffect(() => {
        fetch(`http://localhost:8000/api/manga/details/${slug}`)
          .then(response => response.json())
          .then(data => {
            setMangaData(data.data);
          });
      }, [slug]);

    return (
        <div className={cx("wrapper")}>
            <Row style={{ position: "relative", height: "450px" }}>
                {
                    mangaData?.(<div key={mangaData.id}>
                        <div
                            className={cx("chapter-newest-bg")}
                            style={{
                                backgroundImage: `url(${mangaData.image})`,
                            }}
                        ></div>
                        <div className={cx("chapter-newest")}>
                            <div className={cx("content")}>
                                <h3>{mangaData.chapters[0].name}</h3>
                                <h1>{mangaData.name}</h1>
                                <h5>{mangaData.des}</h5>
                                <ul>
                                    {mangaData.genres.map((genre) => (
                                        <li key={genre.id}>{genre.name}</li>
                                    ))}
                                </ul>
                                <div>
                                    <button>Đọc ngay</button>
                                    <button>Chi tiết</button>
                                </div>
                            </div>
                            <div className={cx("img")}>
                                <img src={mangaData.image} alt="" />
                            </div>
                        </div>
                    </div>)
                }
            </Row>
        </div>
    );
}

export default Manga;
