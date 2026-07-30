"use client";

import { useState } from "react";

const inputClass =
  "w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors text-sm";

const labelClass = "block text-sm font-medium text-gray-300 mb-2";

export default function AssessmentForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    workloads: "",
    currentEnvironment: "",
    userCount: "",
    dataSize: "",
    priorities: "",
    compliance: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Workloads */}
        <div className="md:col-span-2">
          <label className={labelClass}>
            What workloads are you running? *
          </label>
          <textarea
            name="workloads"
            value={form.workloads}
            onChange={handleChange}
            required
            rows={3}
            placeholder="e.g. Java EE application on WebLogic, Oracle 12c database, file storage server, internal HR portal"
            className={inputClass}
          />
        </div>

        {/* Current Environment */}
        <div>
          <label className={labelClass}>Current environment *</label>
          <select
            name="currentEnvironment"
            value={form.currentEnvironment}
            onChange={handleChange}
            required
            className={inputClass}
          >
            <option value="">Select environment</option>
            <option>On-premises data centre</option>
            <option>Azure</option>
            <option>Google Cloud (GCP)</option>
            <option>Mixed on-premises and cloud</option>
            <option>Another cloud provider</option>
          </select>
        </div>

        {/* User Count */}
        <div>
          <label className={labelClass}>Number of users *</label>
          <select
            name="userCount"
            value={form.userCount}
            onChange={handleChange}
            required
            className={inputClass}
          >
            <option value="">Select range</option>
            <option>Under 100</option>
            <option>100 – 500</option>
            <option>500 – 2,000</option>
            <option>2,000 – 10,000</option>
            <option>Over 10,000</option>
          </select>
        </div>

        {/* Data Size */}
        <div>
          <label className={labelClass}>Approximate data size *</label>
          <select
            name="dataSize"
            value={form.dataSize}
            onChange={handleChange}
            required
            className={inputClass}
          >
            <option value="">Select size</option>
            <option>Under 1 TB</option>
            <option>1 – 10 TB</option>
            <option>10 – 100 TB</option>
            <option>100 TB – 1 PB</option>
            <option>Over 1 PB</option>
          </select>
        </div>

        {/* Priorities */}
        <div>
          <label className={labelClass}>Migration priorities *</label>
          <select
            name="priorities"
            value={form.priorities}
            onChange={handleChange}
            required
            className={inputClass}
          >
            <option value="">Select priority</option>
            <option>Cost reduction</option>
            <option>Speed of migration</option>
            <option>Minimal disruption</option>
            <option>Security and compliance</option>
            <option>Scalability and performance</option>
          </select>
        </div>

        {/* Compliance */}
        <div className="md:col-span-2">
          <label className={labelClass}>
            Compliance requirements{" "}
            <span className="text-gray-500 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            name="compliance"
            value={form.compliance}
            onChange={handleChange}
            placeholder="e.g. HIPAA, SOC 2, PCI-DSS, GDPR, FedRAMP"
            className={inputClass}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors text-sm"
      >
        {loading ? "Generating Assessment..." : "Generate Migration Plan →"}
      </button>
    </form>
  );
}
