import React, { useState, useEffect } from 'react';
import { Trophy, Award, Sparkles, BookOpen, TrendingUp, Target, Star, CheckCircle2, Clock } from 'lucide-react';

interface SSCHeaderBannerProps {
  customImageSrc?: string;
  onTakeTestClick?: () => void;
}

export function SSCHeaderBanner({ customImageSrc, onTakeTestClick }: SSCHeaderBannerProps) {
  const [imageLoaded, setImageLoaded] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
  
  const formattedTime = currentTime.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  return (
    <div className="w-full bg-gradient-to-r from-[#031538] via-[#0b2b68] to-[#123e8c] relative overflow-hidden border-b border-amber-500/30 shadow-md">
      {/* Background Ambient Glow & Light Rays */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Sunrise Horizon Glow */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-amber-500/25 via-amber-400/10 to-transparent" />
        {/* Center Golden Flare */}
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl" />
        {/* Right Light Glow */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-blue-400/15 rounded-full blur-3xl" />
        
        {/* Faint Educational Doodles in the sky */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="edu-pattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M 20 40 L 40 20 L 60 40 Z" fill="none" stroke="white" strokeWidth="1" />
              <circle cx="90" cy="30" r="12" fill="none" stroke="white" strokeWidth="1" />
              <path d="M 15 80 Q 30 65 45 80 T 75 80" fill="none" stroke="white" strokeWidth="1" />
              <rect x="80" y="70" width="20" height="25" rx="3" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#edu-pattern)" />
        </svg>
      </div>

      {/* Main Banner Container - Reduced Height & Auto-fit screen size */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 relative z-10">
        <div className="flex items-center justify-between gap-2 sm:gap-4 md:gap-6 min-h-[90px] sm:min-h-[110px] md:min-h-[125px]">
          
          {/* LEFT: Branding, Trophy & 3D Title */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Golden Trophy Emblem */}
            <div className="relative shrink-0 flex items-center justify-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-b from-[#0a2355] to-[#04122d] rounded-2xl flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-radial from-amber-400/30 to-transparent" />
                  <Trophy className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-amber-300 drop-shadow-[0_2px_8px_rgba(245,158,11,0.8)]" />
                  <div className="flex items-center gap-0.5 mt-0.5">
                    <Star className="w-2 h-2 sm:w-2.5 sm:h-2.5 fill-amber-300 text-amber-300" />
                    <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-amber-300 text-amber-300" />
                    <Star className="w-2 h-2 sm:w-2.5 sm:h-2.5 fill-amber-300 text-amber-300" />
                  </div>
                </div>
              </div>
            </div>

            {/* Typography Stack */}
            <div className="flex flex-col justify-center">
              <div className="flex items-baseline gap-1.5 sm:gap-2.5">
                <span className="font-black text-2xl sm:text-3xl md:text-4xl text-white tracking-tighter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-sans">
                  SSC
                </span>
                <span className="font-black text-2xl sm:text-3xl md:text-4xl tracking-tight bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(217,119,6,0.6)]">
                  CHAMPIONS
                </span>
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] sm:text-xs font-black px-2 sm:px-2.5 py-0.5 rounded-full border border-blue-400/40 shadow-sm">
                  - 2027 -
                </span>
              </div>

              {/* Tagline & Core Pillars */}
              <div className="flex items-center gap-1.5 sm:gap-3 mt-1 flex-wrap">
                <div className="inline-flex items-center gap-1 bg-black/40 border border-amber-400/30 px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold text-amber-300">
                  <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                  <span className="tracking-wide uppercase">PRACTICE TODAY • SUCCEED TOMORROW</span>
                </div>

                <div className="hidden lg:flex items-center gap-2 text-[10px] text-slate-200 font-semibold">
                  <span className="flex items-center gap-1 bg-blue-900/60 px-2 py-0.5 rounded border border-blue-700/50">
                    <BookOpen className="w-3 h-3 text-amber-400" /> Daily Practice
                  </span>
                  <span className="flex items-center gap-1 bg-blue-900/60 px-2 py-0.5 rounded border border-blue-700/50">
                    <TrendingUp className="w-3 h-3 text-emerald-400" /> Daily Progress
                  </span>
                  <span className="flex items-center gap-1 bg-blue-900/60 px-2 py-0.5 rounded border border-blue-700/50">
                    <Target className="w-3 h-3 text-rose-400" /> Exam Success
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Students Thumbs Up Graphic & Live Date/Time */}
          <div className="flex items-center gap-3 sm:gap-5 shrink-0">
            {/* Cinematic Live Date & Time */}
            <div className="hidden sm:flex flex-col items-end mr-1">
              <div className="text-[9px] sm:text-[10px] uppercase font-black tracking-widest text-blue-300/80 mb-0.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">LIVE SECURE TERMINAL</div>
              <div className="flex items-center gap-2.5 bg-[#020b1c]/80 border border-blue-800/80 rounded-lg px-3 py-1.5 shadow-inner backdrop-blur-md">
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur animate-pulse" />
                  <Clock className="w-4 h-4 text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.8)]" />
                </div>
                <div className="flex flex-col items-end leading-none justify-center">
                  <span className="text-sm sm:text-base font-black text-white font-mono tracking-wider drop-shadow-[0_0_4px_rgba(255,255,255,0.4)]">
                    {formattedTime}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-bold text-emerald-400/90 tracking-wide mt-0.5">
                    {formattedDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Student Avatars with Thumbs Up Badges */}
            <div className="flex items-center -space-x-2 sm:-space-x-3">
              {/* Student 1 (Boy) */}
              <div className="relative group">
                <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border-2 border-amber-400 bg-gradient-to-b from-emerald-700 to-emerald-950 flex items-center justify-center text-white font-bold shadow-md overflow-hidden">
                  <div className="w-full h-full flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-600 via-emerald-800 to-slate-900">
                    <span className="text-base sm:text-xl md:text-2xl">👦</span>
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-900 rounded-full p-0.5 shadow-sm border border-white">
                  <span className="text-[10px] sm:text-xs leading-none">👍</span>
                </div>
              </div>

              {/* Student 2 (Girl) */}
              <div className="relative group">
                <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border-2 border-amber-400 bg-gradient-to-b from-emerald-700 to-emerald-950 flex items-center justify-center text-white font-bold shadow-md overflow-hidden">
                  <div className="w-full h-full flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-600 via-emerald-800 to-slate-900">
                    <span className="text-base sm:text-xl md:text-2xl">👧</span>
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-900 rounded-full p-0.5 shadow-sm border border-white">
                  <span className="text-[10px] sm:text-xs leading-none">👍</span>
                </div>
              </div>
            </div>

            {/* Quick Action Button */}
            {onTakeTestClick && (
              <button
                onClick={onTakeTestClick}
                className="hidden md:flex items-center gap-1.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 text-xs font-black px-3.5 py-2 rounded-xl shadow-lg shadow-amber-500/25 transition-all transform hover:scale-105 active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                <span>Start Practice</span>
              </button>
            )}
          </div>

        </div>

        {/* Mobile secondary strip for 3 pillars & Time */}
        <div className="flex lg:hidden flex-wrap items-center justify-between gap-1 pt-1.5 mt-1 border-t border-slate-700/60 text-[10px] text-slate-300 font-semibold">
          <div className="flex sm:hidden items-center gap-1.5 text-[10px] text-emerald-400 font-mono bg-blue-950/50 px-2 py-0.5 rounded border border-emerald-900/50">
            <Clock className="w-3 h-3 animate-pulse" />
            <span>{formattedTime}</span>
          </div>
          <div className="flex items-center gap-2 sm:w-full sm:justify-between">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-amber-400" /> Daily Practice
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Daily Progress
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-blue-400" /> Exam Success
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
