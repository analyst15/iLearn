import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, MapPin, Users, Clock, Tag, Ticket, CheckCircle2, X, ShieldCheck, Mail, Phone, Send 
} from 'lucide-react';
import { IlearnEvent } from '../types';

interface EventsProps {
  events: IlearnEvent[];
}

export default function Events({ events }: EventsProps) {
  const [selectedEvent, setSelectedEvent] = useState<IlearnEvent | null>(null);
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [bookedEventIds, setBookedEventIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ilearn_registered_events');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const startRegistration = (evt: IlearnEvent) => {
    setSelectedEvent(evt);
    setRegistrationSuccess(false);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !studentEmail) return;

    if (selectedEvent) {
      const updatedBookings = [...bookedEventIds, selectedEvent.id];
      setBookedEventIds(updatedBookings);
      localStorage.setItem('ilearn_registered_events', JSON.stringify(updatedBookings));
      setRegistrationSuccess(true);
      
      // Clear inputs
      setStudentName('');
      setStudentEmail('');
      setStudentPhone('');

      // Auto dismiss modal in 3s
      setTimeout(() => {
        setSelectedEvent(null);
        setRegistrationSuccess(false);
      }, 3500);
    }
  };

  return (
    <section id="ilearn-events-hub" className="py-24 bg-slate-50 text-slate-900 min-h-[75vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-16">
        
        {/* Header Block */}
        <div id="events-header" className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-indigo-600 text-xs sm:text-sm font-bold font-mono tracking-widest uppercase bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100/60">
            Academic Schedules
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-slate-900 leading-none">
            Upcoming Events & Mock Exams
          </h2>
          <p className="text-slate-500 text-xs sm:text-base font-sans leading-relaxed max-w-2xl mx-auto">
            Book seats for IELTS diagnostics, speaking mastery workshops, virtual study visa webinars, and official test trials.
          </p>
        </div>

        {/* List Grid or Empty State */}
        {events.length === 0 ? (
          <div id="events-empty-state" className="max-w-md mx-auto text-center py-12 px-6 sm:px-8 bg-white border border-slate-100 rounded-3xl shadow-sm space-y-5">
            <div className="h-16 w-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto border border-indigo-150">
              <Calendar className="h-7 w-7" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold font-display text-slate-900">No Events Scheduled</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                There are no events scheduled at the moment. Please check back later or get in touch with us to request personalized tutoring or counseling schedules.
              </p>
            </div>
          </div>
        ) : (
          <div id="events-list-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((evt) => {
              const isBooked = bookedEventIds.includes(evt.id);
              
              return (
                <div 
                  key={evt.id}
                  className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Event Tag Category */}
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-full text-[10px] sm:text-xs font-bold font-mono tracking-widest uppercase">
                        {evt.category}
                      </span>
                      <span className="text-rose-500 text-xs font-bold flex items-center gap-1">
                        <Tag className="h-3.5 w-3.5" /> {evt.spotsLeft} seats left
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-black font-display text-slate-900 leading-snug">
                      {evt.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-500 text-xs sm:text-sm font-sans leading-relaxed">
                      {evt.description}
                    </p>

                    {/* Meta Fields */}
                    <div className="pt-4 border-t border-slate-50 space-y-2.5 text-xs text-slate-600">
                      <div className="flex items-center gap-2.5">
                        <Clock className="h-4 w-4 text-indigo-500 shrink-0" />
                        <span className="font-semibold">{evt.date}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <MapPin className="h-4 w-4 text-indigo-500 shrink-0" />
                        <span className="truncate">{evt.location}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Users className="h-4 w-4 text-indigo-500 shrink-0" />
                        <span>Led by: <b className="text-slate-800">{evt.speaker}</b></span>
                      </div>
                    </div>
                  </div>

                  {/* Booking Action segment */}
                  <div className="pt-6 mt-6 border-t border-slate-50 flex justify-end">
                    {isBooked ? (
                      <span className="flex items-center gap-1.5 px-4.5 py-2.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-xl border border-emerald-200">
                        <CheckCircle2 className="h-4 w-4" /> Registered
                      </span>
                    ) : (
                      <button
                        onClick={() => startRegistration(evt)}
                        className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-100 cursor-pointer flex items-center gap-1.5 active:scale-95 transition-all"
                      >
                        <Ticket className="h-4 w-4" /> Register
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal form for interactive slot reservation */}
        <AnimatePresence>
          {selectedEvent && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 space-y-6 relative"
              >
                {/* Header info */}
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1 min-w-0">
                    <span className="text-[10px] font-mono font-bold text-indigo-600 uppercase tracking-widest block">
                      Register For Event
                    </span>
                    <h4 className="text-base sm:text-lg font-black font-display text-slate-900 leading-snug truncate">
                      {selectedEvent.title}
                    </h4>
                  </div>
                  <button 
                    onClick={() => setSelectedEvent(null)}
                    className="p-1.5 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {!registrationSuccess ? (
                    <form onSubmit={handleRegisterSubmit} className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={studentName}
                          onChange={(e) => setStudentName(e.target.value)}
                          placeholder="Your Name"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all font-sans"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={studentEmail}
                          onChange={(e) => setStudentEmail(e.target.value)}
                          placeholder="student@example.com"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all font-sans"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={studentPhone}
                          onChange={(e) => setStudentPhone(e.target.value)}
                          placeholder="Optional Phone Number"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all font-sans"
                        />
                      </div>

                      <div className="flex items-center gap-2 p-3 bg-indigo-50/50 rounded-xl border border-indigo-100/60">
                        <ShieldCheck className="h-4 w-4 text-indigo-600 shrink-0" />
                        <span className="text-[10px] text-slate-500 font-medium">
                          Free instant registration with instant status confirmation.
                        </span>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md shadow-indigo-100 transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Send className="h-4 w-4" /> Confirm My Seat
                      </button>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-6 text-center space-y-4"
                    >
                      <div className="h-12 w-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                        <CheckCircle2 className="h-6 w-6 animate-pulse" />
                      </div>
                      <div className="space-y-1.5">
                        <h5 className="font-extrabold text-slate-900 text-lg">Registration Successful!</h5>
                        <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                          Excellent, <strong className="text-slate-700">{studentName}</strong>, your seat for <strong className="text-slate-700">{selectedEvent?.title}</strong> is fully reserved. An invitation card will be processed shortly.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
