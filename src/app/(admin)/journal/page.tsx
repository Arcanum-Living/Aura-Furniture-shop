"use client";

import React, { useState } from 'react';
import { BookOpen, Plus, X, Save } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';

export const AdminJournalPage: React.FC = () => {
  const { journalArticles, addJournalArticle } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newArt, setNewArt] = useState({
    title: '',
    slug: '',
    category: 'Material Focus',
    author: 'Victoria Sterling',
    excerpt: '',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800',
    status: 'Published' as 'Published' | 'Draft',
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArt.title) return;
    const slug = newArt.slug || newArt.title.toLowerCase().replace(/\s+/g, '-');
    addJournalArticle({ ...newArt, slug });
    setIsModalOpen(false);
    setNewArt({
      title: '',
      slug: '',
      category: 'Material Focus',
      author: 'Victoria Sterling',
      excerpt: '',
      content: '',
      coverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800',
      status: 'Published',
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E5E0D8] dark:border-[#333230]">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1A18] dark:text-white">
            Journal & Editorial
          </h1>
          <p className="text-xs text-[#8C8279] dark:text-[#A0988E]">
            Publish editorial stories, material showcases, and interior design essays.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A1A18] dark:bg-[#D4AF37] text-white dark:text-[#1A1A18] text-xs font-semibold rounded-xs shadow-xs hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          <span>New Journal Entry</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {journalArticles.map((art) => (
          <div
            key={art.id}
            className="bg-white dark:bg-[#1A1A18] border border-[#E5E0D8] dark:border-[#333230] rounded-xs shadow-xs overflow-hidden flex flex-col"
          >
            <div className="h-48 relative overflow-hidden bg-[#F9F8F6]">
              <img src={art.coverImage} alt={art.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 right-3 bg-[#1A1A18] text-[#D4AF37] text-[10px] font-bold px-2.5 py-0.5 rounded-xs uppercase">
                {art.category}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-serif text-lg font-normal text-[#1A1A18] dark:text-white leading-tight">
                  {art.title}
                </h3>
                <p className="text-xs text-[#8C8279] dark:text-[#A0988E] line-clamp-2 mt-2">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E5E0D8] dark:border-[#333230] flex items-center justify-between text-[11px] text-[#8C8279]">
                <span>By {art.author}</span>
                <span>{art.publishedDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Article Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1A1A18] border border-[#E5E0D8] dark:border-[#333230] rounded-xs max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-[#E5E0D8] dark:border-[#333230]">
              <h3 className="font-serif text-lg font-semibold text-[#1A1A18] dark:text-white">
                New Journal Article
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[#8C8279]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-[#1A1A18] dark:text-white mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={newArt.title}
                  onChange={(e) => setNewArt({ ...newArt, title: e.target.value })}
                  placeholder="e.g. The Quiet Elegance of Travertine"
                  className="w-full px-3 py-2 bg-[#F9F8F6] dark:bg-[#2A2926] border border-[#E5E0D8] dark:border-[#333230] rounded-xs text-[#1A1A18] dark:text-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-medium text-[#1A1A18] dark:text-white mb-1">
                  Excerpt / Teaser
                </label>
                <textarea
                  rows={2}
                  value={newArt.excerpt}
                  onChange={(e) => setNewArt({ ...newArt, excerpt: e.target.value })}
                  placeholder="Brief introduction for card views..."
                  className="w-full px-3 py-2 bg-[#F9F8F6] dark:bg-[#2A2926] border border-[#E5E0D8] dark:border-[#333230] rounded-xs text-[#1A1A18] dark:text-white focus:outline-hidden"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-[#E5E0D8] dark:border-[#333230] rounded-xs text-[#1A1A18] dark:text-white font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1A1A18] dark:bg-[#D4AF37] text-white dark:text-[#1A1A18] rounded-xs font-semibold hover:opacity-90 flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminJournalPage;
