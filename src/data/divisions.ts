import { DivisionInfo, DivisionName } from '../types';

export const DIVISIONS: Record<DivisionName, DivisionInfo> = {
  Dhaka: {
    name: 'Dhaka',
    bnName: 'ঢাকা',
    color: '#0284c7', // Sky blue / Blue
    accentColor: '#38bdf8',
    districtCount: 13,
    description: 'The political, economic, and cultural nerve center of Bangladesh, home to centuries of Mughal and colonial heritage.'
  },
  Chattogram: {
    name: 'Chattogram',
    bnName: 'চট্টগ্রাম',
    color: '#059669', // Emerald Green
    accentColor: '#34d399',
    districtCount: 11,
    description: 'Vast port gateway, rolling blue hills of the Chittagong Hill Tracts, and the world’s longest natural sandy sea beach.'
  },
  Sylhet: {
    name: 'Sylhet',
    bnName: 'সিলেট',
    color: '#10b981', // Forest Teal
    accentColor: '#6ee7b7',
    districtCount: 4,
    description: 'Spiritual sanctuary of Hazrat Shah Jalal, rolling emerald tea gardens, freshwater swamp forests, and pristine haors.'
  },
  Rajshahi: {
    name: 'Rajshahi',
    bnName: 'রাজশাহী',
    color: '#f59e0b', // Amber / Gold
    accentColor: '#fbbf24',
    districtCount: 8,
    description: 'The Silk and Mango empire of Bengal, historic Varendra territory, terracotta temples, and the ancient city of Mahasthangarh.'
  },
  Khulna: {
    name: 'Khulna',
    bnName: 'খুলনা',
    color: '#0d9488', // Deep Teal
    accentColor: '#2dd4bf',
    districtCount: 10,
    description: 'Gateway to the UNESCO World Heritage Sundarbans mangrove forest, Royal Bengal Tigers, and historic Sixty Dome Mosque.'
  },
  Barishal: {
    name: 'Barishal',
    bnName: 'বরিশাল',
    color: '#6366f1', // Indigo
    accentColor: '#818cf8',
    districtCount: 6,
    description: 'The Venice of Bengal, famed for romantic labyrinthine rivers, floating guava markets, and picturesque Kuakata beach.'
  },
  Rangpur: {
    name: 'Rangpur',
    bnName: 'রংপুর',
    color: '#ea580c', // Warm Terracotta / Orange
    accentColor: '#fb923c',
    districtCount: 8,
    description: 'Northern frontier with views of the snow-peaked Himalayas, Kantaji terracotta temple, and Haribhanga mangoes.'
  },
  Mymensingh: {
    name: 'Mymensingh',
    bnName: 'ময়মনসিংহ',
    color: '#8b5cf6', // Violet
    accentColor: '#a78bfa',
    districtCount: 4,
    description: 'Fabled homeland of Mymensingh Geetika folk ballads, Garo green border hills, Birishiri white clay, and Muktagacha Monda.'
  }
};

export const DIVISION_LIST: DivisionInfo[] = Object.values(DIVISIONS);
