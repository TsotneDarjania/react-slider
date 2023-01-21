import React from 'react'
import "./slider.css"

import {BiRightArrow, BiLeftArrow } from "react-icons/bi"
import { useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'



const Slider = (sliderInfo) => {

    const {backgroundImages} = sliderInfo;

    const [backgroundImageUrls, setBackgroundImageUrls] = useState(`
        url(${backgroundImages[0]}), 
        url(${backgroundImages[1]}), 
        url(${backgroundImages[2]})
        `
    )

    const [sliderClass, setSliderClass] = useState("")
    const [sliderIndex, setSliderIndex] = useState(0)
    const sliderRef = useRef();

    useEffect( () => {
        sliderRef.current.addEventListener("animationend", () => {
 
            if(sliderClass === "to-right"){
                setBackgroundImageUrls(`
                    url(${backgroundImages[sliderIndex]}), 
                    url(${backgroundImages[(((sliderIndex + 1) + backgroundImages.length) % backgroundImages.length )]}), 
                    url(${backgroundImages[(((sliderIndex + 2) + backgroundImages.length) % backgroundImages.length )]})`
                ) 
            } else if(sliderClass === "to-left"){
                setBackgroundImageUrls(`
                    url(${backgroundImages[sliderIndex]}), 
                    url(${backgroundImages[(((sliderIndex + 1) + backgroundImages.length) % backgroundImages.length )]}), 
                    url(${backgroundImages[(((sliderIndex + 2) + backgroundImages.length) % backgroundImages.length )]})`
                )   
            }

            setSliderClass("")

        })
    }, [sliderClass, sliderIndex])


  return (
    
    <div style={{backgroundImage : backgroundImageUrls}} ref={sliderRef} className={"slider "+sliderClass}>
        <div className='slider-buttons'>
            <div className='slider-arrow'>
                <BiLeftArrow size={40} onClick={ () => {
                    setSliderClass("to-left");
                    setSliderIndex(((sliderIndex + (-1) + backgroundImages.length) % backgroundImages.length))
                }} />
            </div>
            <div className='slider-arrow'>
                <BiRightArrow size={40} onClick={ () => { 
                    setSliderClass("to-right");
                    setSliderIndex(((sliderIndex + (+1) + backgroundImages.length) % backgroundImages.length))
                 }}/>
            </div> 
        </div>
    </div>

    
  )
}

export default Slider