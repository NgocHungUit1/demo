import classNames from "classnames/bind";
import styles from "./Title.module.scss";
import {  Badge } from "antd";
import {  SettingOutlined } from "@ant-design/icons";

const cx = classNames.bind(styles);

function Title (props) {
    return (
          <div className={cx("wrapper")}>
          <h1>{props.title}</h1>
          <div>
              <Badge count={1} />
              <SettingOutlined
                  style={{ fontSize: "18px", color: "#9e9ea7" }}
              />
          </div>
      </div>
    )
} 
export default Title;