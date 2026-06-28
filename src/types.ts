export interface Course {
  id: string;
  title: string;
  category: string;
  duration: string;
  accreditation: string;
  level: string;
  price: number;
  description: string;
  icon: string;
  highlights: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  rating: number;
  comment: string;
}

export interface LMSUser {
  id: string;
  name: string;
  email: string;
  department: string;
  progress: number;
  assignedCourses: string[];
}

export interface LMSCourse {
  id: string;
  title: string;
}

export interface IlearnEvent {
  id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  speaker: string;
  spotsLeft: number;
  description: string;
}

export interface SessionBooking {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  residence: string;
  message?: string;
  createdAt: string;
}
