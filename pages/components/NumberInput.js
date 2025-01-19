import React from "react";
import { Controller } from "react-hook-form";

const NumberInput = ({ name, control, error, placeholder }) => {
  // Ensure control is not null or undefined
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
            type="number"
            step="0.01"
            placeholder={placeholder}
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}
      />
      {error && (
        <p className="text-red-500 text-xs mt-2">{error.message}</p>
      )}
    </div>
  );
};

export default NumberInput;
