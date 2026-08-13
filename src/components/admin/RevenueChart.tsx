import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { useAdmin } from '../../context/AdminContext';

const data7D = [
  { label: 'Mon', revenue: 9200, orders: 12 },
  { label: 'Tue', revenue: 11400, orders: 15 },
  { label: 'Wed', revenue: 8800, orders: 10 },
  { label: 'Thu', revenue: 14200, orders: 18 },
  { label: 'Fri', revenue: 16800, orders: 22 },
  { label: 'Sat', revenue: 19500, orders: 26 },
  { label: 'Sun', revenue: 15100, orders: 19 },
];

const data30D = [
  { label: 'Week 1', revenue: 48200, orders: 68 },
  { label: 'Week 2', revenue: 56400, orders: 82 },
  { label: 'Week 3', revenue: 61800, orders: 94 },
  { label: 'Week 4', revenue: 74250, orders: 112 },
];

const data90D = [
  { label: 'May', revenue: 182000, orders: 280 },
  { label: 'Jun', revenue: 215000, orders: 340 },
  { label: 'Jul', revenue: 248000, orders: 390 },
  { label: 'Aug', revenue: 279000, orders: 420 },
];

const data1Y = [
  { label: 'Q1 2025', revenue: 420000, orders: 620 },
  { label: 'Q2 2025', revenue: 510000, orders: 740 },
  { label: 'Q3 2025', revenue: 630000, orders: 890 },
  { label: 'Q4 2025', revenue: 840000, orders: 1150 },
  { label: 'Q1 2026', revenue: 720000, orders: 980 },
  { label: 'Q2 2026', revenue: 890000, orders: 1240 },
];

export const RevenueChart: React.FC = () => {
  const { isDarkMode } = useAdmin();
  const [period, setPeriod] = useState<'7D' | '30D' | '90D' | '1Y'>('30D');

  const chartData =
    period === '7D'
      ? data7D
      : period === '30D'
      ? data30D
      : period === '90D'
      ? data90D
      : data1Y;

  return (
    <div className="bg-white dark:bg-[#1A1A18] border border-[#E5E0D8] dark:border-[#333230] p-5 sm:p-6 rounded-xs shadow-xs space-y-6">
      
      {/* Chart Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-xl font-normal text-[#1A1A18] dark:text-white">
            Revenue Overview
          </h2>
          <p className="text-xs text-[#8C8279] dark:text-[#A0988E]">
            Sales performance and transaction volume over time.
          </p>
        </div>

        {/* Period Filter Tabs */}
        <div className="inline-flex p-1 bg-[#F0EBE1] dark:bg-[#2A2926] border border-[#E5E0D8] dark:border-[#333230] rounded-xs text-xs font-medium">
          {(['7D', '30D', '90D', '1Y'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-xs transition-all ${
                period === p
                  ? 'bg-white dark:bg-[#1A1A18] text-[#1A1A18] dark:text-[#D4AF37] shadow-xs font-semibold'
                  : 'text-[#8C8279] dark:text-[#A0988E] hover:text-[#1A1A18] dark:hover:text-white'
              }`}
            >
              {p === '7D' ? '7 Days' : p === '30D' ? '30 Days' : p === '90D' ? '90 Days' : '1 Year'}
            </button>
          ))}
        </div>
      </div>

      {/* Recharts Area Chart */}
      <div className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="auraGoldGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#D4AF37" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDarkMode ? '#2A2926' : '#E5E0D8'}
              vertical={false}
            />

            <XAxis
              dataKey="label"
              stroke={isDarkMode ? '#8C8279' : '#8C8279'}
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              stroke={isDarkMode ? '#8C8279' : '#8C8279'}
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => `$${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`}
            />

            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-[#1A1A18] text-white p-3 border border-[#D4AF37] rounded-xs shadow-xl text-xs space-y-1">
                      <p className="font-serif italic font-bold text-[#D4AF37]">{label}</p>
                      <p className="font-semibold text-sm">
                        Revenue: ${payload[0].value?.toLocaleString()}
                      </p>
                      {payload[0].payload.orders && (
                        <p className="text-[10px] text-[#D8D0C5]">
                          Orders: {payload[0].payload.orders}
                        </p>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#D4AF37"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#auraGoldGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};
