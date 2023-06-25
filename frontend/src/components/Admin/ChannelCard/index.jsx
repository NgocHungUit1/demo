import classNames from "classnames/bind";
import styles from "./ChannelCard.module.scss";
import { Card } from "antd";

const cx = classNames.bind(styles);

function ChannelCard(props) {
    return (
        <Card hoverable className={cx("card")}>
          
            <div className={cx("logo")} style={{background: props.color}}>
                    {props.logo}
            </div>
            <div className={cx("info")}>
                <h3>
                    <b>{props.name}</b>
                </h3>
                <h3>{props.tag}</h3>
                <p className={cx("percent")}>{props.percent} %</p>
            </div>
        </Card>
    );
}

export default ChannelCard;
