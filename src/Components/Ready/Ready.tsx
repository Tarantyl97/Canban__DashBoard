import React, { useCallback } from "react";
import style from "../Ready/styles.module.css";
import plus from "..//Ready/plus.svg"
import { useState, useEffect, useRef } from "react";
import Modal from "../Modal/Modal";
import { Link } from 'react-router-dom';

interface ReadyProps {
  handleTaskSelect: (item: string) => void;
  words: string[];
  selected: string[];
  taskDescriptions: object | string;
  setTaskDescriptions: (value: { [key: string]: string } | string) => void;
  setWords: (value: string[]) => void;
  selectedTask: any;
  setSelectedTask: (value: string) => void;
  setSelected: (value: string[]) => void;
}


function Ready(props: ReadyProps): JSX.Element {
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLSelectElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const taskUrl = `/ready/${props.selectedTask}`;

  useEffect(() => {
    const savedTasksR = JSON.parse(localStorage.getItem("savedTasks") as string)  || [];
    const savedDescriptionsR = JSON.parse(localStorage.getItem("savedDescriptions") as string) || {}; // получить данные из savedTasks, savedDescriptions
    
    if (savedTasksR) {
      props.setSelected(savedTasksR);
    }

    if (savedDescriptionsR) {
      props.setTaskDescriptions(savedDescriptionsR);
    }
    
  }, []);

  useEffect(() => {
    localStorage.setItem("savedTasks", JSON.stringify(props.selected)); // записать данные в savedTasks
  }, [props.selected]);

  useEffect(() => {
    localStorage.setItem("savedDescriptions", JSON.stringify(props.taskDescriptions)); // записать данные в savedDescriptions
  }, [props.taskDescriptions]);
  
  useEffect(() => {
    adjustContainerHeight(); // Начальную высоту контейнера
  }, []);
  
  useEffect(() => {
    adjustContainerHeight(); //  Обновить высоту контейнера
  }, [props.selected]);
  
  function handleAddTask() {
    setIsAdding(true);
    adjustContainerHeight()
  }

  function chooseSelectedTask(event) { // проверка элемента и запись задачи в setSelectedTask
    if (event.target.classList.contains(style.container__tasktext)) {
        const task = event.target.textContent;
        props.setSelectedTask(task);
        setShowModal(true);
    }
  }

  const adjustContainerHeight = () => { // настройка высоты
    if (containerRef.current) {
      const containerHeight = containerRef.current.scrollHeight;
      let totalHeight = containerHeight;
      
      if (selectRef.current) {
        const selectHeight = selectRef.current.scrollHeight;
        totalHeight += selectHeight;
      }

      if(btnRef.current) {
        const btnHeight = btnRef.current.scrollHeight;
        totalHeight += btnHeight
      }

      containerRef.current.style.height = `${totalHeight}px`;
    }
  };

    return (
      <div className={style.container} ref={containerRef}>
        <h5 className={style.container__title}>Ready</h5>

        {
                    showModal ? (
                        <Modal showModal={showModal} setShowModal={setShowModal}>
                            <>
                                <h5 className={style.container__title}>Задача: {props.selectedTask}</h5>
                                <p>{props.taskDescriptions[props.selectedTask]}</p>
                                <button className={style.container__btn} 
                                onClick={() => setShowModal(false)}>Close</button>
                            </>
                        </Modal>
                    ) : null
                }

            <Link to={taskUrl} className={style.container__link}>
              {props.selected.map((item: string, index: number) => (
              <p key={index} 
              className={style.container__tasktext} 
              onClick={chooseSelectedTask}>{item}</p>
                ))}
            </Link>

        { isAdding && (

          <div className={style.container__addtask}>
            <select
              className={style.container__select} 
              value={''}
              onChange={(e) => props.handleTaskSelect(e.target.value)}
              ref={selectRef}
              >

              <option disabled value="">Select an item</option>

              {props.words.map((item: string) => (
              <option key={item} value={item}>
              {item}
              </option>
              ))}
            </select>
          </div>

        )}

        {!isAdding && (
          
          <button className={style.container__btn} onClick={handleAddTask} ref={btnRef}>
            <img src={plus}></img>
            Add card
          </button>
        )}
      </div>
    );
  }
  
  export default Ready;