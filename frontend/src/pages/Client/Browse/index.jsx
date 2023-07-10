import classNames from "classnames/bind";
import styles from "./Browse.module.scss";
import { Select } from "antd";

const cx = classNames.bind(styles);

function Browse() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <div className={cx("filter")}>
                    <div className={cx("item")}>
                        <p>Thể loại</p>         
                        <Select
                            showSearch
                            size="large"
                            placeholder="Thể loại..."
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.label ?? "").includes(input)
                            }
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? "")
                                    .toLowerCase()
                                    .localeCompare(
                                        (optionB?.label ?? "").toLowerCase()
                                    )
                            }
                            options={[
                                {
                                    value: "1",
                                    label: "Not Identified",
                                },
                                {
                                    value: "2",
                                    label: "Closed",
                                },
                                {
                                    value: "3",
                                    label: "Communicated",
                                },
                            ]}
                        />
                    </div>
                    <div className={cx("item")}>
                        <p>Sắp xếp</p>
                        <Select
                            showSearch
                            size="large"
                            placeholder="Thể loại..."
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.label ?? "").includes(input)
                            }
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? "")
                                    .toLowerCase()
                                    .localeCompare(
                                        (optionB?.label ?? "").toLowerCase()
                                    )
                            }
                            options={[
                                {
                                    value: "1",
                                    label: "Not Identified",
                                },
                                {
                                    value: "2",
                                    label: "Closed",
                                },
                                {
                                    value: "3",
                                    label: "Communicated",
                                },
                            ]}
                        />
                    </div>
                    <div className={cx("item")}>
                        <p>Trạng thái</p>
                        <Select
                            showSearch
                            size="large"
                            placeholder="Thể loại..."
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.label ?? "").includes(input)
                            }
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? "")
                                    .toLowerCase()
                                    .localeCompare(
                                        (optionB?.label ?? "").toLowerCase()
                                    )
                            }
                            options={[
                                {
                                    value: "1",
                                    label: "Not Identified",
                                },
                                {
                                    value: "2",
                                    label: "Closed",
                                },
                                {
                                    value: "3",
                                    label: "Communicated",
                                },
                            ]}
                        />
                    </div>
                    <div className={cx("item")}>
                        <p>Loại truyện</p>
                        <Select
                            showSearch
                            size="large"
                            placeholder="Thể loại..."
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.label ?? "").includes(input)
                            }
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? "")
                                    .toLowerCase()
                                    .localeCompare(
                                        (optionB?.label ?? "").toLowerCase()
                                    )
                            }
                            options={[
                                {
                                    value: "1",
                                    label: "Not Identified",
                                },
                                {
                                    value: "2",
                                    label: "Closed",
                                },
                                {
                                    value: "3",
                                    label: "Communicated",
                                },
                            ]}
                        />
                    </div>
                    <div className={cx("item")}>
                        <p>Số chương</p>
                        <Select
                            showSearch
                            size="large"
                            placeholder="Thể loại..."
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.label ?? "").includes(input)
                            }
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? "")
                                    .toLowerCase()
                                    .localeCompare(
                                        (optionB?.label ?? "").toLowerCase()
                                    )
                            }
                            options={[
                                {
                                    value: "1",
                                    label: "Not Identified",
                                },
                                {
                                    value: "2",
                                    label: "Closed",
                                },
                                {
                                    value: "3",
                                    label: "Communicated",
                                },
                            ]}
                        />
                    </div>
                    <div className={cx("item")}>
                        <p>Giới tính</p>
                        <Select
                            showSearch
                            size="large"
                            placeholder="Thể loại..."
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.label ?? "").includes(input)
                            }
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? "")
                                    .toLowerCase()
                                    .localeCompare(
                                        (optionB?.label ?? "").toLowerCase()
                                    )
                            }
                            options={[
                                {
                                    value: "1",
                                    label: "Not Identified",
                                },
                                {
                                    value: "2",
                                    label: "Closed",
                                },
                                {
                                    value: "3",
                                    label: "Communicated",
                                },
                            ]}
                        />
                    </div>
                </div>
                <div className={cx("grid")}></div>
                <div className={cx("result")}>
                    
                </div>
            </div>
        </div>
    );
}
export default Browse;
