import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Calendar, Phone, Mail, User, MapPin, MessageSquare, Info, Award, GraduationCap, ShieldCheck, Clock } from 'lucide-react';

const COUNTRIES = [
  { code: '+93', name: 'Afghanistan' },
  { code: '+355', name: 'Albania' },
  { code: '+213', name: 'Algeria' },
  { code: '+1-684', name: 'American Samoa' },
  { code: '+376', name: 'Andorra' },
  { code: '+244', name: 'Angola' },
  { code: '+1-264', name: 'Anguilla' },
  { code: '+672', name: 'Antarctica' },
  { code: '+1-268', name: 'Antigua and Barbuda' },
  { code: '+54', name: 'Argentina' },
  { code: '+374', name: 'Armenia' },
  { code: '+297', name: 'Aruba' },
  { code: '+61', name: 'Australia' },
  { code: '+43', name: 'Austria' },
  { code: '+994', name: 'Azerbaijan' },
  { code: '+1-242', name: 'Bahamas' },
  { code: '+973', name: 'Bahrain' },
  { code: '+880', name: 'Bangladesh' },
  { code: '+1-246', name: 'Barbados' },
  { code: '+375', name: 'Belarus' },
  { code: '+32', name: 'Belgium' },
  { code: '+501', name: 'Belize' },
  { code: '+229', name: 'Benin' },
  { code: '+1-441', name: 'Bermuda' },
  { code: '+975', name: 'Bhutan' },
  { code: '+591', name: 'Bolivia' },
  { code: '+387', name: 'Bosnia and Herzegovina' },
  { code: '+267', name: 'Botswana' },
  { code: '+55', name: 'Brazil' },
  { code: '+1-284', name: 'British Virgin Islands' },
  { code: '+673', name: 'Brunei' },
  { code: '+359', name: 'Bulgaria' },
  { code: '+226', name: 'Burkina Faso' },
  { code: '+257', name: 'Burundi' },
  { code: '+855', name: 'Cambodia' },
  { code: '+237', name: 'Cameroon' },
  { code: '+1', name: 'Canada' },
  { code: '+238', name: 'Cape Verde' },
  { code: '+1-345', name: 'Cayman Islands' },
  { code: '+236', name: 'Central African Republic' },
  { code: '+235', name: 'Chad' },
  { code: '+56', name: 'Chile' },
  { code: '+86', name: 'China' },
  { code: '+57', name: 'Colombia' },
  { code: '+269', name: 'Comoros' },
  { code: '+242', name: 'Congo - Brazzaville' },
  { code: '+243', name: 'Congo - Kinshasa' },
  { code: '+682', name: 'Cook Islands' },
  { code: '+506', name: 'Costa Rica' },
  { code: '+225', name: "Cote d'Ivoire" },
  { code: '+385', name: 'Croatia' },
  { code: '+53', name: 'Cuba' },
  { code: '+357', name: 'Cyprus' },
  { code: '+420', name: 'Czech Republic' },
  { code: '+45', name: 'Denmark' },
  { code: '+253', name: 'Djibouti' },
  { code: '+1-767', name: 'Dominica' },
  { code: '+1-809', name: 'Dominican Republic' },
  { code: '+593', name: 'Ecuador' },
  { code: '+20', name: 'Egypt' },
  { code: '+503', name: 'El Salvador' },
  { code: '+240', name: 'Equatorial Guinea' },
  { code: '+291', name: 'Eritrea' },
  { code: '+372', name: 'Estonia' },
  { code: '+251', name: 'Ethiopia' },
  { code: '+500', name: 'Falkland Islands' },
  { code: '+298', name: 'Faroe Islands' },
  { code: '+679', name: 'Fiji' },
  { code: '+358', name: 'Finland' },
  { code: '+33', name: 'France' },
  { code: '+594', name: 'French Guiana' },
  { code: '+689', name: 'French Polynesia' },
  { code: '+241', name: 'Gabon' },
  { code: '+220', name: 'Gambia' },
  { code: '+995', name: 'Georgia' },
  { code: '+49', name: 'Germany' },
  { code: '+233', name: 'Ghana' },
  { code: '+350', name: 'Gibraltar' },
  { code: '+30', name: 'Greece' },
  { code: '+299', name: 'Greenland' },
  { code: '+1-473', name: 'Grenada' },
  { code: '+590', name: 'Guadeloupe' },
  { code: '+1-671', name: 'Guam' },
  { code: '+502', name: 'Guatemala' },
  { code: '+224', name: 'Guinea' },
  { code: '+245', name: 'Guinea-Bissau' },
  { code: '+592', name: 'Guyana' },
  { code: '+509', name: 'Haiti' },
  { code: '+504', name: 'Honduras' },
  { code: '+852', name: 'Hong Kong' },
  { code: '+36', name: 'Hungary' },
  { code: '+354', name: 'Iceland' },
  { code: '+91', name: 'India' },
  { code: '+62', name: 'Indonesia' },
  { code: '+98', name: 'Iran' },
  { code: '+964', name: 'Iraq' },
  { code: '+353', name: 'Ireland' },
  { code: '+972', name: 'Israel' },
  { code: '+39', name: 'Italy' },
  { code: '+1-876', name: 'Jamaica' },
  { code: '+81', name: 'Japan' },
  { code: '+962', name: 'Jordan' },
  { code: '+7', name: 'Kazakhstan' },
  { code: '+254', name: 'Kenya' },
  { code: '+686', name: 'Kiribati' },
  { code: '+965', name: 'Kuwait' },
  { code: '+996', name: 'Kyrgyzstan' },
  { code: '+856', name: 'Laos' },
  { code: '+371', name: 'Latvia' },
  { code: '+961', name: 'Lebanon' },
  { code: '+266', name: 'Lesotho' },
  { code: '+231', name: 'Liberia' },
  { code: '+218', name: 'Libya' },
  { code: '+423', name: 'Liechtenstein' },
  { code: '+370', name: 'Lithuania' },
  { code: '+352', name: 'Luxembourg' },
  { code: '+853', name: 'Macau' },
  { code: '+389', name: 'Macedonia' },
  { code: '+261', name: 'Madagascar' },
  { code: '+265', name: 'Malawi' },
  { code: '+60', name: 'Malaysia' },
  { code: '+960', name: 'Maldives' },
  { code: '+223', name: 'Mali' },
  { code: '+356', name: 'Malta' },
  { code: '+692', name: 'Marshall Islands' },
  { code: '+596', name: 'Martinique' },
  { code: '+222', name: 'Mauritania' },
  { code: '+230', name: 'Mauritius' },
  { code: '+262', name: 'Mayotte' },
  { code: '+52', name: 'Mexico' },
  { code: '+691', name: 'Micronesia' },
  { code: '+373', name: 'Moldova' },
  { code: '+377', name: 'Monaco' },
  { code: '+976', name: 'Mongolia' },
  { code: '+382', name: 'Montenegro' },
  { code: '+1-664', name: 'Montserrat' },
  { code: '+212', name: 'Morocco' },
  { code: '+258', name: 'Mozambique' },
  { code: '+95', name: 'Myanmar' },
  { code: '+264', name: 'Namibia' },
  { code: '+674', name: 'Nauru' },
  { code: '+977', name: 'Nepal' },
  { code: '+31', name: 'Netherlands' },
  { code: '+687', name: 'New Caledonia' },
  { code: '+64', name: 'New Zealand' },
  { code: '+505', name: 'Nicaragua' },
  { code: '+227', name: 'Niger' },
  { code: '+234', name: 'Nigeria' },
  { code: '+683', name: 'Niue' },
  { code: '+672', name: 'Norfolk Island' },
  { code: '+1-670', name: 'Northern Mariana Islands' },
  { code: '+47', name: 'Norway' },
  { code: '+968', name: 'Oman' },
  { code: '+92', name: 'Pakistan' },
  { code: '+680', name: 'Palau' },
  { code: '+970', name: 'Palestine' },
  { code: '+507', name: 'Panama' },
  { code: '+675', name: 'Papua New Guinea' },
  { code: '+595', name: 'Paraguay' },
  { code: '+51', name: 'Peru' },
  { code: '+63', name: 'Philippines' },
  { code: '+48', name: 'Poland' },
  { code: '+351', name: 'Portugal' },
  { code: '+1-787', name: 'Puerto Rico' },
  { code: '+974', name: 'Qatar' },
  { code: '+262', name: 'Reunion' },
  { code: '+40', name: 'Romania' },
  { code: '+7', name: 'Russia' },
  { code: '+250', name: 'Rwanda' },
  { code: '+1-869', name: 'Saint Kitts and Nevis' },
  { code: '+1-758', name: 'Saint Lucia' },
  { code: '+508', name: 'Saint Pierre and Miquelon' },
  { code: '+1-784', name: 'Saint Vincent and Grenadines' },
  { code: '+685', name: 'Samoa' },
  { code: '+378', name: 'San Marino' },
  { code: '+239', name: 'Sao Tome and Principe' },
  { code: '+966', name: 'Saudi Arabia' },
  { code: '+221', name: 'Senegal' },
  { code: '+381', name: 'Serbia' },
  { code: '+248', name: 'Seychelles' },
  { code: '+232', name: 'Sierra Leone' },
  { code: '+65', name: 'Singapore' },
  { code: '+421', name: 'Slovakia' },
  { code: '+386', name: 'Slovenia' },
  { code: '+677', name: 'Solomon Islands' },
  { code: '+252', name: 'Somalia' },
  { code: '+27', name: 'South Africa' },
  { code: '+82', name: 'South Korea' },
  { code: '+34', name: 'Spain' },
  { code: '+94', name: 'Sri Lanka' },
  { code: '+249', name: 'Sudan' },
  { code: '+597', name: 'Suriname' },
  { code: '+268', name: 'Swaziland' },
  { code: '+46', name: 'Sweden' },
  { code: '+41', name: 'Switzerland' },
  { code: '+963', name: 'Syria' },
  { code: '+886', name: 'Taiwan' },
  { code: '+992', name: 'Tajikistan' },
  { code: '+255', name: 'Tanzania' },
  { code: '+66', name: 'Thailand' },
  { code: '+228', name: 'Togo' },
  { code: '+690', name: 'Tokelau' },
  { code: '+676', name: 'Tonga' },
  { code: '+1-868', name: 'Trinidad and Tobago' },
  { code: '+216', name: 'Tunisia' },
  { code: '+90', name: 'Turkey' },
  { code: '+993', name: 'Turkmenistan' },
  { code: '+1-649', name: 'Turks and Caicos Islands' },
  { code: '+688', name: 'Tuvalu' },
  { code: '+256', name: 'Uganda' },
  { code: '+380', name: 'Ukraine' },
  { code: '+971', name: 'United Arab Emirates' },
  { code: '+44', name: 'United Kingdom' },
  { code: '+1', name: 'United States' },
  { code: '+598', name: 'Uruguay' },
  { code: '+998', name: 'Uzbekistan' },
  { code: '+678', name: 'Vanuatu' },
  { code: '+58', name: 'Venezuela' },
  { code: '+84', name: 'Vietnam' },
  { code: '+1-284', name: 'Virgin Islands' },
  { code: '+681', name: 'Wallis and Futuna' },
  { code: '+967', name: 'Yemen' },
  { code: '+260', name: 'Zambia' },
  { code: '+263', name: 'Zimbabwe' }
];

