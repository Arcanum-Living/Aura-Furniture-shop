import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MoreHorizontal, Eye, Truck, User } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { AdminOrder } from '../../data/adminMockData';

export const RecentOrders: React.FC = () => {
  const { orders, updateOrderStatus } = useAdmin();
  const navigate = useNavigate();

  const [activeMenuId, setActiveMenuId] = React.useState<string | null>(null);

  const getStatusBadgeClass = (status: AdminOrder['status']) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800';
      case 'Shipped':
        return 'bg-sky-50 text-sky-800 border-sky-200 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800';
      case 'Processing':
        return 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800';
      case 'Confirmed':
        return 'bg-indigo-50 text-indigo-800 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800';
      case 'Pending':
        return 'bg-stone-100 text-stone-800 border-stone-300 dark:bg-stone-800 dark:text-stone-300';
      case 'Cancelled':
        return 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800';
      default:
        return 'bg-stone-100 text-stone-800';
    }
  };

  return (
    <div className="bg-white dark:bg-[#1A1A18] border border-[#E5E0D8] dark:border-[#333230] p-5 sm:p-6 rounded-xs shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-xl font-normal text-[#1A1A18] dark:text-white">
            Recent Orders
          </h2>
          <p className="text-xs text-[#8C8279] dark:text-[#A0988E]">
            Latest transactions and customer orders.
          </p>
        </div>
        <Link
          to="/admin/orders"
          className="text-xs font-semibold text-[#1A1A18] dark:text-[#D4AF37] hover:underline uppercase tracking-wider"
        >
          View All Orders →
        </Link>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto border border-[#E5E0D8] dark:border-[#333230] rounded-xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#F9F8F6] dark:bg-[#2A2926] text-[#8C8279] dark:text-[#A0988E] uppercase tracking-wider text-[10px] border-b border-[#E5E0D8] dark:border-[#333230]">
            <tr>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Items</th>
              <th className="py-3 px-4">Total</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E0D8] dark:divide-[#333230] text-[#1A1A18] dark:text-white">
            {orders.slice(0, 5).map((order) => (
              <tr
                key={order.id}
                className="hover:bg-[#F9F8F6] dark:hover:bg-[#2A2926]/50 transition-colors"
              >
                <td className="py-3 px-4 font-semibold text-[#1A1A18] dark:text-[#D4AF37]">
                  <Link to={`/admin/orders/${order.id}`} className="hover:underline">
                    {order.orderNumber}
                  </Link>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={order.customerAvatar}
                      alt={order.customerName}
                      className="w-7 h-7 rounded-full object-cover shrink-0"
                    />
                    <div>
                      <div className="font-medium leading-tight">{order.customerName}</div>
                      <div className="text-[10px] text-[#8C8279] dark:text-[#A0988E]">{order.customerEmail}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-[#8C8279] dark:text-[#A0988E] whitespace-nowrap">
                  {order.date}
                </td>
                <td className="py-3 px-4">{order.itemsCount} items</td>
                <td className="py-3 px-4 font-semibold">${order.total.toLocaleString()}</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-block px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider border rounded-xs ${getStatusBadgeClass(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right relative">
                  <button
                    onClick={() => setActiveMenuId(activeMenuId === order.id ? null : order.id)}
                    className="p-1 hover:bg-[#F0EBE1] dark:hover:bg-[#333230] rounded-xs text-[#8C8279] hover:text-[#1A1A18] dark:hover:text-white"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>

                  {/* Dropdown Menu */}
                  {activeMenuId === order.id && (
                    <div className="absolute right-4 mt-1 w-44 bg-white dark:bg-[#1A1A18] border border-[#E5E0D8] dark:border-[#333230] shadow-xl rounded-xs p-1.5 z-30 text-left space-y-1 animate-in fade-in">
                      <button
                        onClick={() => {
                          setActiveMenuId(null);
                          navigate(`/admin/orders/${order.id}`);
                        }}
                        className="w-full text-left px-2.5 py-1.5 hover:bg-[#F9F8F6] dark:hover:bg-[#2A2926] rounded-xs flex items-center gap-2 text-xs"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#8C8279]" />
                        View Details
                      </button>
                      <button
                        onClick={() => {
                          setActiveMenuId(null);
                          updateOrderStatus(order.id, 'Processing');
                        }}
                        className="w-full text-left px-2.5 py-1.5 hover:bg-[#F9F8F6] dark:hover:bg-[#2A2926] rounded-xs flex items-center gap-2 text-xs"
                      >
                        <Truck className="w-3.5 h-3.5 text-[#8C8279]" />
                        Mark Processing
                      </button>
                      <button
                        onClick={() => {
                          setActiveMenuId(null);
                          updateOrderStatus(order.id, 'Shipped');
                        }}
                        className="w-full text-left px-2.5 py-1.5 hover:bg-[#F9F8F6] dark:hover:bg-[#2A2926] rounded-xs flex items-center gap-2 text-xs"
                      >
                        <User className="w-3.5 h-3.5 text-[#8C8279]" />
                        Mark Shipped
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
