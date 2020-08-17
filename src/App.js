import React, {useState,  useEffect } from 'react';
import './App.css';
import DrumMachine from './DrumMachine';
import {isTouchDevice} from './utils/util';

function App() {
  
  const [appClasses, setAppClasses] = useState(["App"]);
  const [orientation, setOrientation] = useState('');
  
  const handleOrientation = () => {
     return window.orientation === 90 ? 'landscape' : 'portrait'
  }
  
  /* useEffect(() => {
    if(isTouchDevice()) {
       setAppClasses(state => [...state, "mobile"]);
    }
  }, []) */

  return (
    <div className={appClasses.join(" ")}>
      <DrumMachine />
      <p>Drum Machine made with <strong>Tonejs</strong> and <strong>React</strong></p>
    </div>
  );
}

export default App;
