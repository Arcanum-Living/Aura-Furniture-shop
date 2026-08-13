"use client";

import React from 'react';
import { Star, Check, EyeOff, Trash2 } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';

export const AdminReviewsPage: React.FC = () => {
  const { reviews, updateReviewStatus, deleteReview } = useAdmin();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      <div className="pb-2 border-b border-[#E5E0D8] dark:border-[#333230]">
        <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1A18] dark:text-white">
          Product Reviews
        </h1>
        <p className="text-xs text-[#8C8279] dark:text-[#A0988E]">
          Moderate customer reviews and product feedback.
        </p>
      </div>

      <div className="space-y-4">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white dark:bg-[#1A1A18] border border-[#E5E0D8] dark:border-[#333230] p-5 rounded-xs shadow-xs flex flex-col md:flex-row items-start justify-between gap-4"
          >
            <div className="flex items-start gap-3">
              <img src={rev.productImage} alt={rev.productName} className="w-12 h-12 object-cover rounded-xs border shrink-0" />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-xs text-[#1A1A18] dark:text-white">{rev.productName}</span>
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-xs uppercase tracking-wider ${
                      rev.status === 'Approved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : rev.status === 'Pending'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-stone-200 text-stone-800'
                    }`}
                  >
                    {rev.status}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[#D4AF37]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-[#D4AF37]' : 'text-[#E5E0D8]'}`}
                    />
                  ))}
                  <span className="text-xs font-semibold ml-1 text-[#1A1A18] dark:text-white">{rev.rating}.0</span>
                </div>

                <p className="text-xs text-[#1A1A18] dark:text-white pt-1 italic">&ldquo;{rev.reviewText}&rdquo;</p>

                <div className="text-[10px] text-[#8C8279] dark:text-[#A0988E]">
                  By <strong>{rev.customerName}</strong> on {rev.date}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0 self-end md:self-start">
              {rev.status !== 'Approved' && (
                <button
                  onClick={() => updateReviewStatus(rev.id, 'Approved')}
                  className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-semibold rounded-xs hover:bg-emerald-700 flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" />
                  Approve
                </button>
              )}
              {rev.status !== 'Hidden' && (
                <button
                  onClick={() => updateReviewStatus(rev.id, 'Hidden')}
                  className="px-3 py-1.5 border border-[#E5E0D8] dark:border-[#333230] text-xs font-semibold rounded-xs hover:bg-[#F0EBE1] dark:hover:bg-[#2A2926] text-[#1A1A18] dark:text-white flex items-center gap-1"
                >
                  <EyeOff className="w-3.5 h-3.5" />
                  Hide
                </button>
              )}
              <button
                onClick={() => deleteReview(rev.id)}
                className="p-1.5 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xs"
                title="Delete Review"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AdminReviewsPage;
