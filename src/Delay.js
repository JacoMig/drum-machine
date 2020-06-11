import React, {useState, useEffect, useRef} from 'react'
import styled from 'styled-components'
import Knob from './Knob'
import {round} from './utils/util'


const FX_Wrapper = styled.div``

const Rack = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
`

const Delay = ({FX, params, setParams}) => {
    const [name, setName] = useState(Object.keys(FX)[0])
   
    const paramsREF = useRef(params)
    paramsREF.current = params
   
    useEffect(() => {
        if(name){
            FX[name].feedback.value = params.feedback;
            FX[name].delayTime.value = params.delayTime;
            FX[name].receive(name).toMaster()
            console.log('Delay', name)
        } 
        console.log(name, 'mount')
        console.log(name+' params', params)
        return (() => {
            console.log(name, 'unmount')
        })
    }, [])

    /* useEffect(() => {
        if(name){
            if(FX[name].delayTime)
                FX[name].delayTime.value = 1 
         
            
        }
    }, [name]) */
    
    const handleChangeKnob = (val, prop) => {
        
        switch(prop){
            case 'feedback':
               
                // setParams(state => ({...state, [name]: {...state[name], params: {...state[name].params, feedback: val/10} } }))
                setParams(state => ( { ...state, [name]: { ...state[name], [prop]: val/10} } )) 
                FX[name].feedback.value = paramsREF.current[prop];
            break;
            case 'delayTime':
               
                // setParams(state => ({...state, [name]: {...state[name], params: {...state[name].params, delayTime: val/10.5} } }))
                setParams(state => ( { ...state, [name]: { ...state[name], [prop]: round(val/10.5, 2)} } )) 
                FX[name].delayTime.value = 1 - paramsREF.current[prop];
            break;
        } 
        
    }
    
    return (
        <>
            <FX_Wrapper className="fx-wrapper">
                <span>{name}</span>
                <span onClick={() =>null}>X</span>
                <Rack>
                    <div>
                        <h4>Feedback</h4>
                        <Knob
                            numTicks={8}
                            degrees={220}
                            min={0}
                            max={10}
                            value={params.feedback*10}
                            size={35}
                            onChange={(val) => handleChangeKnob(val, 'feedback')}
                        />
                    </div>
                    <div>
                        <h4>Delay Time</h4>
                        <Knob
                            numTicks={8}
                            degrees={220}
                            min={0}
                            max={10}
                            value={params.delayTime*10.5}
                            size={35}
                            onChange={(val) => handleChangeKnob(val, 'delayTime')}
                        />
                    </div>
                </Rack>
                
            </FX_Wrapper>
        </>
    )
}

export default Delay