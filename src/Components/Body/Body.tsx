import React, { useEffect } from "react";
import style from "../Body/styles.module.css";
import Backlog from "../Backlog/Backlog.tsx";
import Ready from "../Ready/Ready.tsx";
import Progress from "../Progress/Progress.tsx";
import Finished from "../Finished/Finished.tsx";
import { useState } from "react";

interface BodyProps {
    updateNumTasks: (activeNum: number, finishedNum: number) => void;
}

function Body ({updateNumTasks}: BodyProps) {

    const [newTaskText, setNewTaskText] = useState<string | undefined>("");
    const [words, setWords] = useState<string | any>([]);
    const [selected, setSelected] = useState<string | any>([]);
    const [inProgress, setInProgress] = useState([]);
    const [finish, setFinish] = useState ([]);

    useEffect(() => {
        updateNumTasks(inProgress.length, finish.length)
    }, [inProgress, finish])

    function updateTaskText (newTaskText: string) {
        setNewTaskText(newTaskText);
    }

    const handleTaskSelect = (item: never) => {
        setWords(words.filter((word) => word !== item));
        setSelected([item, ...selected].reverse()); //не совсем корректно
        console.log(selected, words)
      };

      const handleTaskSelectReady = (item: never) => {
        setSelected(selected.filter((select) => select !== item)); //select change item
        setInProgress([item, ...inProgress]); //не совсем корректно
        console.log(inProgress, selected)
      };

      const handleTaskSelectFinish = (item: never) => {
        setInProgress(inProgress.filter((progress) => progress !== item));
        setFinish([item, ...finish])
        console.log(finish, inProgress)
      }

    return (
        <div className={style.body}>
            <Backlog updateTaskText={updateTaskText} newTaskText={newTaskText} words={words} setWords={setWords}/>
            <Ready handleTaskSelect={handleTaskSelect} words={words} selected={selected} />
            <Progress handleTaskSelectReady={handleTaskSelectReady} selected={selected} inProgress={inProgress}/>
            <Finished handleTaskSelectFinish={handleTaskSelectFinish} inProgress={inProgress} finish={finish}/>
        </div>

    )
}

export default Body;