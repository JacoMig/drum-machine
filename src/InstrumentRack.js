import React from 'react'
 import Instrument from './Instrument'


const InstrumentRack = ({samples, setBuffers, toggleInstrument, currentInstrument}) => {
//     const sounds = props.sounds
   
    return (
        <div className="instrument-rack">
            {Object.keys(samples).map(name => {
                // console.log(sounds[name])
                return (
                   <Instrument 
                        key={name} 
                        name={name} 
                        buffer={samples[name].url}
                        setBuffers={setBuffers} 
                        toggleInstrument={toggleInstrument}
                        selected={name === currentInstrument ? true : false} />   
                )
            })}
        </div>    
    )
}

export default InstrumentRack