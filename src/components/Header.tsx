import { useState } from 'react';
import { 
  Award, 
  BookOpen, 
  GraduationCap, 
  Clock, 
  Flame, 
  Layers, 
  ShieldCheck, 
  User, 
  PlayCircle,
  FileCheck,
  Trophy,
  BarChart3,
  LogIn,
  UserPlus,
  LogOut,
  ChevronDown,
  Building2,
  MapPin,
  FileSpreadsheet
} from 'lucide-react';
import { UserAccount, AppNavView } from '../types';
import { SSCHeaderBanner } from './SSCHeaderBanner';

interface HeaderProps {
  currentUser: UserAccount | null;
  activeView: AppNavView;
  onNavigate: (view: AppNavView) => void;
  onViewSchool?: (udiseCode: string) => void;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  onLogout: () => void;
}

export function Header({
  currentUser,
  activeView,
  onNavigate,
  onViewSchool,
  onOpenLogin,
  onOpenRegister,
  onLogout
}: HeaderProps) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-slate-200 text-slate-900 sticky top-0 z-40 shadow-sm">
      {/* SSC Champions 2027 Header Banner - Compact & Auto-Fit Screen Size */}
      <SSCHeaderBanner onTakeTestClick={() => onNavigate('test')} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Student Account Strip */}
        <div className="flex items-center justify-center h-14 sm:h-16 border-b border-slate-100">
          {/* Auth Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-2 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 text-xs transition-colors"
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow">
                    {currentUser.studentName.charAt(0)}
                  </div>
                  <div className="text-left hidden sm:block">
                    <p className="font-bold text-slate-900 leading-tight line-clamp-1 max-w-[120px]">
                      {currentUser.studentName}
                    </p>
                    <p className="text-[10px] text-slate-500 font-mono">PEN: {currentUser.penNo}</p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {/* Profile Dropdown */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 py-3 px-4 z-50 animate-in fade-in">
                    <div className="pb-3 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Signed In Candidate</p>
                      <p className="text-sm font-extrabold text-slate-900">{currentUser.studentName}</p>
                      <p className="text-xs font-mono text-slate-500">PEN: {currentUser.penNo}</p>
                      <p className="text-xs text-blue-700 font-semibold mt-1">
                        {currentUser.schoolDetails?.schoolName || 'AP Secondary School'}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {currentUser.mandal || currentUser.schoolDetails?.mandalName || 'General'}, {currentUser.district || currentUser.schoolDetails?.districtName || 'ANAKAPALLI'}
                      </p>
                    </div>

                    <div className="py-2 space-y-1">
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          onNavigate('dashboard');
                        }}
                        className="w-full text-left px-2 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-2"
                      >
                        <BarChart3 className="w-4 h-4 text-blue-600" /> My Personal Dashboard
                      </button>
                      {currentUser.udiseCode && (
                        <button
                          onClick={() => {
                            setIsProfileMenuOpen(false);
                            if (onViewSchool) {
                              onViewSchool(currentUser.udiseCode!);
                            }
                          }}
                          className="w-full text-left px-2 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-2"
                        >
                          <Building2 className="w-4 h-4 text-emerald-500" /> My School Students
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          onNavigate('scoreboard');
                        }}
                        className="w-full text-left px-2 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-2"
                      >
                        <Trophy className="w-4 h-4 text-amber-500" /> My Rank on Scoreboard
                      </button>
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          onNavigate('cascading-report');
                        }}
                        className="w-full text-left px-2 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-2"
                      >
                        <Layers className="w-4 h-4 text-indigo-500" /> Cascading Reports
                      </button>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          onOpenLogin();
                        }}
                        className="text-xs font-bold text-blue-600 hover:underline"
                      >
                        Switch Student
                      </button>
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          onLogout();
                        }}
                        className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
                      >
                        <LogOut className="w-3.5 h-3.5" /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={onOpenLogin}
                  className="px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Login</span>
                </button>
                <button
                  onClick={onOpenRegister}
                  className="px-4 py-1.5 rounded-xl text-xs font-bold bg-green-600 hover:bg-green-700 text-white shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Register</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Navigation Bar - Auto adjusted and centered */}
        <div className="w-full flex justify-center py-2.5 overflow-x-auto scrollbar-none">
          <nav className="flex items-center justify-center space-x-1.5 sm:space-x-3 text-xs font-bold whitespace-nowrap px-2 mx-auto">
            <button
              onClick={() => onNavigate('test')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
                activeView === 'test'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <PlayCircle className="w-4 h-4 text-amber-400" />
              <span>Daily Practice Test (60 Qs)</span>
            </button>

            {currentUser && (
              <button
                onClick={() => onNavigate('dashboard')}
                className={`px-3.5 sm:px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeView === 'dashboard'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <BarChart3 className="w-4 h-4 text-emerald-400" />
                <span>My Dashboard & GPA Progress</span>
              </button>
            )}

            <button
              onClick={() => onNavigate('scoreboard')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
                activeView === 'scoreboard'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Top 10 Score Board</span>
            </button>

            <button
              onClick={() => onNavigate('cascading-report')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
                activeView === 'cascading-report'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-indigo-400" />
              <span>Cascading Report (Dist &gt; Mandal &gt; School)</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
