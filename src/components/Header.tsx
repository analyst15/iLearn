import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, PhoneCall, HelpCircle } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSearchOpen: () => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'courses', label: 'Classes' },
    { id: 'events', label: 'Events' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header 
      id="main-app-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md py-3 shadow-md border-b border-slate-200/80' 
          : 'bg-white/90 backdrop-blur-sm py-4 border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between animate-fade-in">
          
          {/* Brand Logo */}
          <div 
            id="header-brand-logo"
            className="flex items-center cursor-pointer"
            onClick={() => handleNavClick('home')}
          >
            <img 
              src="https://firebasestorage.googleapis.com/v0/b/ilearn-cc226.firebasestorage.app/o/navbar%2FLogo%202.png?alt=media&token=ca1019a4-b5e9-4258-9982-cec096de3cb8"
              alt="iLearn Training and Education Logo"
              className="h-13 sm:h-15 lg:h-18 w-auto object-contain filter hover:brightness-105 transition-all duration-300"
              referrerPolicy="no-referrer"
            />
          </div>
 
          {/* Desktop Navigation */}
          <nav id="desktop-nav-menu" className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}-btn`}
                onClick={() => handleNavClick(item.id)}
                className={`px-4.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeTab === item.id 
                    ? 'text-indigo-600 bg-indigo-50/70 font-bold' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
 
          {/* Controls Panel */}
          <div id="header-controls" className="hidden lg:flex items-center space-x-4">
            {/* Quick Demo CTA Button */}
            <button
              id="header-cta-demo-btn"
              onClick={() => handleNavClick('contact')}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-widest shadow-md shadow-indigo-100 hover:shadow-lg hover:shadow-indigo-200 cursor-pointer transform hover:-translate-y-0.5 active:scale-95 transition-all"
            >
              GET STARTED
            </button>
          </div>
 
          {/* Mobile Navigation Toggler */}
          <div className="flex lg:hidden items-center">
            <button
              id="mobile-nav-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-500 hover:text-slate-900 bg-slate-100 rounded-xl cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
 
        </div>
      </div>
 
      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white border-b border-slate-200 shadow-xl overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-3">
              <div className="grid grid-cols-1 gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    id={`mobile-nav-${item.id}-btn`}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                      activeTab === item.id 
                        ? 'text-indigo-600 bg-indigo-50 border-l-4 border-indigo-600' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              
              <div className="pt-4 border-t border-slate-150 space-y-4 px-2">
                <button
                  id="mobile-cta-demo-btn"
                  onClick={() => handleNavClick('contact')}
                  className="w-full py-3.5 text-center bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-indigo-100"
                >
                  GET STARTED
                </button>
                
                <div className="flex justify-center space-x-6 text-slate-400 text-xs pt-1">
                  <span className="flex items-center"><PhoneCall className="h-3.5 w-3.5 mr-1 text-indigo-600" /> Support Centred</span>
                  <span className="flex items-center"><HelpCircle className="h-3.5 w-3.5 mr-1 text-indigo-500" /> Academic Coach</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
