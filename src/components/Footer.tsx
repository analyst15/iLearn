import React from 'react';
import { 
  Instagram, Facebook, Linkedin, MapPin, Phone, Mail, ShieldCheck 
} from 'lucide-react';

interface FooterProps {
  onNavigate: (tabId: string) => void;
}

// Custom TikTok SVG Icon to ensure rendering safety
const TiktokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export default function Footer({ onNavigate }: FooterProps) {
  const quickLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'courses', label: 'Classes' },
    { id: 'events', label: 'Events' },
    { id: 'contact', label: 'Contact Us' },
    { id: 'admin', label: 'Admin Portal 🔒' }
  ];

  const handleNavClick = (tabId: string) => {
    onNavigate(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="app-footer-node" className="bg-black text-white font-sans text-sm border-t border-zinc-900 pt-16 pb-8 relative overflow-hidden">
      {/* Decorative background shape */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-500/5 pointer-events-none rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Main Footer Grid */}
        <div id="footer-main-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-zinc-800">
          
          {/* Column 1: Brand & Socials (Col Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => handleNavClick('home')}>
              <img 
                src="https://firebasestorage.googleapis.com/v0/b/ilearn-cc226.firebasestorage.app/o/navbar%2FLogo%202.png?alt=media&token=ca1019a4-b5e9-4258-9982-cec096de3cb8"
                alt="iLearn Logo"
                className="h-16 sm:h-18 lg:h-20 w-auto object-contain brightness-0 invert filter hover:brightness-105 transition-all duration-300"
                referrerPolicy="no-referrer"
              />
            </div>

            <p className="leading-relaxed text-zinc-300 text-sm font-sans">
              Deploying elite professional preparation, English proficiency training, and admissions program packages to support continuous academic success globally.
            </p>

            {/* Social Media Link Icons */}
            <div className="flex items-center space-x-3 pt-3">
              <a 
                href="https://www.instagram.com/ilearn_training/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-8 w-8 bg-white/5 hover:bg-indigo-600 hover:text-white text-zinc-300 rounded-xl flex items-center justify-center transition-all duration-300 border border-zinc-800"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a 
                href="https://www.tiktok.com/@ilearntraining" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-8 w-8 bg-white/5 hover:bg-indigo-600 hover:text-white text-zinc-300 rounded-xl flex items-center justify-center transition-all duration-300 border border-zinc-800"
                aria-label="TikTok"
              >
                <TiktokIcon className="h-4 w-4" />
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61553366366129" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-8 w-8 bg-white/5 hover:bg-indigo-600 hover:text-white text-zinc-300 rounded-xl flex items-center justify-center transition-all duration-300 border border-zinc-800"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a 
                href="https://www.linkedin.com/in/ilearn-training-and-education/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-8 w-8 bg-white/5 hover:bg-indigo-600 hover:text-white text-zinc-300 rounded-xl flex items-center justify-center transition-all duration-300 border border-zinc-800"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (Col Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-white font-bold font-display tracking-widest uppercase text-xs">
              Quick Links
            </h4>
            <div className="flex flex-col space-y-2.5">
              {quickLinks.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => handleNavClick(item.id)} 
                  className="text-left text-zinc-300 hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Column 3: Nairobi Office (Col Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white font-bold font-display tracking-widest uppercase text-xs">
              Nairobi Office
            </h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed text-zinc-300">
                  Ground Floor, Sound Plaza, Woodvale Grove Road, Westlands.
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-indigo-400 shrink-0" />
                <span className="text-zinc-300">(+254) 113 876749</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-indigo-400 shrink-0" />
                <a href="mailto:info@ilearn-global.com" className="text-zinc-300 hover:text-white transition-colors">
                  info@ilearn-global.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Eldoret Office (Col Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-white font-bold font-display tracking-widest uppercase text-xs">
              Eldoret Office
            </h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed text-zinc-300">
                  1st Floor, Highlands Mall.
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-indigo-400 shrink-0" />
                <span className="text-zinc-300">(+254) 752 503636</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-indigo-400 shrink-0" />
                <a href="mailto:eldoret@ilearn-global.com" className="text-zinc-300 hover:text-white transition-colors">
                  eldoret@ilearn-global.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 5: Kapsabet Office (Col Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-white font-bold font-display tracking-widest uppercase text-xs">
              Kapsabet Office
            </h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed text-zinc-300">
                  4th Floor, Kapitol Arcade, DTB Building.
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-indigo-400 shrink-0" />
                <span className="text-zinc-300">(+254) 735 498975</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-indigo-400 shrink-0" />
                <a href="mailto:kapsabet@ilearn-global.com" className="text-zinc-300 hover:text-white transition-colors">
                  kapsabet@ilearn-global.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright details and regulatory references */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-400 gap-4">
          <div className="text-center md:text-left text-zinc-400 space-y-1">
            <p>© 2026 iLearn Global Ltd. All rights registered globally.</p>
            <p className="text-[11px] text-zinc-500">
              Website by{' '}
              <a 
                href="https://techninja.co.ke/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
                id="footer-tech-ninja-link"
              >
                Tech Ninja
              </a>
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-zinc-400">
            <span className="flex items-center bg-white/5 px-3 py-1.5 rounded-lg border border-zinc-800">
              <ShieldCheck className="h-3.5 w-3.5 mr-1.5 text-indigo-500" />
              <span>Skills For Care Endorsed</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
