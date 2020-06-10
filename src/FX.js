import React, {useState, useEffect, useRef} from 'react'
import styled from 'styled-components'
import Knob from './Knob'

const FX_Button = styled.div`
    border-radius: 5px;
    border: 2px solid white;
    background: blue;
    color: white;
`
const FX_Wrapper = styled.div`
    border-radius: 5px;
    border: 2px solid white;
    background: #888;
    color: white;
`

const Rack = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
`

const FX = ({FX}) => {
    const [name, setName] = useState()
    const [open, setOpen] = useState(false)

    const [values, setValues] = useState({})

    const valuesREF = useRef(values)
    valuesREF.current = values
    /*  const openFx = (name) => {

    } */

    useEffect(() => {
        setName(Object.keys(FX)[0])
        setValues({feedback: -0.1, delayTime: -0.1})
        
        Knob.defaultProps = {
            size: 150,
            min: 10,
            max: 30,
            numTicks: 0,
            degrees: 270,
            value: 0
        };
    }, [])

    useEffect(() => {
        if(name){
            if(FX[name].delayTime)
                FX[name].delayTime.value = 1 
            FX[name].receive(name).toMaster()
        }
    }, [name])
    
    const handleChangeKnob = (val, prop) => {
        
        switch(prop){
            case 'feedback':
                setValues(state => ({...state, feedback: val/10}))
                FX[name].feedback.value = valuesREF.current.feedback;
            break;
            case 'delayTime':
                setValues(state => ({...state, delayTime: val/10.5}))
                FX[name].delayTime.value = 1 - valuesREF.current.delayTime
            break;
        } 
        
    }
    
    return (
        <>
            <FX_Button className="" onClick={() => setOpen(state => !state)}>
                {name}
            </FX_Button>
            {open && name === 'delay' &&
                <FX_Wrapper>
                    <span>{name}</span>
                    <span onClick={() => setOpen(false)}>X</span>
                    <Rack>
                        <div>
                            <h4>Feedback</h4>
                            <Knob
                                key={name}
                                numTicks={10}
                                degrees={180}
                                min={0}
                                max={10}
                                value={values.feedback}
                                size={30}
                                onChange={(val) => handleChangeKnob(val, 'feedback')}
                            />
                        </div>
                        <div>
                            <h4>Delay Time</h4>
                            <Knob
                                key={name}
                                numTicks={10}
                                degrees={180}
                                min={0}
                                max={10}
                                value={values.delayTime}
                                size={30}
                                onChange={(val) => handleChangeKnob(val, 'delayTime')}
                            />
                        </div>
                    </Rack>
                   
                </FX_Wrapper>
            }
        </>
    )
}

export default FX