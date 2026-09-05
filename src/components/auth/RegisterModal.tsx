import { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { UserPlus, Building2, X, AlertCircle, Phone, Mail, MapPin, Search, CheckCircle2, Loader2, KeyRound } from 'lucide-react';
import { SchoolInfo, UserAccount } from '../../types';
import { getActiveSchools, getAllDistricts, getMandalsForDistrict, searchSchools } from '../../data/schoolsDirectory';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';
import { registerStudent } from '../../services/authService';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: UserAccount) => void;
  onSwitchToLogin: () => void;
}

export function RegisterModal({
  isOpen,
  onClose,
  onSuccess,
  onSwitchToLogin,
}: RegisterModalProps) {
  const [studentName, setStudentName] = useState('');
  const [penNo, setPenNo] = useState('');
  const [section, setSection] = useState('A');
    const [pin, setPin] = useState('');
  
  // School selection states
  const [selectedDistrict, setSelectedDistrict] = useState('ANAKAPALLI');
  const [selectedMandal, setSelectedMandal] = useState('ANAKAPALLI');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSchool, setSelectedSchool] = useState<SchoolInfo | null>(null);
  
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [registeredUser, setRegisteredUser] = useState<UserAccount | null>(null);

  const districts = getAllDistricts();
  const mandals = getMandalsForDistrict(selectedDistrict);
  
  const filteredSchools = useMemo(() => {
    if (searchQuery.length >= 3) {
      return searchSchools(searchQuery);
    }
    return getActiveSchools().filter(s => 
      s.district === selectedDistrict && 
      s.mandal === selectedMandal
    );
  }, [selectedDistrict, selectedMandal, searchQuery]);

  if (!isOpen) return null;

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#3b82f6', '#10b981', '#f59e0b']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#3b82f6', '#10b981', '#f59e0b']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!studentName || studentName.length < 2) {
      setErrorMsg('Please enter a valid student full name.');
      return;
    }
    if (!penNo || !/^[0-9]{11}$/.test(penNo)) {
      setErrorMsg('PEN Number must be exactly 11 digits.');
      return;
    }
    if (!pin || pin.length < 4) {
      setErrorMsg('Please create a 4-digit Exam Security PIN.');
      return;
    }
    if (!selectedSchool || !selectedSchool.udiseCode) {
      setErrorMsg('Please select a valid school.');
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        studentName: studentName.trim(),
        penNo: penNo.trim(),
                section: section,
        pin: pin,
        school: selectedSchool
      };
      
      const result = registerStudent(payload);
      
      if (result.success && result.user) {
        // Also persist globally to Firestore
        await setDoc(doc(db, 'registered_students', result.user.penNo), result.user);
        
        setRegisteredUser(result.user);
        setSuccessMsg(result.message);
        triggerConfetti();
        
        setTimeout(() => {
          onSuccess(result.user!);
          onClose();
        }, 3000);
      } else {
        setErrorMsg(result.message || 'Registration failed');
      }
    } catch (e: any) {
      console.error(e);
      setErrorMsg(e.message || 'Failed to complete registration.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden my-6">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-200">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">New Candidate Registration</h2>
              <p className="text-xs text-blue-200">
                Register to track your test scores globally
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success State */}
        {registeredUser ? (
          <div className="p-12 flex flex-col items-center justify-center text-center animate-in zoom-in duration-500 flex-1 overflow-y-auto">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-100">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Registration Complete!</h3>
            <p className="text-slate-600 mb-8 max-w-md">
              Welcome, <span className="font-semibold text-slate-800">{registeredUser.studentName}</span>. Your account is ready.
            </p>
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 w-full max-w-sm text-left shadow-sm">
               <div className="flex justify-between py-2 border-b border-slate-100">
                 <span className="text-slate-500 text-sm">PEN Number:</span>
                 <span className="font-bold text-slate-800">{registeredUser.penNo}</span>
               </div>
               <div className="flex justify-between py-2">
                 <span className="text-slate-500 text-sm">School:</span>
                 <span className="font-bold text-slate-800 text-right pl-4">{registeredUser.schoolDetails?.schoolName}</span>
               </div>
            </div>
            <p className="text-sm text-slate-500 mt-8 animate-pulse">Redirecting to Dashboard...</p>
          </div>
        ) : (
          /* Scrollable Content Area */
          <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
            {errorMsg && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl text-sm flex items-start gap-3 border border-red-100 shadow-sm animate-in slide-in-from-top-2">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p className="leading-relaxed font-medium">{errorMsg}</p>
              </div>
            )}

            <form id="registration-form" onSubmit={handleRegisterSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Column 1: Personal Details */}
              <div className="space-y-6">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">1</span>
                    Student Details
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                        Full Name (As per records) <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={studentName}
                          onChange={(e) => setStudentName(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm font-medium"
                          placeholder="e.g. B. Sai Kumar"
                        />
                        <UserPlus className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                        PEN / Hall Ticket No <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={penNo}
                          onChange={(e) => setPenNo(e.target.value.replace(/[^0-9]/g, ''))}
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm font-medium"
                          placeholder="11-Digit PEN"
                          maxLength={11}
                        />
                        <UserPlus className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                          Section
                        </label>
                        <select
                          value={section}
                          onChange={(e) => setSection(e.target.value)}
                          className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm font-medium"
                        >
                          <option value="A">Section A</option>
                          <option value="B">Section B</option>
                          <option value="C">Section C</option>
                          <option value="D">Section D</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                        Create Security PIN <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          required
                          value={pin}
                          onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, ''))}
                          maxLength={4}
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm font-medium tracking-widest"
                          placeholder="•••• (4 Digits)"
                        />
                        <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 2: School Details */}
              <div className="space-y-6">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">2</span>
                    School Details
                  </h3>
                  
                  <div className="space-y-4 flex-1 flex flex-col">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">District</label>
                        <div className="relative">
                          <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                          <select 
                            value={selectedDistrict}
                            onChange={(e) => {
                              setSelectedDistrict(e.target.value);
                              const mdls = getMandalsForDistrict(e.target.value);
                              if (mdls.length > 0) setSelectedMandal(mdls[0]);
                              setSelectedSchool(null);
                            }}
                            className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm font-medium appearance-none"
                          >
                            {districts.map(d => <option key={d} value={d}>{d}</option>)}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Mandal</label>
                        <select 
                          value={selectedMandal}
                          onChange={(e) => {
                            setSelectedMandal(e.target.value);
                            setSelectedSchool(null);
                          }}
                          className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm font-medium"
                        >
                          {mandals.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="relative pt-2">
                       <div className="relative">
                          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                          <input
                            type="text"
                            placeholder="Search school by name or UDISE..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 text-sm"
                          />
                       </div>
                    </div>

                    <div className="flex-1 mt-2 border border-slate-200 rounded-xl overflow-hidden flex flex-col bg-slate-50 min-h-[180px]">
                      <div className="bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-500 border-b border-slate-200 uppercase tracking-wider">
                        Select Your School <span className="text-red-500">*</span>
                      </div>
                      <div className="flex-1 overflow-y-auto max-h-[220px] p-2 space-y-1">
                        {filteredSchools.length > 0 ? (
                          filteredSchools.map(school => (
                            <button
                              key={school.udiseCode}
                              type="button"
                              onClick={() => setSelectedSchool(school)}
                              className={"w-full text-left p-3 rounded-lg text-sm transition-all border " + (selectedSchool?.udiseCode === school.udiseCode ? 'bg-blue-50 border-blue-300 shadow-sm' : 'bg-white border-transparent hover:border-slate-200 hover:bg-slate-100')}
                            >
                              <div className="font-bold text-slate-800">{school.schoolName}</div>
                              <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                                <span className="font-mono bg-slate-200 px-1.5 py-0.5 rounded text-[10px]">{school.udiseCode}</span>
                                <span>{school.mandal}</span>
                              </div>
                            </button>
                          ))
                        ) : (
                          <div className="text-center p-6 text-slate-500 text-sm">
                            No schools found in this mandal.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Footer Actions */}
        {!registeredUser && (
          <div className="p-5 border-t border-slate-100 bg-white flex items-center justify-between shrink-0">
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors"
            >
              Already registered? Login
            </button>
            <button
              type="submit"
              form="registration-form"
              disabled={isLoading || !selectedSchool || !studentName || !penNo || !pin}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 hover:shadow-md hover:shadow-blue-500/20 transition-all disabled:opacity-50 disabled:hover:shadow-none"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <CheckCircle2 className="w-4 h-4" />
              )}
              Complete Registration
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
