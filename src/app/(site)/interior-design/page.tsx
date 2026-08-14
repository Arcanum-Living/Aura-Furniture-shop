'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, Send, Sparkles } from 'lucide-react';
import {
  Reveal,
  Stagger,
  StaggerItem,
  DURATION,
  EASE_OUT,
  STAGGER,
} from '@/components/motion';

/** Fields ease to a darker border on focus rather than snapping to one. */
const FIELD_CLASS =
  'w-full bg-[#F9F8F6] border border-[#E5E0D8] text-xs p-3 rounded-xs text-[#1A1A18] focus:outline-hidden focus:border-[#1A1A18] focus:bg-white transition-[border-color,background-color] duration-300 ease-out';

const InteriorDesignPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Full Residential Transformation',
    budgetRange: '$25,000 – $50,000',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const servicesList = [
    { name: 'Interior Styling & Curated Decor', desc: 'Personalized placement of lighting, rugs, ceramics, and textiles.' },
    { name: 'Spatial Planning & Floorplan Layouts', desc: '3D CAD rendering and ergonomic traffic flow optimization.' },
    { name: 'Furniture Selection & Bespoke Sourcing', desc: 'Direct sourcing of vintage, archival, and custom AURA designs.' },
    { name: 'Full Home Residential Transformations', desc: 'End-to-end architectural interior design for penthouses and estates.' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please complete all required fields.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      {/* Title */}
      <Stagger
        onMount
        gap={STAGGER.loose}
        className="text-center max-w-3xl mx-auto space-y-4 border-b border-[#E5E0D8] pb-10"
      >
        <StaggerItem>
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#8C8279]">
            Bespoke Spatial Design
          </span>
        </StaggerItem>
        <StaggerItem duration={DURATION.slow}>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#1A1A18] font-medium">
            Spaces, Thoughtfully Considered.
          </h1>
        </StaggerItem>
        <StaggerItem>
          <p className="text-sm text-[#8C8279] font-light leading-relaxed">
            Our in-house design studio collaborates with homeowners, architects, and estate developers to craft tranquil, highly personalized residential environments.
          </p>
        </StaggerItem>
      </Stagger>

      {/* Service Offering Grid */}
      <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {servicesList.map((service, i) => (
          <StaggerItem
            key={i}
            className="group bg-white border border-[#E5E0D8] hover:border-[#1A1A18] p-8 rounded-xs space-y-3 transition-[border-color,box-shadow] duration-500 hover:shadow-lg"
          >
            <Sparkles className="w-6 h-6 text-[#D4AF37] transition-transform duration-500 ease-out group-hover:scale-110" />
            <h3 className="font-serif text-2xl text-[#1A1A18] font-medium">{service.name}</h3>
            <p className="text-xs text-[#8C8279] font-light leading-relaxed">{service.desc}</p>
          </StaggerItem>
        ))}
      </Stagger>

      {/* Consultation Booking Form */}
      <div className="bg-[#F0EBE1] border border-[#E5E0D8] p-8 sm:p-12 rounded-xs grid grid-cols-1 lg:grid-cols-12 gap-12">
        <Reveal direction="right" className="lg:col-span-5 space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#8C8279]">
            Private Consultation
          </span>
          <h2 className="font-serif text-3xl text-[#1A1A18] font-medium">
            Book a Spatial Design Consultation
          </h2>
          <p className="text-xs text-[#8C8279] font-light leading-relaxed">
            Fill out your project details to schedule an introductory video call or in-person meeting at our NYC Flagship Studio.
          </p>

          <div className="space-y-2 pt-4 text-xs text-[#1A1A18]">
            <p><strong className="text-[#8C8279]">Studio Email:</strong> studio@auradesign.com</p>
            <p><strong className="text-[#8C8279]">Consultation Line:</strong> +1 (555) 123-4567</p>
          </div>
        </Reveal>

        <Reveal direction="left" className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xs border border-[#E5E0D8]">
          <AnimatePresence mode="wait" initial={false}>
          {submitted ? (
            <motion.div
              key="submitted"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: DURATION.fast, ease: EASE_OUT }}
              className="text-center py-12 space-y-4"
            >
              <CheckCircle2 className="w-12 h-12 text-[#D4AF37] mx-auto" />
              <h3 className="font-serif text-2xl font-medium text-[#1A1A18]">Consultation Requested</h3>
              <p className="text-xs text-[#8C8279] font-light max-w-sm mx-auto">
                Thank you, {formData.name}. Our principal interior designer will review your project brief and contact you within 24 hours.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="consultation-form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: DURATION.fast, ease: EASE_OUT }}
              className="space-y-4"
            >
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: DURATION.fast, ease: EASE_OUT }}
                    className="text-xs text-red-600 font-medium"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A1A18] mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="E.g. Victoria Sterling"
                    className={FIELD_CLASS}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A1A18] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="victoria@example.com"
                    className={FIELD_CLASS}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A1A18] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className={FIELD_CLASS}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A1A18] mb-1">
                    Project Scope
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className={FIELD_CLASS}
                  >
                    <option>Full Residential Transformation</option>
                    <option>Living Room Spatial Styling</option>
                    <option>Dining & Entertaining Area</option>
                    <option>Custom Furniture Sourcing</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A1A18] mb-1">
                  Estimated Furniture & Styling Budget
                </label>
                <select
                  value={formData.budgetRange}
                  onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                  className={FIELD_CLASS}
                >
                  <option>$10,000 – $25,000</option>
                  <option>$25,000 – $50,000</option>
                  <option>$50,000 – $100,000</option>
                  <option>$100,000+</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1A1A18] mb-1">
                  Tell Us About Your Vision & Timeline *
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your residence location, square footage, preferred material finishes, and key goals..."
                  className={FIELD_CLASS}
                />
              </div>

              <button
                type="submit"
                className="group w-full bg-[#1A1A18] hover:bg-[#333230] text-white text-xs font-semibold uppercase tracking-[0.2em] py-4 rounded-xs transition-colors flex items-center justify-center space-x-2"
              >
                <span>Request Private Consultation</span>
                <Send className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
              </button>
            </motion.form>
          )}
          </AnimatePresence>
        </Reveal>
      </div>
    </div>
  );
};

export default InteriorDesignPage;
