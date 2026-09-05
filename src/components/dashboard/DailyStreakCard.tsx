import React, { useState } from 'react';
import { 
  Flame, 
  Calendar, 
  Trophy, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Award, 
  AlertCircle,
  PlayCircle,
  TrendingUp,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';
import { StudentStreakData, StreakDayStatus } from '../../services/sscTestService';

interface DailyStreakCardProps {
  streakData: StudentStreakData;
  onTakeTest: () => void;
}

export function DailyStreakCard({ streakData, onTakeTest }: DailyStreakCardProps) {
  const [activeView, setActiveView] = useState<'7days' | '14days'>('7days');
  const [selectedDay, setSelectedDay] = useState<StreakDayStatus | null>(null);

  const daysToShow = activeView === '7days' ? streakData.weeklyDays : streakData.fourteenDays;

  // Visual intensity based on current streak count
  const isZero = streakData.currentStreak === 0;
  const isHighStreak = streakData.currentStreak >= 7;
  const isSuperStreak = streakData.currentStreak >= 14;

  return (
    <div className="relative overflow-hidden bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-6">
      
      {/* Decorative background glow for active streaks */}
      {!isZero && (
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-gradient-to-br from-amber-400/10 via-orange-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />
      )}

      {/* TOP ROW: STREAK FLAME HERO & SUMMARY */}
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
        
        {/* Left: Flame Graphic & Big Count */}
        <div className="flex items-center gap-4 sm:gap-5">
          <div className={`relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl transition-transform ${
            isSuperStreak 
              ? 'bg-gradient-to-br from-amber-500 via-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/30'
              : isHighStreak
                ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-md shadow-orange-400/25'
                : streakData.currentStreak > 0
                  ? 'bg-gradient-to-br from-amber-100 to-orange-100 text-orange-600 border border-orange-200'
                  : 'bg-slate-100 text-slate-400 border border-slate-200'
          }`}>
            <Flame className={`w-9 h-9 sm:w-11 sm:h-11 ${
              streakData.currentStreak > 0 ? 'animate-pulse' : ''
            }`} />
            
            {/* Animated ember badge */}
            {streakData.todayCompleted && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white shadow-sm">
                ✓
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                Daily Practice Streak
              </span>
              {streakData.todayCompleted ? (
                <span className="px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Today Completed
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200 animate-pulse">
                  Today's Test Pending
                </span>
              )}
            </div>

            <div className="flex items-baseline gap-2 mt-1">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-mono">
                {streakData.currentStreak}
              </h2>
              <span className="text-base sm:text-lg font-bold text-slate-600">
                {streakData.currentStreak === 1 ? 'Day Streak' : 'Days Streak'}
              </span>
            </div>

            <p className="text-xs text-slate-500 mt-0.5">
              {streakData.encouragementMessage}
            </p>
          </div>
        </div>

        {/* Right: Key Streak Stats Grid */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3 w-full md:w-auto">
          <div className="bg-slate-50 rounded-2xl p-3 sm:p-3.5 border border-slate-100 text-center min-w-[90px]">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Longest</span>
            <span className="text-lg sm:text-xl font-black text-slate-800 font-mono">
              {streakData.longestStreak} <span className="text-xs font-normal text-slate-500">d</span>
            </span>
          </div>

          <div className="bg-slate-50 rounded-2xl p-3 sm:p-3.5 border border-slate-100 text-center min-w-[90px]">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Active Days</span>
            <span className="text-lg sm:text-xl font-black text-indigo-600 font-mono">
              {streakData.totalActiveDays} <span className="text-xs font-normal text-slate-500">d</span>
            </span>
          </div>

          <div className="bg-slate-50 rounded-2xl p-3 sm:p-3.5 border border-slate-100 text-center min-w-[90px]">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Next Target</span>
            <span className="text-lg sm:text-xl font-black text-amber-600 font-mono">
              {streakData.nextMilestone ? `${streakData.nextMilestone.days}d` : 'Max'}
            </span>
          </div>
        </div>
      </div>

      {/* MIDDLE ROW: INTERACTIVE STREAK TIMELINE / CALENDAR PILLS */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-500" />
            <h3 className="text-sm font-bold text-slate-900">
              Daily Activity & Consistency Log
            </h3>
          </div>

          {/* Toggle between 7 Days and 14 Days */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setActiveView('7days')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                activeView === '7days'
                  ? 'bg-white text-slate-900 shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Last 7 Days
            </button>
            <button
              onClick={() => setActiveView('14days')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                activeView === '14days'
                  ? 'bg-white text-slate-900 shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Last 14 Days
            </button>
          </div>
        </div>

        {/* Days Pill Grid */}
        <div className={`grid gap-2 sm:gap-2.5 ${
          activeView === '7days' 
            ? 'grid-cols-7' 
            : 'grid-cols-7 sm:grid-cols-14'
        }`}>
          {daysToShow.map((day) => {
            const isCompleted = day.isCompleted;
            const isToday = day.isToday;

            return (
              <div
                key={day.date}
                onClick={() => setSelectedDay(day)}
                className={`relative flex flex-col items-center justify-between p-2 sm:p-2.5 rounded-2xl border transition-all cursor-pointer select-none ${
                  isToday
                    ? isCompleted
                      ? 'bg-gradient-to-b from-emerald-50 to-teal-50 border-emerald-300 ring-2 ring-emerald-400/40 shadow-sm'
                      : 'bg-gradient-to-b from-amber-50 to-orange-50 border-amber-300 ring-2 ring-amber-400/40 shadow-sm animate-pulse'
                    : isCompleted
                      ? 'bg-emerald-50/70 border-emerald-200/80 hover:bg-emerald-100/70'
                      : 'bg-slate-50/80 border-slate-200/70 hover:bg-slate-100/80'
                }`}
              >
                {/* Day Name */}
                <span className="text-[10px] sm:text-[11px] font-bold uppercase text-slate-500">
                  {day.dayName}
                </span>

                {/* Day Date Number */}
                <span className={`text-xs sm:text-sm font-black font-mono my-1 ${
                  isToday 
                    ? 'text-slate-900' 
                    : isCompleted 
                      ? 'text-emerald-950' 
                      : 'text-slate-400'
                }`}>
                  {day.dayNumber}
                </span>

                {/* Status Indicator / Flame */}
                <div className="mt-1">
                  {isCompleted ? (
                    <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                      <Flame className="w-3.5 h-3.5 fill-white text-white" />
                    </div>
                  ) : isToday ? (
                    <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-xs">
                      <Clock className="w-3.5 h-3.5 animate-spin" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center">
                      <span className="text-[10px] font-bold">•</span>
                    </div>
                  )}
                </div>

                {/* Score or Today Tag */}
                <div className="mt-1.5 text-[9px] font-bold text-center">
                  {isCompleted && day.bestScore !== undefined ? (
                    <span className="text-emerald-700 bg-emerald-100/80 px-1.5 py-0.5 rounded font-mono">
                      {day.bestScore}m
                    </span>
                  ) : isToday ? (
                    <span className="text-amber-800 bg-amber-200/80 px-1 py-0.5 rounded font-extrabold uppercase tracking-tight">
                      Today
                    </span>
                  ) : (
                    <span className="text-slate-400 font-normal">
                      -
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Prompt if Today is Pending */}
        {!streakData.todayCompleted && (
          <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl p-4 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md shadow-orange-500/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center font-bold">
                <Flame className="w-6 h-6 text-amber-200 animate-bounce" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold">
                  Keep Your Streak Alive!
                </h4>
                <p className="text-xs text-amber-100">
                  Complete today's 60-question practice test before midnight to advance your streak to <strong>{streakData.currentStreak + 1} days</strong>.
                </p>
              </div>
            </div>

            <button
              onClick={onTakeTest}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white text-orange-700 font-black text-xs shadow-md hover:bg-amber-50 transition-all cursor-pointer hover:scale-[1.02]"
            >
              <PlayCircle className="w-4 h-4 text-orange-600" />
              <span>Take Today's Exam</span>
            </button>
          </div>
        )}
      </div>

      {/* BOTTOM ROW: STREAK MILESTONES & BADGES PROGRESSION */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 font-bold text-slate-800">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>Streak Milestones & Achievements</span>
          </div>

          {streakData.nextMilestone && (
            <span className="text-slate-500 font-medium">
              Progress to {streakData.nextMilestone.badge}: <strong className="text-slate-800 font-mono">{streakData.milestoneProgressPercent}%</strong>
            </span>
          )}
        </div>

        {/* Milestone Progress Bar */}
        {streakData.nextMilestone && (
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${streakData.milestoneProgressPercent}%` }}
            />
          </div>
        )}

        {/* Badges List */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-2">
          {streakData.milestones.map((m) => {
            return (
              <div
                key={m.days}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  m.unlocked
                    ? 'bg-gradient-to-b from-amber-50/60 to-orange-50/40 border-amber-200/80 shadow-xs'
                    : 'bg-slate-50/60 border-slate-200/60 opacity-60'
                }`}
              >
                <div className="text-lg sm:text-xl mb-1">
                  {m.badge.split(' ')[0]}
                </div>
                <h5 className="text-xs font-bold text-slate-900 leading-tight">
                  {m.title}
                </h5>
                <span className="text-[10px] font-mono font-bold text-slate-500 block mt-0.5">
                  {m.days} Days
                </span>
                <span className={`inline-block mt-1 text-[9px] font-extrabold px-1.5 py-0.5 rounded-full uppercase ${
                  m.unlocked 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-slate-200 text-slate-600'
                }`}>
                  {m.unlocked ? 'Unlocked' : 'Locked'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
