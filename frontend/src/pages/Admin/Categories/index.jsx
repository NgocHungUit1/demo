import classNames from "classnames/bind";
import styles from "./Categories.module.scss";
import TableComp from "../../../components/Admin/TableComp";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Title from "@/components/Admin/Title";
import React, { useState, useEffect } from "react";
import { Avatar } from 'antd';

const cx = classNames.bind(styles);
function Categories() {
    const [users, setUserViews] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("http://localhost:8000/api/user");
            const data = await response.json();
            if (data) {
                setUserViews(data.users);
            }
        }
        fetchData();
    }, []);
    return (
        <div className={cx("wrapper")}>
            <Title title="Users" />
            <div className={cx("title")}>
                <Button startIcon={<PlusOutlined />} variant="contained">
                    Thêm danh mục mới
                </Button>
            </div>
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
                        render: (text, record) => (
                            <span>
                                <Avatar src={record.image} />
                                {text}
                            </span>
                        ),
                    },
                    {
                        title: "Visit Count",
                        dataIndex: "visit_count_total",
                        key: "visit_count_total",
                    },
                ]}
                data={users.map((user) => ({
                    id: user.id,
                    name: user.name,
                    visit_count_total: user.visit_count_total,
                    image: user.image
                }))}
            />
        </div>
    );
}

export default Categories;
