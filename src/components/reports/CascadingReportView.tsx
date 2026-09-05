import { useState, useMemo, useEffect } from 'react';
import { 
  Building2, 
  MapPin, 
  Users, 
  Award, 
  ChevronRight, 
  TrendingUp, 
  Search, 
  ArrowLeft, 
  GraduationCap, 
  FileSpreadsheet, 
  CheckCircle2, 
  Filter, 
  BarChart3,
  BookOpen,
  LayoutGrid,
  Table
} from 'lucide-react';
import { 
  getDistrictSummaries, 
  getMandalSummaries, 
  getSchoolSummaries, 
  getSchoolStudentsList 
} from '../../services/studentDatabaseService';
import { AP_DISTRICTS } from '../../data/schoolsDirectory';
import { SchoolStudentsView } from './SchoolStudentsView';
import { UserAccount } from '../../types';
import { getSyncedSchoolsMeta } from '../../services/googleSheetService';

type CascadingLevel = 'districts' | 'mandals' | 'schools' | 'students';

interface CascadingReportViewProps {
  currentUser?: UserAccount | null;
  initialUdise?: string | null;
  onTakeTest?: () => void;
}

export function CascadingReportView({ currentUser, initialUdise, onTakeTest }: CascadingReportViewProps) {
  // Cascading Navigation States
  const [level, setLevel] = useState<CascadingLevel>(initialUdise ? 'students' : 'districts');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('ANAKAPALLI');
  const [selectedMandal, setSelectedMandal] = useState<string>('ALL');
  const [selectedUdise, setSelectedUdise] = useState<string>(initialUdise || '28130702603');
  const [searchQuery, setSearchQuery] = useState('');
  const [syncVersion, setSyncVersion] = useState(0);
  
  useEffect(() => {
    const handleStorage = () => setSyncVersion(v => v + 1);
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  // Data fetching
  const districtList = useMemo(() => getDistrictSummaries(), [syncVersion]);
  const mandalList = useMemo(() => getMandalSummaries(selectedDistrict), [selectedDistrict, syncVersion]);
  const schoolList = useMemo(() => getSchoolSummaries(selectedDistrict, selectedMandal), [selectedDistrict, selectedMandal, syncVersion]);
  const syncMeta = useMemo(() => getSyncedSchoolsMeta(), [syncVersion]);

  // Handle District Click -> Go to Mandals
  const handleSelectDistrict = (districtName: string) => {
    setSelectedDistrict(districtName);
    setSelectedMandal('ALL');
    setLevel('mandals');
    setSearchQuery('');
  };

  // Handle Mandal Click -> Go to Schools
  const handleSelectMandal = (mandalName: string) => {
    setSelectedMandal(mandalName);
    setLevel('schools');
    setSearchQuery('');
  };

  // Handle School Click -> Go to All Students
  const handleSelectSchool = (udise: string) => {
    setSelectedUdise(udise);
    setLevel('students');
    setSearchQuery('');
  };

  // Filtered queries
  const filteredDistricts = districtList.filter(d => 
    d.districtName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMandals = mandalList.filter(m => 
    m.mandalName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSchools = schoolList.filter(s => 
    s.schoolName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.udiseCode.includes(searchQuery) ||
    s.mandalName.toLowerCase().includes(searchQuery.toLowerCase())
  );


const getCardColorClass = (index: number) => {
  const colors = [
    'border-blue-200 border-l-blue-500',
    'border-indigo-200 border-l-indigo-500',
    'border-violet-200 border-l-violet-500',
    'border-fuchsia-200 border-l-fuchsia-500',
    'border-emerald-200 border-l-emerald-500',
    'border-teal-200 border-l-teal-500',
    'border-amber-200 border-l-amber-500',
    'border-orange-200 border-l-orange-500',
    'border-rose-200 border-l-rose-500'
  ];
  return colors[index % colors.length];
};

  return (
    <div className="space-y-6">
      
      {/* Breadcrumbs Navigation Header */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap text-xs sm:text-sm font-bold">
          <button
            onClick={() => { setLevel('districts'); setSearchQuery(''); }}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              level === 'districts' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            AP State (26 Districts)
          </button>

          {(level === 'mandals' || level === 'schools' || level === 'students') && (
            <>
              <ChevronRight className="w-4 h-4 text-slate-400" />
              <button
                onClick={() => { setLevel('mandals'); setSearchQuery(''); }}
                className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                  level === 'mandals' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>{selectedDistrict} District</span>
              </button>
            </>
          )}

          {(level === 'schools' || level === 'students') && (
            <>
              <ChevronRight className="w-4 h-4 text-slate-400" />
              <button
                onClick={() => { setLevel('schools'); setSearchQuery(''); }}
                className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                  level === 'schools' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>{selectedMandal === 'ALL' ? 'All Mandals' : `${selectedMandal} Mandal`}</span>
              </button>
            </>
          )}

          {level === 'students' && (
            <>
              <ChevronRight className="w-4 h-4 text-slate-400" />
              <span className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                School Student Roster
              </span>
            </>
          )}
        </div>

        {/* Level Quick Switch Buttons & Sync Action */}
        <div className="flex items-center gap-2 flex-wrap">
          {level !== 'students' && (
            <div className="hidden sm:flex bg-slate-100 p-1 rounded-lg mr-2">
              <button
                onClick={() => setViewMode('cards')}
                className={`px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors ${viewMode === 'cards' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <LayoutGrid className="w-3.5 h-3.5" /> Cards
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors ${viewMode === 'table' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <Table className="w-3.5 h-3.5" /> Table
              </button>
            </div>
          )}


          {level !== 'districts' && (
            <button
              onClick={() => {
                if (level === 'students') setLevel('schools');
                else if (level === 'schools') setLevel('mandals');
                else if (level === 'mandals') setLevel('districts');
              }}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back Level
            </button>
          )}
        </div>
      </div>

      {/* LEVEL 1: DISTRICT WISE REPORT */}
      {level === 'districts' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-6 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-300">Level 1: State Hierarchy</span>
              <h2 className="text-xl sm:text-2xl font-black">District-Wise Cascading Performance</h2>
              <p className="text-xs text-blue-200 mt-1">
                Select any of the 26 districts in Andhra Pradesh to view mandal breakdown, schools, and student scores.
              </p>
            </div>
            
            {/* Search */}
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search District..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 text-xs bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:bg-white focus:text-slate-900 focus:placeholder-slate-400 transition-colors"
              />
            </div>
          </div>

          {viewMode === 'table' ? (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3">District Name</th>
                      <th className="px-4 py-3 text-center">Registered Schools</th>
                      <th className="px-4 py-3 text-center">Students</th>
                      <th className="px-4 py-3 text-center">Avg Mark</th>
                      <th className="px-4 py-3 text-center">Pass Rate</th>
                      <th className="px-4 py-3">Top School</th>
                      <th className="px-4 py-3 text-center">Top Mark</th>
                      <th className="px-4 py-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredDistricts.map(dist => (
                      <tr key={dist.districtName} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 font-bold text-slate-900">{dist.districtName}</td>
                        <td className="px-4 py-3 text-center">{dist.totalSchools}</td>
                        <td className="px-4 py-3 text-center">{dist.totalStudents}</td>
                        <td className="px-4 py-3 text-center text-blue-600 font-semibold">{dist.totalAttempts > 0 ? `${dist.averageScore}/60` : '-'}</td>
                        <td className="px-4 py-3 text-center text-emerald-600 font-semibold">{dist.totalAttempts > 0 ? `${dist.passPercentage}%` : '-'}</td>
                        <td className="px-4 py-3 text-xs line-clamp-1 max-w-[200px]" title={dist.topSchoolName}>{dist.topSchoolName || '-'}</td>
                        <td className="px-4 py-3 text-center text-amber-600 font-semibold">{dist.topScore > 0 ? dist.topScore : '-'}</td>
                        <td className="px-4 py-3 text-center">
                          <button onClick={() => handleSelectDistrict(dist.districtName)} className="text-blue-600 hover:text-blue-800 font-semibold text-xs bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap">View Mandals</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredDistricts.length === 0 && (
                  <div className="p-8 text-center text-slate-500">No districts found matching your search.</div>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDistricts.map((dist, index) => (
                <div
                  key={dist.districtName}
                  onClick={() => handleSelectDistrict(dist.districtName)}
                  className={`bg-white rounded-2xl p-5 border border-l-[5px] ${getCardColorClass(index)} shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors text-sm">
                            {dist.districtName}
                          </h3>
                          <p className="text-[11px] text-slate-500">{dist.totalSchools} Registered Schools</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                    </div>

                    <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-slate-100 text-center my-2">
                      <div className="bg-slate-50 rounded-lg p-2">
                        <span className="text-[10px] text-slate-500 block">Students</span>
                        <span className="font-bold text-slate-800 text-xs">{dist.totalStudents}</span>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-2">
                        <span className="text-[10px] text-slate-500 block">Avg Mark</span>
                        <span className="font-bold text-blue-700 text-xs">
                          {dist.totalAttempts > 0 ? `${dist.averageScore}/60` : '-'}
                        </span>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-2">
                        <span className="text-[10px] text-slate-500 block">Pass Rate</span>
                        <span className="font-bold text-emerald-700 text-xs">
                          {dist.totalAttempts > 0 ? `${dist.passPercentage}%` : '-'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 text-[11px] text-slate-500 flex items-center justify-between">
                    <span className="line-clamp-1">Top School: <strong className="text-slate-700">{dist.topSchoolName}</strong></span>
                    {dist.topScore > 0 ? (
                      <span className="font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded shrink-0">
                        High: {dist.topScore}/60
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded shrink-0">
                        No tests yet
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* LEVEL 2: MANDAL WISE REPORT */}
      {level === 'mandals' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-indigo-900 to-slate-900 rounded-2xl p-6 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">Level 2: District Breakdown</span>
              <h2 className="text-xl sm:text-2xl font-black">Mandals in {selectedDistrict} District</h2>
              <p className="text-xs text-indigo-200 mt-1">
                Select a mandal below to view high schools, ZPHS, KGBV, Model schools and candidate rosters.
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search Mandal..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 text-xs bg-white/10 border border-white/20 rounded-xl text-white placeholder-indigo-200 focus:outline-none focus:bg-white focus:text-slate-900 focus:placeholder-slate-400 transition-colors"
                />
              </div>

              <button
                onClick={() => { setSelectedMandal('ALL'); setLevel('schools'); }}
                className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold whitespace-nowrap shadow transition-colors"
              >
                View All Schools
              </button>
            </div>
          </div>

          {viewMode === 'table' ? (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3">Mandal Name</th>
                      <th className="px-4 py-3 text-center">Registered Schools</th>
                      <th className="px-4 py-3 text-center">Enrolled</th>
                      <th className="px-4 py-3 text-center">Mandal Avg</th>
                      <th className="px-4 py-3 text-center">Pass %</th>
                      <th className="px-4 py-3">Top School</th>
                      <th className="px-4 py-3 text-center">Top Mark</th>
                      <th className="px-4 py-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredMandals.map(mandal => (
                      <tr key={mandal.mandalName} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 font-bold text-slate-900">{mandal.mandalName}</td>
                        <td className="px-4 py-3 text-center">{mandal.totalSchools}</td>
                        <td className="px-4 py-3 text-center">{mandal.totalStudents}</td>
                        <td className="px-4 py-3 text-center text-indigo-600 font-semibold">{mandal.totalAttempts > 0 ? `${mandal.averageScore}/60` : '-'}</td>
                        <td className="px-4 py-3 text-center text-emerald-600 font-semibold">{mandal.totalAttempts > 0 ? `${mandal.passPercentage}%` : '-'}</td>
                        <td className="px-4 py-3 text-xs line-clamp-1 max-w-[200px]" title={mandal.topSchoolName}>{mandal.topSchoolName || '-'}</td>
                        <td className="px-4 py-3 text-center text-indigo-600 font-semibold">{mandal.topScore > 0 ? mandal.topScore : '-'}</td>
                        <td className="px-4 py-3 text-center">
                          <button onClick={() => handleSelectMandal(mandal.mandalName)} className="text-indigo-600 hover:text-indigo-800 font-semibold text-xs bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap">View Schools</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredMandals.length === 0 && (
                  <div className="p-8 text-center text-slate-500">No mandals found matching your search.</div>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMandals.map((mandal, index) => (
                <div
                  key={mandal.mandalName}
                  onClick={() => handleSelectMandal(mandal.mandalName)}
                  className={`bg-white rounded-2xl p-5 border border-l-[5px] ${getCardColorClass(index)} shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors text-sm">
                            {mandal.mandalName} Mandal
                          </h3>
                          <p className="text-[11px] text-slate-500">{mandal.totalSchools} Registered Schools</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                    </div>

                    <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-slate-100 text-center my-2">
                      <div className="bg-slate-50 rounded-lg p-2">
                        <span className="text-[10px] text-slate-500 block">Enrolled</span>
                        <span className="font-bold text-slate-800 text-xs">{mandal.totalStudents}</span>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-2">
                        <span className="text-[10px] text-slate-500 block">Mandal Avg</span>
                        <span className="font-bold text-indigo-700 text-xs">
                          {mandal.totalAttempts > 0 ? `${mandal.averageScore}/60` : '-'}
                        </span>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-2">
                        <span className="text-[10px] text-slate-500 block">Pass %</span>
                        <span className="font-bold text-emerald-700 text-xs">
                          {mandal.totalAttempts > 0 ? `${mandal.passPercentage}%` : '-'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 text-[11px] text-slate-500 flex items-center justify-between">
                    <span className="line-clamp-1">Top: <strong className="text-slate-700">{mandal.topSchoolName}</strong></span>
                    {mandal.topScore > 0 ? (
                      <span className="font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded shrink-0">
                        High: {mandal.topScore}/60
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded shrink-0">
                        No tests yet
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* LEVEL 3: SCHOOL WISE REPORT */}
      {level === 'schools' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-slate-900 to-blue-950 rounded-2xl p-6 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-300">Level 3: School Directory</span>
              <h2 className="text-xl sm:text-2xl font-black">
                Schools in {selectedMandal === 'ALL' ? selectedDistrict : `${selectedMandal} (${selectedDistrict})`}
              </h2>
              <p className="text-xs text-blue-200 mt-1">
                Click on any school or click <strong>&quot;Show All Students&quot;</strong> to inspect candidate marks.
              </p>
            </div>
            
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search School or UDISE..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 text-xs bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:bg-white focus:text-slate-900 focus:placeholder-slate-400 transition-colors"
              />
            </div>
          </div>

          {viewMode === 'table' ? (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 whitespace-nowrap">
                    <tr>
                      <th className="px-4 py-3">UDISE</th>
                      <th className="px-4 py-3">School Name</th>
                      <th className="px-4 py-3">Management</th>
                      <th className="px-4 py-3">Mandal</th>
                      <th className="px-4 py-3 text-center">Candidates</th>
                      <th className="px-4 py-3 text-center">Avg Score</th>
                      <th className="px-4 py-3 text-center">Top Mark</th>
                      <th className="px-4 py-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredSchools.map(sch => (
                      <tr key={sch.udiseCode} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 font-mono text-xs font-bold text-blue-700">{sch.udiseCode}</td>
                        <td className="px-4 py-3 font-bold text-slate-900 max-w-[200px] truncate" title={sch.schoolName}>{sch.schoolName}</td>
                        <td className="px-4 py-3 text-xs">{sch.management}</td>
                        <td className="px-4 py-3 text-xs">{sch.mandalName}</td>
                        <td className="px-4 py-3 text-center">{sch.totalStudents}</td>
                        <td className="px-4 py-3 text-center text-blue-600 font-semibold">{sch.totalAttempts > 0 ? `${sch.averageScore}/60` : '-'}</td>
                        <td className="px-4 py-3 text-center text-emerald-600 font-semibold">{sch.topScore > 0 ? sch.topScore : '-'}</td>
                        <td className="px-4 py-3 text-center">
                          {currentUser ? (
                            <button
                              onClick={() => {
                                if (currentUser.udiseCode === sch.udiseCode) {
                                  handleSelectSchool(sch.udiseCode);
                                }
                              }}
                              disabled={currentUser.udiseCode !== sch.udiseCode}
                              title={currentUser.udiseCode !== sch.udiseCode ? "You can only view students from your own school" : ""}
                              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                                currentUser.udiseCode === sch.udiseCode 
                                  ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                                  : 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-70'
                              }`}
                            >
                              {currentUser.udiseCode === sch.udiseCode ? 'View Students' : 'Locked'}
                            </button>
                          ) : (
                            <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded">Login to view</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredSchools.length === 0 && (
                  <div className="p-8 text-center text-slate-500">No schools found matching your search.</div>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSchools.map((sch, index) => (
                <div
                  key={sch.udiseCode}
                  className={`bg-white rounded-2xl p-5 border border-l-[5px] ${getCardColorClass(index)} shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-3`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="space-y-1">
                        <span className="font-mono bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">
                          UDISE: {sch.udiseCode}
                        </span>
                        <h3 className="font-bold text-slate-900 text-sm line-clamp-2">
                          {sch.schoolName}
                        </h3>
                        <p className="text-[11px] text-slate-500">
                          {sch.mandalName} Mandal, {sch.districtName}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap my-2">
                      <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                        {sch.management}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5 py-2 border-y border-slate-100 text-center my-2 text-xs">
                      <div className="bg-slate-50 rounded-lg p-1.5">
                        <span className="text-[10px] text-slate-500 block">Candidates</span>
                        <span className="font-bold text-slate-800">{sch.totalStudents}</span>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-1.5">
                        <span className="text-[10px] text-slate-500 block">Avg Score</span>
                        <span className="font-bold text-blue-700">
                          {sch.totalAttempts > 0 ? `${sch.averageScore}/60` : '-'}
                        </span>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-1.5">
                        <span className="text-[10px] text-slate-500 block">Top Mark</span>
                        <span className="font-bold text-emerald-700">
                          {sch.topScore > 0 ? `${sch.topScore}/60` : '-'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Show All Students Button */}
                  {currentUser && (
                    <button
                      onClick={() => {
                        if (currentUser.udiseCode === sch.udiseCode) {
                          handleSelectSchool(sch.udiseCode);
                        }
                      }}
                      disabled={currentUser.udiseCode !== sch.udiseCode}
                      title={currentUser.udiseCode !== sch.udiseCode ? "You can only view students from your own school" : ""}
                      className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-1.5 ${
                        currentUser.udiseCode === sch.udiseCode
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
                          : 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-70'
                      }`}
                    >
                      <Users className="w-3.5 h-3.5" />
                      {currentUser.udiseCode === sch.udiseCode ? 'Show All Students for this School' : 'Locked: Not Your School'}
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* LEVEL 4: SHOW ALL STUDENTS FOR SELECTED SCHOOL */}
      {level === 'students' && (
        <SchoolStudentsView
          currentUser={currentUser}
          udiseCode={selectedUdise}
          onBack={() => setLevel('schools')}
          onTakeTest={onTakeTest}
        />
      )}
    </div>
  );
}
