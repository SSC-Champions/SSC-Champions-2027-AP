import { doc, setDoc, getDocs, collection, query, where, deleteDoc, onSnapshot } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { getCurrentUser } from './authService';
import { 
  SSCTestSet, 
  SSCTestAttempt, 
  SSCSubjectId, 
  SSCQuestion, 
  UserAccount 
} from '../types';
import { SSC_SUBJECTS_CONFIG, SSC_SUBJECT_ORDER, getGPAGrade } from '../data/sscSubjectsData';
import { SSC_TEST_SETS } from '../data/sscDailyTestBank';

const ATTEMPTS_STORAGE_KEY = 'ssc_practice_test_attempts_v2';
const ACTIVE_TEST_STATE_KEY = 'ssc_active_test_session_v2';



export function syncAllAttemptsFromFirestore() {
  try {
    return onSnapshot(collection(db, 'attempts'), (snapshot) => {
      const attempts = snapshot.docs.map(d => d.data() as SSCTestAttempt);
      localStorage.setItem(ATTEMPTS_STORAGE_KEY, JSON.stringify(attempts));
      window.dispatchEvent(new Event('storage'));
    }, (error) => {
      console.warn('Sync warning (likely quota limit):', error.message);
    });
  } catch (e) {
    console.warn('Sync setup warning:', e);
    return () => {};
  }
}

export async function syncUserAttemptsFromFirestore(userId: string) {
  try {
    const q = query(collection(db, 'attempts'), where('userId', '==', userId));
    const snapshot = await getDocs(q);
    const attempts = snapshot.docs.map(d => d.data() as SSCTestAttempt);
    localStorage.setItem(ATTEMPTS_STORAGE_KEY, JSON.stringify(attempts));
  } catch (e) {
    console.error('Failed to sync attempts from firestore', e);
  }
}

