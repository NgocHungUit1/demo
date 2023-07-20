import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import classNames from "classnames/bind";
import Title from "@/components/Admin/Title";
import styles from "./Customer.module.scss";
import TableComp from "@/components/Admin/TableComp";
import { useParams } from 'react-router-dom';
import ReactLoading from "react-loading";

const cx = classNames.bind(styles);

function MangaPage() {
    const [mangaData, setMangaData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
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

    const onDrop = useCallback((acceptedFiles) => {
        setIsLoading(true);

        const formData = new FormData();
        for (let i = 0; i < acceptedFiles.length; i++) {
            formData.append("image_path[]", acceptedFiles[i], acceptedFiles[i].name);
        }

        axios
            .post(`${process.env.REACT_APP_BASE_URL}api/mangas/${id}/images`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((response) => {
                setMangaData(response.data.data);
            })
            .catch((error) => {
                console.log(error.response);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [id]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}api/mangas/${id}/page`);
            setMangaData(response.data.data);
        }
        fetchData();
    }, []);

    return (
        <div className={cx("wrapper")}>
            <Title title="Comics" />
            <div className={cx("title")}>
                <div {...getRootProps()} className={cx("dropzone", { isActive: isDragActive })}>
                    <input {...getInputProps()} />
                    {!isDragActive ? (
                        <p>Chọn file hoặc kéo thả ảnh vào đây</p>
                    ) : (
                        <p>Thả file vào đây</p>
                    )}
                </div>
                {isLoading && (
                    <div className={cx("loading")}>
                        <ReactLoading type={"spin"} color={"black"} height={"5%"} width={"5%"} />
                    </div>
                )}
            </div>
            <TableComp data={mangaData} columns={columns} />
        </div>
    );
}

export default MangaPage;
