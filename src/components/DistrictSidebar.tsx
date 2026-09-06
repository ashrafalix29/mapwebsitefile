import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  UtensilsCrossed, 
  Landmark, 
  Info, 
  ExternalLink, 
  Volume2, 
  Heart, 
  CheckCircle2, 
  Share2, 
  ChevronLeft, 
  ChevronRight, 
  Navigation,
  Calendar,
  Waves
} from 'lucide-react';
import { ActiveTab, District, LanguageMode } from '../types';
import { DIVISIONS } from '../data/divisions';
import { UI_TEXTS, toBengaliNumber } from '../utils/localization';
import confetti from 'canvas-confetti';

interface DistrictSidebarProps {
  district: District | null;
  onClose: () => void;
  languageMode: LanguageMode;
  isWishlisted: boolean;
  isVisited: boolean;
  onToggleWishlist: (district: District) => void;
  onToggleVisited: (district: District) => void;
  onSelectPrevious: () => void;
  onSelectNext: () => void;
}

export const DistrictSidebar: React.FC<DistrictSidebarProps> = ({
  district,
  onClose,
  languageMode,
  isWishlisted,
  isVisited,
  onToggleWishlist,
  onToggleVisited,
  onSelectPrevious,
  onSelectNext
}) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('spots');
  const [isCopied, setIsCopied] = useState(false);

  if (!district) {
    return null;
  }

  const divInfo = DIVISIONS[district.division];

  // Web Speech API for Pronunciation
  const handlePronounce = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        languageMode === 'bn' ? district.bnName : `${district.name}, ${district.division}`
      );
      utterance.lang = languageMode === 'bn' ? 'bn-BD' : 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Share District info to clipboard
  const handleShare = () => {
    const text = `Discover ${district.name} (${district.bnName}), ${district.division} Division, Bangladesh!\nFamous for: ${district.quickFacts.famousFor}\nMust-try dish: ${district.quickFacts.mustTryDish}`;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleVisitedWithConfetti = () => {
    onToggleVisited(district);
    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.5, x: 0.8 },
        colors: ['#10b981', '#059669', '#34d399']
      });
    } catch {
      // ignore
    }
  };

  return (
    <aside
      id="district-details-sidebar"
      className="w-full lg:w-[460px] xl:w-[500px] h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 flex flex-col shadow-2xl z-30 transition-all duration-300"
    >
      {/* Hero Header with District Photo */}
      <div className="relative h-64 sm:h-72 w-full shrink-0 overflow-hidden bg-slate-800">
        <img
          src={district.coverImage}
          alt={district.name}
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1588083949404-c4f1ed1323b3?w=800&auto=format&fit=crop&q=80';
          }}
          className="w-full h-full object-cover brightness-90 transition-transform duration-700 hover:scale-105"
        />

        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Top Controls: Close, Next, Prev, Wishlist */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-1 bg-slate-900/60 backdrop-blur-md rounded-xl p-1 border border-white/10">
            <button
              id="prev-district-btn"
              onClick={onSelectPrevious}
              title="Previous District"
              className="p-1.5 text-white/90 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              id="next-district-btn"
              onClick={onSelectNext}
              title="Next District"
              className="p-1.5 text-white/90 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900/60 backdrop-blur-md rounded-xl p-1 border border-white/10">
            {/* Wishlist Button */}
            <button
              id="wishlist-toggle-btn"
              onClick={() => onToggleWishlist(district)}
              title={isWishlisted ? "Remove from wishlist" : "Add to travel wishlist"}
              className={`p-1.5 rounded-lg transition-all ${
                isWishlisted 
                  ? 'text-rose-500 bg-rose-500/20' 
                  : 'text-white/80 hover:text-rose-400 hover:bg-white/20'
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
            </button>

            {/* Visited Button */}
            <button
              id="visited-toggle-btn"
              onClick={handleVisitedWithConfetti}
              title={isVisited ? "Mark as unvisited" : "I have visited this district!"}
              className={`p-1.5 rounded-lg transition-all ${
                isVisited 
                  ? 'text-emerald-400 bg-emerald-500/20' 
                  : 'text-white/80 hover:text-emerald-300 hover:bg-white/20'
              }`}
            >
              <CheckCircle2 className={`w-4 h-4 ${isVisited ? 'fill-emerald-500/30' : ''}`} />
            </button>

            {/* Share Button */}
            <button
              id="share-district-btn"
              onClick={handleShare}
              title={isCopied ? "Copied to clipboard!" : "Share district details"}
              className="p-1.5 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors relative"
            >
              <Share2 className="w-4 h-4" />
              {isCopied && (
                <span className="absolute -bottom-7 right-0 text-[10px] bg-slate-900 text-emerald-400 px-2 py-0.5 rounded-md font-medium whitespace-nowrap shadow-md">
                  Copied!
                </span>
              )}
            </button>

            {/* Close Button */}
            <button
              id="close-district-sidebar-btn"
              onClick={onClose}
              title="Close District Panel"
              className="p-1.5 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Title & Info inside Hero Header */}
        <div className="absolute bottom-4 left-4 right-4 text-white z-10">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span
              className="text-xs font-semibold px-2.5 py-0.5 rounded-full backdrop-blur-md shadow-xs"
              style={{
                backgroundColor: `${divInfo.color}cc`,
                color: '#ffffff'
              }}
            >
              {languageMode === 'bn' 
                ? `${district.divisionBn} বিভাগ` 
                : languageMode === 'en' 
                  ? `${district.division} Division` 
                  : `${district.division} Division (${district.divisionBn})`}
            </span>
            <span className="text-xs text-slate-200 font-medium bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-md">
              {languageMode !== 'en'
                ? `${toBengaliNumber(district.areaKm2)} বর্গ কিমি`
                : `${district.areaKm2.toLocaleString()} km²`}
            </span>
          </div>

          <div className="flex items-baseline justify-between gap-2">
            <div className="flex items-baseline gap-2.5 flex-wrap">
              {languageMode === 'en' ? (
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {district.name}
                </h2>
              ) : languageMode === 'bn' ? (
                <h2 className="text-2xl sm:text-3xl font-bold font-bangla text-emerald-300 tracking-wide">
                  {district.bnName}
                </h2>
              ) : (
                <>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    {district.name}
                  </h2>
                  <span className="text-xl sm:text-2xl font-bold font-bangla text-emerald-300">
                    {district.bnName}
                  </span>
                </>
              )}
            </div>

            {/* Pronounce audio button */}
            <button
              id="pronounce-district-btn"
              onClick={handlePronounce}
              title={languageMode === 'bn' ? 'নামের সঠিক উচ্চারণ শুনুন' : 'Listen to pronunciation'}
              className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-colors cursor-pointer"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs text-slate-200 line-clamp-2 mt-1 font-light leading-relaxed">
            {languageMode === 'bn' ? district.taglineBn : district.tagline}
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 px-3 pt-2">
        <button
          id="tab-spots-btn"
          onClick={() => setActiveTab('spots')}
          className={`flex-1 pb-2.5 text-xs font-semibold flex items-center justify-center gap-1.5 border-b-2 transition-all cursor-pointer ${
            activeTab === 'spots'
              ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>
            {UI_TEXTS[languageMode].tabSpots} ({languageMode !== 'en' ? toBengaliNumber(district.touristSpots.length) : district.touristSpots.length})
          </span>
        </button>

        <button
          id="tab-food-btn"
          onClick={() => setActiveTab('food')}
          className={`flex-1 pb-2.5 text-xs font-semibold flex items-center justify-center gap-1.5 border-b-2 transition-all cursor-pointer ${
            activeTab === 'food'
              ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <UtensilsCrossed className="w-3.5 h-3.5" />
          <span>
            {UI_TEXTS[languageMode].tabFoods} ({languageMode !== 'en' ? toBengaliNumber(district.famousFoods.length) : district.famousFoods.length})
          </span>
        </button>

        <button
          id="tab-culture-btn"
          onClick={() => setActiveTab('culture')}
          className={`flex-1 pb-2.5 text-xs font-semibold flex items-center justify-center gap-1.5 border-b-2 transition-all cursor-pointer ${
            activeTab === 'culture'
              ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Landmark className="w-3.5 h-3.5" />
          <span>{UI_TEXTS[languageMode].tabCulture}</span>
        </button>

        <button
          id="tab-stats-btn"
          onClick={() => setActiveTab('stats')}
          className={`flex-1 pb-2.5 text-xs font-semibold flex items-center justify-center gap-1.5 border-b-2 transition-all cursor-pointer ${
            activeTab === 'stats'
              ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Info className="w-3.5 h-3.5" />
          <span>{UI_TEXTS[languageMode].tabFacts}</span>
        </button>
      </div>

      {/* Tab Content Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
        
        {/* ================= TAB 1: TOURIST SPOTS ================= */}
        {activeTab === 'spots' && (
          <div className="space-y-3.5">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pb-1">
              <span>{UI_TEXTS[languageMode].spotsSubtitle}</span>
<span className="font-semibold text-emerald-600 dark:text-emerald-400">
                {languageMode !== 'en'
                  ? `${toBengaliNumber(district.touristSpots.length)}টি স্থান`
                  : `${district.touristSpots.length} attractions`}
              </span>
            </div>

            {district.touristSpots.map((spot, i) => {
              const spotTitle = languageMode === 'en'
                ? spot.name
                : languageMode === 'bn'
                  ? spot.bnName
                  : `${spot.name} (${spot.bnName})`;

              return (
                <div
                  key={spot.name}
                  className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3.5 border border-slate-200/80 dark:border-slate-800 transition-all hover:border-emerald-300 dark:hover:border-emerald-800/80 hover:shadow-xs group"
                >
                  {spot.image && (
                    <div className="w-full h-36 rounded-lg overflow-hidden mb-3 bg-slate-200 dark:bg-slate-700">
                      <img
                        src={spot.image}
                        alt={spot.name}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1588083949404-c4f1ed1323b3?w=800&auto=format&fit=crop&q=80';
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold flex items-center justify-center shrink-0">
                          {languageMode !== 'en' ? toBengaliNumber(i + 1) : i + 1}
                        </span>
                        <span>{spotTitle}</span>
                      </h3>
                      {languageMode === 'both' && (
                        <p className="text-xs text-emerald-700 dark:text-emerald-400 font-bangla mt-0.5 ml-7">
                          {spot.bnName}
                        </p>
                      )}
                    </div>

                    {/* Google Maps link */}
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${spot.name}, ${district.name}, Bangladesh`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={languageMode === 'bn' ? 'গুগল ম্যাপসে দেখুন' : 'Open in Google Maps'}
                      className="p-1.5 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shrink-0 cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 ml-7 leading-relaxed">
                    {spot.desc}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* ================= TAB 2: FAMOUS FOODS ================= */}
        {activeTab === 'food' && (
          <div className="space-y-3.5">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pb-1">
              <span>{UI_TEXTS[languageMode].foodsSubtitle}</span>
            </div>

            {/* Must-Try Highlight Card */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/30 p-3.5 rounded-xl border border-amber-200/80 dark:border-amber-800/60 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300 mb-1">
                <UtensilsCrossed className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>{UI_TEXTS[languageMode].signatureDish}</span>
              </div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {district.quickFacts.mustTryDish}
              </p>
            </div>

            {district.famousFoods.map((food, i) => {
              const foodTitle = languageMode === 'en'
                ? food.name
                : languageMode === 'bn'
                  ? food.bnName
                  : food.name;

              return (
                <div
                  key={food.name}
                  className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3.5 border border-slate-200/80 dark:border-slate-800 transition-all hover:border-amber-300 dark:hover:border-amber-800/80 hover:shadow-xs"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-[11px] font-bold flex items-center justify-center shrink-0">
                        {languageMode !== 'en' ? toBengaliNumber(i + 1) : i + 1}
                      </span>
                      <span>{foodTitle}</span>
                    </h3>
                    {languageMode === 'both' && (
                      <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-300 bg-amber-100/60 dark:bg-amber-900/40 px-2 py-0.5 rounded-md font-bangla shrink-0">
                        {food.bnName}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 ml-7 leading-relaxed">
                    {food.desc}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* ================= TAB 3: CULTURAL HERITAGE ================= */}
        {activeTab === 'culture' && (
          <div className="space-y-4">
            {/* Bengali/Bilingual Cultural Summary */}
            {district.culture.summaryBn && (
              <div className="bg-emerald-50/70 dark:bg-emerald-950/40 p-4 rounded-xl border border-emerald-200/80 dark:border-emerald-800/60">
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 block mb-1">
                  {languageMode === 'en' ? 'Cultural Highlights' : 'ঐতিহ্য ও সাংস্কৃতিক রূপরেখা'}
                </span>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-bangla leading-relaxed">
                  {district.culture.summaryBn}
                </p>
              </div>
            )}

            {/* Historical Evolution */}
            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Landmark className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{languageMode === 'bn' ? 'ঐতিহাসিক পটভূমি' : 'Historical Evolution'}</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {district.culture.history}
              </p>
            </div>

            {/* Traditions & Folk Life */}
            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Landmark className="w-4 h-4 text-amber-500" />
                <span>{languageMode === 'bn' ? 'লোকঐতিহ্য ও সংস্কৃতি' : 'Living Traditions & Folklore'}</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {district.culture.traditions}
              </p>
            </div>

            {/* Celebrations & Festivals */}
            {district.culture.festivals.length > 0 && (
              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
                <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-indigo-500" />
                  <span>{languageMode === 'bn' ? 'বার্ষিক উৎসব ও মেলা' : 'Annual Festivals & Melas'}</span>
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {district.culture.festivals.map((fest) => (
                    <span
                      key={fest}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-2xs"
                    >
                      {fest}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 4: QUICK FACTS ================= */}
        {activeTab === 'stats' && (
          <div className="space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800">
                <span className="text-[11px] text-slate-400 font-medium block">
                  {languageMode === 'bn' ? 'প্রশাসনিক বিভাগ' : 'Geographic Division'}
                </span>
                <span 
                  className="text-sm font-bold block mt-0.5"
                  style={{ color: divInfo.color }}
                >
                  {languageMode === 'bn' 
                    ? district.divisionBn 
                    : languageMode === 'en' 
                      ? district.division 
                      : `${district.division} (${district.divisionBn})`}
                </span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800">
                <span className="text-[11px] text-slate-400 font-medium block">
                  {languageMode === 'bn' ? 'মোট আয়তন' : 'Total Area'}
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-white block mt-0.5">
                  {languageMode === 'bn'
                    ? `${toBengaliNumber(district.areaKm2)} বর্গ কিমি`
                    : `${district.areaKm2.toLocaleString()} km²`}
                </span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800">
                <span className="text-[11px] text-slate-400 font-medium block">
                  {languageMode === 'bn' ? 'অক্ষাংশ ও দ্রাঘিমাংশ' : 'Latitude & Longitude'}
                </span>
                <span className="text-xs font-mono font-medium text-slate-700 dark:text-slate-300 block mt-0.5">
                  {languageMode === 'bn'
                    ? `${toBengaliNumber(district.lat.toFixed(2))}° N, ${toBengaliNumber(district.lng.toFixed(2))}° E`
                    : `${district.lat.toFixed(4)}° N, ${district.lng.toFixed(4)}° E`}
                </span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800">
                <span className="text-[11px] text-slate-400 font-medium block">
                  {languageMode === 'bn' ? 'ম্যাপ কোড' : 'GeoJSON Code'}
                </span>
                <span className="text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400 block mt-0.5">
                  {district.geoName}
                </span>
              </div>
            </div>

            {/* Nicknames */}
            {district.quickFacts.nicknames && district.quickFacts.nicknames.length > 0 && (
              <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                  {languageMode === 'bn' ? 'যে নামে পরিচিত / উপাধি' : 'Known As / Nicknames'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {district.quickFacts.nicknames.map((nick) => (
                    <span
                      key={nick}
                      className="px-2.5 py-1 text-xs font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 rounded-lg border border-emerald-200/80 dark:border-emerald-800"
                    >
                      {nick}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Famous For */}
            <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                {languageMode === 'bn' ? 'বিখ্যাত যে কারণে' : 'Famous For'}
              </span>
              <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                {district.quickFacts.famousFor}
              </p>
            </div>

            {/* External Navigation Link */}
            <a
              href={`https://${languageMode === 'bn' ? 'bn' : 'en'}.wikipedia.org/wiki/${encodeURIComponent(languageMode === 'bn' ? district.bnName + '_জেলা' : district.name + '_District')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>{languageMode === 'bn' ? 'উইকিপিডিয়ায় বিস্তারিত পড়ুন' : 'Read Full History on Wikipedia'}</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        )}

      </div>
    </aside>
  );
};
