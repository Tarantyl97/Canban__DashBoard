import React from "react";
import style from "../Footer/styles.module.css"

interface FooterProps {
    activeNum: number; 
    finishedNum: number;
}


function Footer ({activeNum, finishedNum}: FooterProps) {
    return (
        <footer className={style.footer}>
            <div className={style.footer__container}>
            <span className={style.footer__text}>Active tasks: {activeNum}</span>
            <span className={style.footer__text}>Finished tasks: {finishedNum} </span>
            </div>
            <span className={style.footer__text}>Kanban board by Vladislav, 2023</span>
        </footer>
    )
}

export default Footer;