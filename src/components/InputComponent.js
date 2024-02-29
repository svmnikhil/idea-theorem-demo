import React, {useState} from "react";

const InputComponent = ({ label, name, type, value, placeholder, onChange, onBlur, error, pattern }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e) => {
      setIsFocused(true);
      // if (onFocus) { 
      //   onFocus(e);
      // }
  };

  const handleBlur = (e) => {
      setIsFocused(false);
      if (onBlur) onBlur(e);
  };

  const labelClass = isFocused || value
      ? `absolute text-sm ${error ? `text-red-500` : `text-[#A5B6CD]`} transform -translate-y-2.5 scale-75 origin-[0] bg-white px-1`
      : "absolute transform scale-0 -translate-y-2.5 px-1";

  return (
    <div className="my-3 relative">
      <label className="block text-gray-700 font-semibold mb-2 font-lato text-sm" htmlFor={label}>
          {label}
          <span className="text-red-500"> *</span>
      </label>
      <label className={`${labelClass} left-2 transition-all`} htmlFor={name}>
        {label}
        <span className="text-red-500"> *</span>
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        pattern={pattern}
        className={`appearance-none border border-[#A5B6CD] rounded-md w-full py-2 px-3 focus:outline-none 
          ${error ? 'border-red-500' : ''}`}
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default InputComponent;