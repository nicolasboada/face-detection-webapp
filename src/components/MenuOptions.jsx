import { Slider, Switch } from '@mui/material'
import React from 'react'

const MenuOptions = ({scoreThreshold, setScoreThreshold,inputSize,setInputSize, expressionToggle, setExpressionToggle,ageToggle, setAgeToggle, genderToggle,setGenderToggle,saveImage,loading}) => {
  return (
            <div className="right">
                <div className="panelContainer">
                <div className="sliderPanel">
                    <span className="sliderName">Score threshold</span>
                    <span className="sliderElement">
                    <Slider 
                    value={scoreThreshold} aria-label="Default" valueLabelDisplay="auto" 
                    min={0} max={1} step={0.01} onChange={(e) => setScoreThreshold(parseFloat(e.target.value))}
                    />
                    </span>
                </div>
                <div className="sliderPanel">
                    <span className="sliderName">Input size</span>
                    <span className="sliderElement">
                    <Slider 

                    value={inputSize} aria-label="Default" valueLabelDisplay="auto" 
                    min={128} max={640} step={32} onChange={(e)=>setInputSize(parseFloat(e.target.value))}
                    />
                    </span>
                </div>
                <div className="checkboxContainer">
                    <span className="checkboxrName">Expression</span>
                    <span className="checkboxrElement">
                    <Switch defaultChecked checked={expressionToggle} onChange={(e)=>setExpressionToggle(e.target.checked)}/>
                    </span>
                </div>
                <div className="checkboxContainer">
                    <span className="checkboxrName">Age</span>
                    <span className="checkboxrElement">
                    <Switch defaultChecked checked={ageToggle} onChange={(e)=>setAgeToggle(e.target.checked)}/>
                    </span>
                </div>
                <div className="checkboxContainer">
                    <span className="checkboxrName">Gender</span>
                    <span className="checkboxrElement">
                    <Switch defaultChecked checked={genderToggle} onChange={(e)=>setGenderToggle(e.target.checked)}/>
                    </span>
                </div>
                <div className="Buttons">
                    {/* <button className="rightButton">Copy</button> */}
                    <button className="rightButton" onClick={saveImage} disabled={loading}>Save</button>
                </div>
                </div> 
        </div>
  )
}

export default MenuOptions