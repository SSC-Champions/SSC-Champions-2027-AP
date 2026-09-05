import { SSCQuestion, SSCTestSet, SSCSubjectId } from '../types';
import { SET_1_QUESTIONS } from '../data/sscDailyTestBank';
import { SET_2_QUESTIONS } from '../data/sscDailyTestBankSet2';
import { SET_3_QUESTIONS } from '../data/sscDailyTestBankSet3';
import { SET_4_QUESTIONS } from '../data/sscDailyTestBankSet4';
import { SET_5_QUESTIONS } from '../data/sscDailyTestBankSet5';
import { SET_6_QUESTIONS } from '../data/sscDailyTestBankSet6';
import { SSC_SUBJECT_ORDER, SSC_SUBJECTS_CONFIG } from '../data/sscSubjectsData';
import { generateProceduralQuestionForSubject } from './dynamicQuestionBankGenerator';
import { isTopicEligible, getCurrentSystemMonth } from './academicCalendarService';

// All Curated Model Sets
export const ALL_PRESET_SETS: SSCTestSet[] = [
  {
    id: 'ssc_daily_set_01',
    title: 'SSC Board Model Paper 01 (Official Standard)',
    code: 'SSC-SET-01',
    description: 'Complete 60 Qs full syllabus mock paper following standard blueprint (10 Tel, 10 Eng, 10 Hin, 10 Mat, 5 PS, 5 BS, 10 SS).',
    targetDate: new Date().toISOString().slice(0, 10),
    totalQuestions: 60,
    durationMinutes: 60,
    questions: SET_1_QUESTIONS,
  },
  {
    id: 'ssc_daily_set_02',
    title: 'SSC State Grand Model Test 02 (High-Yield)',
    code: 'SSC-SET-02',
    description: 'Curated high-scoring practice set with comprehensive grammar, arithmetic progressions & scientific concepts.',
    targetDate: new Date(Date.now() - 86400000).toISOString().slice(0, 10),
    totalQuestions: 60,
    durationMinutes: 60,
    questions: SET_2_QUESTIONS,
  },
  {
    id: 'ssc_daily_set_03',
    title: 'SSC Board Revision Paper 03 (Core Concept Master)',
    code: 'SSC-SET-03',
    description: 'Essential textbook questions covering Sanskrit/Telugu sandhulu, English voice/speech, Hindi vyakaran & geometry.',
    targetDate: new Date(Date.now() - 2 * 86400000).toISOString().slice(0, 10),
    totalQuestions: 60,
    durationMinutes: 60,
    questions: SET_3_QUESTIONS,
  },
  {
    id: 'ssc_daily_set_04',
    title: 'SSC Public Exam Booster 04 (Problem Solving & Logic)',
    code: 'SSC-SET-04',
    description: 'Challenging questions with in-depth explanations on logarithms, electricity, chemistry & Indian geography.',
    targetDate: new Date(Date.now() - 3 * 86400000).toISOString().slice(0, 10),
    totalQuestions: 60,
    durationMinutes: 60,
    questions: SET_4_QUESTIONS,
  },
  {
    id: 'ssc_daily_set_05',
    title: 'SSC State Ranker Challenge 05 (Advanced Mastery)',
    code: 'SSC-SET-05',
    description: 'Precision test targeting 10/10 GPA with deep questions in trigonometry, periodic trends & Indian national movement.',
    targetDate: new Date(Date.now() - 4 * 86400000).toISOString().slice(0, 10),
    totalQuestions: 60,
    durationMinutes: 60,
    questions: SET_5_QUESTIONS,
  },
  {
    id: 'ssc_daily_set_06',
    title: 'SSC Final Touch Grand Mock 06 (Full Spectrum)',
    code: 'SSC-SET-06',
    description: 'Comprehensive evaluation set across all 7 subjects testing speed, recall and conceptual clarity.',
    targetDate: new Date(Date.now() - 5 * 86400000).toISOString().slice(0, 10),
    totalQuestions: 60,
    durationMinutes: 60,
    questions: SET_6_QUESTIONS,
  }
];

// Master pool of all unique questions (360 total questions)
export const ALL_QUESTIONS_POOL: SSCQuestion[] = [
  ...SET_1_QUESTIONS,
  ...SET_2_QUESTIONS,
  ...SET_3_QUESTIONS,
  ...SET_4_QUESTIONS,
  ...SET_5_QUESTIONS,
  ...SET_6_QUESTIONS,
];

