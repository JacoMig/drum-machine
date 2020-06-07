import React from 'react'
 import Instrument from './Instrument'


const InstrumentRack = ({samples, setBuffers, toggleInstrument}) => {
//     const sounds = props.sounds
   
    return (
        <div className="instrument-rack">
            {Object.keys(samples).map(name => {
                // console.log(sounds[name])
                return (
                    <div className="instrument" key={name}>
                        <Instrument 
                            key={name} 
                            name={name} 
                            buffer={samples[name].url}
                            setBuffers={setBuffers} 
                            toggleInstrument={toggleInstrument} />   
                    </div>
                )
            })}
        </div>    
    )
}

export default InstrumentRack