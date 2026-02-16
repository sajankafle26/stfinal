// =============================
// Users
// =============================
export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "student";
  avatar?: string;
}

// =============================
// Program Categories
// =============================

// Single source of truth: use this union across the app
export type ProgramCategory =
  | 'design'
  | 'frontend'
  | 'js'
  | 'backend'
  | 'wp'
  | 'dm'
  | 'robotics';
;

// Optional convenience enum (mirror) for legacy mapping and clarity in imports.
// You can keep OR remove this if you prefer only the union type above.
export enum ProgramCategoryEnum {
  WEB_DEV = "js",
  DIGITAL_MARKETING = "dm",
  WORDPRESS = "wp",
  ROBOTICS_IOT = "robotics",
}

// Helper: map any legacy/raw category to ProgramCategory
export function toProgramCategory(raw: unknown): ProgramCategory {
  const map: Record<string, ProgramCategory> = {
    // legacy keys
    WEB_DEV: "js",
    DIGITAL_MARKETING: "dm",
    WORDPRESS: "wp",
    LARAVEL: "js", // keep LARAVEL under 'js' track
    ROBOTICS_IOT: "robotics",
    // passthrough for already-normalized
    js: "js",
    dm: "dm",
    wp: "wp",
    robotics: "robotics",
  };
  return map[String(raw)] ?? "js";
}

// =============================
// Instructors
// =============================
export interface Instructor {
  name: string;
  title?: string;
  bio?: string;
  avatar?: string;
  links?: {
    linkedin?: string;
    twitter?: string;
    portfolio?: string;
  };
}

// =============================
// Curriculum / Syllabus
// =============================

// Structured curriculum item (preferred)
export interface CurriculumItem {
  id: string;                 // e.g., 'ux-basics'
  title: string;              // Module title
  objectives?: string[];      // Learning outcomes (optional for flexibility)
  keyTopics?: string[];       // Bulleted topics
  activities?: string[];      // In-class / hands-on
  deliverables?: string[];    // Expected outputs
  tools?: string[];           // Tools/software used
  duration?: string;          // e.g., '3h', '1 week', '2 sessions'
  prerequisites?: string[];   // Skills/modules to complete first
  reading?: { label: string; url?: string }[]; // Optional readings/links
}

// Syllabus for week-by-week structures (optional per course)
export interface SyllabusModule {
  week: number;
  title: string;
  overview: string;
  lessons: { title: string; duration: string }[];
  resources?: { label: string; url: string }[];
  assessment?: string;
}

// Type guard for runtime checks
export function isCurriculumItem(v: unknown): v is CurriculumItem {
  return !!v && typeof v === "object" && "title" in (v as any);
}

// =============================
// Courses
// =============================

export interface Course {
  id: string;
  title: string;
  slug: string;
  category: ProgramCategory; // normalized via toProgramCategory()
  description: string;
  price: number;             // in local currency units (e.g., NPR)
  duration: string;          // e.g., '2 Hours per day'
  image: string;             // URL or path
  module: string;            // e.g., 'Module I' or '2 Months'
  curriculum?: Array<CurriculumItem | string>;
  prerequisites?: string[];
  instructor?: Instructor;
}

// =============================
// Marketing & Sales
// =============================

export interface Partner {
  id: string;
  name: string;
  logoUrl: string;
}

export interface VideoCourse {
  id: string;
  title: string;
  category: ProgramCategory | string; // allow non-track categories (e.g., 'shorts', 'design')
  instructor: string;                 // instructor name (string for cards); use relation if needed
  thumbnail: string;
  previewUrl: string;
  fullVideoUrl?: string;              // Only for owners
  price: number;
  originalPrice: number;
  lessons: number;
  totalHours: string;                 // e.g., '6h 30m'
  rating: number;                     // 0–5
}

export interface VideoPurchase {
  id: string;
  userId: string;
  videoCourseId: string;
  purchaseDate: string;               // ISO date string
  status: "active" | "pending";
}

export interface UpcomingBatch {
  id: string;
  courseId: string;
  courseTitle: string;
  startDate: string;                  // ISO date
  time: string;                       // e.g., '7–9 AM'
  status: "Enrolling" | "Full" | "Started";
  seatsLeft: number;
}

export interface InternshipPosition {
  id: string;
  title: string;
  duration: string;
  type: "On-site" | "Remote" | "Hybrid";
  description: string;
  stipend: string;                    // keep string to allow 'Unpaid'/'Negotiable'
  icon: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
}

export interface TechStackItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;                      // e.g., hex or tailwind token
  docs: string;                       // official docs URL
}

export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

export interface Blog {
  id: string;
  title: string;
  date: string;                       // ISO date
  excerpt: string;
  image: string;
  link: string;
}

export interface Testimonial {
  id: string;
  name: string;
  course: string;
  quote: string;
  image: string;
  placement?: string;                 // e.g., 'Frontend @ Company'
}

export interface Enrollment {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  parentName?: string;
  parentPhone?: string;
  gender?: string;
  dob?: string;
  occupation?: string;
  education?: string;
  courseTitle: string;
  batchId?: string;
  shift?: string;
  paymentMethod?: 'esewa' | 'khalti' | 'cash';
  amount?: number;
  status: 'Pending' | 'Contacted' | 'Confirmed' | 'Cancelled';
  createdAt: string;
}

// =============================
// Utilities (optional)
// =============================

// Format currency safely (defaults to en-NP for Nepal)
export const formatCurrency = (value: number, locale = "en-NP", currency = "NPR") =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);