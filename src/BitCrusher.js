import React, {useState, useEffect, useRef} from 'react'
import styled from 'styled-components'
import Knob from './Knob'

const FX_Button = styled.div``
const FX_Wrapper = styled.div``

const Rack = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
`

const BitCrusher = ({FX}) => {
    const [name, setName] = useState()
    const [open, setOpen] = useState(false)

    const [values, setValues] = useState({})

    const valuesREF = useRef(values)
    valuesREF.current = values
   

    useEffect(() => {
        setName(Object.keys(FX)[0])
        setValues({bits: 0})
        
       
    }, [])

    useEffect(() => {
        if(name){
            FX[name].receive(name).toMaster()
        }
    }, [name])
    
    const handleChangeKnob = (val) => {
        setValues(state => ({bits: val}))
        FX[name].bits = valuesREF.current.bits;
        
    }
    
    return (
        <>
            <FX_Button className="fx-button" onClick={() => setOpen(state => !state)}>
                {name}
            </FX_Button>
            {open &&
                <FX_Wrapper className="fx-wrapper">
                    <span>{name}</span>
                    <span onClick={() => setOpen(false)}>X</span>
                    <Rack>
                        <div>
                            <h4>Bits</h4>
                            <Knob
                                numTicks={8}
                                degrees={180}
                                min={0}
                                max={8}
                                value={values.bits}
                                size={30}
                                onChange={(val) => handleChangeKnob(val)}
                            />
                        </div>
                       
                    </Rack>
                   
                </FX_Wrapper>
            }
        </>
    )
}

export default BitCrusher