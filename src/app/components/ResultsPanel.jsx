const complexityColor = {
  Low: "text-green-400 bg-green-400/10 border-green-400/30",
  Medium: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
  High: "text-red-400 bg-red-400/10 border-red-400/30",
};

export default function ResultsPanel({ assessment }) {
  return (
    <div className="mt-10 space-y-6">
      <div className="border-t border-gray-800 pt-8">
        <h3 className="text-xl font-bold text-white mb-6">Migration Assessment</h3>
      </div>

      {/* Strategy */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
            Recommended Strategy
          </h4>
          <span className="text-xs bg-orange-500/20 text-orange-400 border border-orange-500/30 px-3 py-1 rounded-full font-medium">
            {assessment.strategy}
          </span>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed">{assessment.strategy_reasoning}</p>
      </div>

      {/* Complexity + Timeline */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
            Complexity
          </h4>
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border ${
              complexityColor[assessment.complexity] || complexityColor.Medium
            }`}
          >
            {assessment.complexity}
          </span>
          <p className="text-gray-400 text-xs mt-3 leading-relaxed">
            {assessment.complexity_reasoning}
          </p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
            Estimated Timeline
          </h4>
          <p className="text-2xl font-bold text-white">{assessment.estimated_timeline}</p>
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
              <div>
                <p className="text-white text-sm font-semibold">{item.service}</p>
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
              <span className="text-red-400 mt-0.5">⚠</span>
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
