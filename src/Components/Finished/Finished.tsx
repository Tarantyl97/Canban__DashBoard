import React, { useState, useEffect, useRef } from "react";
import style from "../Finished/styles.module.css";
import plus from "..//Finished/plus.svg";
import Modal from "../Modal/Modal";
import { Link } from 'react-router-dom';


interface FinishProps {
    handleTaskSelectFinish: (item: string) => void;
    inProgress: any;
    finish: never[];
    setFinish: any;
    setTaskDescriptions: (value: { [key: string]: string } | string) => void;
    taskDescriptions: object | string;
    setSelectedTask: (value: string) => void;
    selectedTask: any;
  }

function Finished (props: FinishProps): JSX.Element {
    const [isAdding, setIsAdding] = useState<boolean>(false);
    const [showModal, setShowModal] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const selectRef = useRef<HTMLSelectElement | null>(null);
    const btnRef = useRef<HTMLButtonElement | null>(null);
  
    const taskUrl = `/finished/${props.selectedTask}`;
  
    useEffect(() => {
      const savedTasksF = JSON.parse(localStorage.getItem("savedTasksFinished") as string) || []; // получить данные из savedTasksFinished, savedDescriptionsFinished
      const savedDescriptionsF = JSON.parse(localStorage.getItem("savedDescriptionsFinished") as string) || {};
      
      if (savedTasksF) {
        props.setFinish(savedTasksF);
      }
  
      if (savedDescriptionsF) {
        props.setTaskDescriptions(savedDescriptionsF);
      }

    }, []);
  
    useEffect(() => {
      localStorage.setItem("savedTasksFinished", JSON.stringify(props.finish)); // записать данные в savedTasksFinished
    }, [props.finish]);  
  
    useEffect(() => {
      localStorage.setItem("savedDescriptionsFinished", JSON.stringify(props.taskDescriptions)); // записать данные в savedDescriptionsFinished
    }, [props.taskDescriptions]);

      
    useEffect(() => {
      adjustContainerHeight(); // Начальную высоту контейнера
    }, []);
    
    useEffect(() => {
      adjustContainerHeight(); // Обновить высоту контейнера
    }, [props.finish]);

    function chooseSelectedTask(event) { // проверка элемента и запись задачи в setSelectedTask
      if (event.target.classList.contains(style.container__tasktext)) {
          const task = event.target.textContent;
          props.setSelectedTask(task);
          setShowModal(true);
      }
    }

    const adjustContainerHeight = () => {
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

    function handleAddTask() {
        setIsAdding(true);
        adjustContainerHeight();
      }

    return (
        <div className={style.container} ref={containerRef}>
            <h5 className={style.container__title}>Finished</h5>

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
            {props.finish.map((item: string, index: number) => (
            <p key={index} className={style.container__tasktext}
            onClick={chooseSelectedTask}>{item}</p>
            ))} 
          </Link>  

        {isAdding && (

          <div className={style.container__addtask}>
            <select
              className={style.container__select} 
              value={''}
              onChange={(e) => props.handleTaskSelectFinish(e.target.value)}
              ref={selectRef}
            >
              <option disabled value="" 
              style={{textAlign: "center", overflow: "hidden", width: "280px"}}>
                Select an item
              </option>

              {props.inProgress.map((item: string) => (
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

export default Finished;
