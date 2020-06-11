import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

// https://www.w3schools.com/howto/howto_js_draggable.asp
// https://www.kirupa.com/html5/drag.htm

const DraggableEl = styled.div`
    position: absolute;
    width: 
`


const Draggable = ({children}) => {
    
    useEffect(() => {

    }, [])

    return (
        <div className="draggable-el">{children}</div>
    )
}


export default Draggable