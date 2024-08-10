import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import './sideshow.css'

function SideShow({ whatName, CMP1, CMP2, WhatToShow, SetWhatToShow,SideShowArr }) {
    // for more than two CMP

    if(SideShowArr &&  WhatToShow ){
        let Elm =''
        SideShowArr.forEach(element => {
    //    console.log(element)
           if(element.name === WhatToShow){
               Elm =element.CMP
           }
          })
          console.log(Elm)
        return (
                
                <div className='sideshow' style={{ border: "" }}>
                    <FaTimes onClick={() => {
                        SetWhatToShow("")
                    }} />
                   {Elm}
                </div>
            
        )
    }
    // if onyl two component no need for array fo data just two cmp is enough 
    return (
        WhatToShow && (
            <div className='sideshow' style={{ border: "" }}>
                <FaTimes onClick={() => {
                    SetWhatToShow("")
                }} />
                {WhatToShow === whatName ? CMP1 : CMP2}
            </div>
        )
    );
}

export default SideShow;
