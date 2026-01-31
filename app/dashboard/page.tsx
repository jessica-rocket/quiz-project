"use client";

import { useState, useEffect } from "react";
import { getStats, clearEvents, loadDemoData } from "../lib/analytics";

export default function Dashboard() {
  const [stats, setStats] = useState<ReturnType<typeof getStats> | null>(null);

  useEffect(() => {
    setStats(getStats());

    // Refresh stats every 5 seconds
    const interval = setInterval(() => {
      setStats(getStats());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleClearData = () => {
    if (confirm("Clear all analytics data?")) {
      clearEvents();
      setStats(getStats());
    }
  };

  const handleLoadDemo = () => {
    loadDemoData();
    setStats(getStats());
  };

  if (!stats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  const personalityColors: Record<string, string> = {
    explorer: "#e57373",
    classic: "#8d6e63",
    adventurer: "#ffb74d",
    mindful: "#81c784",
  };

  const personalityNames: Record<string, string> = {
    explorer: "Espresso Explorer",
    classic: "Classic Comfort",
    adventurer: "Bold Adventurer",
    mindful: "Mindful Sipper",
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-white mb-2">
              Quiz Analytics
            </h1>
            <p className="text-purple-200">Basecamp Coffee Personality Quiz</p>
          </div>
          <div className="flex gap-3">
            <a
              href="/"
              className="bg-white/20 text-white px-4 py-2 rounded-full hover:bg-white/30 transition-colors text-sm font-medium"
            >
              View Quiz
            </a>
            <button
              onClick={handleLoadDemo}
              className="bg-green-500/20 text-green-200 px-4 py-2 rounded-full hover:bg-green-500/30 transition-colors text-sm font-medium"
            >
              Load Demo Data
            </button>
            <button
              onClick={handleClearData}
              className="bg-red-500/20 text-red-200 px-4 py-2 rounded-full hover:bg-red-500/30 transition-colors text-sm font-medium"
            >
              Clear Data
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <MetricCard
            label="Quiz Starts"
            value={stats.all.starts}
            todayValue={stats.today.starts}
          />
          <MetricCard
            label="Completions"
            value={stats.all.completions}
            todayValue={stats.today.completions}
          />
          <MetricCard
            label="Shares"
            value={stats.all.shares}
            todayValue={stats.today.shares}
          />
          <MetricCard
            label="Email Signups"
            value={stats.all.signups}
            todayValue={stats.today.signups}
          />
        </div>

        {/* Conversion Rates */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-xl">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Conversion Funnel</h2>
          <div className="grid grid-cols-3 gap-4">
            <RateCard
              label="Completion Rate"
              value={stats.completionRate}
              description="Started → Completed"
            />
            <RateCard
              label="Share Rate"
              value={stats.shareRate}
              description="Completed → Shared"
            />
            <RateCard
              label="Signup Rate"
              value={stats.signupRate}
              description="Completed → Email"
            />
          </div>
        </div>

        {/* Personality Distribution */}
        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Personality Distribution
          </h2>
          {Object.keys(stats.personalityCounts).length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No quiz completions yet
            </p>
          ) : (
            <div className="space-y-3">
              {Object.entries(stats.personalityCounts)
                .sort(([, a], [, b]) => b - a)
                .map(([personality, count]) => {
                  const total = Object.values(stats.personalityCounts).reduce(
                    (a, b) => a + b,
                    0
                  );
                  const percentage = Math.round((count / total) * 100);
                  return (
                    <div key={personality}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-700">
                          {personalityNames[personality] || personality}
                        </span>
                        <span className="text-gray-500">
                          {count} ({percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="h-3 rounded-full transition-all"
                          style={{
                            width: `${percentage}%`,
                            backgroundColor:
                              personalityColors[personality] || "#9ca3af",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-purple-200 text-sm mt-8">
          Demo mode: Data stored in your browser only. Click &quot;Load Demo Data&quot; to see sample metrics.
        </p>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  todayValue,
}: {
  label: string;
  value: number;
  todayValue: number;
}) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-xl">
      <p className="text-gray-500 text-sm mb-1">{label}</p>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
      <p className="text-green-600 text-sm mt-1">+{todayValue} today</p>
    </div>
  );
}

function RateCard({
  label,
  value,
  description,
}: {
  label: string;
  value: number;
  description: string;
}) {
  return (
    <div className="text-center">
      <p className="text-3xl font-bold text-purple-600">{value}%</p>
      <p className="font-medium text-gray-800">{label}</p>
      <p className="text-gray-500 text-sm">{description}</p>
    </div>
  );
}
