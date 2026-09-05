import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SSCDailyPracticeTest } from './components/ssc-test/SSCDailyPracticeTest';
import { StudentDashboardView } from './components/dashboard/StudentDashboardView';
import { ScoreBoardView } from './components/scoreboard/ScoreBoardView';
import { CascadingReportView } from './components/reports/CascadingReportView';
import { SchoolStudentsView } from './components/reports/SchoolStudentsView';
import { LoginModal } from './components/auth/LoginModal';
import { RegisterModal } from './components/auth/RegisterModal';
import { UserAccount, AppNavView, SSCTestAttempt } from './types';
import { getCurrentUser, setCurrentUser, logoutStudent, clearAllRegisteredInformation, syncAllRegisteredStudentsFromFirestore } from './services/authService';
import { syncAllAttemptsFromFirestore } from './services/sscTestService';
import { Youtube } from 'lucide-react';

export function App() {
  // Clear previous registered information once on mount so app starts 100% fresh
  useEffect(() => {
    const FRESH_VERSION_KEY = 'ssc_app_fresh_reset_done_v3';
    if (!localStorage.getItem(FRESH_VERSION_KEY)) {
      clearAllRegisteredInformation();
      localStorage.setItem(FRESH_VERSION_KEY, 'true');
      setCurrentUserState(null);
    }
  }, []);

  // Current student session (loads from localStorage or demo candidate)
  const [currentUserState, setCurrentUserState] = useState<UserAccount | null>(() => getCurrentUser());
  const [refreshKey, setRefreshKey] = useState(0);
  
  // Navigation View State
  const [activeView, setActiveView] = useState<AppNavView>('test');
  
  // Selected attempt to review from Dashboard or History
  const [selectedAttemptForReview, setSelectedAttemptForReview] = useState<SSCTestAttempt | null>(null);

  // Selected school for direct school student roster
  const [selectedUdiseCode, setSelectedUdiseCode] = useState<string>('28130702603');

  // Auth Modals
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    

  // Global Data Sync
  useEffect(() => {
    const unsubStudents = syncAllRegisteredStudentsFromFirestore();
    const unsubAttempts = syncAllAttemptsFromFirestore();
    
    const handleStorage = () => setRefreshKey(prev => prev + 1);
    window.addEventListener('storage', handleStorage);
    
    return () => {
      window.removeEventListener('storage', handleStorage);
      if (unsubStudents) unsubStudents();
      if (unsubAttempts) unsubAttempts();
    };
  }, []);

  // Sync state with authService
  useEffect(() => {
    const user = getCurrentUser();
    if (user && !currentUserState) {
      setCurrentUserState(user);
    }
  }, []);

  
  useEffect(() => {

  }, []);

  const handleAuthSuccess = (user: UserAccount) => {
    setCurrentUserState(user);
    setCurrentUser(user);
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
    
    
  };

  const handleLogout = () => {
    logoutStudent();
    setCurrentUserState(null);
  };

  const handleViewSchoolFromScoreboard = (udiseCode: string) => {
    setSelectedUdiseCode(udiseCode);
    setActiveView('school-students');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewAttemptFromDashboard = (attempt: SSCTestAttempt) => {
    setSelectedAttemptForReview(attempt);
    setActiveView('test');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800">
      {/* Top Application Header & Navigation Bar */}
        <Header
          currentUser={currentUserState}
          activeView={activeView}
          onNavigate={(view) => {
            if (view !== 'test') {
              setSelectedAttemptForReview(null);
            }
            setActiveView(view);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onViewSchool={handleViewSchoolFromScoreboard}
          onOpenLogin={() => setIsLoginModalOpen(true)}
          onOpenRegister={() => setIsRegisterModalOpen(true)}
          onLogout={handleLogout}
        />

      {/* Main Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* VIEW 1: SSC Daily Practice Test (60 Qs / 60 Mins) */}
        {activeView === 'test' && (
          <SSCDailyPracticeTest
            currentUser={currentUserState}
            initialAttemptToReview={selectedAttemptForReview}
            onClearAttemptToReview={() => setSelectedAttemptForReview(null)}
            onNavigateToDashboard={() => {
              setActiveView('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenLogin={() => setIsLoginModalOpen(true)}
            onOpenRegister={() => setIsRegisterModalOpen(true)}
          />
        )}

        {/* VIEW 2: Student Personal Dashboard & GPA Progress & Subject Strength */}
        {activeView === 'dashboard' && (
          <StudentDashboardView
            currentUser={currentUserState}
            onTakeTest={() => {
              setSelectedAttemptForReview(null);
              setActiveView('test');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onViewAttemptSnapshot={handleViewAttemptFromDashboard}
            onOpenLogin={() => setIsLoginModalOpen(true)}
            onOpenRegister={() => setIsRegisterModalOpen(true)}
          />
        )}

        {/* VIEW 3: Top 10 Score Board (Today, This Week, This Month, Over All) */}
        {activeView === 'scoreboard' && (
          <ScoreBoardView
            currentUser={currentUserState}
            onTakeTest={() => {
              setSelectedAttemptForReview(null);
              setActiveView('test');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onViewSchoolStudents={handleViewSchoolFromScoreboard}
          />
        )}

        {/* VIEW 4: Cascading Report (District Wise -> Mandal Wise -> School Wise) */}
        {activeView === 'cascading-report' && (
          <CascadingReportView
            currentUser={currentUserState}
            onTakeTest={() => {
              setSelectedAttemptForReview(null);
              setActiveView('test');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* VIEW 5: School-Wise All Students Performance Roster */}
        {activeView === 'school-students' && (
          <SchoolStudentsView
            currentUser={currentUserState}
            udiseCode={selectedUdiseCode}
            onBack={() => {
              setActiveView('cascading-report');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onTakeTest={() => {
              setSelectedAttemptForReview(null);
              setActiveView('test');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Disclaimer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-2">
        <p className="text-[10px] sm:text-xs text-slate-500 text-center leading-relaxed">
          <strong>Disclaimer:</strong> This is an independent educational initiative created to support students in regular practice and reduce examination fear. UDISE/UDISE+ School Codes are used only for school identification. This website is not affiliated with, endorsed, authorized, sponsored, or operated by any Government authority.
        </p>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 py-6 mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex flex-col items-center justify-center overflow-hidden">
            {/* Cinematic Glow/Line Effect */}
            <div className="absolute top-0 w-1/2 max-w-md h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
            <div className="absolute top-0 w-1/4 max-w-xs h-[1px] bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent blur-[1px]"></div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-12 py-4 relative z-10 w-full transition-transform duration-1000 ease-out">
              
              <div className="space-y-1.5 text-center sm:text-left sm:border-r border-slate-700/50 pb-4 sm:pb-0 sm:pr-8 md:pr-12">
                <p className="text-[9px] sm:text-[11px] uppercase tracking-[0.4em] sm:tracking-[0.6em] text-slate-500 font-light">
                  Developed By
                </p>
                <h3 className="text-lg sm:text-xl md:text-2xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-slate-300 via-white to-slate-300 tracking-[0.15em] font-medium drop-shadow-lg cursor-default hover:scale-105 transition-transform duration-500 inline-block">
                  J.NARAYANASWAMY
                </h3>
                <p className="text-[11px] sm:text-xs text-emerald-400 font-medium tracking-[0.2em] sm:tracking-[0.3em] uppercase drop-shadow-sm cursor-default">
                  SA Mathematics
                </p>
                <div className="pt-1.5 cursor-default">
                  <p className="text-[9px] sm:text-[10px] text-slate-500 tracking-[0.3em] uppercase font-light">
                    Presently Working As
                  </p>
                  <p className="text-[11px] sm:text-xs text-slate-300 tracking-[0.2em] uppercase font-medium mt-1 drop-shadow">
                    APO APSS, Ananthapuramu
                  </p>
                </div>
              </div>

              {/* Social Media Icons */}
              <div className="flex items-center justify-center gap-5 sm:pl-2">
                <a href="https://www.youtube.com/channel/UCSEFWC3RbK--W1etyLP09Tw" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-800/50 text-slate-400 hover:text-white hover:bg-red-600 shadow-lg shadow-black/20 transition-all duration-300 hover:scale-110" aria-label="YouTube">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={handleAuthSuccess}
        onSwitchToRegister={() => {
          
          setIsLoginModalOpen(false);
          setIsRegisterModalOpen(true);
        }}
      />

            <RegisterModal
        isOpen={isRegisterModalOpen}        
        onClose={() => setIsRegisterModalOpen(false)}
        onSuccess={handleAuthSuccess}
        onSwitchToLogin={() => {
          setIsRegisterModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      />
      
    </div>
  );
}

export default App;
