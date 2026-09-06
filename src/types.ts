export type DivisionName = 
  | 'Dhaka'
  | 'Chattogram'
  | 'Sylhet'
  | 'Rajshahi'
  | 'Khulna'
  | 'Barishal'
  | 'Rangpur'
  | 'Mymensingh';

export interface TouristSpot {
  name: string;
  bnName: string;
  desc: string;
  image?: string;
  tag?: string;
}

export interface FamousFood {
  name: string;
  bnName: string;
  desc: string;
  image?: string;
  highlight?: string;
}

export interface CultureHeritage {
  history: string;
  traditions: string;
  festivals: string[];
  summaryBn: string;
}

export interface District {
  id: string; // e.g. "dhaka"
  name: string; // English
  bnName: string; // বাংলা
  geoName: string; // Name in GeoJSON ADM2_EN
  division: DivisionName;
  divisionBn: string;
  lat: number;
  lng: number;
  areaKm2: number;
  tagline: string;
  taglineBn: string;
  touristSpots: TouristSpot[];
  famousFoods: FamousFood[];
  culture: CultureHeritage;
  coverImage: string;
  quickFacts: {
    nicknames?: string[];
    famousFor: string;
    mustTryDish: string;
    rivers?: string[];
  };
}

export interface DivisionInfo {
  name: DivisionName;
  bnName: string;
  color: string;
  accentColor: string;
  districtCount: number;
  description: string;
}

export type ActiveTab = 'spots' | 'food' | 'culture' | 'stats';
export type ViewMode = 'vector' | 'leaflet';
export type LanguageMode = 'en' | 'bn' | 'both';
