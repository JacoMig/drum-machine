import React, { useEffect } from 'react'
import Knob from './Knob'

const FxControls = ({Fx, channel, setFx, removeFx}) => {
    

    const handleChangeKnob = (val, name) => {
        switch(name){
            case 'delay':
                Fx[name].wet.value = val/10
            break;
            case 'phaser':
                Fx[name].frequency.value = val
            break;
        }
        console.log(val, name)
    }

    

    useEffect(() => {
        if(channel){
           /*  Object.keys(Fx).map(name => {
                Fx[name].chain(channel)
            }) */
        }
    }, [Fx, channel])


    useEffect(() => {
        Knob.defaultProps = {
            size: 150,
            min: 10,
            max: 30,
            numTicks: 0,
            degrees: 270,
            value: 0
        };
    }, [])

    
    return (
        <>
            {Object.keys(Fx).map(name => 
                <div key={name}>
                    <span>{name}</span>
                    <span onClick={() => removeFx(name)}>X</span>
                    <Knob
                        key={name}
                        numTicks={25}
                        degrees={180}
                        min={1}
                        max={100}
                        value={0}
                        size={30}
                        onChange={(val) => handleChangeKnob(val, name)}
                    />
                </div>
            )}
        </>
    )
}


export default FxControls