import React, {useState, useEffect, useRef} from 'react'
import Tone from 'tone'
import Controls from './Controls'
import InstrumentRack from './InstrumentRack'
import samples from './samples.json'
import Step from './Step'

const initialStepState = {
    kick: [false, false, false, false, false, false,false,false,false,false,false,false,false,false,false,false],
    hihat: [false, false, false, false, false, false,false,false,false,false,false,false,false,false,false,false],
};

let mycurrentstep = 0

const DrumMachine = () => {
    const [steps, setSteps] = useState(initialStepState)
    const [currentStep, setCurrentStep] = useState(0);
    const [buffers, setBuffers] = useState({})
    const [playStop, setPlayStop] = useState(false)
    const [currentInstrument, setCurrentInstrument] = useState({kick: []})
    
    const buffersRef = useRef(buffers);
    buffersRef.current = buffers;
    const stepsRef = useRef(steps);
    stepsRef.current = steps;
    const currentStepRef = useRef(currentStep);
    currentStepRef.current = currentStep;
    /* const currentInstrumentRef = useRef(currentInstrument) 
    currentInstrumentRef.current = currentInstrument */

     /* const soundRef = useRef(sound)
     soundRef.current = sound */
    
    useEffect(() => {
        // const mySound = new Tone.Player("https://raw.githubusercontent.com/kenwheeler/hooks-drum-machine/master/public/sounds/kick.wav").toMaster()
       
        // console.log(new Tone.Synth())
        setCurrentInstrument({kick: steps['kick']})
        Tone.Transport.scheduleRepeat(function(time) {
            
            setCurrentStep(step => {
                return step < 15 ? (step += 1) : 0;
            }); 
            
            Object.keys(buffersRef.current).map(key => {
                if(stepsRef.current[key][currentStepRef.current]){
                    buffersRef.current[key].start(time)
                    
                } 
            })
            
            // synth.triggerAttackRelease('C3', '8n')
           
        }, "16n");
        
        //  console.log(buffersRef.current)

    }, []);

    const toggleStep = (s, i) => {
        let newSteps = currentInstrument
        newSteps[s][i] = !newSteps[s][i] 
        setSteps({...steps, ...newSteps})
        console.log(stepsRef.current)
    }

    const toggleInstrument = (name) => {
        setCurrentInstrument({[name]: steps[name]})

    }

    useEffect(() => {
      //  console.log(currentInstrument)
    })

    useEffect(() => {
        playStop ? Tone.Transport.start() : Tone.Transport.stop()
    }, [playStop]) 

    return (
        <>
            {/* console.log(currentStep) */}
            <Controls 
                setPlayStop={() => {
                    setPlayStop(state => !state)
                }} 
                playStop={playStop} />
            <div className="steps-sequencer">
                <div className="step-container">
                    {Object.keys(currentInstrument).map(s => (
                        <Step 
                            key={s}
                            currentStep={currentStep}
                            steps={currentInstrument[s]} 
                            toggleStep={(i) => toggleStep(s, i)} />
                    ))}
                </div>
            </div>  
            <InstrumentRack 
                samples={samples}
                setBuffers={setBuffers} 
                toggleInstrument={toggleInstrument}
            /> 
        </>
    );
}

export default DrumMachine