import { SSCSubjectConfig, SSCSubjectId } from '../types';

export const TOTAL_SSC_QUESTIONS = 60;
export const TOTAL_SSC_DURATION_MINUTES = 60;

export const SSC_SUBJECT_ORDER: SSCSubjectId[] = [
  'telugu',
  'english',
  'hindi',
  'maths',
  'physical_science',
  'biological_science',
  'social_studies',
];

export const SSC_SUBJECTS_CONFIG: Record<SSCSubjectId, SSCSubjectConfig> = {
  telugu: {
    id: 'telugu',
    name: 'Telugu (తెలుగు)',
    regionalName: 'ప్రథమ భాష - తెలుగు',
    questionCount: 10,
    timeAllottedMinutes: 10,
    color: '#D97706',
    bgLight: 'bg-amber-50',
    borderClass: 'border-amber-200',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
    syllabusOverview: 'గద్య భాగం, పద్య భాగం, వ్యాకరణం (సంధులు, సమాసాలు, అలంకారాలు, పర్యాయపదాలు, జాతీయాలు)',
  },
  english: {
    id: 'english',
    name: 'English',
    regionalName: 'Second/First Language - English',
    questionCount: 10,
    timeAllottedMinutes: 10,
    color: '#2563EB',
    bgLight: 'bg-blue-50',
    borderClass: 'border-blue-200',
    badgeClass: 'bg-blue-100 text-blue-800 border-blue-300',
    syllabusOverview: 'Reading Comprehension, Grammar (Tenses, Voice, Speech, Prepositions, Articles), Vocabulary & Idioms',
  },
  hindi: {
    id: 'hindi',
    name: 'Hindi (हिंदी)',
    regionalName: 'द्वितीय भाषा - हिंदी',
    questionCount: 10,
    timeAllottedMinutes: 10,
    color: '#DC2626',
    bgLight: 'bg-rose-50',
    borderClass: 'border-rose-200',
    badgeClass: 'bg-rose-100 text-rose-800 border-rose-300',
    syllabusOverview: 'गद्य, पद्य, व्याकरण (कारक, काल, संधि, समास, मुहावरे, विलोम, पर्यायवाची)',
  },
  maths: {
    id: 'maths',
    name: 'Mathematics (గణితం)',
    regionalName: 'గణిత శాస్త్రం - Mathematics',
    questionCount: 10,
    timeAllottedMinutes: 10,
    color: '#7C3AED',
    bgLight: 'bg-purple-50',
    borderClass: 'border-purple-200',
    badgeClass: 'bg-purple-100 text-purple-800 border-purple-300',
    syllabusOverview: 'Real Numbers, Sets, Polynomials, Linear Equations, Quadratic Equations, Progressions, Coordinate Geometry, Trigonometry, Statistics, Probability',
  },
  physical_science: {
    id: 'physical_science',
    name: 'Physical Science (భౌతిక రసాయన శాస్త్రం)',
    regionalName: 'భౌతిక, రసాయన శాస్త్రాలు - Physical Sciences',
    questionCount: 5,
    timeAllottedMinutes: 5,
    color: '#0891B2',
    bgLight: 'bg-cyan-50',
    borderClass: 'border-cyan-200',
    badgeClass: 'bg-cyan-100 text-cyan-800 border-cyan-300',
    syllabusOverview: 'Light: Reflection & Refraction, Chemical Equations, Acids, Bases & Salts, Periodic Table, Electric Current, Electromagnetism',
  },
  biological_science: {
    id: 'biological_science',
    name: 'Biological Science (జీవ శాస్త్రం)',
    regionalName: 'జీవ శాస్త్రం - Natural & Biological Sciences',
    questionCount: 5,
    timeAllottedMinutes: 5,
    color: '#059669',
    bgLight: 'bg-emerald-50',
    borderClass: 'border-emerald-200',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    syllabusOverview: 'Nutrition, Respiration, Transportation, Excretion, Control and Coordination, Reproduction, Heredity & Evolution, Our Environment',
  },
  social_studies: {
    id: 'social_studies',
    name: 'Social Studies (సాంఘిక శాస్త్రం)',
    regionalName: 'సాంఘిక శాస్త్రం - History, Civics, Geography & Economics',
    questionCount: 10,
    timeAllottedMinutes: 10,
    color: '#EA580C',
    bgLight: 'bg-orange-50',
    borderClass: 'border-orange-200',
    badgeClass: 'bg-orange-100 text-orange-800 border-orange-300',
    syllabusOverview: 'India Relief Features, Climate of India, Rivers & Water Resources, Population, Indian National Movement, Making of Constitution, Global Development',
  },
};

export function getGPAGrade(percentage: number): {
  grade: string;
  gpa: number;
  badgeColor: string;
  remark: string;
} {
  if (percentage >= 91) {
    return { grade: 'A1', gpa: 10.0, badgeColor: 'bg-emerald-600 text-white', remark: 'Outstanding Performance! Top Merit Ranking.' };
  } else if (percentage >= 81) {
    return { grade: 'A2', gpa: 9.0, badgeColor: 'bg-emerald-500 text-white', remark: 'Excellent Mastery! Consistently High Accuracy.' };
  } else if (percentage >= 71) {
    return { grade: 'B1', gpa: 8.0, badgeColor: 'bg-blue-600 text-white', remark: 'Very Good. On Track for Distinction.' };
  } else if (percentage >= 61) {
    return { grade: 'B2', gpa: 7.0, badgeColor: 'bg-blue-500 text-white', remark: 'Good Effort. Keep Practicing Challenging Topics.' };
  } else if (percentage >= 51) {
    return { grade: 'C1', gpa: 6.0, badgeColor: 'bg-amber-500 text-white', remark: 'Above Average. Focus on Formulas & Grammar.' };
  } else if (percentage >= 41) {
    return { grade: 'C2', gpa: 5.0, badgeColor: 'bg-amber-600 text-white', remark: 'Average. Revise Weak Subject Areas Daily.' };
  } else if (percentage >= 35) {
    return { grade: 'D', gpa: 4.0, badgeColor: 'bg-orange-600 text-white', remark: 'Passed. Needs Intensive Practice Drills.' };
  } else {
    return { grade: 'E / Re-attempt', gpa: 0.0, badgeColor: 'bg-rose-600 text-white', remark: 'Needs Immediate Revision & Practice.' };
  }
}
