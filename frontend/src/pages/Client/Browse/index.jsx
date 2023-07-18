import classNames from "classnames/bind"
import styles from "./Browse.module.scss"
import { Input, Select } from "antd"
import { useEffect, useState } from "react"
import { ReactComponent as Gird1Icon } from "@/assets/images/Browse/grid-1.svg"
import { ReactComponent as Grid2Icon } from "@/assets/images/Browse/grid-2.svg"
import { ReactComponent as ListIcon } from "@/assets/images/Browse/list.svg"
import axios from "axios"
import { useLocation } from "react-router-dom"

const cx = classNames.bind(styles)

function Browse() {
  const { Option } = Select
  const [mangas, setMangas] = useState([])
  const [genres, setGenres] = useState([])
  const [genre, setGenre] = useState("")
  const [views, setViews] = useState("")
  const [author, setAuthor] = useState("")
  const [complete, setComplete] = useState("all-comp")
  const [highlight, setPopular] = useState("")
  const location = useLocation()
  const props = location.state
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}api/genres`
      )
      const data = await response.json()
      if (Array.isArray(data.data)) {
        setGenres(data.data)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    async function fetchData() {
      try {
        if (props) {
          setGenre(props.genreId)
        }
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}api/mangas`,
          {
            params: {
              genre: genre,
              views: views,
              complete: complete,
              author: author,
              highlight: highlight,
            },
          }
        )
        setMangas(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [genre, views, complete, author, highlight])

  const genresOptions = genres?.map((genre) => ({
    value: genre.id,
    label: genre.name,
    key: genre.id,
  }))

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("filter")}>
          <div className={cx("item")}>
            <p>Thể loại</p>
            <Select
              showSearch
              value={genre}
              size="large"
              mode="multiple" // Cho phép chọn nhiều giá trị
              placeholder="Thể loại..."
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={[{ value: "all", label: "Tất cả" }, ...genresOptions]} // Thêm giá trị "Tất cả" với value là "all"
              onChange={(value) => setGenre(value)}
            >
              {genresOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </div>
          <div className={cx("item")}>
            <p>Sắp xếp</p>
            <Select
              defaultValue="all"
              size="large"
              options={[
                {
                  value: "all",
                  label: "Tất cả",
                },
                {
                  value: "month",
                  label: "View tháng",
                },
                {
                  value: "week",
                  label: "View tuần",
                },
                {
                  value: "today",
                  label: "View ngày",
                },
              ]}
              onChange={(value) => setViews(value)}
            />
          </div>
          <div className={cx("item")}>
            <p>Trạng thái</p>
            <Select
              defaultValue="all-comp"
              size="large"
              options={[
                {
                  value: "all-comp",
                  label: "Tất cả",
                },
                {
                  value: "0",
                  label: "Đang tiến hành",
                },
                {
                  value: "1",
                  label: "Hoàn thành",
                },
              ]}
              onChange={(value) => setComplete(value)}
            />
          </div>
          <div className={cx("item")}>
            <p>Danh mục</p>
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
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={[
                {
                  value: "manga",
                  label: "Manga",
                },
                {
                  value: "manhua",
                  label: "Manhua",
                },
                {
                  value: "manhwa",
                  label: "Manhwa",
                },
                {
                  value: "doujinshi",
                  label: "Doujinshi",
                },
              ]}
            />
          </div>
          <div className={cx("item")}>
            <p>Tác giả...</p>

            <Input
              placeholder="Tác giả"
              size="large"
              style={{ border: "1px solid #fff" }}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className={cx("item")}>
            <p>Loại truyện</p>
            <Select
              size="large"
              defaultValue="all-po"
              onChange={(value) => setPopular(value)}
            >
              <Option value="all-po">Tất cả</Option>
              <Option value="popular">Nổi bật</Option>
              <Option value="new">Mới</Option>
            </Select>
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
        {mangas.length > 0 ? (
          <div className={cx("result")}>
            {mangas.map((manga) => (
              <div className={cx("manga")}>
                <img src={manga.image} alt="" />
                <h1>{manga.name}</h1>
              </div>
            ))}
          </div>
        ) : (
          <p className={cx("not-found")}>Truyện bạn tìm hiện tại chưa có</p>
        )}
      </div>
    </div>
  )
}
export default Browse
