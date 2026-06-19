import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, Mail, Phone, MapPin, Sparkles } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: 'ielts',
    message: ''
  });
  
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      program: 'ielts',
      message: ''
    });
    setSubmitted(false);
  };

  const programsList = [
    { value: 'ielts', label: 'IELTS Training' },
    { value: 'toefl', label: 'TOEFL Training' },
    { value: 'pte', label: 'PTE Training' },
    { value: 'gmat', label: 'GMAT Training' },
    { value: 'sat', label: 'SAT Training' },
    { value: 'duolingo', label: 'Duolingo Training' },
    { value: 'gre', label: 'GRE Training' },
    { value: 'general', label: 'General Inquiry / Other' }
  ];

  return (
    <section id="contact-section-container" className="py-24 bg-slate-50 text-slate-900 border-b border-slate-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div id="contact-header" className="text-center mb-12 space-y-4">
          <span className="text-indigo-600 text-xs sm:text-sm font-bold font-mono tracking-widest uppercase bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100/60">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-slate-900">
            Contact Us Today
          </h2>
          <p className="text-slate-500 text-xs sm:text-base leading-relaxed max-w-lg mx-auto">
            Have questions about our training tracks or enrollment schedules? Let us know, and an academic coordinator will reach out shortly.
          </p>
        </div>

        {/* Contact Form Container Card */}
        <div id="contact-card" className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-100 relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form 
                key="contact-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSubmit} 
                className="space-y-6"
              >
                
                {/* Two Column Layout for Basic Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-700 tracking-wide uppercase">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="E.g. Dr. Lynn Abungu"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all"
                    />
                  </div>

                  {/* Email Address */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-700 tracking-wide uppercase">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="E.g. lynn@example.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all"
                    />
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Phone Number */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-700 tracking-wide uppercase">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="E.g. +254 700 000 000"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all"
                    />
                  </div>

                  {/* Program of Interest */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-700 tracking-wide uppercase">
                      Class Interest
                    </label>
                    <select
                      value={formData.program}
                      onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 cursor-pointer"
                    >
                      {programsList.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </div>

                </div>

                {/* Message Context */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 tracking-wide uppercase">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your details, score goals, or schedules request here..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all resize-none"
                  />
                </div>

                {/* Form submit CTA */}
                <button
                  type="submit"
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-widest shadow-md shadow-indigo-100 hover:shadow-lg hover:shadow-indigo-200 cursor-pointer transition-all active:scale-98 flex items-center justify-center space-x-2"
                >
                  <Send className="h-4 w-4" />
                  <span>Send Message</span>
                </button>

              </motion.form>
            ) : (
              <motion.div 
                key="success-message"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="py-12 text-center space-y-6"
              >
                <div className="h-16 w-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                  <CheckCircle2 className="h-10 w-10 animate-pulse" />
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-2xl font-black font-display text-slate-900">
                    Message Transmitted!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-md mx-auto">
                    Thank you for your message, <strong className="text-slate-800">{formData.name}</strong>. An advisor has been notified of your interest in our <strong className="text-slate-800">{programsList.find(p => p.value === formData.program)?.label}</strong> track and will reach out shortly.
                  </p>
                </div>

                <div className="pt-4">
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
