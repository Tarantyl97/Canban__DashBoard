import React from "react";
import style from "../Backlog/styles.module.css";
import plus from "..//Backlog/plus.svg"
import { useState, useEffect, useRef } from "react";
import Modal from "../Modal/Modal";
import { Link } from 'react-router-dom';

interface BacklogProps {
    updateTaskText: (newTaskText: string) => void;
    setTaskDescriptions: (value: { [key: string]: string } | string) => void;
    setSelectedTask: (value: string) => void;
    setWords: any
    newTaskText?: string | null | undefined;
    words: string | any;
    taskDescriptions: object | string;
    selectedTask: any;
  }

function Backlog (props: BacklogProps): JSX.Element {
    const [showModal, setShowModal] = useState(false);
    const [isAdding, setIsAdding] = useState<boolean>(false);
    const [description, setDescription] = useState("")
    const [modalMessage, setModalMessage] = useState("");

    const containerRef = useRef<HTMLDivElement>(null);
    const btnRef = useRef<HTMLButtonElement | null>(null);
    const btnRefAdd = useRef<HTMLButtonElement | null>(null);

    const taskUrl = `/backlog/${props.selectedTask}`;

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem("tasks") as string)  || [];   // получить данные из tasks, descriptions
        const savedDescriptions = JSON.parse(localStorage.getItem("descriptions") as string)  || {};
    
        if (savedTasks) {
          props.setWords(savedTasks);
        }
    
        if (savedDescriptions) {
          props.setTaskDescriptions(savedDescriptions);
        }

      }, []);
    
      useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(props.words)); // записать данные в tasks
      }, [props.words]);
    
      useEffect(() => {
        localStorage.setItem("descriptions", JSON.stringify(props.taskDescriptions)); // записать данные в descriptions
      }, [props.taskDescriptions]);

      useEffect(() => {
        adjustContainerHeight(); // Начальную высоту контейнера
      }, []);
    
      useEffect(() => {
        adjustContainerHeight(); //  Обновить высоту контейнера
      }, [props.words]);

    function chooseSelectedTask(event) { // проверка элемента и запись задачи в setSelectedTask
        if (event.target.classList.contains(style.container__tasktext)) {
            const task = event.target.textContent;
            props.setSelectedTask(task);
            setDescription(props.taskDescriptions[task] || "");
            setShowModal(true);
            setDescription('')
        }
      }

    const addNewTask = () => {  // новая задача добавить
        setIsAdding(true) 
        adjustContainerHeight()
    }

    const saveNewTask = () => {
      if (props.newTaskText.trim() === '') { // Проверка на пустое поле
        alert('Enter a new Task!');
        return;
      }
      

      if (props.words.includes(props.newTaskText)) { // Проверка на уникальность
          alert('Task already exists!');
          return;
        }
        
      props.setWords([...props.words, props.newTaskText])
      setIsAdding(false)
      props.updateTaskText('')
      adjustContainerHeight()
    }

    const saveDes = () => {
        if (!props.selectedTask) return; // Проверка выбранной задачи

        if (description.trim() === '') { // Проверка на пустое поле
            setModalMessage('Enter Description or close the window! You can`t save empty description');
            return;
          }

        const updatedDescriptions = { ...props.taskDescriptions }; //Делаем чтобы выбиралась задача соотвествующая описанию
        updatedDescriptions[props.selectedTask] = description;
        props.setTaskDescriptions(updatedDescriptions);
        setDescription('')
    } 

    const adjustContainerHeight = () => { // настройка высоты
        if (containerRef.current) {
          const containerHeight = containerRef.current.scrollHeight;
          let totalHeight = containerHeight;
          
          if (btnRef.current) {
            const btnHeight = btnRef.current.scrollHeight;
            totalHeight += btnHeight;  
          }

          if(btnRefAdd.current) {
            const btnHeight = btnRefAdd.current.scrollHeight;
            totalHeight += btnHeight
          }
          
          containerRef.current.style.height = `${totalHeight}px`;
        }
      };

    return (
        <div className={style.container} onClick={chooseSelectedTask} ref={containerRef}>
            <h5 className={style.container__title}>Backlog</h5>
                {
                    showModal ? (
                        <Modal showModal={showModal} setShowModal={setShowModal}>
                            <>
                                <h5 className={style.container__title}>Задача: {props.selectedTask}</h5>
                                {
                                props.taskDescriptions[props.selectedTask] && (
                                <p>{props.taskDescriptions[props.selectedTask]}</p>)}

                                {modalMessage && <p>{modalMessage}</p>}

                                <input className={style.container__input} type="search" 
                                placeholder="Enter description"
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)}
                                >
                                </input>

                                <button className={style.container__btn} onClick={saveDes}>Save</button>
                                <button className={style.container__btn} onClick={() => setShowModal(false)}>Close</button>
                            </>
                        </Modal>
                    ) : null
                }
    
                {isAdding ? (
                <>

                <Link to={taskUrl} className={style.container__link}>
                {props.words.map((item: string, index: number) => (
                    <p key={index} 
                    className={style.container__tasktext}
                    onClick={chooseSelectedTask}
                    >   
                    {item}
                    </p>
                    ))}
                </Link>
                
                    <div className={style.container__addtask}>
                        <input className={style.container__input} type="search" 
                        placeholder="Enter task title"
                        value={props.newTaskText || ""} 
                        onChange={(e) => props.updateTaskText(e.target.value)}
                        >
                        </input>

                        <button className={style.container__btn} 
                        style={{background: "#0079BF", borderRadius: "5px", width: "102px", height: "29px", color: "white"}}
                         onClick={() => saveNewTask()} ref={btnRef}>
                            Submit
                        </button>
                    </div>
                </>
            ) :  (
                <>

                <Link to={taskUrl} className={style.container__link}>
                    {props.words.map((item: string, index: number) => (
                        <p key={index} className={style.container__tasktext}>{item}</p>
                        ))}
                    </Link>
                    <button className={style.container__btn} onClick={addNewTask} ref={btnRefAdd}>
                        <img src={plus}></img>
                        Add card
                    </button>

                </>
            )}
        </div>
    )
}

export default Backlog;