"use client";

import React, { useState, ChangeEvent } from "react";





interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}




const InputCheckbox = ({ label, checked, onChange }: CheckboxProps) => {
  return (
    <div>
      <label
        htmlFor={`checkbox-${label}`}
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            type="checkbox"
            id={`checkbox-${label}`}
            className="sr-only"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
          />
          <div
            className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
              checked && "border-primary bg-gray dark:bg-transparent"
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-sm ${checked && "bg-primary"}`}
            ></span>
          </div>
        </div>
        {label}
      </label>
    </div>
  );
};

export default InputCheckbox;