import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import 'font-awesome/css/font-awesome.min.css'

const Bpm = styled.input`
  font-size: 25px;
  text-align: left;
  color: black;
  padding: 5px;
  max-width: 60px;
`; 

const Controls = ({playStop, setPlayStop, setBpm, bpm}) => {
    // const [buttonText, setButtonText] = useState(false)
    
   /* const onToggleButton = () => {
        props.setPlayStop(!props.playStop)
         setButtonText(state => state === !state)
        props.playStop(buttonText)
        console.log(buttonText) 
    }*/

    useEffect(() => {
        window.addEventListener('keydown', (e) => {
            if(e.code === 'Space'){
                setPlayStop()
            }
        })
        
        return () => {
            window.removeEventListener('keydown', (e) => {
                if(e.code === 'Space'){
                    setPlayStop()
                }
            })
        }
    }, [])

    /* useEffect(() => {
        console.log(props.playStop)
       
    }, [props.playStop])  */

    return (
        <div className="controls">
            <button onClick={setPlayStop}>
                {playStop ? <i className="fa fa-pause-circle-o"></i> : <i className="fa fa-play-circle-o"></i>}</button>
            <label>Bpm</label>
            <Bpm type="number" value={bpm} min={50} max={220} name="bpm" onChange={(e) => setBpm(e.target.value)} />
        </div>
    )
}

export default Controls