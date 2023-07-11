import classNames from "classnames/bind";
import styles from "./Browse.module.scss";
import { Input, Select } from "antd";
import { useEffect, useState } from "react";
import { ReactComponent as Gird1Icon } from "@/assets/images/Browse/grid-1.svg";
import { ReactComponent as Grid2Icon } from "@/assets/images/Browse/grid-2.svg";
import { ReactComponent as ListIcon } from "@/assets/images/Browse/list.svg";
import axios from "axios";

const cx = classNames.bind(styles);

function Browse() {
    const { Option } = Select;

    const [mangas, setMangas] = useState([]);
    const [genres, setGenres] = useState([]);
    const [genre, setGenre] = useState("");
    const [views, setViews] = useState("");
    const [author, setAuthor] = useState("");
    const [complete, setComplete] = useState("");

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("http://localhost:8000/api/genres");
            const data = await response.json();
            if (Array.isArray(data.data)) {
                setGenres(data.data);
            }
        }
        fetchData();
    }, []);
    
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(
                    "http://localhost:8000/api/mangas",
                    {
                        params: {
                            genre: genre,
                            views: views,
                            complete: complete,
                            author: author,
                        },
                    }
                );
                setMangas(response.data.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [genre, views, complete, author]);

    const genresOptions = genres?.map((genre) => ({
        value: genre.id,
        label: genre.name,
    }));

    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <div className={cx("filter")}>
                    <div className={cx("item")}>
                        <p>Thể loại</p>
                        <Select
                            showSearch
                            size="large"
                            placeholder="Thể loại..."
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.label ?? "").includes(input)
                            }
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? "")
                                    .toLowerCase()
                                    .localeCompare(
                                        (optionB?.label ?? "").toLowerCase()
                                    )
                            }
                            options={genresOptions}
                            onChange={(value) => setGenre(value)}
                        ></Select>
                    </div>
                    <div className={cx("item")}>
                        <p>Sắp xếp</p>
                        <Select
                            defaultValue="all"
                            size="large"
                            options={[
                                {
                                    value: "all",
                                    label: "Tất cả",
                                },
                                {
                                    value: "month",
                                    label: "View tháng",
                                },
                                {
                                    value: "week",
                                    label: "View tuần",
                                },
                                {
                                    value: "today",
                                    label: "View ngày",
                                },
                            ]}
                            onChange={(value) => setViews(value)}
                        />
                    </div>
                    <div className={cx("item")}>
                        <p>Trạng thái</p>
                        <Select
                            defaultValue="1"
                            size="large"
                            options={[
                                {
                                    value: "1",
                                    label: "Tất cả",
                                },
                                {
                                    value: "in-process",
                                    label: "Đang tiến hành",
                                },
                                {
                                    value: "complete",
                                    label: "Hoàn thành",
                                },
                            ]}
                            onChange={(value) => setComplete(value)}
                        />
                    </div>
                    <div className={cx("item")}>
                        <p>Loại truyện</p>
                        <Select
                            showSearch
                            size="large"
                            placeholder="Loại truyện..."
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.label ?? "").includes(input)
                            }
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? "")
                                    .toLowerCase()
                                    .localeCompare(
                                        (optionB?.label ?? "").toLowerCase()
                                    )
                            }
                            options={[
                                {
                                    value: "1",
                                    label: "Manga",
                                },
                                {
                                    value: "2",
                                    label: "Manhua",
                                },
                                {
                                    value: "3",
                                    label: "manhwa",
                                },
                                {
                                    value: "3",
                                    label: "doujinshi",
                                },
                            ]}
                        />
                    </div>
                    <div className={cx("item")}>
                        <p>Tác giả</p>

                        <Input
                            placeholder="Tác giả"
                            size="large"
                            style={{ border: "1px solid #fff" }}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </div>
                    <div className={cx("item")}>
                        <p>Giới tính</p>
                        <Select
                            defaultValue="1"
                            size="large"
                            options={[
                                {
                                    value: "1",
                                    label: "Tất cả",
                                },
                                {
                                    value: "2",
                                    label: "Con gái",
                                },
                                {
                                    value: "3",
                                    label: "Con trai",
                                },
                            ]}
                        />
                    </div>
                </div>
                <div className={cx("grid")}>
                    <button>
                        <Gird1Icon />
                    </button>
                    <button>
                        <Grid2Icon />
                    </button>
                    <button>
                        <ListIcon />
                    </button>
                </div>
                <div className={cx("result")}>
                    {mangas?.map((manga) => (
                        <div className={cx("manga")}>
                            <img src={manga.image} alt="" />
                            <p>{manga.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default Browse;
