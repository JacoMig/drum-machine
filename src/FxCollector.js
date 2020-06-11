import React, {useEffect, useState, useRef} from 'react'
/* import styled from 'styled-components'
import Tone from 'tone'
import FX from './FX' */
import {FxTypes} from './utils/effects'
import Delay from './Delay'
import Phaser from './Phaser'
import BitCrusher from './BitCrusher'


const FxCollector = () => {
    const [fx, setFx] = useState({})
    const [params, setParams] = useState({})
    const [open, setOpen] = useState(false)
    
    useEffect(() => {
        setFx(FxTypes)
        setParams(() => {
            let paramsObj = {}
            Object.keys(FxTypes).map(name => {
                // FxTypes[name].tone.receive(name).toMaster()
                paramsObj = {...paramsObj, [name]: {...FxTypes[name].params} }
            })
            return paramsObj
        }) 
    }, [])

    /* useEffect(() => {
        if(Object.keys(fx).length > 0){
            Object.keys(fx).map()
        }
    }, [fx]) */

    useEffect(() => {
       console.log(params)
    }, [params])

    return (
        <>
            <div className="fx-button" onClick={() => setOpen(state => !state)}>
                Effects
            </div>
            {open && Object.keys(fx).length > 0 &&
                <div className="fx-collector-window">
                    {Object.keys(fx).map(name => 
                        {   
                            if(name === 'delay'){
                                return <Delay key={name} setParams={setParams} params={{...params[name]}} FX={{[name]: fx[name].tone}} >{name}</Delay>
                            }else if(name === 'phaser') {
                                return <Phaser key={name} setParams={setParams} params={{...params[name]}} FX={{[name]: fx[name].tone}} >{name}</Phaser>
                            } if(name === 'bitCrusher'){
                                return <BitCrusher key={name} setParams={setParams} params={{...params[name]}} FX={{[name]: fx[name].tone} } >{name}</BitCrusher>
                            }
                        }
                    )}
                </div>
            }
        </>
    )
}


export default FxCollector