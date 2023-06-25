import classNames from "classnames/bind";
import styles from "./AdminLayout.module.scss";
import { Outlet } from "react-router-dom";
import { Col, Row, Drawer } from "antd";
import Sidebar from "@/components/Admin/Sidebar";

import { useState } from "react";
import Header from "@/components/Admin/Header";

const cx = classNames.bind(styles);

function AdminLayout() {
    const [openSideBar, setOpenSideBar] = useState(false);
    const showSideBar = () => {
        setOpenSideBar(true);
    };
    const onCloseSideBar = () => {
        setOpenSideBar(false);
    };

    return (
        <div className={cx("wrapper")}>
            <Drawer bodyStyle={{padding: 0, overflow: "hidden"}} width="250px" headerStyle={{display: "none"}} placement="left" onClose={onCloseSideBar} open={openSideBar}>
                <Sidebar />
            </Drawer>
            <Sidebar />

            <div className={cx("inner-about")}>
                <Header showSideBar={showSideBar} />
                <div className={cx("container")}>
                    <Outlet />
                </div>
            </div>
        </div>
        // <Row>
        //     <Col span={4} style={{background: "#f2eae0"}}>
        //         <Drawer
        //             placement="left"
        //             onClose={onClose}
        //             open={open}
        //             className={cx("drawer")}
        //         >
        //             <Sidebar />
        //         </Drawer>

        //         <Sidebar showDrawer={showDrawer} />
        //     </Col>
        //     <Col span={20} style={{background: "#fff"}}>
        //         <Outlet />
        //     </Col>
        // </Row>
    );
}

export default AdminLayout;
