import React, { ChangeEvent } from 'react';

type InputProps = {
    placeholder: string;
    value: string;
    type: string;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    autoComplete?: string;
};

const Input: React.FC<InputProps> = ({ placeholder, value, type, handleChange, disabled, autoComplete }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            autoComplete={autoComplete}
            disabled={disabled}
            className="w-full pb-1 my-2 text-white focus:text-orange-300 font-semibold text-lg text-center bg-transparent border-b-slate-400 border-b-2 outline-none focus:border-b-orange-400"
        />
    );
};

export default Input;
