import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

const Buttons = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    justify-content: space-around;
`

const BottomButtons = ({mute, setMute, selected, toggleInstrument}) => {
    return (
        <Buttons>
            <button onClick={() => setMute(state => !state)} className={`button-mute ${mute ? 'mute' : ''}`}>M</button>
            <button onClick={toggleInstrument} className="select-button"></button>
        </Buttons>
    )
}

export default BottomButtons