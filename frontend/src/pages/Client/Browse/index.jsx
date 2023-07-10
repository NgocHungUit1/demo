import classNames from "classnames/bind";
import styles from "./Browse.module.scss";
import { Select } from "antd";
import { useEffect, useState } from "react";
import { ReactComponent as Gird1Icon } from "@/assets/images/Browse/grid-1.svg";
import { ReactComponent as Grid2Icon } from "@/assets/images/Browse/grid-2.svg";
import { ReactComponent as ListIcon } from "@/assets/images/Browse/list.svg";

const cx = classNames.bind(styles);

function Browse() {
    const [mangas, setMangas] = useState([]);
    const [genres, setGenres] = useState([]);

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
            const response = await fetch("http://localhost:8000/api/mangas");
            const data = await response.json();
            if (Array.isArray(data.data)) {
                setMangas(data.data);
            }
        }
        fetchData();
    }, []);

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
                            options={
                                genres.map((genre) => ({
                                    value: genre.id,
                                    label: genre.name,
                                }))
                            }
                        />
                    </div>
                    <div className={cx("item")}>
                        <p>Sắp xếp</p>
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
                                    label: "View tháng",
                                },
                                {
                                    value: "3",
                                    label: "View tuần",
                                },
                                {
                                    value: "4",
                                    label: "View ngày",
                                },
                                {
                                    value: "3",
                                    label: "Mới ra",
                                },
                                {
                                    value: "4",
                                    label: "Chapter mới",
                                },
                            ]}
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
                                    value: "2",
                                    label: "Đang tiến hành",
                                },
                                {
                                    value: "3",
                                    label: "Hoàn thành",
                                },
                            ]}
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
                        <p>Số chương</p>
                        <Select
                            defaultValue="1"
                            size="large"
                            options={[
                                {
                                    value: "1",
                                    label: ">0",
                                },
                                {
                                    value: "2",
                                    label: ">=100",
                                },
                                {
                                    value: "3",
                                    label: ">=200",
                                },
                                {
                                    value: "4",
                                    label: ">=300",
                                },
                                {
                                    value: "5",
                                    label: ">=400",
                                },
                                {
                                    value: "6",
                                    label: ">=500",
                                },
                            ]}
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
