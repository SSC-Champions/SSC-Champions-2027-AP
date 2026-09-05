import React, { useState } from 'react';
import { QuestionDiagramData } from '../../types';
import { 
  Maximize2, 
  Minimize2, 
  MapPin, 
  Layers, 
  Eye, 
  ZoomIn, 
  Info,
  Compass,
  FileText
} from 'lucide-react';

interface QuestionDiagramViewerProps {
  diagramData: QuestionDiagramData;
  questionNumber?: number;
  interactive?: boolean;
}

export function QuestionDiagramViewer({ 
  diagramData, 
  questionNumber,
  interactive = true 
}: QuestionDiagramViewerProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  // Render specific diagram based on type & variant
  const renderDiagramContent = () => {
    switch (diagramData.type) {
      case 'india_map':
        return renderIndiaMap(diagramData.variant || 'physical', diagramData.markedPoint);
      case 'world_map':
        return renderWorldMap(diagramData.variant || 'world_features', diagramData.markedPoint);
      case 'ray_diagram':
        return renderRayDiagram(diagramData.variant || 'concave_mirror', diagramData.markedPoint);
      case 'circuit':
        return renderCircuitDiagram(diagramData.variant || 'resistors_series', diagramData.markedPoint);
      case 'bio_diagram':
        return renderBioDiagram(diagramData.variant || 'nephron', diagramData.markedPoint);
      case 'math_geometry':
        return renderMathGeometry(diagramData.variant || 'circle_tangents', diagramData.markedPoint);
      case 'chemistry_setup':
        return renderChemistrySetup(diagramData.variant || 'hydrogen_gas', diagramData.markedPoint);
      case 'data_table':
        return renderDataTable(diagramData.tableHeaders, diagramData.tableRows);
      default:
        return renderIndiaMap('physical', diagramData.markedPoint);
    }
  };

  /* -------------------------------------------------------------
   * 1. INDIA MAP SVG (Physical & Political Features)
   * ------------------------------------------------------------- */
  function renderIndiaMap(variant: string, markedPoint?: string) {
    return (
      <div className="relative w-full max-w-lg mx-auto bg-sky-50/60 rounded-xl p-3 border border-sky-200/80 shadow-xs flex flex-col items-center">
        {/* Map Header Indicator */}
        <div className="w-full flex items-center justify-between text-[11px] font-bold text-slate-600 mb-1 px-1">
          <span className="flex items-center gap-1 text-sky-800">
            <Compass className="w-3.5 h-3.5 text-sky-600 animate-spin-slow" />
            <span>Map of India (Outline & Physical Features)</span>
          </span>
          <span className="text-[10px] bg-sky-100 text-sky-800 px-2 py-0.5 rounded font-mono">
            Scale: Not to Scale
          </span>
        </div>

        <svg
          viewBox="0 0 500 560"
          className="w-full h-auto max-h-[380px] drop-shadow-sm select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="landGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FEF3C7" />
              <stop offset="50%" stopColor="#FEF9C3" />
              <stop offset="100%" stopColor="#DCFCE7" />
            </linearGradient>
            <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
              <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#0f172a" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* Sea background */}
          <rect width="500" height="560" fill="#F0F9FF" rx="8" />

          {/* Grid lines (Latitudes & Longitudes) */}
          <line x1="30" y1="260" x2="470" y2="260" stroke="#BAE6FD" strokeWidth="1" strokeDasharray="4 4" />
          <text x="40" y="255" fill="#0284C7" fontSize="10" fontWeight="bold">23° 30' N (Tropic of Cancer)</text>
          
          {/* 82°30' E Standard Meridian Line */}
          <line 
            x1="285" y1="40" x2="285" y2="520" 
            stroke={variant === 'standard_meridian' ? '#DC2626' : '#0284C7'} 
            strokeWidth={variant === 'standard_meridian' ? '2.5' : '1.2'} 
            strokeDasharray={variant === 'standard_meridian' ? 'none' : '5 5'} 
          />
          <text x="290" y="55" fill={variant === 'standard_meridian' ? '#DC2626' : '#0369A1'} fontSize="10" fontWeight="bold">
            82° 30' E (IST Meridian)
          </text>

          {/* Water Bodies Labels */}
          <text x="40" y="440" fill="#0284C7" fontSize="11" fontWeight="bold" opacity="0.8">ARABIAN SEA</text>
          <text x="360" y="440" fill="#0284C7" fontSize="11" fontWeight="bold" opacity="0.8">BAY OF BENGAL</text>
          <text x="180" y="545" fill="#0284C7" fontSize="11" fontWeight="bold" opacity="0.8">INDIAN OCEAN</text>

          {/* Neighboring hints */}
          <text x="70" y="160" fill="#94A3B8" fontSize="10" fontStyle="italic">PAKISTAN</text>
          <text x="320" y="100" fill="#94A3B8" fontSize="10" fontStyle="italic">CHINA / TIBET</text>
          <text x="270" y="170" fill="#94A3B8" fontSize="9" fontStyle="italic">NEPAL</text>
          <text x="375" y="195" fill="#94A3B8" fontSize="9" fontStyle="italic">BHUTAN</text>
          <text x="365" y="275" fill="#94A3B8" fontSize="9" fontStyle="italic">BANGLADESH</text>
          <text x="420" y="290" fill="#94A3B8" fontSize="9" fontStyle="italic">MYANMAR</text>
          <text x="260" y="525" fill="#94A3B8" fontSize="9" fontStyle="italic">SRI LANKA</text>

          {/* India Boundary Path (Accurate Silhouette Outline) */}
          <path
            d="M 170 40 
               C 180 30, 220 20, 235 45 
               C 245 60, 260 55, 270 70
               C 285 75, 295 90, 305 105
               L 330 145 
               L 360 150 
               L 395 140 
               L 440 160 
               L 460 190 
               L 445 220 
               L 415 225 
               L 410 250 
               L 380 270 
               L 355 255 
               L 335 285 
               L 345 320 
               L 335 365 
               L 300 410 
               L 275 460 
               L 255 495 
               L 245 495 
               L 225 450 
               L 210 400 
               L 190 350 
               L 165 310 
               L 130 305 
               L 100 290 
               L 90 260 
               L 115 235 
               L 125 200 
               L 135 150 
               L 160 100 
               Z"
            fill="url(#landGrad)"
            stroke="#334155"
            strokeWidth="2.2"
            strokeLinejoin="round"
            filter="url(#shadow)"
          />

          {/* Physical Features Overlays */}
          
          {/* 1. Himalayas Range */}
          <path
            d="M 180 55 Q 260 90 340 145 T 435 170"
            fill="none"
            stroke="#92400E"
            strokeWidth="5"
            strokeDasharray="4 2"
            opacity="0.85"
          />
          <text x="250" y="85" fill="#78350F" fontSize="9" fontWeight="bold">HIMALAYAS</text>

          {/* 2. Thar Desert */}
          <path
            d="M 120 180 Q 150 170 160 210 Q 130 230 120 180 Z"
            fill="#FDE68A"
            stroke="#D97706"
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />
          <text x="125" y="200" fill="#B45309" fontSize="8" fontWeight="bold">Thar Desert</text>

          {/* 3. Western Ghats */}
          <path
            d="M 175 320 Q 200 390 235 480"
            fill="none"
            stroke="#15803D"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <text x="150" y="410" fill="#166534" fontSize="8" fontWeight="bold" transform="rotate(-70 150 410)">WESTERN GHATS</text>

          {/* 4. Eastern Ghats */}
          <path
            d="M 325 320 Q 300 380 265 460"
            fill="none"
            stroke="#15803D"
            strokeWidth="3.5"
            strokeDasharray="8 4"
            strokeLinecap="round"
          />
          <text x="315" y="380" fill="#166534" fontSize="8" fontWeight="bold" transform="rotate(65 315 380)">EASTERN GHATS</text>

          {/* 5. Major Rivers (Ganga, Godavari, Krishna) */}
          <path d="M 230 130 Q 290 170 360 250" fill="none" stroke="#2563EB" strokeWidth="1.5" />
          <text x="280" y="165" fill="#1D4ED8" fontSize="8" fontWeight="semibold">R. Ganga</text>

          <path d="M 200 320 Q 260 330 325 350" fill="none" stroke="#2563EB" strokeWidth="1.5" />
          <text x="245" y="325" fill="#1D4ED8" fontSize="8" fontWeight="semibold">R. Godavari</text>

          <path d="M 215 370 Q 255 380 295 400" fill="none" stroke="#2563EB" strokeWidth="1.5" />
          <text x="240" y="375" fill="#1D4ED8" fontSize="8" fontWeight="semibold">R. Krishna</text>

          {/* Andaman & Nicobar Islands */}
          <g id="andaman">
            <ellipse cx="430" cy="420" rx="4" ry="12" fill="#16A34A" />
            <ellipse cx="433" cy="445" rx="3.5" ry="8" fill="#16A34A" />
            <ellipse cx="436" cy="470" rx="3" ry="6" fill="#16A34A" />
            <text x="442" y="445" fill="#334155" fontSize="8">Andaman & Nicobar</text>
          </g>

          {/* Lakshadweep Islands */}
          <g id="lakshadweep">
            <circle cx="160" cy="440" r="2.5" fill="#16A34A" />
            <circle cx="158" cy="455" r="2.5" fill="#16A34A" />
            <circle cx="162" cy="470" r="2.5" fill="#16A34A" />
            <text x="110" y="455" fill="#334155" fontSize="8">Lakshadweep</text>
          </g>

          {/* Sri Lanka Silhouette */}
          <ellipse cx="270" cy="525" rx="10" ry="16" fill="#E2E8F0" stroke="#94A3B8" />

          {/* SPECIFIC LOCATION MARKER HIGHLIGHTS (Point X or A, B, C, D) */}
          {/* Variant 1: Standard Meridian 82°30'E Intersection at Kakinada / Prayagraj */}
          {variant === 'standard_meridian' && (
            <g>
              <circle cx="285" cy="225" r="14" fill="#EF4444" fillOpacity="0.2" className="animate-ping" />
              <circle cx="285" cy="225" r="7" fill="#DC2626" stroke="#FFFFFF" strokeWidth="2" />
              <text x="285" y="229" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">X</text>
              <rect x="300" y="212" width="110" height="22" rx="4" fill="#1E293B" />
              <text x="305" y="227" fill="#F8FAFC" fontSize="9" fontWeight="bold">Point 'X': 82°30' E Meridian</text>
            </g>
          )}

          {/* Variant 2: Kudankulam Nuclear Power Plant in Tamil Nadu */}
          {variant === 'kudankulam' && (
            <g>
              <circle cx="250" cy="485" r="14" fill="#EF4444" fillOpacity="0.2" className="animate-ping" />
              <circle cx="250" cy="485" r="7" fill="#DC2626" stroke="#FFFFFF" strokeWidth="2" />
              <text x="250" y="489" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">X</text>
              <rect x="140" y="495" width="125" height="22" rx="4" fill="#1E293B" />
              <text x="145" y="510" fill="#F8FAFC" fontSize="9" fontWeight="bold">Marked Station: Point 'X'</text>
            </g>
          )}

          {/* Variant 3: Thar Desert / Aravalli Range */}
          {variant === 'thar_desert' && (
            <g>
              <circle cx="140" cy="200" r="16" fill="#F59E0B" fillOpacity="0.3" className="animate-ping" />
              <circle cx="140" cy="200" r="8" fill="#D97706" stroke="#FFFFFF" strokeWidth="2" />
              <text x="140" y="204" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">X</text>
              <rect x="40" y="215" width="115" height="22" rx="4" fill="#1E293B" />
              <text x="45" y="230" fill="#F8FAFC" fontSize="9" fontWeight="bold">Physical Feature 'X'</text>
            </g>
          )}

          {/* Variant 4: Visakhapatnam Port / Coromandel Coast */}
          {variant === 'visakhapatnam_port' && (
            <g>
              <circle cx="320" cy="345" r="14" fill="#2563EB" fillOpacity="0.25" className="animate-ping" />
              <circle cx="320" cy="345" r="7" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
              <text x="320" y="349" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">X</text>
              <rect x="335" y="335" width="125" height="22" rx="4" fill="#1E293B" />
              <text x="340" y="350" fill="#F8FAFC" fontSize="9" fontWeight="bold">Major Sea Port 'X'</text>
            </g>
          )}

          {/* Variant 5: Western Ghats / Anamudi Peak */}
          {variant === 'western_ghats' && (
            <g>
              <circle cx="225" cy="450" r="14" fill="#16A34A" fillOpacity="0.3" className="animate-ping" />
              <circle cx="225" cy="450" r="7" fill="#15803D" stroke="#FFFFFF" strokeWidth="2" />
              <text x="225" y="454" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">X</text>
              <rect x="110" y="435" width="105" height="22" rx="4" fill="#1E293B" />
              <text x="115" y="450" fill="#F8FAFC" fontSize="9" fontWeight="bold">Mountain Peak 'X'</text>
            </g>
          )}

          {/* Variant 6: Tropic of Cancer passing through states */}
          {variant === 'tropic_of_cancer' && (
            <g>
              <line x1="90" y1="260" x2="410" y2="260" stroke="#DC2626" strokeWidth="3" strokeDasharray="6 3" />
              <circle cx="210" cy="260" r="7" fill="#DC2626" stroke="#FFFFFF" strokeWidth="2" />
              <text x="210" y="264" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">X</text>
              <rect x="225" y="250" width="115" height="22" rx="4" fill="#1E293B" />
              <text x="230" y="265" fill="#F8FAFC" fontSize="9" fontWeight="bold">Latitude Line 'X'</text>
            </g>
          )}

          {/* Generic marked point if specified */}
          {markedPoint && !['standard_meridian', 'kudankulam', 'thar_desert', 'visakhapatnam_port', 'western_ghats', 'tropic_of_cancer'].includes(variant) && (
            <g>
              <circle cx="280" cy="350" r="8" fill="#DC2626" stroke="#FFFFFF" strokeWidth="2" />
              <text x="280" y="354" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">{markedPoint}</text>
            </g>
          )}

          {/* Compass Rose */}
          <g transform="translate(430, 60)">
            <circle cx="0" cy="0" r="16" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
            <polygon points="0,-14 4,-3 0,-1" fill="#DC2626" />
            <polygon points="0,-14 -4,-3 0,-1" fill="#991B1B" />
            <polygon points="0,14 4,3 0,1" fill="#475569" />
            <polygon points="0,14 -4,3 0,1" fill="#1E293B" />
            <text x="0" y="-17" fill="#DC2626" fontSize="9" fontWeight="bold" textAnchor="middle">N</text>
            <text x="0" y="24" fill="#475569" fontSize="8" fontWeight="bold" textAnchor="middle">S</text>
            <text x="20" y="3" fill="#475569" fontSize="8" fontWeight="bold" textAnchor="middle">E</text>
            <text x="-20" y="3" fill="#475569" fontSize="8" fontWeight="bold" textAnchor="middle">W</text>
          </g>
        </svg>
      </div>
    );
  }

  /* -------------------------------------------------------------
   * 2. WORLD MAP SVG (Social Studies AS5)
   * ------------------------------------------------------------- */
  function renderWorldMap(variant: string, markedPoint?: string) {
    return (
      <div className="relative w-full max-w-lg mx-auto bg-slate-900 rounded-xl p-3 border border-slate-700 shadow-xs flex flex-col items-center">
        <div className="w-full flex items-center justify-between text-[11px] font-bold text-slate-300 mb-1 px-1">
          <span className="flex items-center gap-1 text-amber-400">
            <Compass className="w-3.5 h-3.5" />
            <span>World Map (Continents, Oceans & Key Locations)</span>
          </span>
          <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono border border-slate-700">
            Social Studies AS5
          </span>
        </div>

        <svg viewBox="0 0 600 340" className="w-full h-auto max-h-[260px] select-none">
          {/* Oceans background */}
          <rect width="600" height="340" fill="#0F172A" rx="8" />

          {/* Latitude Lines */}
          <line x1="20" y1="170" x2="580" y2="170" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
          <text x="25" y="165" fill="#64748B" fontSize="9">0° Equator</text>

          <line x1="20" y1="115" x2="580" y2="115" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
          <text x="25" y="110" fill="#64748B" fontSize="8">23.5° N (Tropic of Cancer)</text>

          <line x1="20" y1="225" x2="580" y2="225" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
          <text x="25" y="220" fill="#64748B" fontSize="8">23.5° S (Tropic of Capricorn)</text>

          {/* 0° Prime Meridian */}
          <line x1="290" y1="20" x2="290" y2="320" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
          <text x="295" y="35" fill="#64748B" fontSize="8">0° Greenwich</text>

          {/* Simplified Continents Schematics */}
          {/* North America */}
          <path d="M 60 60 L 160 50 L 180 110 L 130 160 L 80 130 Z" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
          <text x="100" y="100" fill="#94A3B8" fontSize="10" fontWeight="bold">NORTH AMERICA</text>

          {/* South America */}
          <path d="M 130 170 L 180 180 L 190 250 L 145 300 L 125 220 Z" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
          <text x="135" y="235" fill="#94A3B8" fontSize="9" fontWeight="bold">SOUTH AMERICA</text>

          {/* Europe */}
          <path d="M 270 55 L 340 50 L 330 110 L 270 100 Z" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
          <text x="285" y="80" fill="#94A3B8" fontSize="9" fontWeight="bold">EUROPE</text>

          {/* Africa */}
          <path d="M 265 115 L 340 120 L 350 200 L 305 270 L 260 190 Z" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
          <text x="285" y="180" fill="#94A3B8" fontSize="10" fontWeight="bold">AFRICA</text>

          {/* Asia */}
          <path d="M 345 45 L 520 40 L 510 160 L 410 200 L 360 140 Z" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
          <text x="420" y="100" fill="#94A3B8" fontSize="11" fontWeight="bold">ASIA</text>

          {/* India Subcontinent */}
          <path d="M 395 140 L 430 145 L 415 195 Z" fill="#047857" stroke="#10B981" strokeWidth="1.5" />
          <text x="402" y="165" fill="#A7F3D0" fontSize="8" fontWeight="bold">India</text>

          {/* Australia */}
          <path d="M 460 215 L 530 210 L 525 270 L 455 260 Z" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
          <text x="470" y="245" fill="#94A3B8" fontSize="9" fontWeight="bold">AUSTRALIA</text>

          {/* Highlight Locations */}
          {variant === 'mediterranean' && (
            <g>
              <circle cx="295" cy="108" r="14" fill="#F59E0B" fillOpacity="0.3" className="animate-ping" />
              <circle cx="295" cy="108" r="7" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2" />
              <text x="295" y="112" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">X</text>
              <rect x="230" y="125" width="130" height="20" rx="4" fill="#0284C7" />
              <text x="235" y="139" fill="#FFFFFF" fontSize="9" fontWeight="bold">Sea Body Marked as 'X'</text>
            </g>
          )}

          {variant === 'suez_canal' && (
            <g>
              <circle cx="330" cy="120" r="12" fill="#EF4444" fillOpacity="0.3" className="animate-ping" />
              <circle cx="330" cy="120" r="6" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1.5" />
              <text x="330" y="124" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">X</text>
              <rect x="345" y="112" width="105" height="18" rx="3" fill="#DC2626" />
              <text x="350" y="125" fill="#FFFFFF" fontSize="8" fontWeight="bold">Waterway 'X'</text>
            </g>
          )}

          {variant === 'equator' && (
            <g>
              <line x1="20" y1="170" x2="580" y2="170" stroke="#EF4444" strokeWidth="2.5" />
              <circle cx="300" cy="170" r="7" fill="#DC2626" stroke="#FFFFFF" strokeWidth="2" />
              <text x="300" y="174" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">X</text>
              <rect x="315" y="158" width="100" height="20" rx="4" fill="#1E293B" stroke="#475569" />
              <text x="320" y="172" fill="#F8FAFC" fontSize="9" fontWeight="bold">0° Latitude Line 'X'</text>
            </g>
          )}
        </svg>
      </div>
    );
  }

  /* -------------------------------------------------------------
   * 3. PHYSICS RAY DIAGRAMS (Optics AS5)
   * ------------------------------------------------------------- */
  function renderRayDiagram(variant: string, markedPoint?: string) {
    return (
      <div className="relative w-full max-w-lg mx-auto bg-slate-900 rounded-xl p-3.5 border border-slate-700 shadow-xs flex flex-col items-center">
        <div className="w-full flex items-center justify-between text-[11px] font-bold text-slate-300 mb-2 px-1">
          <span className="flex items-center gap-1.5 text-cyan-400">
            <Layers className="w-3.5 h-3.5" />
            <span>Physics Optics: Ray Diagram (Concave Mirror / Convex Lens)</span>
          </span>
          <span className="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800 px-2 py-0.5 rounded font-mono">
            Physical Science AS5
          </span>
        </div>

        <svg viewBox="0 0 500 240" className="w-full h-auto max-h-[220px] select-none">
          <rect width="500" height="240" fill="#0B132B" rx="8" />

          {/* Principal Axis */}
          <line x1="20" y1="120" x2="480" y2="120" stroke="#64748B" strokeWidth="1.5" />
          <text x="440" y="112" fill="#94A3B8" fontSize="9">Principal Axis</text>

          {/* Concave Mirror Curved Surface */}
          <path d="M 400 30 Q 380 120 400 210" fill="none" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />
          {/* Silvered backing lines */}
          <line x1="400" y1="40" x2="410" y2="35" stroke="#0284C7" strokeWidth="1.5" />
          <line x1="395" y1="80" x2="405" y2="75" stroke="#0284C7" strokeWidth="1.5" />
          <line x1="390" y1="120" x2="400" y2="115" stroke="#0284C7" strokeWidth="1.5" />
          <line x1="395" y1="160" x2="405" y2="155" stroke="#0284C7" strokeWidth="1.5" />
          <line x1="400" y1="200" x2="410" y2="195" stroke="#0284C7" strokeWidth="1.5" />

          {/* Points on Principal Axis: Pole P, Focus F, Center of Curvature C */}
          {/* Pole P */}
          <circle cx="390" cy="120" r="3" fill="#38BDF8" />
          <text x="395" y="135" fill="#38BDF8" fontSize="11" fontWeight="bold">P</text>

          {/* Focus F */}
          <circle cx="280" cy="120" r="3" fill="#FACC15" />
          <text x="277" y="138" fill="#FACC15" fontSize="11" fontWeight="bold">F</text>

          {/* Center of Curvature C */}
          <circle cx="170" cy="120" r="3" fill="#FACC15" />
          <text x="167" y="138" fill="#FACC15" fontSize="11" fontWeight="bold">C</text>

          {/* Object AB Placed Between C and F */}
          <line x1="220" y1="120" x2="220" y2="60" stroke="#22C55E" strokeWidth="3" />
          <polygon points="220,52 215,62 225,62" fill="#22C55E" />
          <text x="215" y="46" fill="#4ADE80" fontSize="11" fontWeight="bold">A (Object)</text>
          <text x="215" y="135" fill="#4ADE80" fontSize="10" fontWeight="bold">B</text>

          {/* Incident Ray 1: Parallel to Principal axis */}
          <line x1="220" y1="60" x2="390" y2="60" stroke="#F43F5E" strokeWidth="2" />
          {/* Arrow */}
          <polygon points="310,60 300,56 300,64" fill="#F43F5E" />

          {/* Reflected Ray 1: Passing through Focus F */}
          <line x1="390" y1="60" x2="60" y2="210" stroke="#F43F5E" strokeWidth="2" strokeDasharray="none" />
          {/* Arrow */}
          <polygon points="230,132 238,126 234,136" fill="#F43F5E" />

          {/* Incident Ray 2: Passing through Focus F to Mirror */}
          <line x1="220" y1="60" x2="385" y2="180" stroke="#A855F7" strokeWidth="2" />
          {/* Arrow */}
          <polygon points="300,120 292,112 298,122" fill="#A855F7" />

          {/* Reflected Ray 2: Parallel to Principal axis */}
          <line x1="385" y1="180" x2="60" y2="180" stroke="#A855F7" strokeWidth="2" />
          {/* Arrow */}
          <polygon points="180,180 190,176 190,184" fill="#A855F7" />

          {/* Image A'B' Formed Beyond C (Inverted & Magnified) */}
          <line x1="110" y1="120" x2="110" y2="180" stroke="#FB923C" strokeWidth="3.5" />
          <polygon points="110,188 105,178 115,178" fill="#FB923C" />
          <text x="100" y="202" fill="#FB923C" fontSize="11" fontWeight="bold">A' (Image)</text>
          <text x="105" y="112" fill="#FB923C" fontSize="10" fontWeight="bold">B'</text>

          {/* Marked Question Point Indicator */}
          <rect x="20" y="20" width="150" height="24" rx="4" fill="#1E293B" stroke="#475569" />
          <text x="28" y="36" fill="#38BDF8" fontSize="10" fontWeight="bold">Object position: Between C and F</text>
        </svg>
      </div>
    );
  }

  /* -------------------------------------------------------------
   * 4. ELECTRIC CIRCUIT SCHEMATICS (Physics AS5 / AS3)
   * ------------------------------------------------------------- */
  function renderCircuitDiagram(variant: string, markedPoint?: string) {
    return (
      <div className="relative w-full max-w-lg mx-auto bg-slate-900 rounded-xl p-3.5 border border-slate-700 shadow-xs flex flex-col items-center">
        <div className="w-full flex items-center justify-between text-[11px] font-bold text-slate-300 mb-2 px-1">
          <span className="flex items-center gap-1.5 text-amber-400">
            <Layers className="w-3.5 h-3.5" />
            <span>Physics Circuit: Resistors & Measuring Instruments</span>
          </span>
          <span className="text-[10px] bg-amber-950 text-amber-300 border border-amber-800 px-2 py-0.5 rounded font-mono">
            Ohm's Law AS5
          </span>
        </div>

        <svg viewBox="0 0 460 220" className="w-full h-auto max-h-[200px] select-none">
          <rect width="460" height="220" fill="#0F172A" rx="8" />

          {/* Top Branch Wires */}
          <line x1="60" y1="60" x2="140" y2="60" stroke="#94A3B8" strokeWidth="2.5" />
          <line x1="220" y1="60" x2="260" y2="60" stroke="#94A3B8" strokeWidth="2.5" />
          <line x1="340" y1="60" x2="400" y2="60" stroke="#94A3B8" strokeWidth="2.5" />

          {/* Resistor R1 (Zig-Zag) */}
          <path d="M 140 60 L 147 45 L 160 75 L 173 45 L 187 75 L 200 45 L 207 75 L 220 60" fill="none" stroke="#F59E0B" strokeWidth="3" />
          <text x="170" y="35" fill="#FDE68A" fontSize="11" fontWeight="bold" textAnchor="middle">R₁ = 4 Ω</text>

          {/* Resistor R2 (Zig-Zag) */}
          <path d="M 260 60 L 267 45 L 280 75 L 293 45 L 307 75 L 320 45 L 327 75 L 340 60" fill="none" stroke="#F59E0B" strokeWidth="3" />
          <text x="295" y="35" fill="#FDE68A" fontSize="11" fontWeight="bold" textAnchor="middle">R₂ = 6 Ω</text>

          {/* Voltmeter Connected in Parallel across R1 and R2 */}
          <line x1="130" y1="60" x2="130" y2="110" stroke="#38BDF8" strokeWidth="1.5" />
          <line x1="130" y1="110" x2="210" y2="110" stroke="#38BDF8" strokeWidth="1.5" />
          <circle cx="240" cy="110" r="16" fill="#0284C7" stroke="#38BDF8" strokeWidth="2" />
          <text x="240" y="115" fill="#FFFFFF" fontSize="12" fontWeight="black" textAnchor="middle">V</text>
          <line x1="270" y1="110" x2="350" y2="110" stroke="#38BDF8" strokeWidth="1.5" />
          <line x1="350" y1="110" x2="350" y2="60" stroke="#38BDF8" strokeWidth="1.5" />
          <text x="240" y="140" fill="#7DD3FC" fontSize="10" textAnchor="middle">Voltmeter (Parallel)</text>

          {/* Right Down Wire */}
          <line x1="400" y1="60" x2="400" y2="180" stroke="#94A3B8" strokeWidth="2.5" />

          {/* Bottom Wires with Battery, Key & Ammeter */}
          <line x1="400" y1="180" x2="320" y2="180" stroke="#94A3B8" strokeWidth="2.5" />

          {/* Ammeter 'A' in Series */}
          <circle cx="280" cy="180" r="16" fill="#10B981" stroke="#34D399" strokeWidth="2" />
          <text x="280" y="185" fill="#FFFFFF" fontSize="12" fontWeight="black" textAnchor="middle">A</text>
          <line x1="264" y1="180" x2="200" y2="180" stroke="#94A3B8" strokeWidth="2.5" />

          {/* Battery DC Source */}
          <line x1="200" y1="165" x2="200" y2="195" stroke="#EF4444" strokeWidth="4" />
          <line x1="190" y1="172" x2="190" y2="188" stroke="#EF4444" strokeWidth="2" />
          <line x1="180" y1="165" x2="180" y2="195" stroke="#EF4444" strokeWidth="4" />
          <line x1="170" y1="172" x2="170" y2="188" stroke="#EF4444" strokeWidth="2" />
          <text x="202" y="160" fill="#EF4444" fontSize="10" fontWeight="bold">+</text>
          <text x="165" y="160" fill="#64748B" fontSize="10" fontWeight="bold">-</text>
          <text x="185" y="210" fill="#F87171" fontSize="10" fontWeight="bold" textAnchor="middle">Battery (12V)</text>

          {/* Plug Key (K) */}
          <line x1="170" y1="180" x2="120" y2="180" stroke="#94A3B8" strokeWidth="2.5" />
          <circle cx="105" cy="180" r="6" fill="#475569" stroke="#94A3B8" strokeWidth="1.5" />
          <circle cx="105" cy="180" r="2" fill="#FFFFFF" />
          <text x="105" y="205" fill="#CBD5E1" fontSize="10" textAnchor="middle">Key (K)</text>

          <line x1="90" y1="180" x2="60" y2="180" stroke="#94A3B8" strokeWidth="2.5" />
          <line x1="60" y1="180" x2="60" y2="60" stroke="#94A3B8" strokeWidth="2.5" />

          {/* Current Flow Arrow */}
          <polygon points="80,60 70,55 70,65" fill="#EF4444" />
          <text x="85" y="52" fill="#EF4444" fontSize="9" fontWeight="bold">I →</text>
        </svg>
      </div>
    );
  }

  /* -------------------------------------------------------------
   * 5. BIOLOGY ANATOMICAL & CELL DIAGRAMS (AS5)
   * ------------------------------------------------------------- */
  function renderBioDiagram(variant: string, markedPoint?: string) {
    return (
      <div className="relative w-full max-w-lg mx-auto bg-emerald-950/40 rounded-xl p-3.5 border border-emerald-800 shadow-xs flex flex-col items-center">
        <div className="w-full flex items-center justify-between text-[11px] font-bold text-emerald-300 mb-2 px-1">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <Layers className="w-3.5 h-3.5" />
            <span>Biology: Human Nephron (Excretory System Structure)</span>
          </span>
          <span className="text-[10px] bg-emerald-900 text-emerald-200 border border-emerald-700 px-2 py-0.5 rounded font-mono">
            Biological Science AS5
          </span>
        </div>

        <svg viewBox="0 0 480 260" className="w-full h-auto max-h-[230px] select-none">
          <rect width="480" height="260" fill="#064E3B" rx="8" opacity="0.6" />

          {/* Bowman's Capsule (Cup-shaped structure) */}
          <path
            d="M 60 70 C 40 90, 40 130, 80 140 C 110 145, 120 120, 110 90 C 100 65, 75 60, 60 70 Z"
            fill="#FEF08A"
            stroke="#CA8A04"
            strokeWidth="2.5"
          />

          {/* Glomerulus (Capillary network inside cup) */}
          <path
            d="M 65 85 C 75 75, 95 80, 85 95 C 75 110, 95 115, 80 120 C 70 110, 60 95, 65 85 Z"
            fill="#EF4444"
            stroke="#B91C1C"
            strokeWidth="2"
          />
          {/* Afferent & Efferent arterioles */}
          <path d="M 30 65 L 68 85" stroke="#DC2626" strokeWidth="3" />
          <text x="15" y="55" fill="#FCA5A5" fontSize="8">Afferent arteriole</text>
          
          <path d="M 30 115 L 68 100" stroke="#DC2626" strokeWidth="2" />
          <text x="10" y="130" fill="#FCA5A5" fontSize="8">Efferent arteriole</text>

          {/* Proximal Convoluted Tubule (PCT) */}
          <path
            d="M 105 135 Q 140 160 160 120 T 190 140"
            fill="none"
            stroke="#FDE047"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <text x="145" y="105" fill="#FEF08A" fontSize="9" fontWeight="bold">PCT</text>

          {/* Henle's Loop (Hairpin U-turn) */}
          {/* Descending limb */}
          <path
            d="M 190 140 L 190 220 C 190 240, 230 240, 230 220 L 230 130"
            fill="none"
            stroke="#FDE047"
            strokeWidth="5"
          />
          <text x="150" y="195" fill="#E2E8F0" fontSize="8">Descending limb</text>
          <text x="240" y="195" fill="#E2E8F0" fontSize="8">Ascending limb</text>
          <text x="185" y="250" fill="#FDE047" fontSize="9" fontWeight="bold">Henle's Loop</text>

          {/* Distal Convoluted Tubule (DCT) */}
          <path
            d="M 230 130 Q 260 100 290 130 T 340 120"
            fill="none"
            stroke="#FDE047"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <text x="285" y="100" fill="#FEF08A" fontSize="9" fontWeight="bold">DCT</text>

          {/* Collecting Duct (Straight main tube) */}
          <path
            d="M 340 40 L 340 240"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <text x="355" y="60" fill="#FCD34D" fontSize="10" fontWeight="bold">Collecting Duct</text>
          <text x="355" y="240" fill="#FCD34D" fontSize="8">To Renal Pelvis</text>

          {/* QUESTION POINTER 'X' (Targeting Bowman's Capsule / Glomerulus / Henle's Loop) */}
          <g>
            <circle cx="85" cy="100" r="14" fill="#EF4444" fillOpacity="0.3" className="animate-ping" />
            <circle cx="85" cy="100" r="8" fill="#DC2626" stroke="#FFFFFF" strokeWidth="2" />
            <text x="85" y="104" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">X</text>
            <rect x="75" y="10" width="135" height="22" rx="4" fill="#1E293B" stroke="#475569" />
            <text x="80" y="25" fill="#F8FAFC" fontSize="9" fontWeight="bold">Identify the part marked 'X'</text>
          </g>
        </svg>
      </div>
    );
  }

  /* -------------------------------------------------------------
   * 6. MATHEMATICS GEOMETRY & GRAPHS (AS5)
   * ------------------------------------------------------------- */
  function renderMathGeometry(variant: string, markedPoint?: string) {
    return (
      <div className="relative w-full max-w-lg mx-auto bg-slate-900 rounded-xl p-3.5 border border-slate-700 shadow-xs flex flex-col items-center">
        <div className="w-full flex items-center justify-between text-[11px] font-bold text-slate-300 mb-2 px-1">
          <span className="flex items-center gap-1.5 text-indigo-400">
            <Layers className="w-3.5 h-3.5" />
            <span>Mathematics: Circle Tangents & External Point Geometry</span>
          </span>
          <span className="text-[10px] bg-indigo-950 text-indigo-300 border border-indigo-800 px-2 py-0.5 rounded font-mono">
            Geometry AS5
          </span>
        </div>

        <svg viewBox="0 0 460 220" className="w-full h-auto max-h-[200px] select-none">
          <rect width="460" height="220" fill="#0F172A" rx="8" />

          {/* Center Point O and Circle */}
          <circle cx="300" cy="110" r="65" fill="#1E293B" stroke="#818CF8" strokeWidth="2.5" />
          <circle cx="300" cy="110" r="3.5" fill="#FACC15" />
          <text x="308" y="115" fill="#FDE047" fontSize="12" fontWeight="bold">O</text>

          {/* External Point P */}
          <circle cx="90" cy="110" r="4" fill="#F43F5E" />
          <text x="70" y="115" fill="#FDA4AF" fontSize="13" fontWeight="bold">P</text>

          {/* Tangent Point A (Top) */}
          <circle cx="260" cy="55" r="3.5" fill="#38BDF8" />
          <text x="255" y="42" fill="#7DD3FC" fontSize="12" fontWeight="bold">A</text>

          {/* Tangent Point B (Bottom) */}
          <circle cx="260" cy="165" r="3.5" fill="#38BDF8" />
          <text x="255" y="185" fill="#7DD3FC" fontSize="12" fontWeight="bold">B</text>

          {/* Tangent Line PA */}
          <line x1="90" y1="110" x2="260" y2="55" stroke="#F43F5E" strokeWidth="2.5" />
          
          {/* Tangent Line PB */}
          <line x1="90" y1="110" x2="260" y2="165" stroke="#F43F5E" strokeWidth="2.5" />

          {/* Radii OA and OB */}
          <line x1="300" y1="110" x2="260" y2="55" stroke="#FACC15" strokeWidth="1.8" strokeDasharray="4 2" />
          <line x1="300" y1="110" x2="260" y2="165" stroke="#FACC15" strokeWidth="1.8" strokeDasharray="4 2" />

          {/* Line OP */}
          <line x1="90" y1="110" x2="300" y2="110" stroke="#64748B" strokeWidth="1.5" strokeDasharray="5 3" />

          {/* Right Angle Indicators at A and B (Radius is perp to tangent) */}
          <rect x="252" y="62" width="8" height="8" fill="none" stroke="#38BDF8" strokeWidth="1.2" transform="rotate(20 252 62)" />
          <rect x="252" y="152" width="8" height="8" fill="none" stroke="#38BDF8" strokeWidth="1.2" transform="rotate(-20 252 152)" />

          {/* Angle at P: 60° */}
          <path d="M 125 99 A 35 35 0 0 1 125 121" fill="none" stroke="#F43F5E" strokeWidth="1.5" />
          <text x="135" y="114" fill="#FDA4AF" fontSize="10" fontWeight="bold">∠APB = 60°</text>

          {/* Angle at Center O */}
          <path d="M 280 82 A 30 30 0 0 1 280 138" fill="none" stroke="#FDE047" strokeWidth="1.5" />
          <text x="240" y="115" fill="#FEF08A" fontSize="11" fontWeight="bold">∠AOB = ?</text>
        </svg>
      </div>
    );
  }

  /* -------------------------------------------------------------
   * 7. CHEMISTRY EXPERIMENTAL APPARATUS (AS3)
   * ------------------------------------------------------------- */
  function renderChemistrySetup(variant: string, markedPoint?: string) {
    return (
      <div className="relative w-full max-w-lg mx-auto bg-slate-900 rounded-xl p-3.5 border border-slate-700 shadow-xs flex flex-col items-center">
        <div className="w-full flex items-center justify-between text-[11px] font-bold text-slate-300 mb-2 px-1">
          <span className="flex items-center gap-1.5 text-amber-400">
            <Layers className="w-3.5 h-3.5" />
            <span>Chemistry: Reaction of Zinc with Dilute H₂SO₄ & Gas Evolution</span>
          </span>
          <span className="text-[10px] bg-amber-950 text-amber-300 border border-amber-800 px-2 py-0.5 rounded font-mono">
            Experimentation AS3
          </span>
        </div>

        <svg viewBox="0 0 460 220" className="w-full h-auto max-h-[200px] select-none">
          <rect width="460" height="220" fill="#0F172A" rx="8" />

          {/* Retort Stand */}
          <line x1="80" y1="200" x2="80" y2="40" stroke="#64748B" strokeWidth="4" />
          <line x1="50" y1="200" x2="130" y2="200" stroke="#64748B" strokeWidth="5" />
          <line x1="80" y1="90" x2="110" y2="90" stroke="#64748B" strokeWidth="3" />

          {/* Test Tube */}
          <rect x="110" y="60" width="24" height="90" rx="12" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />
          {/* Dilute H2SO4 liquid */}
          <path d="M 111 110 L 133 110 L 133 138 C 133 145, 111 145, 111 138 Z" fill="#0284C7" opacity="0.6" />
          {/* Zinc Granules */}
          <circle cx="118" cy="140" r="3" fill="#94A3B8" />
          <circle cx="125" cy="142" r="3" fill="#94A3B8" />
          <circle cx="122" cy="136" r="2.5" fill="#94A3B8" />
          <text x="140" y="145" fill="#CBD5E1" fontSize="9">Zn granules</text>

          {/* Rubber Cork */}
          <rect x="110" y="55" width="24" height="12" fill="#78350F" />

          {/* Glass Delivery Tube */}
          <path d="M 122 65 L 122 35 L 260 35 L 260 140" fill="none" stroke="#38BDF8" strokeWidth="3" />

          {/* Soap Solution Trough */}
          <rect x="230" y="130" width="80" height="50" rx="4" fill="#0369A1" stroke="#38BDF8" strokeWidth="1.5" opacity="0.5" />
          <text x="240" y="170" fill="#BAE6FD" fontSize="8">Soap Solution</text>

          {/* Soap Bubbles Filled with Gas Rising */}
          <circle cx="280" cy="100" r="8" fill="none" stroke="#FDE047" strokeWidth="1.5" />
          <circle cx="295" cy="70" r="10" fill="none" stroke="#FDE047" strokeWidth="1.5" />
          <circle cx="330" cy="45" r="12" fill="none" stroke="#FDE047" strokeWidth="1.5" />

          {/* Burning Candle testing the bubble */}
          <rect x="360" y="60" width="10" height="40" fill="#F8FAFC" />
          {/* Flame */}
          <path d="M 365 60 Q 360 45 365 35 Q 370 45 365 60 Z" fill="#EF4444" />
          <circle cx="365" cy="48" r="4" fill="#F59E0B" />

          {/* POP Sound Burst Effect */}
          <text x="380" y="45" fill="#F87171" fontSize="13" fontWeight="black">"POP!"</text>
          
          {/* Gas Label Question */}
          <rect x="145" y="15" width="105" height="18" rx="3" fill="#1E293B" stroke="#475569" />
          <text x="150" y="27" fill="#FDE047" fontSize="9" fontWeight="bold">Gas 'X' Released</text>
        </svg>
      </div>
    );
  }

  /* -------------------------------------------------------------
   * 8. DATA TABLE (Social Studies / Science Information Skills AS4)
   * ------------------------------------------------------------- */
  function renderDataTable(headers?: string[], rows?: string[][]) {
    if (!headers || !rows) return null;

    return (
      <div className="w-full max-w-lg mx-auto bg-white rounded-xl p-3 border border-slate-200 shadow-xs overflow-x-auto">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-2">
          <FileText className="w-4 h-4 text-blue-600" />
          <span>Information Skills (Read the given data & answer)</span>
        </div>
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-300">
              {headers.map((h, i) => (
                <th key={i} className="p-2 font-bold text-slate-800 border-r border-slate-200 last:border-r-0">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rIdx) => (
              <tr key={rIdx} className={`border-b border-slate-200 ${rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}`}>
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className="p-2 text-slate-700 font-medium border-r border-slate-200 last:border-r-0">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="w-full my-3">
      {renderDiagramContent()}
    </div>
  );
}
