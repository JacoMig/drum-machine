import React, { useEffect, useState, useRef } from 'react'
import Knob from './Knob'

const FxSend = ({fxName, setFx}) => {
    const minVal = -40;
    const [sendValue, setSendValue] = useState(0)
    const sendValueREF = useRef(sendValue)
    sendValueREF.current = sendValue

    const handleChangeKnob = (val) => {
        setSendValue(state => minVal + val)
        setFx(state => ({ ...state, [fxName]: sendValueREF.current }) )
    }

    useEffect(() => {
        setSendValue(0)
        setFx(state => ({ ...state, [fxName]: minVal + sendValueREF.current }) )
       // console.log(sendValueREF.current)
    }, [])

    
    return (
        <>
            <div>
                <span>{fxName}</span>
                {/* <span onClick={() => removeFx(name)}>X</span> */}
                <Knob
                    numTicks={10}
                    degrees={220}
                    min={0}
                    max={42} 
                    value={sendValue}
                    size={25}
                    onChange={(val) => handleChangeKnob(val)}
                />
            </div>
        </>
    )
}


export default FxSend