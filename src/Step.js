import React from 'react'

const Step = ({steps, currentStep, toggleStep, name}) => {
    
    return (
        <div className="steps-line">
            {steps && steps.length > 0 && steps.map((s,i) => {
               return <div 
                    key={name+'-'+i}
                    className={`step ${s ? 'active' : ''} ${currentStep === i ? 'current' : ''}`}
                    onMouseDown={() => toggleStep(i)}
                    >
                </div>
            })}
        </div>
    )
}

export default Step