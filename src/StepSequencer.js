import React from 'react'
import Step from './Step'
const StepSequencer = (props) => {
    return (
        <div className="steps-sequencer">
            <div className="step-container">
                <Step 
                    currentStep={props.currentStep}
                    steps={props.steps[props.currentInstrument]} 
                    name={props.currentInstrument}
                    toggleStep={(i) => props.toggleStep(i)} />
            </div>
        </div>)
}


export default StepSequencer