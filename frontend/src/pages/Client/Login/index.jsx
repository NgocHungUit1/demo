import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import { Row, Col } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { ReactComponent as LogoIcon } from "@/assets/images/logo.svg";

import { ReactComponent as GoogleIcon } from "@/assets/images/google.svg";
import { ReactComponent as FacebookIcon } from "@/assets/images/facebook-176-svgrepo-com (1).svg";
import { useState, useEffect } from "react";
const cx = classNames.bind(styles);

function LoginClient() {
    const [loginUrl, setLoginUrl] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}api/google`, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Something went wrong!");
            })
            .then((data) => setLoginUrl(data.url))
            .catch((error) => console.error(error));
    }, []);

    return (
        <Row
            justify={"center"}
            align={"middle"}
            style={{ background: "rgba(47,47,47,1)", height: "100vh" }}
        >
            <Col span={10} style={{ height: "60%" }}>
                <div className={cx("login")}>
                    <div>
                        <ArrowLeftOutlined />
                        <p>Đăng nhập</p>
                    </div>
                    <div>
                        <LogoIcon />
                    </div>
                    <div>
                        {loginUrl != null && (
                            <a href={loginUrl}>
                                <GoogleIcon />
                                Đăng nhập với Google
                            </a>
                        )}
                    </div>
                    <div>
                        <a href="/">
                            <FacebookIcon />
                            Đăng nhập với Facebook
                        </a>
                    </div>
                </div>
            </Col>
        </Row>
    );
}
export default LoginClient;
