import classNames from "classnames/bind";
import styles from "./Categories.module.scss";
import TableComp from "../../components/TableComp";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Title from "@/components/Title";

const cx = classNames.bind(styles);

function Categories() {
    return (
        <div className={cx("wrapper")}>
            <Title title="Categories" />
            <div className={cx("title")}>
                
                <Button startIcon={<PlusOutlined />} variant="contained">
                    Thêm danh mục mới
                </Button>
            </div>
            <TableComp />
        </div>
    );
}

export default Categories;
