import React, { useEffect, useState, useRef } from 'react'
import Tone from 'tone'
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';
// import {sounds} from './DrumMachine'
// import Knob from './Knob'
// import styled from 'styled-components'
import Nexus from 'nexusui'
import FxSelector from './FxSelector'
import FxSend from './FxSend'
import BottomButtons from './BottomButtons'
import {FxTypes} from './utils/effects'
import Knob from './Knob'

const Instrument = ({buffer, name, setBuffers, toggleInstrument, selected}) => {
    const maxVolume = 30
    const [volumeValue, setVolumeValue] = useState(maxVolume/2)
    const [mute, setMute] = useState(false)
    let [channel, setChannel] = useState()
    let [Sound, setSound] = useState()
    
    let [channelSend, setChannelSend] = useState({})
    let [Fx, setFx] = useState({})
    
    const channelRef = useRef(channel)
    channelRef.current = channel

    async function loadingStuff(){
        /* Nexus._context = Tone.context
        var meter = new Nexus.Meter(`#meter-${name}`,{
            size: [130,200]
        })
        meter.colorize("fill","gold")  
        meter.colorize("accent","green")    */
        await setChannel(new Tone.Channel({volume: -2}).toMaster())
        /*  meter.connect(channelRef.current, 2) */
        if(channelRef.current){
            channelRef.current.volume.value = volumeValue * -1
        }
        
        Object.keys(FxTypes).map(FxSend => {
            setFx((state) => ({...state, [FxSend]: 0 }))
            setChannelSend(state => ({...state, [FxSend+name]: channelRef.current.send(FxSend, -Infinity)}))
        })
        const Buffer = new Tone.Buffer(process.env.PUBLIC_URL + buffer, () => {
            setSound(new Tone.Player(Buffer.get()).connect(channelRef.current))
        })
        
    }

    useEffect(() => {
        loadingStuff()
    }, [])

    useEffect(() => {
        setBuffers(buffers => ({
            ...buffers,
            [name]:  Sound
        }));
    }, [Sound])  
    
    /* useEffect(() => {
        
    }) */

    const handleChangeVolume = (val) => {         
        setVolumeValue(val)
       // console.log(val)
    }

    useEffect(() => {
        if(channel){
            !mute ? channel.volume.value = (maxVolume - volumeValue)*-1   : channel.volume.value = -100
        } 
        
    }, [volumeValue])

    useEffect(() => {
        if(channel){
            mute ? channel.mute = mute : channel.volume.value = (maxVolume - volumeValue)*-1
            // channel.mute = mute
            // console.log(mute)
        }
    }, [mute])


    useEffect(() => {
        
        Object.keys(Fx).map(FxSend => {
            if(channelSend[FxSend+name]){
                channelSend[FxSend+name].gain.value = Fx[FxSend]
            }
        })  
        
    }, [Fx]) 

    return (
        <div className={`instrument ${selected ? 'selected' : ''}`}>
            <div className={`${name}`}>
                <p className="name">{name}</p>
                <div className="volume-knob">
                    <Knob
                        numTicks={10}
                        degrees={220}
                        min={0}
                        max={30} 
                        value={volumeValue}
                        size={35}
                        onChange={(val) => handleChangeVolume(val)}
                    />
                </div>
                {/* <RangeSlider 
                        min={-60}
                        max={8}
                        value={volumeValue}
                        tooltip={'off'}
                        onChange={e => setVolumeValue(parseInt(e.target.value))} /> */}  
                {/* <div id={`meter-${name}`}></div> */}

                {/* <FxSelector 
                    FxTypes={FxTypes} 
                    setFx={setFx} /> */}

                {Object.keys(Fx).length > 0 && 
                    <div className="sender">
                        {Object.keys(Fx).map(fxName => 
                            <FxSend 
                                key={fxName}
                                fxName={fxName} 
                                setFx={setFx}
                        /> )}
                    </div>
                }

                <BottomButtons 
                    setMute={setMute} 
                    mute={mute} 
                    selected={selected} 
                    toggleInstrument={() => toggleInstrument(name)} />
            </div>
        </div>
    )
}

export default Instrument