import React, { useState, useEffect } from 'react';
import { SSCTestSet, SSCTestAttempt, UserAccount, SSCSubjectId } from '../../types';
import { SSC_SUBJECTS_CONFIG, SSC_SUBJECT_ORDER } from '../../data/sscSubjectsData';
import { getStudentTestStatistics, getSavedAttempts, getStudentStreakData } from '../../services/sscTestService';
import { getAllSchoolStudentRecords } from '../../services/studentDatabaseService';
import { 
  ALL_PRESET_SETS,
  generateAutomaticDynamicTestSet, 
  getQuestionPoolStats, 
  resetAttemptedQuestionsHistory 
} from '../../services/questionBankEngine';
import { 
  Clock, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  Award, 
  Flame, 
  History, 
  ArrowRight, 
  PlayCircle, 
  ShieldCheck, 
  AlertCircle,
  Calendar,
  Layers,
  GraduationCap,
  Calculator,
  Languages,
  Atom,
  Dna,
  Globe2,
  Lock,
  UserPlus,
  LogIn,
  ShieldAlert,
  Shuffle,
  RefreshCw,
  Check,
  Zap,
  BarChart3
} from 'lucide-react';

interface SSCTestLobbyProps {
  currentUser: UserAccount | null;
  onStartTest: (selectedSet: SSCTestSet, candidateName: string) => void;
  onViewAttemptReport: (attempt: SSCTestAttempt) => void;
  onNavigateToDashboard?: () => void;
  onOpenLogin?: () => void;
  onOpenRegister?: () => void;
}

