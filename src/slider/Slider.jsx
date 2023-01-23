import React from 'react'
import "./slider.css"

import {BiRightArrow, BiLeftArrow } from "react-icons/bi"
import {FiSettings} from "react-icons/fi"
import { useRef,useState,useEffect } from 'react'



const Slider = (sliderInfo) => {
    const maxSpeed = 3;
    const minSpeed = 0.5;

    const {backgroundImages} = sliderInfo;

    const [backgroundImageUrls, setBackgroundImageUrls] = useState(`
        url(${backgroundImages[0]}), 
        url(${backgroundImages[1]}),
        url(${backgroundImages[backgroundImages.length - 1]})
        `
    )

    const [sliderClass, setSliderClass] = useState("")
    const [optionBoxClass, setOptionBoxClass] = useState("")
    const [optionButtonClass, setOptionButtonClass] = useState("")
    const [sliderIndex, setSliderIndex] = useState(0)
    //Slider Parametres
    const [sliderSpeed, setSliderSpeed] = useState(1.4)
    const [sliderMode, setSliderMode] = useState("sliding")
    

    const [sliderAnimationState, setSliderAnimationState] = useState("stop")
    
    const sliderRef = useRef();

    useEffect( () => {
        sliderRef.current.addEventListener("animationend", () => {

            setBackgroundImageUrls(`
                url(${backgroundImages[sliderIndex]}), 
                url(${backgroundImages[(((sliderIndex + 1) + backgroundImages.length) % backgroundImages.length ) ]}), 
                url(${backgroundImages[(((sliderIndex - 1) + backgroundImages.length) % backgroundImages.length )]})`
            ) 

            setSliderClass("")
            setTimeout(() => {
                setSliderAnimationState("stop")
            }, 300);

        })
    }, [sliderClass, sliderIndex, sliderAnimationState])


  return (
    
    <div style={{backgroundImage : backgroundImageUrls, animationDuration:sliderSpeed+"s"}} ref={sliderRef} className={"slider "+sliderClass}>
        <div className='content'>
            <div className='slider-arrow left-arrow'>
                <BiLeftArrow size={60} onClick={ () => {
                    if(sliderAnimationState !== "stop") return; 
                    setSliderAnimationState("running")
                    setSliderClass( sliderMode + "-to-left");
                    setSliderIndex(((sliderIndex + (-1) + backgroundImages.length) % backgroundImages.length))
                }} />
            </div>
            <h2>  This is a great slider which made by Tsotne Darjania </h2>
            <div className='slider-arrow right-arrow'>
                <BiRightArrow size={60} onClick={ () => { 
                    if(sliderAnimationState !== "stop") return; 
                    setSliderAnimationState("running")
                    setSliderClass(sliderMode + "-to-right");
                    setSliderIndex(((sliderIndex + (+1) + backgroundImages.length) % backgroundImages.length))
                }}/>
            </div> 
            <div className='options'>
                <div className={"option-button " + optionButtonClass}>
                    <FiSettings onMouseDown={ () => {
                        if(optionBoxClass === ""){
                            setOptionBoxClass("show-option-box")
                            setOptionButtonClass("option-button-hover")
                        } else {
                            setOptionBoxClass("")
                            setOptionButtonClass("")
                        }
                        
                    }}
                    style={{cursor:"pointer", transition:"1s" }} />
                </div>
                <div className={"option-box "+optionBoxClass}>
                    <div className='option-item'>
                        <BiLeftArrow onClick={ () => {
                            let newSpeed = (parseFloat(sliderSpeed) - 0.1).toFixed(1);
                            if(newSpeed < minSpeed) return;
                            setSliderSpeed(newSpeed)
                        }} style={{cursor: "pointer"}}/>
                        <p> {"speed "+sliderSpeed +"s"} </p>
                        <BiRightArrow onClick={ () => {
                            let newSpeed = (parseFloat(sliderSpeed) + 0.1).toFixed(1);
                            if(newSpeed > maxSpeed) return;
                            setSliderSpeed(newSpeed)

                        }} style={{ cursor: "pointer"}}/>
                    </div>
                    <div className='option-item'>
                        <BiLeftArrow onClick={ () => {
                            sliderMode === "sliding" ? setSliderMode("transition") : setSliderMode("sliding")
                        } } style={{cursor: "pointer"}}/>
                        <p>  {sliderMode}  </p>
                        <BiRightArrow onClick={ () => {
                            sliderMode === "sliding" ? setSliderMode("transition") : setSliderMode("sliding")
                        }} style={{ cursor: "pointer"}}/>
                    </div>
                </div>
            </div>
        </div>
    </div>

    
  )
}

export default Slider