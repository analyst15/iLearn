import { Target, Eye, Heart, Sparkles, CheckCircle, ShieldCheck, Award, ThumbsUp } from 'lucide-react';

export default function About() {
  const coreValues = [
    { name: "Transparency", desc: "Clear, honest communication in all our interactions and transactions." },
    { name: "Accountability", desc: "Taking full responsibility for our coaching, support, and administrative delivery." },
    { name: "Integrity", desc: "Upholding the highest moral and professional standards in exam preparation." },
    { name: "Collaboration", desc: "Working hand-in-hand with students, test partners, and regulators for optimum scores." },
    { name: "Commitment", desc: "Remaining dedicated to single-mindedly pushing candidates to surpass their targets." },
    { name: "Quality", desc: "Delivering first-class pedagogical learning pathways, mock tests, and classrooms." },
    { name: "Customer Focus", desc: "Adapting our schedule, resources, and tutor guides to match individual student needs." }
  ];

  return (
    <section id="about-ilearn-section" className="py-24 bg-white text-slate-900 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Profile Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          
          {/* Left Block - Story */}
          <div className="col-span-1 lg:col-span-7 space-y-6">
            <span className="text-indigo-600 text-xs font-bold font-mono tracking-widest uppercase bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100/60">
              Welcome to iLearn
            </span>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-slate-900 leading-tight">
              About Us
            </h2>
            
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-sans">
              <strong>iLearn Training and Education</strong> is a premier training and exam center! We offer IELTS, TOEFL, PTE, OET, GMAT, SAT, DUOLINGO, NMC CBT and NCLEX-RN online and physical classes. Besides, we are official IELTS and TOEFL test Centre.
            </p>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-sans">
              At iLearn, we are dedicated to providing top-notch training and support to help you achieve your professional and academic goals.
            </p>

            <div className="p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100/40 mt-6 space-y-3">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-indigo-600 shrink-0" />
                <h4 className="font-bold text-slate-900 font-display text-sm sm:text-base">Purpose Statement</h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed pl-8">
                "We are committed to delivering quality services in an honest, accountable and transparent manner to our customers in collaboration with our partners."
              </p>
            </div>
          </div>

          {/* Right Column - Aesthetic Image Container */}
          <div className="col-span-1 lg:col-span-5">
            <div className="relative">
              {/* Decorative block behind image */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-indigo-500 to-pink-500 rounded-3xl opacity-10 blur-xl" />
              
              <div className="relative bg-white p-2 rounded-3xl border border-slate-150 shadow-2xl overflow-hidden group">
                <img 
                  src="https://firebasestorage.googleapis.com/v0/b/ilearn-cc226.firebasestorage.app/o/about%20us%2Flaptop-documents-black-couple-sofa-online-banking-internet-payment-website-home-dating-relationship-man-woman-computer-bonding-ecommerce-relax-living-room.jpg?alt=media&token=7c956e92-569a-4a4a-8a72-0907d707b89d" 
                  alt="Students learning on laptop" 
                  className="w-full h-auto object-cover rounded-2xl transition-transform duration-500 group-hover:scale-[1.01]"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Mission & Vision Statements cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          
          {/* Mission Card */}
          <div className="p-8 bg-slate-50 border border-slate-100 rounded-3xl hover:border-indigo-200 transition-colors duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 h-24 w-24 bg-indigo-50 rounded-bl-full opacity-50 z-0 transition-all duration-300 group-hover:scale-110" />
            <div className="relative z-10 space-y-4">
              <div className="h-12 w-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-display text-slate-900">Mission Statement</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans font-medium">
                To be a Centre of excellence in English Proficiency Training and Exam Administration.
              </p>
            </div>
          </div>

          {/* Vision Card */}
          <div className="p-8 bg-slate-50 border border-slate-100 rounded-3xl hover:border-indigo-200 transition-colors duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 h-24 w-24 bg-pink-50 rounded-bl-full opacity-50 z-0 transition-all duration-300 group-hover:scale-110" />
            <div className="relative z-10 space-y-4">
              <div className="h-12 w-12 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center">
                <Eye className="h-6 w-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-display text-slate-900">Vision Statement</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans font-medium">
                To be a training firm trusted by all cadres seeking scores for corresponding overseas schools, registration bodies and governments.
              </p>
            </div>
          </div>

        </div>

        {/* Core Values Bento Layout */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-pink-600 text-xs font-bold font-mono tracking-widest uppercase bg-pink-50 px-3 py-1.5 rounded-full border border-pink-100/60">
              Our Foundations
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 mt-4">
              Core Values
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 font-sans">
              The fundamental principles that guide every decision, tutor session, and partnership we forge.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {coreValues.map((value, idx) => (
              <div 
                key={idx}
                id={`value-card-${idx}`}
                className="bg-slate-50 border border-slate-100/90 hover:border-indigo-300 p-8 rounded-3xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 space-y-4 flex flex-col justify-start"
              >
                <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-slate-900 font-display tracking-tight">{value.name}</h4>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-600 font-sans font-medium">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
