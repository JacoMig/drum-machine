import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

const Select = styled.select`
    background: white;
    position: relative;
`

const FxSelector = ({setFx, FxTypes}) => {
    
    const [fxLabels, setFxLabels] = useState({})
    
    useEffect(() => {
        setFxLabels(Object.keys(FxTypes).map(name => name))
    }, [])

    const handleChooseFx = (fxName) => {
        if(fxName !== 'none')
            setFx((state) => ({...state, [fxName]: 0 }))
    }

    return (
        <>
            {fxLabels.length > 0 &&
                <Select defaultValue="none" onChange={(e) => handleChooseFx(e.target.value)}>
                    <option value="none">Choose FX</option>
                    {fxLabels.map(fx => <option key={fx} value={fx}>{fx}</option>)}
                </Select>}
        </>
    )
}

export default FxSelector