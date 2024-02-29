import React from "react";


const SubmitComponent = ({submit, cancel, className}) => {

    return (
        <div className={`flex flex-col md:flex-row justify-center items-center pt-4 md:mt-4 border-t
        md:relative left-0 right-0 bg-white md:bg-transparent md:border-t-0`}>
            <button 
                className="py-2 text-sm md:text-md w-10/12 md:w-36 md:mr-2 border border-[#127C95] rounded-md text-[#127C95] font-semibold font-lato" 
                type="button" 
                onClick={cancel}>
                    Cancel
                </button>
            <button 
                className="py-2 text-sm md:text-md w-10/12 md:w-36 my-2 bg-[#127C95] text-white rounded-md font-semibold font-lato" 
                type="submit" 
                onClick={submit}>
                    Submit
            </button>
        </div>
    )
}

export default SubmitComponent;