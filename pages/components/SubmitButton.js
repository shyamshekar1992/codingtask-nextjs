import React from "react";

const SubmitButton = ({ computing }) => (
  <div>
    <button
      disabled={computing}
      type="submit"
      className={`w-full py-2 px-4 text-white font-semibold rounded-md focus:outline-none focus:ring-2 ${
        computing
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-500 hover:bg-blue-600"
      }`}
    >
      {computing ? "Computing..." : "Compute"}
    </button>
  </div>
);

export default SubmitButton;
