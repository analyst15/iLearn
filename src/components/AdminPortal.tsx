import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, Calendar, Plus, Trash2, LogOut, CheckCircle2, User, MapPin, Tag, Clock, Users, ArrowLeft 
} from 'lucide-react';
import { IlearnEvent } from '../types';

interface AdminPortalProps {
  events: IlearnEvent[];
  onAddEvent: (newEvent: IlearnEvent) => void;
  onDeleteEvent: (id: string) => void;
  onNavigate: (tabId: string) => void;
}

export default function AdminPortal({ events, onAddEvent, onDeleteEvent, onNavigate }: AdminPortalProps) {
  // Authentication states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('ilearn_admin_logged_in') === 'true');
  const [authError, setAuthError] = useState('');

  // Event Creation Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Workshop');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [speaker, setSpeaker] = useState('');
  const [spotsLeft, setSpotsLeft] = useState(15);
  const [description, setDescription] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Hardcoded secure auth for this sandbox application
  const AUTHORIZED_EMAIL = 'admin@ilearn-global.com';
  const AUTHORIZED_PASSWORD = 'Analyst@150';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().toLowerCase() === AUTHORIZED_EMAIL && password === AUTHORIZED_PASSWORD) {
      localStorage.setItem('ilearn_admin_logged_in', 'true');
      setIsLoggedIn(true);
      setAuthError('');
    } else {
      setAuthError('Invalid administrator credentials.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('ilearn_admin_logged_in');
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !location || !speaker || !description) {
      alert('Please fill out all fields.');
      return;
    }

    const newEvent: IlearnEvent = {
      id: `evt-${Date.now()}`,
      title,
      category,
      date,
      location,
      speaker,
      spotsLeft: Number(spotsLeft) || 15,
      description
    };

    onAddEvent(newEvent);

    // Reset Form
    setTitle('');
    setCategory('Workshop');
    setDate('');
    setLocation('');
    setSpeaker('');
    setSpotsLeft(15);
    setDescription('');

    // Success notification
    setSuccessMsg('Event added successfully!');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <section id="admin-portal-container" className="py-24 bg-slate-50 min-h-[80vh] flex flex-col justify-start">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold transition-colors cursor-pointer text-xs uppercase tracking-wider"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </button>
          
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-colors"
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {!isLoggedIn ? (
            /* =================== LOGIN SCREEN =================== */
            <motion.div
              key="auth-login-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-md mx-auto"
            >
              <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-md space-y-6">
                
                <div className="text-center space-y-2">
                  <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto border border-indigo-100">
                    <Lock className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-black font-display text-slate-900">Admin Portal</h2>
                  <p className="text-slate-500 text-xs">
                    Please log in to manage, schedule, and delete global academic events.
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">

                  {authError && (
                    <div className="bg-rose-50 border border-rose-100 text-rose-600 rounded-xl p-3 text-xs font-bold font-sans text-center">
                      {authError}
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest">
                      Admin Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-indigo-100 active:scale-98"
                  >
                    Authenticate Account
                  </button>
                </form>

              </div>
            </motion.div>
          ) : (
            /* =================== EVENT CREATOR DASHBOARD =================== */
            <motion.div
              key="portal-management-dashboard"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              
              {/* Col Span 5: Event Creator form */}
              <div className="lg:col-span-5 bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 h-fit">
                <div className="space-y-1">
                  <span className="text-[10px] sm:text-xs font-bold font-mono tracking-widest text-indigo-600 uppercase">
                    Admin Tools
                  </span>
                  <h3 className="text-xl font-bold font-display text-slate-900">
                    Create New Event
                  </h3>
                </div>

                <form onSubmit={handleCreateEvent} className="space-y-4">
                  {successMsg && (
                    <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-xl p-3 text-xs font-bold flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>{successMsg}</span>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest">
                      Event Title
                    </label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. IELTS Monthly Diagnostic Trial"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest">
                        Category
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 cursor-pointer"
                      >
                        <option value="Workshop">Workshop</option>
                        <option value="Mock Exam">Mock Exam</option>
                        <option value="Webinar">Webinar</option>
                        <option value="Masterclass">Masterclass</option>
                        <option value="Seminar">Seminar</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest">
                        Available Seats
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="500"
                        required
                        value={spotsLeft}
                        onChange={(e) => setSpotsLeft(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest">
                      Date & Time Info
                    </label>
                    <input
                      type="text"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      placeholder="e.g. Every Saturday at 10:00 AM"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest">
                      Location / Platform
                    </label>
                    <input
                      type="text"
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Westlands Nairobi or Zoom"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest">
                      Lead Facilitator
                    </label>
                    <input
                      type="text"
                      required
                      value={speaker}
                      onChange={(e) => setSpeaker(e.target.value)}
                      placeholder="e.g. Dr. Lynn Abungu"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest">
                      Short Description
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="A brief overview of the topics, goals, or preparation requirements."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-indigo-100"
                  >
                    <Plus className="h-4 w-4" /> Add Event Schedule
                  </button>
                </form>
              </div>

              {/* Col Span 7: Event Management list */}
              <div className="lg:col-span-7 bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-lg font-bold font-display text-slate-900">
                      Scheduled Events List
                    </h3>
                    <p className="text-slate-500 text-xs mt-0.5">
                      {events.length} active events registered in student view.
                    </p>
                  </div>
                  <button 
                    onClick={() => onNavigate('events')}
                    className="text-xs text-indigo-600 hover:underline font-bold"
                  >
                    View Events Page
                  </button>
                </div>

                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-none">
                  {events.length === 0 ? (
                    <div className="text-center py-16 px-4 space-y-3">
                      <Calendar className="h-10 w-10 text-slate-300 mx-auto" />
                      <p className="text-sm font-medium text-slate-400">No events found storage.</p>
                      <p className="text-xs text-slate-400">Use the form on the left to add your first event.</p>
                    </div>
                  ) : (
                    events.map((evt) => (
                      <div 
                        key={evt.id}
                        className="p-5 border border-slate-100 rounded-2xl bg-slate-50 hover:bg-slate-50/85 transition-colors flex items-start justify-between gap-4"
                      >
                        <div className="space-y-2 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="px-2 py-0.5 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-full text-[9px] font-bold font-mono tracking-widest uppercase">
                              {evt.category}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">ID: {evt.id}</span>
                          </div>

                          <h4 className="text-sm font-bold font-display text-slate-900 leading-tight">
                            {evt.title}
                          </h4>

                          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-slate-500 font-sans">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                              <span className="truncate">{evt.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                              <span className="truncate">{evt.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                              <span className="truncate">By: {evt.speaker}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Tag className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                              <span>{evt.spotsLeft} seats remaining</span>
                            </div>
                          </div>

                          <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                            {evt.description}
                          </p>
                        </div>

                        <button
                          onClick={() => onDeleteEvent(evt.id)}
                          className="p-2 border border-rose-100 text-rose-500 rounded-xl hover:bg-rose-50/50 hover:text-rose-600 cursor-pointer shrink-0 transition-colors"
                          title="Delete Event"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>

              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
