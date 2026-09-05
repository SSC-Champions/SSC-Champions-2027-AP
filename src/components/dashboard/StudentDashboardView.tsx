import React, { useState, useMemo, useEffect } from 'react';
import { 
  UserAccount, 
  SSCTestAttempt, 
  SSCTestSet,
  SSCSubjectId 
} from '../../types';
import { 
  getSavedAttempts, 
  getStudentTestStatistics, 
  getStudentSubjectStrengthAnalysis, 
  getStudentStreakData,
  seedDemoAttemptsIfEmpty,
  deleteSavedAttempt,
  clearAllSavedAttempts,
  SubjectStrengthDetail
} from '../../services/sscTestService';
import { DailyStreakCard } from './DailyStreakCard';
import { SubjectHeatmap } from './SubjectHeatmap';
import { SSC_SUBJECTS_CONFIG, SSC_SUBJECT_ORDER } from '../../data/sscSubjectsData';
import { ALL_PRESET_SETS } from '../../services/questionBankEngine';
import {
  Trophy,
  TrendingUp,
  Award,
  Activity,
  Clock,
  Flame,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  PlayCircle,
  Eye,
  Trash2,
  Download,
  Printer,
  Sparkles,
  BookOpen,
  Calendar,
  Layers,
  ChevronRight,
  Filter,
  BarChart3,
  PieChart as PieChartIcon,
  HelpCircle,
  RefreshCw,
  UserCheck,
  Zap,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  Cell
} from 'recharts';

interface StudentDashboardViewProps {
  currentUser: UserAccount | null;
  onTakeTest: () => void;
  onViewAttemptSnapshot: (attempt: SSCTestAttempt) => void;
  onOpenRegister?: () => void;
  onOpenLogin?: () => void;
}

