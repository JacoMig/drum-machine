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

const Phaser = ({FX, params, setParams}) => {
    const [name, setName] = useState()
   // const [open, setOpen] = useState(false)

    //const [values, setValues] = useState({})

   /*  const valuesREF = useRef(values)
    valuesREF.current = values */
   
    const paramsREF = useRef(params)
    paramsREF.current = params

    useEffect(() => {
        setName(Object.keys(FX)[0])
       // setValues({frequency: 0, octaves: 0})
    }, [])

    useEffect(() => {
        if(name){
            FX[name].receive(name).toMaster()
        }
    }, [name])
    
    const handleChangeKnob = (val, prop) => {
        switch(prop){
            case 'frequency':
                setParams(state => ({...state, [name]: {...state[name], params: {...state[name].params, frequency: val/10} } }))
                FX[name].set('frequency', paramsREF.current.frequency)
            break;
            case 'octaves':
                // setValues(state => ({...state, octaves: val}))
                setParams(state => ({...state, [name]: {...state[name], params: {...state[name].params, octaves: val} } }))
                FX[name].set('octaves', paramsREF.current.octaves)
            break;
        } 
    }
    
    return (
        <>
           {/*  <FX_Button className="fx-button" onClick={() => setOpen(state => !state)}>
                {name}
            </FX_Button> */}
            
            <FX_Wrapper className="fx-wrapper">
                <span>{name}</span>
                <span onClick={() => null}>X</span>
                <Rack>
                    <div>
                        <h4>Frequency</h4>
                        <Knob
                            numTicks={40}
                            degrees={250}
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
                            degrees={180}
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
            </FX_Wrapper>
            
        </>
    )
}

export default Phaser