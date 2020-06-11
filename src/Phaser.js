import React, {useState, useEffect, useRef} from 'react'
import styled from 'styled-components'
import Knob from './Knob'

const Rack = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
`

const Phaser = ({FX, params, setParams}) => {
    const [name, setName] = useState(Object.keys(FX)[0])
   
   
    useEffect(() => {
        if(name){
            // FX[name].bits = maxVal - params.bits;
            FX[name].set('frequency', params.frequency)
            FX[name].set('octaves', params.octaves)
            FX[name].receive(name).toMaster()
        } 
        console.log(name, 'mount')
        console.log(name+' params', params)
        return (() => {
            console.log(name, 'unmount')
        })
    }, [])

   
    
    const handleChangeKnob = (val, prop) => {
        switch(prop){
            case 'frequency':
               setParams(state => ( { ...state, [name]: { ...state[name], [prop]: val/10} } )) 
               FX[name].set('frequency', params[prop])
            break;
            case 'octaves':
                setParams(state => ( { ...state, [name]: { ...state[name], [prop]: val} } ))
                FX[name].set('octaves', params[prop])
            break;
        } 
    }
    
    return (
        <>
            <div className="fx-wrapper">
                <span>{name}</span>
                <span onClick={() => null}>X</span>
                <Rack>
                    <div>
                        <h4>Frequency</h4>
                        <Knob
                            numTicks={8}
                            degrees={220}
                            min={0}
                            max={4000}
                            value={params.frequency}
                            size={35}
                            onChange={(val) => handleChangeKnob(val, 'frequency')}
                        />
                    </div>
                    <div>
                        <h4>Octaves</h4>
                        <Knob
                            numTicks={8}
                            degrees={220}
                            min={0}
                            max={8}
                            value={params.octaves}
                            size={35}
                            onChange={(val) => handleChangeKnob(val, 'octaves')}
                        />
                    </div>
                    {/* <div>
                        <h4>Base Frequency</h4>
                        <Knob
                            numTicks={20}
                            degrees={180}
                            min={100}
                            max={2000}
                            value={values.baseFrequency}
                            size={30}
                            onChange={(val) => handleChangeKnob(val, 'baseFrequency')}
                        />
                    </div> */}
                </Rack>
            </div>
            
        </>
    )
}

export default Phaser