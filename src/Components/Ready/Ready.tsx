import React from "react";
import style from "../Ready/styles.module.css";
import plus from "..//Ready/plus.svg"
import { useState, useEffect } from "react";


interface ReadyProps {
  handleTaskSelect: (item: string) => void;
  words: string[];
  selected: string[];
}

let writeSelected: any;
let getSelected: any;

function Ready({ handleTaskSelect, words, selected }: ReadyProps): JSX.Element {
    const [isAdding, setIsAdding] = useState<boolean>(false);

    function handleAddTask() {
      setIsAdding(true);
    }

    // useEffect(() => {
    //   // при изменении значения selected сохраняем его в localStorage
    //   localStorage.setItem("ready", selected);
    // }, [selected]);

    useEffect(() => {
      localStorage.setItem("ready", JSON.stringify(selected));
      localStorage.getItem("ready")
    }, [selected]);

    // useEffect(() => {
    //   const storedSelected = localStorage.getItem("ready");
      
    //   if (selected !== null) {
    //     return () => {
    //       <div className={style.container}>
    //       <h5 className={style.container__title}>Ready</h5>
    //         <p className={style.container__tasktext}>{storedSelected}</p>
    //                     <button className={style.container__btn} onClick={handleAddTask}>
    //           <img src={plus}></img>
    //           Add card
    //         </button>
    //       </div>

    //     }
    //   }
    // }, [])
    // for(let i=0; i<localStorage.length; i++) {
    //   let key = localStorage.getItem("ready");
    //   console.log(`${key}: ${localStorage.getItem("ready")}`);
    // }

    return (
      <div className={style.container}>
        <h5 className={style.container__title}>Ready</h5>
        { selected != null && <p className={style.container__tasktext}>{localStorage.getItem("ready")}</p>}

        {selected.map((item: string, index: number) => (
            <p key={index} className={style.container__tasktext}>{item}</p>
            ))} 

        {isAdding && (
          <div className={style.container__addtask}>
            <select
              className={style.container__select} 
              value={''}
              onChange={(e) => handleTaskSelect(e.target.value)}
            >
              <option disabled value="" style={{textAlign: "center", overflow: "hidden", width: "280px"}}>
                Select an item
              </option>
              {/* display options from props.words */}
              {words.map((item: string) => (
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
        )}
      </div>
    );
  }
  
  export default Ready;