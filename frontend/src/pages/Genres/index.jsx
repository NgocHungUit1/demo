import classNames from "classnames/bind";
import styles from "./Genres.module.scss";
import TableComp from "../../components/TableComp";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Title from "@/components/Title";
import React, { useState, useEffect } from 'react';

const cx = classNames.bind(styles);

function Genres() {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:8000/api/genres');
            const data = await response.json();
            if (Array.isArray(data.data)) {
                setGenres(data.data);
            }
        }
        fetchData();
    }, []);
    return (
        <div className={cx("wrapper")}>
            <Title title="Genres" />
            {/* <ul>
                {genres.map((genre) => (
                    <li key={genre.id}>{genre.name}</li>
                ))}
            </ul> */}
            <TableComp
                columns={[
                    {
                        title: "ID",
                        dataIndex: "id",
                        key: "id",
                    },
                    {
                        title: "Name",
                        dataIndex: "name",
                        key: "name",
                    },
                ]}
                data={genres}
            />
        </div>
    );
}

export default Genres;
