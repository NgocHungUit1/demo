import React, { useState, useEffect } from "react";
import axios from "axios";
import classNames from "classnames/bind";
import { useParams } from "react-router-dom";
import Title from "@/components/Title";
import styles from "./Chapter.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cx = classNames.bind(styles);

function MangaPage() {
  const [mangaData, setMangaData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8000/api/mangas/${id}/page`
      );
      setMangaData(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={cx("wrapper")}>
      <Title title="Chapter Image" />
      <div className={cx("container")}>
        {mangaData.map((item) => (
          <div key={item.id} className={cx("column")}>
            <img src={item.image_path} alt="comic cover" />
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}

export default MangaPage;
