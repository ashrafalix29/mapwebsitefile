import { District, DivisionName } from '../types';
import rawDistricts from './districts.json';

export const DISTRICTS: District[] = rawDistricts as District[];

// Lookup map by ID (e.g. "dhaka")
export const DISTRICT_MAP = new Map<string, District>(
  DISTRICTS.map((d) => [d.id, d])
);

// Lookup map by GeoJSON ADM2_EN name
export const GEO_NAME_MAP = new Map<string, District>(
  DISTRICTS.map((d) => [d.geoName.toLowerCase(), d])
);

// Helper to get districts by division
export function getDistrictsByDivision(division: DivisionName | 'All'): District[] {
  if (division === 'All') return DISTRICTS;
  return DISTRICTS.filter((d) => d.division === division);
}

// Helper to search districts
export function searchDistricts(query: string): District[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase().trim();
  return DISTRICTS.filter((d) => {
    return (
      d.name.toLowerCase().includes(q) ||
      d.bnName.includes(q) ||
      d.division.toLowerCase().includes(q) ||
      d.divisionBn.includes(q) ||
      d.touristSpots.some((s) => s.name.toLowerCase().includes(q) || s.bnName.includes(q)) ||
      d.famousFoods.some((f) => f.name.toLowerCase().includes(q) || f.bnName.includes(q))
    );
  });
}
