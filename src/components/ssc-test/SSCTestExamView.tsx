import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  SSCTestSet, 
  SSCQuestion, 
  SSCSubjectId, 
  UserAccount 
} from '../../types';
import { 
  SSC_SUBJECTS_CONFIG, 
  SSC_SUBJECT_ORDER, 
  TOTAL_SSC_QUESTIONS, 
  TOTAL_SSC_DURATION_MINUTES 
} from '../../data/sscSubjectsData';
import { 
  Clock, 
  Flag, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  AlertTriangle, 
  HelpCircle, 
  RotateCcw, 
  Send, 
  Menu, 
  X, 
  ZoomIn, 
  ZoomOut, 
  Pause, 
  Play, 
  Eye,
  Languages,
  BookOpen,
  Calculator,
  Atom,
  Dna,
  Globe2,
  Bookmark,
  Award,
  Sparkles
} from 'lucide-react';
import { QuestionDiagramViewer } from './QuestionDiagramViewer';

interface SSCTestExamViewProps {
  testSet: SSCTestSet;
  candidateName: string;
  currentUser: UserAccount | null;
  onSubmitTest: (
    answers: Record<string, number>,
    markedForReview: Record<string, boolean>,
    timeSpentSeconds: number
  ) => void;
  onExitWithoutSaving: () => void;
}

