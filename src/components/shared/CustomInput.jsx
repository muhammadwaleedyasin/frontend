import React from 'react';

const CustomInput = ({ label, name, isRequired, placeholder, inputStyles, labelStyles, type, value, onBlur, onChange }) => {
    return (
        <>
            {label && <label className={`block text-base p-1 font-medium ${labelStyles}`}>{label}</label>}
            <input
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                type={type}
                placeholder={placeholder}
                required={isRequired}
                className={`w-full p-4 bg-[#C7C7C7] bg-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0890FF] ${inputStyles}`}
            />
        </>
    );
};

export default CustomInput;
