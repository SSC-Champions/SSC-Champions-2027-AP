import { useState, useMemo, useEffect } from 'react';
import { 
  Trophy, 
  Calendar, 
  Clock, 
  MapPin, 
  Building2, 
  Award, 
  Filter, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  User, 
  Flame,
  ChevronRight,
  BookOpen,
  Share2,
  ShieldCheck
} from 'lucide-react';
import { TimeframeFilter, LeaderboardEntry, SSCSubjectId, UserAccount } from '../../types';
import { getTop10Leaderboard } from '../../services/studentDatabaseService';
import { AP_DISTRICTS, getMandalsForDistrict } from '../../data/schoolsDirectory';
import { SSC_SUBJECTS_CONFIG } from '../../data/sscSubjectsData';

interface ScoreBoardViewProps {
  currentUser: UserAccount | null;
  onTakeTest: () => void;
  onViewSchoolStudents?: (udiseCode: string) => void;
}

export function ScoreBoardView({
  currentUser,
  onTakeTest,
  onViewSchoolStudents
}: ScoreBoardViewProps) {
  const [timeframe, setTimeframe] = useState<TimeframeFilter>('today');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('ALL');
  const [selectedMandal, setSelectedMandal] = useState<string>('ALL');
  const [selectedSubject, setSelectedSubject] = useState<SSCSubjectId | 'all'>('all');

  const [syncVersion, setSyncVersion] = useState(0);
  
  useEffect(() => {
    const handleStorage = () => setSyncVersion(v => v + 1);
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const mandals = useMemo(() => {
    if (selectedDistrict === 'ALL') return [];
    return getMandalsForDistrict(selectedDistrict);
  }, [selectedDistrict]);

  // Compute live Top 10 Leaderboard
  const top10List = useMemo(() => {
    return getTop10Leaderboard(timeframe, selectedDistrict, selectedSubject, selectedMandal);
  }, [timeframe, selectedDistrict, selectedSubject, selectedMandal, syncVersion]);

  // Find if current user is in top 10
  const currentUserRank = useMemo(() => {
    if (!currentUser) return null;
    return top10List.find(item => item.penNo === currentUser.penNo);
  }, [currentUser, top10List]);

  // Format seconds to mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
  };

  
  const getRankBorderColor = (rank: number) => {
    switch (rank) {
      case 1: return 'border-amber-500';
      case 2: return 'border-slate-400';
      case 3: return 'border-orange-500';
      case 4: return 'border-blue-500';
      case 5: return 'border-indigo-500';
      case 6: return 'border-violet-500';
      case 7: return 'border-fuchsia-500';
      case 8: return 'border-rose-500';
      case 9: return 'border-emerald-500';
      case 10: return 'border-teal-500';
      default: return 'border-slate-200';
    }
  };

  const timeframeLabels: Record<TimeframeFilter, { label: string; sub: string }> = {
    today: { label: 'Today', sub: 'Live Daily Board (Today)' },
    this_week: { label: 'This Week', sub: 'Past 7 Days Top Performers' },
    this_month: { label: 'This Month', sub: 'Monthly Ranks (30 Days)' },
    overall: { label: 'Over All', sub: 'All-Time High Score Hall of Fame' }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-800">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/30 px-3 py-1 rounded-full text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Trophy className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              State Merit Leaderboard
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Top 10 SSC Candidate Score Board
            </h1>
            <p className="text-sm text-blue-200 max-w-2xl leading-relaxed">
              Real-time state and district rankings across all 7 SSC subjects based on official 60-Minute Daily Mock Practice Tests.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onTakeTest}
              className="px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black rounded-xl shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2 text-sm"
            >
              <Flame className="w-4 h-4 fill-slate-950" />
              Take Test & Enter Top 10
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs Bar: Today, This Week, This Month, Over All */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Timeframe Selector */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto">
          {(['today', 'this_week', 'this_month', 'overall'] as TimeframeFilter[]).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                timeframe === tf
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              {timeframeLabels[tf].label}
            </button>
          ))}
        </div>

        {/* District & Subject Dropdowns */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="w-full sm:w-auto flex items-center gap-2">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0 hidden sm:inline" />
            <select
              value={selectedDistrict}
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                setSelectedMandal('ALL');
              }}
              className="w-full sm:w-48 py-2 px-3 text-xs font-semibold bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
            >
              <option value="ALL">All AP Districts (26)</option>
              {AP_DISTRICTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {selectedDistrict !== 'ALL' && mandals.length > 0 && (
            <div className="w-full sm:w-auto flex items-center gap-2">
              <select
                value={selectedMandal}
                onChange={(e) => setSelectedMandal(e.target.value)}
                className="w-full sm:w-48 py-2 px-3 text-xs font-semibold bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
              >
                <option value="ALL">All Mandals ({mandals.length})</option>
                {mandals.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="w-full sm:w-auto flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-slate-400 shrink-0 hidden sm:inline" />
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value as any)}
              className="w-full sm:w-48 py-2 px-3 text-xs font-semibold bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
            >
              <option value="all">Overall (All 7 Subjects / 60)</option>
              <option value="telugu">Telugu (10 Qs)</option>
              <option value="english">English (10 Qs)</option>
              <option value="hindi">Hindi (10 Qs)</option>
              <option value="maths">Mathematics (10 Qs)</option>
              <option value="physical_science">Physical Science (5 Qs)</option>
              <option value="biological_science">Biological Science (5 Qs)</option>
              <option value="social_studies">Social Studies (10 Qs)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Logged in student rank banner */}
      {currentUser && (
        <div className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-center justify-between gap-3 ${
          currentUserRank
            ? 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-300 text-amber-950'
            : 'bg-blue-50/70 border-blue-200 text-blue-950'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm ${
              currentUserRank ? 'bg-amber-500 text-white shadow-md' : 'bg-blue-600 text-white'
            }`}>
              {currentUserRank ? `#${currentUserRank.rank}` : <User className="w-5 h-5" />}
            </div>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-wide opacity-80">
                Candidate Status: {currentUser.studentName} (PEN: {currentUser.penNo})
              </p>
              <p className="text-sm font-bold">
                {currentUserRank
                  ? `Congratulations! You are currently Rank #${currentUserRank.rank} on the ${timeframeLabels[timeframe].label} Leaderboard with ${currentUserRank.score}/${currentUserRank.maxScore} marks!`
                  : `You are registered under ${currentUser.schoolDetails?.schoolName || 'AP School'}. Take today's test to get ranked in the Top 10!`
                }
              </p>
            </div>
          </div>

          <button
            onClick={onTakeTest}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors shrink-0"
          >
            {currentUserRank ? 'Improve Score' : 'Attempt Test'}
          </button>
        </div>
      )}

      {/* TOP 3 PODIUM DISPLAY (Light Bold Style) */}
      {top10List.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10 pt-12 pb-8 items-end">
            
            {/* Rank 2 - Silver */}
            <div className="order-2 md:order-1 bg-white rounded-3xl p-6 border-[3px] border-slate-200 shadow-xl relative flex flex-col justify-between transition-transform hover:-translate-y-1">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-slate-100 text-slate-800 border-2 border-slate-300 font-black text-xs px-6 py-1.5 rounded-full flex items-center gap-1 shadow-md tracking-wider uppercase whitespace-nowrap">
                <span>Rank 2</span>
              </div>
              
              <div className="text-center pt-5 space-y-2">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-slate-100 to-slate-200 border-2 border-slate-300 mx-auto flex items-center justify-center font-black text-slate-800 text-2xl shadow-inner">
                  {top10List[1].studentName.charAt(0)}
                </div>
                <h3 className="font-black text-slate-900 text-lg mt-2 leading-tight">{top10List[1].studentName}</h3>
                {currentUser && currentUser.penNo === top10List[1].penNo ? (
                  <p className="text-xs font-mono text-blue-700 font-bold tracking-wide">PEN: {top10List[1].penNo} (You)</p>
                ) : (
                  <p className="text-xs text-slate-500 font-bold flex items-center justify-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>PEN Protected</span>
                  </p>
                )}
                <p className="text-sm font-bold text-slate-600 line-clamp-1">{top10List[1].schoolName}</p>
                <span className="inline-block text-[11px] font-black tracking-wide uppercase bg-slate-100 text-slate-600 px-3 py-1 rounded-md border border-slate-200 mt-1">
                  {top10List[1].district}
                </span>
              </div>

              <div className="mt-6 pt-5 border-t-2 border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-black tracking-widest">Score</span>
                  <span className="font-black text-slate-900 text-2xl">{top10List[1].score}<span className="text-sm text-slate-500">/{top10List[1].maxScore}</span></span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block uppercase font-black tracking-widest">Grade</span>
                  <span className="font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-md border border-emerald-200 text-sm">{top10List[1].gpaGrade}</span>
                </div>
              </div>
            </div>

            {/* Rank 1 - Gold (Elevated) */}
            <div className="order-1 md:order-2 bg-gradient-to-b from-amber-50 to-white rounded-3xl p-8 border-[4px] border-amber-400 shadow-2xl relative flex flex-col justify-between transform md:-translate-y-8 z-20 transition-transform hover:-translate-y-10">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 border-2 border-amber-200 font-black text-sm px-8 py-2 rounded-full flex items-center gap-2 shadow-lg tracking-wider uppercase whitespace-nowrap">
                <Trophy className="w-5 h-5 fill-amber-950" />
                <span>State Rank 1</span>
              </div>

              <div className="text-center pt-6 space-y-2">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-300 to-amber-400 border-4 border-white mx-auto flex items-center justify-center font-black text-amber-950 text-4xl shadow-xl relative">
                  {top10List[0].studentName.charAt(0)}
                </div>

                <h3 className="font-black text-slate-900 text-2xl tracking-tight mt-4 leading-tight">{top10List[0].studentName}</h3>
                
                {currentUser && currentUser.penNo === top10List[0].penNo ? (
                  <p className="text-sm font-mono text-amber-700 font-bold tracking-wide">PEN: {top10List[0].penNo} (You)</p>
                ) : (
                  <p className="text-sm text-slate-500 font-bold flex items-center justify-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>PEN Protected</span>
                  </p>
                )}

                <p className="text-base font-bold text-slate-700 line-clamp-1 mt-2">{top10List[0].schoolName}</p>
                <span className="inline-block text-xs font-black tracking-wider uppercase bg-amber-100 text-amber-800 px-4 py-1.5 rounded-md border border-amber-200 mt-1">
                  {top10List[0].mandal}, {top10List[0].district}
                </span>
              </div>

              <div className="mt-8 pt-6 border-t-2 border-amber-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-xs text-amber-700/70 block uppercase font-black tracking-widest">Top Mark</span>
                  <span className="font-black text-amber-600 text-4xl">{top10List[0].score}<span className="text-xl text-amber-600/50">/{top10List[0].maxScore}</span></span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-amber-700/70 block uppercase font-black tracking-widest">Time</span>
                  <span className="font-black text-slate-800 text-xl">{formatTime(top10List[0].timeSpentSeconds)}</span>
                </div>
              </div>
            </div>

            {/* Rank 3 - Bronze */}
            <div className="order-3 bg-white rounded-3xl p-6 border-[3px] border-orange-200 shadow-xl relative flex flex-col justify-between transition-transform hover:-translate-y-1">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-orange-50 text-orange-900 border-2 border-orange-200 font-black text-xs px-6 py-1.5 rounded-full flex items-center gap-1 shadow-md tracking-wider uppercase whitespace-nowrap">
                <span>Rank 3</span>
              </div>
              
              <div className="text-center pt-5 space-y-2">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-orange-100 to-orange-200 border-2 border-orange-300 mx-auto flex items-center justify-center font-black text-orange-900 text-2xl shadow-inner">
                  {top10List[2].studentName.charAt(0)}
                </div>
                <h3 className="font-black text-slate-900 text-lg mt-2 leading-tight">{top10List[2].studentName}</h3>
                {currentUser && currentUser.penNo === top10List[2].penNo ? (
                  <p className="text-xs font-mono text-orange-700 font-bold tracking-wide">PEN: {top10List[2].penNo} (You)</p>
                ) : (
                  <p className="text-xs text-slate-500 font-bold flex items-center justify-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-orange-400 shrink-0" />
                    <span>PEN Protected</span>
                  </p>
                )}
                <p className="text-sm font-bold text-slate-600 line-clamp-1">{top10List[2].schoolName}</p>
                <span className="inline-block text-[11px] font-black tracking-wide uppercase bg-orange-50 text-orange-700 px-3 py-1 rounded-md border border-orange-200 mt-1">
                  {top10List[2].district}
                </span>
              </div>

              <div className="mt-6 pt-5 border-t-2 border-orange-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-black tracking-widest">Score</span>
                  <span className="font-black text-slate-900 text-2xl">{top10List[2].score}<span className="text-sm text-slate-500">/{top10List[2].maxScore}</span></span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block uppercase font-black tracking-widest">Grade</span>
                  <span className="font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-md border border-emerald-200 text-sm">{top10List[2].gpaGrade}</span>
                </div>
              </div>
            </div>

        </div>
      )}
      {/* TOP 10 COMPLETE DATA TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-600" />
            <h2 className="font-bold text-slate-900 text-sm sm:text-base">
              Top 10 Merit List ({timeframeLabels[timeframe].sub})
            </h2>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>PEN Data Protected for Privacy</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-2 text-xs">
            <thead>
              <tr className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4 w-16 text-center">Rank</th>
                <th className="py-3 px-4">Student Details</th>
                <th className="py-3 px-4">School & District</th>
                <th className="py-3 px-4 text-center">No.of Tests Attended</th>
                <th className="py-3 px-4 text-center">Score / Marks</th>
                <th className="py-3 px-4 text-center">Percentage & GPA</th>
                <th className="py-3 px-4 text-center">Time Taken</th>
                <th className="py-3 px-4 text-right">Date</th>
              </tr>
            </thead>
            <tbody>
              {top10List.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500 text-xs">
                    <div className="space-y-2 max-w-sm mx-auto">
                      <Trophy className="w-8 h-8 text-slate-300 mx-auto" />
                      <p className="font-bold text-slate-700">No test attempts recorded yet</p>
                      <p className="text-slate-400 text-[11px]">
                        Be the first student to attempt the practice test and top the State Merit Board!
                      </p>
                      <button
                        onClick={onTakeTest}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors shadow-sm mt-1"
                      >
                        <BookOpen className="w-3.5 h-3.5" /> Start Practice Test
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                top10List.map((entry) => {
                const isUser = currentUser && currentUser.penNo === entry.penNo;
                return (
                  <tr
                    key={entry.studentId || entry.penNo}
                    className={`bg-white shadow-sm hover:shadow-md transition-shadow relative ${
                      isUser ? 'bg-blue-50/70 font-semibold' : ''
                    }`}
                  >
                    {/* Rank Badge */}
                    <td className={`py-3.5 px-4 text-center border-y-[3px] border-l-[6px] rounded-l-xl ${getRankBorderColor(entry.rank)}`}>
                      <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full font-black text-xs ${
                        entry.rank === 1
                          ? 'bg-amber-400 text-amber-950 ring-2 ring-amber-300'
                          : entry.rank === 2
                          ? 'bg-slate-300 text-slate-800'
                          : entry.rank === 3
                          ? 'bg-amber-700/30 text-amber-900'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {entry.rank}
                      </span>
                    </td>

                    {/* Student Info */}
                    <td className={`py-3.5 px-4 border-y-[3px] ${getRankBorderColor(entry.rank)}`}>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">{entry.studentName}</span>
                          {isUser && (
                            <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded">
                              YOU
                            </span>
                          )}
                        </div>
                        {isUser ? (
                          <p className="font-mono text-blue-700 font-bold text-[11px]">PEN: {entry.penNo}</p>
                        ) : (
                          <div className="flex items-center gap-1 text-[10px] text-slate-400">
                            <ShieldCheck className="w-3 h-3 text-slate-400 shrink-0" />
                            <span>Candidate Verified</span>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* School & District */}
                    <td className={`py-3.5 px-4 border-y-[3px] ${getRankBorderColor(entry.rank)}`}>
                      <div className="space-y-0.5 max-w-xs">
                        <button
                          onClick={() => onViewSchoolStudents && onViewSchoolStudents(entry.udiseCode)}
                          className="font-semibold text-slate-800 hover:text-blue-600 text-left line-clamp-1 text-xs transition-colors"
                        >
                          {entry.schoolName}
                        </button>
                        <p className="text-[11px] text-slate-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{entry.mandal}, {entry.district}</span>
                        </p>
                      </div>
                    </td>

                    {/* No. of Tests Attended */}
                    <td className={`py-3.5 px-4 text-center border-y-[3px] ${getRankBorderColor(entry.rank)}`}>
                      <span className="inline-flex items-center justify-center bg-indigo-50 text-indigo-700 font-bold px-2 py-1 rounded-lg border border-indigo-100 text-xs shadow-sm">
                        {entry.totalAttempts}
                      </span>
                    </td>

                    {/* Score */}
                    <td className={`py-3.5 px-4 text-center border-y-[3px] ${getRankBorderColor(entry.rank)}`}>
                      <span className="font-black text-slate-900 text-sm">
                        {entry.averageScore !== undefined ? entry.averageScore : entry.score}
                      </span>
                      <span className="text-slate-400 text-[11px]">/{entry.maxScore}</span>
                    </td>

                    {/* Percentage & GPA */}
                    <td className={`py-3.5 px-4 text-center border-y-[3px] ${getRankBorderColor(entry.rank)}`}>
                      <div className="inline-flex items-center gap-1.5">
                        <span className="font-bold text-slate-700">{entry.percentage}%</span>
                        <span className="font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-[11px]">
                          {entry.gpaGrade}
                        </span>
                      </div>
                    </td>

                    {/* Time */}
                    <td className={`py-3.5 px-4 text-center text-slate-600 border-y-[3px] ${getRankBorderColor(entry.rank)}`}>
                      <div className="inline-flex items-center gap-1 text-[11px]">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{formatTime(entry.timeSpentSeconds)}</span>
                      </div>
                    </td>

                    {/* Date */}
                    <td className={`py-3.5 px-4 text-right text-slate-500 text-[11px] border-y-[3px] border-r-[3px] rounded-r-xl ${getRankBorderColor(entry.rank)}`}>
                      {entry.attemptDate}
                    </td>
                  </tr>
                );
              }))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
