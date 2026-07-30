"use client";

import { useState } from "react";
import AssessmentForm from "./components/AssessmentForm";
import ResultsPanel from "./components/ResultsPanel";

export default function Home() {
  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(formData) {
    setLoading(true);
    setError(null);
    setAssessment(null);

    try {
      const response = await fetch("/api/assess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setAssessment(data.assessment);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-5">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white">AWS Migration Advisor</h1>
            <p className="text-xs text-gray-400">Powered by Amazon Bedrock</p>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-white mb-2">
            Get Your Migration Assessment
          </h2>
          <p className="text-gray-400 text-base">
            Describe your current infrastructure and receive an AI-generated AWS migration plan
            — strategy, recommended services, risks, and next steps.
          </p>
        </div>

        <AssessmentForm onSubmit={handleSubmit} loading={loading} />

        {error && (
          <div className="mt-6 p-4 bg-red-900/30 border border-red-700 rounded-lg text-red-300">
            {error}
          </div>
        )}

        {loading && (
          <div className="mt-10 flex flex-col items-center gap-3 text-gray-400">
            <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm">Analysing your infrastructure...</p>
          </div>
        )}

        {assessment && <ResultsPanel assessment={assessment} />}
      </main>
    </div>
  );
}
