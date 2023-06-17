import classNames from "classnames/bind";
import styles from "./Comics.module.scss";
import TableComp from "../../components/TableComp";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Title from "@/components/Title";

const cx = classNames.bind(styles);

function Comics() {
    const columns = [
        {
          id: 1,
            title: "Name",
            dataIndex: "name",
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
        },
        {
          id: 4,
            title: "Complete",
            dataIndex: "complete",
            sorter: {
                compare: (a, b) => a.english - b.english,
                multiple: 1,
            },
        },
//         {
//           id: 5,
//             title: "Image",
//             dataIndex: "image",
//             sorter: {
//                 compare: (a, b) => a.english - b.english,
//                 multiple: 1,
//             },
//         },
        {
          id: 6,
            title: "Author",
            dataIndex: "author",
            sorter: {
                compare: (a, b) => a.english - b.english,
                multiple: 1,
            },
        },
    ];
    const data = [
        {
            id: 1,
            name: "kanzmmm",
            des: "sajn",
            active: true,
            complete: true,
            image: [
                {
                    id: 1,
                    src: "",
                },
            ],
            author: "john",
            last_chapter_update: "01/11/2022",
            create_at: "2022",
        },
        {
            id: 2,
            name: "kanzmmm",
            des: "sajn",
            active: true,
            complete: true,
            image: [
                {
                    id: 1,
                    src: "",
                },
            ],
            author: "john",
            last_chapter_update: "01/11/2022",
            create_at: "2022",
        },
        {
            id: 3,
            name: "kanzmmm",
            des: "sajn",
            active: true,
            complete: true,
            image: [
                {
                    id: 1,
                    src: "",
                },
            ],
            author: "john",
            last_chapter_update: "01/11/2022",
            create_at: "2022",
        },
    ];
    return (
        <div className={cx("wrapper")}>
            <Title title="Comics" />
            <div className={cx("title")}>
                <Button icon={<PlusOutlined />} variant="contained">
                    Add new comic
                </Button>
            </div>
            <TableComp data={data} columns={columns} />
        </div>
    );
}

export default Comics;
