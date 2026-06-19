import { Course, Testimonial } from './types';

export const STATS = [
  { value: "1000+", label: "Clients Served", description: "Empowering candidates and premier corporate partners." },
  { value: "5", label: "Training Centers", description: "State-of-the-art training and testing facilities." },
  { value: "98.7%", label: "Success Rate", description: "Official IELTS & TOEFL exam pass rates across all cohorts." }
];

export const TRUST_PARTNERS = [
  "National Health Service (NHS) trusts",
  "Skills for Care",
  "CPD Accreditation Group",
  "CQC Care Providers Network",
  "British Care Alliance",
  "ISO 9001 Council",
  "UK Quality Control Commission"
];

export const PARTNER_LOGOS = [
  { name: "IELTS", logo: "https://firebasestorage.googleapis.com/v0/b/ilearn-cc226.firebasestorage.app/o/partners%2FIELTS-logo.png?alt=media&token=406dfe0b-2ade-4874-9c02-4b81393ed134" },
  { name: "TOEFL", logo: "https://firebasestorage.googleapis.com/v0/b/ilearn-cc226.firebasestorage.app/o/partners%2FETS_TOEFL_black.png?alt=media&token=9efd2faa-dd8c-4e86-8d52-3623be92c878" },
  { name: "GMAT", logo: "https://firebasestorage.googleapis.com/v0/b/ilearn-cc226.firebasestorage.app/o/partners%2FGMAT_logo.png?alt=media&token=2d555b35-6979-45a5-8ff1-3523767bbcc9" },
  { name: "GRE", logo: "https://firebasestorage.googleapis.com/v0/b/ilearn-cc226.firebasestorage.app/o/partners%2FGRE_logo_2024.svg?alt=media&token=83c788b4-4872-41c4-97ce-2bafde83def6" },
  { name: "PTE Academic", logo: "https://firebasestorage.googleapis.com/v0/b/ilearn-cc226.firebasestorage.app/o/partners%2FPTE.png?alt=media&token=bbdebb36-7a91-41da-aadb-e9c430f2aa54" },
  { name: "Duolingo English Test", logo: "https://firebasestorage.googleapis.com/v0/b/ilearn-cc226.firebasestorage.app/o/partners%2Fduolingo-1.webp?alt=media&token=73213eb3-2882-4031-a081-86e41ff06db1" },
  { name: "OET / Partner Facility", logo: "https://firebasestorage.googleapis.com/v0/b/ilearn-cc226.firebasestorage.app/o/partners%2F0ca861_63cd8515d2224f4f8c4056c89915a1c6~mv2.avif?alt=media&token=81271a62-9622-47f2-a6f5-8530a420952e" }
];

