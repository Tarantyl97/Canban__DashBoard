import React from "react";
import style from "../Progress/styles.module.css";
import plus from "..//Progress/plus.svg"
import { useState, useRef, useEffect } from "react";
import Modal from "../Modal/Modal";
import { Link } from 'react-router-dom';

interface ProgressProps {
    handleTaskSelectReady: (item: string) => void;
    selected: any;
    inProgress: string[];
    setTaskDescriptions: (value: { [key: string]: string } | string) => void;
    setWords: (value: string[]) => void;
    selectedTask: any;
    setSelectedTask: (value: string) => void;
    setSelected: (value: string[]) => void;
    taskDescriptions: object | string;
    setInProgress: any;
}

function Progress (props: ProgressProps) {
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLSelectElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const taskUrl = `/inprogress/${props.selectedTask}`;

  function handleAddTask() {  // добавить задачу
      setIsAdding(true);
      adjustContainerHeight()
    }

    useEffect(() => {
      const savedTasksP = JSON.parse(localStorage.getItem("savedTasksProgress") as string) || [];  // получить данные из savedTasksProgress, savedDescriptionsProgress
      const savedDescriptionsP = JSON.parse(localStorage.getItem("savedDescriptionsProgress") as string) || {};
      
      if (savedTasksP) {
        props.setInProgress(savedTasksP);
      }
  
      if (savedDescriptionsP) {
        props.setTaskDescriptions(savedDescriptionsP);
      }

    }, []);
  
    useEffect(() => {
      localStorage.setItem("savedTasksProgress", JSON.stringify(props.inProgress)); // записать данные в savedTasksProgress
    }, [props.inProgress]); 
  
    useEffect(() => {
      localStorage.setItem("savedDescriptionsProgress", JSON.stringify(props.taskDescriptions)); // записать данные в savedDescriptionsProgress
    }, [props.taskDescriptions]);

      
    useEffect(() => {
      adjustContainerHeight(); // Начальную высоту контейнера
    }, []);
    
    useEffect(() => {
      adjustContainerHeight(); //  Обновить высоту контейнера
    }, [props.inProgress]);

    function chooseSelectedTask(event) {  // проверка элемента и запись задачи в setSelectedTask
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
            <h5 className={style.container__title}>In Progress</h5>
            {
                    showModal ? (
                        <Modal showModal={showModal} setShowModal={setShowModal}>
                            <>
                                <h5 className={style.container__title}>Задача: {props.selectedTask}</h5>
                                <p>{props.taskDescriptions[props.selectedTask]}</p>
                                <button className={style.container__btn} onClick={() => setShowModal(false)}>Close</button>
                            </>
                        </Modal>
                    ) : null
                }
                <Link to={taskUrl} className={style.container__link}>
            {props.inProgress.map((item: string, index: number) => (
            <p key={index} className={style.container__tasktext}
            onClick={chooseSelectedTask}>{item}</p>
            ))} 
            </Link>

        {isAdding && (

          <div className={style.container__addtask}>
            <select
              className={style.container__select} 
              value={''}
              onChange={(e) => props.handleTaskSelectReady(e.target.value)}
              ref={selectRef}
            >
              <option disabled value="" 
              style={{textAlign: "center", overflow: "hidden", width: "280px"}}>
                Select an item
              </option>
              {props.selected.map((item: string) => (
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
  )
}


export default Progress;