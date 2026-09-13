import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, TrendingUp, Zap, DollarSign } from 'lucide-react'

function UsageDashboard() {
  const usageData = [
    { model: 'Llama 3.3 70B', tokens: 12500, cost: 0.25, percentage: 53 },
    { model: 'Llama 3.1 8B', tokens: 7200, cost: 0.15, percentage: 31 },
    { model: 'Mixtral 8x7B', tokens: 3800, cost: 0.07, percentage: 16 },
  ]

  const totalTokens = usageData.reduce((sum, item) => sum + item.tokens, 0)
  const totalCost = usageData.reduce((sum, item) => sum + item.cost, 0)

  return (
    <div className="flex-1 h-screen flex flex-col bg-chat-bg">
      {/* Header */}
      <div className="border-b border-gray-700 bg-chat-dark px-4 lg:px-8 py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-emerald hover:text-emerald/80 transition mb-4"
        >
          <ArrowLeft size={18} />
          Back to Chat
        </Link>
        <h1 className="text-3xl font-bold text-white">Usage Dashboard</h1>
        <p className="text-gray-400 mt-2">June 2024</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 lg:px-8 py-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Total Tokens */}
          <div className="bg-chat-dark border border-gray-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-400 text-sm font-semibold">Total Tokens</h3>
              <Zap className="text-emerald" size={20} />
            </div>
            <p className="text-3xl font-bold text-white mb-1">
              {(totalTokens / 1000).toFixed(1)}K
            </p>
            <p className="text-xs text-gray-500">Used this month</p>
          </div>

          {/* Estimated Cost */}
          <div className="bg-chat-dark border border-gray-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-400 text-sm font-semibold">Estimated Cost</h3>
              <DollarSign className="text-emerald" size={20} />
            </div>
            <p className="text-3xl font-bold text-white mb-1">
              ${totalCost.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500">USD</p>
          </div>

          {/* Trend */}
          <div className="bg-chat-dark border border-gray-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-400 text-sm font-semibold">Trend</h3>
              <TrendingUp className="text-emerald" size={20} />
            </div>
            <p className="text-3xl font-bold text-white mb-1">+12%</p>
            <p className="text-xs text-gray-500">vs last month</p>
          </div>
        </div>

        {/* Model Breakdown */}
        <div className="bg-chat-dark border border-gray-700 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-6">Usage by Model</h2>

          <div className="space-y-6">
            {usageData.map((item) => (
              <div key={item.model}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold text-white">{item.model}</p>
                    <p className="text-xs text-gray-500">{(item.tokens / 1000).toFixed(1)}K tokens</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-emerald">${item.cost.toFixed(2)}</p>
                    <p className="text-xs text-gray-500">{item.percentage}%</p>
                  </div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-emerald h-2 rounded-full transition-all"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Activity Chart (Simplified) */}
        <div className="bg-chat-dark border border-gray-700 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Daily Activity</h2>

          <div className="flex items-end justify-around h-48 gap-2 px-4">
            {[65, 45, 78, 55, 72, 88, 92, 76, 65, 58, 72, 85, 90, 78].map((value, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center flex-1"
              >
                <div
                  className="w-full bg-emerald rounded-t transition-all hover:bg-emerald/80"
                  style={{ height: `${value}%` }}
                ></div>
                <p className="text-xs text-gray-500 mt-2">{idx + 7}</p>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-400 mt-6 text-center">
            Token usage by day (June 7-20)
          </p>
        </div>
      </div>
    </div>
  )
}

export default UsageDashboard
