// Translation and Localization Helper for Explore Bangladesh
// Supports 'en' (100% English), 'bn' (100% Bengali), and 'both' (Bilingual combined)

import { LanguageMode, DivisionName } from '../types';

export const toBengaliNumber = (num: number | string): string => {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/\d/g, (d) => bengaliDigits[Number(d)] ?? d);
};

export interface LocalizedStrings {
  appTitle: string;
  appSubtitle: string;
  districtsCountBadge: string;
  searchPlaceholder: string;
  surpriseMeBtn: string;
  compareBtn: string;
  wishlistBtn: string;
  catalogBtn: string;
  allDistrictsFilter: string;
  vectorMode: string;
  leafletMode: string;
  divisionsLegend: string;
  mapHint: string;
  clickToInspect: string;
  tabSpots: string;
  tabFoods: string;
  tabCulture: string;
  tabFacts: string;
  spotsTab: (count: number) => string;
  foodsTab: (count: number) => string;
  cultureTab: string;
  factsTab: string;
  spotsSubtitle: string;
  openGoogleMaps: string;
  foodsSubtitle: string;
  signatureDish: string;
  signatureCulinary: string;
  mustTryLabel: string;
  cultureOverview: string;
  historicalEvolution: string;
  livingTraditions: string;
  annualFestivals: string;
  geoDivisionLabel: string;
  totalAreaLabel: string;
  coordinatesLabel: string;
  nicknamesLabel: string;
  famousForLabel: string;
  wikipediaLink: string;
  visitedBadge: string;
  markVisited: string;
  wishlistBadge: string;
  addWishlist: string;
  shareBtn: string;
  copiedNotice: string;
  pronounceTitle: string;
  closeSidebar: string;
  prevDistrict: string;
  nextDistrict: string;
  compareTitle: string;
  compareSubtitle: string;
  wishlistTitle: string;
  wishlistSubtitle: string;
  catalogTitle: string;
  catalogSubtitle: string;
  searchInCatalog: string;
  sortByLabel: string;
  sortByName: string;
  sortByArea: string;
  sortByDivision: string;
}

