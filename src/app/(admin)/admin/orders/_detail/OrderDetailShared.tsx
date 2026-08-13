"use client";

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  Truck,
  CheckCircle2,
  Clock,
  PackageCheck,
  XCircle,
  MapPin,
  CreditCard,
  User,
  Printer,
} from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';
import { AdminOrder } from '@/data/adminMockData';

export const AdminOrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { orders, updateOrderStatus } = useAdmin();

  const order = orders.find((o) => o.id === id) || orders[0];

  const handleStatusSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateOrderStatus(order.id, e.target.value as AdminOrder['status']);
  };

  const steps: AdminOrder['status'][] = ['Confirmed', 'Processing', 'Shipped', 'Delivered'];
  const currentStepIdx = steps.indexOf(order.status);

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-300 pb-12">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E0D8] dark:border-[#333230]">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/orders"
            className="p-2 bg-white dark:bg-[#1A1A18] border border-[#E5E0D8] dark:border-[#333230] rounded-xs text-[#1A1A18] dark:text-white hover:bg-[#F0EBE1] dark:hover:bg-[#2A2926]"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl font-normal text-[#1A1A18] dark:text-white">
                Order {order.orderNumber}
              </h1>
              <span className="text-xs font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-xs uppercase">
                {order.paymentStatus}
              </span>
            </div>
            <p className="text-xs text-[#8C8279] dark:text-[#A0988E]">
              Placed on {order.date} via {order.paymentMethod}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 border border-[#E5E0D8] dark:border-[#333230] bg-white dark:bg-[#1A1A18] text-[#1A1A18] dark:text-white text-xs font-semibold rounded-xs hover:bg-[#F0EBE1] dark:hover:bg-[#2A2926] transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Invoice</span>
          </button>

          {/* Change Order Status Dropdown */}
          <div className="flex items-center gap-2 bg-[#1A1A18] dark:bg-[#D4AF37] text-white dark:text-[#1A1A18] px-3 py-1.5 rounded-xs text-xs font-semibold">
            <span>Status:</span>
            <select
              value={order.status}
              onChange={handleStatusSelect}
              className="bg-transparent focus:outline-hidden font-bold cursor-pointer"
            >
              <option value="Pending" className="text-black">Pending</option>
              <option value="Confirmed" className="text-black">Confirmed</option>
              <option value="Processing" className="text-black">Processing</option>
              <option value="Shipped" className="text-black">Shipped</option>
              <option value="Delivered" className="text-black">Delivered</option>
              <option value="Cancelled" className="text-black">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Fulfillment Status Timeline */}
      <div className="bg-white dark:bg-[#1A1A18] border border-[#E5E0D8] dark:border-[#333230] p-5 rounded-xs shadow-xs space-y-4">
        <h3 className="font-serif text-sm font-semibold text-[#1A1A18] dark:text-white uppercase tracking-wider">
          Fulfillment Timeline
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative">
          {steps.map((step, idx) => {
            const isCompleted = currentStepIdx >= idx || order.status === 'Delivered';
            const isCurrent = order.status === step;

            return (
              <div
                key={step}
                className={`p-3 rounded-xs border text-xs space-y-1 transition-all ${
                  isCompleted
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300'
                    : 'bg-[#F9F8F6] dark:bg-[#2A2926] border-[#E5E0D8] dark:border-[#333230] text-[#8C8279]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold uppercase tracking-wider text-[10px]">{step}</span>
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Clock className="w-4 h-4 text-[#8C8279]" />
                  )}
                </div>
                <div className="text-[10px] text-[#8C8279]">
                  {isCompleted ? 'Completed' : 'Pending'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Items & Customer Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
        
        {/* Left 2 Cols: Order Items & Subtotal */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-[#1A1A18] border border-[#E5E0D8] dark:border-[#333230] p-5 sm:p-6 rounded-xs shadow-xs space-y-4">
            <h3 className="font-serif text-base font-normal text-[#1A1A18] dark:text-white">
              Order Items ({order.items.length})
            </h3>

            <div className="divide-y divide-[#E5E0D8] dark:divide-[#333230]">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-12 h-12 object-cover rounded-xs border shrink-0"
                    />
                    <div>
                      <div className="font-semibold text-[#1A1A18] dark:text-white">{item.productName}</div>
                      <div className="text-[11px] text-[#8C8279] dark:text-[#A0988E]">
                        ${item.price.toLocaleString()} × {item.quantity} units
                      </div>
                    </div>
                  </div>
                  <div className="font-bold text-sm text-[#1A1A18] dark:text-white">
                    ${(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="pt-4 border-t border-[#E5E0D8] dark:border-[#333230] space-y-2 text-[#8C8279] dark:text-[#A0988E]">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-[#1A1A18] dark:text-white">${order.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>White-Glove Shipping</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Complimentary</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (8.875%)</span>
                <span>Included</span>
              </div>
              <div className="pt-3 border-t border-[#E5E0D8] dark:border-[#333230] flex justify-between font-serif text-lg text-[#1A1A18] dark:text-[#D4AF37] font-semibold">
                <span>Total Paid</span>
                <span>${order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Customer & Shipping Details */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#1A1A18] border border-[#E5E0D8] dark:border-[#333230] p-5 rounded-xs shadow-xs space-y-4">
            <h3 className="font-serif text-base font-normal text-[#1A1A18] dark:text-white flex items-center gap-2">
              <User className="w-4 h-4 text-[#D4AF37]" />
              Customer Information
            </h3>

            <div className="flex items-center gap-3 pb-3 border-b border-[#E5E0D8] dark:border-[#333230]">
              <img src={order.customerAvatar} alt={order.customerName} className="w-10 h-10 rounded-full object-cover shrink-0" />
              <div>
                <div className="font-semibold text-[#1A1A18] dark:text-white">{order.customerName}</div>
                <div className="text-[11px] text-[#8C8279] dark:text-[#A0988E]">{order.customerEmail}</div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <span className="font-bold text-[10px] uppercase tracking-wider text-[#8C8279] block mb-1">
                  Shipping Address
                </span>
                <div className="text-xs text-[#1A1A18] dark:text-white space-y-0.5">
                  <p className="font-medium">{order.shippingAddress.street}</p>
                  <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              </div>

              <div>
                <span className="font-bold text-[10px] uppercase tracking-wider text-[#8C8279] block mb-1">
                  Payment Method
                </span>
                <p className="font-medium text-[#1A1A18] dark:text-white">{order.paymentMethod}</p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminOrderDetailPage;
