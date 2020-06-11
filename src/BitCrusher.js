import React, {useState, useEffect, useRef} from 'react'
import styled from 'styled-components'
import Knob from './Knob'



const Rack = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
`

const BitCrusher = ({FX, params, setParams}) => {
    const maxVal = 8
    const [name, setName] = useState(Object.keys(FX)[0])
    
    const paramsREF = useRef(params)
    paramsREF.current = params

    useEffect(() => {
        if(name){
            FX[name].bits = maxVal - params.bits;
            FX[name].receive(name).toMaster()
        } 
        console.log(name, 'mount')
        console.log(name+' params', params)
        return (() => {
            console.log(name, 'unmount')
        })
        
    }, [])

   
    
    const handleChangeKnob = (val) => {
        setParams(state => ( { ...state, [name]: {bits: val} } ))
        // console.log(paramsREF.current)
        FX[name].bits = maxVal - paramsREF.current.bits;
    }
    
    return (
        <>
            {/* console.log(values) */}
        
            <div className="fx-wrapper">
                <span>{name}</span>
                <span onClick={() => null}>X</span>
                <Rack>
                    <div>
                        <h4>Bits</h4>
                        <Knob
                            numTicks={8}
                            degrees={220}
                            min={0}
                            max={8}
                            value={params.bits}
                            size={35}
                            onChange={(val) => handleChangeKnob(val)}
                        />
                    </div>
                </Rack>
            </div>
        
        </>
    )
}

export default BitCrusher