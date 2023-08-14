import classNames from "classnames/bind";
import styles from './Header.module.scss'

import { useContext } from "react";
import { ThemeContext } from "~/App";

const cx = classNames.bind(styles)

function Header() {

    const [theme] = useContext(ThemeContext)

    return (
        <div className={cx('wrapper', theme)}>
        </div>
    );
}

export default Header;