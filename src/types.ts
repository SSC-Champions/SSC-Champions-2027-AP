export type SSCSubjectId = 
  | 'telugu'
  | 'english'
  | 'hindi'
  | 'maths'
  | 'physical_science'
  | 'biological_science'
  | 'social_studies';

export interface SSCSubjectConfig {
  id: SSCSubjectId;
  name: string;
  regionalName: string;
  questionCount: number;
  timeAllottedMinutes: number;
  color: string;
  bgLight: string;
  borderClass: string;
  badgeClass: string;
  syllabusOverview: string;
}

export type AcademicStandardCode = 'AS1' | 'AS2' | 'AS3' | 'AS4' | 'AS5' | 'AS6';

export interface QuestionDiagramData {
  type: 
    | 'india_map' 
    | 'world_map' 
    | 'ray_diagram' 
    | 'circuit' 
    | 'bio_diagram' 
    | 'math_geometry' 
    | 'chemistry_setup' 
    | 'data_table'
    | 'custom_svg';
  title?: string;
  caption?: string;
  markedPoint?: string; // e.g. "X", "P", "1"
  highlightLabel?: string;
  variant?: string; // specific sub-diagram identifier
  tableHeaders?: string[];
  tableRows?: string[][];
  customSvgContent?: string;
}

export interface SSCQuestion {
  id: string;
  subjectId: SSCSubjectId;
  questionNumber: number; // 1 to 60
  questionText: string;
  options: string[]; // 4 options
  correctOptionIndex: number; // 0, 1, 2, 3
  topic: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  explanation: string;
  contextOrPassage?: string;
  academicStandard?: string; // e.g. "AS5: Mapping Skills", "AS5: Drawing / Ray Diagram", "AS3: Experimentation"
  academicStandardCode?: AcademicStandardCode;
  diagramData?: QuestionDiagramData;
}

export interface SSCTestSet {
  id: string;
  title: string;
  code: string;
  description: string;
  targetDate: string;
  totalQuestions: number; // 60
  durationMinutes: number; // 60
  questions: SSCQuestion[];
}

export interface SubjectBreakdownItem {
  subjectName: string;
  totalQuestions: number;
  attempted: number;
  correct: number;
  incorrect: number;
  unattempted: number;
  score: number;
  percentage: number;
}

export interface SSCTestAttempt {
  userId?: string;
  id: string;
  setId: string;
  setTitle: string;
  studentName: string;
  penNo?: string;
  schoolName?: string;
  udiseCode?: string;
  mandal?: string;
  district?: string;
  date: string;
  timestamp: number;
  timeSpentSeconds: number;
  answers: Record<string, number>; // questionId -> selectedOptionIndex
  markedForReview: Record<string, boolean>; // questionId -> boolean
  questionsSnapshot?: SSCQuestion[]; // Snapshot of exact 60 questions with randomized options
  totalScore: number; // out of 60
  maxScore: number; // 60
  percentage: number;
  gpaGrade: string; // e.g. A1, A2, B1, B2, C1, C2, D
  gradePoints: number; // e.g. 10.0, 9.0, 8.0, 7.0
  subjectBreakdown: Record<SSCSubjectId, SubjectBreakdownItem>;
}

export interface SchoolInfo {
  udiseCode: string;
  schoolName: string;
  district: string;
  mandal: string;
  category: string;
  management: string;
}

export interface UserAccount {
  userId?: string;
  id?: string;
  studentName: string;
  penNo: string;
  mobile?: string;
  email?: string;
  section?: string;
  pin?: string;
  udiseCode?: string;
  district?: string;
  mandal?: string;
  schoolDetails?: {
    schoolName: string;
    districtName?: string;
    mandalName?: string;
    management?: string;
    category?: string;
  };
  registeredAt?: string;
}

export type TimeframeFilter = 'today' | 'this_week' | 'this_month' | 'overall';

export interface LeaderboardEntry {
  rank: number;
  studentId: string;
  studentName: string;
  penNo: string;
  udiseCode: string;
  schoolName: string;
  mandal: string;
  district: string;
  score: number; // out of 60
  maxScore: number; // 60
  percentage: number;
  gpaGrade: string;
  gradePoints: number;
  timeSpentSeconds: number;
  attemptDate: string;
  timestamp: number;
  subjectScores: Record<SSCSubjectId, number>;
  totalAttempts: number;
  averageScore: number;
}

export interface StudentSchoolRecord {
  id: string;
  studentName: string;
  penNo: string;
  section: string;
  udiseCode: string;
  schoolName: string;
  mandal: string;
  district: string;
  totalAttempts: number;
  totalScoreSum: number;
  latestScore: number;
  bestScore: number;
  latestGpaGrade: string;
  latestGradePoints: number;
  lastAttemptDate: string;
  subjectMarks: {
    telugu: number;
    english: number;
    hindi: number;
    maths: number;
    physical_science: number;
    biological_science: number;
    social_studies: number;
  };
}

export interface DistrictSummary {
  districtName: string;
  totalSchools: number;
  totalStudents: number;
  totalAttempts: number;
  averageScore: number;
  passPercentage: number;
  topSchoolName: string;
  topScore: number;
}

export interface MandalSummary {
  mandalName: string;
  districtName: string;
  totalSchools: number;
  totalStudents: number;
  totalAttempts: number;
  averageScore: number;
  passPercentage: number;
  topSchoolName: string;
  topScore: number;
}

export interface SchoolSummary {
  udiseCode: string;
  schoolName: string;
  mandalName: string;
  districtName: string;
  management: string;
  category: string;
  totalStudents: number;
  totalAttempts: number;
  averageScore: number;
  passPercentage: number;
  topStudentName: string;
  topScore: number;
  topGpaGrade: string;
}

export type AppNavView = 'test' | 'dashboard' | 'scoreboard' | 'cascading-report' | 'school-students' | 'register' | 'login';

export type PortalView = 'daily-test' | 'lobby' | 'results' | 'history';
