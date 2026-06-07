export type UserRole =
  | "visitor"
  | "tourist"
  | "student"
  | "teacher"
  | "guide"
  | "admin"
  | "super_admin";

export type UserStatus = "pending" | "approved" | "rejected" | "suspended" | "inactive";

export type DemoUser = {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  status: UserStatus;
  highlight: string;
};

export type Guide = {
  id: string;
  name: string;
  email: string;
  bio: string;
  specialties: string[];
  languages: string[];
  rating: number;
  avatar: string;
  certificates: string[];
};

export type TourRoute = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  location: string;
  meetingPoint: string;
  durationMinutes: number;
  difficulty: "leve" | "moderada" | "intensa";
  price: number;
  maxPeople: number;
  coverUrl: string;
  galleryUrls: string[];
  guideId: string;
  featured: boolean;
  tags: string[];
  includedItems: string[];
  recommendations: string[];
  accessibility: string;
  bestTime: string;
  safetyNotes: string;
};

export type Lesson = {
  id: string;
  title: string;
  description: string;
  videoId: string;
  durationMinutes: number;
  progressPercent: number;
  status: "not_started" | "in_progress" | "completed";
  supportText: string;
};

export type LearningTrack = {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  estimatedHours: number;
  progressPercent: number;
  accent: "yellow" | "coral" | "blue" | "orange" | "mint";
  lessons: Lesson[];
};

export type Metric = {
  label: string;
  value: string;
  detail: string;
  tone: "yellow" | "coral" | "blue" | "orange" | "mint";
};