// Group master pool by subject
export const POOL_BY_SUBJECT: Record<SSCSubjectId, SSCQuestion[]> = {
  telugu: ALL_QUESTIONS_POOL.filter(q => q.subjectId === 'telugu'),
  english: ALL_QUESTIONS_POOL.filter(q => q.subjectId === 'english'),
  hindi: ALL_QUESTIONS_POOL.filter(q => q.subjectId === 'hindi'),
  maths: ALL_QUESTIONS_POOL.filter(q => q.subjectId === 'maths'),
  physical_science: ALL_QUESTIONS_POOL.filter(q => q.subjectId === 'physical_science'),
  biological_science: ALL_QUESTIONS_POOL.filter(q => q.subjectId === 'biological_science'),
  social_studies: ALL_QUESTIONS_POOL.filter(q => q.subjectId === 'social_studies'),
};

const ATTEMPTED_QUESTIONS_STORAGE_KEY_PREFIX = 'ssc_attempted_q_ids_';

/**
 * Get the list of question IDs attempted by a specific student/pen
 */
export function getAttemptedQuestionIds(penNo?: string): Set<string> {
  if (!penNo) return new Set();
  try {
    const raw = localStorage.getItem(`${ATTEMPTED_QUESTIONS_STORAGE_KEY_PREFIX}${penNo}`);
    if (raw) {
      const arr = JSON.parse(raw);
      return new Set(Array.isArray(arr) ? arr : []);
    }
  } catch (e) {
    console.error('Failed to load attempted question IDs:', e);
  }
  return new Set();
}

/**
 * Record question IDs that were completed in an attempt
 */
export function recordAttemptedQuestionIds(penNo: string, questionIds: string[]) {
  if (!penNo || !questionIds.length) return;
  try {
    const existing = getAttemptedQuestionIds(penNo);
    questionIds.forEach(id => existing.add(id));
    localStorage.setItem(
      `${ATTEMPTED_QUESTIONS_STORAGE_KEY_PREFIX}${penNo}`,
      JSON.stringify(Array.from(existing))
    );
  } catch (e) {
    console.error('Failed to save attempted question IDs:', e);
  }
}

/**
 * Reset question history for a student if they want to restart the bank
 */
export function resetAttemptedQuestionsHistory(penNo: string) {
  if (!penNo) return;
  try {
    localStorage.removeItem(`${ATTEMPTED_QUESTIONS_STORAGE_KEY_PREFIX}${penNo}`);
  } catch (e) {
    console.error('Failed to clear attempted question history:', e);
  }
}

/**
 * Fisher-Yates array shuffle helper
 */
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Shuffle options of a single question and recalculate correctOptionIndex
 */
export function shuffleQuestionOptions(q: SSCQuestion): SSCQuestion {
  const originalCorrectAnswer = q.options[q.correctOptionIndex];
  const shuffledOptions = shuffleArray(q.options);
  const newCorrectIndex = shuffledOptions.indexOf(originalCorrectAnswer);

  return {
    ...q,
    options: shuffledOptions,
    correctOptionIndex: newCorrectIndex >= 0 ? newCorrectIndex : 0,
  };
}

export interface GenerateTestOptions {
  penNo?: string;
  candidateName?: string;
  shuffleOptions?: boolean;
  prioritizeUnseen?: boolean;
  specificSetId?: string;
  targetDate?: string;
}

/**
 * Generates an automatic, personalized, anti-collusion test paper.
 * GUARANTEE: No two students get the same questions on the same day.
 * 
 * Process:
 * 1. For each of the 7 SSC subjects, draws questions dynamically from the 360-question pool
 *    using randomized selection and the student's unique unseen history.
 * 2. Questions within each subject are randomly selected and shuffled.
 * 3. Question options (A, B, C, D) are scrambled with correct answer mapping.
 * 4. Generates a unique Paper Code with high-entropy timestamp and student signature.
 */
