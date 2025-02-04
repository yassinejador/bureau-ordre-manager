"use client";

import React, { useState, ChangeEvent } from "react";



interface RadioProps {
  label: string;
  value: string;
  name: string;
  checked: boolean;
  onChange: (value: string) => void;
}

const InputRadio = ({ label, value, name, checked, onChange }: RadioProps) => {
  return (
    <div>
      <label
        htmlFor={`radio-${value}`}
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            type="radio"
            id={`radio-${value}`}
            name={name}
            value={value}
            checked={checked}
            onChange={(e) => onChange(e.target.value)}
            className="sr-only"
          />
          <div
            className={`mr-4 flex h-5 w-5 items-center justify-center rounded-full border ${
              checked && "border-primary"
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-full bg-transparent ${
                checked && "!bg-primary"
              }`}
            >
              {" "}
            </span>
          </div>
        </div>
        {label}
      </label>
    </div>
  );
};

export default InputRadio;