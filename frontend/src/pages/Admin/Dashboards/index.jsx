import classNames from "classnames/bind";
import styles from "./Dashboards.module.scss";
import { Avatar, Badge, Col, Row, Select } from "antd";
import { RightOutlined, SettingOutlined } from "@ant-design/icons";
import LineChart from "@/components/Admin/LineChart";
import ChannelCard from "@/components/Admin/ChannelCard";
import { ReactComponent as Benhancelogo } from "@/assets/images/Dashboards/behance-svgrepo-com.svg";
import { ReactComponent as DribbleLogo } from "@/assets/images/Dashboards/dribble-svgrepo-com.svg";
import { ReactComponent as InstagramLogo } from "@/assets/images/Dashboards/instagram-svgrepo-com.svg";
import { ReactComponent as PinterestLogo } from "@/assets/images/Dashboards/pinterest-svgrepo-com.svg";
import { ReactComponent as NowIc } from "@/assets/images/Dashboards/c.svg";
import imagesDashboard from "@/assets/images/Dashboards";
import Title from "@/components/Admin/Title";

const cx = classNames.bind(styles);

function Dashboards() {
    const handleChange = (value) => {
        console.log(`selected ${value}`);
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
                                    <p>Views</p>
                                    <SettingOutlined />
                                </div>
                                <div className={cx("total")}>
                                    <p>
                                        <b>27.6m</b>{" "}
                                    </p>
                                </div>
                            </div>
                            <div className={cx("item")}>
                                <div className={cx("title")}>
                                    <p>Followers</p>
                                    <SettingOutlined />
                                </div>
                                <div className={cx("total")}>
                                    <p>
                                        <b>219,3k</b>
                                    </p>
                                </div>
                            </div>
                            <div className={cx("item")}>
                                <div className={cx("title")}>
                                    <p>Reposts</p>
                                    <SettingOutlined />
                                </div>
                                <div className={cx("total")}>
                                    <p>
                                        <b>1,5k</b>
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
                        <h2>Top performers</h2>
                        <table className={cx("performer")}>
                            <tbody>
                                <tr>
                                    <td>
                                        <Avatar
                                            src={imagesDashboard.avt_1}
                                            style={{ marginRight: "10px" }}
                                        />
                                        Valy Antonova
                                    </td>
                                    <td>@valyantonova</td>
                                    <td>19%</td>
                                </tr>
                                <tr>
                                    <td>
                                        <Avatar
                                            src={imagesDashboard.avt_2}
                                            style={{ marginRight: "10px" }}
                                        />
                                        Valy Antonova
                                    </td>
                                    <td>@valyantonova</td>
                                    <td>19%</td>
                                </tr>
                                <tr>
                                    <td>
                                        <Avatar
                                            src={imagesDashboard.avt_3}
                                            style={{ marginRight: "10px" }}
                                        />
                                        Valy Antonova
                                    </td>
                                    <td>@valyantonova</td>
                                    <td>19%</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className={cx("view-more")}>
                            <p>View more</p>

                            <RightOutlined style={{ fontSize: "12px" }} />
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
