import React, {useState, useEffect, useRef} from 'react'
import styled from 'styled-components'
import Knob from './Knob'

const FX_Wrapper = styled.div``

const Rack = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
`

const BitCrusher = ({FX, params, setParams}) => {
    const maxVal = 8
    const [name, setName] = useState()
    /* const [values, setValues] = useState({})

    const valuesREF = useRef(values)
    valuesREF.current = values */

    const paramsREF = useRef(params)
    paramsREF.current = params

    const nameREF = useRef(name)
    nameREF.current = name
   
    useEffect(() => {
        setName(Object.keys(FX)[0])
        // setValues({bits: 0})
        if(nameREF.current){
            FX[nameREF.current].bits = maxVal - params.bits;
        }
        
        console.log(params)
    }, [])

    useEffect(() => {
        if(name){
            FX[name].bits = maxVal;
            FX[name].receive(name).toMaster()
        }
    }, [name])
    
    const handleChangeKnob = (val) => {
        //setValues({bits: val})
        setParams({bits: val})
        FX[name].bits = maxVal - paramsREF.current.bits;
    }
    
    return (
        <>
            {/* console.log(values) */}
        
            <FX_Wrapper className="fx-wrapper">
                <span>{name}</span>
                <span onClick={() => null}>X</span>
                <Rack>
                    <div>
                        <h4>Bits</h4>
                        <Knob
                            numTicks={8}
                            degrees={220}
                            min={1}
                            max={8}
                            value={params.bits}
                            size={35}
                            onChange={(val) => handleChangeKnob(val)}
                        />
                    </div>
                </Rack>
            </FX_Wrapper>
        
        </>
    )
}

export default BitCrusher