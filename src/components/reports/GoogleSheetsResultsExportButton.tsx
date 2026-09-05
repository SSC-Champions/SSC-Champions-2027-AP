import React, { useState, useEffect, useCallback } from 'react';
import { FileSpreadsheet, LogIn, Loader2, LogOut, CheckCircle2, RefreshCw } from 'lucide-react';
import { initAuth, googleSignIn, logoutGoogle } from '../../services/googleAuth';
import { exportTestResultsToGoogleSheets } from '../../services/googleSheetsResultsSync';
import { User } from 'firebase/auth';

const AUTO_SYNC_ENABLED_KEY = 'ssc_sheets_auto_sync_enabled';
const SAVED_SHEET_ID_KEY = 'ssc_sheets_saved_id';
const SAVED_SHEET_URL_KEY = 'ssc_sheets_saved_url';

export function GoogleSheetsResultsExportButton() {
  const [needsAuth, setNeedsAuth] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  const [sheetUrl, setSheetUrl] = useState<string | null>(localStorage.getItem(SAVED_SHEET_URL_KEY));
  const [isAutoSyncEnabled, setIsAutoSyncEnabled] = useState(localStorage.getItem(AUTO_SYNC_ENABLED_KEY) === 'true');
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = initAuth(
      (u) => {
        setUser(u);
        setNeedsAuth(false);
      },
      () => {
        setUser(null);
        setNeedsAuth(true);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleExport = useCallback(async (isAuto = false) => {
    if (isSyncing || needsAuth) return;
    setIsSyncing(true);
    if (!isAuto) setSyncStatus({ type: null, message: '' });
    
    const savedId = localStorage.getItem(SAVED_SHEET_ID_KEY);
    const result = await exportTestResultsToGoogleSheets(savedId || undefined);
    
    if (result.success) {
      if (!isAuto) setSyncStatus({ type: 'success', message: result.message });
      if (result.sheetUrl) {
        setSheetUrl(result.sheetUrl);
        localStorage.setItem(SAVED_SHEET_URL_KEY, result.sheetUrl);
      }
      if (result.spreadsheetId) {
        localStorage.setItem(SAVED_SHEET_ID_KEY, result.spreadsheetId);
      }
      setLastSyncTime(new Date().toLocaleTimeString());
      if (!isAuto && !savedId && result.sheetUrl) {
        // Automatically open the sheet only on first creation
        window.open(result.sheetUrl, '_blank');
      }
    } else {
      if (!isAuto) setSyncStatus({ type: 'error', message: result.message });
      // If auto-sync fails, maybe it's unauthorized, disable it
      if (isAuto && result.message.includes('Sign in')) {
        setIsAutoSyncEnabled(false);
        localStorage.removeItem(AUTO_SYNC_ENABLED_KEY);
      }
    }
    setIsSyncing(false);
  }, [isSyncing, needsAuth]);

  // Listen for storage events (which indicates new data from firestore)
  useEffect(() => {
    if (!isAutoSyncEnabled || needsAuth) return;

    let timeoutId: NodeJS.Timeout;

    const handleStorageChange = () => {
      // Debounce auto-sync so we don't spam the API on rapid updates
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        handleExport(true);
      }, 3000);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearTimeout(timeoutId);
    };
  }, [isAutoSyncEnabled, needsAuth, handleExport]);

  const toggleAutoSync = () => {
    const newState = !isAutoSyncEnabled;
    setIsAutoSyncEnabled(newState);
    if (newState) {
      localStorage.setItem(AUTO_SYNC_ENABLED_KEY, 'true');
      // Trigger an immediate sync when enabled
      handleExport(false);
    } else {
      localStorage.setItem(AUTO_SYNC_ENABLED_KEY, 'false');
    }
  };

    const handleAuth = async () => {
    try {
      const result = await googleSignIn();
      if (result) {
        if (result.user.email !== 'swamy6677@gmail.com') {
          await logoutGoogle();
          setSyncStatus({ type: 'error', message: 'Unauthorized: Admin access only (swamy6677@gmail.com)' });
          return;
        }
        setUser(result.user);
        setNeedsAuth(false);
      }
    } catch (e) {
      console.error(e);
      setSyncStatus({ type: 'error', message: 'Google Sign In failed.' });
    }
  };
  
  const handleLogout = async () => {
    await logoutGoogle();
    setSyncStatus({ type: null, message: '' });
    setIsAutoSyncEnabled(false);
    localStorage.removeItem(AUTO_SYNC_ENABLED_KEY);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative">
        <button 
          onClick={() => window.dispatchEvent(new Event('toggle-admin-sync'))} 
          className="absolute -top-6 -right-2 w-6 h-6 flex items-center justify-center bg-slate-200 text-slate-500 rounded-full hover:bg-slate-300 transition-colors"
          title="Close Admin Panel"
        >
          &times;
        </button>
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            Google Sheets Auto-Sync
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Export all student test results and attempts directly to a Google Sheet.
          </p>
          {lastSyncTime && (
            <p className="text-[10px] text-slate-400 mt-1 font-mono">Last synced: {lastSyncTime}</p>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          {needsAuth ? (
            <button
              onClick={handleAuth}
              className="px-4 py-2 bg-white border border-slate-300 rounded-lg shadow-sm text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                <path fill="none" d="M1 1h22v22H1z" />
              </svg>
              Sign in with Google
            </button>
          ) : (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-600 hidden sm:inline-block mr-2">Signed in as <b>{user?.displayName || user?.email}</b></span>
              
              <label className="flex items-center gap-2 cursor-pointer bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg mr-1">
                <div className="relative">
                  <input type="checkbox" className="sr-only" checked={isAutoSyncEnabled} onChange={toggleAutoSync} />
                  <div className={`block w-8 h-4 rounded-full transition-colors ${isAutoSyncEnabled ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                  <div className={`dot absolute left-0.5 top-0.5 bg-white w-3 h-3 rounded-full transition-transform ${isAutoSyncEnabled ? 'transform translate-x-4' : ''}`}></div>
                </div>
                <span className="text-xs font-bold text-slate-700">Auto-Sync</span>
              </label>

              <button
                onClick={() => handleExport(false)}
                disabled={isSyncing || isAutoSyncEnabled}
                className={`px-3 py-1.5 rounded-lg shadow-sm text-xs font-bold flex items-center gap-1.5 transition-colors ${isAutoSyncEnabled ? 'bg-slate-100 text-slate-400 opacity-70 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 text-white'}`}
              >
                {isSyncing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
                {isSyncing ? 'Syncing...' : 'Sync Now'}
              </button>

              <button
                onClick={handleLogout}
                className="p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
                title="Sign out of Google"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
      
      {syncStatus.type && (
        <div className={`mt-4 p-3 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl text-xs font-semibold border ${syncStatus.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-800 border-red-200'}`}>
          <div className="flex items-center gap-2">
            {syncStatus.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
            {syncStatus.message}
          </div>
        </div>
      )}
      
      {sheetUrl && (
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500">A connected Google Sheet is active</span>
          <a 
            href={sheetUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1.5"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            Open Sheet
          </a>
        </div>
      )}
    </div>
  );
}
