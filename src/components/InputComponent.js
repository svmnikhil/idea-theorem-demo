import React, {useState} from "react";

const InputComponent = ({ label, name, type, value, placeholder, onChange, onBlur, error, pattern }) => {

    return (
      <div className="my-3">
        <label className="block text-gray-700 font-semibold mb-2 font-lato" htmlFor={label}>
          {label}
          <span className="text-red-500 font-lato"> *</span>
        </label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          pattern={pattern}
          className={`appearance-none border border-[#A5B6CD] rounded w-full py-2 px-3 text-gray-700 focus:outline-none 
            ${
            error ? 'border-red-500' : ''
            }
            `}
          placeholder={placeholder}
        />
        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>
    );
  };
  
  export default InputComponent;