export function StudentDashboardView({

  currentUser,
  onTakeTest,
  onViewAttemptSnapshot,
  onOpenRegister,
  onOpenLogin
}: StudentDashboardViewProps) {
  const [syncVersion, setSyncVersion] = useState(0);
  
  useEffect(() => {
    const handleStorage = () => setSyncVersion(v => v + 1);
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const [attempts, setAttempts] = useState<SSCTestAttempt[]>(() => {
    const all = getSavedAttempts();
    return currentUser?.penNo ? all.filter(a => a.penNo === currentUser.penNo) : [];
  });

  const [timeframeFilter, setTimeframeFilter] = useState<'all' | 'last10' | 'last5'>('all');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAttemptForQuickModal, setSelectedAttemptForQuickModal] = useState<SSCTestAttempt | null>(null);

  // Reload attempts on mount, user switch, or remote sync
  useEffect(() => {
    const all = getSavedAttempts();
    setAttempts(currentUser?.penNo ? all.filter(a => a.penNo === currentUser.penNo) : []);
  }, [currentUser, syncVersion]);

  // Handle seed data
  const handleLoadSampleData = () => {
    const seeded = getSavedAttempts();
    setAttempts(currentUser?.penNo ? seeded.filter(a => a.penNo === currentUser.penNo) : []);
  };

  // Handle attempt deletion
  const handleDeleteAttempt = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this test attempt from history?')) {
      deleteSavedAttempt(id);
      const all = getSavedAttempts();
      setAttempts(currentUser?.penNo ? all.filter(a => a.penNo === currentUser.penNo) : []);
    }
  };

  // Handle clear all
  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all practice test history? This cannot be undone.')) {
      clearAllSavedAttempts();
      setAttempts([]);
    }
  };

  // Compute Overall Stats
  const stats = useMemo(() => {
    return getStudentTestStatistics(currentUser?.penNo);
  }, [attempts, currentUser]);

  // Compute Streak Analytics
  const streakData = useMemo(() => {
    return getStudentStreakData(attempts);
  }, [attempts]);

  // Compute Subject Strength Analysis
  const subjectStrengths = useMemo(() => {
    return getStudentSubjectStrengthAnalysis(attempts);
  }, [attempts]);

  // Filtered attempts for progression chart (oldest to newest for chronological progress)
  const chartData = useMemo(() => {
    let sorted = [...attempts].sort((a, b) => a.timestamp - b.timestamp);
    if (timeframeFilter === 'last5') {
      sorted = sorted.slice(-5);
    } else if (timeframeFilter === 'last10') {
      sorted = sorted.slice(-10);
    }

    return sorted.map((att, index) => {
      const dateFormatted = new Date(att.date).toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric'
      });
      return {
        testNum: `#${index + 1}`,
        date: dateFormatted,
        fullDate: att.date,
        score: att.totalScore,
        percentage: att.percentage,
        gpaGrade: att.gpaGrade,
        gradePoints: att.gradePoints,
        title: att.setTitle || `Paper ${index + 1}`
      };
    });
  }, [attempts, timeframeFilter]);

  // Performance Trend Calculation
  const trendInsight = useMemo(() => {
    if (attempts.length < 2) return null;
    const sorted = [...attempts].sort((a, b) => a.timestamp - b.timestamp);
    const firstScore = sorted[0].totalScore;
    const latestScore = sorted[sorted.length - 1].totalScore;
    const diff = latestScore - firstScore;
    const percentChange = Math.round((diff / 60) * 100);

    return {
      diff,
      percentChange,
      isPositive: diff >= 0,
      firstScore,
      latestScore
    };
  }, [attempts]);

  // Filtered attempts for list table
  const filteredAttempts = useMemo(() => {
    return attempts.filter(att => {
      const matchesSearch = 
        att.setTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        att.date.includes(searchQuery) ||
        att.gpaGrade.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;
      return true;
    });
  }, [attempts, searchQuery]);

  // Subject Comparison Chart Data
  const subjectChartData = useMemo(() => {
    return subjectStrengths.map(s => ({
      name: s.name.split(' ')[0], // Short name
      fullName: s.name,
      accuracy: s.accuracyRate,
      avgScore: s.averageScoreOutOfWeightage,
      maxScore: s.maxWeightage,
      status: s.status,
      fillColor: s.status === 'Strong' ? '#10B981' : s.status === 'Average' ? '#F59E0B' : '#EF4444'
    }));
  }, [subjectStrengths]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* 1. TOP HEADER & PROFILE BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-800">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                <BarChart3 className="w-3.5 h-3.5 text-blue-400" />
                Student Performance & GPA Analytics
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30">
                <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                {streakData.currentStreak} Days Daily Streak
                {streakData.todayCompleted ? ' (Active)' : ' (Action Needed)'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
              <span>{currentUser?.studentName || 'Candidate Personal Dashboard'}</span>
            </h1>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-slate-300">
              <p className="flex items-center gap-1 font-mono">
                <span className="text-slate-400">PEN:</span> 
                <strong className="text-amber-300">{currentUser?.penNo || 'Guest / Local Session'}</strong>
              </p>
              <span>•</span>
              <p className="text-slate-300">
                {currentUser?.schoolDetails?.schoolName || 'AP Secondary Education Board Candidate'}
              </p>
            </div>
          </div>

          {/* Quick Action Controls */}
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onTakeTest}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-bold shadow-lg shadow-blue-600/30 transition-all cursor-pointer hover:scale-[1.02]"
            >
              <PlayCircle className="w-4 h-4 text-amber-300" />
              <span>Take New 60-Q Practice Exam</span>
            </button>

            {attempts.length > 0 && (
              <button
                onClick={() => window.print()}
                title="Print your performance summary"
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4 text-slate-300" />
                <span className="hidden sm:inline">Print Report</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. DAILY STREAK COUNTER & ENGAGEMENT VISUALIZER */}
      <DailyStreakCard 
        streakData={streakData}
        onTakeTest={onTakeTest}
      />

      {/* 3. FIVE KEY METRIC STAT CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
        
        {/* Card 1: Total Tests Taken */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between hover:border-blue-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tests Attempted</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">{stats.totalAttempts}</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Full 60-Question Mock Papers</p>
          </div>
        </div>

        {/* Card 2: Highest Score & Best Grade */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between hover:border-emerald-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Best Score</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Trophy className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600">{stats.bestScore}<span className="text-xs text-slate-400 font-normal">/60</span></p>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                {Math.round((stats.bestScore / 60) * 100)}%
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">Top Result Achieved</p>
          </div>
        </div>

        {/* Card 3: Average Score */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between hover:border-indigo-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Average Score</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl sm:text-3xl font-extrabold text-indigo-600">{stats.averageScore}<span className="text-xs text-slate-400 font-normal">/60</span></p>
            <p className="text-[11px] text-slate-500 mt-0.5">{Math.round((stats.averageScore / 60) * 100)}% Overall Mean</p>
          </div>
        </div>

        {/* Card 4: Average GPA Points */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between hover:border-amber-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Estimated GPA</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <p className="text-2xl sm:text-3xl font-extrabold text-amber-600">{stats.averageGpa}</p>
              <span className="text-xs font-black px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                Grade {stats.latestGpaGrade}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">Scale 10.0 AP Board</p>
          </div>
        </div>

        {/* Card 5: Total Preparation Time */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between hover:border-cyan-300 transition-all col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Practice Time</span>
            <div className="w-8 h-8 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl sm:text-3xl font-extrabold text-cyan-700">{stats.totalTimeMinutes} <span className="text-sm font-normal text-slate-500">mins</span></p>
            <p className="text-[11px] text-slate-500 mt-0.5">Time Invested in Speed Tests</p>
          </div>
        </div>
      </div>

      {/* 3. GPA & SCORE PROGRESSION OVER TIME (INTERACTIVE AREA CHART) */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Score & GPA Progression Over Time</h3>
                <p className="text-xs text-slate-500">Track your daily marks trajectory across consecutive mock examinations</p>
              </div>
            </div>
          </div>

          {/* Timeframe Filter Tabs */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setTimeframeFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                timeframeFilter === 'all'
                  ? 'bg-white text-blue-700 shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Tests ({attempts.length})
            </button>
            <button
              onClick={() => setTimeframeFilter('last10')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                timeframeFilter === 'last10'
                  ? 'bg-white text-blue-700 shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Last 10
            </button>
            <button
              onClick={() => setTimeframeFilter('last5')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                timeframeFilter === 'last5'
                  ? 'bg-white text-blue-700 shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Last 5
            </button>
          </div>
        </div>

        {/* Trend Banner */}
        {trendInsight && (
          <div className={`rounded-2xl p-4 border flex items-center justify-between gap-4 ${
            trendInsight.isPositive 
              ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
              : 'bg-amber-50/70 border-amber-200 text-amber-950'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                trendInsight.isPositive ? 'bg-emerald-200 text-emerald-800' : 'bg-amber-200 text-amber-800'
              }`}>
                {trendInsight.isPositive ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
              </div>
              <div>
                <h4 className="text-sm font-bold">
                  {trendInsight.isPositive ? 'Consistent Upward Momentum!' : 'Preparation Needs Re-focus'}
                </h4>
                <p className="text-xs text-slate-600">
                  {trendInsight.isPositive ? (
                    <>Your marks progressed from <strong>{trendInsight.firstScore}/60</strong> to <strong>{trendInsight.latestScore}/60</strong> (+{trendInsight.diff} marks gain, +{trendInsight.percentChange}% net improvement).</>
                  ) : (
                    <>Recent score changed by {trendInsight.diff} marks. Daily review of unattempted questions is recommended.</>
                  )}
                </p>
              </div>
            </div>
            <span className={`text-xs font-black px-3 py-1.5 rounded-xl uppercase tracking-wider ${
              trendInsight.isPositive ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
            }`}>
              {trendInsight.isPositive ? `+${trendInsight.diff} Marks` : `${trendInsight.diff} Marks`}
            </span>
          </div>
        )}

        {/* Recharts Chart Container */}
        {chartData.length > 0 ? (
          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fill: '#64748B', fontSize: 12, fontWeight: 500 }} 
                  axisLine={{ stroke: '#CBD5E1' }}
                  tickLine={false}
                />
                <YAxis 
                  domain={[0, 60]} 
                  ticks={[0, 15, 30, 45, 60]} 
                  tick={{ fill: '#64748B', fontSize: 12 }} 
                  axisLine={{ stroke: '#CBD5E1' }}
                  tickLine={false}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-900 text-white p-3.5 rounded-xl shadow-xl text-xs space-y-1.5 border border-slate-700">
                          <p className="font-bold text-amber-400">{data.title}</p>
                          <p className="text-slate-300">Date: {data.fullDate}</p>
                          <div className="pt-1 border-t border-slate-700 flex items-center justify-between gap-4">
                            <span>Score: <strong className="text-emerald-400 font-bold">{data.score} / 60</strong></span>
                            <span>Grade: <strong className="text-blue-300 font-bold">{data.gpaGrade} ({data.gradePoints} GPA)</strong></span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#2563EB" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#scoreGradient)" 
                  activeDot={{ r: 6, fill: '#1D4ED8', stroke: '#FFFFFF', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="py-12 text-center text-slate-400 text-sm">
            No test data available for this timeframe.
          </div>
        )}
      </div>

      {/* 4. SUBJECT-WISE STRENGTH & MASTERY ANALYSIS */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>Subject-Wise Strength & Competency Analysis</span>
            </h3>
            <p className="text-xs text-slate-500">
              Evaluated across all 7 SSC Class 10 subjects based on your accuracy and attempt velocity
            </p>
          </div>
        </div>

        {/* Subject Strength Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {subjectStrengths.map((sub) => {
            const isStrong = sub.status === 'Strong';
            const isAverage = sub.status === 'Average';
            const isFocus = sub.status === 'Focus Needed';

            return (
              <div 
                key={sub.id}
                className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm flex flex-col justify-between hover:shadow-md transition-all space-y-4"
              >
                <div>
                  {/* Subject Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{sub.name}</h4>
                      <p className="text-xs text-slate-500">{sub.regionalName}</p>
                    </div>
                    <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      isStrong 
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                        : isAverage 
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-rose-100 text-rose-800 border border-rose-200'
                    }`}>
                      {sub.status}
                    </span>
                  </div>

                  {/* Accuracy Bar & Metric */}
                  <div className="mt-4 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                      <span>Accuracy Rate</span>
                      <span className={isStrong ? 'text-emerald-700 font-bold' : isAverage ? 'text-amber-700 font-bold' : 'text-rose-700 font-bold'}>
                        {sub.accuracyRate}%
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          isStrong ? 'bg-emerald-500' : isAverage ? 'bg-amber-500' : 'bg-rose-500'
                        }`}
                        style={{ width: `${sub.accuracyRate}%` }}
                      />
                    </div>
                  </div>

                  {/* Weightage & Mean Stats */}
                  <div className="mt-3 grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Avg Score / Paper</span>
                      <strong className="text-slate-800">{sub.averageScoreOutOfWeightage} / {sub.maxWeightage}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Questions Practiced</span>
                      <strong className="text-slate-800">{sub.totalAnswered} Qs</strong>
                    </div>
                  </div>
                </div>

                {/* Recommendation Box */}
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-[11px] text-slate-600 leading-relaxed">
                  <p className="font-semibold text-slate-800 mb-0.5 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" /> Focus Recommendation:
                  </p>
                  {sub.recommendation}
                </div>
              </div>
            );
          })}
        </div>

        {/* Subject Comparison Bar Chart */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-blue-600" />
            <span>Subject Accuracy Comparison (% Mastery)</span>
          </h4>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectChartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#475569', fontSize: 11, fontWeight: 600 }}
                  axisLine={{ stroke: '#CBD5E1' }}
                  tickLine={false}
                />
                <YAxis 
                  domain={[0, 100]} 
                  ticks={[0, 25, 50, 75, 100]} 
                  unit="%" 
                  tick={{ fill: '#64748B', fontSize: 11 }}
                  axisLine={{ stroke: '#CBD5E1' }}
                  tickLine={false}
                />
                <Tooltip 
                  formatter={(value: any) => [`${value}% Accuracy`, 'Mastery']}
                  labelFormatter={(label) => `Subject: ${label}`}
                />
                <Bar dataKey="accuracy" radius={[6, 6, 0, 0]}>
                  {subjectChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fillColor} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      
      {/* 5. HISTORICAL SUBJECT MASTERY HEATMAP (D3.js) */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-600" />
              <span>Historical Subject Mastery Heatmap</span>
            </h3>
            <p className="text-xs text-slate-500">
              Track your subject-wise strengths and weaknesses across all completed tests over time.
            </p>
          </div>
        </div>
        <div className="mt-4 border border-slate-100 rounded-2xl p-2 bg-slate-50/50">
          <SubjectHeatmap attempts={attempts} />
        </div>
      </div>

      {/* 6. COMPLETE PAST TEST HISTORY WITH SNAPSHOT REVIEW */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-600" />
              <span>Full Practice Test History & Solution Archive</span>
            </h3>
            <p className="text-xs text-slate-500">
              Review every completed mock test, verify answers, and inspect step-by-step solutions
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <input
                type="text"
                placeholder="Search by test or grade..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3.5 py-2 pl-9 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Filter className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            </div>

            {attempts.length > 0 && (
              <button
                onClick={handleClearAll}
                className="text-xs font-semibold text-red-600 hover:text-red-700 px-3 py-2 rounded-xl hover:bg-red-50 transition-colors cursor-pointer"
              >
                Clear History
              </button>
            )}
          </div>
        </div>

        {/* History Table */}
        {filteredAttempts.length > 0 ? (
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">#</th>
                  <th className="py-3.5 px-4">Date & Test Title</th>
                  <th className="py-3.5 px-4 text-center">Score (Max 60)</th>
                  <th className="py-3.5 px-4 text-center">Percentage</th>
                  <th className="py-3.5 px-4 text-center">GPA Grade</th>
                  <th className="py-3.5 px-4 text-center">Time Spent</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/80">
                {filteredAttempts.map((att, idx) => {
                  const minutes = Math.floor(att.timeSpentSeconds / 60);
                  const seconds = att.timeSpentSeconds % 60;
                  const isTopGrade = att.gpaGrade.startsWith('A');

                  return (
                    <tr key={att.id} className="hover:bg-blue-50/40 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-500">
                        {idx + 1}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{att.setTitle}</div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                          <span>{att.date}</span>
                          <span>•</span>
                          <span className="font-mono text-slate-400">ID: {att.id.slice(0, 12)}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="text-sm font-extrabold text-slate-900">{att.totalScore}</span>
                        <span className="text-slate-400 font-normal"> / 60</span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="font-bold text-slate-800">{att.percentage}%</span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-black ${
                          isTopGrade 
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                            : 'bg-blue-100 text-blue-800 border border-blue-200'
                        }`}>
                          {att.gpaGrade} ({att.gradePoints} GPA)
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center text-slate-600 font-mono">
                        {minutes}m {seconds < 10 ? `0${seconds}` : seconds}s
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => onViewAttemptSnapshot(att)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Review Paper</span>
                          </button>
                          <button
                            onClick={(e) => handleDeleteAttempt(att.id, e)}
                            title="Delete attempt"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300 space-y-3">
            <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
            <h4 className="text-base font-bold text-slate-700">No test attempts match your search</h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Take a full 60-question daily practice exam to generate real-time GPA tracking and detailed solutions.
            </p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={onTakeTest}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow transition-colors cursor-pointer"
              >
                Take Daily Exam Now
              </button>
              <button
                onClick={handleLoadSampleData}
                className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs font-semibold shadow-sm transition-colors cursor-pointer"
              >
                Load Demo Performance Data
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
