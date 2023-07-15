import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Comics.module.scss";
import TableComp from "../../../components/Admin/TableComp";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Title from "@/components/Admin/Title";
import DeleteModal from "@/components/Admin/DeleteModal";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import GenreButton from "@/components/Admin/GenresButton";


const cx = classNames.bind(styles);

function Comics() {
    const columns = [
        {
            id: 1,
            title: "Name",
            dataIndex: "name",
            sorter: {
                compare: (a, b) => a.chinese - b.chinese,
                multiple: 3,
            },
        },
        {
            id: 2,
            title: "Description",
            dataIndex: "des",
            sorter: {
                compare: (a, b) => a.chinese - b.chinese,
                multiple: 3,
            },
        },
        {
            id: 3,
            title: "Active",
            dataIndex: "active",
            sorter: {
                compare: (a, b) => a.math - b.math,
                multiple: 2,
            },
            render: (text) => (
                <span style={{ color: text ? "green" : "red" }}>
                    {text ? "Active" : "Not Yet Completed"}
                </span>
            ),
        },
        {
            id: 4,
            title: "Complete",
            dataIndex: "complete",
            sorter: {
                compare: (a, b) => a.english - b.english,
                multiple: 1,
            },
            render: (text) => (
                <span style={{ color: text ? "green" : "red" }}>
                    {text ? "Completed" : "Not Yet Completed"}
                </span>
            ),
        },

        {
            id: 5,
            title: "Image",
            dataIndex: "image",
            render: (text) => <img src={text} alt="comic cover" />,
        },
        {
            id: 6,
            title: "Author",
            dataIndex: "author",
            sorter: {
                compare: (a, b) => a.english
            },
        },
        {
            id: 7,
            title: "Genres",
            dataIndex: "genres_list",
            render: (genres) => {
                const genreNames = genres.map((genre) => genre.trim());
                return (
                    <div>
                        {genreNames.map((genre, index) => (
                            <GenreButton key={index} genre={genre} />
                        ))}
                    </div>
                );
            },
        },
        {
            id: 8,
            title: "Tag",
            dataIndex: "tag",
            sorter: {
                compare: (a, b) => a.english - b.english,
                multiple: 1,
            },
        },
        {
            id: 9,
            title: "Highlight",
            dataIndex: "highlight",
            sorter: {
                compare: (a, b) => a.english - b.english,
                multiple: 1,
            },
            render: (text) => (
                <span style={{ color: text ? "purple" : "blue" }}>
                    {text ? "Popular" : "New"}
                </span>
            ),
        },
        {
            id: 10,
            title: "Action",
            render: (text, record) => (
                <div className={cx("action")}>
                    <Link to={`/admin/edit-comic/${record.id}`}>
                        <Button variant="success" icon={<EditOutlined />} />
                    </Link>
                    <Link to={`/admin/chapter/${record.id}`}>
                        <Button variant="success" icon={<EyeOutlined />} />
                    </Link >
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(record.id)}
                        icon={<DeleteOutlined />}
                    />
                    <ToastContainer />
                </div >
            ),
        },
    ];
    const [mangas, setMangas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [deleteMangaId, setDeleteMangaId] = useState(null);
    const [searchText, setSearchText] = useState('');


    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}api/mangas`)
            .then((response) => response.json())
            .then((data) => setMangas(data.data));
    }, []);

    const handleDelete = (id) => {
        setDeleteMangaId(id);
        setShowModal(true);
    }
    const handleSearch = (text) => {
        const params = text ? { name: text } : {};
        fetch(`${process.env.REACT_APP_BASE_URL}api/mangas?${new URLSearchParams(params).toString()}`)
            .then(response => response.json())
            .then(data => setMangas(data.data))
    }

    const handleConfirmDelete = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}api/mangas/${deleteMangaId}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(() => {
                const filteredMangas = mangas.filter(manga => manga.id !== deleteMangaId)
                setMangas(filteredMangas)
                toast.success("Delete Comics Succe!");
            });
        setShowModal(false);
    }

    const handleCancelDelete = () => {
        setDeleteMangaId(null);
        setShowModal(false);
    }


    return (
        <div className={cx("wrapper")}>
            <Title title="Comics" />
            <div className={cx("title")}>
                <Link to="/admin/insert-comic">
                    <Button
                        icon={<PlusOutlined />}
                        variant="contained"
                        style={{ backgroundColor: '#6a0dad', color: '#fff' }}
                    >
                        Add new comic
                    </Button>
                </Link>
            </div>
            {/* <div className={cx("search-group")}>
                <SearchBar onSearch={handleSearch} placeholder="Enter keyword" />
            </div> */}

            <TableComp data={mangas} columns={columns} />
            <DeleteModal
                visible={showModal}
                onOk
                ={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
            <ToastContainer />
        </div>
    );
}
export default Comics;