export const UI_TEXTS: Record<LanguageMode, LocalizedStrings> = {
  en: {
    appTitle: 'Explore Bangladesh',
    appSubtitle: '64 Districts Interactive Map & Cultural Atlas',
    districtsCountBadge: '64 Districts',
    searchPlaceholder: 'Search district, food, spot...',
    surpriseMeBtn: 'Surprise Me!',
    compareBtn: 'Compare',
    wishlistBtn: 'Wishlist',
    catalogBtn: 'Browse All 64 Districts',
    allDistrictsFilter: 'All 64 Districts',
    vectorMode: 'Vector',
    leafletMode: 'Leaflet',
    divisionsLegend: 'Divisions:',
    mapHint: 'Click any district to explore spots, food & culture!',
    clickToInspect: 'Click to inspect',
    tabSpots: 'Spots',
    tabFoods: 'Foods',
    tabCulture: 'Culture',
    tabFacts: 'Facts',
    spotsTab: (count) => `Spots (${count})`,
    foodsTab: (count) => `Foods (${count})`,
    cultureTab: 'Culture',
    factsTab: 'Quick Facts',
    spotsSubtitle: 'Iconic landmarks, archaeological sites & nature spots',
    openGoogleMaps: 'Open in Google Maps',
    foodsSubtitle: 'Authentic culinary delicacies & traditional recipes',
    signatureDish: 'Signature Dish',
    signatureCulinary: 'Signature Culinary Hallmark',
    mustTryLabel: 'Must Try:',
    cultureOverview: 'Cultural Heritage & Identity',
    historicalEvolution: 'Historical Evolution',
    livingTraditions: 'Living Traditions & Folklore',
    annualFestivals: 'Annual Festivals & Melas',
    geoDivisionLabel: 'Geographic Division',
    totalAreaLabel: 'Total Area',
    coordinatesLabel: 'Coordinates',
    nicknamesLabel: 'Known As / Nicknames',
    famousForLabel: 'Famous For',
    wikipediaLink: 'Read Full History on Wikipedia',
    visitedBadge: 'Visited',
    markVisited: 'Mark as Visited',
    wishlistBadge: 'Saved',
    addWishlist: 'Add to Wishlist',
    shareBtn: 'Share',
    copiedNotice: 'Copied!',
    pronounceTitle: 'Pronounce district name',
    closeSidebar: 'Close details',
    prevDistrict: 'Previous District',
    nextDistrict: 'Next District',
    compareTitle: 'Compare Districts Side-by-Side',
    compareSubtitle: 'Explore geography, tourist spots, culinary staples, and heritage',
    wishlistTitle: 'Explorer Progress & Bucket List',
    wishlistSubtitle: 'Track your journey across all 64 districts of Bangladesh',
    catalogTitle: 'Explore All 64 Districts',
    catalogSubtitle: 'Browse complete catalog with quick division filters and stats',
    searchInCatalog: 'Search districts by name, food, or landmark...',
    sortByLabel: 'Sort by:',
    sortByName: 'Alphabetical',
    sortByArea: 'Largest Area',
    sortByDivision: 'Division'
  },
  bn: {
    appTitle: 'বাংলাদেশ ভ্রমণ',
    appSubtitle: '৬৪ জেলার মানচিত্র ও সমৃদ্ধ ঐতিহ্যকোষ',
    districtsCountBadge: '৬৪ জেলা',
    searchPlaceholder: 'জেলা, খাবার, দর্শনীয় স্থান খুঁজুন...',
    surpriseMeBtn: 'অজানা জেলা!',
    compareBtn: 'তুলনা',
    wishlistBtn: 'সংরক্ষিত',
    catalogBtn: 'সকল ৬৪ জেলা দেখুন',
    allDistrictsFilter: 'সকল ৬৪ জেলা',
    vectorMode: 'ভেক্টর',
    leafletMode: 'ম্যাপ',
    divisionsLegend: 'বিভাগসমূহ:',
    mapHint: 'দর্শনীয় স্থান, খাবার ও ঐতিহ্য জানতে যেকোনো জেলায় ক্লিক করুন!',
    clickToInspect: 'বিস্তারিত দেখতে ক্লিক করুন',
    tabSpots: 'দর্শনীয় স্থান',
    tabFoods: 'খাবার',
    tabCulture: 'ঐতিহ্য',
    tabFacts: 'তথ্যাবলি',
    spotsTab: (count) => `দর্শনীয় স্থান (${toBengaliNumber(count)})`,
    foodsTab: (count) => `বিখ্যাত খাবার (${toBengaliNumber(count)})`,
    cultureTab: 'ঐতিহ্য ও সংস্কৃতি',
    factsTab: 'এক নজরে তথ্য',
    spotsSubtitle: 'ঐতিহাসিক নিদর্শন, প্রত্নতাত্ত্বিক স্থান ও প্রকৃতির সৌন্দর্য',
    openGoogleMaps: 'গুগল ম্যাপে অবস্থান দেখুন',
    foodsSubtitle: 'ঐতিহ্যবাহী মুখরোচক খাবার ও আঞ্চলিক রেসিপি',
    signatureDish: 'বিশেষ খাবার',
    signatureCulinary: 'প্রধান ঐতিহ্যবাহী খাবার',
    mustTryLabel: 'অবশ্যই চেখে দেখুন:',
    cultureOverview: 'ঐতিহ্য ও সাংস্কৃতিক পরিচয়',
    historicalEvolution: 'ঐতিহাসিক বিবর্তন',
    livingTraditions: 'লোকসংস্কৃতি ও জীবনাচার',
    annualFestivals: 'বার্ষিক মেলা ও উৎসব',
    geoDivisionLabel: 'ভৌগোলিক বিভাগ',
    totalAreaLabel: 'মোট আয়তন',
    coordinatesLabel: 'অক্ষাংশ ও দ্রাঘিমাংশ',
    nicknamesLabel: 'পরিচিত উপনাম',
    famousForLabel: 'যার জন্য বিখ্যাত',
    wikipediaLink: 'উইকিপিডিয়ায় বিস্তারিত ইতিহাস পড়ুন',
    visitedBadge: 'ভ্রমণ সম্পন্ন',
    markVisited: 'ভ্রমণ তালিকায় যোগ করুন',
    wishlistBadge: 'সংরক্ষিত',
    addWishlist: 'পছন্দের তালিকায় রাখুন',
    shareBtn: 'শেয়ার',
    copiedNotice: 'কপি হয়েছে!',
    pronounceTitle: 'নাম উচ্চারণ শুনুন',
    closeSidebar: 'বন্ধ করুন',
    prevDistrict: 'পূর্ববর্তী জেলা',
    nextDistrict: 'পরবর্তী জেলা',
    compareTitle: 'পাশাপাশি দুটি জেলার তুলনা',
    compareSubtitle: 'ভৌগোলিক তথ্য, দর্শনীয় স্থান, বিখ্যাত খাবার ও ঐতিহ্যের তুলনা করুন',
    wishlistTitle: 'ভ্রমণ অগ্রগতি ও ভ্রমণ ডায়েরি',
    wishlistSubtitle: 'বাংলাদেশের ৬৪ জেলায় আপনার ভ্রমণের অগ্রগতি ট্র্যাক করুন',
    catalogTitle: 'সকল ৬৪ জেলার তালিকা',
    catalogSubtitle: 'বিভাগীয় ফিল্টার ও বিস্তারিত তথ্যসহ সকল জেলা ব্রাউজ করুন',
    searchInCatalog: 'নাম, খাবার বা বিখ্যাত স্থান লিখে খুঁজুন...',
    sortByLabel: 'সাজান:',
    sortByName: 'বর্ণানুক্রমিক',
    sortByArea: 'আয়তন অনুসারে',
    sortByDivision: 'বিভাগ অনুসারে'
  },
  both: {
    appTitle: 'Explore BD • বাংলাদেশ',
    appSubtitle: '64 Districts Interactive Map (৬৪ জেলা মানচিত্র)',
    districtsCountBadge: '64 Districts (৬৪ জেলা)',
    searchPlaceholder: 'Search district (জেলা বা খাবার খুঁজুন)...',
    surpriseMeBtn: 'Surprise (অজানা)',
    compareBtn: 'Compare (তুলনা)',
    wishlistBtn: 'Wishlist (সংরক্ষিত)',
    catalogBtn: 'All Districts (সকল জেলা)',
    allDistrictsFilter: 'All (সকল জেলা)',
    vectorMode: 'Vector',
    leafletMode: 'Leaflet',
    divisionsLegend: 'Divisions:',
    mapHint: 'Click any district (যেকোনো জেলায় ক্লিক করুন) to explore!',
    clickToInspect: 'Click to inspect (ক্লিক করুন)',
    tabSpots: 'Spots (স্থান)',
    tabFoods: 'Foods (খাবার)',
    tabCulture: 'Culture (ঐতিহ্য)',
    tabFacts: 'Facts (তথ্য)',
    spotsTab: (count) => `Spots (${count}) দর্শনীয় স্থান`,
    foodsTab: (count) => `Foods (${count}) খাবার`,
    cultureTab: 'Culture ঐতিহ্য',
    factsTab: 'Facts তথ্য',
    spotsSubtitle: 'Iconic landmarks & nature spots (ঐতিহাসিক ও দর্শনীয় স্থান)',
    openGoogleMaps: 'Google Maps (ম্যাপে দেখুন)',
    foodsSubtitle: 'Authentic culinary delicacies (ঐতিহ্যবাহী খাবার)',
    signatureDish: 'Signature Dish (বিশেষ খাবার)',
    signatureCulinary: 'Signature Culinary Hallmark (প্রধান খাবার)',
    mustTryLabel: 'Must Try (অবশ্যই খাবেন):',
    cultureOverview: 'Cultural Heritage (ঐতিহ্য ও সংস্কৃতি)',
    historicalEvolution: 'Historical Evolution (ঐতিহাসিক বিবর্তন)',
    livingTraditions: 'Living Traditions (লোকসংস্কৃতি ও ঐতিহ্য)',
    annualFestivals: 'Festivals & Melas (মেলা ও উৎসব)',
    geoDivisionLabel: 'Division (ভৌগোলিক বিভাগ)',
    totalAreaLabel: 'Total Area (মোট আয়তন)',
    coordinatesLabel: 'Coordinates (স্থানাঙ্ক)',
    nicknamesLabel: 'Nicknames (পরিচিত উপনাম)',
    famousForLabel: 'Famous For (যার জন্য বিখ্যাত)',
    wikipediaLink: 'Read on Wikipedia (উইকিপিডিয়া)',
    visitedBadge: 'Visited (ভ্রমণ করেছি)',
    markVisited: 'Mark as Visited (ভ্রমণ করেছি)',
    wishlistBadge: 'Saved (পছন্দের)',
    addWishlist: 'Add to Wishlist (পছন্দের তালিকায় রাখুন)',
    shareBtn: 'Share (শেয়ার)',
    copiedNotice: 'Copied! (কপি হয়েছে!)',
    pronounceTitle: 'Pronounce name (উচ্চারণ শুনুন)',
    closeSidebar: 'Close (বন্ধ করুন)',
    prevDistrict: 'Previous (পূর্ববর্তী)',
    nextDistrict: 'Next (পরবর্তী)',
    compareTitle: 'Compare Districts (জেলার তুলনা)',
    compareSubtitle: 'Side-by-side geographic, culinary, and cultural comparison',
    wishlistTitle: 'Explorer Progress (ভ্রমণ অগ্রগতি)',
    wishlistSubtitle: 'Track your travel milestones across all 64 districts',
    catalogTitle: 'All 64 Districts (সকল ৬৪ জেলা)',
    catalogSubtitle: 'Browse complete catalog with division filters and stats',
    searchInCatalog: 'Search district, food, spot (খুঁজুন)...',
    sortByLabel: 'Sort (সাজান):',
    sortByName: 'Name (নাম)',
    sortByArea: 'Area (আয়তন)',
    sortByDivision: 'Division (বিভাগ)'
  }
};

