import '../App.css';
import React from "react";
let Logo = require('../it-logo.png');


export default function Banner() {

    return (
        <div className="h-10 bg-[#252F3D]">
            <div className='flex justify-start items-center h-full'>
                <img src={Logo} alt="Idea Theorem Logo" className='logo h-[15px] ml-4 md:h-[28px] md:ml-40 '/>
            </div>
        </div>
    )
}