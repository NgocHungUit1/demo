import classNames from "classnames/bind";
import TableComp from "../../../components/Admin/TableComp";
import { Button, Icon } from "antd";
import { PlusOutlined, EyeOutlined } from "@ant-design/icons";
import Title from "@/components/Admin/Title";
import { useParams, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

function Chapter() {
    const [chapters, setChapters] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(
                `http://localhost:8000/api/mangas/${id}/chapter_index`
            );
            const data = await response.json();
            if (Array.isArray(data.data)) {
                setChapters(data.data);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <Title title="Chapter" />
            <div>
                <Link to={`/admin/insert-chapter/${id}`}>
                    <Button
                        icon={<PlusOutlined />}
                        variant="contained"
                        style={{ backgroundColor: "#6F6AF8" }}
                    >
                        Add New Chapter
                    </Button>
                </Link>
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
                    },
                    {
                        title: "Order",
                        dataIndex: "order",
                        key: "order",
                    },
                    {
                        title: "Slug",
                        dataIndex: "slug_chapter",
                        key: "slug_chapter",
                    },
                    {
                        title: "Action",
                        key: "",
                        render: (text, record) => (
                            <Link to={`/admin/view-chapter/${record.id}`}>
                                <EyeOutlined />
                            </Link>
                        ),
                    },
                ]}
                data={chapters}
            />
        </div>
    );
}

export default Chapter;
