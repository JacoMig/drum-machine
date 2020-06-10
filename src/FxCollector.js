import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import Tone from 'tone'
import FX from './FX'
import {FxTypes} from './utils/effects'
import Delay from './Delay'
import Phaser from './Phaser'
import BitCrusher from './BitCrusher'

const FxWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const FxCollector = () => {
    const [fx, setFx] = useState({})

    useEffect(() => {
        setFx(FxTypes)
    }, [])

    return (
        <>
            {Object.keys(fx).length > 0 &&
                <FxWrapper>
                    {Object.keys(fx).map(name => 
                        {
                        if(name === 'delay'){
                            return <Delay key={name} FX={{[name]: fx[name]}} >{name}</Delay>
                        }else if(name === 'phaser') {
                            return <Phaser key={name} FX={{[name]: fx[name]}} >{name}</Phaser>
                        }else if(name === 'bitCrusher'){
                            return <BitCrusher key={name} FX={{[name]: fx[name]}} >{name}</BitCrusher>
                        }
                        
                        
                    }
                    )}
                </FxWrapper>
            }
        </>
    )
}


export default FxCollector