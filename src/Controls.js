import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import 'font-awesome/css/font-awesome.min.css'
import Knob from './Knob'


const Bpm = styled.input`
  font-size: 25px;
  text-align: left;
  color: black;
  padding: 5px;
  max-width: 60px;
`; 

const Controls = ({playStop, setPlayStop, setBpm, bpm, volume, setVolume, minVolume}) => {
    

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
            <div className="volume-controller">
                <label>Volume</label>
                <Knob
                    numTicks={10}
                    degrees={220}
                    min={0}
                    max={64} 
                    value={volume}
                    size={35}
                    onChange={(val) => setVolume(minVolume + val)}
                />
            </div>
            <div className="bpm-controller">               
                <label>Bpm</label>
                <Bpm 
                    type="number" 
                    value={bpm} 
                    min={50} 
                    max={220} 
                    name="bpm" 
                    onChange={(e) => e.target.value <= 220 ? setBpm(e.target.value) : null } />
            </div>
        </div>
    )
}

export default Controls