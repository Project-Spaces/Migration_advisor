const complexityColor = {
  Low: "text-green-400 bg-green-400/10 border-green-400/30",
  Medium: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
  High: "text-red-400 bg-red-400/10 border-red-400/30",
};

const phaseColors = ["border-orange-500/40", "border-blue-500/40", "border-purple-500/40"];
const phaseDotColors = ["bg-orange-500", "bg-blue-500", "bg-purple-500"];

export default function ResultsPanel({ assessment }) {
  return (
    <div className="mt-10 space-y-6">
      <div className="border-t border-gray-800 pt-8">
        <h3 className="text-xl font-bold text-white mb-6">Migration Assessment</h3>
      </div>

      {/* Executive Summary */}
      <div className="bg-gradient-to-br from-orange-500/10 to-gray-900 border border-orange-500/30 rounded-xl p-6">
        <h4 className="text-sm font-medium text-orange-400 uppercase tracking-wider mb-3">
          Executive Summary
        </h4>
        <p className="text-gray-200 text-sm leading-relaxed">{assessment.executive_summary}</p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
            Complexity
          </h4>
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border ${
              complexityColor[assessment.complexity] || complexityColor.Medium
            }`}
          >
            {assessment.complexity}
          </span>
          <p className="text-gray-500 text-xs mt-2 leading-relaxed">
            {assessment.complexity_reasoning}
          </p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
            Timeline
          </h4>
          <p className="text-xl font-bold text-white">{assessment.estimated_timeline}</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
            Est. Cost Savings
          </h4>
          <p className="text-green-400 text-sm font-semibold leading-relaxed">
            {assessment.estimated_cost_savings}
          </p>
        </div>
      </div>

      {/* Workload Breakdown — per-workload 7Rs */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
          Workload Strategy Breakdown
        </h4>
        <div className="space-y-3">
          {assessment.workload_breakdown.map((item, i) => (
            <div key={i} className="flex gap-4 p-3 bg-gray-800/50 rounded-lg">
              <span className="shrink-0 text-xs font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2 py-1 rounded-md h-fit">
                {item.recommended_r}
              </span>
              <div>
                <p className="text-white text-sm font-semibold">{item.workload}</p>
                <p className="text-gray-400 text-xs mt-0.5">{item.reasoning}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Migration Phases */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
          Migration Phases
        </h4>
        <div className="space-y-4">
          {assessment.phases.map((phase, i) => (
            <div
              key={i}
              className={`border-l-2 pl-4 ${phaseColors[i] || "border-gray-600"}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-2 h-2 rounded-full shrink-0 ${phaseDotColors[i] || "bg-gray-400"}`} />
                <p className="text-white text-sm font-semibold">{phase.phase}</p>
                <span className="text-xs text-gray-500 ml-auto">{phase.duration}</span>
              </div>
              <p className="text-gray-400 text-xs mb-2">{phase.description}</p>
              <ul className="space-y-1">
                {phase.key_actions.map((action, j) => (
                  <li key={j} className="text-xs text-gray-300 flex gap-2">
                    <span className="text-gray-500">→</span>
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Services */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
          Recommended AWS Services
        </h4>
        <div className="space-y-3">
          {assessment.recommended_services.map((item, i) => (
            <div key={i} className="flex gap-4 p-3 bg-gray-800/50 rounded-lg">
              <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center shrink-0">
                <span className="text-orange-400 text-xs font-bold">{i + 1}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-white text-sm font-semibold">{item.service}</p>
                  {item.phase && (
                    <span className="text-xs text-gray-500 bg-gray-700 px-2 py-0.5 rounded">
                      {item.phase}
                    </span>
                  )}
                </div>
                <p className="text-gray-400 text-xs mt-0.5">{item.purpose}</p>
                {item.replaces && (
                  <p className="text-gray-500 text-xs mt-0.5">Replaces: {item.replaces}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Risks */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
          Key Risks
        </h4>
        <ul className="space-y-2">
          {assessment.risks.map((risk, i) => (
            <li key={i} className="flex gap-3 text-sm text-gray-300">
              <span className="text-red-400 mt-0.5 shrink-0">⚠</span>
              {risk}
            </li>
          ))}
        </ul>
      </div>

      {/* Next Steps */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
          Recommended Next Steps
        </h4>
        <ol className="space-y-3">
          {assessment.next_steps.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm text-gray-300">
              <span className="text-orange-400 font-bold shrink-0">{i + 1}.</span>
              {step}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
