import React, { useEffect } from 'react';
import './App.css';
import DrumMachine from './DrumMachine';

function App() {
  return (
    <div className="App">
      <DrumMachine />
      <p>Drum Machine made with <strong>Tonejs</strong> and <strong>React</strong></p>
    </div>
  );
}

export default App;
