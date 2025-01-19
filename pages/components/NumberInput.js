import React from "react";
import { Controller } from "react-hook-form";

const NumberInput = ({ name, control, error, placeholder }) => {
  if (!control) {
    return <p>Loading input...</p>;
  }

  return (
    <div className="flex-1">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type="text"
            inputMode="decimal"
            placeholder={placeholder}
            className={`w-full p-2 border rounded-md outline-none 
            ${error ? "border-red-500" : "border-gray-300"}
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
          />
        )}
      />
      {error && <p className="text-red-500 text-xs mt-2">{error.message}</p>}
    </div>
  );
};

export default NumberInput;
