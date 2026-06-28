import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onNavigate: (tabId: string) => void;
  onOpenBookingModal: () => void;
}

export default function Hero({ onNavigate, onOpenBookingModal }: HeroProps) {
  return (
    <section 
      id="homepage-hero-section"
      className="relative min-h-[90vh] lg:min-h-screen pt-36 pb-24 overflow-hidden flex items-center justify-center bg-[#131130]"
    >
      {/* City Background & Overlays */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none z-0"
        style={{ 
          backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/ilearn-cc226.firebasestorage.app/o/hero%2Fpexels-mukula-igavinchi-443985808-15496542%20(1).jpg?alt=media&token=a96519c0-ba61-4d02-945e-e15304121234')` 
        }}
      />
      <div className="absolute inset-0 bg-indigo-950/80 sm:bg-indigo-950/75 mix-blend-multiply pointer-events-none z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#131130] via-transparent to-indigo-950/50 pointer-events-none z-0" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Left: Text Content & Dotted Flight Path */}
          <div className="col-span-1 lg:col-span-7 space-y-6 sm:space-y-8 flex flex-col justify-center text-center lg:text-left relative">

            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black font-display leading-[1.08] tracking-tight text-white uppercase"
            >
              OWN YOUR FUTURE <br/>
              WITH ILEARN
            </motion.h1>

            {/* Sub-headline */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans font-light"
            >
              Official IELTS & TOEFL Test Centre in Nairobi and Eldoret
            </motion.p>

            {/* Custom Inspiration Pill Call-To-Action (No Start Free Today) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <button
                id="hero-premium-pill-cta"
                onClick={onOpenBookingModal}
                className="group w-full sm:w-auto inline-flex items-center justify-between bg-white text-indigo-950 font-bold px-6 py-3.5 sm:py-4 rounded-full shadow-[0_15px_30px_rgba(255,255,255,0.1)] hover:shadow-[0_20px_40px_rgba(255,255,255,0.2)] hover:bg-slate-50 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer max-w-max text-sm sm:text-base border border-transparent"
              >
                <span className="mr-6 pl-2 tracking-wide text-[#1c1a55]">Book Your Session Today</span>
                <div className="bg-[#1c1a55] text-white rounded-full p-2.5 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4 text-white" />
                </div>
              </button>
            </motion.div>

            {/* Premium Flight Path trailing from bottom of paragraph to bottom of Oval Image */}
            <div className="absolute hidden lg:block -bottom-16 left-[50%] w-[270px] h-[130px] z-0 pointer-events-none opacity-85">
              <svg viewBox="0 0 300 150" fill="none" className="w-full h-full">
                <motion.path
                  d="M 10,20 C 60,-10 120,40 100,80 C 80,120 40,80 90,50 C 140,20 220,130 290,110"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.45)"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2.2, ease: "easeOut" }}
                />
                
                {/* Airplane icon at the destination of the trail */}
                <g>
                  <circle cx="290" cy="110" r="3" fill="#ec4899" className="animate-ping" />
                  <path 
                    d="M 283,103 L 291,110 L 283,117 L 285,110 Z" 
                    fill="white" 
                    className="fill-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                  />
                </g>
              </svg>
            </div>

          </div>

          {/* Hero Right: Neon-Glowing Vertical Ellipse */}
          <div className="col-span-1 lg:col-span-5 relative z-10 flex justify-center items-center">
            
            <div className="relative">
              {/* Vibrant neon pink halo backplate */}
              <div className="absolute -inset-6 bg-pink-500/20 blur-3xl rounded-full opacity-70 animate-pulse pointer-events-none" />
              <div className="absolute -inset-2 bg-gradient-to-tr from-pink-500/30 to-purple-500/20 blur-2xl rounded-full opacity-60 pointer-events-none" />
              
              {/* Perfect Ellipse Image Frame with Outer and Inner Glowing Ring Shadow */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15, duration: 0.7 }}
                className="relative w-64 h-80 sm:w-80 sm:h-[420px] lg:w-[360px] lg:h-[480px] border-[12px] border-pink-400/40 rounded-[50%_50%_50%_50%] overflow-hidden shadow-[0_0_55px_#ec4899,inset_0_0_30px_rgba(244,114,182,0.6)] transform transition-transform duration-500 hover:scale-[1.015]"
                style={{ 
                  borderRadius: '50% 50% 50% 50%' 
                }}
              >
                <img 
                  src="https://firebasestorage.googleapis.com/v0/b/ilearn-cc226.firebasestorage.app/o/hero%2Fpexels-mikhail-nilov-9301295.jpg?alt=media&token=3fe0a578-2695-4f60-a39c-6f4952a7d98e" 
                  alt="Student owning the future with iLearn" 
                  className="w-full h-full object-cover scale-[1.08] object-center"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>
            
          </div>

        </div>
      </div>
    </section>
  );
}
