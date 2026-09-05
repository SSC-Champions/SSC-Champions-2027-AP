import { useState } from 'react';
import { LogIn, KeyRound, User, X, AlertCircle, CheckCircle2, GraduationCap, Zap, MapPin, Building2 } from 'lucide-react';
import { UserAccount } from '../../types';
import { loginStudent, resetStudentPin, DEMO_CANDIDATES, getAllRegisteredStudents } from '../../services/authService';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: UserAccount) => void;
  onSwitchToRegister: () => void;
}

export function LoginModal({
  isOpen,
  onClose,
  onSuccess,
  onSwitchToRegister
}: LoginModalProps) {
  const [identifier, setIdentifier] = useState('');
  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [confirmNewPin, setConfirmNewPin] = useState('');
  
  const allRegistered = getAllRegisteredStudents();

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsLoading(true);

    const result = loginStudent(identifier, pin);
    setIsLoading(false);

    if (result.success && result.user) {
      setSuccessMsg(result.message);
      setTimeout(() => {
        onSuccess(result.user!);
        onClose();
      }, 500);
    } else {
      setErrorMsg(result.message);
    }
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    
    if (newPin !== confirmNewPin) {
      setErrorMsg('PINs do not match.');
      return;
    }

    setIsLoading(true);
    const result = resetStudentPin(identifier, newPin);
    setIsLoading(false);

    if (result.success) {
      setSuccessMsg(result.message);
      setTimeout(() => {
        setIsResetMode(false);
        setPin('');
        setNewPin('');
        setConfirmNewPin('');
        setSuccessMsg('');
      }, 2000);
    } else {
      setErrorMsg(result.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg max-h-[92vh] flex flex-col overflow-hidden my-6">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-200">
              <LogIn className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">{isResetMode ? 'Reset PIN' : 'Student Login for Tests'}</h2>
              <p className="text-xs text-blue-200">
                {isResetMode ? 'Create a new security PIN' : 'Only registered students can take practice tests'}
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

        {/* Content Area - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          {/* Main Form */}
          <div className="p-6">
            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-xl text-sm flex items-start gap-2 border border-red-100 animate-in slide-in-from-top-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}
            {successMsg && (
              <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-xl text-sm flex items-start gap-2 border border-green-100 animate-in slide-in-from-top-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{successMsg}</span>
              </div>
            )}

            {!isResetMode ? (
              /* LOGIN FORM */
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                    PEN / Hall Ticket No
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm font-medium"
                      placeholder="Enter 11-Digit PEN"
                    />
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Security PIN
                    </label>
                    <button 
                      type="button"
                      onClick={() => setIsResetMode(true)}
                      className="text-[10px] font-bold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      FORGOT PIN?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm font-medium tracking-widest"
                      placeholder="••••"
                      maxLength={4}
                    />
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-xl font-bold hover:bg-blue-700 hover:shadow-md hover:shadow-blue-500/20 disabled:opacity-50 transition-all"
                >
                  {isLoading ? 'Authenticating...' : 'Start Test Session'}
                </button>
              </form>
            ) : (
              /* RESET PIN FORM */
              <form onSubmit={handleResetSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                    Registered PEN No <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm font-medium"
                      placeholder="Enter your PEN"
                    />
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                      New PIN
                    </label>
                    <input
                      type="password"
                      required
                      value={newPin}
                      onChange={(e) => setNewPin(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm font-medium text-center tracking-widest"
                      placeholder="••••"
                      maxLength={4}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                      Confirm PIN
                    </label>
                    <input
                      type="password"
                      required
                      value={confirmNewPin}
                      onChange={(e) => setConfirmNewPin(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm font-medium text-center tracking-widest"
                      placeholder="••••"
                      maxLength={4}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsResetMode(false)}
                    className="flex-1 py-2.5 px-4 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading || newPin.length < 4}
                    className="flex-1 py-2.5 px-4 bg-amber-500 text-white rounded-xl font-bold hover:bg-amber-600 transition-colors disabled:opacity-50"
                  >
                    {isLoading ? 'Resetting...' : 'Update PIN'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between shrink-0 rounded-b-2xl">
          <p className="text-xs text-slate-500 font-medium">New Student?</p>
          <button
            onClick={onSwitchToRegister}
            className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
          >
            Register Now
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
