import './App.css';
import Footer from './Components/Footer/Footer.tsx';
import Header from './Components/Header/Header.tsx';
import Body from './Components/Body/Body.tsx';
import { useState } from 'react';

function App() {
  const [activeNum, setActiveNum] = useState(0)
  const [finishedNum, setFinishedNum] = useState(0)
  

function updateNumTasks (activeNum, finishedNum) {
  setActiveNum(activeNum);
  setFinishedNum(finishedNum);
  return activeNum, finishedNum
}

  return (
    <>
        <Header />
        <Body updateNumTasks={updateNumTasks}/>
        <Footer activeNum={activeNum} finishedNum={finishedNum} />
    </>
  );
}

export default App;
