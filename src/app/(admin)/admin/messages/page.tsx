"use client";

import React, { useState } from 'react';
import { Mail, Send, Check, X, MessageSquare } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';
import { AdminMessage } from '@/data/adminMockData';

export const AdminMessagesPage: React.FC = () => {
  const { messages, markMessageAsRead, replyToMessage } = useAdmin();
  const [selectedMsg, setSelectedMsg] = useState<AdminMessage | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleOpenMsg = (msg: AdminMessage) => {
    setSelectedMsg(msg);
    setReplyText(msg.replyText || '');
    if (msg.status === 'Unread') {
      markMessageAsRead(msg.id);
    }
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMsg && replyText.trim()) {
      replyToMessage(selectedMsg.id, replyText);
      setSelectedMsg(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      <div className="pb-2 border-b border-[#E5E0D8] dark:border-[#333230]">
        <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1A18] dark:text-white">
          Client Inquiries & Trade Messages
        </h1>
        <p className="text-xs text-[#8C8279] dark:text-[#A0988E]">
          Respond to bespoke customization requests, interior trade accounts, and customer care.
        </p>
      </div>

      <div className="bg-white dark:bg-[#1A1A18] border border-[#E5E0D8] dark:border-[#333230] rounded-xs shadow-xs overflow-hidden">
        <div className="divide-y divide-[#E5E0D8] dark:divide-[#333230]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              onClick={() => handleOpenMsg(msg)}
              className={`p-4 hover:bg-[#F9F8F6] dark:hover:bg-[#2A2926]/50 cursor-pointer transition-colors flex items-center justify-between gap-4 ${
                msg.status === 'Unread' ? 'bg-[#F0EBE1]/40 dark:bg-[#2A2926]/40 font-semibold' : ''
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                    msg.status === 'Unread'
                      ? 'bg-[#D4AF37] text-[#1A1A18]'
                      : 'bg-[#E5E0D8] dark:bg-[#333230] text-[#1A1A18] dark:text-white'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0 space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#1A1A18] dark:text-white">{msg.customerName}</span>
                    <span className="text-[10px] text-[#8C8279] dark:text-[#A0988E]">&lt;{msg.customerEmail}&gt;</span>
                  </div>
                  <p className="text-xs text-[#1A1A18] dark:text-white font-medium truncate">{msg.subject}</p>
                  <p className="text-xs text-[#8C8279] dark:text-[#A0988E] truncate line-clamp-1">{msg.message}</p>
                </div>
              </div>

              <div className="text-right shrink-0 space-y-1">
                <span className="text-[10px] text-[#8C8279] block">{msg.date}</span>
                <span
                  className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-xs uppercase tracking-wider ${
                    msg.status === 'Unread'
                      ? 'bg-amber-100 text-amber-800'
                      : msg.status === 'Replied'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-stone-200 text-stone-800'
                  }`}
                >
                  {msg.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Modal Sheet */}
      {selectedMsg && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1A1A18] border border-[#E5E0D8] dark:border-[#333230] rounded-xs max-w-xl w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D8] dark:border-[#333230]">
              <div>
                <h3 className="font-serif text-lg font-semibold text-[#1A1A18] dark:text-white">
                  {selectedMsg.subject}
                </h3>
                <p className="text-xs text-[#8C8279]">
                  From: {selectedMsg.customerName} ({selectedMsg.customerEmail})
                </p>
              </div>
              <button onClick={() => setSelectedMsg(null)} className="text-[#8C8279]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-[#F9F8F6] dark:bg-[#2A2926] border border-[#E5E0D8] dark:border-[#333230] rounded-xs text-xs text-[#1A1A18] dark:text-white space-y-2">
              <p className="leading-relaxed">{selectedMsg.message}</p>
              <div className="text-[10px] text-[#8C8279] text-right">{selectedMsg.date}</div>
            </div>

            <form onSubmit={handleSendReply} className="space-y-3 text-xs pt-2">
              <label className="block font-semibold text-[#1A1A18] dark:text-white">
                Reply to Client:
              </label>
              <textarea
                rows={4}
                required
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your official response..."
                className="w-full px-3 py-2 bg-[#F9F8F6] dark:bg-[#2A2926] border border-[#E5E0D8] dark:border-[#333230] rounded-xs text-[#1A1A18] dark:text-white focus:outline-hidden"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedMsg(null)}
                  className="px-4 py-2 border border-[#E5E0D8] dark:border-[#333230] rounded-xs text-[#1A1A18] dark:text-white font-semibold"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1A1A18] dark:bg-[#D4AF37] text-white dark:text-[#1A1A18] rounded-xs font-semibold hover:opacity-90 flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  Send Official Response
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminMessagesPage;
