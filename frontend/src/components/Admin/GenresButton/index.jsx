// GenreButton.jsx
import React from "react";
import BootstrapButton from "react-bootstrap/Button";
import classNames from "classnames/bind";
import styles from "../../../pages/Admin/Comics/Comics.module.scss";

const cx = classNames.bind(styles);
const GenreButton = ({ genre }) => {
  return (
    <BootstrapButton
      className={cx("genre")}
      variant="primary"
      style={{
        marginRight: "5px",
        marginBottom: "5px",
        backgroundColor: "#6F6AF8",
        borderRadius: "5px",
        color: "white",
      }}
    >
      {genre}
    </BootstrapButton>
  );
};

export default GenreButton;
