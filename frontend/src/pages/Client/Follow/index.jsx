import classNames from "classnames/bind";
import styles from "./Follow.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { Anchor } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);

function Follow() {
    const { client } = useSelector((st) => st.client);

    const [actionState, setActionState] = useState("reading");
    const [mangas, setMangas] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                await axios
                    .get(
                        `http://localhost:8000/api/follows?status=${actionState}`,
                        {
                            headers: {
                                Authorization: `Bearer ${client.access_token}`,
                                "Content-Type": "application/json",
                            },
                        }
                    )
                    .then((response) => {
                        setMangas(response.data.mangas);
                    });
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [actionState]);

    const actions = [
        { id: 1, action: "Đang đọc", value: "reading" },
        { id: 2, action: "Hoàn thành", value: "completed" },
        { id: 3, action: "Tạm ngưng", value: "dropped" },
        { id: 4, action: "Dự định đọc", value: "plan-to-read" },
    ];

    console.log(actionState);
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <h1>
                    <ArrowLeftOutlined /> Danh sách theo dõi
                </h1>
                <ul className={cx("action")}>
                    {actions.map((action) => (
                        <li
                            className={cx(
                                "item", actionState === action.value
                                    ? "focus"
                                    : ""
                            )}
                            value={action.action}
                            onClick={() => setActionState(action.value)}
                        >
                            {" "}
                            {action.action}
                        </li>
                    ))}
                </ul>
                <div className={cx("result")} id={"#" + actionState}>  
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
export default Follow;
