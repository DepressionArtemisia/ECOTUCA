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
  subtitle: string;
  shortDescription: string;
  description: string;
  longDescription: string;
  location: string;
  meetingPoint: string;
  finalMeetingPointNote: string;
  durationMinutes: number;
  difficulty: "leve" | "moderada" | "intensa";
  price: number;
  maxPeople: number;
  coverUrl: string;
  coverAlt: string;
  galleryUrls: string[];
  mediaAssetIds: string[];
  guideId: string;
  featured: boolean;
  tags: string[];
  validationStatus: "validado" | "demonstrativo" | "precisa-validacao" | "premium-demo";
  validationNote: string;
  whyItMatters: string;
  visitorExperience: string[];
  includedItems: string[];
  recommendations: string[];
  careNotes: string[];
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

export type StudentActivityStatus = "todo" | "submitted" | "reviewed" | "revision";

export type StudentActivity = {
  id: string;
  title: string;
  trackTitle: string;
  dueDate: string;
  status: StudentActivityStatus;
  evidenceType: string;
  teacherFeedback: string;
  progressPercent: number;
  tone: "yellow" | "coral" | "blue" | "orange" | "mint";
};

export type TeacherEvaluationStatus = "pending" | "reviewed" | "revision";

export type TeacherEvaluation = {
  id: string;
  studentName: string;
  activityTitle: string;
  trackTitle: string;
  submittedAt: string;
  status: TeacherEvaluationStatus;
  priority: "alta" | "media" | "baixa";
  evidence: string;
  feedbackHint: string;
};

export type ContentReviewStatus = "draft" | "review" | "approved" | "changes";

export type ContentReviewItem = {
  id: string;
  title: string;
  author: string;
  trackTitle: string;
  kind: string;
  status: ContentReviewStatus;
  updatedAt: string;
  checklist: string[];
};

export type AdminReportSnapshot = {
  label: string;
  value: string;
  detail: string;
  tone: "yellow" | "coral" | "blue" | "orange" | "mint";
};

export type AdminReportRow = {
  period: string;
  students: number;
  completedLessons: number;
  certificates: number;
  pendingApprovals: number;
  supportRequests: number;
};
