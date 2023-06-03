import React from "react";
import style from "./styles.module.css";
import user from "./user-avatar.svg";
import arrow from "./arrow-down.svg";

function Header (): JSX.Element {
    return (
        <div className={style.header}>
            <h3 className={style.header__title}>Awesome Kanban Board</h3>
            <div className={style.header__logo}>
                <img className={style.header__img_user} src={user}></img>
                <img className={style.header__img_arrow} src={arrow}></img>
            </div>
        </div>
    )
}

export default Header;