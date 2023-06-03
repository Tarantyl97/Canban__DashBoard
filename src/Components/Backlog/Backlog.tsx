import React from "react";
import style from "../Backlog/styles.module.css";
import plus from "..//Backlog/plus.svg"
import { useState } from "react";

interface BacklogProps {
    updateTaskText: (newTaskText: string) => void;
    setWords: any
    newTaskText?: string | undefined;
    words: string | any;
  }

function Backlog (props: BacklogProps): JSX.Element {
    // console.log(props.newTaskText)
    const [isAdding, setIsAdding] = useState<boolean>(false);
    // const [newTaskText, setNewTaskText] = useState<string>("");
    // const [words, setWords] = useState([])

    const addNewTask = () => {
        // props.updateCurrent(null, [   ]);
        setIsAdding(true)
        // setNewTaskText("");
    }

    const saveNewTask = () => {
        if (props.newTaskText.trim() === '') { // Проверка на пустое поле
            alert('Введите задачу!')
            return
        }

        props.setWords([...props.words, props.newTaskText])
        setIsAdding(false)
        props.updateTaskText('')
    }
    // console.log(props.words)
    return (
        <div className={style.container}>
            <h5 className={style.container__title}>Backlog</h5>
            <p className={style.container__task}>Login page – performance issues</p>

            {isAdding ? (
                <>
                {props.words.map((item: string, index: number) => (
                    <p key={index} 
                    className={style.container__tasktext}
                    // onChange={() => props.onWordClick(index, item)}
                    >
                        {item}</p>
                    ))}
                    <div className={style.container__addtask}>
                        <input className={style.container__input} type="search" 
                        placeholder="Enter task title"
                        value={props.newTaskText} 
                        onChange={(e) => props.updateTaskText(e.target.value)}
                        ></input>
                        <button className={style.container__btn} 
                        style={{background: "#0079BF", borderRadius: "5px", width: "102px", height: "29px", color: "white"}}
                         onClick={() => saveNewTask()}>
                            Submit
                        </button>
                    </div>
                </>
            ) :  (
                <>
                    {props.words.map((item: string, index: number) => (
                        <p key={index} className={style.container__tasktext}>{item}</p>
                        ))}
                    <button className={style.container__btn} onClick={addNewTask}>
                        <img src={plus}></img>
                        Add card
                    </button>
                </>
            )}
        </div>
    )

}

export default Backlog;