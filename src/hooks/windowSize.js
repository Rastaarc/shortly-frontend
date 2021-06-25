import {useEffect, useState} from 'react'
import { SCREEN_TYPES } from '../utilities/constants'

export const useWindowSize = ()=>{
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)

    useEffect(()=>{
        const setSize = ()=>{
            setWidth(window.innerWidth)
            setHeight(window.innerHeight)
        }
        window.addEventListener('resize', setSize)
        return ()=> window.removeEventListener('resize', setSize)
    },[])


    return [width, height]
}

export const useScreenType = () =>{
    const [w] = useWindowSize()
    const [widthType, setWidthType] = useState('')
    useEffect(()=>{
        if(w >= 0 && w <=320){
            setWidthType(SCREEN_TYPES.MOBILE_SMALL)
        }else if(w > 320 && w <= 375){
            setWidthType(SCREEN_TYPES.MOBILE_MEDIUM)
        }else if(w > 375 && w <= 425){
            setWidthType(SCREEN_TYPES.MOBILE_LARGE)
        }else if(w > 425 && w <= 768){
            setWidthType(SCREEN_TYPES.TABLET)
        }else if(w > 768 && w <= 1024){
            setWidthType(SCREEN_TYPES.LAPTOP)
        }else{
            setWidthType(SCREEN_TYPES.LARGE_LAPTOP)
        }
    },[w])

    return widthType
}