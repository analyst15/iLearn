import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Hero from './components/Hero';
import Courses from './components/Courses';
import LMSSandbox from './components/LMSSandbox';
import About from './components/About';
import Events from './components/Events';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPortal from './components/AdminPortal';
import { IlearnEvent } from './types';
import { COURSES, TESTIMONIALS, STATS, TRUST_PARTNERS, PARTNER_LOGOS } from './data';
import { 
  Award, ShieldCheck, Heart, Users, Laptop, Briefcase, 
  ChevronRight, ArrowUpRight, Search, X, CheckCircle,
  Calendar, Globe, Languages, Plane, FileText
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [searchOpen, setSearchOpen] = useState(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');

  // Manage events dynamically
  const [events, setEvents] = useState<IlearnEvent[]>(() => {
    try {
      const saved = localStorage.getItem('ilearn_dynamic_events');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const handleAddEvent = (newEvent: IlearnEvent) => {
    const updated = [newEvent, ...events];
    setEvents(updated);
    localStorage.setItem('ilearn_dynamic_events', JSON.stringify(updated));
  };

  const handleDeleteEvent = (id: string) => {
    const updated = events.filter(e => e.id !== id);
    setEvents(updated);
    localStorage.setItem('ilearn_dynamic_events', JSON.stringify(updated));
  };

  // Find course results dynamically in search overlay
  const matchedOverlayCourses = COURSES.filter(course => 
    course.title.toLowerCase().includes(globalSearchQuery.toLowerCase()) || 
    course.description.toLowerCase().includes(globalSearchQuery.toLowerCase())
  );

  const handleQuickNavigate = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="ilearn-app-root" className="min-h-screen bg-white text-[#0B1B3D] overflow-x-hidden flex flex-col justify-between selection:bg-[#10B981] selection:text-white">
      
      {/* 1. SECURE SITE NAVIGATION HEADER */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onSearchOpen={() => setSearchOpen(true)} 
      />

      {/* 2. MAIN BODY TABS SWITCHER RENDERER */}
      <main id="main-content" className="flex-grow">
        <AnimatePresence mode="wait">
          
          {/* TAB: HOME VIEW */}
          {activeTab === 'home' && (
            <motion.div
              key="home-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Marketing Landing Hero banner */}
              <Hero onNavigate={handleQuickNavigate} />

              {/* STATS COUNT GRID SECTION */}
              <section id="metrics-counting-bar" className="relative -mt-10 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 hover:shadow-2xl transition-all duration-300">
                  {STATS.map((stat, idx) => (
                    <div 
                      key={idx} 
                      id={`stat-metric-${idx}`}
                      className="space-y-1.5 p-4 rounded-2xl bg-gray-50/50 hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
                    >
                      <div className="text-3xl sm:text-4xl lg:text-[44px] font-black font-display text-indigo-600 leading-none mb-1.5">
                        {stat.value}
                      </div>
                      <div className="text-sm sm:text-base lg:text-lg font-extrabold font-display text-slate-900 tracking-tight">
                        {stat.label}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans">
                        {stat.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* WHAT WE DO SECTION */}
              <section id="what-we-do-services" className="py-24 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  
                  {/* Title block */}
                  <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <span className="text-indigo-600 text-xs font-bold font-mono tracking-widest uppercase bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100/60">
                      Our Services & Expertise
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 leading-tight">
                      What We Do at iLearn
                    </h3>
                    <p className="text-slate-500 text-sm sm:text-base font-sans max-w-2xl mx-auto">
                      Empowering futures by offering comprehensive proficiency preparation, language classes, official test registration, and visa support services.
                    </p>
                  </div>

                  {/* Services Bento/Grid Layout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    
                    {/* Service Card 1: IELTS Bookings */}
                    <div className="p-6 sm:p-8 bg-slate-50 hover:bg-slate-100/50 border border-slate-100 rounded-3xl custom-shadow hover:translate-y-[-4px] transition-all duration-300 space-y-5 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                            <Calendar className="h-6 w-6" />
                          </div>
                          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-[10px] font-extrabold font-mono uppercase tracking-wide rounded-full border border-indigo-200">
                            Official Partner
                          </span>
                        </div>
                        <h4 className="text-xl font-bold font-display text-slate-900">1. IELTS Exam Booking</h4>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                          At iLearn, we are proud to be an official partner for IELTS exam registration. Whether you're taking the test for study, work, or migration, we guide you every step of the way.
                        </p>
                      </div>
                      <button 
                        onClick={() => handleQuickNavigate('contact')}
                        className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center mt-3 cursor-pointer group"
                      >
                        <span>Book IELTS Exam Session</span>
                        <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>

                    {/* Service Card 2: TOEFL Bookings */}
                    <div className="p-6 sm:p-8 bg-slate-50 hover:bg-slate-100/50 border border-slate-100 rounded-3xl custom-shadow hover:translate-y-[-4px] transition-all duration-300 space-y-5 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                            <Globe className="h-6 w-6" />
                          </div>
                          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-[10px] font-extrabold font-mono uppercase tracking-wide rounded-full border border-indigo-200">
                            Official Partner
                          </span>
                        </div>
                        <h4 className="text-xl font-bold font-display text-slate-900">2. TOEFL Exam Booking</h4>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                          iLearn is an official TOEFL partner, offering reliable and convenient TOEFL exam booking services for students and professionals aiming to go abroad.
                        </p>
                      </div>
                      <button 
                        onClick={() => handleQuickNavigate('contact')}
                        className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center mt-3 cursor-pointer group"
                      >
                        <span>Book TOEFL Exam Session</span>
                        <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>

                    {/* Service Card 3: Proficiency Tests Training */}
                    <div className="p-6 sm:p-8 bg-slate-50 hover:bg-slate-100/50 border border-slate-100 rounded-3xl custom-shadow hover:translate-y-[-4px] transition-all duration-300 space-y-5 flex flex-col justify-between md:col-span-2 lg:col-span-1">
                      <div className="space-y-4">
                        <div className="h-12 w-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                          <Award className="h-6 w-6" />
                        </div>
                        <h4 className="text-xl font-bold font-display text-slate-900">3. Training on Proficiency Tests</h4>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                          We provide training for:
                        </p>
                        
                        {/* Compact Badge Grid of the 7 specified test formats */}
                        <div className="grid grid-cols-3 gap-2 pt-1">
                          {["IELTS", "TOEFL", "PTE", "GRE", "SAT", "GMAT", "DUOLINGO"].map((test) => (
                            <span 
                              key={test} 
                              className="px-2 py-1 bg-white text-indigo-950 font-extrabold font-mono text-[10px] sm:text-[11px] text-center rounded-lg border border-slate-205 shadow-sm"
                            >
                              {test}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button 
                        onClick={() => handleQuickNavigate('courses')}
                        className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center mt-3 cursor-pointer group"
                      >
                        <span>Explore Prep Curriculums</span>
                        <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>

                    {/* Service Card 4: German Language classes */}
                    <div className="p-6 sm:p-8 bg-slate-50 hover:bg-slate-100/50 border border-slate-100 rounded-3xl custom-shadow hover:translate-y-[-4px] transition-all duration-300 space-y-5 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="h-12 w-12 bg-emerald-50 text-[#10B981] rounded-2xl flex items-center justify-center">
                          <Languages className="h-6 w-6" />
                        </div>
                        <h4 className="text-xl font-bold font-display text-slate-900">4. German Training</h4>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                          We provide German classes for levels A1, A2 and B1.
                        </p>
                        
                        <div className="flex items-center gap-2 pt-2">
                          {["A1 Level", "A2 Level", "B1 Level"].map((lvl) => (
                            <span key={lvl} className="flex-1 px-2.5 py-1.5 bg-white text-slate-800 font-extrabold text-[11px] text-center rounded-xl border border-slate-205 shadow-sm">
                              {lvl}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button 
                        onClick={() => handleQuickNavigate('courses')}
                        className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center mt-3 cursor-pointer group"
                      >
                        <span>Join Language Classes</span>
                        <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>

                    {/* Service Card 5: Visit Visa Services */}
                    <div className="p-6 sm:p-8 bg-slate-50 hover:bg-slate-100/50 border border-slate-100 rounded-3xl custom-shadow hover:translate-y-[-4px] transition-all duration-300 space-y-5 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="h-12 w-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center">
                          <Plane className="h-6 w-6 animate-pulse" />
                        </div>
                        <h4 className="text-xl font-bold font-display text-slate-900">5. Visit Visa Services</h4>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                          We facilitate complete consultation and documentation assistance for candidates aiming to travel, visit family, or relocate abroad.
                        </p>
                      </div>
                      <button 
                        onClick={() => handleQuickNavigate('contact')}
                        className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center mt-3 cursor-pointer group"
                      >
                        <span>Inquire About Visas</span>
                        <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>

                    {/* Call to action decorative block inside the grid to even out the 5-grid space nicely! */}
                    <div className="p-6 sm:p-8 bg-gradient-to-br from-[#0B1B3D] to-slate-900 border border-indigo-950 rounded-3xl shadow-xl space-y-5 flex flex-col justify-between text-white relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                      <div className="space-y-3">
                        <span className="text-[#ec4899] text-[10px] uppercase font-bold font-mono tracking-widest bg-pink-500/15 px-2.5 py-1 rounded-full border border-pink-500/20">
                          Need Expert Advice?
                        </span>
                        <h4 className="text-lg font-black font-display text-white mt-1.5 leading-snug">
                          Achieve Your Test & Travel Milestones
                        </h4>
                        <p className="text-[11px] text-slate-300 leading-relaxed font-sans font-light">
                          Our dedicated student support matches you with optimal mock lessons, guides your registration process seamlessly, and advises on visa submission vectors.
                        </p>
                      </div>
                      <button 
                        onClick={() => handleQuickNavigate('contact')}
                        className="text-xs font-extrabold uppercase tracking-wide text-white bg-indigo-600 hover:bg-indigo-500 px-4 py-3.5 rounded-2xl cursor-pointer w-full text-center transition-all"
                      >
                        Book Consultation
                      </button>
                    </div>

                  </div>
                </div>
              </section>

              {/* PARTNER LOGOS AUTOMATIC SLIDING MARQUEE SECTION */}
              <section id="partner-logos-marquee" className="py-14 bg-slate-50 border-t border-b border-slate-100/60 overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
                  <span className="text-[10px] sm:text-xs font-mono font-black uppercase tracking-[0.25em] text-indigo-600 bg-indigo-50 px-3.5 py-1.5 rounded-full">
                    TRUSTED OFFICIAL TESTING & ACADEMIC PARTNERS
                  </span>
                </div>
                
                {/* Rolling track container with gradient fade edges */}
                <div className="relative w-full flex items-center overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
                  <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
                  
                  <div className="flex gap-6 sm:gap-8 animate-marquee whitespace-nowrap shrink-0">
                    {[...PARTNER_LOGOS, ...PARTNER_LOGOS, ...PARTNER_LOGOS, ...PARTNER_LOGOS].map((partner, idx) => (
                      <div 
                        key={idx} 
                        className="inline-flex flex-shrink-0 items-center justify-center w-[180px] sm:w-[220px] h-20 sm:h-24 bg-white px-6 py-4 rounded-2xl border border-slate-100/80 shadow-[0_3px_10px_rgba(0,0,0,0.015)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.03)] hover:scale-[1.02] transition-all duration-300"
                      >
                        <img 
                          src={partner.logo} 
                          alt={partner.name}
                          className="max-h-12 sm:max-h-14 max-w-full object-contain filter brightness-100 hover:brightness-105"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* TRUST & TESTIMONIAL REVIEW CARDS SECTION */}
              <section id="customers-testimonials-catalog" className="py-24 bg-[#B0059D] text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  
                  {/* Title */}
                  <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                    <span className="text-white text-xs font-bold font-mono tracking-widest uppercase bg-white/15 border border-white/20 px-3 py-1.5 rounded-full">
                      Success Stories
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
                      What Our Successful Candidates Say
                    </h3>
                    <p className="text-pink-100 text-xs sm:text-sm font-sans leading-relaxed">
                      Real reviews from candidates who achieved their target band scores, improved their proficiency, and realized their global aspirations with iLearn.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {TESTIMONIALS.map((t) => (
                      <div 
                        key={t.id}
                        id={`review-card-${t.id}`}
                        className="p-6 sm:p-8 bg-white border border-pink-100/10 rounded-3xl float-none flex flex-col justify-between hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                      >
                        <p className="text-slate-700 text-xs sm:text-sm leading-relaxed italic mb-8">
                          "{t.comment}"
                        </p>
                        
                        <div className="flex items-center justify-between pt-5 border-t border-slate-100">
                          <div>
                            <strong className="block text-xs sm:text-sm font-bold text-slate-900 font-display">{t.name}</strong>
                            <span className="text-[10px] sm:text-xs text-indigo-600 font-sans font-semibold block mt-0.5">{t.role}</span>
                            <span className="text-[9px] text-slate-500 font-sans font-medium block">{t.organization}</span>
                          </div>
                          
                          {/* Rating stars rendering */}
                          <div className="flex text-amber-500 font-semibold text-xs sm:text-sm font-mono tracking-widest leading-none self-end pb-1">
                            ★★★★★
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </section>

            </motion.div>
          )}

          {/* TAB: CATALOG / COURSES LIST */}
          {activeTab === 'courses' && (
            <motion.div
              key="courses-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="pt-14 sm:pt-16 lg:pt-20"
            >
              <Courses />
            </motion.div>
          )}

          {/* TAB: LMS SERVICE PLATFORM */}
          {activeTab === 'lms' && (
            <motion.div
              key="lms-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="pt-14 sm:pt-16 lg:pt-20"
            >
              <LMSSandbox />
            </motion.div>
          )}

          {/* TAB: EVENTS HUB */}
          {activeTab === 'events' && (
            <motion.div
              key="events-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="pt-14 sm:pt-16 lg:pt-20"
            >
              <Events events={events} />
            </motion.div>
          )}

          {/* TAB: ADMIN PORTAL */}
          {activeTab === 'admin' && (
            <motion.div
              key="admin-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="pt-14 sm:pt-16 lg:pt-20"
            >
              <AdminPortal 
                events={events}
                onAddEvent={handleAddEvent}
                onDeleteEvent={handleDeleteEvent}
                onNavigate={handleQuickNavigate}
              />
            </motion.div>
          )}

          {/* TAB: STORY ABOUT */}
          {activeTab === 'about' && (
            <motion.div
              key="about-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="pt-14 sm:pt-16 lg:pt-20"
            >
              <About />
            </motion.div>
          )}

          {/* TAB: CONTACT US */}
          {activeTab === 'contact' && (
            <motion.div
              key="contact-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="pt-14 sm:pt-16 lg:pt-20"
            >
              <Contact />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* 3. COMPREHENSIVE LEGAL BRAND FOOTER */}
      <Footer onNavigate={handleQuickNavigate} />

      {/* 4. DYNAMIC GLOBAL SEARCH PORTAL OVERLAY */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0B1B3D]/95 backdrop-blur-md z-50 flex flex-col p-4 sm:p-8"
          >
            {/* Header bar of search overlay */}
            <div className="max-w-3xl mx-auto w-full flex justify-end mb-6 pt-4">
              <button 
                onClick={() => {
                  setSearchOpen(false);
                  setGlobalSearchQuery('');
                }}
                className="p-2 text-gray-400 hover:text-white bg-white/5 border border-white/10 rounded-xl cursor-pointer"
              >
                <X className="h-5 w-5 pointer-events-none" />
              </button>
            </div>

            {/* Main Search controls center */}
            <div className="max-w-3xl mx-auto w-full flex-grow flex flex-col justify-start space-y-6">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-bold font-display text-white">Direct Course Finder</h3>
                <p className="text-xs text-gray-400 font-sans">Enter core credentials keywords (e.g. Infection, GDPR, Safeguarding)</p>
              </div>

              <div className="relative">
                <Search className="absolute left-4 top-4.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Start typing training name..."
                  value={globalSearchQuery}
                  onChange={(e) => setGlobalSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 text-white rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent font-sans"
                />
              </div>

              {/* Scrollable outputs of match list */}
              <div className="flex-grow overflow-y-auto max-h-[380px] space-y-2 pr-2 scrollbar-none pb-8">
                {globalSearchQuery && matchedOverlayCourses.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => {
                      setSearchOpen(false);
                      setGlobalSearchQuery('');
                      setActiveTab('courses');
                      // Scroll to results cleanly
                      setTimeout(() => {
                        const targetCard = document.getElementById(`course-card-${c.id}`);
                        if (targetCard) {
                          targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          targetCard.classList.add('ring-4', 'ring-[#10B981]/50');
                          setTimeout(() => {
                            targetCard.classList.remove('ring-4', 'ring-[#10B981]/50');
                          }, 3000);
                        }
                      }, 400);
                    }}
                    className="w-full text-left p-4.5 bg-white/2 hover:bg-[#1E3A8A]/30 border border-white/5 hover:border-[#10B981]/30 rounded-xl cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div>
                      <span className="text-[9px] font-mono text-emerald-400 font-semibold uppercase tracking-wider block">{c.category}</span>
                      <strong className="text-[#F1F5F9] font-display text-sm block mt-0.5 group-hover:text-[#10B981] transition-colors">{c.title}</strong>
                      <p className="text-[11px] text-gray-400 truncate mt-1 max-w-sm sm:max-w-lg leading-relaxed">{c.description}</p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-gray-500 group-hover:text-white transition-colors" />
                  </div>
                ))}

                {globalSearchQuery && matchedOverlayCourses.length === 0 && (
                  <p className="text-center text-xs text-gray-500 py-8">No accredited training modules match this specific search.</p>
                )}

                {!globalSearchQuery && (
                  <div className="text-center text-xs text-gray-500 py-8 space-y-1">
                    <p>Enter search keywords above or select popular training pathways:</p>
                    <div className="flex flex-wrap justify-center gap-2 pt-3">
                      {['The Care Certificate', 'Dementia Care', 'GDPR', 'LMS'].map((kw) => (
                        <button
                          key={kw}
                          onClick={() => setGlobalSearchQuery(kw)}
                          className="px-3 py-1.5 bg-white/5 border border-white/5 hover:border-white/15 text-gray-300 rounded-lg text-xs cursor-pointer"
                        >
                          {kw}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
