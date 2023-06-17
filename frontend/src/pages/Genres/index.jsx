import classNames from "classnames/bind";
import styles from "./Genres.module.scss";
import TableComp from "../../components/TableComp";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Title from "@/components/Title";

const cx = classNames.bind(styles);

function Genres() {
    return (
        <div className={cx("wrapper")}>
            <Title title="Genres"/>

            <TableComp />
        </div>
    );
}

export default Genres;
