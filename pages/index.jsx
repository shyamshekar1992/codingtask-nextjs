"use client"; // This is required for using hooks in a Next.js component
console.log(
  "MONGODB_URI from environment:",
  process.env.NEXT_URI
);

import React, { useState } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  A: Yup.number()
    .required("Number A is required")
    .typeError("Number A must be a valid number")
    .test(
      "is-decimal",
      "Number A must be a valid decimal number",
      (value) => !isNaN(value) // Checks if the value is a valid number
    ),
  B: Yup.number()
    .required("Number B is required")
    .typeError("Number B must be a valid number")
    .test(
      "is-decimal",
      "Number B must be a valid decimal number",
      (value) => !isNaN(value)
    ),
});


function Home() {
  const { data: session } = useSession(); // Fetch session data

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [results, setResults] = useState({
    add: "Computing...",
    subtract: "Computing...",
    multiply: "Computing...",
    divide: "Computing...",
  });

  const [computing, setComputing] = useState(false);
  const [status, setStatus] = useState("Idle");
  const [progress, setProgress] = useState(0);

  // Handle form submission
  const onSubmit = async (data) => {
    const { A, B } = data;

    setComputing(true);
    setStatus("Computing...");
    setResults({
      add: "Computing...",
      subtract: "Computing...",
      multiply: "Computing...",
      divide: "Computing...",
    });

    try {
      // Send request to the backend
      const response = await axios.post("/api/addComputation", { A, B });
      const computationResults = response.data.results;

      let currentProgress = 0;
      let currentJob = 0;

      // Update progress and results sequentially
      const progressInterval = setInterval(() => {
        if (currentProgress < 4) {
          const operation = Object.keys(computationResults)[currentProgress];
          setResults((prevResults) => ({
            ...prevResults,
            [operation]: computationResults[operation],
          }));

          currentProgress++;
          currentJob++;

          setProgress((currentProgress / 4) * 100);
          setStatus(`Computing... ${currentJob} out of 4 jobs finished`);
        } else {
          clearInterval(progressInterval);
          setComputing(false);
          setStatus("Computation finished!");
        }
      }, 3000); // three second delay
    } catch (error) {
      console.error("Error during computation:", error);
      setStatus("Error during computation");
      setComputing(false);
    }
  };

  return (
    <>
     <div className="flex items-center justify-center">
      <div className="max-w-m w-full p-6 bg-white rounded-xl shadow-md">
        {/* Welcome Message and Conditional Buttons */}
        <div className="mb-4 text-center">
          {session ? (
            // If user is logged in
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                Welcome, {session.user.name}!
              </h1>
              <img
                src={session.user.image}
                alt="User Avatar"
                className="w-16 h-16 rounded-full mx-auto mt-2"
              />
              <button
                onClick={() => signOut({ callbackUrl: "https://main.d3sojnxjwm1p4o.amplifyapp.com/" })}
                className="mt-4 py-2 px-4 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Logout
              </button>
            </div>
          ) : (
            // If user is not logged in
            <div>
              <h1 className="text-xl font-bold text-gray-800">Welcome, Guest!</h1>
              <button
                onClick={() => signIn("github", { callbackUrl: "https://main.d3sojnxjwm1p4o.amplifyapp.com/api/auth/callback/github/" })}
                className="mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Sign In with GitHub
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-xl w-full p-6 bg-white rounded-xl shadow-md">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex space-x-4">
              {/* Input for Number A */}
              <div className="flex-1">
                <Controller
                  name="A"
                  control={control}
                  render={({ field }) => (
                    <input
                      id="A"
                      type="number"
                      step="0.01" // Restrict to two decimal places
                      placeholder="Enter number A"
                      {...field}
                      className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                />
                {errors.A && (
                  <p className="text-red-500 text-xs mt-2">
                    {errors.A.message}
                  </p>
                )}
              </div>

              {/* Input for Number B */}
              <div className="flex-1">
                <Controller
                  name="B"
                  control={control}
                  render={({ field }) => (
                    <input
                      id="B"
                      step="0.01" // Restrict to two decimal places
                      type="number"
                      placeholder="Enter number B"
                      {...field}
                      className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                />
                {errors.B && (
                  <p className="text-red-500 text-xs mt-2">
                    {errors.B.message}
                  </p>
                )}
              </div>

              {/* Compute Button */}
              <div className="mt-2">
                <button
                  disabled={computing}
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Compute
                </button>
              </div>
            </div>

            {computing && (
              <div className="mt-6">
                <div className="text-center mb-2">
                  <span className="text-lg font-semibold text-teal-600">
                    {status}
                  </span>
                </div>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div className="w-full bg-gray-200 rounded-full">
                      <div
                        className="bg-teal-600 text-xs leading-none py-1 text-center text-teal-100 rounded-full"
                        style={{ width: `${progress}%` }} // This controls the width of the progress bar
                      >
                        <span className="text-teal-100 font-semibold inline-block py-1 px-2 uppercase rounded-full">
                          {progress}%{" "}
                          {/* Display percentage inside the loading bar */}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-2 space-y-2">
              {Object.entries(results).map(([operation, result], index) => (
                <div key={index} className="flex justify-between items-center">
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
                  <span className="text-lg font-semibold text-gray-900">
                    {result}
                  </span>
                </div>
              ))}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Home;
