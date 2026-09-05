import { SchoolInfo } from '../types';
import allSchoolsRaw from './allSchoolsData.json';
import { loadSyncedSchools } from '../services/googleSheetService';

export const AP_SCHOOLS_DATA: SchoolInfo[] = allSchoolsRaw as SchoolInfo[];

// Active schools cache (prepopulated with the full 13,822 master schools, merged with any user updates)
let _activeSchools: SchoolInfo[] = (() => {
  const synced = typeof window !== 'undefined' ? loadSyncedSchools() : null;
  if (synced && synced.length > 0) {
    return synced;
  }
  return AP_SCHOOLS_DATA;
})();

export function getActiveSchools(): SchoolInfo[] {
  let currentSchools = AP_SCHOOLS_DATA;
  if (typeof window !== 'undefined') {
    const synced = loadSyncedSchools();
    if (synced && synced.length > 0) {
      currentSchools = synced;
    }
  }
  _activeSchools = currentSchools.filter(s => s.district && s.district.trim() !== '');
  return _activeSchools;
}

export function refreshActiveSchools(): SchoolInfo[] {
  return getActiveSchools();
}

export function searchSchools(query: string, district?: string, mandal?: string): SchoolInfo[] {
  const cleanQ = query.trim().toLowerCase();
  const schools = getActiveSchools();
  return schools.filter((s) => {
    const matchesDistrict = !district || district === 'ALL' || s.district.toLowerCase() === district.toLowerCase();
    if (!matchesDistrict) return false;
    
    const matchesMandal = !mandal || mandal === 'ALL' || s.mandal.toLowerCase() === mandal.toLowerCase();
    if (!matchesMandal) return false;

    if (!cleanQ) return true;
    return (
      s.udiseCode.includes(cleanQ) ||
      s.schoolName.toLowerCase().includes(cleanQ) ||
      s.mandal.toLowerCase().includes(cleanQ) ||
      s.district.toLowerCase().includes(cleanQ) ||
      s.management.toLowerCase().includes(cleanQ)
    );
  });
}

export function getSchoolByUDISE(udiseCode: string): SchoolInfo | null {
  const cleanCode = udiseCode.trim();
  const schools = getActiveSchools();
  return schools.find((s) => s.udiseCode === cleanCode) || null;
}

export const AP_DISTRICTS = Array.from(
  new Set(
    AP_SCHOOLS_DATA
      .map((s) => s.district)
      .filter((d) => d && d.trim() !== '')
  )
).sort();

export function getAllDistricts(): string[] {
  const schools = getActiveSchools();
  return Array.from(new Set(schools.map((s) => s.district))).sort();
}

export function getMandalsForDistrict(districtName: string): string[] {
  if (!districtName || districtName === 'ALL') return [];
  const schools = getActiveSchools();
  const mandals = new Set<string>();
  schools.forEach((s) => {
    if (s.district.toLowerCase() === districtName.toLowerCase()) {
      if (s.mandal && s.mandal.trim() !== '') {
        mandals.add(s.mandal);
      }
    }
  });
  return Array.from(mandals).sort();
}