export function SSCTestLobby({
  // Force component to re-render on sync
 
  currentUser, 
  onStartTest, 
  onViewAttemptReport,
  onNavigateToDashboard,
  onOpenLogin,
  onOpenRegister 
}: SSCTestLobbyProps) {
  const [selectedSetId, setSelectedSetId] = useState<string>('ssc_auto_dynamic_engine');
  const [candidateName, setCandidateName] = useState<string>(currentUser?.studentName || '');
  const [shuffleOptions, setShuffleOptions] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'lobby' | 'history' | 'syllabus'>('lobby');

  // Automatically sync candidate details and refresh test configuration on login
  React.useEffect(() => {
    if (currentUser?.studentName) {
      setCandidateName(currentUser.studentName);
    }
  }, [currentUser]);

  const stats = getStudentTestStatistics(currentUser?.penNo);
  const rawPastAttempts = getSavedAttempts();
  const pastAttempts = currentUser?.penNo ? rawPastAttempts.filter(a => a.penNo === currentUser.penNo) : [];
  const streakData = getStudentStreakData(pastAttempts);
  const poolStats = getQuestionPoolStats(currentUser?.penNo);

  const todayStr = new Date().toISOString().slice(0, 10);
  const formattedToday = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const allRecords = getAllSchoolStudentRecords();
  const totalRegistered = allRecords.length;
  const totalAttemptedToday = allRecords.filter(r => r.totalAttempts > 0 && r.lastAttemptDate === todayStr).length;

  const allAvailableSets = [
    {
      id: 'ssc_auto_dynamic_engine',
      title: `⚡ Automatic Dynamic Exam (Personalized Unique Paper)`,
      code: 'SSC-AUTO-DYNAMIC',
      description: `Automatic Exam Engine Active: Generates a completely unique, non-repeating 60-question paper tailored specifically for your PEN. No two students get the same questions on the same day.`,
      targetDate: todayStr,
      totalQuestions: 60,
      durationMinutes: 60,
      isSmart: true,
      questions: []
    },
    ...ALL_PRESET_SETS
  ];

  const selectedSet = allAvailableSets.find(s => s.id === selectedSetId) || allAvailableSets[0];

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

  const handleStart = () => {
    if (!currentUser) {
      if (onOpenRegister) {
        onOpenRegister();
      }
      return;
    }
    const name = candidateName.trim() || currentUser?.studentName || 'SSC Student';

    // Generate test with automatic dynamic questions engine
    const testToRun = generateAutomaticDynamicTestSet({
      penNo: currentUser.penNo,
      candidateName: name,
      shuffleOptions,
      prioritizeUnseen: true,
      specificSetId: selectedSetId === 'ssc_auto_dynamic_engine' ? undefined : selectedSetId,
      targetDate: todayStr
    });

    onStartTest(testToRun, name);
  };

  return (
    <div className="space-y-6">
      {/* Cinematic Live Global Stats Banner */}
      <div className="relative overflow-hidden rounded-xl bg-[#020b1c] border border-blue-500/30 shadow-md shadow-blue-900/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-[#020b1c] to-[#010613]"></div>
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
        <div className="relative p-2.5 sm:p-3 flex flex-col items-center justify-center gap-2 sm:gap-3 text-center">
          <div className="flex items-center justify-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-950/80 border border-blue-500/50 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)] shrink-0">
              <Globe2 className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <h2 className="text-blue-100 font-bold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2">
                LIVE STATE-WIDE MONITORING
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </h2>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 w-full">
            <div className="flex items-center justify-center gap-3 bg-black/40 px-4 py-1.5 rounded-lg border border-white/10 backdrop-blur-sm w-full sm:w-auto">
              <span className="text-[9px] sm:text-[10px] text-blue-300 uppercase tracking-wider font-bold">Total Students Registered ::</span>
              <span className="text-base sm:text-lg font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">{totalRegistered.toLocaleString()}</span>
            </div>
            
            <div className="flex items-center justify-center gap-3 bg-emerald-950/30 px-4 py-1.5 rounded-lg border border-emerald-500/30 backdrop-blur-sm shadow-[inset_0_0_15px_rgba(16,185,129,0.1)] w-full sm:w-auto">
              <span className="text-[9px] sm:text-[10px] text-emerald-400 uppercase tracking-wider font-bold animate-pulse">Total Students Attempt the Exam on today ::</span>
              <span className="text-base sm:text-lg font-black text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.6)]">{totalAttemptedToday.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cinematic Marquee & Quick Metrics */}
      <div className="bg-[#020b1c] rounded-2xl p-4 sm:p-5 border border-blue-900/50 shadow-[0_0_15px_rgba(59,130,246,0.15)] flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden">
        <style>{`
          @keyframes scroll-text {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
          .animate-marquee-text {
            animation: scroll-text 25s linear infinite;
            white-space: nowrap;
            display: inline-flex;
            min-width: 100%;
          }
        `}</style>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#020b1c] to-[#010613]"></div>
        
        <div 
          className="relative w-full overflow-hidden flex items-center"
          style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)', maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}
        >
          <div className="animate-marquee-text flex items-center gap-6 text-sm sm:text-base font-black tracking-wide pr-8">
            <span className="text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]">🏆 SSC ఛాంపియన్స్ – 2027</span>
            <span className="text-blue-500/50">|</span>
            <span className="text-blue-300">📚 చదువు • సాధన • విజయం</span>
            <span className="text-blue-500/50">|</span>
            <span className="text-emerald-400">🎯 ఈరోజు కష్టం… రేపటి విజయం!</span>
            <span className="text-blue-500/50">|</span>
            <span className="text-white">💪 నిన్నటికంటే ఈరోజు మెరుగ్గా ఉండండి</span>
            <span className="text-blue-500/50">|</span>
            <span className="text-amber-300">⭐ ప్రతి ప్రశ్న… విజయానికి ఒక అడుగు</span>
            <span className="text-blue-500/50">|</span>
            <span className="text-rose-400">🚀 నీ లక్ష్యం నీ చేతుల్లోనే ఉంది!</span>
            <span className="text-blue-500/50">|</span>
            <span className="text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]">🏆 SSC ఛాంపియన్స్ – 2027 | విజయం వైపు మీ తొలి అడుగు!</span>
          </div>
        </div>

        {/* Candidate Quick Stats Strip - Only show when logged in */}
        {currentUser && (
          <div className="flex items-center gap-3 sm:gap-4 shrink-0 bg-slate-50 p-2.5 sm:p-3 rounded-xl border border-slate-200">
            <div className="text-center px-2">
              <p className="text-[10px] uppercase font-bold text-slate-400">Attempts</p>
              <p className="text-base font-black text-slate-800">{stats.totalAttempts}</p>
            </div>
            <div className="h-8 w-[1px] bg-slate-200" />
            <div className="text-center px-2">
              <p className="text-[10px] uppercase font-bold text-slate-400">Best Score</p>
              <p className="text-base font-black text-amber-600">
                {stats.bestScore}<span className="text-[11px] text-slate-400">/60</span>
              </p>
            </div>
            <div className="h-8 w-[1px] bg-slate-200" />
            <div className="text-center px-2">
              <p className="text-[10px] uppercase font-bold text-slate-400">Streak</p>
              <p className="text-base font-black text-orange-600 flex items-center justify-center gap-0.5">
                <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                {streakData.currentStreak}d
              </p>
            </div>
            {onNavigateToDashboard && (
              <button
                type="button"
                onClick={onNavigateToDashboard}
                title="View full analytics & rankings"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200">
        <button
          type="button"
          onClick={() => setActiveTab('lobby')}
          className={`pb-3 px-4 font-bold text-sm transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
            activeTab === 'lobby'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <PlayCircle className="w-4 h-4" />
          <span>Practice Test Portal</span>
        </button>

        {currentUser && (
        <button
          type="button"
          onClick={() => setActiveTab('history')}
          className={`pb-3 px-4 font-bold text-sm transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
            activeTab === 'history'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <History className="w-4 h-4" />
          <span>My Test History ({pastAttempts.length})</span>
        </button>
        )}

        <button
          type="button"
          onClick={() => setActiveTab('syllabus')}
          className={`pb-3 px-4 font-bold text-sm transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
            activeTab === 'syllabus'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Subject Blueprint & Syllabus</span>
        </button>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'lobby' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Subject Grid & Test Sets */}
          <div className="lg:col-span-2 space-y-6">

            {/* Subject Distribution Blueprint Card */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                    7
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-800">
                      Exact 7-Subject Blueprint (60 Questions)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Standard question allotment calibrated for SSC 10th Board Exams
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full border border-slate-200">
                  Total: 60 Marks
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {SSC_SUBJECT_ORDER.map((subId) => {
                  const config = SSC_SUBJECTS_CONFIG[subId];
                  return (
                    <div
                      key={subId}
                      className={`p-3 rounded-lg border transition-all ${config.bgLight} ${config.borderClass} flex flex-col justify-between`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-1.5 text-slate-800 font-bold text-xs">
                          {getSubjectIcon(subId)}
                          <span>{config.name}</span>
                        </div>
                        <span className={`text-xs font-extrabold px-2 py-0.5 rounded-full border ${config.badgeClass}`}>
                          {config.questionCount} Qs
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 line-clamp-2 leading-snug">
                        {config.syllabusOverview}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>



            {/* Test Customization Options */}
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm space-y-3">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Shuffle className="w-4 h-4 text-indigo-600" />
                Exam Randomization & Anti-Collusion Settings
              </h4>
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={shuffleOptions}
                  onChange={(e) => setShuffleOptions(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                />
                <div className="text-xs">
                  <span className="font-semibold text-slate-800">Scramble Options Order (A, B, C, D)</span>
                  <p className="text-slate-500 text-[11px]">
                    Active by default: Randomizes option positions across all questions to prevent visual peeking in test halls.
                  </p>
                </div>
              </label>
            </div>

            {/* Exam Guidelines & Instructions */}
            <div className="bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-200 text-xs text-slate-700 space-y-2.5">
              <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                Examination Instructions & Rules
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600 list-disc list-inside">
                <li>Total test duration is strictly <strong>60 Minutes</strong> (1 hour).</li>
                <li>Each question carries <strong>1 mark</strong>. No negative marking.</li>
                <li>You can jump across any of the <strong>7 subjects</strong> at any time.</li>
                <li>Use <strong>Mark for Review</strong> to flag questions you want to recheck.</li>
                <li>Test will <strong>auto-submit</strong> when the 60:00 timer elapses.</li>
                <li>Detailed answer key & explanations are provided immediately on submission.</li>
              </ul>
            </div>
          </div>

          {/* Right Col: Candidate Details & Start Button */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-5 sticky top-6">
              {currentUser ? (
                /* State A: Registered Student Verified Profile */
                <>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Registered Candidate</span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mt-0.5">
                        {currentUser.studentName}
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono font-bold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg border border-blue-200">
                      PEN: {currentUser.penNo}
                    </span>
                  </div>

                  {/* Registered Candidate Details Card */}
                  <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 space-y-2 text-xs">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-slate-500 font-medium">School:</span>
                      <span className="font-bold text-slate-800 text-right truncate max-w-[170px]">
                        {currentUser.schoolDetails?.schoolName || 'AP High School'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">UDISE Code:</span>
                      <span className="font-mono font-bold text-slate-700">{currentUser.udiseCode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Location:</span>
                      <span className="font-medium text-slate-700">
                        {currentUser.mandal || currentUser.schoolDetails?.mandalName}, {currentUser.district || currentUser.schoolDetails?.districtName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 font-medium">Class / Sec:</span>
                      <span className="font-bold text-indigo-700">10th Standard (Sec {currentUser.section || 'A'})</span>
                    </div>
                  </div>

                  {/* Selected Test Summary */}
                  <div className="bg-blue-50 rounded-xl p-3.5 border border-blue-200 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-blue-900 font-bold">
                      <span>Selected Paper:</span>
                      <span>{selectedSet.code}</span>
                    </div>
                    <div className="flex justify-between text-blue-800">
                      <span>Questions:</span>
                      <span className="font-bold">{selectedSet.totalQuestions} Questions</span>
                    </div>
                    <div className="flex justify-between text-blue-800">
                      <span>Allowed Time:</span>
                      <span className="font-bold">{selectedSet.durationMinutes} Minutes (1 Hour)</span>
                    </div>
                    <div className="mt-2 text-xs text-blue-800 bg-white border border-blue-200 rounded p-2">
                      📚 Questions are generated only from the syllabus completed up to the current month as per the Academic Calendar.
                    </div>
                  </div>

                  {/* Primary Start CTA for Registered Candidate */}
                  <button
                    type="button"
                    onClick={handleStart}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-md shadow-emerald-600/20 hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base group"
                  >
                    <PlayCircle className="w-5 h-5 text-white" />
                    <span>Start Practice Test Now</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="flex items-center justify-between pt-1 text-xs text-slate-500">
                    <span>Timer starts upon click</span>
                    {onOpenLogin && (
                      <button
                        type="button"
                        onClick={onOpenLogin}
                        className="text-blue-600 hover:underline font-semibold"
                      >
                        Switch Candidate
                      </button>
                    )}
                  </div>
                </>
              ) : (
                /* State B: Unregistered / Guest Student -> Registration strictly required */
                <div className="space-y-4">
                  <div className="text-center p-2">
                    <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-2.5 shadow-sm border border-amber-200">
                      <Lock className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">
                      Registration Required
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Practice tests are restricted to registered candidates with a valid 11-digit PEN.
                    </p>
                  </div>

                  <div className="bg-amber-50/90 rounded-xl p-3.5 border border-amber-200/90 text-xs text-amber-950 space-y-2 leading-relaxed">
                    <div className="flex items-start gap-2">
                      <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <p className="font-medium">
                        <strong>Official AP Board Policy:</strong> To maintain genuine State Top 10 rankings and school-level analytics, guest attempts are disabled.
                      </p>
                    </div>
                  </div>

                  {/* Selected Test Summary preview */}
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-1.5 text-xs text-slate-600">
                    <div className="flex justify-between font-semibold text-slate-700">
                      <span>Mock Paper:</span>
                      <span className="text-blue-600">{selectedSet.code}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Questions:</span>
                      <span>60 Questions (7 Subjects)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span>60 Minutes</span>
                    </div>
                    <div className="mt-2 text-xs text-slate-500 bg-white border border-slate-200 rounded p-2">
                      📚 Questions are generated only from the syllabus completed up to the current month as per the Academic Calendar.
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2.5 pt-1">
                    {onOpenRegister && (
                      <button
                        type="button"
                        onClick={onOpenRegister}
                        className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md shadow-blue-600/20 hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer text-sm"
                      >
                        <UserPlus className="w-4 h-4" />
                        <span>Register to Attempt Test</span>
                      </button>
                    )}

                    {onOpenLogin && (
                      <button
                        type="button"
                        onClick={onOpenLogin}
                        className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 font-semibold py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-xs border border-slate-200"
                      >
                        <LogIn className="w-3.5 h-3.5" />
                        <span>Already Registered? Sign In</span>
                      </button>
                    )}
                  </div>

                  <p className="text-[11px] text-center text-slate-400">
                    Instant registration with PEN, school UDISE & 4-digit PIN
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Your Practice Test History</h3>
              <p className="text-xs text-slate-500">Review past attempts, score breakdowns, and answer keys</p>
            </div>
            <span className="text-xs font-bold bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200">
              Total Attempts: {pastAttempts.length}
            </span>
          </div>

          {pastAttempts.length === 0 ? (
            <div className="text-center py-12 text-slate-400 space-y-3">
              <History className="w-12 h-12 mx-auto text-slate-300" />
              <p className="text-sm font-medium">No test attempts recorded yet.</p>
              <button
                type="button"
                onClick={() => setActiveTab('lobby')}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Attempt Your First Test Now
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {pastAttempts.map((attempt) => (
                <div key={attempt.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-sm">{attempt.setTitle}</h4>
                      <span className="text-[10px] bg-slate-100 font-mono px-2 py-0.5 rounded text-slate-600">
                        {attempt.setId}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Submitted on: {new Date(attempt.timestamp || attempt.date).toLocaleString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-sm font-bold text-slate-900">
                        {attempt.totalScore} / {attempt.maxScore} Marks
                      </div>
                      <div className="text-xs text-emerald-600 font-semibold">
                        Grade: {attempt.gpaGrade} ({attempt.gradePoints.toFixed(1)} GPA)
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onViewAttemptReport(attempt)}
                      className="px-3.5 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <span>View Key</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Syllabus Tab */}
      {activeTab === 'syllabus' && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
          <div>
            <h3 className="text-lg font-bold text-slate-900">SSC Board 7-Subject Blueprint & Syllabus Details</h3>
            <p className="text-xs text-slate-500">Full 60-mark blueprint distribution across all Class 10 subjects</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SSC_SUBJECT_ORDER.map((subId) => {
              const cfg = SSC_SUBJECTS_CONFIG[subId];
              return (
                <div key={subId} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
                      {getSubjectIcon(subId)}
                      <span>{cfg.name}</span>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      {cfg.questionCount} Questions (100% Weightage)
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">
                    {cfg.regionalName}
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed pt-1 border-t border-slate-200">
                    <strong>Covered Topics:</strong> {cfg.syllabusOverview}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Academic Standards Blueprint Breakdown */}
          <div className="pt-4 border-t border-slate-200 space-y-3">
            <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>SSC Board Academic Standards (AS1 - AS6) Framework & Visual Question Coverage</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-200 space-y-1">
                <span className="font-bold text-blue-900">AS1: Conceptual Understanding</span>
                <p className="text-[11px] text-slate-600">Core definitions, theorems, mathematical proofs, grammar rules, scientific laws and principles.</p>
              </div>
              <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-200 space-y-1">
                <span className="font-bold text-indigo-900">AS2: Reading Text & Hypothesis</span>
                <p className="text-[11px] text-slate-600">Passage comprehension, historical perspective, asking questions, making predictions and hypotheses.</p>
              </div>
              <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-200 space-y-1">
                <span className="font-bold text-purple-900">AS3: Experimentation & Field Work</span>
                <p className="text-[11px] text-slate-600">Lab equipment, chemical reactions, ray box setups, titration, biology field observation & precautions.</p>
              </div>
              <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200 space-y-1">
                <span className="font-bold text-amber-900">AS4: Information Skills & Data Tables</span>
                <p className="text-[11px] text-slate-600">Data interpretation, demographic charts, periodic table patterns, climate graphs and statistical analysis.</p>
              </div>
              <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-1">
                <span className="font-bold text-emerald-900">AS5: Mapping Skills & Visual Diagrams</span>
                <p className="text-[11px] text-slate-600">India & World maps, circuit schematics, ray diagrams, anatomical cross-sections, and geometric shapes.</p>
              </div>
              <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-200 space-y-1">
                <span className="font-bold text-rose-900">AS6: Daily Life & Appreciation</span>
                <p className="text-[11px] text-slate-600">Environmental conservation, bioethics, renewable energy, constitutional values and real-world science applications.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
