import classNames from "classnames/bind";
import styles from "./MangaCard.module.scss";
import { Card } from "antd";

const cx = classNames.bind(styles);

function MangaCard(props) {
    return (
        <div className={cx("wrapper")}>
            <Card
                hoverable
                style={{ borderRadius: 12 }}
                cover={
                    <img
                        alt=""
                        src={props.image}
                        style={{ borderRadius: 12 }}
                    />
                }
                bodyStyle={{ display: "none" }}
            ></Card>
            <h2>{props.name}</h2>
        </div>
    );
}

export default MangaCard;
