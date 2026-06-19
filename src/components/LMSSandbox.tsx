import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Laptop, Users, BookOpen, Clock, PlayCircle, ShieldAlert, 
  ArrowRight, Award, Trophy, CheckSquare, ListTodo, Plus, 
  RefreshCw, CheckCircle2, UserPlus, Info, Terminal, Download, FileText, X
} from 'lucide-react';

interface StaffProfile {
  id: string;
  name: string;
  role: string;
  department: string;
  progress: number;
  assignedCourses: string[];
  lastActive: string;
}

export default function LMSSandbox() {
  const [activeLMSTab, setActiveLMSTab] = useState<'dashboard' | 'team' | 'player'>('dashboard');
  
  // Simulated State for the Interactive Sandbox
  const [staff, setStaff] = useState<StaffProfile[]>([
    { id: "s1", name: "Eleanor Finch", role: "Registered General Nurse", department: "Clinical Care", progress: 85, assignedCourses: ["Infection Prevention L2", "Safe Administration of Medication"], lastActive: "10 mins ago" },
    { id: "s2", name: "David Vance", role: "Care Assistant", department: "Dementia Support Unit", progress: 40, assignedCourses: ["The Care Certificate (All 15 Standards)", "Dementia Care Specialism"], lastActive: "1 hour ago" },
    { id: "s3", name: "Arif Al-Sabah", role: "Catering Supervisor", department: "Food Services", progress: 95, assignedCourses: ["Food Safety L2", "Health & Safety in the Workplace"], lastActive: "Yesterday" },
    { id: "s4", name: "Clara Thompson", role: "Support Coordinator", department: "Human Resources", progress: 10, assignedCourses: ["GDPR & Data Protection Essentials"], lastActive: "2 hours ago" }
  ]);

  const [systemLogs, setSystemLogs] = useState<string[]>([
    "System Initialized: iLearn Cloud LMS v4.2.0-secure started successfully",
    "Staff Audit: 4 active licenses synchronized on corporate contract",
    "Completed: Eleanor Finch passed Medication Compliance Quiz with 98% score",
    "Automated Alert: David Vance completed standard module 3 of Care Certificate"
  ]);

  const [assignFormOpen, setAssignFormOpen] = useState(false);
  const [selectedStaffForAssign, setSelectedStaffForAssign] = useState<string>(staff[0].id);
  const [selectedCourseForAssign, setSelectedCourseForAssign] = useState<string>("Cyber Security & Phishing Awareness");
  
  // Game/Course Player State
  const [currentPlayerSlide, setCurrentPlayerSlide] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([-1, -1, -1]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [certificateName, setCertificateName] = useState('');
  const [certificateGenerated, setCertificateGenerated] = useState(false);

  // New logs triggers helper
  const addSystemLog = (logMessage: string) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setSystemLogs(prev => [`[${time}] ${logMessage}`, ...prev.slice(0, 10)]);
  };

  // Assign training click
  const handleAssignTraining = (e: React.FormEvent) => {
    e.preventDefault();
    setStaff(prevStaff => {
      return prevStaff.map(member => {
        if (member.id === selectedStaffForAssign) {
          if (member.assignedCourses.includes(selectedCourseForAssign)) {
            alert(`${member.name} has already been assigned ${selectedCourseForAssign}.`);
            return member;
          }
          const updatedCourses = [...member.assignedCourses, selectedCourseForAssign];
          // Recalculate progress to show movement
          const newProgress = Math.max(10, member.progress - 12); // Slightly lower because of new course load
          
          addSystemLog(`Dispatched Training Module: Assigning "${selectedCourseForAssign}" to ${member.name}`);
          return {
            ...member,
            assignedCourses: updatedCourses,
            progress: newProgress,
            lastActive: "Just now"
          };
        }
        return member;
      });
    });
    setAssignFormOpen(false);
  };

  const handleResetSandbox = () => {
    setStaff([
      { id: "s1", name: "Eleanor Finch", role: "Registered General Nurse", department: "Clinical Care", progress: 85, assignedCourses: ["Infection Prevention L2", "Safe Administration of Medication"], lastActive: "10 mins ago" },
      { id: "s2", name: "David Vance", role: "Care Assistant", department: "Dementia Support Unit", progress: 40, assignedCourses: ["The Care Certificate (All 15 Standards)", "Dementia Care Specialism"], lastActive: "1 hour ago" },
      { id: "s3", name: "Arif Al-Sabah", role: "Catering Supervisor", department: "Food Services", progress: 95, assignedCourses: ["Food Safety L2", "Health & Safety in the Workplace"], lastActive: "Yesterday" },
      { id: "s4", name: "Clara Thompson", role: "Support Coordinator", department: "Human Resources", progress: 10, assignedCourses: ["GDPR & Data Protection Essentials"], lastActive: "2 hours ago" }
    ]);
    addSystemLog("LMS State Recalibrated: Reset sandbox data models completely.");
  };

  // Interactive Playable Micro Quiz details
  const quizQuestions = [
    {
      q: "When must Hand Hygiene be performed in a nursing/care environment?",
      options: [
        "Only after visible contact with soil",
        "Before and after patient contact, and after touching fluids/surroundings",
        "Every 2 hours regardless of patient interaction models",
        "Only when authorized by a clinical nurse supervisor"
      ],
      correct: 1
    },
    {
      q: "What is the primary mechanical rule of Safe Patient Moving and Transfer?",
      options: [
        "Reach as far forward as possible to maximize lift torque",
        "Keep your knees locked rigidly and apply quick upward kinetic force",
        "Keep back straight, knees bent, load close, and lift smoothly using leg muscles",
        "Perform transfers quickly without discussing with the patient to avoid distress"
      ],
      correct: 2
    },
    {
      q: "Under GDPR guidelines, within what timeframe must an organization report a data breach to the ICO?",
      options: [
        "Within 72 Hours of becoming aware",
        "Within 7 working days",
        "Before the end of the calendar month",
        "Only when the patient files a formal court dispute"
      ],
      correct: 0
    }
  ];

  const handleQuizAnswerSelect = (qIdx: number, optIdx: number) => {
    const updated = [...quizAnswers];
    updated[qIdx] = optIdx;
    setQuizAnswers(updated);
  };

  const calculateScore = () => {
    let correct = 0;
    quizAnswers.forEach((answer, index) => {
      if (answer === quizQuestions[index].correct) {
        correct++;
      }
    });
    setQuizScore(correct);
    setQuizSubmitted(true);
    addSystemLog(`LMS Assessment Complete: Score ${correct}/${quizQuestions.length} compiled.`);
  };

  const handleResetQuiz = () => {
    setCurrentPlayerSlide(0);
    setQuizAnswers([-1, -1, -1]);
    setQuizSubmitted(false);
    setQuizScore(0);
    setCertificateGenerated(false);
  };

  return (
    <section id="lms-sandbox-section" className="py-24 bg-slate-900 text-white overflow-hidden relative border-t border-slate-800">
      
      {/* Background patterns */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-transparent pointer-events-none" />
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Banner Headers */}
        <div id="sandbox-header" className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-indigo-400 text-xs font-bold font-mono tracking-widest uppercase bg-indigo-55 bg-indigo-500/10 px-3.5 py-1.5 rounded-full">
            Cloud Platform Simulator
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white mt-4 mb-3">
            Simulated iLearn LMS Portal
          </h2>
          <p className="text-slate-300 text-sm font-sans mx-auto leading-relaxed">
            Experience our interface first-hand. Manage digital compliance, assign regulatory training bundles, and play an interactive mini-lesson below.
          </p>
        </div>

        {/* Dynamic Sandbox Navigation Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center p-1.5 bg-slate-950/60 border border-slate-800 rounded-2xl max-w-2xl mx-auto mb-12 gap-1.5">
          <button
            onClick={() => setActiveLMSTab('dashboard')}
            className={`w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-semibold cursor-pointer transition-all flex items-center justify-center space-x-2 ${
              activeLMSTab === 'dashboard' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Laptop className="h-4 w-4 text-white" />
            <span>Administrator Dashboard</span>
          </button>
          
          <button
            onClick={() => setActiveLMSTab('team')}
            className={`w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-semibold cursor-pointer transition-all flex items-center justify-center space-x-2 ${
              activeLMSTab === 'team' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Users className="h-4 w-4 text-white" />
            <span>Trainee Manager</span>
          </button>
          
          <button
            onClick={() => {
              setActiveLMSTab('player');
              handleResetQuiz();
            }}
            className={`w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-semibold cursor-pointer transition-all flex items-center justify-center space-x-2 ${
              activeLMSTab === 'player' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <PlayCircle className="h-4 w-4 text-white" />
            <span>Interactive Course Player</span>
          </button>
        </div>

        {/* MAIN SANDBOX INTERACTIVE CONTENT MAPPING */}
        <div id="lms-live-environment-box" className="bg-slate-950/40 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-sm min-h-[500px]">
          
          {/* TAB 1: ADMIN DASHBOARD */}
          {activeLMSTab === 'dashboard' && (
            <div id="lms-admin-dashboard" className="space-y-8">
              
              {/* Header inside Dashboard */}
              <div className="flex items-center justify-between flex-wrap gap-4 border-b border-white/5 pb-4">
                <div>
                  <h3 className="text-xl font-bold font-display text-white">iLearn Global Enterprise Portal</h3>
                  <p className="text-xs text-gray-400 font-sans">Corporate Compliance Hub & Audit Trail Summary</p>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={handleResetSandbox}
                    className="px-3.5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold cursor-pointer flex items-center space-x-1.5"
                    title="Reset Simulator state"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>Reset Database</span>
                  </button>
                </div>
              </div>

              {/* Admin Panel Summary Scoreboards Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
                    <span>SEAT CAPACITY</span>
                    <Users className="h-4 w-4 text-indigo-400" />
                  </div>
                  <div className="text-2xl font-black font-display text-white">88 / 100</div>
                  <div className="text-[10px] text-slate-400 mt-1">12 Slots Remaining</div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
                    <span>COMPLIANCE RATE</span>
                    <Award className="h-4 w-4 text-indigo-400" />
                  </div>
                  <div className="text-2xl font-black font-display text-indigo-455 text-indigo-400">92.4%</div>
                  <div className="text-[10px] text-slate-450 text-slate-400 mt-1">Over UK Standard levels (85%)</div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
                    <span>UPCOMING RENEWALS</span>
                    <ShieldAlert className="h-4 w-4 text-amber-500" />
                  </div>
                  <div className="text-2xl font-black font-display text-amber-500">03 Staff Members</div>
                  <div className="text-[10px] text-slate-400 mt-1">Expires within 30 days</div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
                    <span>TOTAL TRAINING HOURS</span>
                    <Clock className="h-4 w-4 text-indigo-400" />
                  </div>
                  <div className="text-2xl font-black font-display text-white">412.5 hrs</div>
                  <div className="text-[10px] text-slate-400 mt-1">Directly archived for CQC Audit</div>
                </div>

              </div>

              {/* Middle Section: Visual Matrix + Live Action System logs */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
                
                {/* SVG Visual Compliance Matrix (NHS Core Alignments) */}
                <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-6">
                  <h4 className="text-sm font-bold tracking-wider text-slate-300 font-mono uppercase">Department Compliance Analytics</h4>
                  
                  <div className="space-y-4">
                    
                    {/* Progress Bar 1 */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-sans text-slate-400">
                        <span>Emergency Units & Medical Support</span>
                        <span className="font-bold text-white">96% Completed</span>
                      </div>
                      <div className="bg-white/10 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-indigo-500 to-indigo-400 h-full rounded-full" style={{ width: '96%' }} />
                      </div>
                    </div>

                    {/* Progress Bar 2 */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-sans text-slate-400">
                        <span>Adult Residential & Dementia Wards</span>
                        <span className="font-bold text-white">88% Completed</span>
                      </div>
                      <div className="bg-white/10 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-indigo-500 to-indigo-450 h-full rounded-full" style={{ width: '88%' }} />
                      </div>
                    </div>

                    {/* Progress Bar 3 */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-sans text-slate-400">
                        <span>Food Catering & Kitchen Facilities</span>
                        <span className="font-bold text-white">100% Fully Audited</span>
                      </div>
                      <div className="bg-white/10 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-indigo-600 h-full rounded-full" style={{ width: '100%' }} />
                      </div>
                    </div>

                    {/* Progress Bar 4 */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-sans text-slate-400">
                        <span>Administration & Corporate Strategy</span>
                        <span className="font-bold text-white">15% Active Inflow</span>
                      </div>
                      <div className="bg-white/10 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-indigo-300 h-full rounded-full" style={{ width: '15%' }} />
                      </div>
                    </div>

                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-sans">
                    <span className="flex items-center text-indigo-400 font-semibold"><CheckCircle2 className="h-4 w-4 mr-1 text-indigo-400" /> Active CQC Target Reached</span>
                    <button 
                      onClick={() => setActiveLMSTab('team')}
                      className="text-indigo-400 hover:text-indigo-300 hover:underline flex items-center cursor-pointer font-medium"
                    >
                      <span>Manage Individual Profiles</span>
                      <ArrowRight className="h-3 ml-1" />
                    </button>
                  </div>
                </div>

                {/* Live Sandbox Activity log (Secure and Reactive Console) */}
                <div className="lg:col-span-5 bg-slate-950 border border-slate-850 border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-slate-300 pb-3 border-b border-slate-850 border-slate-800">
                      <Terminal className="h-4 w-4 text-indigo-400 animate-pulse" />
                      <h4 className="text-xs font-bold font-mono uppercase tracking-wider">Live Audit Timeline Logging</h4>
                    </div>
                    
                    <div className="space-y-3 font-mono text-[10px] text-slate-400 max-h-[180px] overflow-y-auto pr-2 scrollbar-none">
                      {systemLogs.map((log, idx) => (
                        <div key={idx} className="border-l-2 border-indigo-500/40 pl-2 py-0.5 leading-relaxed">
                          {log}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-850 border-slate-800 text-[9px] text-slate-500 font-mono text-center leading-normal">
                    This compliance trail is securely hashed and mapped to database logs. Safe for official local authority CQC inspections.
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: TEAM PROFILE MANAGEMENT (Dispatched Assignments) */}
          {activeLMSTab === 'team' && (
            <div id="lms-team-management-panel" className="space-y-8">
              
              <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-xl font-bold font-display text-white">Staff Member Training Roster</h3>
                  <p className="text-xs text-slate-400 font-sans">Monitor courses, progression ratios, and dispatch certification mandates.</p>
                </div>
                
                <button
                  onClick={() => setAssignFormOpen(true)}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-900/40 flex items-center space-x-1.5 cursor-pointer transform hover:-translate-y-0.5 transition-all"
                >
                  <Plus className="h-4 w-4 text-white" />
                  <span>Dispatch Compliance Training</span>
                </button>
              </div>

              {/* Grid lists of Employees cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {staff.map((member) => (
                  <div 
                    key={member.id}
                    id={`staff-card-${member.id}`}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-indigo-500/50 transition-all duration-300 space-y-4"
                  >
                    {/* Header */}
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-base font-bold text-white font-display">{member.name}</h4>
                        <p className="text-xs text-slate-400 font-sans">{member.role} • <span className="text-indigo-400 font-medium">{member.department}</span></p>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 bg-slate-800 px-2 py-1 rounded-md">
                        Active: {member.lastActive}
                      </span>
                    </div>

                    {/* Progress Slider Display */}
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-[11px] font-sans text-slate-400">
                        <span>Overall Progress</span>
                        <span className="font-bold text-indigo-400">{member.progress}%</span>
                      </div>
                      <div className="bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-indigo-600 h-full duration-1000 transition-all" 
                          style={{ width: `${member.progress}%` }} 
                        />
                      </div>
                    </div>

                    {/* Assigned Courses Mapping */}
                    <div className="space-y-2">
                      <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                        Assigned Modules ({member.assignedCourses.length})
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {member.assignedCourses.map((course, idx) => (
                          <span 
                            key={idx}
                            className="bg-slate-950/65 border border-slate-800 text-xs px-2.5 py-1 text-slate-350 text-slate-300 rounded-lg flex items-center space-x-1"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 mr-1" />
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                ))}
              </div>

              {/* Assign Course Form Drawer overlay */}
              <AnimatePresence>
                {assignFormOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                  >
                    <motion.div
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0.95 }}
                      className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full text-white shadow-2xl relative"
                    >
                      <button 
                        onClick={() => setAssignFormOpen(false)}
                        className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-950 border border-slate-850 cursor-pointer"
                      >
                        <X className="h-4 w-4" />
                      </button>

                      <h4 className="text-xl font-bold font-display mb-4">Assign Mandatory Module</h4>
                      
                      <form onSubmit={handleAssignTraining} className="space-y-5">
                        
                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-slate-400 font-mono text-left font-mono tracking-wider">CHOOSE TRAINEE</label>
                          <select
                            value={selectedStaffForAssign}
                            onChange={(e) => setSelectedStaffForAssign(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                          >
                            {staff.map(member => (
                              <option key={member.id} value={member.id}>
                                {member.name} ({member.role})
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-slate-400 font-mono text-left font-mono tracking-wider">SELECT COMPLIANCE COURSE</label>
                          <select
                            value={selectedCourseForAssign}
                            onChange={(e) => setSelectedCourseForAssign(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                          >
                            <option value="Cyber Security & Phishing Awareness" className="bg-slate-950">Cyber Security & Phishing Awareness (Mandatory L2)</option>
                            <option value="Dementia Care Specialism & Support" className="bg-slate-950">Dementia Care Specialism & Support (L3 Pathway)</option>
                            <option value="Safe Administration of Medication" className="bg-slate-950">Safe Administration of Medication (Clinical L3)</option>
                            <option value="Food Safety and Hygiene Standards" className="bg-slate-950">Food Safety and Hygiene Standards (FSA Level 2)</option>
                            <option value="Resilience & Wellbeing Management" className="bg-slate-950">Resilience & Wellbeing Management (Wellbeing L1)</option>
                          </select>
                        </div>

                        <div className="bg-indigo-950/40 border border-indigo-900/50 p-3.5 rounded-xl text-xs text-indigo-300 leading-normal font-sans">
                          <strong>Note:</strong> Dispatched licenses will trigger automated email credentials and push reminders to the employee's mobile dashboard instantly.
                        </div>

                        {/* Actions */}
                        <div className="pt-2 flex justify-end space-x-2">
                          <button
                            type="button"
                            onClick={() => setAssignFormOpen(false)}
                            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-750 text-xs font-semibold rounded-xl cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg cursor-pointer"
                          >
                            Confirm & Dispatch
                          </button>
                        </div>

                      </form>

                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          )}

          {/* TAB 3: PLAYABLE COURSE PLAYER (The compliance mini course & printable certificate) */}
          {activeLMSTab === 'player' && (
            <div id="lms-playable-course" className="space-y-8">
              
              <div className="border-b border-slate-800 pb-4 flex justify-between items-baseline flex-wrap gap-2">
                <div>
                  <h3 className="text-xl font-bold font-display text-white">Interactive Micro-Classroom</h3>
                  <p className="text-xs text-slate-400 font-sans">Course: <strong>Hand Hygiene & Moving-Handling Core Essentials</strong></p>
                </div>
                <div className="text-xs font-mono text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20">
                  REF: DEMO-PLAY-2026
                </div>
              </div>

              {/* Course Slides Stage Layout */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 min-h-[340px] flex flex-col justify-between relative">
                
                {/* Visual Indicators of Frame Progress */}
                <div className="flex items-center space-x-1.5 justify-center mb-6">
                  {[0, 1, 2, 3].map((idx) => (
                    <span 
                      key={idx} 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        currentPlayerSlide === idx ? 'w-8 bg-indigo-600' : 'w-2 bg-white/20'
                      }`} 
                    />
                  ))}
                </div>

                {/* SLIDE CONTENT RENDERING */}
                <div className="my-auto">
                  
                  {/* SLIDE 0: HAND HYGIENE MODULES */}
                  {currentPlayerSlide === 0 && (
                    <motion.div 
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4 text-center max-w-2xl mx-auto"
                    >
                      <span className="text-indigo-400 text-xs font-bold font-mono uppercase bg-indigo-500/10 px-3 py-1 rounded-full">Slide 1 of 3: Clinical Care Principles</span>
                      <h4 className="text-xl font-extrabold font-display leading-tight">The 5 Crucial Moments for Hand Hygiene</h4>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">
                        As specified by the World Health Organization (WHO), professional healthcare support staff must wash hands using specialized techniques at 5 exact milestones to prevent hospital-acquired cross-contamination:
                      </p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-2 text-center text-[10px] font-sans">
                        <div className="bg-slate-950 border border-slate-800 p-2 rounded-xl">
                          <span className="text-indigo-400 font-bold block mb-1">1</span>
                          <span>Before patient contact</span>
                        </div>
                        <div className="bg-slate-950 border border-slate-800 p-2 rounded-xl">
                          <span className="text-indigo-400 font-bold block mb-1">2</span>
                          <span>Before aseptic procedures</span>
                        </div>
                        <div className="bg-slate-950 border border-slate-800 p-2 rounded-xl">
                          <span className="text-indigo-400 font-bold block mb-1">3</span>
                          <span>After fluid exposure risk</span>
                        </div>
                        <div className="bg-slate-950 border border-slate-800 p-2 rounded-xl">
                          <span className="text-indigo-400 font-bold block mb-1">4</span>
                          <span>After touching patient</span>
                        </div>
                        <div className="bg-slate-950 border border-slate-800 p-2 rounded-xl col-span-2 md:col-span-1">
                          <span className="text-indigo-400 font-bold block mb-1">5</span>
                          <span>After touching surroundings</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* SLIDE 1: PATIENT TRANSFER & BIOMECHANICS */}
                  {currentPlayerSlide === 1 && (
                    <motion.div 
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4 text-center max-w-2xl mx-auto"
                    >
                      <span className="text-indigo-400 text-xs font-bold font-mono uppercase bg-indigo-500/15 px-3 py-1 rounded-full">Slide 2 of 3: Health & Safety Mechanics</span>
                      <h4 className="text-xl font-extrabold font-display leading-tight">Biomechanics of Spine Injury Prevention</h4>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">
                        When lifting or relocating elderly or limited-mobility patients, staff members must align body mechanics to avoid skeletal injury. Manual lifts should rarely be executed without technical hoist slings.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-left text-xs font-sans">
                        <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-xl space-y-1">
                          <span className="font-bold text-indigo-400 block font-mono text-[10px]">RULE A: CORE ALIGNMENT</span>
                          <span className="text-slate-300">Keep back strictly straight, knees bent, and head erect. Lift entirely using your quad leg muscles.</span>
                        </div>
                        <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-xl space-y-1">
                          <span className="font-bold text-indigo-400 block font-mono text-[10px]">RULE B: LOAD BOUNDING</span>
                          <span className="text-slate-300">Keep the load as tight to your body center of gravity as possible. Avoid bending forward.</span>
                        </div>
                        <div className="bg-slate-950/60 border border-indigo-500/20 p-3.5 rounded-xl space-y-1">
                          <span className="font-bold text-indigo-400 block font-mono text-[10px]">RULE C: TWIST BAN</span>
                          <span className="text-slate-300">Never rotate your torso mid-lift. Pivot your entire feet vector should patient path trajectory shift.</span>
                        </div>
                      </div>
                    </motion.div>
                  )}                  {/* SLIDE 2: THE REGULATORY COMPLIANCE QUESTIONS QUIZ */}
                  {currentPlayerSlide === 2 && (
                    <motion.div 
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4 text-center max-w-3xl mx-auto"
                    >
                      <span className="text-amber-400 text-xs font-bold font-mono uppercase bg-amber-500/15 px-3 py-1 rounded-full">Slide 3 of 3: Interactive Certification Exam</span>
                      <h4 className="text-xl font-bold font-display leading-tight">Verify Your Compliance Competency</h4>
                      
                      {!quizSubmitted ? (
                        <div className="space-y-6 pt-2 text-left">
                          {quizQuestions.map((qObj, qIdx) => (
                            <div key={qIdx} className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3">
                              <h5 className="text-sm font-semibold text-white">
                                {qIdx + 1}. {qObj.q}
                              </h5>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                                {qObj.options.map((option, optIdx) => (
                                  <button
                                    key={optIdx}
                                    type="button"
                                    onClick={() => handleQuizAnswerSelect(qIdx, optIdx)}
                                    className={`p-2.5 text-left rounded-lg transition-all border cursor-pointer select-none ${
                                      quizAnswers[qIdx] === optIdx 
                                        ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500' 
                                        : 'bg-slate-900 hover:bg-white/5 border-slate-805 text-slate-350 text-slate-350 hover:text-white border-slate-800'
                                    }`}
                                  >
                                    {option}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                          
                          <div className="text-center pt-2">
                             <button
                              type="button"
                              onClick={calculateScore}
                              disabled={quizAnswers.includes(-1)}
                              className={`px-8 py-3 rounded-xl text-xs font-bold cursor-pointer uppercase tracking-wider transition-all ${
                                quizAnswers.includes(-1) 
                                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-705' 
                                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg'
                              }`}
                            >
                              Submit Compliance Exam
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-5 py-6">
                          <div className="h-14 w-14 bg-white/5 rounded-full flex items-center justify-center mx-auto text-amber-300">
                            <Trophy className="h-7 w-7 text-amber-500" />
                          </div>
                          
                          <div>
                            <h5 className="text-lg font-bold">Exam Results Evaluated</h5>
                            <p className="text-xs text-slate-400 mt-1">
                              You scored <strong>{quizScore} out of {quizQuestions.length}</strong> ({(quizScore / quizQuestions.length * 100).toFixed(0)}%).
                            </p>
                          </div>

                          {quizScore >= 2 ? (
                            <div className="bg-indigo-950/40 border border-indigo-900/40 p-4 rounded-xl max-w-md mx-auto space-y-3.5 text-xs text-indigo-300 leading-normal">
                              <p>✔ <strong>CONGRATULATIONS!</strong> You passed the compliance examination. You can now unlock and download your formal PDF certification.</p>
                              
                              <div className="space-y-2 text-left">
                                <label className="block text-[10px] font-semibold text-slate-400 font-mono tracking-wider text-left">ENTER STUDENT FULL NAME FOR CERTIFICATE</label>
                                <div className="flex space-x-2">
                                  <input
                                    type="text"
                                    value={certificateName}
                                    onChange={(e) => setCertificateName(e.target.value)}
                                    placeholder="e.g. Dr. Ameer Al-Mutawa"
                                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-600"
                                  />
                                  <button
                                    onClick={() => {
                                      if (!certificateName) {
                                        alert("Please enter a student name to issue the certificate.");
                                        return;
                                      }
                                      setCertificateGenerated(true);
                                      setCurrentPlayerSlide(3); // Go to certificate frame
                                    }}
                                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold cursor-pointer"
                                  >
                                    Issue Certificate
                                  </button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl max-w-md mx-auto space-y-2 text-xs text-red-350">
                              <p>❌ <strong>PASS TARGET NOT REACHED.</strong> Regulatory standards require at least a 70% score (2/3 correct questions) to unlock micro-credentials.</p>
                              <button
                                onClick={handleResetQuiz}
                                className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-505 transition-colors"
                              >
                                Try Quiz Again
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                    </motion.div>
                  )}

                  {/* SLIDE 3: DISPLAY GENERATED CERTIFICATE */}
                  {currentPlayerSlide === 3 && certificateGenerated && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-6 text-center max-w-2xl mx-auto"
                    >
                      <span className="text-indigo-400 text-xs font-bold font-mono uppercase bg-indigo-500/15 px-3 py-1 rounded-full">Certificate Issued</span>
                      
                      {/* High-fidelity CSS compliance certificate */}
                      <div className="bg-white text-slate-800 p-6 sm:p-8 rounded-xl border-[6px] border-double border-indigo-600 relative overflow-hidden shadow-2xl">
                        {/* Background watermarks */}
                        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_center,#000_10%,transparent_10%)] bg-[size:10px_10px]" />
                        
                        <div className="border border-indigo-200 p-3 sm:p-6 space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-[8px] font-mono tracking-wider font-semibold text-indigo-600">CERT NO: ILG-{Math.floor(100000 + Math.random() * 900000)}</span>
                            <span className="text-[8px] font-mono text-gray-450 text-gray-400">DATE: 16 June 2026</span>
                          </div>

                          <div className="text-center space-y-1">
                            <h4 className="text-[10px] font-bold font-mono tracking-widest text-[#0B1B3D] uppercase">CERTIFICATE OF COMPLIANCE</h4>
                            <p className="text-[9px] text-gray-500 font-sans">This is to officially confirm that regulatory evaluation has been satisfied</p>
                          </div>

                          <div className="py-2">
                            <p className="text-[9px] font-mono text-indigo-600 uppercase">IS HEREBY ACCORDED TO</p>
                            <h3 className="text-xl font-black font-display text-[#0B1B3D] tracking-wide my-1">
                              {certificateName}
                            </h3>
                            <p className="text-[9px] text-gray-500 font-sans">for successful modular testing of professional curriculums in</p>
                            <strong className="text-xs text-[#0B1B3D] block mt-1 uppercase font-semibold">Clinical Hand Sanitation & Safe Bio-Moving</strong>
                          </div>

                          <div className="grid grid-cols-2 gap-4 items-end pt-2 text-center text-[8px] font-mono text-gray-500 border-t border-gray-100">
                            <div>
                              <div className="h-6 flex items-center justify-center font-serif text-gray-400 italic">iLearn Board</div>
                              <p className="border-t border-gray-200 mt-1 uppercase font-bold text-[7px] text-gray-400">Authorized registrar</p>
                            </div>
                            <div>
                              <div className="h-6 flex items-center justify-center text-indigo-600 font-extrabold flex-col">
                                <span className="text-[9px]">★ CPD ★</span>
                                <span className="text-[6px]">1.0 CREDIT HRS</span>
                              </div>
                              <p className="border-t border-gray-200 mt-1 uppercase font-bold text-[7px] text-gray-400">Accredited cert board</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <button
                          onClick={() => {
                            window.print();
                          }}
                          className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center space-x-2 cursor-pointer"
                        >
                          <Download className="h-4 w-4" />
                          <span>Print Certificate</span>
                        </button>
                        
                        <button
                          onClick={handleResetQuiz}
                          className="px-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl text-xs font-bold cursor-pointer hover:bg-white/10"
                        >
                          Restart Course Player
                        </button>
                      </div>

                    </motion.div>
                  )}

                </div>

                {/* Footer Controls of the Playback stage */}
                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
                  <button
                    disabled={currentPlayerSlide === 0 || currentPlayerSlide === 3}
                    onClick={() => setCurrentPlayerSlide(prev => Math.max(0, prev - 1))}
                    className={`px-4 py-2 rounded-lg cursor-pointer font-semibold ${
                      currentPlayerSlide === 0 || currentPlayerSlide === 3
                        ? 'text-gray-600 cursor-not-allowed bg-transparent' 
                        : 'text-white bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    Previous Frame
                  </button>

                  <span className="text-[10px] font-mono text-gray-505 text-gray-500">
                    STAGE {currentPlayerSlide + 1} OF 4
                  </span>

                  <button
                    disabled={currentPlayerSlide >= 2}
                    onClick={() => setCurrentPlayerSlide(prev => Math.min(2, prev + 1))}
                    className={`px-4 py-2 rounded-lg cursor-pointer font-semibold ${
                      currentPlayerSlide >= 2 
                        ? 'text-gray-600 cursor-not-allowed bg-transparent' 
                        : 'text-white bg-indigo-600 hover:bg-indigo-500'
                    }`}
                  >
                    Next Frame
                  </button>
                </div>

              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
