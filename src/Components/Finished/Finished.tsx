import React, { useState } from "react";
import style from "../Finished/styles.module.css";
import plus from "..//Finished/plus.svg";

interface FinishProps {
    handleTaskSelectFinish: (item: never) => void;
    inProgress: any;
    finish: never[];
  }

function Finished ({ handleTaskSelectFinish, inProgress, finish}: FinishProps): JSX.Element {
    const [isAdding, setIsAdding] = useState<boolean>(false);

    function handleAddTask() {
        setIsAdding(true);
      }

    return (
        <div className={style.container}>
            <h5 className={style.container__title}>Finished</h5>
            <p className={style.container__tasktext}>Main page – performance issues</p>
            <p className={style.container__tasktext}>Main page bugfix</p>


            {finish.map((item: string, index: number) => (
            <p key={index} className={style.container__tasktext}>{item}</p>
            ))} 

        {isAdding && (
          <div className={style.container__addtask}>
            {/* {props.selected.map((item: string, index: number) => (
            <p key={index} className={style.container__tasktext}>{item}</p>
            ))}  */}
            {/* <p className={style.container__tasktext}>{props.selected}</p> */}
            <select
              className={style.container__select} 
              // style={{width: "282px"}}
              value={''}
              // value={{...props.words} || ''}
              // onChange={(e) => setSelectedItem(e.target.value)}
              // onClick={handleSelectedTask}
              // onChange={(e) => setSelectedItem(e.target.value)}
              onChange={(e) => handleTaskSelectFinish(e.target.value)}
            //   onChange={handleSelectedTask}
            >
              <option disabled value="" style={{textAlign: "center", overflow: "hidden", width: "280px"}}>
                Select an item
              </option>
              {/* display options from props.words */}
              {inProgress.map((item: string) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        )}
        {!isAdding && (
          <button className={style.container__btn} onClick={handleAddTask}>
            <img src={plus}></img>
            Add card
          </button>
        // )}

        )}
            {/* {isAdding ? (
                <>
                {words.map((item, index) => (
                    <p key={index} className={style.container__tasktext}>{item}</p>
                    ))}
                    <div className={style.container__addtask}>
                        <input className={style.container__input} type="text" 
                        placeholder="Enter task title" value={newTaskText} onChange={(e) => setNewTaskText(e.target.value)}></input>
                        <button className={style.container__btn} 
                        style={{background: "#0079BF", borderRadius: "5px", width: "102px", height: "29px", color: "white"}}
                         onClick={() => saveNewTask()}>
                            Submit
                        </button>
                    </div>
                </>
            ) :  (
                <>
                    {words.map((item, index) => (
                        <p key={index} className={style.container__tasktext}>{item}</p>
                        ))}
                    <button className={style.container__btn} onClick={addNewTask}>
                        <img src={plus}></img>
                        Add card
                    </button>
                </>
            )} */}


        </div>
    )
}

export default Finished;
