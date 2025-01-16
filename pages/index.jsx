  "use client"; // This is required for using hooks in a Next.js component

  import client from "../lib/mongodb";
  import React, { useState } from 'react';
  import axios from 'axios';
  import { useForm, Controller } from "react-hook-form";
  import { yupResolver } from "@hookform/resolvers/yup";
  import * as Yup from "yup";
  export async function getServerSideProps() {
    try {
      await client.connect();
      return {
        props: { isConnected: true },
      };
    } catch (e) {
      console.error(e);
      return {
        props: { isConnected: false },
      };
    }
  }

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  A: Yup.number()
    .required("Number A is required")
    .typeError("Number A must be a valid number"),
  B: Yup.number()
    .required("Number B is required")
    .typeError("Number B must be a valid number"),
});

function Home() {
  const { control, handleSubmit, formState: { errors } } = useForm({
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
      const response = await axios.post('/api/addComputation', { A, B });
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
      }, 1000); // Update every second
    } catch (error) {
      console.error("Error during computation:", error);
      setStatus("Error during computation");
      setComputing(false);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="A" className="block text-sm font-medium text-gray-700">Enter number A</label>
          <Controller
            name="A"
            control={control}
            render={({ field }) => (
              <input
                id="A"
                type="number"
                placeholder="Enter number A"
                {...field}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            )}
          />
          {errors.A && <p className="text-red-500 text-xs">{errors.A.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="B" className="block text-sm font-medium text-gray-700">Enter number B</label>
          <Controller
            name="B"
            control={control}
            render={({ field }) => (
              <input
                id="B"
                type="number"
                placeholder="Enter number B"
                {...field}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            )}
          />
          {errors.B && <p className="text-red-500 text-xs">{errors.B.message}</p>}
        </div>

        <button
        disabled={computing}
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Compute
        </button>
        {computing && (
        <div className="mt-4">
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                  Progress
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                  {progress}%
                </span>
              </div>
            </div>

            <div className="flex mb-2 items-center justify-between">
              <div className="w-full bg-gray-200 rounded-full">
                <div
                  className="bg-teal-600 text-xs leading-none py-1 text-center text-teal-100 rounded-full"
                  style={{ width: `${progress}%` }}
                >
                  <span className="text-teal-100 font-semibold inline-block py-1 px-2 uppercase rounded-full">
                    {status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
        <table className="min-w-full table-auto border-collapse">
    <thead>
      <tr>
        <th className="px-4 py-2 text-left border-b text-lg font-semibold text-gray-700">Operation</th>
        <th className="px-4 py-2 text-left border-b text-lg font-semibold text-gray-700">Result</th>
      </tr>
    </thead>
    <tbody>
  {Object.entries(results).map(([operation, result], index) => (
    <tr key={index}>
      <td className="px-4 py-2 border-b text-gray-700">{operation}</td>
      <td className="px-4 py-2 border-b text-gray-900">
        {/* Ensure result is a valid string/number */}
        {typeof result === 'object' ? JSON.stringify(result) : result}
      </td>
    </tr>
  ))}
</tbody>

  </table>
      </form> 
</div>

  );
}

export default Home;
