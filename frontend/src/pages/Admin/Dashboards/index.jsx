import classNames from "classnames/bind";
import styles from "./Dashboards.module.scss";
import { Avatar, Badge, Col, Row, Select } from "antd";
import { RightOutlined, SettingOutlined } from "@ant-design/icons";
import LineChart from "@/components/Admin/LineChart";
import ChannelCard from "@/components/Admin/ChannelCard";
import { Link } from "react-router-dom";
import { ReactComponent as Benhancelogo } from "@/assets/images/Dashboards/behance-svgrepo-com.svg";
import { ReactComponent as DribbleLogo } from "@/assets/images/Dashboards/dribble-svgrepo-com.svg";
import { ReactComponent as InstagramLogo } from "@/assets/images/Dashboards/instagram-svgrepo-com.svg";
import { ReactComponent as PinterestLogo } from "@/assets/images/Dashboards/pinterest-svgrepo-com.svg";
import { ReactComponent as NowIc } from "@/assets/images/Dashboards/c.svg";
import imagesDashboard from "@/assets/images/Dashboards";
import Title from "@/components/Admin/Title";
import { useState, useEffect } from "react";
import axios from "axios";

const cx = classNames.bind(styles);

function Dashboards() {
    const [totalMangas, setTotalMangas] = useState(0);
    const [totalGenres, setTotalGenres] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [popularAllTime, setPopularAllTime] = useState(0);
    const [popularToday, setPopularToday] = useState(0);
    const [popularThisMonth, setPopularThisMonth] = useState(0);
    const [popularThisYear, setPopularThisYear] = useState(0);

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("${process.env.REACT_APP_BASE_URL}api/dashboard");
            const data = response.data;
            setPopularAllTime(data.popularAllTime);
            setPopularToday(data.popularToday);
            setPopularThisMonth(data.popularThisMonth);
            setPopularThisYear(data.popularThisYear);
            setTotalMangas(data.totalMangas);
            setTotalGenres(data.totalGenres);
            setTotalUsers(data.totalUsers);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const channelList = [
        {
            id: 1,
            name: "Dribble",
            tag: "@dribble",
            percent: "+2",
            logo: <DribbleLogo />,
            color: "#f45a7f",
        },
        {
            id: 2,
            name: "Behance",
            tag: "@behance",
            percent: "+2",
            logo: <Benhancelogo />,
            color: "#5283cc",
        },
        {
            id: 3,
            name: "Instagram",
            tag: "@instagram",
            percent: "+2",
            logo: <InstagramLogo />,
            color: "#fb9638",
        },
        {
            id: 4,
            name: "Pinterest",
            tag: "@pinterest",
            percent: "+2",
            logo: <PinterestLogo />,
            color: "#ff5c38",
        },
    ];
    return (
        <div className={cx("wrapper")}>
            <Row gutter={[80, 20]}>
                <Col xl={13} lg={12} md={11} sm={24}>
                    <div
                        style={{
                            background: "#fff",
                            borderRadius: "30px",
                            padding: "20px",
                            boxShadow: "5px 5px 5px #ccc",
                        }}
                    >
                        <Title title="Dashboard" />
                        <div className={cx("general")}>
                            <div className={cx("item")}>
                                <div className={cx("title")}>
                                    <p>Total Mangas</p>
                                    <SettingOutlined />
                                </div>
                                <div className={cx("total")}>
                                    <p>
                                        <b>{totalMangas}</b>{" "}
                                    </p>
                                </div>
                            </div>
                            <div className={cx("item")}>
                                <div className={cx("title")}>
                                    <p>Total Genres</p>
                                    <SettingOutlined />
                                </div>
                                <div className={cx("total")}>
                                    <p>
                                        <b>{totalGenres}</b>{" "}
                                    </p>
                                </div>
                            </div>
                            <div className={cx("item")}>
                                <div className={cx("title")}>
                                    <p>Total Users</p>
                                    <SettingOutlined />
                                </div>
                                <div className={cx("total")}>
                                    <p>
                                        <b>{totalUsers}</b>{" "}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xl={11} lg={12} md={13} sm={24}>
                    <div className={cx("card")}>
                        <p>
                            <b>
                                <sub>Upgrade</sub>
                                Your <br />
                                Crowd
                            </b>
                        </p>
                        <p>Pro plan for better result </p>
                        <div className={cx("now")}>
                            <NowIc />
                        </div>
                    </div>
                </Col>
                <Col xl={13} lg={12} md={11} sm={24}>
                    <div
                        style={{
                            background: "#fff",
                            borderRadius: "30px",
                            padding: "20px",
                            boxShadow: "5px 5px 5px #ccc",
                        }}
                    >
                        <div className={cx("chart-title")}>
                            <h2>Activity</h2>
                            <p>Data updates every 3 hours</p>
                            <Select
                                defaultValue="1-7-may"
                                style={{ width: 120, borderRadius: "50%" }}
                                onChange={handleChange}
                                options={[
                                    { value: "1-7-may", label: "01-07 May" },
                                ]}
                            />
                        </div>
                        <LineChart />
                    </div>
                </Col>
                <Col xl={11} lg={12} md={13} sm={24}>
                    <div
                        style={{
                            background: "#fff",
                            borderRadius: "30px",
                            padding: "20px",
                            boxShadow: "5px 5px 5px #ccc",
                        }}
                    >
                        <h2>Access statistics</h2>
                        <table className={cx("performer")}>
                            <thead>
                                <tr>
                                    <th>All Time</th>
                                    <th>Today</th>
                                    <th>This Month</th>
                                    <th>This Year</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{popularAllTime}</td>
                                    <td>{popularToday}</td>
                                    <td>{popularThisMonth}</td>
                                    <td>{popularThisYear}</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className={cx("view-more")}>
                            <Link to="users">
                                <p>View more</p>
                                <RightOutlined style={{ fontSize: "12px" }} />
                            </Link>
                        </div>
                    </div>
                </Col>
                <Col span={24}>
                    <div className={cx("col-3")}>
                        <div className={cx("content")}>
                            <h2>Channels</h2>
                            <p>
                                Your channels <br /> statistic for <b>1 week</b>
                                <br /> period
                            </p>
                        </div>
                        <div className={cx("channel")}>
                            {channelList.map((item) => (
                                <ChannelCard
                                    name={item.name}
                                    tag={item.tag}
                                    percent={item.percent}
                                    key={item.id}
                                    color={item.color}
                                    logo={item.logo}
                                />
                            ))}
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Dashboards;
