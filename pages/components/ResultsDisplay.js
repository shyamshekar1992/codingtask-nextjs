import React from "react";

const ResultsDisplay = ({ results }) => {
  if (!results || typeof results !== "object" || Object.keys(results).length === 0) {
    return <p className="text-gray-500">No results available</p>;
  }

  return (
    <div className="mt-1 space-y-2">
      {Object.entries(results).map(([operation, result], index) => (
        <div
          key={index}
          className="flex justify-between items-center space-x-2"
        >
          <span className="text-lg font-medium text-gray-700">
            {operation === "add"
              ? "A + B"
              : operation === "subtract"
              ? "A - B"
              : operation === "multiply"
              ? "A * B"
              : operation === "divide"
              ? "A / B"
              : operation}
          </span>
          <span className="text-lg font-semibold text-gray-900">{result}</span>
        </div>
      ))}
    </div>
  );
};

export default ResultsDisplay;
