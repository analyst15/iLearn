import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  UserCheck, 
  User, 
  Hash, 
  GraduationCap, 
  Calendar, 
  Building2, 
  Phone, 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw
} from 'lucide-react';

export default function AgentRegistration() {
  const [formData, setFormData] = useState({
    studentFirstName: '',
    studentLastName: '',
    studentReferenceNumber: '',
    examType: 'IELTS',
    bookingDate: '',
    examDate: '',
    agencyName: '',
    agentsName: '',
    agentsPhone: '',
    agentsEmail: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const examTypes = [
    { value: 'IELTS', label: 'IELTS (Academic/General)' },
    { value: 'PTE', label: 'PTE Academic' },
    { value: 'OET', label: 'OET (Occupational English Test)' },
    { value: 'TOEFL', label: 'TOEFL iBT' },
    { value: 'Duolingo', label: 'Duolingo English Test' },
    { value: 'GMAT', label: 'GMAT' },
    { value: 'GRE', label: 'GRE' },
    { value: 'SAT', label: 'SAT' },
    { value: 'Other', label: 'Other Exam / Training Track' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');

    // Client-side quick checks
    if (
      !formData.studentFirstName.trim() ||
      !formData.studentLastName.trim() ||
      !formData.studentReferenceNumber.trim() ||
      !formData.examType ||
      !formData.bookingDate ||
      !formData.examDate ||
      !formData.agencyName.trim() ||
      !formData.agentsName.trim() ||
      !formData.agentsPhone.trim() ||
      !formData.agentsEmail.trim()
    ) {
      setSubmitError('All fields are strictly required.');
      setSubmitting(false);
      return;
    }

    // Ensure examDate is not before bookingDate
    if (formData.examDate < formData.bookingDate) {
      setSubmitError('The Exam Date cannot be earlier than the Booking Date.');
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'agent-registration',
          data: formData
        })
      });

      const resData = await response.json();
      if (response.ok && resData.success) {
        setSubmitted(true);
      } else {
        setSubmitError(resData.error || 'Failed to submit referral. Please try again or contact support.');
      }
    } catch (err) {
      setSubmitError('A connection error occurred. Please check your network and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      studentFirstName: '',
      studentLastName: '',
      studentReferenceNumber: '',
      examType: 'IELTS',
      bookingDate: '',
      examDate: '',
      agencyName: '',
      agentsName: '',
      agentsPhone: '',
      agentsEmail: ''
    });
    setSubmitted(false);
    setSubmitError('');
  };


  return (
    <section id="agents-referral-section" className="py-20 sm:py-24 bg-slate-50 text-slate-900 border-b border-slate-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div id="agents-header" className="text-center mb-12 space-y-4">
          <span className="text-emerald-700 text-xs sm:text-sm font-bold font-mono tracking-widest uppercase bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-100">
            Agents & Partners Portal
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-slate-900 tracking-tight">
            Refer & Register Students
          </h2>
          <p className="text-slate-500 text-xs sm:text-base leading-relaxed max-w-2xl mx-auto">
            Authorized agency partners can submit student exam booking details directly below. Upon submission, an email verification is transmitted to secure tracking systems.
          </p>
        </div>

        {/* Core referral card form */}
        <div id="agents-referral-card" className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-100 relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form 
                key="referral-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8"
              >
                {/* 1. SECTION: STUDENT INFORMATION */}
                <div className="space-y-5">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <UserCheck className="h-5 w-5 text-emerald-600" />
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">Student Details</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-2">Student First Name *</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                        <input
                          type="text"
                          required
                          value={formData.studentFirstName}
                          onChange={(e) => setFormData({ ...formData, studentFirstName: e.target.value })}
                          placeholder="e.g. John"
                          className="w-full bg-slate-50/50 border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl py-3 pl-11 pr-4 text-xs sm:text-sm focus:outline-none transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-2">Student Last Name *</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                        <input
                          type="text"
                          required
                          value={formData.studentLastName}
                          onChange={(e) => setFormData({ ...formData, studentLastName: e.target.value })}
                          placeholder="e.g. Smith"
                          className="w-full bg-slate-50/50 border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl py-3 pl-11 pr-4 text-xs sm:text-sm focus:outline-none transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-2">Student Reference Number *</label>
                      <div className="relative">
                        <Hash className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                        <input
                          type="text"
                          required
                          value={formData.studentReferenceNumber}
                          onChange={(e) => setFormData({ ...formData, studentReferenceNumber: e.target.value })}
                          placeholder="e.g. REF-10928"
                          className="w-full bg-slate-50/50 border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl py-3 pl-11 pr-4 text-xs sm:text-sm focus:outline-none transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-2">Exam Type *</label>
                      <div className="relative">
                        <GraduationCap className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                        <select
                          required
                          value={formData.examType}
                          onChange={(e) => setFormData({ ...formData, examType: e.target.value })}
                          className="w-full bg-slate-50/50 border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl py-3 pl-11 pr-4 text-xs sm:text-sm focus:outline-none transition-all duration-200 appearance-none"
                        >
                          {examTypes.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-2">Booking Date *</label>
                      <div className="relative">
                        <Calendar className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                        <input
                          type="date"
                          required
                          value={formData.bookingDate}
                          onChange={(e) => {
                            const newBooking = e.target.value;
                            setFormData(prev => ({
                              ...prev,
                              bookingDate: newBooking,
                              // If examDate exists and is before the new booking date, align it to the booking date
                              examDate: prev.examDate && prev.examDate < newBooking ? newBooking : prev.examDate
                            }));
                          }}
                          className="w-full bg-slate-50/50 border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl py-3 pl-11 pr-4 text-xs sm:text-sm focus:outline-none transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-2">Exam Date *</label>
                      <div className="relative">
                        <Calendar className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                        <input
                          type="date"
                          required
                          min={formData.bookingDate}
                          value={formData.examDate}
                          onChange={(e) => setFormData({ ...formData, examDate: e.target.value })}
                          className="w-full bg-slate-50/50 border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl py-3 pl-11 pr-4 text-xs sm:text-sm focus:outline-none transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. SECTION: AGENCY & AGENT CONTACTS */}
                <div className="space-y-5 pt-4">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Building2 className="h-5 w-5 text-emerald-600" />
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display">Agents Details</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-2">Agency Name *</label>
                      <div className="relative">
                        <Building2 className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                        <input
                          type="text"
                          required
                          value={formData.agencyName}
                          onChange={(e) => setFormData({ ...formData, agencyName: e.target.value })}
                          placeholder="e.g. Apex Global Ltd"
                          className="w-full bg-slate-50/50 border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl py-3 pl-11 pr-4 text-xs sm:text-sm focus:outline-none transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-2">Agent's Name *</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                        <input
                          type="text"
                          required
                          value={formData.agentsName}
                          onChange={(e) => setFormData({ ...formData, agentsName: e.target.value })}
                          placeholder="e.g. Sarah Connor"
                          className="w-full bg-slate-50/50 border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl py-3 pl-11 pr-4 text-xs sm:text-sm focus:outline-none transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-2">Agent's Phone Number *</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                        <input
                          type="tel"
                          required
                          value={formData.agentsPhone}
                          onChange={(e) => setFormData({ ...formData, agentsPhone: e.target.value })}
                          placeholder="e.g. +44 7911 123456"
                          className="w-full bg-slate-50/50 border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl py-3 pl-11 pr-4 text-xs sm:text-sm focus:outline-none transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-2">Agent's Email Address *</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                        <input
                          type="email"
                          required
                          value={formData.agentsEmail}
                          onChange={(e) => setFormData({ ...formData, agentsEmail: e.target.value })}
                          placeholder="e.g. partner@agency.com"
                          className="w-full bg-slate-50/50 border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl py-3 pl-11 pr-4 text-xs sm:text-sm focus:outline-none transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>
                </div>



                {/* Submit Action Block */}
                {submitError && (
                  <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-rose-700 font-medium">{submitError}</p>
                  </div>
                )}

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-bold text-xs sm:text-sm px-8 py-4 rounded-2xl shadow-md transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer hover:shadow-lg"
                  >
                    {submitting ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <span>Transmitting Securely...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Student Referral</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div 
                key="referral-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 space-y-6"
              >
                <div className="inline-flex items-center justify-center p-4 bg-emerald-50 rounded-full border border-emerald-100">
                  <CheckCircle2 className="h-12 w-12 text-emerald-600" />
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-2xl font-black text-slate-900 font-display">Referral Submitted Successfully</h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
                    Excellent work! The student referral details have been successfully received and logged on our secure notifications system.
                  </p>



                  <div className="bg-slate-50 border border-slate-100/65 rounded-2xl p-4 max-w-md mx-auto mt-4 text-left space-y-2 text-xs text-slate-700">
                    <p><strong>Student:</strong> {formData.studentFirstName} {formData.studentLastName}</p>
                    <p><strong>Exam Track:</strong> {formData.examType}</p>
                    <p><strong>Reference:</strong> {formData.studentReferenceNumber}</p>
                    <p><strong>Agency:</strong> {formData.agencyName}</p>
                    <p><strong>Agent:</strong> {formData.agentsName}</p>
                  </div>
                </div>

                <div className="pt-4 flex justify-center">
                  <button
                    onClick={handleReset}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-sm transition-all duration-150 cursor-pointer flex items-center gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    <span>Submit Another Referral</span>
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
