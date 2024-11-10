"use client";
import React from "react";

const Button = ({
    label,
    onClick,
    style,
    type,
    loadingLabel,
    disabled,
    loading,
    icon,
}) => {
    return (
        <div className="flex">
            <button
                className={`bg-primary rounded-full flex items-center gap-3 text-white py-1 px-4 font-medium hover:scale-105 duration-300 transition-all text-center ${disabled ? "bg-opacity-50 cursor-not-allowed" : ""
                    } ${style}`}
                onClick={onClick}
                disabled={disabled}
                type={type || "button"}
            >
                {loading ? loadingLabel : label}
                {icon}
            </button>
        </div>
    );
};

export default Button;
