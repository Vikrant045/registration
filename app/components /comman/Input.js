"use client";
import Image from "next/image";
import React, { useState } from "react";

const Input = ({
  label,
  value,
  name,
  type = "text",
  placeholder,
  onChange,
  error,
  disabled,
  className = "",
  id,
  options = [],
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full mb-4">
      <label
        className="inline-block mb-1 pl-1 text-gray-300 font-semibold"
        htmlFor={id}
      >
        {label}
      </label>
      {type === "select" ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`px-4 py-2 rounded-lg  h-[50px] bg-gray-600 text-white outline-none focus:bg-gray-500 duration-200 border border-gray-400 w-full ${className}`}
        >
          <option value="" disabled>
            Select an option
          </option>
          {options.map((option, index) => (
            <option key={index} value={option} className="text-black">
              {option}
            </option>
          ))}
        </select>
      ) : (
        <div className="flex items-center border rounded-lg bg-gray-600 w-full h-[50px]">
          {" "}
          {/* Set a fixed height */}
          <input
            type={type === "password" && !showPassword ? "password" : "text"}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            id={id}
            className={`px-4 py-2 h-full w-full bg-transparent text-white outline-none focus:bg-gray-500 duration-200 placeholder:text-gray-400 ${className}`}
            disabled={disabled} 
          />
          {type === "password" && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="flex items-center justify-center h-full p-2 text-gray-300 hover:text-white"
            >
              <Image
                src="/Vector.png"
                alt={showPassword ? "Hide" : "Show"}
                width={20}
                height={20}
              />
            </button>
          )}
        </div>
      )}
      {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
    </div>
  );
};

export default Input;
