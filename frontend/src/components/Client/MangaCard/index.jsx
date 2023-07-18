import classNames from "classnames/bind";
import styles from "./MangaCard.module.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { ReactComponent as ChapterIcon } from "@/assets/images/Manga/paper-document-svgrepo-com.svg";
import { ReactComponent as TimeIcon } from "@/assets/images/Manga/time-2-svgrepo-com.svg";
import { ReactComponent as ReadIcon } from "@/assets/images/Manga/glasses-svgrepo-com.svg";
import { ReactComponent as StatusIcon } from "@/assets/images/Manga/waves-right-svgrepo-com.svg";

const cx = classNames.bind(styles);

function MangaCard(props) {
    const [updateTime, setUpdateTime] = useState();
    const [chapterNewest, setChapterNewest] = useState();
    useEffect(() => {
        let maxId = -1;

        for (let i = 0; i < props.chapters.length; i++) {
            if (props.chapters[i].id > maxId) {
                maxId = props.chapters[i].id;
                setChapterNewest(props.chapters[i].name);
            }
        }
    }, [props.chapters]);
    useEffect(() => {
        var today = new Date();
        var updateDate = {};
        if (props.last_chapter_uploaded_at == null) {
            updateDate = new Date(props.updated_at);
        } else {
            updateDate = new Date(props.last_chapter_uploaded_at);
        }

        if (today.getFullYear() !== updateDate.getFullYear()) {
            setUpdateTime(
                today.getFullYear() - updateDate.getFullYear() + " năm trước"
            );
        } else {
            if (today.getMonth() !== updateDate.getMonth()) {
                setUpdateTime(
                    today.getMonth() - updateDate.getMonth() + " tháng trước"
                );
            } else {
                if (today.getDate() !== updateDate.getDate()) {
                    setUpdateTime(
                        today.getDate() - updateDate.getDate() + " ngày trước"
                    );
                } else {
                    if (today.getHours() !== updateDate.getHours()) {
                        setUpdateTime(
                            today.getHours() -
                            updateDate.getHours() +
                            " giờ trước"
                        );
                    } else {
                        if (today.getMinutes() !== updateDate.getMinutes()) {
                            setUpdateTime(
                                today.getMinutes() -
                                updateDate.getMinutes +
                                " phút trước"
                            );
                        } else {
                            if (
                                today.getSeconds() !== updateDate.getSeconds()
                            ) {
                                setUpdateTime(
                                    today.getSeconds() -
                                    updateDate.getSeconds +
                                    " giây trước"
                                );
                            }
                        }
                    }
                }
            }
        }
    }, [props.last_chapter_uploaded_at, props.updated_at]);
    return (
        <div className={cx("wrapper")}>
            <div className={cx("img")}>
                <img src={props.image} alt="" />
                <div className={cx("chapter")}>{chapterNewest}</div>
                <div className={cx("hover")}>
                    <h2>{props.name}</h2>
                    <div>
                        <ChapterIcon />
                        {chapterNewest}
                    </div>
                    <div>
                        <TimeIcon />
                       { props.chapters[0].uploaded_at} 
                    </div>
                    <div>
                        <StatusIcon />
                        Đang tiến hành
                    </div>
                    <div>
                        <Link
                            to={`/manga-details/${props.slug}/${props.chapters[0].slug_chapter}/${props.chapters[0].id}`}
                            state={[
                                props,
                                props.chapters[0].name,
                                props.chapters[0].slug_chapter,
                                props.chapters[0].id,
                            ]}
                        >
                            <ReadIcon /> Đọc ngay
                        </Link>
                        <Link to={`/manga-details/${props.slug}`} state={props}>
                            <InfoCircleOutlined />
                            Thông tin
                        </Link>
                    </div>
                </div>
            </div>
            <Link to={`/manga-details/${props.slug}`} state={props}>
                <h2>{props.name}</h2>
            </Link>
        </div>
    );
}

export default MangaCard;