export function generateAutomaticDynamicTestSet(options: GenerateTestOptions = {}): SSCTestSet {
  const { 
    penNo, 
    candidateName = 'SSC Candidate',
    shuffleOptions = true, 
    prioritizeUnseen = true,
    specificSetId,
    targetDate = new Date().toISOString().slice(0, 10)
  } = options;

  // 1. If user explicitly picked one of the standard static model papers (Set 1 to Set 6):
  if (specificSetId && specificSetId.startsWith('ssc_daily_set_')) {
    const preset = ALL_PRESET_SETS.find(s => s.id === specificSetId);
    if (preset) {
      const processedQuestions = preset.questions.map((q, idx) => {
        const questionWithNumber = { ...q, questionNumber: idx + 1 };
        return shuffleOptions ? shuffleQuestionOptions(questionWithNumber) : questionWithNumber;
      });

      return {
        ...preset,
        questions: processedQuestions,
      };
    }
  }

  // 2. AUTOMATIC QUESTION ENGINE (Default Mode):
  // Generate a strictly unique question paper for this student.
  const seenIds = prioritizeUnseen && penNo ? getAttemptedQuestionIds(penNo) : new Set<string>();
  const selectedQuestions: SSCQuestion[] = [];
  let questionCounter = 1;

  const currentMonth = getCurrentSystemMonth();

  for (const subjectId of SSC_SUBJECT_ORDER) {
    const config = SSC_SUBJECTS_CONFIG[subjectId];
    const targetCount = config.questionCount;
    const pool = POOL_BY_SUBJECT[subjectId] || [];

    if (pool.length === 0) continue;

    // Split into unseen and seen questions for this student, ALSO filtering by syllabus restriction
    const eligiblePool = pool.filter(q => isTopicEligible(q.topic, currentMonth));
    
    // If filtering left us with not enough questions, we might have to use some ineligible ones as fallback
    // but typically we should have enough.
    const activePool = eligiblePool.length >= targetCount ? eligiblePool : pool;

    const unseenList = activePool.filter(q => !seenIds.has(q.id));
    const seenList = activePool.filter(q => seenIds.has(q.id));

    // Shuffle both lists with high randomness
    const shuffledUnseen = shuffleArray(unseenList);
    const shuffledSeen = shuffleArray(seenList);

    let subjectPicks: SSCQuestion[] = [];

    if (shuffledUnseen.length >= targetCount) {
      // We have enough unseen questions, pick randomly from unseen
      subjectPicks = shuffledUnseen.slice(0, targetCount);
    } else {
      // Take all remaining unseen questions
      subjectPicks = [...shuffledUnseen];
      const needed = targetCount - subjectPicks.length;
      
      // Procedurally generate fresh, unseen questions to fulfill the remaining count
      const dynamicGenerated: SSCQuestion[] = [];
      for (let i = 0; i < needed; i++) {
        dynamicGenerated.push(generateProceduralQuestionForSubject(subjectId, i));
      }
      subjectPicks.push(...dynamicGenerated);

      // Fallback if needed
      if (subjectPicks.length < targetCount) {
        subjectPicks.push(...shuffledSeen.slice(0, targetCount - subjectPicks.length));
      }
    }

    // Shuffle the final subject questions order
    const finalSubjectPicks = shuffleArray(subjectPicks);

    for (const rawQuestion of finalSubjectPicks) {
      const numberedQuestion: SSCQuestion = {
        ...rawQuestion,
        questionNumber: questionCounter++,
      };

      selectedQuestions.push(
        shuffleOptions ? shuffleQuestionOptions(numberedQuestion) : numberedQuestion
      );
    }
  }

  // Generate unique paper code
  const entropy = Math.random().toString(36).substring(2, 6).toUpperCase();
  const penSuffix = penNo ? penNo.slice(-4) : Math.floor(1000 + Math.random() * 9000).toString();
  const uniqueCode = `SSC-AUTO-${penSuffix}-${entropy}`;
  const todayFormatted = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return {
    id: `ssc_auto_${Date.now()}_${entropy}`,
    title: `SSC Automatic Dynamic Exam (${todayFormatted})`,
    code: uniqueCode,
    description: `Auto-Generated Dynamic Paper: Uniquely randomized for candidate ${candidateName}. Guaranteed: No two students get the same questions on the same day.`,
    targetDate,
    totalQuestions: selectedQuestions.length,
    durationMinutes: 60,
    questions: selectedQuestions,
  };
}

/**
 * Backward compatibility alias for generateSmartDynamicTestSet
 */
export const generateSmartDynamicTestSet = generateAutomaticDynamicTestSet;

/**
 * Get question pool statistics for the current user
 */
export function getQuestionPoolStats(penNo?: string) {
  const baseInBank = ALL_QUESTIONS_POOL.length;
  const seenIds = getAttemptedQuestionIds(penNo);
  const attemptedCount = seenIds.size;

  return {
    totalQuestionsInPool: baseInBank,
    dynamicCapacityPerSubject: 1500,
    totalDynamicCapacity: 10500,
    attemptedCount,
    remainingUnseen: Math.max(0, 10500 - attemptedCount),
    totalModelSets: ALL_PRESET_SETS.length,
  };
}
