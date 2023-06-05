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

interface commonProps {
    taskDescriptions: object | string;
    setTaskDescriptions: (value: { [key: string]: string } | string) => void;
    words: string[] | any;
    setWords: any
    selectedTask: any;
    setSelectedTask: (value: string) => void;
}


function Body ({updateNumTasks}: BodyProps) {
    const [newTaskText, setNewTaskText] = useState<string | null | undefined>("");
    const [words, setWords] = useState<string[] | any>([]);
    const [selected, setSelected] = useState<string | any>([]);
    const [inProgress, setInProgress] = useState<string | any>([]);
    const [finish, setFinish] = useState<string | any>([]);
    const [taskDescriptions, setTaskDescriptions] = useState<object | string>({})
    const [selectedTask, setSelectedTask] = useState<any>(null);
    const commonProps = { taskDescriptions: taskDescriptions, setTaskDescriptions: setTaskDescriptions, 
        words: words, setWords: setWords, selectedTask: selectedTask, setSelectedTask: setSelectedTask, };

    useEffect(() => {
        updateNumTasks(words.length, finish.length)
    }, [words, finish])

    function updateTaskText (newTaskText: string) {
        setNewTaskText(newTaskText);
    }

    const handleTaskSelect = (item: string) => {
        setWords(words.filter((word: string) => word !== item));
        setSelected([...selected, item]);
    };

    const handleTaskSelectReady = (item: string) => {
        setSelected(selected.filter((select: string) => select !== item)); //фильтруем и добавляем массив
        setInProgress([...inProgress ,item]); 
    };

    const handleTaskSelectFinish = (item: string) => {
        setInProgress(inProgress.filter((progress: string) => progress !== item));
        setFinish([...finish, item])
    }

    return (
        <main className={style.body}>

            <Backlog updateTaskText={updateTaskText} {...commonProps} newTaskText={newTaskText}/>

            <Ready handleTaskSelect={handleTaskSelect} taskDescriptions={taskDescriptions} 
            setTaskDescriptions={setTaskDescriptions}  words={words} selected={selected} setSelected={setSelected} setWords={setWords}
            selectedTask={selectedTask} setSelectedTask={setSelectedTask}/>

            <Progress handleTaskSelectReady={handleTaskSelectReady} taskDescriptions={taskDescriptions} selected={selected} inProgress={inProgress} 
            setTaskDescriptions={setTaskDescriptions} setSelected={setSelected} setWords={setWords}
            selectedTask={selectedTask} setSelectedTask={setSelectedTask} setInProgress={setInProgress}
            />

            <Finished handleTaskSelectFinish={handleTaskSelectFinish} inProgress={inProgress} finish={finish} setFinish={setFinish}
            taskDescriptions={taskDescriptions} setTaskDescriptions={setTaskDescriptions} selectedTask={selectedTask} 
            setSelectedTask={setSelectedTask}
            />

        </main>
    )
}

export default Body;