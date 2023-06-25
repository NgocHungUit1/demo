import BootstrapButton from 'react-bootstrap/Button';
import classNames from "classnames/bind";
import styles from "@/pages/Comics/Comics.module.scss";

const cx = classNames.bind(styles);

function GenreButton({ genre }) {
  return (
    <BootstrapButton
      className={cx("genre")}
      variant="primary"
      style={{
        marginRight: "5px",
        marginBottom: "5px",
        backgroundColor: "#6a0dad",
        borderRadius: "5px",
        color: "white"
      }}
    >
      {genre}
    </BootstrapButton>
  );
}

export default GenreButton;
