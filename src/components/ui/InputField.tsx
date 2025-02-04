"use client";

import React, { useState, ChangeEvent } from "react";



interface InputFieldProps {
  label: string;
  type: string;
  placeholder: string;
  multiple?: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}


const InputField = ({
  label,
  type,
  placeholder,
  multiple,
  value,
  onChange,
  required = true,
}: InputFieldProps) => {
  return (
    <div>
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        {label}
      </label>
      <input
        required={required}
        type={type}
        placeholder={placeholder}
        multiple={multiple}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
    </div>
  );
};

export default InputField;