export function getSavedAttempts(): SSCTestAttempt[] {
  try {
    const raw = localStorage.getItem(ATTEMPTS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SSCTestAttempt[];
    // Filter out the hardcoded mock dates to clean up local storage
    const mockDates = ['2026-08-25','2026-08-27','2026-08-29','2026-08-31','2026-09-01','2026-09-02'];
    return parsed.filter(a => !mockDates.includes(a.date));
  } catch (e) {
    console.error('Failed to load test attempts', e);
    return [];
  }
}


export function saveTestAttempt(attempt: SSCTestAttempt): void {
  try {
    const user = getCurrentUser();
    if (user) {
      attempt.userId = user.id; // Or user.userId if it exists
      // Fire and forget to Firestore
      setDoc(doc(db, 'attempts', attempt.id), attempt).catch(e => console.error(e));
    }

    const existing = getSavedAttempts();
    const updated = [attempt, ...existing.filter(a => a.id !== attempt.id)];
    localStorage.setItem(ATTEMPTS_STORAGE_KEY, JSON.stringify(updated));
    
    // clear active state on submit
    clearActiveTestSession();
  } catch (e) {
    console.error('Failed to save test attempt', e);
  }
}


export function getAttemptById(attemptId: string): SSCTestAttempt | null {
  const attempts = getSavedAttempts();
  return attempts.find(a => a.id === attemptId) || null;
}

export interface ActiveTestSession {
  setId: string;
  answers: Record<string, number>;
  markedForReview: Record<string, boolean>;
  startTime: number;
  timeRemainingSeconds: number;
  currentQuestionIndex: number;
  currentSubjectId: SSCSubjectId;
  isPaused: boolean;
}

export function saveActiveTestSession(session: ActiveTestSession): void {
  try {
    localStorage.setItem(ACTIVE_TEST_STATE_KEY, JSON.stringify(session));
  } catch (e) {
    // Ignore storage quota
  }
}

export function getActiveTestSession(): ActiveTestSession | null {
  try {
    const raw = localStorage.getItem(ACTIVE_TEST_STATE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

export function clearActiveTestSession(): void {
  try {
    localStorage.removeItem(ACTIVE_TEST_STATE_KEY);
  } catch (e) {}
}

export function calculateTestResult(
  testSet: SSCTestSet,
  answers: Record<string, number>,
  markedForReview: Record<string, boolean>,
  timeSpentSeconds: number,
  user?: UserAccount | null,
  guestName?: string
): SSCTestAttempt {
  let totalScore = 0;
  
  // Initialize breakdown for each subject
  const subjectBreakdown: SSCTestAttempt['subjectBreakdown'] = {} as any;
  
  for (const subId of SSC_SUBJECT_ORDER) {
    const config = SSC_SUBJECTS_CONFIG[subId];
    subjectBreakdown[subId] = {
      subjectName: config.name,
      totalQuestions: config.questionCount,
      attempted: 0,
      correct: 0,
      incorrect: 0,
      unattempted: config.questionCount,
      score: 0,
      percentage: 0,
    };
  }

  // Iterate all 60 questions
  testSet.questions.forEach((q) => {
    const sub = subjectBreakdown[q.subjectId];
    const selected = answers[q.id];

    if (selected !== undefined && selected !== null && selected >= 0) {
      sub.attempted += 1;
      sub.unattempted -= 1;

      if (selected === q.correctOptionIndex) {
        sub.correct += 1;
        sub.score += 1;
        totalScore += 1;
      } else {
        sub.incorrect += 1;
      }
    }
  });

  // Calculate percentages
  for (const subId of SSC_SUBJECT_ORDER) {
    const sub = subjectBreakdown[subId];
    sub.percentage = sub.totalQuestions > 0 ? Math.round((sub.score / sub.totalQuestions) * 100) : 0;
  }

  const maxScore = testSet.totalQuestions || 60;
  const percentage = Math.round((totalScore / maxScore) * 100);
  const gradeInfo = getGPAGrade(percentage);

  const attempt: SSCTestAttempt = {
    id: `att_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    setId: testSet.id,
    setTitle: testSet.title,
    studentName: user?.studentName || guestName || 'SSC Candidate',
    penNo: user?.penNo || undefined,
    schoolName: user?.schoolDetails?.schoolName || undefined,
    date: new Date().toISOString().slice(0, 10),
    timestamp: Date.now(),
    timeSpentSeconds,
    answers,
    markedForReview,
    questionsSnapshot: testSet.questions,
    totalScore,
    maxScore,
    percentage,
    gpaGrade: gradeInfo.grade,
    gradePoints: gradeInfo.gpa,
    subjectBreakdown,
  };

  return attempt;
}


export function deleteSavedAttempt(attemptId: string): void {
  try {
    deleteDoc(doc(db, 'attempts', attemptId)).catch(e => console.error(e));
    const existing = getSavedAttempts();
    const updated = existing.filter(a => a.id !== attemptId);
    localStorage.setItem(ATTEMPTS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to delete test attempt', e);
  }
}


export function clearAllSavedAttempts(): void {
  try {
    localStorage.removeItem(ATTEMPTS_STORAGE_KEY);
  } catch (e) {}
}

export interface SubjectStrengthDetail {
  id: SSCSubjectId;
  name: string;
  regionalName: string;
  totalAnswered: number;
  totalCorrect: number;
  accuracyRate: number; // percentage 0-100
  averageScoreOutOfWeightage: number;
  maxWeightage: number;
  status: 'Strong' | 'Average' | 'Focus Needed';
  color: string;
  recommendation: string;
}

export function getStudentSubjectStrengthAnalysis(attempts: SSCTestAttempt[]): SubjectStrengthDetail[] {
  const result: SubjectStrengthDetail[] = [];

  for (const subId of SSC_SUBJECT_ORDER) {
    const config = SSC_SUBJECTS_CONFIG[subId];
    let totalQuestionsPossible = 0;
    let totalAttempted = 0;
    let totalCorrect = 0;

    attempts.forEach(a => {
      const sub = a.subjectBreakdown?.[subId];
      if (sub) {
        totalQuestionsPossible += sub.totalQuestions;
        totalAttempted += sub.attempted;
        totalCorrect += sub.correct;
      }
    });

    const accuracyRate = totalAttempted > 0 
      ? Math.round((totalCorrect / totalAttempted) * 100) 
      : 0;

    const avgScore = attempts.length > 0 
      ? Number((totalCorrect / attempts.length).toFixed(1)) 
      : 0;

    let status: SubjectStrengthDetail['status'] = 'Average';
    let recommendation = 'Consistent daily mock practice will push this to full marks.';

    if (accuracyRate >= 80) {
      status = 'Strong';
      recommendation = 'Excellent mastery! Keep revising complex model paper problems to maintain speed.';
    } else if (accuracyRate >= 55) {
      status = 'Average';
      recommendation = 'Good foundation. Focus on tricky concepts and time management during practice.';
    } else {
      status = 'Focus Needed';
      recommendation = 'Priority focus area! Review chapter formulas and step-by-step solutions daily.';
    }

    result.push({
      id: subId,
      name: config.name,
      regionalName: config.regionalName,
      totalAnswered: totalAttempted,
      totalCorrect,
      accuracyRate,
      averageScoreOutOfWeightage: avgScore,
      maxWeightage: config.questionCount,
      status,
      color: config.color,
      recommendation,
    });
  }

  return result;
}

export function seedDemoAttemptsIfEmpty(user?: UserAccount | null): SSCTestAttempt[] {
  const existing = getSavedAttempts();
  if (existing.length > 0) {
    return existing;
  }

  const sampleDates = [
    '2026-08-25',
    '2026-08-27',
    '2026-08-29',
    '2026-08-31',
    '2026-09-01',
    '2026-09-02'
  ];

  const sampleScores = [42, 47, 51, 53, 56, 58];
  const sampleTimeSpent = [3200, 3100, 2950, 2800, 2750, 2600];

  const candidateName = user?.studentName || 'B. Sai Kumar';
  const penNo = user?.penNo || '2813070260301';
  const schoolName = user?.schoolDetails?.schoolName || 'ZPHS THUMMAPALA (28130702603)';

  const generatedAttempts: SSCTestAttempt[] = sampleDates.map((dateStr, idx) => {
    const score = sampleScores[idx];
    const percentage = Math.round((score / 60) * 100);
    const gradeInfo = getGPAGrade(percentage);

    const subjectBreakdown: Record<SSCSubjectId, any> = {
      telugu: { subjectName: 'Telugu', totalQuestions: 10, attempted: 10, correct: Math.min(10, Math.round(score * 0.17)), incorrect: 0, unattempted: 0, score: Math.min(10, Math.round(score * 0.17)), percentage: 0 },
      english: { subjectName: 'English', totalQuestions: 10, attempted: 10, correct: Math.min(10, Math.round(score * 0.16)), incorrect: 0, unattempted: 0, score: Math.min(10, Math.round(score * 0.16)), percentage: 0 },
      hindi: { subjectName: 'Hindi', totalQuestions: 10, attempted: 10, correct: Math.min(10, Math.round(score * 0.16)), incorrect: 0, unattempted: 0, score: Math.min(10, Math.round(score * 0.16)), percentage: 0 },
      maths: { subjectName: 'Mathematics', totalQuestions: 10, attempted: 10, correct: Math.min(10, Math.round(score * 0.18)), incorrect: 0, unattempted: 0, score: Math.min(10, Math.round(score * 0.18)), percentage: 0 },
      physical_science: { subjectName: 'Physical Science', totalQuestions: 5, attempted: 5, correct: Math.min(5, Math.round(score * 0.08)), incorrect: 0, unattempted: 0, score: Math.min(5, Math.round(score * 0.08)), percentage: 0 },
      biological_science: { subjectName: 'Biological Science', totalQuestions: 5, attempted: 5, correct: Math.min(5, Math.round(score * 0.08)), incorrect: 0, unattempted: 0, score: Math.min(5, Math.round(score * 0.08)), percentage: 0 },
      social_studies: { subjectName: 'Social Studies', totalQuestions: 10, attempted: 10, correct: Math.min(10, Math.round(score * 0.17)), incorrect: 0, unattempted: 0, score: Math.min(10, Math.round(score * 0.17)), percentage: 0 },
    };

    for (const subId of SSC_SUBJECT_ORDER) {
      const s = subjectBreakdown[subId];
      s.incorrect = s.attempted - s.correct;
      s.percentage = Math.round((s.correct / s.totalQuestions) * 100);
    }

    return {
      id: `seed_att_${idx + 1}_${Date.now()}`,
      setId: `ssc_model_paper_${(idx % 6) + 1}`,
      setTitle: `SSC Grand Practice Paper - Set ${(idx % 6) + 1}`,
      studentName: candidateName,
      penNo,
      schoolName,
      date: dateStr,
      timestamp: new Date(dateStr).getTime(),
      timeSpentSeconds: sampleTimeSpent[idx],
      answers: {},
      markedForReview: {},
      totalScore: score,
      maxScore: 60,
      percentage,
      gpaGrade: gradeInfo.grade,
      gradePoints: gradeInfo.gpa,
      subjectBreakdown,
    };
  });

  try {
    localStorage.setItem(ATTEMPTS_STORAGE_KEY, JSON.stringify(generatedAttempts));
  } catch (e) {}

  return generatedAttempts;
}

export function getStudentTestStatistics(penNo?: string): {
  totalAttempts: number;
  bestScore: number;
  averageScore: number;
  averageGpa: number;
  latestGpaGrade: string;
  totalTimeMinutes: number;
  streakDays: number;
  subjectMastery: Record<SSCSubjectId, number>; // avg percentage
} {
  let attempts = getSavedAttempts();
  if (penNo) {
    attempts = attempts.filter(a => a.penNo === penNo);
  } else {
    // If no penNo provided, return 0 stats (no public global stats)
    attempts = [];
  }

  if (attempts.length === 0) {
    return {
      totalAttempts: 0,
      bestScore: 0,
      averageScore: 0,
      averageGpa: 0,
      latestGpaGrade: 'N/A',
      totalTimeMinutes: 0,
      streakDays: 0,
      subjectMastery: {
        telugu: 0,
        english: 0,
        hindi: 0,
        maths: 0,
        physical_science: 0,
        biological_science: 0,
        social_studies: 0,
      },
    };
  }

  let best = 0;
  let scoreSum = 0;
  let gpaSum = 0;
  let timeSum = 0;
  const subSums: Record<SSCSubjectId, { sum: number; count: number }> = {
    telugu: { sum: 0, count: 0 },
    english: { sum: 0, count: 0 },
    hindi: { sum: 0, count: 0 },
    maths: { sum: 0, count: 0 },
    physical_science: { sum: 0, count: 0 },
    biological_science: { sum: 0, count: 0 },
    social_studies: { sum: 0, count: 0 },
  };

  const datesSet = new Set<string>();

  attempts.forEach((a) => {
    if (a.totalScore > best) best = a.totalScore;
    scoreSum += a.totalScore;
    gpaSum += a.gradePoints || 0;
    timeSum += a.timeSpentSeconds;
    datesSet.add(a.date);

    for (const subId of SSC_SUBJECT_ORDER) {
      if (a.subjectBreakdown && a.subjectBreakdown[subId]) {
        subSums[subId].sum += a.subjectBreakdown[subId].percentage;
        subSums[subId].count += 1;
      }
    }
  });

  const subjectMastery: Record<SSCSubjectId, number> = {} as any;
  for (const subId of SSC_SUBJECT_ORDER) {
    subjectMastery[subId] = subSums[subId].count > 0 
      ? Math.round(subSums[subId].sum / subSums[subId].count) 
      : 0;
  }

  const latestAttempt = attempts[0]; // sorted newest first

  return {
    totalAttempts: attempts.length,
    bestScore: best,
    averageScore: Math.round(scoreSum / attempts.length),
    averageGpa: Number((gpaSum / attempts.length).toFixed(1)),
    latestGpaGrade: latestAttempt?.gpaGrade || 'A1',
    totalTimeMinutes: Math.round(timeSum / 60),
    streakDays: datesSet.size,
    subjectMastery,
  };
}

export interface StreakDayStatus {
  date: string; // YYYY-MM-DD
  formattedDate: string; // "Sep 2"
  dayName: string; // "Wed"
  dayNumber: number;
  isToday: boolean;
  isCompleted: boolean;
  attemptCount: number;
  bestScore?: number;
  status: 'completed' | 'today_pending' | 'today_completed' | 'missed' | 'future';
}

export interface StreakMilestone {
  days: number;
  title: string;
  badge: string;
  description: string;
  unlocked: boolean;
}

export interface StudentStreakData {
  currentStreak: number;
  longestStreak: number;
  totalActiveDays: number;
  todayCompleted: boolean;
  todayDate: string;
  lastTestDate: string | null;
  weeklyDays: StreakDayStatus[];
  fourteenDays: StreakDayStatus[];
  milestones: StreakMilestone[];
  nextMilestone: StreakMilestone | null;
  milestoneProgressPercent: number;
  encouragementMessage: string;
}

function formatDateToISO(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getStudentStreakData(attempts: SSCTestAttempt[], customToday?: string): StudentStreakData {
  const now = customToday ? new Date(customToday) : new Date();
  const todayStr = formatDateToISO(now);

  // Group attempts by date
  const dateMap = new Map<string, { count: number; bestScore: number }>();
  attempts.forEach(a => {
    if (!a.date) return;
    const existing = dateMap.get(a.date) || { count: 0, bestScore: 0 };
    existing.count += 1;
    if (a.totalScore > existing.bestScore) {
      existing.bestScore = a.totalScore;
    }
    dateMap.set(a.date, existing);
  });

  const todayCompleted = dateMap.has(todayStr);

  // Calculate Current Streak
  let currentStreak = 0;
  let checkDate = new Date(now);

  if (todayCompleted) {
    // Start counting from today backwards
    while (true) {
      const dateKey = formatDateToISO(checkDate);
      if (dateMap.has(dateKey)) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
  } else {
    // Check if yesterday was completed
    checkDate.setDate(checkDate.getDate() - 1);
    const yesterdayKey = formatDateToISO(checkDate);
    if (dateMap.has(yesterdayKey)) {
      while (true) {
        const dateKey = formatDateToISO(checkDate);
        if (dateMap.has(dateKey)) {
          currentStreak++;
          checkDate.setDate(checkDate.getDate() - 1);
        } else {
          break;
        }
      }
    }
  }

  // Calculate Longest Streak in history
  const sortedDates = Array.from(dateMap.keys()).sort();
  let longestStreak = 0;
  let runningStreak = 0;
  let prevTimestamp: number | null = null;

  for (const dStr of sortedDates) {
    const d = new Date(dStr + 'T00:00:00');
    const time = d.getTime();
    if (prevTimestamp === null) {
      runningStreak = 1;
    } else {
      const diffDays = Math.round((time - prevTimestamp) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        runningStreak++;
      } else if (diffDays > 1) {
        runningStreak = 1;
      }
    }
    prevTimestamp = time;
    if (runningStreak > longestStreak) {
      longestStreak = runningStreak;
    }
  }

  if (currentStreak > longestStreak) {
    longestStreak = currentStreak;
  }

  // Generate 7-Day View (trailing 7 days including today)
  const weeklyDays: StreakDayStatus[] = [];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = formatDateToISO(d);
    const isToday = dateStr === todayStr;
    const info = dateMap.get(dateStr);
    const isCompleted = !!info;

    let status: StreakDayStatus['status'] = 'missed';
    if (isToday) {
      status = isCompleted ? 'today_completed' : 'today_pending';
    } else if (isCompleted) {
      status = 'completed';
    } else {
      status = 'missed';
    }

    weeklyDays.push({
      date: dateStr,
      formattedDate: d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      dayName: dayNames[d.getDay()],
      dayNumber: d.getDate(),
      isToday,
      isCompleted,
      attemptCount: info?.count || 0,
      bestScore: info?.bestScore,
      status,
    });
  }

  // Generate 14-Day View
  const fourteenDays: StreakDayStatus[] = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = formatDateToISO(d);
    const isToday = dateStr === todayStr;
    const info = dateMap.get(dateStr);
    const isCompleted = !!info;

    let status: StreakDayStatus['status'] = 'missed';
    if (isToday) {
      status = isCompleted ? 'today_completed' : 'today_pending';
    } else if (isCompleted) {
      status = 'completed';
    } else {
      status = 'missed';
    }

    fourteenDays.push({
      date: dateStr,
      formattedDate: d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      dayName: dayNames[d.getDay()],
      dayNumber: d.getDate(),
      isToday,
      isCompleted,
      attemptCount: info?.count || 0,
      bestScore: info?.bestScore,
      status,
    });
  }

  // Milestones
  const milestones: StreakMilestone[] = [
    { days: 3, title: 'Spark Starter', badge: '🥉 Bronze Spark', description: '3 consecutive days of practice tests', unlocked: currentStreak >= 3 },
    { days: 7, title: 'Flame Champion', badge: '🥈 7-Day Flame', description: 'One full week of daily SSC preparation', unlocked: currentStreak >= 7 },
    { days: 14, title: 'Gold Scholar', badge: '🥇 14-Day Scholar', description: 'Two continuous weeks of board practice', unlocked: currentStreak >= 14 },
    { days: 21, title: 'Grandmaster', badge: '💎 21-Day Elite', description: 'Consistent habit guaranteed to boost GPA', unlocked: currentStreak >= 21 },
    { days: 30, title: 'Board Topper', badge: '👑 30-Day Legend', description: 'Unstoppable consistency for 10/10 GPA', unlocked: currentStreak >= 30 },
  ];

  const nextMilestone = milestones.find(m => !m.unlocked) || null;
  let milestoneProgressPercent = 100;
  if (nextMilestone) {
    const prevMilestoneDays = milestones.filter(m => m.days < nextMilestone.days).pop()?.days || 0;
    const range = nextMilestone.days - prevMilestoneDays;
    const progress = currentStreak - prevMilestoneDays;
    milestoneProgressPercent = Math.min(100, Math.max(0, Math.round((progress / range) * 100)));
  }

  // Encouragement message
  let encouragementMessage = "Start a practice test today to ignite your daily preparation streak!";
  if (currentStreak >= 14) {
    encouragementMessage = "Phenomenal dedication! You are in the top 1% of students preparing daily for AP SSC 2026.";
  } else if (currentStreak >= 7) {
    encouragementMessage = "Outstanding 7+ day streak! Daily exam practice builds unmatched speed and question familiarity.";
  } else if (currentStreak >= 3) {
    encouragementMessage = "Awesome momentum! You're building a strong daily study habit. Keep the fire burning!";
  } else if (currentStreak >= 1) {
    if (todayCompleted) {
      encouragementMessage = "Great job finishing today's test! Return tomorrow to keep your streak growing.";
    } else {
      encouragementMessage = "You're on a streak! Complete today's test to maintain your consecutive record.";
    }
  }

  const lastTestDate = sortedDates.length > 0 ? sortedDates[sortedDates.length - 1] : null;

  return {
    currentStreak,
    longestStreak,
    totalActiveDays: dateMap.size,
    todayCompleted,
    todayDate: todayStr,
    lastTestDate,
    weeklyDays,
    fourteenDays,
    milestones,
    nextMilestone,
    milestoneProgressPercent,
    encouragementMessage,
  };
}

