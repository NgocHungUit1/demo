import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import { ReactComponent as LogoIcon } from "@/assets/images/logo.svg";
const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
            <LogoIcon />
            <h2>Manga GG là website đọc truyện tranh miễn phí</h2>
            <ul>
                    <li>Điều khoản dịch vụ</li>
                    <li>Chính sách riêng tư</li>
                    <li>DMCA</li>
                    <li>Liên hệ</li>
            </ul>
            <h4>
                Manga GG không lưu trữ bất kì tệp tin nào trên máy chủ, chúng
                tôi chỉ liên kết tới những phương tiện truyền thông được lưu trữ
                bên dịch vụ thứ 3.
            </h4>
            <h4>
                Manga does not store any files on our server, we only linked to
                the media which is hosted on 3rd party services.
            </h4>
            </div>
        </div>
    );
}

export default Footer;
