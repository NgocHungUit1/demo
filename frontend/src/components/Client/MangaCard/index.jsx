import classNames from "classnames/bind";
import styles from "./MangaCard.module.scss";
import { Card } from "antd";

const cx = classNames.bind(styles);

function MangaCard(props) {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("img")}>
                <img src={props.image} alt="" />
            </div>
            <h2>{props.name}</h2>
        </div>
    );
}

export default MangaCard;
