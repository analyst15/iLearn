import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { COURSES } from '../data';
import { Course } from '../types';
import { 
  Search, Filter, Clock, GraduationCap, Award, BookOpen, 
  HelpCircle, ChevronRight, CheckCircle2, 
  Users, Sparkles, Check, X, ShieldCheck, PhoneCall, HelpCircle as HelpIcon
} from 'lucide-react';

export default function Courses() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'english-proficiency' | 'academic-admissions'>('all');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  
  // Free sample class scheduling state
  const [trialModalOpen, setTrialModalOpen] = useState(false);
  const [selectedTrialTopic, setSelectedTrialTopic] = useState<Course | null>(null);
  const [trialForm, setTrialForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    prepStatus: 'just-starting',
    deliveryMode: 'physical'
  });
  const [trialBooked, setTrialBooked] = useState(false);

  // Filter courses based on search query and category
  const filteredCourses = COURSES.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.accreditation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || course.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleTrialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTrialBooked(true);
    setTimeout(() => {
      setTrialBooked(false);
      setTrialModalOpen(false);
      setTrialForm({
        fullName: '',
        email: '',
        phone: '',
        prepStatus: 'just-starting',
        deliveryMode: 'physical'
      });
    }, 2800);
  };

  const getCategoryBadge = (category: string) => {
    if (category === 'english-proficiency') {
      return {
        label: 'English Proficiency',
        style: 'bg-emerald-50 text-emerald-700 border-emerald-100/80'
      };
    }
    return {
      label: 'Academic Admissions',
      style: 'bg-indigo-50 text-indigo-700 border-indigo-100/80'
    };
  };

  return (
    <section id="courses-catalog-container" className="py-24 bg-slate-50 text-slate-900 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div id="catalog-header-text" className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-indigo-600 text-xs sm:text-sm font-bold font-mono tracking-widest uppercase bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100/60">
            Professional Exam Coaching
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-slate-900">
            Our Elite Prep Programs
          </h2>
          <p className="text-slate-500 text-xs sm:text-base font-sans leading-relaxed max-w-2xl mx-auto">
            Choose from our specialized premium physical or online training modules. Accelerate your performance and surpass target scores with official exam techniques.
          </p>
        </div>



        {/* Search & Filters block */}
        <div id="catalog-controls" className="bg-white rounded-3xl p-5 mb-12 shadow-sm border border-slate-100 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Live Search */}
            <div className="relative w-full">
              <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                id="catalog-search-input"
                placeholder="Search classes (e.g., IELTS, GMAT, Speaking...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-xs sm:text-sm text-slate-905 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Scrolling filter categories */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none border-t border-slate-100/85 pt-4">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                activeFilter === 'all'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/50'
              }`}
            >
              All Programs
            </button>
            <button
              onClick={() => setActiveFilter('english-proficiency')}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                activeFilter === 'english-proficiency'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/50'
              }`}
            >
              English Proficiency (IELTS, TOEFL, PTE, Duolingo)
            </button>
            <button
              onClick={() => setActiveFilter('academic-admissions')}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                activeFilter === 'academic-admissions'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/50'
              }`}
            >
              Academic Admissions (GMAT, GRE, SAT)
            </button>
          </div>
        </div>

        {/* 7 Elite Classes Grid */}
        <div id="courses-results-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => {
            const badge = getCategoryBadge(course.category);
            return (
              <div 
                key={course.id}
                id={`course-card-${course.id}`}
                className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-2xl hover:translate-y-[-4px] transition-all duration-300 group"
              >
                <div className="space-y-4">
                  {/* Category Header */}
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-lg border ${badge.style}`}>
                      {badge.label}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 font-bold">
                      {course.duration}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black font-display text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans">
                    {course.description}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-slate-100">
                    {course.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="h-4 w-4 text-indigo-500 shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-end gap-2.5">
                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="px-4.5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-705 text-slate-700 text-xs font-bold rounded-xl border border-slate-200/50 cursor-pointer"
                  >
                    Syllabus
                  </button>
                  <button
                    onClick={() => {
                      setSelectedTrialTopic(course);
                      setTrialModalOpen(true);
                    }}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer active:scale-95 transition-all"
                  >
                    Book Class
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dialog 1: Course Syllabus Details Modal */}
        <AnimatePresence>
          {selectedCourse && (
            <div className="fixed inset-0 bg-[#0B1B3D]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-150 relative space-y-6 max-h-[90vh] overflow-y-auto"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-mono font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
                      Official Training Syllabus
                    </span>
                    <h3 className="text-2xl font-extrabold font-display text-slate-900 pt-2">{selectedCourse.title}</h3>
                  </div>
                  <button 
                    onClick={() => setSelectedCourse(null)}
                    className="p-1 px-3 text-slate-400 hover:text-slate-905 hover:bg-slate-100 bg-slate-50 rounded-xl text-xs cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                  <p className="font-medium text-slate-800 italic">"At iLearn, we are dedicated to providing top-notch training and support to help you achieve your professional and academic goals."</p>
                  
                  <div className="grid grid-cols-2 gap-4 py-3 border-t border-b border-slate-100">
                    <div>
                      <strong className="block text-[10px] uppercase font-mono text-slate-400">Duration Range</strong>
                      <span className="font-semibold text-slate-800">{selectedCourse.duration} Intensive</span>
                    </div>
                    <div>
                      <strong className="block text-[10px] uppercase font-mono text-slate-400 font-bold">Certification Status</strong>
                      <span className="font-semibold text-indigo-600">{selectedCourse.accreditation}</span>
                    </div>
                    <div>
                      <strong className="block text-[10px] uppercase font-mono text-slate-400">Target Level</strong>
                      <span className="font-semibold text-slate-800">{selectedCourse.level}</span>
                    </div>
                    <div>
                      <strong className="block text-[10px] uppercase font-mono text-slate-400">Support Access</strong>
                      <span className="font-semibold text-emerald-600">Included (Advisors)</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-bold text-slate-900 font-display text-xs uppercase tracking-wider text-indigo-600">Core Modular Objectives</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      We warmly schedule classes around your current calendar. Check out what you acquire during the syllabus duration:
                    </p>
                    <ul className="space-y-2.5 pl-1">
                      {selectedCourse.highlights.map((h, i) => (
                        <li key={i} className="flex gap-2 items-start text-xs text-slate-600">
                          <CheckCircle2 className="h-4.5 w-4.5 text-indigo-600 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                      <li className="flex gap-2 items-start text-xs text-slate-600">
                        <CheckCircle2 className="h-4.5 w-4.5 text-indigo-600 shrink-0 mt-0.5" />
                        <span>Interactive physical or online whiteboard access with direct video recording capabilities.</span>
                      </li>
                      <li className="flex gap-2 items-start text-xs text-slate-600">
                        <CheckCircle2 className="h-4.5 w-4.5 text-indigo-600 shrink-0 mt-0.5" />
                        <span>Calm testing mock environment identical to official exam days to release anxiety.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex gap-3">
                  <button
                    onClick={() => {
                      setSelectedTrialTopic(selectedCourse);
                      setSelectedCourse(null);
                      setTrialModalOpen(true);
                    }}
                    className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl text-center cursor-pointer active:scale-95 transition-all"
                  >
                    Enroll in Class
                  </button>
                  <button
                    onClick={() => setSelectedCourse(null)}
                    className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
                  >
                    Close
                  </button>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Dialog 2: Free Trial / Enrollment Modal overlay */}
        <AnimatePresence>
          {trialModalOpen && selectedTrialTopic && (
            <div className="fixed inset-0 bg-[#0B1B3D]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-150 space-y-5"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono font-bold tracking-wider uppercase text-pink-600 bg-pink-50 px-2.5 py-1 rounded-md block w-max">
                      Book Admission / Trial
                    </span>
                    <h4 className="text-xl font-bold font-display text-slate-905 pt-2">
                      {selectedTrialTopic.title} Prep
                    </h4>
                  </div>
                  <button 
                    onClick={() => setTrialModalOpen(false)}
                    className="p-1 px-3 text-slate-400 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-xl text-xs cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                {trialBooked ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="h-14 w-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                      <Check className="h-8 w-8 animate-bounce" />
                    </div>
                    <h5 className="text-lg font-bold font-display text-slate-900">Registration Success!</h5>
                    <p className="text-xs text-slate-500 leading-relaxed px-4">
                      Thank you for choosing iLearn! We have reserved your seat/consultation slot for <strong>{selectedTrialTopic.title}</strong>. An advisor has been notified and will email you with schedules in under 2 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleTrialSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={trialForm.fullName}
                        onChange={(e) => setTrialForm({...trialForm, fullName: e.target.value})}
                        placeholder="E.g. Lynn Abungu"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={trialForm.email}
                        onChange={(e) => setTrialForm({...trialForm, email: e.target.value})}
                        placeholder="E.g. lynn@gmail.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={trialForm.phone}
                        onChange={(e) => setTrialForm({...trialForm, phone: e.target.value})}
                        placeholder="E.g. +254 700 000 000"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Preparation Phase</label>
                        <select
                          value={trialForm.prepStatus}
                          onChange={(e) => setTrialForm({...trialForm, prepStatus: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 cursor-pointer"
                        >
                          <option value="just-starting">Just Starting Out</option>
                          <option value="booked-exam">Booked Official Date</option>
                          <option value="retaking">Retaking Polish</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Class Delivery Mode</label>
                        <select
                          value={trialForm.deliveryMode}
                          onChange={(e) => setTrialForm({...trialForm, deliveryMode: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 cursor-pointer"
                        >
                          <option value="physical">Physical Classroom</option>
                          <option value="online">Live Online Zoom</option>
                          <option value="hybrid">Hybrid Mix</option>
                        </select>
                      </div>
                    </div>

                    <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100/60 flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-indigo-600 shrink-0" />
                      <span className="text-[10px] text-slate-500 font-medium leading-tight">
                        Our admissions office schedules trial lessons as per individual student availability.
                      </span>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-bold uppercase tracking-widest shadow-md cursor-pointer active:scale-95 transition-all text-center block mt-3"
                    >
                      Confirm Seat Request
                    </button>
                  </form>
                )}

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
