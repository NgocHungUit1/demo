import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import { Col, Row, Button, Checkbox, Form, Input, Card } from "antd";
import {
    UserOutlined,
    LockOutlined,
    RightOutlined,
    LeftOutlined,
} from "@ant-design/icons";
import { ReactComponent as LogoIcon } from "@/assets/images/logo.svg";
import { ReactComponent as Slide_1 } from "@/assets/images/Login/slide-1.svg";
import Slider from "react-slick";
import imagesLogin from "@/assets/images/Login";
const cx = classNames.bind(styles);

function Login() {
    const onFinish = (values) => {
        console.log("Received values of form: ", values);
    };
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        speed: 2000,
        autoplaySpeed: 4000,
        nextArrow: (
            <RightOutlined style={{ display: "absolute", bottom: "0" }} />
        ),
        prevArrow: <LeftOutlined />,
    };
    return (
        <Row style={{ height: "100vh" }}>
            <Col span={12} className={cx("left")}>
                <div className={cx("logo")}>
                    <LogoIcon style={{ width: "39px", height: "55px" }} />
                    <h1> Gid Gid</h1>
                </div>
                <div className={cx("slider")}>
                    <Slider {...settings}>
                        <div>
                            <Slide_1
                                style={{ margin: "0 auto", width: "100%" }}
                            />

                            <h2
                                style={{
                                    marginLeft: "10%",
                                    marginTop: "20px",
                                    width: "100%",
                                }}
                            >
                                Welcome back
                            </h2>
                        </div>
                        <div>
                            <Slide_1
                                style={{ margin: "0 auto", width: "100%" }}
                            />

                            <h2
                                style={{
                                    marginLeft: "10%",
                                    marginTop: "20px",
                                    width: "100%",
                                }}
                            >
                                Welcome back
                            </h2>
                        </div>
                        <div>
                            <Slide_1
                                style={{ margin: "0 auto", width: "100%" }}
                            />

                            <h2
                                style={{
                                    marginLeft: "10%",
                                    marginTop: "20px",
                                    width: "100%",
                                }}
                            >
                                Welcome back
                            </h2>
                        </div>
                        <div>
                            <Slide_1
                                style={{ margin: "0 auto", width: "100%" }}
                            />

                            <h2
                                style={{
                                    marginLeft: "10%",
                                    marginTop: "20px",
                                    width: "100%",
                                }}
                            >
                                Welcome back
                            </h2>
                        </div>
                        <div>
                            <Slide_1
                                style={{ margin: "0 auto", width: "100%" }}
                            />

                            <h2
                                style={{
                                    marginLeft: "10%",
                                    marginTop: "20px",
                                    width: "100%",
                                }}
                            >
                                Welcome back
                            </h2>
                        </div>
                    </Slider>
                </div>
            </Col>
            <Col span={12} className={cx("right")} style={{ marginTop: "10%" }}>
                <Form
                    centered
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 12 }}
                    onFinish={onFinish}
                >
                    <Form.Item label=" " colon={false}>
                        <h1>Welcome back!</h1>
                        <p>Start managing your page!</p>
                    </Form.Item>
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Username!",
                            },
                        ]}
                    >
                        <Input
                            size="large"
                            prefix={
                                <UserOutlined className="site-form-item-icon" />
                            }
                            placeholder="Username"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Password!",
                            },
                        ]}
                    >
                        <Input
                            size="large"
                            prefix={
                                <LockOutlined className="site-form-item-icon" />
                            }
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item label=" " colon={false}>
                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            noStyle
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="">
                            Forgot password
                        </a>
                    </Form.Item>

                    <Form.Item label=" " colon={false}>
                        <Button
                            size="large"
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            block={true}
                        >
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
}

export default Login;
