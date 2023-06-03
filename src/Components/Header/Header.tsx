import React from "react";
import style from "./styles.module.css";
import user from "./user-avatar.svg";
import arrow from "./arrow-down.svg";
import { useState, useRef, useEffect } from "react";

function Header (): JSX.Element {

const [isOpen, setIsOpen] = useState(false);
const dropdownRef = useRef<HTMLDivElement>(null);

const handleToggle = () => {
  setIsOpen(!isOpen);
};

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
    setIsOpen(false);
  }
};

useEffect(() => {
  document.addEventListener('click', handleClickOutside);

  return () => {
    document.removeEventListener('click', handleClickOutside);
  };
}, []);

return (
  <header className={style.header}>
    <h3 className={style.header__title}>Awesome Kanban Board</h3>
    <div className={style.header__logo} ref={dropdownRef} onClick={handleToggle}>
      <img className={style.header__img_user} src={user} />
      <img 
      className={`${style.header__img_arrow} ${isOpen ? style['header__img_arrow__open'] : ''}`} src={arrow} />
      <div
      className={`${style.header__arrow} ${isOpen ? style['header__arrow__open'] : ''}`}
      ></div>
      {isOpen && (
        <div className={style.dropdown} onClick={(e => e.stopPropagation())}>
          <p>Profile</p>
          <p>Log out</p>
        </div>
      )}
    </div>
  </header>
);
};


export default Header;