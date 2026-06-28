import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, Calendar, Plus, Trash2, LogOut, CheckCircle2, User, MapPin, Tag, Clock, Users, ArrowLeft, Mail, Phone, MessageSquare,
  FileSpreadsheet, AlertCircle, RefreshCw, ExternalLink, Check, Award, ShieldAlert
} from 'lucide-react';
import { IlearnEvent, SessionBooking } from '../types';

interface AdminPortalProps {
  events: IlearnEvent[];
  onAddEvent: (newEvent: IlearnEvent) => void;
  onDeleteEvent: (id: string) => void;
  onNavigate: (tabId: string) => void;
  bookings: SessionBooking[];
  onDeleteBooking: (id: string) => void;
}

export default function AdminPortal({ 
  events, 
  onAddEvent, 
  onDeleteEvent, 
  onNavigate,
  bookings = [],
  onDeleteBooking
}: AdminPortalProps) {
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
  const [activeSubTab, setActiveSubTab] = useState<'events' | 'bookings' | 'referrals'>('events');

  // Agent Referrals and Central Google Sheets Integration states
  const [referrals, setReferrals] = useState<any[]>([]);
  const [googleScriptUrl, setGoogleScriptUrl] = useState('');
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [sheetsMessage, setSheetsMessage] = useState('');
  const [isSyncingAll, setIsSyncingAll] = useState(false);
  const [syncingId, setSyncingId] = useState<string | null>(null);

  const [syncedIds, setSyncedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ilearn_synced_referral_ids');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Track syncedIds in localStorage
  useEffect(() => {
    localStorage.setItem('ilearn_synced_referral_ids', JSON.stringify(syncedIds));
  }, [syncedIds]);

  // Load agent referrals and central sheet setting on login
  const fetchReferrals = async () => {
    try {
      const response = await fetch('/api/agent-referrals');
      if (response.ok) {
        const data = await response.json();
        setReferrals(data);
      }
    } catch (err) {
      console.error('Error fetching referrals:', err);
    }
  };

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      if (response.ok) {
        const data = await response.json();
        setGoogleScriptUrl(data.googleScriptUrl || '');
      }
    } catch (err) {
      console.error('Error fetching settings:', err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchReferrals();
      fetchSettings();
    }
  }, [isLoggedIn]);

  // Handle deleting individual referral
  const handleDeleteReferral = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this agent referral record?')) return;
    try {
      const response = await fetch(`/api/agent-referrals/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setReferrals((prev) => prev.filter((r) => r.id !== id));
      }
    } catch (err) {
      console.error('Error deleting referral:', err);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    setSheetsMessage('');
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ googleScriptUrl })
      });
      if (response.ok) {
        setSheetsMessage('Google Apps Script URL saved successfully.');
      } else {
        setSheetsMessage('Failed to save settings.');
      }
    } catch (err) {
      console.error('Error saving settings:', err);
      setSheetsMessage('Error saving settings.');
    } finally {
      setIsSavingSettings(false);
    }
  };

  const handleSyncReferral = async (referral: any) => {
    if (!googleScriptUrl) {
      setSheetsMessage('Please configure and save the Google Apps Script Web App URL first.');
      return;
    }
    setSyncingId(referral.id);
    setSheetsMessage('');
    try {
      const response = await fetch('/api/sync-to-central', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ referralId: referral.id })
      });
      const data = await response.json();
      if (data.success) {
        setSyncedIds((prev) => {
          if (prev.includes(referral.id)) return prev;
          return [...prev, referral.id];
        });
        setSheetsMessage(`Successfully synced student ${referral.studentFirstName} to Google Sheet!`);
      } else {
        setSheetsMessage(`Sync failed: ${data.error || 'Server error'}`);
      }
    } catch (err: any) {
      console.error('Error syncing individual referral:', err);
      setSheetsMessage(`Failed to sync: ${err.message || 'Unknown error'}`);
    } finally {
      setSyncingId(null);
    }
  };

  const handleSyncAll = async () => {
    if (!googleScriptUrl) {
      setSheetsMessage('Please configure and save the Google Apps Script Web App URL first.');
      return;
    }
    const unsynced = referrals.filter((r) => !syncedIds.includes(r.id));
    if (unsynced.length === 0) {
      setSheetsMessage('All current referrals are already synced!');
      return;
    }

    setIsSyncingAll(true);
    setSheetsMessage('');
    let successCount = 0;

    for (const ref of unsynced) {
      try {
        const response = await fetch('/api/sync-to-central', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ referralId: ref.id })
        });
        const data = await response.json();
        if (data.success) {
          setSyncedIds((prev) => {
            if (prev.includes(ref.id)) return prev;
            return [...prev, ref.id];
          });
          successCount++;
        }
      } catch (err) {
        console.error('Error syncing in bulk:', err);
      }
    }

    setIsSyncingAll(false);
    if (successCount === unsynced.length) {
      setSheetsMessage(`Successfully synced all ${successCount} referrals to the central Google Sheet.`);
    } else {
      setSheetsMessage(`Synced ${successCount} of ${unsynced.length} referrals. Some items may have failed.`);
    }
  };

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

              {/* Col Span 7: Event Management list or Bookings list */}
              <div className="lg:col-span-7 bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 flex flex-col">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 flex-wrap gap-4">
                  <div>
                    <h3 className="text-lg font-bold font-display text-slate-900">
                      System Records Dashboard
                    </h3>
                    <p className="text-slate-500 text-xs mt-0.5">
                      Manage events schedules and class registration bookings.
                    </p>
                  </div>
                  <button 
                    onClick={() => onNavigate('events')}
                    className="text-xs text-indigo-600 hover:underline font-bold shrink-0"
                  >
                    View Student Events
                  </button>
                </div>

                {/* Sub-Tabs Selector */}
                <div className="flex border-b border-slate-100 gap-2">
                  <button
                    onClick={() => setActiveSubTab('events')}
                    className={`pb-3 text-xs sm:text-sm font-bold tracking-wider uppercase border-b-2 transition-all cursor-pointer flex-1 text-center ${
                      activeSubTab === 'events'
                        ? 'border-indigo-600 text-indigo-600 font-extrabold'
                        : 'border-transparent text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    Events ({events.length})
                  </button>
                  <button
                    onClick={() => setActiveSubTab('bookings')}
                    className={`pb-3 text-xs sm:text-sm font-bold tracking-wider uppercase border-b-2 transition-all cursor-pointer flex-1 text-center ${
                      activeSubTab === 'bookings'
                        ? 'border-indigo-600 text-indigo-600 font-extrabold'
                        : 'border-transparent text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    Registrations ({bookings.length})
                  </button>
                  <button
                    onClick={() => setActiveSubTab('referrals')}
                    className={`pb-3 text-xs sm:text-sm font-bold tracking-wider uppercase border-b-2 transition-all cursor-pointer flex-1 text-center ${
                      activeSubTab === 'referrals'
                        ? 'border-indigo-600 text-indigo-600 font-extrabold'
                        : 'border-transparent text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    Agent Referrals ({referrals.length})
                  </button>
                </div>

                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-none flex-grow">
                  {activeSubTab === 'events' ? (
                    events.length === 0 ? (
                      <div className="text-center py-16 px-4 space-y-3">
                        <Calendar className="h-10 w-10 text-slate-300 mx-auto" />
                        <p className="text-sm font-medium text-slate-400">No events found in storage.</p>
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
                    )
                  ) : activeSubTab === 'bookings' ? (
                    bookings.length === 0 ? (
                      <div className="text-center py-16 px-4 space-y-3">
                        <Users className="h-10 w-10 text-slate-300 mx-auto" />
                        <p className="text-sm font-medium text-slate-400">No registrations found.</p>
                        <p className="text-xs text-slate-400">Student bookings from the homepage will appear here.</p>
                      </div>
                    ) : (
                      bookings.map((booking) => (
                        <div 
                          key={booking.id}
                          className="p-5 border border-slate-100 rounded-2xl bg-slate-50 hover:bg-slate-50/85 transition-colors flex items-start justify-between gap-4"
                        >
                          <div className="space-y-2 min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="px-2.5 py-0.5 bg-pink-50 border border-pink-100 text-pink-600 rounded-full text-[9px] font-bold font-mono tracking-wider uppercase">
                                {booking.service}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono">ID: {booking.id}</span>
                              <span className="text-[9px] text-slate-400 font-sans ml-auto">
                                {new Date(booking.createdAt).toLocaleDateString()}
                              </span>
                            </div>

                            <h4 className="text-sm font-bold font-display text-slate-900 leading-tight">
                              {booking.firstName} {booking.lastName}
                            </h4>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-slate-500 font-sans">
                              <div className="flex items-center gap-1.5">
                                <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                                <a href={`mailto:${booking.email}`} className="hover:text-indigo-600 hover:underline truncate">
                                  {booking.email}
                                </a>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                                <a href={`tel:${booking.phone}`} className="hover:text-indigo-600 hover:underline truncate">
                                  {booking.phone}
                                </a>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                                <span className="truncate">{booking.residence}</span>
                              </div>
                            </div>

                            {booking.message && (
                              <div className="mt-2.5 p-3 bg-white border border-slate-100 rounded-xl text-[11px] text-slate-500 leading-relaxed font-sans relative">
                                <MessageSquare className="absolute top-2 right-2 h-3.5 w-3.5 text-slate-300" />
                                <p className="font-semibold text-[10px] text-slate-400 uppercase tracking-wider mb-1">
                                  Message
                                </p>
                                <p className="italic">"{booking.message}"</p>
                              </div>
                            )}
                          </div>

                          <button
                            onClick={() => onDeleteBooking && onDeleteBooking(booking.id)}
                            className="p-2 border border-rose-100 text-rose-500 rounded-xl hover:bg-rose-50/50 hover:text-rose-600 cursor-pointer shrink-0 transition-colors"
                            title="Delete Registration"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))
                    )
                  ) : (
                    <div className="space-y-6">
                      {/* Google Sheets Integration Control Bar */}
                      <div className="p-5 bg-slate-50 border border-slate-200/60 rounded-2xl space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <FileSpreadsheet className="h-5 w-5 text-emerald-600" />
                            <h4 className="text-sm font-bold text-slate-900 font-display">Central Google Sheet Sync Settings</h4>
                          </div>
                          <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                            Set up real-time sync with your central Google Sheet: 
                            <a 
                              href="https://docs.google.com/spreadsheets/d/1dVX4d4wflAK49eOodWoTY1acZOB-4CoQwH1qihyzfpo/edit?gid=1089642277#gid=1089642277" 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-indigo-600 hover:underline font-semibold ml-1 inline-flex items-center gap-0.5"
                            >
                              Open Central Sheet <ExternalLink className="h-2.5 w-2.5" />
                            </a>
                          </p>
                        </div>

                        {/* Google Apps Script URL Form */}
                        <form onSubmit={handleSaveSettings} className="space-y-3 pt-2 border-t border-slate-200/50">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                              Google Apps Script Web App URL
                            </label>
                            <div className="flex gap-2">
                              <input
                                type="url"
                                required
                                placeholder="https://script.google.com/macros/s/.../exec"
                                value={googleScriptUrl}
                                onChange={(e) => setGoogleScriptUrl(e.target.value)}
                                className="flex-1 px-3.5 py-2 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-sm font-sans"
                              />
                              <button
                                type="submit"
                                disabled={isSavingSettings}
                                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer whitespace-nowrap"
                              >
                                {isSavingSettings ? 'Saving...' : 'Save URL'}
                              </button>
                            </div>
                          </div>
                        </form>

                        {/* Expandable setup instructions */}
                        <div className="p-3.5 bg-indigo-50/40 border border-indigo-100/60 rounded-xl space-y-2 text-xs text-indigo-950 font-sans">
                          <p className="font-bold flex items-center gap-1.5 text-indigo-900 text-[11px]">
                            <ShieldAlert className="h-3.5 w-3.5 text-indigo-600" />
                            <span>Quick 3-Step Setup Instructions:</span>
                          </p>
                          <ol className="list-decimal pl-4 space-y-1 text-[11px] leading-relaxed text-indigo-800">
                            <li>On your central Google Sheet, click <strong>Extensions &gt; Apps Script</strong>.</li>
                            <li>Delete any code, paste the script provided below, and click Save.</li>
                            <li>Click <strong>Deploy &gt; New deployment</strong>. Choose type <strong>Web app</strong>, set Execute as: <strong>Me</strong>, and Who has access: <strong>Anyone</strong>. Deploy and copy the URL here!</li>
                          </ol>
                          <details className="mt-2">
                            <summary className="text-[10px] font-bold text-indigo-700 hover:text-indigo-900 cursor-pointer select-none">
                              Click to view Google Apps Script code to copy
                            </summary>
                            <pre className="mt-2 p-2 bg-slate-900 text-slate-100 rounded-lg text-[10px] font-mono overflow-x-auto max-h-48 leading-relaxed">
{`function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp", "Referral ID", "Student Name", "Reference Number", "Exam Type", 
        "Booking Date", "Exam Date", "Agency Name", "Agent Name", "Agent Email", "Agent Phone"
      ]);
    }
    
    sheet.appendRow([
      new Date().toLocaleString(),
      data.id || "",
      data.studentFirstName + " " + data.studentLastName,
      data.studentReferenceNumber || "",
      data.examType || "",
      data.bookingDate || "",
      data.examDate || "",
      data.agencyName || "",
      data.agentsName || "",
      data.agentsEmail || "",
      data.agentsPhone || ""
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`}
                            </pre>
                          </details>
                        </div>

                        {/* Sync all option */}
                        {googleScriptUrl && (
                          <div className="flex items-center justify-between gap-4 flex-wrap border-t border-slate-200/60 pt-3">
                            <div className="text-xs text-slate-600 font-medium">
                              <span className="text-slate-400">Real-time sync status: </span>
                              <span className="text-emerald-700 font-bold">Enabled & Active</span>
                            </div>
                            <button
                              onClick={handleSyncAll}
                              disabled={isSyncingAll || referrals.length === 0}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer"
                            >
                              {isSyncingAll ? (
                                <>
                                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                                  <span>Syncing referrals...</span>
                                </>
                              ) : (
                                <>
                                  <FileSpreadsheet className="h-3.5 w-3.5" />
                                  <span>Sync Unsynced to Central Sheet ({referrals.filter(r => !syncedIds.includes(r.id)).length})</span>
                                </>
                              )}
                            </button>
                          </div>
                        )}

                        {sheetsMessage && (
                          <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl flex items-start gap-2">
                            <AlertCircle className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                            <p className="text-[11px] text-indigo-700 font-medium">{sheetsMessage}</p>
                          </div>
                        )}
                      </div>

                      {/* Referrals Cards Grid */}
                      {referrals.length === 0 ? (
                        <div className="text-center py-16 px-4 space-y-3 bg-slate-50 rounded-2xl border border-slate-100">
                          <Users className="h-10 w-10 text-slate-300 mx-auto" />
                          <p className="text-sm font-medium text-slate-400">No referrals found.</p>
                          <p className="text-xs text-slate-400">Referrals submitted by agency partners will show up here.</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {referrals.map((ref) => {
                            const isSynced = syncedIds.includes(ref.id);
                            const isSyncing = syncingId === ref.id;
                            return (
                              <div
                                key={ref.id}
                                className="p-5 border border-slate-100 rounded-2xl bg-slate-50 hover:bg-slate-50/80 transition-all flex flex-col md:flex-row justify-between gap-4"
                              >
                                <div className="space-y-3 min-w-0 flex-1">
                                  {/* Header Badge Row */}
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="px-2 py-0.5 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-full text-[9px] font-bold font-mono tracking-wider uppercase flex items-center gap-1">
                                      <Award className="h-3 w-3" />
                                      <span>Agent Referral</span>
                                    </span>
                                    <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-600 rounded-full text-[9px] font-mono">
                                      ID: {ref.id}
                                    </span>
                                    {isSynced ? (
                                      <span className="px-2 py-0.5 bg-emerald-100/60 border border-emerald-200 text-emerald-800 rounded-full text-[9px] font-bold flex items-center gap-1 font-sans">
                                        <Check className="h-3 w-3 text-emerald-600" />
                                        <span>Synced to Sheet</span>
                                      </span>
                                    ) : (
                                      <span className="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-700 rounded-full text-[9px] font-bold flex items-center gap-1 font-sans">
                                        <AlertCircle className="h-3 w-3 text-amber-600" />
                                        <span>Pending Sync</span>
                                      </span>
                                    )}
                                    <span className="text-[10px] text-slate-400 font-sans ml-auto">
                                      {ref.createdAt ? new Date(ref.createdAt).toLocaleDateString() : 'Recent'}
                                    </span>
                                  </div>

                                  {/* Student Name */}
                                  <h4 className="text-sm font-extrabold font-display text-slate-900 leading-tight">
                                    Student: <span className="text-indigo-600">{ref.studentFirstName} {ref.studentLastName}</span>
                                  </h4>

                                  {/* Split Info: Student Details & Agent Details */}
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 border-t border-slate-200/50 font-sans">
                                    <div className="space-y-1.5 text-xs">
                                      <p className="font-bold text-slate-400 text-[10px] uppercase tracking-wider">Student Details</p>
                                      <div className="text-slate-600 space-y-0.5 font-sans">
                                        <p><strong>Ref Number:</strong> {ref.studentReferenceNumber}</p>
                                        <p><strong>Exam Type:</strong> {ref.examType}</p>
                                        <p><strong>Booking Date:</strong> {ref.bookingDate}</p>
                                        <p><strong>Exam Date:</strong> {ref.examDate}</p>
                                      </div>
                                    </div>

                                    <div className="space-y-1.5 text-xs">
                                      <p className="font-bold text-slate-400 text-[10px] uppercase tracking-wider">Agent Details</p>
                                      <div className="text-slate-600 space-y-0.5 font-sans">
                                        <p><strong>Agency:</strong> {ref.agencyName}</p>
                                        <p><strong>Agent Name:</strong> {ref.agentsName}</p>
                                        <p><strong>Phone:</strong> <a href={`tel:${ref.agentsPhone}`} className="hover:underline text-indigo-600">{ref.agentsPhone}</a></p>
                                        <p><strong>Email:</strong> <a href={`mailto:${ref.agentsEmail}`} className="hover:underline text-indigo-600">{ref.agentsEmail}</a></p>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Action Buttons Panel */}
                                <div className="flex md:flex-col justify-end items-center gap-2 md:self-center shrink-0">
                                  {googleScriptUrl && !isSynced && (
                                    <button
                                      onClick={() => handleSyncReferral(ref)}
                                      disabled={isSyncing}
                                      className="p-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 text-emerald-700 rounded-xl transition-all flex items-center justify-center cursor-pointer disabled:bg-slate-100"
                                      title="Sync to Central Google Sheet"
                                    >
                                      {isSyncing ? (
                                        <RefreshCw className="h-4 w-4 animate-spin" />
                                      ) : (
                                        <FileSpreadsheet className="h-4 w-4" />
                                      )}
                                    </button>
                                  )}
                                  <button
                                    onClick={() => handleDeleteReferral(ref.id)}
                                    className="p-2 border border-rose-100 text-rose-500 rounded-xl hover:bg-rose-50/50 hover:text-rose-600 cursor-pointer shrink-0 transition-colors"
                                    title="Delete Referral Record"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
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
