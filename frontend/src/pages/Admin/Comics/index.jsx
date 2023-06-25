import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Comics.module.scss";
<<<<<<< HEAD:frontend/src/pages/Comics/index.jsx
import TableComp from "../../components/TableComp";
import { Button, Input } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import Title from "@/components/Title";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from 'react-toastify';
import DeleteModal from "@/components/DeleteModal";
import GenreButton from "../../components/GenresButton";
import SearchBar from "@/components/Search";
=======
import TableComp from "../../../components/Admin/TableComp";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Title from "@/components/Admin/Title";
import BootstrapButton from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
>>>>>>> 3e48efd84f68234f0c40bb29eb91c788be2967a2:frontend/src/pages/Admin/Comics/index.jsx

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
<<<<<<< HEAD:frontend/src/pages/Comics/index.jsx
                            <GenreButton key={index} genre={genre} />
=======
                            <BootstrapButton
                                key={index}
                                className={cx("genre")}
                                variant="primary"
                                style={{
                                    marginRight: "5px",
                                    marginBottom: "5px",
                                    backgroundColor: "#6F6AF8",
                                    borderRadius: "5px",
                                    color: "white",
                                }}
                            >
                                {genre}
                            </BootstrapButton>
>>>>>>> 3e48efd84f68234f0c40bb29eb91c788be2967a2:frontend/src/pages/Admin/Comics/index.jsx
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
<<<<<<< HEAD:frontend/src/pages/Comics/index.jsx
                    <Link to={`/chapter/${record.id}`}>
                        <Button variant="success" icon={<EyeOutlined />} />
=======
                    <Link to={`/admin/chapter/${record.id}`}>
                        <Button variant="success" icon={<EditOutlined />} />
>>>>>>> 3e48efd84f68234f0c40bb29eb91c788be2967a2:frontend/src/pages/Admin/Comics/index.jsx
                    </Link>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(record.id)}
                        icon={<DeleteOutlined />}
                    />
                    <ToastContainer />
                </div>
            ),
        },
    ];
    const [mangas, setMangas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [deleteMangaId, setDeleteMangaId] = useState(null);
    const [searchText, setSearchText] = useState('');


    useEffect(() => {
        fetch("http://localhost:8000/api/mangas")
            .then((response) => response.json())
            .then((data) => setMangas(data.data));
    }, []);

    const handleDelete = (id) => {
<<<<<<< HEAD:frontend/src/pages/Comics/index.jsx
        setDeleteMangaId(id);
        setShowModal(true);
    }
    const handleSearch = (text) => {
        const params = text ? { name: text } : {};
        fetch(`http://localhost:8000/api/mangas?${new URLSearchParams(params).toString()}`)
            .then(response => response.json())
            .then(data => setMangas(data.data))
    }

    const handleConfirmDelete = () => {
        fetch(`http://localhost:8000/api/mangas/${deleteMangaId}`, {
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
=======
        fetch(`http://localhost:8000/api/mangas/${id}`, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then(() => {
                const filteredMangas = mangas.filter(
                    (manga) => manga.id !== id
                );
                setMangas(filteredMangas);
                toast("Delete Comics Succe!");
            });
    };
>>>>>>> 3e48efd84f68234f0c40bb29eb91c788be2967a2:frontend/src/pages/Admin/Comics/index.jsx

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
            <div className={cx("search-group")}>
                <SearchBar onSearch={handleSearch} placeholder="Enter keyword" />
            </div>

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

<<<<<<< HEAD:frontend/src/pages/Comics/index.jsx
export default Comics;
=======
export default Comics;
>>>>>>> 3e48efd84f68234f0c40bb29eb91c788be2967a2:frontend/src/pages/Admin/Comics/index.jsx
