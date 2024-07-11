import React from 'react';
import { FaTimes } from 'react-icons/fa';

function SideShow({ whatName, CMP1, CMP2, WhatToShow, SetWhatToShow }) {
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
