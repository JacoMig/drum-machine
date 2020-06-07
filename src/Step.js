import React from 'react'

const Step = ({steps, currentStep, toggleStep}) => {
    
    return (
        <div className="steps-line">
            {steps.length > 0 && steps.map((s,i) => {
                console.log(currentStep, i)
                return <div 
                    key={i}
                    className={`step ${s ? 'active' : ''} ${currentStep === i ? 'current' : ''}`}
                    onMouseDown={() => toggleStep(i)}
                    >
                </div>
            })}
        </div>
    )
}

export default Step