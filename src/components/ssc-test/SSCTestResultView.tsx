import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { 
  SSCTestAttempt, 
  SSCTestSet, 
  SSCSubjectId, 
  SSCQuestion,
  AcademicStandardCode 
} from '../../types';
import { 
  SSC_SUBJECTS_CONFIG, 
  SSC_SUBJECT_ORDER, 
  TOTAL_SSC_QUESTIONS,
  getGPAGrade 
} from '../../data/sscSubjectsData';
import { 
  Trophy, 
  Award, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  RotateCcw, 
  Download, 
  Printer, 
  Share2, 
  Filter, 
  BookOpen, 
  Check, 
  Sparkles, 
  ChevronRight, 
  ChevronDown, 
  Flame, 
  Layers,
  ArrowLeft,
  Languages,
  Calculator,
  Atom,
  Dna,
  Globe2,
  TrendingUp,
  MapPin,
  BarChart3,
  Compass,
  FileCheck
} from 'lucide-react';
import { QuestionDiagramViewer } from './QuestionDiagramViewer';

interface SSCTestResultViewProps {
  attempt: SSCTestAttempt;
  testSet: SSCTestSet;
  onRetakeTest: () => void;
  onBackToLobby: () => void;
}

export function SSCTestResultView({
  attempt,
  testSet,
  onRetakeTest,
  onBackToLobby
}: SSCTestResultViewProps) {
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<'all' | 'correct' | 'incorrect' | 'unattempted'>('all');
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);

  // Trigger celebration confetti if score >= 60%
  useEffect(() => {
    if (attempt.percentage >= 60) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  }, [attempt.percentage]);

  const gradeInfo = getGPAGrade(attempt.percentage);
  const timeFormatted = `${Math.floor(attempt.timeSpentSeconds / 60)}m ${attempt.timeSpentSeconds % 60}s`;

  // Calculate total attempted
  let totalAttempted = 0;
  Object.values(attempt.subjectBreakdown).forEach(s => totalAttempted += s.attempted);
  const accuracy = totalAttempted > 0 ? Math.round((attempt.totalScore / totalAttempted) * 100) : 0;

  // Academic Standards Performance Breakdown (AS1 to AS6)
  const academicStandardsSummary = useMemo(() => {
    const standardsConfig: Record<AcademicStandardCode, { title: string; desc: string; icon: any; colorClass: string }> = {
      AS1: { 
        title: 'AS1: Conceptual Understanding', 
        desc: 'Core subject definitions, fundamental laws & numerical problems', 
        icon: BookOpen,
        colorClass: 'text-blue-700 bg-blue-50 border-blue-200'
      },
      AS2: { 
        title: 'AS2: Reading & Hypothesis', 
        desc: 'Passage comprehension, historical interpretation & questioning', 
        icon: FileCheck,
        colorClass: 'text-indigo-700 bg-indigo-50 border-indigo-200'
      },
      AS3: { 
        title: 'AS3: Experimentation & Field', 
        desc: 'Lab setups, chemical reactions & experimental procedures', 
        icon: Atom,
        colorClass: 'text-purple-700 bg-purple-50 border-purple-200'
      },
      AS4: { 
        title: 'AS4: Information Skills & Data', 
        desc: 'Statistical tables, demographic charts & data analysis', 
        icon: BarChart3,
        colorClass: 'text-amber-700 bg-amber-50 border-amber-200'
      },
      AS5: { 
        title: 'AS5: Mapping & Visual Skills', 
        desc: 'India & World maps, circuit schematics, ray diagrams & geometry', 
        icon: MapPin,
        colorClass: 'text-emerald-700 bg-emerald-50 border-emerald-200'
      },
      AS6: { 
        title: 'AS6: Daily Life & Appreciation', 
        desc: 'Environmental awareness, health biology & constitutional values', 
        icon: Sparkles,
        colorClass: 'text-rose-700 bg-rose-50 border-rose-200'
      }
    };

    const stats: Record<AcademicStandardCode, { total: number; correct: number; attempted: number }> = {
      AS1: { total: 0, correct: 0, attempted: 0 },
      AS2: { total: 0, correct: 0, attempted: 0 },
      AS3: { total: 0, correct: 0, attempted: 0 },
      AS4: { total: 0, correct: 0, attempted: 0 },
      AS5: { total: 0, correct: 0, attempted: 0 },
      AS6: { total: 0, correct: 0, attempted: 0 }
    };

    testSet.questions.forEach((q) => {
      const code: AcademicStandardCode = q.academicStandardCode || 'AS1';
      stats[code].total += 1;
      const selectedOpt = attempt.answers[q.id];
      const isAnswered = selectedOpt !== undefined && selectedOpt >= 0;
      if (isAnswered) {
        stats[code].attempted += 1;
        if (selectedOpt === q.correctOptionIndex) {
          stats[code].correct += 1;
        }
      }
    });

    return { standardsConfig, stats };
  }, [testSet.questions, attempt.answers]);

  // Filter questions for the solution explorer
  const filteredQuestions = testSet.questions.filter((q) => {
    // Subject filter
    if (selectedSubjectFilter !== 'all' && q.subjectId !== selectedSubjectFilter) {
      return false;
    }

    const selectedOpt = attempt.answers[q.id];
    const isAnswered = selectedOpt !== undefined && selectedOpt >= 0;
    const isCorrect = isAnswered && selectedOpt === q.correctOptionIndex;

    // Status filter
    if (selectedStatusFilter === 'correct' && !isCorrect) return false;
    if (selectedStatusFilter === 'incorrect' && (!isAnswered || isCorrect)) return false;
    if (selectedStatusFilter === 'unattempted' && isAnswered) return false;

    return true;
  });

  const getSubjectIcon = (id: SSCSubjectId) => {
    switch (id) {
      case 'telugu':
      case 'hindi':
        return <Languages className="w-4 h-4" />;
      case 'english':
        return <BookOpen className="w-4 h-4" />;
      case 'maths':
        return <Calculator className="w-4 h-4" />;
      case 'physical_science':
        return <Atom className="w-4 h-4" />;
      case 'biological_science':
        return <Dna className="w-4 h-4" />;
      case 'social_studies':
        return <Globe2 className="w-4 h-4" />;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Return action */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBackToLobby}
          className="bg-white hover:bg-slate-50 text-slate-700 font-semibold px-4 py-2 rounded-xl border border-slate-300 transition-colors inline-flex items-center gap-2 text-xs sm:text-sm cursor-pointer shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Practice Lobby</span>
        </button>

        <div className="flex items-center space-x-2.5">
          <button
            type="button"
            onClick={handlePrint}
            className="bg-white hover:bg-slate-50 text-slate-700 font-semibold px-3.5 py-2 rounded-xl border border-slate-300 transition-colors inline-flex items-center gap-1.5 text-xs sm:text-sm cursor-pointer shadow-xs"
            title="Print or Save Worksheet as PDF"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Print Report Sheet</span>
          </button>

          <button
            type="button"
            onClick={onRetakeTest}
            className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold px-4 py-2 rounded-xl transition-all shadow-md shadow-blue-600/20 inline-flex items-center gap-1.5 text-xs sm:text-sm cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Test</span>
          </button>
        </div>
      </div>

      {/* Main Scorecard Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-blue-900/60 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Column: Grade & Total Marks */}
          <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left space-y-3 border-b lg:border-b-0 lg:border-r border-white/15 pb-6 lg:pb-0 lg:pr-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-300 bg-blue-500/20 px-2.5 py-0.5 rounded border border-blue-400/30">
                Official Result Transcript
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-5xl sm:text-6xl font-black text-amber-400 tracking-tight">
                {attempt.totalScore}
              </span>
              <span className="text-xl sm:text-2xl font-bold text-slate-300">
                / {attempt.maxScore}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-sm font-extrabold px-3 py-1 rounded-lg ${gradeInfo.badgeColor} shadow-sm`}>
                Grade {attempt.gpaGrade} ({attempt.gradePoints} GPA)
              </span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-lg">
                {attempt.percentage}% Score
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              {gradeInfo.remark}
            </p>
          </div>

          {/* Right Column: Key Exam Metrics Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/10">
              <div className="flex items-center gap-1.5 text-xs text-slate-300 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Correct</span>
              </div>
              <p className="text-2xl font-black text-emerald-400">{attempt.totalScore}</p>
              <p className="text-[10px] text-slate-400">{attempt.percentage}% of test</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/10">
              <div className="flex items-center gap-1.5 text-xs text-slate-300 mb-1">
                <XCircle className="w-3.5 h-3.5 text-rose-400" />
                <span>Incorrect</span>
              </div>
              <p className="text-2xl font-black text-rose-400">{totalAttempted - attempt.totalScore}</p>
              <p className="text-[10px] text-slate-400">Mistakes</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/10">
              <div className="flex items-center gap-1.5 text-xs text-slate-300 mb-1">
                <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                <span>Accuracy</span>
              </div>
              <p className="text-2xl font-black text-amber-400">{accuracy}%</p>
              <p className="text-[10px] text-slate-400">of attempted</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/10">
              <div className="flex items-center gap-1.5 text-xs text-slate-300 mb-1">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                <span>Time Spent</span>
              </div>
              <p className="text-2xl font-black text-white">{timeFormatted}</p>
              <p className="text-[10px] text-slate-400">of 60 mins</p>
            </div>
          </div>
        </div>
      </div>

      {/* Subject-wise Performance Breakdown */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-600" />
              <span>Subject-wise Mastery Breakdown (All 7 Subjects)</span>
            </h3>
            <p className="text-xs text-slate-500">
              Detailed performance in each language, mathematics, science, and social studies section
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {SSC_SUBJECT_ORDER.map((subId) => {
            const config = SSC_SUBJECTS_CONFIG[subId];
            const data = attempt.subjectBreakdown[subId];
            if (!data) return null;

            return (
              <div
                key={subId}
                className={`p-4 rounded-xl border transition-all ${config.bgLight} ${config.borderClass} space-y-2.5 flex flex-col justify-between`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-slate-800 truncate">
                    {getSubjectIcon(subId)}
                    <span className="truncate">{config.name.split(' ')[0]}</span>
                  </div>
                  <span className={`text-xs font-black px-2 py-0.5 rounded-full border ${config.badgeClass}`}>
                    {data.score} / {data.totalQuestions}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-600 font-medium">
                    <span>Score: {data.percentage}%</span>
                    <span>{data.correct} Correct, {data.incorrect} Wrong</span>
                  </div>
                  <div className="w-full bg-slate-200/80 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-blue-600 transition-all duration-500"
                      style={{ width: `${data.percentage}%` }}
                    />
                  </div>
                </div>

                <p className="text-[10px] text-slate-500 truncate pt-1 border-t border-slate-200/60">
                  {config.syllabusOverview}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Academic Standards (AS1 - AS6) Competency Analysis */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" />
              <span>SSC Academic Standards (AS1 - AS6) Competency Analysis</span>
            </h3>
            <p className="text-xs text-slate-500">
              Evaluation mapped to Board Academic Standards: Concepts, Lab Experiments, Maps, Diagrams & Daily Life
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full w-fit">
            100% Curriculum Aligned
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(['AS1', 'AS2', 'AS3', 'AS4', 'AS5', 'AS6'] as AcademicStandardCode[]).map((code) => {
            const info = academicStandardsSummary.standardsConfig[code];
            const stats = academicStandardsSummary.stats[code];
            const Icon = info.icon;
            const pct = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;

            return (
              <div
                key={code}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col justify-between space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-lg border ${info.colorClass}`}>
                      <Icon className="w-4 h-4 shrink-0" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-xs">{info.title}</h4>
                      <p className="text-[10px] text-slate-500 line-clamp-1">{info.desc}</p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-slate-800 bg-white border border-slate-200 px-2 py-0.5 rounded shadow-2xs shrink-0">
                    {stats.correct}/{stats.total} Qs
                  </span>
                </div>

                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-[11px] font-semibold text-slate-600">
                    <span>Standard Mastery</span>
                    <span className={pct >= 70 ? 'text-emerald-700' : pct >= 40 ? 'text-amber-700' : 'text-rose-700'}>
                      {pct}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        pct >= 70 ? 'bg-emerald-500' : pct >= 40 ? 'bg-amber-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Solutions & Explanations Explorer */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span>Full Question-by-Question Solution Key & Explanations</span>
            </h3>
            <p className="text-xs text-slate-500">
              Review verified answers, formulas, grammar rules, and concepts for all 60 questions
            </p>
          </div>

          {/* Solution Filters */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Subject Filter Dropdown */}
            <select
              value={selectedSubjectFilter}
              onChange={(e) => setSelectedSubjectFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            >
              <option value="all">All Subjects (60 Qs)</option>
              {SSC_SUBJECT_ORDER.map((subId) => (
                <option key={subId} value={subId}>
                  {SSC_SUBJECTS_CONFIG[subId].name}
                </option>
              ))}
            </select>

            {/* Status Filter Buttons */}
            <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 font-semibold">
              <button
                type="button"
                onClick={() => setSelectedStatusFilter('all')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  selectedStatusFilter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All ({testSet.questions.length})
              </button>
              <button
                type="button"
                onClick={() => setSelectedStatusFilter('correct')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  selectedStatusFilter === 'correct' ? 'bg-emerald-600 text-white shadow-xs' : 'text-emerald-700 hover:text-emerald-900'
                }`}
              >
                Correct ({attempt.totalScore})
              </button>
              <button
                type="button"
                onClick={() => setSelectedStatusFilter('incorrect')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  selectedStatusFilter === 'incorrect' ? 'bg-rose-600 text-white shadow-xs' : 'text-rose-700 hover:text-rose-900'
                }`}
              >
                Incorrect ({totalAttempted - attempt.totalScore})
              </button>
              <button
                type="button"
                onClick={() => setSelectedStatusFilter('unattempted')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  selectedStatusFilter === 'unattempted' ? 'bg-slate-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Skipped ({TOTAL_SSC_QUESTIONS - totalAttempted})
              </button>
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {filteredQuestions.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-xs">
              No questions found matching your selected filter.
            </div>
          ) : (
            filteredQuestions.map((q) => {
              const selectedOpt = attempt.answers[q.id];
              const isAnswered = selectedOpt !== undefined && selectedOpt >= 0;
              const isCorrect = isAnswered && selectedOpt === q.correctOptionIndex;
              const subConfig = SSC_SUBJECTS_CONFIG[q.subjectId];

              return (
                <div
                  key={q.id}
                  className={`rounded-xl border p-5 transition-all space-y-4 ${
                    !isAnswered
                      ? 'border-slate-200 bg-slate-50/40'
                      : isCorrect
                      ? 'border-emerald-200 bg-emerald-50/20'
                      : 'border-rose-200 bg-rose-50/20'
                  }`}
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold bg-slate-800 text-white px-2.5 py-0.5 rounded">
                        Q{q.questionNumber}
                      </span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${subConfig.badgeClass}`}>
                        {subConfig.name}
                      </span>
                      {q.academicStandard && (
                        <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300 flex items-center gap-1">
                          <Award className="w-3 h-3 text-emerald-600" />
                          <span>{q.academicStandard}</span>
                        </span>
                      )}
                      <span className="text-[11px] text-slate-500 font-medium">
                        Topic: {q.topic}
                      </span>
                    </div>

                    <div>
                      {!isAnswered ? (
                        <span className="text-xs font-bold text-slate-500 bg-slate-200/80 px-2.5 py-0.5 rounded-full">
                          Unattempted
                        </span>
                      ) : isCorrect ? (
                        <span className="text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Correct (+1 Mark)
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-rose-800 bg-rose-100 border border-rose-300 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5 text-rose-600" />
                          Incorrect
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Question Text */}
                  <p className="font-semibold text-slate-900 text-sm sm:text-base leading-relaxed">
                    {q.questionText}
                  </p>

                  {/* Question Diagram / Map Viewer */}
                  {q.diagramData && (
                    <div className="my-2">
                      <QuestionDiagramViewer diagramData={q.diagramData} />
                    </div>
                  )}

                  {/* Options List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                    {q.options.map((opt, optIdx) => {
                      const letter = String.fromCharCode(65 + optIdx);
                      const isThisSelected = selectedOpt === optIdx;
                      const isThisCorrect = q.correctOptionIndex === optIdx;

                      let optStyle = 'border-slate-200 bg-white text-slate-700';
                      if (isThisCorrect) {
                        optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-1 ring-emerald-500';
                      } else if (isThisSelected && !isCorrect) {
                        optStyle = 'border-rose-500 bg-rose-50 text-rose-900 font-bold ring-1 ring-rose-500';
                      }

                      return (
                        <div
                          key={optIdx}
                          className={`p-3 rounded-lg border flex items-center justify-between gap-2 ${optStyle}`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-[10px] shrink-0">
                              {letter}
                            </span>
                            <span>{opt}</span>
                          </div>

                          <div className="shrink-0">
                            {isThisCorrect && (
                              <span className="text-[10px] bg-emerald-600 text-white font-bold px-1.5 py-0.5 rounded">
                                Correct Answer
                              </span>
                            )}
                            {isThisSelected && !isCorrect && (
                              <span className="text-[10px] bg-rose-600 text-white font-bold px-1.5 py-0.5 rounded">
                                Your Choice
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation Block */}
                  <div className="p-3.5 bg-blue-50/70 border border-blue-200/80 rounded-xl space-y-1 text-xs">
                    <p className="font-bold text-blue-900 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      <span>Step-by-Step Concept Explanation & Key Rule:</span>
                    </p>
                    <p className="text-slate-700 leading-relaxed">
                      {q.explanation}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
