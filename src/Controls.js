import React, {useEffect, useState} from 'react'


const Controls = (props) => {
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
                props.setPlayStop()
            }
        })
        
        return () => {
            window.removeEventListener('keydown', (e) => {
                if(e.code === 'Space'){
                    props.setPlayStop()
                }
            })
        }
    }, [])

    /* useEffect(() => {
        console.log(props.playStop)
       
    }, [props.playStop])  */

    return (
        <button onClick={props.setPlayStop}>{props.playStop ? 'Stop' : 'Play'}</button>
    )
}

export default Controls