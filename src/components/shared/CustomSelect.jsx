import React from 'react';
import { SlArrowDown } from 'react-icons/sl';

const CustomSelect = ({ options, selectedValue, onChange, defaultLabel, isOpen, onToggle }) => {

    const handleSelectClick = () => {
        onToggle(); // Trigger the toggle function passed as a prop
    };

    const handleOptionClick = (value, label) => {
        onChange(value); // Pass the value back to the parent component
    };

    return (
        <div className="relative w-full">
            <div
                className="cursor-pointer w-full pr-10 flex items-center justify-between  lg:text-lg py-2 bg-transparent outline-none rounded-md"
                onClick={handleSelectClick}
            >
                {selectedValue ? options.find(option => option.value === selectedValue)?.label : defaultLabel}
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <SlArrowDown className="text-xl" />
                </div>
            </div>
            {isOpen && (
                <ul className="absolute z-10 bg-white h-[250px] overflow-y-auto overflow-x-hidden w-full mt-5 bg-transparent border border-gray-300 rounded-md backdrop-blur-lg">
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className="cursor-pointer px-4 py-2 hover:bg-gray-100 text-black  text-left rounded-md"
                            onClick={() => handleOptionClick(option.value, option.label)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomSelect;
