import React from 'react'
import Lottie from "react-lottie"
import animationData from "@/assets/lottie-json.json";

const EmptyChatContainer = () => {

    const animationDefaultOptions = {
        loop:true,
        autoplay: true,
        animationData,
    };

  return (
    <div className='flex-1 bg-[#1c1d25] flex-col justify-center items-center hidden duration-1000 transition-all border-r-2 border-[#af303b]'>
        <Lottie isClickToPauseDisabled={true} height={200} width={200} options={animationDefaultOptions} />
        <div className='text-opacity-80 text-white flex flex-col gap-5 items-center mt-10 text-3xl transition-all duration-300 text-center'>
            <h3>
                Welcome to <span className='text-purple-500'>Skorall</span> Chat App.
            </h3>
        </div>
    </div>
  )
}

export default EmptyChatContainer