import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  MapPin,
  Compass,
  Dices,
  Languages,
  BookmarkCheck,
  Layers,
  X,
  SlidersHorizontal,
  Scale,
} from "lucide-react";
import { District, DivisionName, LanguageMode, ViewMode } from "../types";
import { searchDistricts } from "../data/districts";
import { DIVISION_LIST, DIVISIONS } from "../data/divisions";
import {
  UI_TEXTS,
  toBengaliNumber,
  DIVISION_BN_NAMES,
} from "../utils/localization";
import confetti from "canvas-confetti";

interface NavbarProps {
  selectedDistrict: District | null;
  onSelectDistrict: (district: District) => void;
  selectedDivision: DivisionName | "All";
  onSelectDivision: (division: DivisionName | "All") => void;
  languageMode: LanguageMode;
  onChangeLanguageMode: (mode: LanguageMode) => void;
  viewMode: ViewMode;
  onChangeViewMode: (mode: ViewMode) => void;
  onOpenWishlist: () => void;
  wishlistCount: number;
  visitedCount: number;
  onOpenCompare: () => void;
  allDistricts: District[];
}

export const Navbar: React.FC<NavbarProps> = ({
  onSelectDistrict,
  selectedDivision,
  onSelectDivision,
  languageMode,
  onChangeLanguageMode,
  viewMode,
  onChangeViewMode,
  onOpenWishlist,
  wishlistCount,
  visitedCount,
  onOpenCompare,
  allDistricts,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<District[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Handle search query change
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearchOpen(false);
      return;
    }
    const results = searchDistricts(searchQuery).slice(0, 7);
    setSearchResults(results);
    setIsSearchOpen(true);
  }, [searchQuery]);

  // Click outside to close search dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRandomDistrict = () => {
    if (!allDistricts.length) return;
    const randomIndex = Math.floor(Math.random() * allDistricts.length);
    const chosen = allDistricts[randomIndex];
    onSelectDistrict(chosen);

    // Fire celebratory confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.2 },
        colors: ["#006A4E", "#F42A41", "#f59e0b", "#10b981"],
      });
    } catch {
      // ignore
    }
  };

  return (
    <header
      id="app-navbar"
      className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors shadow-xs"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-between min-h-16 py-2 sm:py-0 gap-x-4 gap-y-2">
          {/* Brand Logo & Title */}
          <button
            type="button"
            onClick={() => window.location.assign('/')}
            aria-label="Return to the home page"
            className="flex items-center gap-3 shrink-0 min-w-0 text-left cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-emerald-700 to-teal-800 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <Compass className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight truncate max-w-[11rem] sm:max-w-none">
                  {UI_TEXTS[languageMode].appTitle}
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  {UI_TEXTS[languageMode].districtsCountBadge}
                </span>
              </div>
              <p className="animated-credit-text text-[10px] sm:text-xs font-semibold whitespace-nowrap">
                Made by Ahraf-Ali
              </p>
            </div>
          </button>

          {/* Search Bar with Autocomplete Dropdown */}
          <div ref={searchRef} className="relative order-last basis-full sm:order-none sm:basis-auto flex-1 min-w-0 max-w-md mx-0 sm:mx-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                id="district-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchOpen(true)}
                placeholder={UI_TEXTS[languageMode].searchPlaceholder}
                className="w-full pl-9 pr-8 py-2 text-sm bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200/60 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 rounded-xl border border-transparent focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-hidden transition-all"
              />
              {searchQuery && (
                <button
                  id="clear-search-btn"
                  onClick={() => {
                    setSearchQuery("");
                    setIsSearchOpen(false);
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Search Autocomplete Results */}
            {isSearchOpen && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="p-1.5 max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
                  {searchResults.map((d) => {
                    const divInfo = DIVISIONS[d.division];
                    const districtTitle =
                      languageMode === "en"
                        ? d.name
                        : languageMode === "bn"
                          ? d.bnName
                          : `${d.name} (${d.bnName})`;

                    const divLabel =
                      languageMode === "bn" ? d.divisionBn : d.division;

                    return (
                      <button
                        key={d.id}
                        id={`search-result-${d.id}`}
                        onClick={() => {
                          onSelectDistrict(d);
                          setIsSearchOpen(false);
                          setSearchQuery("");
                        }}
                        className="w-full px-3 py-2.5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-lg transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={d.coverImage}
                            alt={d.name}
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://images.unsplash.com/photo-1588083949404-c4f1ed1323b3?w=800&auto=format&fit=crop&q=80";
                            }}
                            className="w-9 h-9 rounded-lg object-cover shrink-0 border border-slate-200 dark:border-slate-700"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                                {districtTitle}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[200px] sm:max-w-xs">
                              {languageMode === "bn" ? d.taglineBn : d.tagline}
                            </p>
                          </div>
                        </div>

                        <span
                          className="text-[11px] font-medium px-2 py-0.5 rounded-md shrink-0 ml-2"
                          style={{
                            backgroundColor: `${divInfo.color}18`,
                            color: divInfo.color,
                          }}
                        >
                          {divLabel}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions (Random, Compare, Language, Wishlist, ViewMode) */}
          <div className="hidden xl:flex shrink-0 items-center gap-2">
            {/* Random District Button */}
            <button
              id="random-district-button"
              onClick={handleRandomDistrict}
              title="Pick a random district to explore"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-900 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/60 border border-amber-200 dark:border-amber-800/80 rounded-xl transition-all shadow-2xs cursor-pointer active:scale-95"
            >
              <Dices className="w-3.5 h-3.5 text-amber-500" />
              <span>{UI_TEXTS[languageMode].surpriseMeBtn}</span>
            </button>

            {/* Compare Button */}
            <button
              id="compare-districts-button"
              onClick={onOpenCompare}
              title="Compare 2 districts"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all cursor-pointer"
            >
              <Scale className="w-3.5 h-3.5 text-indigo-500" />
              <span>{UI_TEXTS[languageMode].compareBtn}</span>
            </button>

            {/* View Mode Toggle (Vector vs Leaflet) */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200 dark:border-slate-700">
              <button
                id="view-mode-vector-btn"
                onClick={() => onChangeViewMode("vector")}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${
                  viewMode === "vector"
                    ? "bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-2xs font-semibold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
                title="Vector SVG Map: Crisp, fast, stylized division rendering"
              >
                {UI_TEXTS[languageMode].vectorMode}
              </button>
              <button
                id="view-mode-leaflet-btn"
                onClick={() => onChangeViewMode("leaflet")}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${
                  viewMode === "leaflet"
                    ? "bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-2xs font-semibold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
                title="Leaflet Map: Interactive satellite & street tiles with district overlays"
              >
                {UI_TEXTS[languageMode].leafletMode}
              </button>
            </div>

            {/* Language Selector: EN (left) | EN / বাং (middle) | বাংলা (right) */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200 dark:border-slate-700">
              <button
                id="lang-en-btn"
                onClick={() => onChangeLanguageMode("en")}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${
                  languageMode === "en"
                    ? "bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-2xs font-bold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
                title="100% English only"
              >
                EN
              </button>
              <button
                id="lang-both-btn"
                onClick={() => onChangeLanguageMode("both")}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${
                  languageMode === "both"
                    ? "bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-2xs font-bold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
                title="Bilingual: English & Bengali mixed together"
              >
                EN / বাং
              </button>
              <button
                id="lang-bn-btn"
                onClick={() => onChangeLanguageMode("bn")}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all font-bangla ${
                  languageMode === "bn"
                    ? "bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-2xs font-bold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
                title="১০০% বাংলা"
              >
                বাংলা
              </button>
            </div>

            {/* Wishlist / Visited Tracker */}
            <button
              id="wishlist-drawer-button"
              onClick={onOpenWishlist}
              title="Saved Districts & Exploration Tracker"
              className="relative p-2 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all cursor-pointer"
            >
              <BookmarkCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              {(wishlistCount > 0 || visitedCount > 0) && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center border-2 border-white dark:border-slate-900">
                  {wishlistCount + visitedCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Actions Menu Button */}
          <div className="flex xl:hidden items-center gap-1.5 shrink-0">
            <button
              id="mobile-random-btn"
              onClick={handleRandomDistrict}
              className="p-2 text-amber-600 dark:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              title="Random District"
            >
              <Dices className="w-5 h-5" />
            </button>
            <button
              id="mobile-wishlist-btn"
              onClick={onOpenWishlist}
              className="relative p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              <BookmarkCheck className="w-5 h-5" />
              {(wishlistCount > 0 || visitedCount > 0) && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-emerald-600 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                  {wishlistCount + visitedCount}
                </span>
              )}
            </button>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Filter & Controls Drawer */}
        {isMobileMenuOpen && (
          <div className="xl:hidden py-3 border-t border-slate-200 dark:border-slate-800 space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-slate-500 uppercase">
                Map Mode
              </span>
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg">
                <button
                  onClick={() => onChangeViewMode("vector")}
                  className={`px-3 py-1 text-xs rounded-md ${viewMode === "vector" ? "bg-white dark:bg-slate-900 font-bold text-emerald-600" : "text-slate-600 dark:text-slate-400"}`}
                >
                  Vector
                </button>
                <button
                  onClick={() => onChangeViewMode("leaflet")}
                  className={`px-3 py-1 text-xs rounded-md ${viewMode === "leaflet" ? "bg-white dark:bg-slate-900 font-bold text-emerald-600" : "text-slate-600 dark:text-slate-400"}`}
                >
                  Leaflet
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-slate-500 uppercase">
                Language
              </span>
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg">
                <button
                  onClick={() => onChangeLanguageMode("both")}
                  className={`px-2 py-1 text-xs rounded-md ${languageMode === "both" ? "bg-white dark:bg-slate-900 font-bold" : "text-slate-600 dark:text-slate-400"}`}
                >
                  Both
                </button>
                <button
                  onClick={() => onChangeLanguageMode("en")}
                  className={`px-2 py-1 text-xs rounded-md ${languageMode === "en" ? "bg-white dark:bg-slate-900 font-bold" : "text-slate-600 dark:text-slate-400"}`}
                >
                  English
                </button>
                <button
                  onClick={() => onChangeLanguageMode("bn")}
                  className={`px-2 py-1 text-xs rounded-md font-bangla ${languageMode === "bn" ? "bg-white dark:bg-slate-900 font-bold" : "text-slate-600 dark:text-slate-400"}`}
                >
                  বাংলা
                </button>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={() => {
                  onOpenCompare();
                  setIsMobileMenuOpen(false);
                }}
                className="flex-1 py-1.5 px-3 text-xs font-medium text-center bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center gap-1.5"
              >
                <Scale className="w-3.5 h-3.5 text-indigo-500" />
                Compare Districts
              </button>
            </div>
          </div>
        )}

        {/* Division Filter Pills Scrollbar */}
        <div className="py-2 overflow-x-auto no-scrollbar flex items-center gap-1.5 -mx-4 px-4 sm:mx-0 sm:px-0 border-t border-slate-100 dark:border-slate-800/80">
          <button
            id="division-filter-all"
            onClick={() => onSelectDivision("All")}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer shrink-0 ${
              selectedDivision === "All"
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs font-semibold"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            {UI_TEXTS[languageMode].allDistrictsFilter}
          </button>

          {DIVISION_LIST.map((div) => {
            const isSelected = selectedDivision === div.name;
            const divDisplayName =
              languageMode === "en"
                ? div.name
                : languageMode === "bn"
                  ? div.bnName
                  : `${div.name} (${div.bnName})`;

            const countDisplay =
              languageMode === "bn"
                ? toBengaliNumber(div.districtCount)
                : div.districtCount;

            return (
              <button
                key={div.name}
                id={`division-filter-${div.name.toLowerCase()}`}
                onClick={() => onSelectDivision(isSelected ? "All" : div.name)}
                style={{
                  backgroundColor: isSelected ? div.color : undefined,
                  borderColor: isSelected ? div.color : undefined,
                  color: isSelected ? "#ffffff" : undefined,
                }}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer shrink-0 flex items-center gap-1.5 border ${
                  isSelected
                    ? "shadow-xs font-semibold border-transparent"
                    : "border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600"
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{
                    backgroundColor: isSelected ? "#ffffff" : div.color,
                  }}
                />
                <span>{divDisplayName}</span>
                <span
                  className={`text-[10px] px-1 rounded-full ${isSelected ? "bg-white/25 text-white" : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"}`}
                >
                  {countDisplay}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
