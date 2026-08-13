import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

const categoryData = [
  { name: 'Living', value: 184000, color: '#1A1A18' },
  { name: 'Dining', value: 112000, color: '#D4AF37' },
  { name: 'Bedroom', value: 98000, color: '#8C8279' },
  { name: 'Lighting', value: 54000, color: '#A89E94' },
  { name: 'Office', value: 42000, color: '#665F58' },
  { name: 'Decor', value: 28000, color: '#E5E0D8' },
];

export const CategoryChart: React.FC = () => {
  const totalRevenue = categoryData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="bg-white dark:bg-[#1A1A18] border border-[#E5E0D8] dark:border-[#333230] p-5 sm:p-6 rounded-xs shadow-xs space-y-4">
      <div>
        <h2 className="font-serif text-xl font-normal text-[#1A1A18] dark:text-white">
          Sales by Category
        </h2>
        <p className="text-xs text-[#8C8279] dark:text-[#A0988E]">
          Distribution across product lines.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Recharts Donut Pie */}
        <div className="h-56 w-full md:w-1/2 relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0];
                    return (
                      <div className="bg-[#1A1A18] text-white p-2.5 rounded-xs shadow-xl text-xs">
                        <p className="font-semibold text-[#D4AF37]">{data.name}</p>
                        <p>${(data.value as number).toLocaleString()}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute text-center pointer-events-none">
            <span className="text-[10px] uppercase tracking-widest text-[#8C8279] font-medium block">
              Total
            </span>
            <span className="font-serif text-base font-semibold text-[#1A1A18] dark:text-white">
              ${(totalRevenue / 1000).toFixed(0)}k
            </span>
          </div>
        </div>

        {/* Legend List */}
        <div className="w-full md:w-1/2 space-y-2.5">
          {categoryData.map((item) => {
            const percentage = ((item.value / totalRevenue) * 100).toFixed(1);
            return (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-xs shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-[#1A1A18] dark:text-white font-medium">{item.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#8C8279] dark:text-[#A0988E]">${(item.value / 1000).toFixed(1)}k</span>
                  <span className="font-semibold text-[#1A1A18] dark:text-[#D4AF37] w-12 text-right">
                    {percentage}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
