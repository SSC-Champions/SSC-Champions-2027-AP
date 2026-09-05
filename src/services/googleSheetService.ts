import { SchoolInfo } from '../types';

export interface SheetSyncResult {
  success: boolean;
  schools: SchoolInfo[];
  count: number;
  sheetId?: string;
  sheetName?: string;
  error?: string;
  districtsCount?: number;
  mandalsCount?: number;
}

/**
 * Extracts the Google Sheet ID from a full Google Sheets URL or raw ID string.
 */
export function extractSheetId(input: string): string {
  const trimmed = input.trim();
  // Regex to match Google Sheet ID in URL: /spreadsheets/d/([a-zA-Z0-9-_]+)
  const match = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (match && match[1]) {
    return match[1];
  }
  // If it's already an ID (alphanumeric with hyphens/underscores, no slashes)
  if (/^[a-zA-Z0-9-_]+$/.test(trimmed)) {
    return trimmed;
  }
  return trimmed;
}

/**
 * Parses raw CSV lines into SchoolInfo objects, properly handling quoted multiline fields.
 * Expects headers: UDISE_Code, School_Name, District_Name, Block_Name, Category, Management
 */
export function parseSchoolsCsv(csvText: string): SchoolInfo[] {
  if (!csvText || !csvText.trim()) return [];

  const rows = parseFullCsv(csvText);
  if (rows.length <= 1) return [];

  // Parse header line to determine column indices
  const headers = rows[0].map(h => h.trim().toLowerCase());

  let udiseIdx = headers.findIndex(h => h.includes('udise'));
  let nameIdx = headers.findIndex(h => h.includes('school_name') || h === 'school name' || h.includes('school'));
  let distIdx = headers.findIndex(h => h.includes('district'));
  let mandalIdx = headers.findIndex(h => h.includes('block') || h.includes('mandal'));
  let catIdx = headers.findIndex(h => h.includes('category'));
  let mgmtIdx = headers.findIndex(h => h.includes('management'));

  // Defaults if exact headers aren't matched
  if (udiseIdx === -1) udiseIdx = 0;
  if (nameIdx === -1) nameIdx = 1;
  if (distIdx === -1) distIdx = 2;
  if (mandalIdx === -1) mandalIdx = 3;
  if (catIdx === -1) catIdx = 4;
  if (mgmtIdx === -1) mgmtIdx = 5;

  const results: SchoolInfo[] = [];
  const seenUdise = new Set<string>();

  for (let i = 1; i < rows.length; i++) {
    const cols = rows[i];
    const udise = (cols[udiseIdx] || '').replace(/^"|"$/g, '').trim();
    const rawName = (cols[nameIdx] || '').replace(/^"|"$/g, '').replace(/\r?\n+/g, ' ').trim();
    const district = (cols[distIdx] || '').replace(/^"|"$/g, '').trim();
    const mandal = (cols[mandalIdx] || '').replace(/^"|"$/g, '').trim();
    const category = (cols[catIdx] || '').replace(/^"|"$/g, '').trim() || 'Secondary';
    const management = (cols[mgmtIdx] || '').replace(/^"|"$/g, '').trim() || 'Govt/ZPP';

    // Validate minimum requirements
    if (udise && rawName && district && !seenUdise.has(udise)) {
      seenUdise.add(udise);
      results.push({
        udiseCode: udise,
        schoolName: rawName,
        district: district.toUpperCase(),
        mandal: mandal.toUpperCase(),
        category,
        management
      });
    }
  }

  return results;
}

/**
 * Parses entire CSV string with full quote and newline awareness.
 */
function parseFullCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let entry = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      if (inQuotes && text[i + 1] === '"') {
        entry += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      row.push(entry.trim());
      entry = '';
    } else if ((c === '\r' || c === '\n') && !inQuotes) {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(entry.trim());
      if (row.length > 0 && row.some(col => col.length > 0)) {
        rows.push(row);
      }
      row = [];
      entry = '';
    } else {
      entry += c;
    }
  }
  if (entry.length > 0 || row.length > 0) {
    row.push(entry.trim());
    rows.push(row);
  }
  return rows;
}

/**
 * Fetches the "Master" sheet from a given Google Sheet ID/URL as CSV.
 * Uses Google Visualization query API which provides public CORS-enabled CSV export.
 */
export async function fetchSchoolsFromGoogleSheet(
  sheetIdOrUrl: string, 
  sheetName: string = 'Master'
): Promise<SheetSyncResult> {
  const sheetId = extractSheetId(sheetIdOrUrl);
  if (!sheetId) {
    return {
      success: false,
      schools: [],
      count: 0,
      error: 'Invalid Google Sheet ID or URL provided.'
    };
  }

  // Google Sheets gviz CSV endpoint (works with public "Anyone with the link can view" sheets)
  const gvizUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
  // Fallback export URL
  const exportUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&sheet=${encodeURIComponent(sheetName)}`;

  try {
    let response: Response;
    try {
      response = await fetch(gvizUrl);
    } catch {
      response = await fetch(exportUrl);
    }

    if (!response.ok) {
      throw new Error(`Google Sheets responded with HTTP status ${response.status}. Please ensure the sheet is shared as "Anyone with the link can view".`);
    }

    const csvText = await response.text();
    
    // Check if Google returned an HTML login or error page instead of CSV
    if (csvText.includes('<!DOCTYPE html>') || csvText.includes('<html')) {
      throw new Error('Could not access sheet. Please verify the Google Sheet is shared with "Anyone on the internet with this link can view" permissions.');
    }

    const schools = parseSchoolsCsv(csvText);
    if (schools.length === 0) {
      throw new Error(`Connected to sheet, but found 0 valid school rows in tab "${sheetName}". Please check column headers (UDISE_Code, School_Name, District_Name, Block_Name).`);
    }

    const districts = new Set(schools.map(s => s.district));
    const mandals = new Set(schools.map(s => `${s.district}-${s.mandal}`));

    // Persist to local storage
    saveSyncedSchools(schools);

    return {
      success: true,
      schools,
      count: schools.length,
      sheetId,
      sheetName,
      districtsCount: districts.size,
      mandalsCount: mandals.size
    };
  } catch (err: any) {
    return {
      success: false,
      schools: [],
      count: 0,
      sheetId,
      sheetName,
      error: err?.message || 'Failed to fetch schools from Google Sheet.'
    };
  }
}

const STORAGE_KEY = 'ap_schools_master_custom';
const STORAGE_META_KEY = 'ap_schools_master_meta';

export function saveSyncedSchools(schools: SchoolInfo[], meta?: { sheetId?: string; source?: string }): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(schools));
    if (meta) {
      localStorage.setItem(STORAGE_META_KEY, JSON.stringify({
        ...meta,
        syncedAt: new Date().toISOString(),
        count: schools.length
      }));
    } else {
      localStorage.setItem(STORAGE_META_KEY, JSON.stringify({
        source: 'Google Sheet (Master)',
        syncedAt: new Date().toISOString(),
        count: schools.length
      }));
    }
  } catch (e) {
    console.error('Failed to save schools to localStorage:', e);
  }
}

export function loadSyncedSchools(): SchoolInfo[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (e) {
    console.error('Failed to load schools from localStorage:', e);
  }
  return null;
}

export function getSyncedSchoolsMeta(): { source: string; syncedAt: string; count: number; sheetId?: string } | null {
  try {
    const raw = localStorage.getItem(STORAGE_META_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return null;
}

export function clearSyncedSchools(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_META_KEY);
  } catch {
    // ignore
  }
}
