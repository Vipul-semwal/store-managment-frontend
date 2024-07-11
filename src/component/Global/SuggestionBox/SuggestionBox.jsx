import React from 'react'
import './Suggestion.css'

function SuggestionBox({ Result, title }) {
    return (
        <div className="suggestion-card" >
            <div className="tools">
                <div className="circle">
                    <span className="red box"></span>
                </div>
                <div className="circle">
                    <span class="yellow box"></span>
                </div>
                <div className="circle">
                    <span class="green box"></span>
                </div>
            </div>
            <div className="card__content">
                <h5 className='mt-3'>{title}</h5>
                <ul>
                    {Result.map((i, index) => {
                        return (
                            <li key={index}>{i}</li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default SuggestionBox
