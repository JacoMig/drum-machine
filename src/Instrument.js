import React, { useEffect, useState, useRef } from 'react'
import Tone from 'tone'
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';
// import {sounds} from './DrumMachine'
import Knob from './Knob'
import styled from 'styled-components'
import Nexus from 'nexusui'


const Instrument = ({buffer, name, setBuffers, toggleInstrument}) => {
    // const volumeRef = createRef()
    const [volumeValue, setVolumeValue] = useState(-2)
    const [mute, setMute] = useState(false)
    let [channel, setChannel] = useState()
    let [Sound, setSound] = useState()
    let [delay, setDelay] = useState(null)
    let [delayWet, setDelayWet] = useState(0)
    
    /* const muteRef = useRef(mute)
    muteRef.current = mute */

    /* const SoundREF = useRef(Sound)
    SoundREF.current = Sound */
    // var feedbackDelay = new Tone.FeedbackDelay("8n", 0.5).toMaster()
    const channelRef = useRef(channel)
    channelRef.current = channel

    const delayRef = useRef(delay)
    delayRef.current = delay;

    /* const delayWetRef = useRef(delayWet)
    delayWetRef.current = delayWet

    const volumeRef = useRef(volumeValue)
    volumeRef.current = volumeValue */

    async function loadingStuff(){
        Nexus._context = Tone.context
        var meter = new Nexus.Meter(`#meter-${name}`)
                
        await setChannel(new Tone.Channel({volume: -2}).toMaster())
        meter.connect(channelRef.current, 2)
        
        setDelay(new Tone.FeedbackDelay({delayTime: "4n", feedback: 0.1, wet: delayWet}).connect(channelRef.current))
        const Buffer = new Tone.Buffer(process.env.PUBLIC_URL + buffer, () => {
            setSound(new Tone.Player(Buffer.get()).connect(delayRef.current).connect(channelRef.current))
        })
        
    }

    useEffect(() => {
        loadingStuff()
       // console.log(Knob.props)
    }, [])

    useEffect(() => {
        setBuffers(buffers => ({
            ...buffers,
            [name]:  Sound
        }));
    }, [Sound])  
    
    useEffect(() => {
        
    })

    /* async function onVolumeChange(val) {
        const value = parseInt(val); 
        await setVolumeValue(value)
        if(!mute){
            channel.volume.value = volumeRef.current 
        }
       
    } */

    useEffect(() => {
        if(channel){
            !mute ? channel.volume.value = volumeValue  : channel.volume.value = -100
        }
    }, [volumeValue])

    useEffect(() => {
        if(channel){
            mute ? channel.volume.value = -100 : channel.volume.value = volumeValue
            channel.mute = mute
        }
    }, [mute])

    useEffect(() => {
        if(delay){
            delay.wet.value = delayWet
        }
    }, [delayWet])

    Knob.defaultProps = {
        size: 150,
        min: 10,
        max: 30,
        numTicks: 0,
        degrees: 270,
        value: 0
    };

    /* async function handleDelayWet (val) {
        await setDelayWet(val/10)
        delay.wet.value = val/10
    } */
    
    return (
        <div className={`${name}`}>
            <p onClick={() => toggleInstrument(name)}>{name}</p>
            <div className="Level-container">
                <RangeSlider 
                    min={-60}
                    max={8}
                    value={volumeValue}
                    tooltip={'off'}
                    onChange={e => setVolumeValue(parseInt(e.target.value))} />  
               <div id={`meter-${name}`}></div>
            </div>
            <button onClick={() => setMute(state => !state)} className={`button-mute ${mute ? 'mute' : ''}`}>Mute</button>
            <Knob
                numTicks={25}
                degrees={180}
                min={1}
                max={100}
                value={0}
                size={30}
                onChange={(val) => setDelayWet(val/10)}
            />
        </div>
    )
}

export default Instrument