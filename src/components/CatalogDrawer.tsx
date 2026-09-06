import React, { useState, useMemo } from 'react';
import { X, Grid, Search, ArrowUpDown } from 'lucide-react';
import { District, DivisionName, LanguageMode } from '../types';
import { DIVISIONS, DIVISION_LIST } from '../data/divisions';
import { UI_TEXTS, toBengaliNumber } from '../utils/localization';

interface CatalogDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  districts: District[];
  onSelectDistrict: (district: District) => void;
  languageMode: LanguageMode;
  selectedDivision: DivisionName | 'All';
  onSelectDivision: (div: DivisionName | 'All') => void;
}

export const CatalogDrawer: React.FC<CatalogDrawerProps> = ({
  isOpen,
  onClose,
  districts,
  onSelectDistrict,
  languageMode,
  selectedDivision,
  onSelectDivision
}) => {
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'area' | 'division'>('name');

  const filteredDistricts = useMemo(() => {
    return districts
      .filter((d) => {
        const matchesDiv = selectedDivision === 'All' || d.division === selectedDivision;
        const q = query.toLowerCase().trim();
        const matchesQuery = !q || (
          d.name.toLowerCase().includes(q) ||
          d.bnName.includes(q) ||
          d.division.toLowerCase().includes(q) ||
          d.quickFacts.famousFor.toLowerCase().includes(q) ||
          d.quickFacts.mustTryDish.toLowerCase().includes(q)
        );
        return matchesDiv && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === 'name') {
          return languageMode === 'bn' 
            ? a.bnName.localeCompare(b.bnName, 'bn')
            : a.name.localeCompare(b.name, 'en');
        }
        if (sortBy === 'area') return b.areaKm2 - a.areaKm2;
        if (sortBy === 'division') return a.division.localeCompare(b.division);
        return 0;
      });
  }, [districts, selectedDivision, query, sortBy, languageMode]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
      <div 
        id="catalog-drawer-modal"
        className="bg-white dark:bg-slate-900 w-full max-w-5xl h-[calc(100dvh-1rem)] sm:h-[85vh] rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="p-3 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
              <Grid className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">
                {languageMode === 'bn' ? 'সকল ৬৪ জেলার ক্যাটালগ' : 'All 64 Districts Gallery'}
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                {languageMode === 'bn'
                  ? 'বাংলাদেশের সকল জেলা অন্বেষণ করুন, বৈশিষ্ট্য ও ঐতিহ্য জানুন'
                  : 'Browse, search, and filter the complete cultural catalog of Bangladesh'}
              </p>
            </div>
          </div>

          <button
            id="close-catalog-btn"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Toolbar */}
        <div className="p-3 sm:p-4 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
          
          {/* Search */}
          <div className="relative w-full sm:flex-1 min-w-0 max-w-none sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={UI_TEXTS[languageMode].searchPlaceholder}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden"
            />
          </div>

          {/* Division Filter */}
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
              {languageMode === 'bn' ? 'বিভাগ:' : 'Division:'}
            </span>
            <select
              value={selectedDivision}
              onChange={(e) => onSelectDivision(e.target.value as any)}
              className="min-w-0 flex-1 sm:flex-none text-xs font-medium px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 cursor-pointer"
            >
              <option value="All">
                {languageMode === 'bn' ? 'সকল বিভাগ (৬৪)' : 'All Divisions (64)'}
              </option>
              {DIVISION_LIST.map((div) => (
                <option key={div.name} value={div.name}>
                  {languageMode === 'bn' ? `${div.bnName} (${toBengaliNumber(div.districtCount)})` : `${div.name} (${div.districtCount})`}
                </option>
              ))}
            </select>

            {/* Sort Filter 3-Tab Control */}
            <div 
              id="sort-filter-tabs"
              className="flex flex-1 sm:flex-none items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-300 dark:border-slate-700 text-xs shadow-inner"
            >
              <button
                id="sort-by-name-btn"
                type="button"
                onClick={() => setSortBy('name')}
                className={`flex-1 sm:flex-none justify-center px-2 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  sortBy === 'name' 
                    ? 'bg-emerald-600 text-white shadow-xs' 
                    : 'text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-700/60'
                }`}
              >
                <ArrowUpDown className="w-3.5 h-3.5 shrink-0" />
                <span>{languageMode === 'bn' ? 'নাম অনুসারে' : 'Name A-Z'}</span>
              </button>
              <button
                id="sort-by-area-btn"
                type="button"
                onClick={() => setSortBy('area')}
                className={`flex-1 sm:flex-none justify-center px-2 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  sortBy === 'area' 
                    ? 'bg-emerald-600 text-white shadow-xs' 
                    : 'text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-700/60'
                }`}
              >
                <span>{languageMode === 'bn' ? 'আয়তন' : 'Land Area'}</span>
              </button>
              <button
                id="sort-by-division-btn"
                type="button"
                onClick={() => setSortBy('division')}
                className={`flex-1 sm:flex-none justify-center px-2 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  sortBy === 'division' 
                    ? 'bg-emerald-600 text-white shadow-xs' 
                    : 'text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-700/60'
                }`}
              >
                <span>{languageMode === 'bn' ? 'বিভাগ' : 'Division'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Grid of District Cards */}
        <div className="p-3 sm:p-6 overflow-y-auto min-h-0 flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 auto-rows-max items-start">
          {filteredDistricts.map((d) => {
            const divInfo = DIVISIONS[d.division];
            const cardTitle = languageMode === 'en'
              ? d.name
              : languageMode === 'bn'
                ? d.bnName
                : d.name;

            const divBadge = languageMode === 'bn' ? d.divisionBn : d.division;

            return (
              <div
                key={d.id}
                onClick={() => {
                  onSelectDistrict(d);
                  onClose();
                }}
                className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:border-emerald-500 hover:shadow-lg transition-all cursor-pointer group flex flex-col min-h-[350px] sm:h-[380px]"
              >
                <div className="h-36 w-full overflow-hidden relative shrink-0 bg-slate-200 dark:bg-slate-700">
                  <img
                    src={d.coverImage}
                    alt={d.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1588083949404-c4f1ed1323b3?w=800&auto=format&fit=crop&q=80';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span
                    className="absolute top-2.5 left-2.5 text-[10px] font-bold px-2 py-0.5 rounded-md text-white backdrop-blur-md shadow-xs"
                    style={{ backgroundColor: `${divInfo.color}ee` }}
                  >
                    {divBadge}
                  </span>
                  <span className="absolute bottom-2.5 right-2.5 text-[10px] font-medium px-2 py-0.5 rounded-md bg-black/70 text-white backdrop-blur-md">
                    {languageMode === 'bn' ? `${toBengaliNumber(d.areaKm2)} বর্গ কিমি` : `${d.areaKm2.toLocaleString()} km²`}
                  </span>
                </div>

                <div className="p-3.5 flex-1 flex flex-col justify-between min-h-0">
                  <div>
                    <div className="flex items-baseline justify-between gap-1">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 truncate">
                        {cardTitle}
                      </h3>
                      {languageMode === 'both' && (
                        <span className="text-xs font-bangla text-slate-400 shrink-0">
                          {d.bnName}
                        </span>
                      )}
                    </div>

                    {/* District Description / Tagline */}
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mt-1.5 leading-relaxed">
                      {languageMode === 'bn' ? d.taglineBn : d.tagline}
                    </p>

                    {/* Famous for summary */}
                    <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                      <span className="font-semibold text-slate-700 dark:text-slate-200">
                        {languageMode === 'bn' ? 'বিখ্যাত:' : 'Famous:'}
                      </span>{' '}
                      {d.quickFacts.famousFor}
                    </div>
                  </div>

                  {/* Fixed Bottom Row with aligned Inspect Button */}
                  <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-2">
                    <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 truncate flex-1 min-w-0" title={d.quickFacts.mustTryDish}>
                      {d.quickFacts.mustTryDish}
                    </span>
                    <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shrink-0 whitespace-nowrap group-hover:bg-emerald-600 group-hover:text-white transition-colors flex items-center gap-1">
                      <span>{languageMode === 'bn' ? 'বিস্তারিত' : 'Inspect'}</span>
                      <span className="text-xs">→</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-400">
          {languageMode === 'bn'
            ? `মোট ৬৪ জেলার মধ্যে ${toBengaliNumber(filteredDistricts.length)}টি জেলা প্রদর্শিত`
            : `Showing ${filteredDistricts.length} of 64 districts`}
        </div>
      </div>
    </div>
  );
};
