import React from "react";
import classNames from "classnames/bind";
import styles from "./ArrowButton.module.scss";

const cx = classNames.bind(styles);

function ArrowButton({
    children,
    onClick,
    small,
    style1_prev,
    style1_next,
    style2_prev,
    style2_next,
    ...passProps
}) {
    const Component = "button";
    const props = {
        onClick,
    };
    const classes = cx("wrapper", {
        small,

        style2_prev,
        style2_next,
        style1_prev,
        style1_next,
    });
    return (
        <Component className={classes} {...props}>
            {children}
        </Component>
    );
}

export default ArrowButton;
