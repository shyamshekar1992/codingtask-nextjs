"use client";

import React, { useState } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import AuthButtons from "./components/AuthButtons";
import NumberInput from "./components/NumberInput";
import ProgressBar from "./components/ProgressBar";
import ResultsDisplay from "./components/ResultsDisplay";
import SubmitButton from "./components/SubmitButton";
// Validation schema
const validationSchema = Yup.object().shape({
  A: Yup.number().required("Number A is required").typeError("Invalid number"),
  B: Yup.number().required("Number B is required").typeError("Invalid number"),
});

function Home() {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      A: "", // Ensure initial controlled state
      B: "",
    }
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

  const onSubmit = async (data) => {
    setComputing(true);
    setStatus("Computing...");
    setResults({
      add: "Computing...",
      subtract: "Computing...",
      multiply: "Computing...",
      divide: "Computing...",
    });

    try {
      const response = await axios.post("/api/addComputation", data);
      const computationResults = response.data.results;

      let currentProgress = 0;
      const interval = setInterval(() => {
        if (currentProgress < 4) {
          const operation = Object.keys(computationResults)[currentProgress];
          setResults((prev) => ({ ...prev, [operation]: computationResults[operation] }));
          setProgress((++currentProgress / 4) * 100);
          setStatus(`Computing... ${currentProgress} of 4 jobs done`);
        } else {
          clearInterval(interval);
          setComputing(false);
          setStatus("Computation finished!");
        }
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
      setStatus("Error during computation");
      setComputing(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <AuthButtons />
      </div>
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-xl w-full p-6 bg-white rounded-xl shadow-md">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex space-x-4">
              <NumberInput name="A" control={control} error={errors.A} placeholder="Enter number A" />
              <NumberInput name="B" control={control} error={errors.B} placeholder="Enter number B" />
              <SubmitButton computing={computing} />
            </div>
            {computing && <ProgressBar progress={progress} status={status} />}
            <ResultsDisplay results={results} />
          </form>
        </div>
      </div>
    </>
  );
}

export default Home;
