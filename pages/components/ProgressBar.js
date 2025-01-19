import React from "react";

const ProgressBar = ({ progress, status }) => (
  <div className="mt-6">
    <div className="text-center mb-2">
      <span className="text-lg font-semibold text-teal-600">{status}</span>
    </div>
    <div className="relative pt-1">
      <div className="w-full bg-gray-200 rounded-full">
        <div
          className="bg-teal-600 text-xs leading-none py-1 text-center text-teal-100 rounded-full"
          style={{ width: `${progress}%` }}
        >
          <span className="text-teal-100 font-semibold inline-block py-1 px-2 uppercase rounded-full">
            {progress}%
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default ProgressBar;
