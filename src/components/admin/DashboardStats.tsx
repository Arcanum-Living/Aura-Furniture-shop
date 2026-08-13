import React from 'react';
import { DollarSign, ShoppingBag, Users, Armchair, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export const DashboardStats: React.FC = () => {
  const { orders, products, customers } = useAdmin();

  // Calculate stats dynamically from context
  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'Cancelled' ? o.total : 0), 0) + 78200; // base offset
  const totalOrdersCount = orders.length + 1278;
  const totalCustomersCount = customers.length + 3837;
  const totalProductsCount = products.length + 174;

  const kpis = [
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      trend: '+12.5%',
      isPositive: true,
      subtext: 'vs previous period',
      icon: DollarSign,
    },
    {
      title: 'Orders',
      value: totalOrdersCount.toLocaleString(),
      trend: '+8.2%',
      isPositive: true,
      subtext: 'vs previous period',
      icon: ShoppingBag,
    },
    {
      title: 'Customers',
      value: totalCustomersCount.toLocaleString(),
      trend: '+14.7%',
      isPositive: true,
      subtext: 'vs previous period',
      icon: Users,
    },
    {
      title: 'Products',
      value: totalProductsCount.toLocaleString(),
      trend: '+4.3%',
      isPositive: true,
      subtext: 'vs previous period',
      icon: Armchair,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {kpis.map((kpi, idx) => {
        const Icon = kpi.icon;
        return (
          <div
            key={idx}
            className="bg-white dark:bg-[#1A1A18] border border-[#E5E0D8] dark:border-[#333230] p-5 sm:p-6 rounded-xs shadow-xs hover:border-[#1A1A18] dark:hover:border-white transition-all group"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider text-[#8C8279] dark:text-[#A0988E] font-medium block">
                  {kpi.title}
                </span>
                <div className="font-serif text-2xl sm:text-3xl text-[#1A1A18] dark:text-white font-normal">
                  {kpi.value}
                </div>
              </div>

              <div className="w-10 h-10 rounded-xs bg-[#F9F8F6] dark:bg-[#2A2926] border border-[#E5E0D8] dark:border-[#333230] flex items-center justify-center text-[#1A1A18] dark:text-[#D4AF37] group-hover:scale-105 transition-transform">
                <Icon className="w-5 h-5 stroke-[1.75]" />
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#E5E0D8]/60 dark:border-[#333230]/60 flex items-center justify-between text-xs">
              <span
                className={`inline-flex items-center font-semibold text-[11px] ${
                  kpi.isPositive ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-600'
                }`}
              >
                {kpi.isPositive ? (
                  <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                ) : (
                  <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
                )}
                {kpi.trend}
              </span>
              <span className="text-[#8C8279] dark:text-[#A0988E] text-[11px] font-light">
                {kpi.subtext}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
