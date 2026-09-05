import { useState, useMemo, useEffect } from 'react';
import { 
  Building2, 
  Users, 
  MapPin, 
  Award, 
  Search, 
  ArrowLeft, 
  Download, 
  CheckCircle2, 
  BookOpen, 
  User, 
  Calendar,
  Sparkles,
  FileSpreadsheet,
  ShieldCheck,
  Lock
} from 'lucide-react';
import { getSchoolStudentsList } from '../../services/studentDatabaseService';
import { getSchoolByUDISE } from '../../data/schoolsDirectory';
import { StudentSchoolRecord, UserAccount } from '../../types';

interface SchoolStudentsViewProps {
  currentUser?: UserAccount | null;
  udiseCode?: string;
  onBack?: () => void;
  onTakeTest?: () => void;
}

export function SchoolStudentsView({
  currentUser,
  udiseCode = '28130702603',
  onBack,
  onTakeTest
}: SchoolStudentsViewProps) {
  const [currentUdise, setCurrentUdise] = useState<string>(udiseCode);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('ALL');

  // Find school metadata from active/synced directory
  const schoolInfo = useMemo(() => {
    return getSchoolByUDISE(currentUdise) || {
      udiseCode: currentUdise,
      schoolName: 'ZPHS High School',
      district: 'ANAKAPALLI',
      mandal: 'DEVARAPALLI',
      management: '33 - MPP_ZPP SCHOOLS',
      category: '7 - Upper Pr. and Secondary'
    };
  }, [currentUdise]);

  // Students list for this school
  const rawStudents = useMemo(() => {
    // dependency on syncVersion: ${syncVersion};
    return getSchoolStudentsList(currentUdise);
  }, [currentUdise]);

  // Filtered students
  const filteredStudents = useMemo(() => {
    return rawStudents.filter((st) => {
      const isCurrent = currentUser && currentUser.penNo === st.penNo;
      const matchSearch = 
        st.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (isCurrent && st.penNo.includes(searchQuery));
      
      const matchGrade = selectedGrade === 'ALL' || st.latestGpaGrade === selectedGrade;
      return matchSearch && matchGrade;
    });
  }, [rawStudents, searchQuery, selectedGrade, currentUser]);

  // Aggregate school statistics
  const schoolStats = useMemo(() => {
    const total = rawStudents.length;
    if (total === 0) return { total: 0, avgScore: 0, topScore: 0, a1Count: 0 };

    const sum = rawStudents.reduce((acc, s) => acc + s.bestScore, 0);
    const top = Math.max(...rawStudents.map(s => s.bestScore));
    const a1 = rawStudents.filter(s => s.latestGpaGrade === 'A1').length;

    return {
      total,
      avgScore: Math.round(sum / total),
      topScore: top,
      a1Count: a1
    };
  }, [rawStudents]);

  // CSV Export (PEN is protected for other students)
  const handleExportCSV = () => {
    const headers = [
      'Rank',
      'Student Name',
      'PEN Number',
      'Section',
      'Telugu (10)',
      'English (10)',
      'Hindi (10)',
      'Maths (10)',
      'Phys Sci (5)',
      'Bio Sci (5)',
      'Social (10)',
      'Total Score (60)',
      'GPA Grade',
      'Grade Points',
      'Total Attempts',
      'Last Attempt Date'
    ];

    const rows = filteredStudents.map((s, idx) => {
      const isCurrent = currentUser && currentUser.penNo === s.penNo;
      const penDisplay = isCurrent ? `'${s.penNo}` : 'Protected';
      return [
        idx + 1,
        `"${s.studentName}"`,
        penDisplay,
        s.section,
        s.subjectMarks.telugu,
        s.subjectMarks.english,
        s.subjectMarks.hindi,
        s.subjectMarks.maths,
        s.subjectMarks.physical_science,
        s.subjectMarks.biological_science,
        s.subjectMarks.social_studies,
        s.bestScore,
        s.latestGpaGrade,
        s.latestGradePoints,
        s.totalAttempts,
        s.lastAttemptDate
      ];
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${schoolInfo.schoolName.replace(/[^a-zA-Z0-9]/g, '_')}_Students_Report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* School Overview Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              {onBack && (
                <button
                  onClick={onBack}
                  className="px-2.5 py-1 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Schools
                </button>
              )}
              <span className="font-mono bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-lg">
                UDISE: {schoolInfo.udiseCode}
              </span>
              <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-lg">
                {schoolInfo.management}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              {schoolInfo.schoolName}
            </h1>

            <p className="text-xs text-slate-600 flex items-center gap-2 flex-wrap">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                Mandal: <strong>{schoolInfo.mandal}</strong>
              </span>
              <span>•</span>
              <span>District: <strong>{schoolInfo.district}</strong></span>
              <span>•</span>
              <span>Category: {schoolInfo.category}</span>
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-slate-50 p-3 rounded-2xl border border-slate-100 shrink-0">
            <div className="text-center p-2">
              <span className="text-[10px] text-slate-500 font-semibold block">Enrolled Candidates</span>
              <span className="text-lg font-black text-slate-900">{schoolStats.total}</span>
            </div>
            <div className="text-center p-2">
              <span className="text-[10px] text-slate-500 font-semibold block">School Average</span>
              <span className="text-lg font-black text-blue-700">
                {schoolStats.avgScore > 0 ? (
                  <>{schoolStats.avgScore}<span className="text-xs text-slate-400 font-normal">/60</span></>
                ) : (
                  '-'
                )}
              </span>
            </div>
            <div className="text-center p-2">
              <span className="text-[10px] text-slate-500 font-semibold block">Highest Score</span>
              <span className="text-lg font-black text-emerald-700">
                {schoolStats.topScore > 0 ? (
                  <>{schoolStats.topScore}<span className="text-xs text-slate-400 font-normal">/60</span></>
                ) : (
                  '-'
                )}
              </span>
            </div>
            <div className="text-center p-2">
              <span className="text-[10px] text-slate-500 font-semibold block">A1 (10.0 GPA)</span>
              <span className="text-lg font-black text-amber-600">{schoolStats.a1Count}</span>
            </div>
          </div>
        </div>

        {/* Search & Action Bar */}
        <div className="pt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Student Name..."
                className="w-full pl-9 pr-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="py-2 px-3 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 font-medium"
            >
              <option value="ALL">All GPA Grades</option>
              <option value="A1">A1 Grade (10.0)</option>
              <option value="A2">A2 Grade (9.0)</option>
              <option value="B1">B1 Grade (8.0)</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="py-2 px-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              Export Excel / CSV
            </button>

            {onTakeTest && (
              <button
                onClick={onTakeTest}
                className="py-2 px-3.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors flex items-center justify-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5" />
                Practice Test
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ALL STUDENTS FOR SCHOOL TABLE */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" />
            <h2 className="font-bold text-slate-900 text-sm">
              All 10th Class Students Enrolled in this School ({filteredStudents.length} Students)
            </h2>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>PEN Data Protected for Privacy</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100 text-slate-600 border-b border-slate-200 font-bold">
                <th className="py-3 px-3.5 w-12 text-center">#</th>
                <th className="py-3 px-3.5">Student Details</th>
                <th className="py-3 px-2 text-center">Sec</th>
                <th className="py-3 px-2 text-center bg-blue-50/50" title="Telugu (Max 10)">TEL (10)</th>
                <th className="py-3 px-2 text-center bg-blue-50/50" title="English (Max 10)">ENG (10)</th>
                <th className="py-3 px-2 text-center bg-blue-50/50" title="Hindi (Max 10)">HIN (10)</th>
                <th className="py-3 px-2 text-center bg-blue-50/50" title="Maths (Max 10)">MAT (10)</th>
                <th className="py-3 px-2 text-center bg-blue-50/50" title="Physical Science (Max 5)">PS (5)</th>
                <th className="py-3 px-2 text-center bg-blue-50/50" title="Biological Science (Max 5)">BS (5)</th>
                <th className="py-3 px-2 text-center bg-blue-50/50" title="Social Studies (Max 10)">SOC (10)</th>
                <th className="py-3 px-3 text-center">Best Score (/60)</th>
                <th className="py-3 px-3 text-center">GPA Grade</th>
                <th className="py-3 px-3 text-center">Attempts</th>
                <th className="py-3 px-3.5 text-right">Last Exam</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={14} className="py-12 text-center text-slate-500 text-xs">
                    {rawStudents.length === 0 ? (
                      <div className="space-y-1.5 max-w-md mx-auto">
                        <p className="font-bold text-slate-700">No registered students for this school yet</p>
                        <p className="text-slate-400 text-[11px]">
                          When students register and take tests under UDISE Code <strong className="font-mono text-slate-600">{schoolInfo.udiseCode}</strong>, their marks and performance will be aggregated here.
                        </p>
                      </div>
                    ) : (
                      'No students found matching your search filter.'
                    )}
                  </td>
                </tr>
              ) : (
                filteredStudents.map((st, idx) => {
                  const isCurrentUser = Boolean(
                    currentUser && (
                      currentUser.penNo === st.penNo ||
                      (currentUser.studentName?.toLowerCase() === st.studentName?.toLowerCase() &&
                       currentUser.udiseCode === st.udiseCode)
                    )
                  );

                  return (
                    <tr
                      key={st.id || st.penNo}
                      className={`hover:bg-slate-50 transition-colors ${
                        isCurrentUser ? 'bg-blue-50/50 font-medium' : ''
                      }`}
                    >
                      {/* Rank */}
                      <td className="py-3 px-3.5 text-center font-bold text-slate-500">
                        {idx + 1}
                      </td>

                      {/* Student details (PEN hidden for others) */}
                      <td className="py-3 px-3.5">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <p className="font-bold text-slate-900 text-xs">{st.studentName}</p>
                            {isCurrentUser && (
                              <span className="bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.2 rounded">
                                YOU
                              </span>
                            )}
                          </div>
                          {isCurrentUser ? (
                            <p className="font-mono text-blue-700 font-bold text-[11px]">
                              PEN: {st.penNo}
                            </p>
                          ) : (
                            <div className="flex items-center gap-1 text-[10px] text-slate-400">
                              <ShieldCheck className="w-3 h-3 text-slate-400 shrink-0" />
                              <span>Candidate Verified</span>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Section */}
                      <td className="py-3 px-2 text-center font-semibold text-slate-600">
                        {st.section || 'A'}
                      </td>

                      {/* Subject Marks */}
                      <td className="py-3 px-2 text-center font-bold text-slate-800 bg-blue-50/30">
                        {st.subjectMarks.telugu}
                      </td>
                      <td className="py-3 px-2 text-center font-bold text-slate-800 bg-blue-50/30">
                        {st.subjectMarks.english}
                      </td>
                      <td className="py-3 px-2 text-center font-bold text-slate-800 bg-blue-50/30">
                        {st.subjectMarks.hindi}
                      </td>
                      <td className="py-3 px-2 text-center font-bold text-slate-800 bg-blue-50/30">
                        {st.subjectMarks.maths}
                      </td>
                      <td className="py-3 px-2 text-center font-bold text-slate-800 bg-blue-50/30">
                        {st.subjectMarks.physical_science}
                      </td>
                      <td className="py-3 px-2 text-center font-bold text-slate-800 bg-blue-50/30">
                        {st.subjectMarks.biological_science}
                      </td>
                      <td className="py-3 px-2 text-center font-bold text-slate-800 bg-blue-50/30">
                        {st.subjectMarks.social_studies}
                      </td>

                      {/* Best Score */}
                      <td className="py-3 px-3 text-center">
                        <span className="font-black text-slate-900 text-sm">{st.bestScore}</span>
                        <span className="text-[10px] text-slate-400">/60</span>
                      </td>

                      {/* GPA Grade */}
                      <td className="py-3 px-3 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-black ${
                          st.latestGpaGrade === 'A1'
                            ? 'bg-emerald-100 text-emerald-800'
                            : st.latestGpaGrade === 'A2'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {st.latestGpaGrade} ({st.latestGradePoints})
                        </span>
                      </td>

                      {/* Attempts count */}
                      <td className="py-3 px-3 text-center text-slate-600 font-semibold">
                        {st.totalAttempts} tests
                      </td>

                      {/* Last Exam date */}
                      <td className="py-3 px-3.5 text-right text-slate-500 text-[11px]">
                        {st.lastAttemptDate}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
