import React, { useState } from 'react';
import { 
  SSCTestSet, 
  SSCTestAttempt, 
  UserAccount 
} from '../../types';
import { SSC_TEST_SETS } from '../../data/sscDailyTestBank';
import { calculateTestResult, saveTestAttempt } from '../../services/sscTestService';
import { recordAttemptedQuestionIds, ALL_PRESET_SETS } from '../../services/questionBankEngine';
import { SSCTestLobby } from './SSCTestLobby';
import { SSCTestExamView } from './SSCTestExamView';
import { SSCTestResultView } from './SSCTestResultView';
import confetti from 'canvas-confetti';

interface SSCDailyPracticeTestProps {
  currentUser: UserAccount | null;
  initialAttemptToReview?: SSCTestAttempt | null;
  onClearAttemptToReview?: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToRegistration?: () => void;
  onOpenLogin?: () => void;
  onOpenRegister?: () => void;
}

type TestState = 'lobby' | 'exam' | 'results';

export function SSCDailyPracticeTest({
  currentUser,
  initialAttemptToReview,
  onClearAttemptToReview,
  onNavigateToDashboard,
  onNavigateToRegistration,
  onOpenLogin,
  onOpenRegister
}: SSCDailyPracticeTestProps) {
  const [testState, setTestState] = useState<TestState>(() => {
    return initialAttemptToReview ? 'results' : 'lobby';
  });
  const [activeSet, setActiveSet] = useState<SSCTestSet>(() => {
    if (initialAttemptToReview?.questionsSnapshot && initialAttemptToReview.questionsSnapshot.length > 0) {
      return {
        id: initialAttemptToReview.setId,
        title: initialAttemptToReview.setTitle,
        code: initialAttemptToReview.setId.toUpperCase(),
        description: `Archived practice exam snapshot for ${initialAttemptToReview.studentName}`,
        targetDate: initialAttemptToReview.date,
        totalQuestions: initialAttemptToReview.questionsSnapshot.length,
        durationMinutes: 60,
        questions: initialAttemptToReview.questionsSnapshot,
      };
    }
    return SSC_TEST_SETS[0];
  });
  const [candidateName, setCandidateName] = useState<string>(currentUser?.studentName || '');
  const [currentAttempt, setCurrentAttempt] = useState<SSCTestAttempt | null>(() => initialAttemptToReview || null);

  React.useEffect(() => {
    if (initialAttemptToReview) {
      if (initialAttemptToReview.questionsSnapshot && initialAttemptToReview.questionsSnapshot.length > 0) {
        setActiveSet({
          id: initialAttemptToReview.setId,
          title: initialAttemptToReview.setTitle,
          code: initialAttemptToReview.setId.toUpperCase(),
          description: `Archived practice exam snapshot for ${initialAttemptToReview.studentName}`,
          targetDate: initialAttemptToReview.date,
          totalQuestions: initialAttemptToReview.questionsSnapshot.length,
          durationMinutes: 60,
          questions: initialAttemptToReview.questionsSnapshot,
        });
      }
      setCurrentAttempt(initialAttemptToReview);
      setTestState('results');
    }
  }, [initialAttemptToReview]);

  // Handle Starting a Test
  const handleStartTest = (selectedSet: SSCTestSet, name: string) => {
    if (!currentUser) {
      if (onOpenRegister) {
        onOpenRegister();
      }
      return;
    }
    setActiveSet(selectedSet);
    setCandidateName(name || currentUser.studentName);
    setTestState('exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Exam Submission
  const handleSubmitExam = (
    answers: Record<string, number>,
    markedForReview: Record<string, boolean>,
    timeSpentSeconds: number
  ) => {
    const result = calculateTestResult(
      activeSet,
      answers,
      markedForReview,
      timeSpentSeconds,
      currentUser,
      candidateName
    );

    // Record question IDs to prevent future repetition for this registered student
    if (currentUser?.penNo) {
      const questionIds = activeSet.questions.map(q => q.id);
      recordAttemptedQuestionIds(currentUser.penNo, questionIds);
    }

    saveTestAttempt(result);
    setCurrentAttempt(result);
    setTestState('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Trigger celebration confetti
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff'],
        zIndex: 9999
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff'],
        zIndex: 9999
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  // Retake same test
  const handleRetakeTest = () => {
    if (!currentUser) {
      if (onOpenRegister) {
        onOpenRegister();
      }
      return;
    }
    setTestState('exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back to lobby
  const handleBackToLobby = () => {
    if (onClearAttemptToReview) {
      onClearAttemptToReview();
    }
    setTestState('lobby');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // View past report from history
  const handleViewPastAttempt = (attempt: SSCTestAttempt) => {
    let matchingSet: SSCTestSet | undefined;
    if (attempt.questionsSnapshot && attempt.questionsSnapshot.length > 0) {
      matchingSet = {
        id: attempt.setId,
        title: attempt.setTitle,
        code: attempt.setId.toUpperCase(),
        description: `Archived practice exam snapshot for ${attempt.studentName}`,
        targetDate: attempt.date,
        totalQuestions: attempt.questionsSnapshot.length,
        durationMinutes: 60,
        questions: attempt.questionsSnapshot,
      };
    } else {
      matchingSet = ALL_PRESET_SETS.find(s => s.id === attempt.setId) || ALL_PRESET_SETS[0];
    }
    setActiveSet(matchingSet);
    setCurrentAttempt(attempt);
    setTestState('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full">
      {testState === 'lobby' && (
        <SSCTestLobby
          currentUser={currentUser}
          onStartTest={handleStartTest}
          onViewAttemptReport={handleViewPastAttempt}
          onNavigateToDashboard={onNavigateToDashboard}
          onOpenLogin={onOpenLogin}
          onOpenRegister={onOpenRegister}
        />
      )}

      {testState === 'exam' && (
        <SSCTestExamView
          testSet={activeSet}
          candidateName={candidateName}
          currentUser={currentUser}
          onSubmitTest={handleSubmitExam}
          onExitWithoutSaving={handleBackToLobby}
        />
      )}

      {testState === 'results' && currentAttempt && (
        <SSCTestResultView
          attempt={currentAttempt}
          testSet={activeSet}
          onRetakeTest={handleRetakeTest}
          onBackToLobby={handleBackToLobby}
        />
      )}
    </div>
  );
}

