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


const Instrument = ({buffer, name, setBuffers, toggleInstrument, selected}) => {
    // const volumeRef = createRef()
    const [volumeValue, setVolumeValue] = useState(-2)
    const [mute, setMute] = useState(false)
    let [channel, setChannel] = useState()
    let [Sound, setSound] = useState()
    
    let [channelSend, setChannelSend] = useState({})
    /* let [delay, setDelay] = useState(null)
    let [delayWet, setDelayWet] = useState(0) */
    
    let [Fx, setFx] = useState({})
    
    const channelRef = useRef(channel)
    channelRef.current = channel

    /* const FxREF = useRef(Fx)
    FxREF.current = Fx */
    /* const delayRef = useRef(delay)
    delayRef.current = delay; */

    async function loadingStuff(){
        Nexus._context = Tone.context
        var meter = new Nexus.Meter(`#meter-${name}`,{
            size: [130,200]
        })
        meter.colorize("fill","gold")  
        meter.colorize("accent","green")   
        await setChannel(new Tone.Channel({volume: -2}).toMaster())
        meter.connect(channelRef.current, 2)

        Object.keys(FxTypes).map(FxSend => {
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
    
    useEffect(() => {
        
    })

    useEffect(() => {
        if(channel){
            !mute ? channel.volume.value = volumeValue  : channel.volume.value = -100
        }
    }, [volumeValue])

    useEffect(() => {
        if(channel){
            mute ? channel.mute = mute : channel.volume.value = volumeValue
            // channel.mute = mute
            // console.log(mute)
        }
    }, [mute])


    useEffect(() => {
        Object.keys(Fx).map(FxSend => {
            channelSend[FxSend+name].gain.value = Fx[FxSend]
            console.log(channelSend[FxSend+name].gain.value)
        })  
    }, [Fx]) 

   /* const removeFx = (name) => {
        Object.keys(Fx).map(name => {
            Sound.disconnect(Fx[name])
            Fx[name].disconnect(channel)
            channel.volume.value =  volumeValue+4
        })
        setFx(state => {
            const newFx = state
            delete newFx[name]
            return {...newFx}
        }) 
   }  */

    return (
        <div className={`instrument ${selected ? 'selected' : ''}`}>
            <div className={`${name}`}>
                <p className="name">{name}</p>
                <RangeSlider 
                        min={-60}
                        max={8}
                        value={volumeValue}
                        tooltip={'off'}
                        onChange={e => setVolumeValue(parseInt(e.target.value))} />  
                <div id={`meter-${name}`}></div>
                <FxSelector 
                    FxTypes={FxTypes} 
                    setFx={setFx} />
                {Object.keys(Fx).length > 0 && 
                    <div className="sender">
                        {Object.keys(Fx).map(fxName => 
                            <FxSend 
                                key={fxName}
                                fxName={fxName} 
                                setFx={setFx}
                                // removeFx={(name) => removeFx(name)} 
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