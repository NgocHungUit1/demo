import React, { useState, useEffect } from "react";
import axios from "axios";
import classNames from "classnames/bind";
import { useParams, Link } from "react-router-dom";
import Title from "@/components/Admin/Title";
import styles from "./Chapter.module.scss";
import TableComp from "../../../components/Admin/TableComp";

const cx = classNames.bind(styles);
function MangaPage() {
    const [mangaData, setMangaData] = useState([]);
    const { id } = useParams();
    const columns = [
        {
            id: 1,
            title: "STT",
            dataIndex: "order",
            sorter: {
                compare: (a, b) => a.chinese - b.chinese,
                multiple: 3,
            },
        },
        {
            id: 2,
            title: "Image",
            dataIndex: "image_path",
            render: (text) => <img src={text} alt="comic cover" />,
        },
    ];

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(
                `http://localhost:8000/api/mangas/${id}/page`
            );
            setMangaData(response.data.data);
        }
        fetchData();
    }, []);

    return (
        <div className={cx("wrapper")}>
            <Title title="Comics" />
            <div className={cx("title")}></div>
            <TableComp data={mangaData} columns={columns} />
        </div>
    );
}

export default MangaPage;
