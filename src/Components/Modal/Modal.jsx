import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import style from "../Modal/style.module.css";

const Modal = ({showModal, setShowModal, children }) => {
  const elRef = useRef(null);

  if (!elRef.current) {
    elRef.current = document.createElement("div");
    elRef.current.className = style.modal 
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);

    return () => modalRoot.removeChild(elRef.current);
    }, []);

  return createPortal(
  <div className={style.modal} onClick={() => setShowModal(false)}>
    <div className={style.modal_active} onClick={(e => e.stopPropagation())}>
      <div className={style.modal__content_active} onClick={(e => e.stopPropagation())}>
      {children}
      </div>
    </div>
  </div>, elRef.current);
};

export default Modal;