export const DIVISION_BN_NAMES: Record<DivisionName, string> = {
  Dhaka: 'ঢাকা',
  Chattogram: 'চট্টগ্রাম',
  Sylhet: 'সিলেট',
  Rajshahi: 'রাজশাহী',
  Khulna: 'খুলনা',
  Barishal: 'বরিশাল',
  Rangpur: 'রংপুর',
  Mymensingh: 'ময়মনসিংহ'
};

export const formatDivisionLabel = (
  divName: DivisionName | 'All',
  count: number,
  mode: LanguageMode
): string => {
  if (divName === 'All') {
    return UI_TEXTS[mode].allDistrictsFilter;
  }
  const bn = DIVISION_BN_NAMES[divName] || divName;
  if (mode === 'en') {
    return `${divName} ${count}`;
  }
  if (mode === 'bn') {
    return `${bn} ${toBengaliNumber(count)}`;
  }
  return `${divName} ${bn} ${count}`;
};

export const formatDistrictDisplayName = (
  name: string,
  bnName: string,
  mode: LanguageMode
): string => {
  if (mode === 'en') return name;
  if (mode === 'bn') return bnName;
  return `${name} (${bnName})`;
};

export const formatAreaDisplay = (
  areaKm2: number,
  mode: LanguageMode
): string => {
  if (mode === 'en') return `${areaKm2.toLocaleString()} km²`;
  if (mode === 'bn') return `${toBengaliNumber(areaKm2)} বর্গ কিমি`;
  return `${areaKm2.toLocaleString()} km² (${toBengaliNumber(areaKm2)} কিমি²)`;
};
