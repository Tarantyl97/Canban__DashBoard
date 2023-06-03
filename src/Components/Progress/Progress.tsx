import React from "react";
import style from "../Progress/styles.module.css";
import plus from "..//Progress/plus.svg"
import { useState } from "react";

interface ProgressProps {
    handleTaskSelectReady: (item: string) => void;
    selected: any;
    inProgress: never[];
}

function Progress ({ handleTaskSelectReady, selected, inProgress}: ProgressProps) {
    const [isAdding, setIsAdding] = useState<boolean>(false);
    // const [selectedItem, setSelectedItem] = useState<string>('');

    function handleAddTask() {
        setIsAdding(true);
      }

console.log(inProgress)
    return (
        <div className={style.container}>
            <h5 className={style.container__title}>In Progress</h5>
            <p className={style.container__task}>User page – performance issues</p>
            {/* <p className={style.container__task}>Auth bugfix</p> */}
            {inProgress.map((item: string, index: number) => (
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
              onChange={(e) => handleTaskSelectReady(e.target.value)}
            //   onChange={handleSelectedTask}
            >
              <option disabled value="" style={{textAlign: "center", overflow: "hidden", width: "280px"}}>
                Select an item
              </option>
              {/* display options from props.words */}
              {selected.map((item: string) => (
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
         
            
        </div>
)
}
{/* {}
<button className={style.container__btn}>
    <img src={plus}></img>
    Add card</button> */}

export default Progress;