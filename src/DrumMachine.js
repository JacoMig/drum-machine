import React, {useState, useEffect, useRef} from 'react'
import Tone from 'tone'
import Controls from './Controls'
import InstrumentRack from './InstrumentRack'
import samples from './samples.json'
import Step from './Step'
import FxCollector from './FxCollector'

const initialStepPattern = [false, false, false, false, false, false,false,false,false,false,false,false,false,false,false,false]

const initialStepState = () => {
    let stepsObj = {}          
    Object.keys(samples).map(key => {
        stepsObj = {...stepsObj, [key]: initialStepPattern } 
    })
    return stepsObj
};  

const DrumMachine = () => {
    
    const [steps, setSteps] = useState(initialStepState) 
    const [currentStep, setCurrentStep] = useState(-1);
    const [buffers, setBuffers] = useState({})
    const [playStop, setPlayStop] = useState(false)
    const [currentInstrument, setCurrentInstrument] = useState('kick')
    const [bpm, setBpm] = useState(120)
    const [volume, setVolume] = useState(30)
    const minVolume = -40;

    const buffersRef = useRef(buffers);
    buffersRef.current = buffers;
    const stepsRef = useRef(steps);
    stepsRef.current = steps; 
    const currentStepRef = useRef(currentStep);
    currentStepRef.current = currentStep;
    
    useEffect(() => {
        Tone.Transport.scheduleRepeat(function(time) {
            setCurrentStep(step => {
                return step < 15 ? (step += 1) : 0;
            }); 
            Object.keys(buffersRef.current).map(key => {
                if(stepsRef.current[key][currentStepRef.current]){
                    buffersRef.current[key].start(time)
                } 
            })
        }, "16n");
        setVolume(minVolume + volume)
    }, []);

    const toggleStep = (i) => {
        setSteps((step) => ({
            ...steps,
            [currentInstrument]: steps[currentInstrument].map((s,index) => index === i ? !s : s )    
        }))
    }

    const toggleInstrument = (name) => {
        setCurrentInstrument(name)
    }

    useEffect(() => {
        playStop ? Tone.Transport.start() : Tone.Transport.stop()
    }, [playStop]) 

    useEffect(() => {
        Tone.Transport.bpm.value = bpm
    },[bpm])

    useEffect(() => {
        Tone.Master.volume.value = volume
    },[volume])

    useEffect(() => {
      // console.log('steps', steps) 
    })

    return (
        <>
            {/* console.log(currentStep) */}
            <div className="main-body">
                <InstrumentRack 
                    samples={samples}
                    setBuffers={setBuffers} 
                    toggleInstrument={toggleInstrument}
                    currentInstrument={currentInstrument}
                />
                <div className="master">
                    <h3>Master</h3>
                    <Controls 
                        setPlayStop={() => setPlayStop(state => !state)} 
                        playStop={playStop} 
                        setBpm={setBpm}
                        bpm={bpm}
                        volume={volume}
                        minVolume={minVolume}
                        setVolume={setVolume}
                    />
                    <FxCollector />
                </div>
            </div>
            <div className="steps-sequencer">
                <div className="step-container">
                    <Step 
                        currentStep={currentStep}
                        steps={steps[currentInstrument]} 
                        name={currentInstrument}
                        toggleStep={(i) => toggleStep(i)} />
                </div>
            </div>
        </>
    );
}

export default DrumMachine