export function SSCTestExamView({
  testSet,
  candidateName,
  currentUser,
  onSubmitTest,
  onExitWithoutSaving
}: SSCTestExamViewProps) {
  // 60 minutes = 3600 seconds
  const totalDurationSeconds = (testSet.durationMinutes || 60) * 60;
  const [timeRemaining, setTimeRemaining] = useState<number>(totalDurationSeconds);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [isExitModalOpen, setIsExitModalOpen] = useState<boolean>(false);
  const [isPaletteOpenMobile, setIsPaletteOpenMobile] = useState<boolean>(false);
  const [fontSizeLevel, setFontSizeLevel] = useState<'normal' | 'large' | 'xlarge'>('normal');

  const currentQuestion: SSCQuestion = testSet.questions[currentQuestionIndex] || testSet.questions[0];
  const currentSubjectId: SSCSubjectId = currentQuestion.subjectId;
  const currentSubjectConfig = SSC_SUBJECTS_CONFIG[currentSubjectId];

  // Subject question ranges mapping
  const subjectGroups = useMemo(() => {
    const groups: Record<SSCSubjectId, SSCQuestion[]> = {
      telugu: [],
      english: [],
      hindi: [],
      maths: [],
      physical_science: [],
      biological_science: [],
      social_studies: [],
    };
    testSet.questions.forEach((q) => {
      if (groups[q.subjectId]) {
        groups[q.subjectId].push(q);
      }
    });
    return groups;
  }, [testSet]);

  // Statistics for Palette
  const answeredCount = Object.keys(answers).filter(k => answers[k] !== undefined && answers[k] >= 0).length;
  const markedCount = Object.keys(markedForReview).filter(k => markedForReview[k]).length;
  const answeredAndMarkedCount = Object.keys(markedForReview).filter(
    k => markedForReview[k] && answers[k] !== undefined && answers[k] >= 0
  ).length;
  const unattemptedCount = testSet.questions.length - answeredCount;

  // Timer Tick
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto submit on zero
          handleFinalSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused]);

  // Format time MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isLowTime = timeRemaining <= 300; // < 5 mins

  // Final Submit Handler
  const handleFinalSubmit = useCallback(() => {
    const timeSpent = totalDurationSeconds - timeRemaining;
    onSubmitTest(answers, markedForReview, timeSpent);
  }, [answers, markedForReview, timeRemaining, totalDurationSeconds, onSubmitTest]);

  // Select Option Handler
  const handleSelectOption = (optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIndex,
    }));
  };

  // Clear Option
  const handleClearOption = () => {
    setAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentQuestion.id];
      return copy;
    });
  };

  // Toggle Mark for Review
  const handleToggleMarkForReview = () => {
    setMarkedForReview((prev) => ({
      ...prev,
      [currentQuestion.id]: !prev[currentQuestion.id],
    }));
  };

  // Navigation handlers
  const handleNext = () => {
    if (currentQuestionIndex < testSet.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleMarkAndNext = () => {
    setMarkedForReview((prev) => ({
      ...prev,
      [currentQuestion.id]: true,
    }));
    handleNext();
  };

  const jumpToSubject = (subId: SSCSubjectId) => {
    const targetQ = testSet.questions.find(q => q.subjectId === subId);
    if (targetQ) {
      const idx = testSet.questions.findIndex(q => q.id === targetQ.id);
      if (idx !== -1) setCurrentQuestionIndex(idx);
    }
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in inputs
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      if (e.key === '1' || e.key.toLowerCase() === 'a') handleSelectOption(0);
      else if (e.key === '2' || e.key.toLowerCase() === 'b') handleSelectOption(1);
      else if (e.key === '3' || e.key.toLowerCase() === 'c') handleSelectOption(2);
      else if (e.key === '4' || e.key.toLowerCase() === 'd') handleSelectOption(3);
      else if (e.key === 'ArrowRight') handleNext();
      else if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQuestionIndex, currentQuestion.id]);

  const getFontSizeClass = () => {
    if (fontSizeLevel === 'large') return 'text-lg leading-relaxed';
    if (fontSizeLevel === 'xlarge') return 'text-xl leading-loose';
    return 'text-base leading-normal';
  };

  const getOptionFontSizeClass = () => {
    if (fontSizeLevel === 'large') return 'text-base';
    if (fontSizeLevel === 'xlarge') return 'text-lg';
    return 'text-sm';
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-140px)] space-y-4 pt-28 sm:pt-20">
      {/* Top Examination Control Bar - Fixed for Exam Mode */}
      <div className="fixed top-0 left-0 w-full bg-[#0F172A] text-white px-4 sm:px-6 lg:px-8 py-3 shadow-2xl border-b border-slate-700 z-[60] flex justify-center">
        <div className="max-w-7xl w-full flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-xs">
            SSC
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold text-white truncate max-w-xs sm:max-w-md">
                {testSet.title}
              </h2>
              <span className="hidden md:inline-block text-[10px] bg-slate-700 text-slate-300 font-semibold px-2 py-0.5 rounded">
                {testSet.code}
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Candidate: <strong className="text-white">{candidateName}</strong> {currentUser?.penNo ? `• PEN: ${currentUser.penNo}` : ''}
            </p>
          </div>
        </div>

        {/* Live Countdown Timer & Action Controls */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Font Resizer */}
          <div className="hidden sm:flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700 text-xs">
            <button
              type="button"
              onClick={() => setFontSizeLevel('normal')}
              className={`px-2 py-0.5 rounded ${fontSizeLevel === 'normal' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
              title="Standard Font Size"
            >
              A
            </button>
            <button
              type="button"
              onClick={() => setFontSizeLevel('large')}
              className={`px-2 py-0.5 rounded ${fontSizeLevel === 'large' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
              title="Large Font Size"
            >
              A+
            </button>
            <button
              type="button"
              onClick={() => setFontSizeLevel('xlarge')}
              className={`px-2 py-0.5 rounded ${fontSizeLevel === 'xlarge' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
              title="Extra Large Font Size"
            >
              A++
            </button>
          </div>

          {/* Pause Toggle */}
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className="hidden sm:flex items-center gap-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1.5 rounded-lg border border-slate-700 cursor-pointer"
            title={isPaused ? "Resume Examination" : "Pause Timer"}
          >
            {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5 text-amber-400" />}
            <span>{isPaused ? 'Resume' : 'Pause'}</span>
          </button>

          {/* Countdown Clock Display */}
          <div className={`flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-2.5 rounded-xl font-mono font-black text-lg sm:text-2xl tracking-wider border-2 shadow-lg transition-all ${
            isLowTime 
              ? 'bg-rose-950/80 text-rose-300 border-rose-500 animate-pulse' 
              : 'bg-slate-800 text-emerald-400 border-slate-700'
          }`}>
            <Clock className={`w-5 h-5 sm:w-6 sm:h-6 ${isLowTime ? 'text-rose-400 animate-pulse' : 'text-emerald-400'}`} />
            <span>{formatTime(timeRemaining)}</span>
          </div>

          {/* Mobile Palette Toggle */}
          <button
            type="button"
            onClick={() => setIsPaletteOpenMobile(!isPaletteOpenMobile)}
            className="lg:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
          >
            <Menu className="w-4 h-4" />
          </button>

          {/* Submit Test Button */}
          <button
            type="button"
            onClick={() => setIsSubmitModalOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm sm:text-base px-5 py-2.5 sm:py-3 rounded-xl shadow-lg shadow-emerald-900/50 cursor-pointer transition-all flex items-center gap-2 uppercase tracking-wide"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Test</span>
          </button>
        </div>
        </div>
      </div>

      {/* Paused Overlay Alert */}
      {isPaused && (
        <div className="bg-amber-500/10 border-2 border-amber-500/30 rounded-xl p-4 text-center text-amber-900 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Pause className="w-5 h-5 text-amber-600" />
            <span>Test Timer is currently paused. Examination questions are hidden until resumed.</span>
          </div>
          <button
            type="button"
            onClick={() => setIsPaused(false)}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-4 py-1.5 rounded-lg cursor-pointer flex items-center gap-1"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Resume Test Now</span>
          </button>
        </div>
      )}

      {/* Subject Section Navigation Bar */}
      <div className="bg-white rounded-xl p-2 sm:p-2.5 border border-slate-200 shadow-sm overflow-x-auto scrollbar-thin">
        <div className="flex items-center gap-2 min-w-max">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2">
            Sections:
          </span>
          {SSC_SUBJECT_ORDER.map((subId) => {
            const config = SSC_SUBJECTS_CONFIG[subId];
            const isCurrentSub = currentSubjectId === subId;
            const subQuestions = subjectGroups[subId];
            const subAnswered = subQuestions.filter(q => answers[q.id] !== undefined && answers[q.id] >= 0).length;

            return (
              <button
                key={subId}
                type="button"
                onClick={() => jumpToSubject(subId)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
                  isCurrentSub
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <span>{config.name.split(' ')[0]}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                  isCurrentSub ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {subAnswered}/{config.questionCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Examination Hall Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 items-start">
        {/* Left 3 Columns: Active Question Area */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between overflow-hidden min-h-[500px]">
          {/* Question Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/70 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="text-xs sm:text-sm font-extrabold text-white bg-blue-600 px-3 py-1 rounded-lg">
                Question {currentQuestion.questionNumber} of {TOTAL_SSC_QUESTIONS}
              </span>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-md border ${currentSubjectConfig.badgeClass}`}>
                {currentSubjectConfig.name} ({currentSubjectConfig.questionCount} Qs)
              </span>
              {currentQuestion.academicStandard && (
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-300 flex items-center gap-1 shadow-2xs">
                  <Award className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span>{currentQuestion.academicStandard}</span>
                </span>
              )}
              <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 hidden sm:inline-block">
                Topic: {currentQuestion.topic}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={handleToggleMarkForReview}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer ${
                  markedForReview[currentQuestion.id]
                    ? 'bg-purple-600 text-white border-purple-700 shadow-sm'
                    : 'bg-white text-purple-700 border-purple-200 hover:bg-purple-50'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>{markedForReview[currentQuestion.id] ? 'Marked for Review' : 'Mark for Review'}</span>
              </button>
            </div>
          </div>

          {/* Question Body */}
          <div className="p-6 sm:p-8 space-y-6 flex-1">
            {/* Question Text */}
            <div className="space-y-3">
              <p className={`font-semibold text-slate-900 ${getFontSizeClass()}`}>
                {currentQuestion.questionText}
              </p>
              {currentQuestion.contextOrPassage && (
                <div className="p-3.5 bg-amber-50/70 border-l-4 border-amber-500 rounded text-xs sm:text-sm text-slate-700 italic">
                  {currentQuestion.contextOrPassage}
                </div>
              )}
              {/* Question Diagram / Map / Data Table */}
              {currentQuestion.diagramData && (
                <div className="my-3">
                  <QuestionDiagramViewer diagramData={currentQuestion.diagramData} />
                </div>
              )}
            </div>

            {/* Options List */}
            <div className="space-y-3 pt-2">
              {currentQuestion.options.map((optionText, optIdx) => {
                const isSelected = answers[currentQuestion.id] === optIdx;
                const letter = String.fromCharCode(65 + optIdx); // A, B, C, D

                return (
                  <div
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3.5 ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 shadow-sm ring-2 ring-blue-500/20'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60 bg-white'
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}>
                      {letter}
                    </div>

                    <div className="flex-1 pt-0.5">
                      <p className={`font-medium text-slate-800 ${getOptionFontSizeClass()}`}>
                        {optionText}
                      </p>
                    </div>

                    <div className="shrink-0 pt-0.5">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isSelected ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                      }`}>
                        {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Question Footer Controls */}
          <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50/70 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentQuestionIndex === 0}
                className="px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 text-xs sm:text-sm font-semibold hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <button
                type="button"
                onClick={handleClearOption}
                disabled={answers[currentQuestion.id] === undefined}
                className="px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                Clear Choice
              </button>
            </div>

            <div className="flex items-center space-x-2.5">
              <button
                type="button"
                onClick={handleMarkAndNext}
                className="px-3.5 py-2 rounded-lg border border-purple-300 bg-purple-50 hover:bg-purple-100 text-purple-800 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                Mark & Next
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs sm:text-sm font-bold shadow-sm transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Save & Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right 1 Column: Question Palette (Desktop & Mobile Drawer) */}
        <div className={`bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-5 ${
          isPaletteOpenMobile ? 'fixed inset-x-4 top-20 bottom-4 z-30 overflow-y-auto max-w-lg mx-auto' : 'hidden lg:block'
        }`}>
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Question Palette</h3>
              <p className="text-[11px] text-slate-500">
                {answeredCount} of {TOTAL_SSC_QUESTIONS} Answered ({Math.round((answeredCount/TOTAL_SSC_QUESTIONS)*100)}%)
              </p>
            </div>
            {isPaletteOpenMobile && (
              <button
                type="button"
                onClick={() => setIsPaletteOpenMobile(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Overall Progress Bar */}
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full transition-all duration-300"
              style={{ width: `${(answeredCount / TOTAL_SSC_QUESTIONS) * 100}%` }}
            />
          </div>

          {/* Palette Status Legend */}
          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            <div className="flex items-center gap-1.5">
              <div className="w-3.5 h-3.5 rounded bg-emerald-600 text-white font-bold flex items-center justify-center text-[9px]">✓</div>
              <span>Answered ({answeredCount})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3.5 h-3.5 rounded bg-purple-600 text-white font-bold flex items-center justify-center text-[9px]">★</div>
              <span>Review ({markedCount})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3.5 h-3.5 rounded bg-slate-200 border border-slate-300" />
              <span>Unattempted ({unattemptedCount})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3.5 h-3.5 rounded bg-blue-50 border-2 border-blue-600" />
              <span>Current Item</span>
            </div>
          </div>

          {/* 60-Question Grid by Section */}
          <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1 scrollbar-thin">
            {SSC_SUBJECT_ORDER.map((subId) => {
              const config = SSC_SUBJECTS_CONFIG[subId];
              const qList = subjectGroups[subId];

              return (
                <div key={subId} className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                    <span>{config.name}</span>
                    <span className="text-slate-400 font-normal">({config.questionCount} Qs)</span>
                  </div>

                  <div className="grid grid-cols-5 gap-1.5">
                    {qList.map((q) => {
                      const qIndex = testSet.questions.findIndex(item => item.id === q.id);
                      const isCurrent = currentQuestionIndex === qIndex;
                      const hasAnswered = answers[q.id] !== undefined && answers[q.id] >= 0;
                      const isMarked = markedForReview[q.id];

                      let btnStyle = 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200';
                      if (hasAnswered && isMarked) {
                        btnStyle = 'bg-purple-600 text-white border-purple-700 ring-2 ring-emerald-400';
                      } else if (hasAnswered) {
                        btnStyle = 'bg-emerald-600 text-white border-emerald-700 shadow-xs';
                      } else if (isMarked) {
                        btnStyle = 'bg-purple-600 text-white border-purple-700';
                      }

                      if (isCurrent) {
                        btnStyle += ' ring-2 ring-blue-600 ring-offset-1 font-extrabold';
                      }

                      return (
                        <button
                          key={q.id}
                          type="button"
                          onClick={() => {
                            setCurrentQuestionIndex(qIndex);
                            if (isPaletteOpenMobile) setIsPaletteOpenMobile(false);
                          }}
                          className={`h-8 rounded-lg font-bold text-xs border transition-all cursor-pointer flex items-center justify-center ${btnStyle}`}
                          title={`Q${q.questionNumber}: ${config.name}`}
                        >
                          {q.questionNumber}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Submit inside Palette */}
          <button
            type="button"
            onClick={() => setIsSubmitModalOpen(true)}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-lg text-xs shadow-sm transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Review & Submit Paper</span>
          </button>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800">
                  Submit Daily Practice Paper?
                </h3>
                <p className="text-xs text-slate-500">
                  Review your completion status before finalizing
                </p>
              </div>
            </div>

            {/* Status Breakdown Grid */}
            <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
              <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200">
                <p className="text-[10px] text-emerald-700 font-bold uppercase">Answered</p>
                <p className="text-xl font-extrabold text-emerald-800 mt-0.5">{answeredCount}</p>
                <p className="text-[10px] text-emerald-600">of 60 questions</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-3 border border-purple-200">
                <p className="text-[10px] text-purple-700 font-bold uppercase">Review</p>
                <p className="text-xl font-extrabold text-purple-800 mt-0.5">{markedCount}</p>
                <p className="text-[10px] text-purple-600">flagged items</p>
              </div>
              <div className="bg-rose-50 rounded-xl p-3 border border-rose-200">
                <p className="text-[10px] text-rose-700 font-bold uppercase">Left</p>
                <p className="text-xl font-extrabold text-rose-800 mt-0.5">{unattemptedCount}</p>
                <p className="text-[10px] text-rose-600">unanswered</p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="w-4 h-4 text-slate-400" />
                Time Remaining:
              </span>
              <span className="font-mono font-bold text-slate-900 text-sm">
                {formatTime(timeRemaining)}
              </span>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setIsSubmitModalOpen(false)}
                className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Continue Practice
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitModalOpen(false);
                  handleFinalSubmit();
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition-all cursor-pointer"
              >
                Yes, Final Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