export const COURSES: Course[] = [
  {
    id: "pte-prep",
    title: "PTE Training",
    category: "english-proficiency",
    duration: "4 - 8 Weeks",
    accreditation: "Pearson Certified Prep Curriculum",
    level: "All Target Band Scores (79+ Aim)",
    price: 199.00,
    icon: "Award",
    description: "Pearson Test of English Academic prep. Master computer-based test pacing, machine-graded speaking algorithms, writing models, and mock drills.",
    highlights: [
      "AI-evaluated speaking & writing mocks",
      "Interactive templates for Describe Image & Retell Lecture",
      "Vocabulary building & daily pronunciation drills",
      "Full simulated PTE practice exams"
    ]
  },
  {
    id: "toefl-prep",
    title: "TOEFL Training",
    category: "english-proficiency",
    duration: "6 - 8 Weeks",
    accreditation: "Official ETS Prep Standard",
    level: "Target Scores (100+ Aim)",
    price: 219.00,
    icon: "GraduationCap",
    description: "TOEFL iBT training. Master writing integrated tasks, academic reading passage extraction, hearing lecture keynotes, and speaking templates.",
    highlights: [
      "Official ETS study guide & syllabus mapping",
      "Targeted strategies for all 4 parts of the test",
      "Live grader feedback on integrated writing samples",
      "Complete mock test simulations with analytical reviews"
    ]
  },
  {
    id: "ielts-prep",
    title: "IELTS Training",
    category: "english-proficiency",
    duration: "4 - 8 Weeks",
    accreditation: "British Council & IDP Partnership Aligned",
    level: "Academic & General (Band 7.5 - 8.5+)",
    price: 249.00,
    icon: "BookOpen",
    description: "Get comprehensive training for IELTS Academic or General. Perfect your writing tasks structure, master listening strategies, and conduct live face-to-face mock interviews.",
    highlights: [
      "Taught by certified tutors (Getrude & team)",
      "Dedicated essay review & band-scoring breakdowns",
      "Daily speaking simulation sessions for confident delivery",
      "Official Cambridge materials and testing techniques"
    ]
  },
  {
    id: "gmat-prep",
    title: "GMAT Training",
    category: "academic-admissions",
    duration: "8 - 12 Weeks",
    accreditation: "Top MBA Prep Standard",
    level: "Focus Edition (700+ Target)",
    price: 349.00,
    icon: "Briefcase",
    description: "Score higher on the Graduate Management Admission Test. Solve tough data sufficiency problems, sharpen mathematical calculations and verbal critical logic.",
    highlights: [
      "In-depth quant shortcuts and logic frameworks",
      "Exclusive focus edition question pools",
      "Data insights and verbal structure mastery",
      "Under 2-minute time management strategies per question"
    ]
  },
  {
    id: "sat-prep",
    title: "SAT Training",
    category: "academic-admissions",
    duration: "8 - 12 Weeks",
    accreditation: "College Board Prep Aligned",
    level: "Target 1500+ score range",
    price: 279.00,
    icon: "Users",
    description: "For high school students heading abroad. Complete coverage of Digital SAT reading, linguistic logic, writing conventions, and no-calculator math shortcuts.",
    highlights: [
      "Digital SAT testing platform simulations",
      "Algebra, Advanced Math, and Geometry intensive modules",
      "Active pacing tools for the multi-stage adaptive layout",
      "Individualized homework & performance tracking maps"
    ]
  },
  {
    id: "duolingo-prep",
    title: "Duolingo Training",
    category: "english-proficiency",
    duration: "3 - 5 Weeks",
    accreditation: "DET Authorized Prep Framework",
    level: "Target Score (120+ Aim)",
    price: 139.00,
    icon: "Sparkles",
    description: "High-speed preparation for the adaptive Duolingo English Test. Boost scores with quick interactive prompts, read-and-completes, and video speaking samples.",
    highlights: [
      "Understanding adaptive engines' grading criteria",
      "Succeeding in rapid dictation & read-aloud prompts",
      "Writing descriptive, high-lexical visual passages",
      "Official practice portal diagnostic metrics overview"
    ]
  },
  {
    id: "gre-prep",
    title: "GRE Training",
    category: "academic-admissions",
    duration: "8 - 12 Weeks",
    accreditation: "ETS Aligned Graduate Prep",
    level: "Target Score (320+ Aim)",
    price: 329.00,
    icon: "Laptop",
    description: "Supercharge your path to graduate school. Build GRE vocabulary lists, ace verbal reading passages, master quantitative comparisons, and structure analytical essays.",
    highlights: [
      "High-frequency vocab flashcards (1000+ words)",
      "Quantitative comparison short-cut templates",
      "Analytical writing logical organization guides",
      "Flexible self-paced study plans & personalized tutor support"
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Aisha",
    role: "Successful IELTS Candidate",
    organization: "Achieved High IELTS Band Score",
    rating: 5,
    comment: "I had the privilege of being taught by an incredibly hardworking and talented IELTS teacher. Their dedication to each student's success is truly remarkable. They always go above and beyond to ensure that we understand every concept, and their innovative teaching methods make learning enjoyable and effective. Thanks to their guidance, I was able to achieve a high score on my IELTS exam. I highly recommend them to anyone looking to excel in their IELTS test."
  },
  {
    id: "t2",
    name: "Joseph",
    role: "UK University Offer Holder",
    organization: "English Coaching Graduate",
    rating: 5,
    comment: "I had the pleasure of interactiong with Agineta as an English coach at iLearn Training and Education. This was after I received an offer to study in the UK and found myself quite nervous and unsure about how to prepare for the required test. However, after several sessions with Agineta, I felt much more prepared and confident. Thanks to her guidance, I was able to pass the test successfully. I highly recommend their services to anyone in need of English coaching."
  },
  {
    id: "t3",
    name: "Lynn Abungu",
    role: "IELTS Academic Prep Graduate",
    organization: "Improved Reading Band from 5 to 7",
    rating: 5,
    comment: "At iLearn, I was warmly welcomed, and my training sessions were scheduled to fit my availability. During my first assessment, I struggled with the reading test, putting my desired band score at risk. With only a week to prepare, I started to regret my decision. However, with the help of Getrude, one of iLearn's tutors, I was able to improve my reading score significantly over the next five days, even exceeding my target. On the test day, the environment was calm, and the invigilators were attentive, which eased the stress. Thanks to iLearn, I achieved and surpassed my required band score, improving from a band 5 to a band 7 in reading. I wholeheartedly recommend iLearn to anyone seeking similar support and results."
  }
];

export const FAQS = [
  {
    question: "Is iLearn Training and Education an official test center?",
    answer: "Yes! iLearn is an official registration and testing center for IELTS and TOEFL. You can take your official tests in our comfortable, calm, and fully-equipped physical labs."
  },
  {
    question: "Do you offer both physical and online classes?",
    answer: "Absolutely. We offer highly interactive physical classes at our modern training center, as well as live online classes via Zoom. Online sessions feature full whiteboard interactions and session recordings."
  },
  {
    question: "How are the training sessions scheduled?",
    answer: "At iLearn, we warmly welcome you and schedule training sessions to fit your availability. We offer morning, afternoon, evening, and weekend slots to suit working professionals and full-time students alike."
  },
  {
    question: "What if I start with a low reading or speaking score?",
    answer: "Don't worry. As highlighted by our candidate success stories, we specialize in rapid score boosts. Even if you start with a modest score (e.g., band 5), our dedicated tutors will work with you individually to significantly exceed your targets in a short time frame."
  },
  {
    question: "Are mock tests included in the training packages?",
    answer: "Yes, all our prep courses include unlimited access to timed diagnostic tests and weekly full-length mock exams. We simulate official exam conditions in our calm testing environment to ease stress for the test day."
  }
];