interface RegisterPageProps {
  onAddBooking: (formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    service: string;
    residence: string;
    message: string;
  }) => void;
  onNavigate: (tabId: string) => void;
}

export default function RegisterPage({ onAddBooking, onNavigate }: RegisterPageProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    service: 'IELTS',
    residence: '',
    message: '',
  });

  const [countryCode, setCountryCode] = useState('+254');
  const [phoneBody, setPhoneBody] = useState('');

  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const services = [
    'IELTS',
    'TOEFL',
    'PTE',
    'GMAT',
    'GRE',
    'DUOLINGO',
    'SAT',
    'German',
    'Other'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Field Validation
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim() ||
      !phoneBody.trim() ||
      !formData.service ||
      !formData.residence.trim()
    ) {
      setError('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    try {
      const fullPhone = `${countryCode} ${phoneBody.trim()}`;
      
      // Submit registration details to local SMTP server
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: "registration",
          data: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: fullPhone,
            service: formData.service,
            residence: formData.residence,
            message: formData.message
          }
        })
      });

      const resData = await response.json();
      if (!response.ok || !resData.success) {
        throw new Error(resData.error || 'Failed to submit registration to secure mail server.');
      }

      onAddBooking({
        ...formData,
        phone: fullPhone
      });
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please check your internet connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      service: 'IELTS',
      residence: '',
      message: '',
    });
    setCountryCode('+254');
    setPhoneBody('');
    setIsSuccess(false);
    setError('');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8 mt-12">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-[32px] shadow-xl border border-slate-100 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[650px]">
          
          {/* Left Column: Dark Side Marketing Content */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0B1B3D] via-[#152a56] to-slate-900 p-8 sm:p-12 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-500/10 rounded-full blur-2xl -ml-16 -mb-16 pointer-events-none" />

            <div className="space-y-8 relative z-10">
              <div className="space-y-2">
                <span className="text-pink-400 text-[10px] font-mono font-black tracking-[0.2em] uppercase bg-pink-500/10 px-3 py-1.5 rounded-full border border-pink-500/20">
                  Global Admissions
                </span>
                <h2 className="text-3xl sm:text-4xl font-black font-display tracking-tight uppercase leading-tight pt-2">
                  Begin Your Academic Journey
                </h2>
                <p className="text-sm text-slate-300 font-sans leading-relaxed">
                  Register today for official testing, custom preparation sessions, and seamless visa advice designed for ambitious students.
                </p>
              </div>

              {/* Bullet Benefits list */}
              <div className="space-y-5 pt-4">
                <div className="flex items-start gap-3.5">
                  <div className="h-9 w-9 bg-white/10 text-pink-400 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                    <Award className="h-5 w-5" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">Official Testing Partner</h4>
                    <p className="text-xs text-slate-400 leading-normal">Enjoy authentic material packets and direct official registration seats.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="h-9 w-9 bg-white/10 text-indigo-300 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">Expert Coaching Packets</h4>
                    <p className="text-xs text-slate-400 leading-normal">Learn directly from Cambridge certified tutors and native test advisors.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="h-9 w-9 bg-white/10 text-emerald-400 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">2-Hour Advisors Callback</h4>
                    <p className="text-xs text-slate-400 leading-normal">Once you register, a regional academic supervisor contacts you in 2 hours.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-12 sm:pt-0 relative z-10">
              <div className="p-4.5 bg-white/5 border border-white/10 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="h-4.5 w-4.5 text-emerald-400" />
                  <span>Secure Registration Portal</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Your details are processed through iLearn Global security regulations. We do not distribute credentials to unauthorized third parties.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Form Container */}
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success-screen"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="py-10 text-center space-y-6"
                >
                  <div className="h-20 w-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border-4 border-emerald-100 shadow-sm">
                    <Check className="h-10 w-10 animate-bounce" />
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-2xl sm:text-3xl font-black font-display text-slate-900 uppercase">
                      Registration Submitted!
                    </h4>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-md mx-auto">
                      Hi <strong className="text-slate-900">{formData.firstName}</strong>, thank you for choosing iLearn Global for your future!
                    </p>
                  </div>

                  <div className="pt-6 flex flex-col sm:flex-row justify-center items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onNavigate('home')}
                      className="w-full sm:w-auto px-8 py-3.5 bg-[#0B1B3D] hover:bg-slate-900 text-white rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Return to Home
                    </button>
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="w-full sm:w-auto px-8 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Register New Student
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="registration-form-box"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <h3 className="text-xl sm:text-2xl font-black font-display text-slate-900 uppercase tracking-tight">
                      Enrollment Form
                    </h3>
                    <p className="text-xs text-slate-400">
                      Please enter your valid details below. Fields marked with <span className="text-rose-500">*</span> are required.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5" id="fullpage-registration-form">
                    {error && (
                      <div className="bg-rose-50 border border-rose-100 text-rose-600 rounded-xl p-3.5 text-xs font-bold flex items-center gap-2">
                        <Info className="h-4 w-4 shrink-0 text-rose-500" />
                        <span>{error}</span>
                      </div>
                    )}

                     {/* Name fields row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5 text-slate-400" /> First Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          disabled={submitting}
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          placeholder="E.g. Lynn"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs sm:text-sm text-slate-900 placeholder-slate-405 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all disabled:opacity-60"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5 text-slate-400" /> Last Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          disabled={submitting}
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          placeholder="E.g. Abungu"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs sm:text-sm text-slate-900 placeholder-slate-405 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all disabled:opacity-60"
                        />
                      </div>
                    </div>

                    {/* Email address field (takes full space) */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 text-slate-400" /> Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        disabled={submitting}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="E.g. lynn@gmail.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs sm:text-sm text-slate-900 placeholder-slate-405 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all disabled:opacity-60"
                      />
                    </div>

                    {/* Phone number field (takes its own line) */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5 text-slate-400" /> Phone Number <span className="text-rose-500">*</span>
                      </label>
                      <div className="flex gap-2">
                        <div className="w-[140px] shrink-0">
                          <select
                            disabled={submitting}
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 cursor-pointer transition-all disabled:opacity-60"
                          >
                            {COUNTRIES.map((c) => (
                              <option key={`${c.name}-${c.code}`} value={c.code}>
                                {c.code} ({c.name})
                              </option>
                            ))}
                          </select>
                        </div>
                        <input
                          type="tel"
                          required
                          disabled={submitting}
                          value={phoneBody}
                          onChange={(e) => setPhoneBody(e.target.value)}
                          placeholder="712 345678"
                          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs sm:text-sm text-slate-900 placeholder-slate-450 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all disabled:opacity-60"
                        />
                      </div>
                    </div>

                    {/* Service Selection dropdown */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                        What service are you interested in? <span className="text-rose-500">*</span>
                      </label>
                      <select
                        disabled={submitting}
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 cursor-pointer transition-all disabled:opacity-60"
                      >
                        {services.map((svc) => (
                          <option key={svc} value={svc}>
                            {svc === 'Other' ? 'Other Service Interest' : `${svc} Course Prep`}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Place of Residence field */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-slate-400" /> Place of Residence <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        disabled={submitting}
                        value={formData.residence}
                        onChange={(e) => setFormData({ ...formData, residence: e.target.value })}
                        placeholder="E.g. Nairobi, Kenya"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs sm:text-sm text-slate-900 placeholder-slate-405 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all disabled:opacity-60"
                      />
                    </div>

                    {/* Message field */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                        <MessageSquare className="h-3.5 w-3.5 text-slate-400" /> Message <span className="text-slate-400">(Optional)</span>
                      </label>
                      <textarea
                        rows={4}
                        disabled={submitting}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Share any details, requested timing, or questions you have."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-xs sm:text-sm text-slate-900 placeholder-slate-405 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all resize-none disabled:opacity-60"
                      />
                    </div>

                    {/* Form actions */}
                    <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full sm:flex-1 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all cursor-pointer shadow-md shadow-indigo-100 text-center active:scale-98 flex items-center justify-center space-x-2 disabled:bg-indigo-400 disabled:cursor-not-allowed"
                      >
                        {submitting ? (
                          <>
                            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Transmitting...</span>
                          </>
                        ) : (
                          <span>Submit Registration</span>
                        )}
                      </button>
                      <button
                        type="button"
                        disabled={submitting}
                        onClick={() => onNavigate('home')}
                        className="w-full sm:w-auto px-8 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all cursor-pointer text-center disabled:opacity-60"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
