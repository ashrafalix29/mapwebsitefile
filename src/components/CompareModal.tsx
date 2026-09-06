import React, { useState } from 'react';
import { X, Scale, ArrowRight } from 'lucide-react';
import { District, LanguageMode } from '../types';
import { DIVISIONS } from '../data/divisions';
import { toBengaliNumber } from '../utils/localization';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  allDistricts: District[];
  initialDistrictA?: District | null;
  onSelectDistrict: (district: District) => void;
  languageMode: LanguageMode;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  allDistricts,
  initialDistrictA,
  onSelectDistrict,
  languageMode
}) => {
  const [districtAId, setDistrictAId] = useState<string>(
    initialDistrictA?.id || allDistricts[0]?.id || 'dhaka'
  );
  const [districtBId, setDistrictBId] = useState<string>(
    allDistricts.find((d) => d.id !== (initialDistrictA?.id || 'dhaka'))?.id || 'chattogram'
  );

  if (!isOpen) return null;

  const districtMap = new Map(allDistricts.map((d) => [d.id, d]));
  const districtA = districtMap.get(districtAId) || allDistricts[0];
  const districtB = districtMap.get(districtBId) || allDistricts[1];

  const getDistrictName = (d: District) => {
    if (languageMode === 'en') return d.name;
    if (languageMode === 'bn') return d.bnName;
    return `${d.name} (${d.bnName})`;
  };

  const getDivisionName = (d: District) => {
    if (languageMode === 'bn') return `${d.divisionBn} বিভাগ`;
    if (languageMode === 'en') return `${d.division} Division`;
    return `${d.division} Division (${d.divisionBn})`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
      <div
        id="compare-districts-modal"
        className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                {languageMode === 'bn' ? 'দুই জেলার তুলনামূলক পর্যালোচনা' : 'Compare Districts Side-by-Side'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {languageMode === 'bn'
                  ? 'ভৌগোলিক অবস্থান, দর্শনীয় স্থান, ঐতিহ্যবাহী খাবার ও সংস্কৃতির তুলনা'
                  : 'Explore geography, tourist spots, culinary staples, and heritage'}
              </p>
            </div>
          </div>

          <button
            id="close-compare-modal-btn"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* District Selectors */}
        <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800">
          <div>
            <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              {languageMode === 'bn' ? 'জেলা ১' : 'District 1'}
            </label>
            <select
              value={districtAId}
              onChange={(e) => setDistrictAId(e.target.value)}
              className="w-full text-xs font-semibold p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden cursor-pointer"
            >
              {allDistricts.map((d) => (
                <option key={`a-${d.id}`} value={d.id}>
                  {languageMode === 'bn' ? `${d.bnName} (${d.divisionBn})` : `${d.name} (${d.division})`}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              {languageMode === 'bn' ? 'জেলা ২' : 'District 2'}
            </label>
            <select
              value={districtBId}
              onChange={(e) => setDistrictBId(e.target.value)}
              className="w-full text-xs font-semibold p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden cursor-pointer"
            >
              {allDistricts.map((d) => (
                <option key={`b-${d.id}`} value={d.id}>
                  {languageMode === 'bn' ? `${d.bnName} (${d.divisionBn})` : `${d.name} (${d.division})`}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Comparison Matrix */}
        <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4">
          
          {/* Photos and Names */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="h-32 sm:h-40 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 relative">
                <img
                  src={districtA.coverImage}
                  alt={districtA.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1588083949404-c4f1ed1323b3?w=800&auto=format&fit=crop&q=80';
                  }}
                  className="w-full h-full object-cover"
                />
                <span
                  className="absolute bottom-2 left-2 text-[11px] font-bold px-2 py-0.5 rounded-md text-white backdrop-blur-md"
                  style={{ backgroundColor: `${DIVISIONS[districtA.division].color}ee` }}
                >
                  {languageMode === 'bn' ? districtA.divisionBn : districtA.division}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {languageMode === 'en' ? (
                  districtA.name
                ) : languageMode === 'bn' ? (
                  <span className="font-bangla">{districtA.bnName}</span>
                ) : (
                  <>
                    {districtA.name} <span className="text-xs font-bangla text-slate-400">({districtA.bnName})</span>
                  </>
                )}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2">
                {languageMode === 'bn' ? districtA.taglineBn : districtA.tagline}
              </p>
            </div>

            <div className="space-y-2">
              <div className="h-32 sm:h-40 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 relative">
                <img
                  src={districtB.coverImage}
                  alt={districtB.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1588083949404-c4f1ed1323b3?w=800&auto=format&fit=crop&q=80';
                  }}
                  className="w-full h-full object-cover"
                />
                <span
                  className="absolute bottom-2 left-2 text-[11px] font-bold px-2 py-0.5 rounded-md text-white backdrop-blur-md"
                  style={{ backgroundColor: `${DIVISIONS[districtB.division].color}ee` }}
                >
                  {languageMode === 'bn' ? districtB.divisionBn : districtB.division}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {languageMode === 'en' ? (
                  districtB.name
                ) : languageMode === 'bn' ? (
                  <span className="font-bangla">{districtB.bnName}</span>
                ) : (
                  <>
                    {districtB.name} <span className="text-xs font-bangla text-slate-400">({districtB.bnName})</span>
                  </>
                )}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2">
                {languageMode === 'bn' ? districtB.taglineBn : districtB.tagline}
              </p>
            </div>
          </div>

          {/* Area & Coordinates */}
          <div className="border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-800 text-xs">
            {/* Division */}
            <div className="grid grid-cols-2 p-3 bg-slate-50/50 dark:bg-slate-800/30">
              <div>
                <span className="text-slate-400 block font-medium">
                  {languageMode === 'bn' ? 'প্রশাসনিক বিভাগ' : 'Division'}
                </span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{getDivisionName(districtA)}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">
                  {languageMode === 'bn' ? 'প্রশাসনিক বিভাগ' : 'Division'}
                </span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{getDivisionName(districtB)}</span>
              </div>
            </div>

            {/* Land Area */}
            <div className="grid grid-cols-2 p-3">
              <div>
                <span className="text-slate-400 block font-medium">
                  {languageMode === 'bn' ? 'মোট আয়তন' : 'Total Area'}
                </span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {languageMode === 'bn' ? `${toBengaliNumber(districtA.areaKm2)} বর্গ কিমি` : `${districtA.areaKm2.toLocaleString()} km²`}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">
                  {languageMode === 'bn' ? 'মোট আয়তন' : 'Total Area'}
                </span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {languageMode === 'bn' ? `${toBengaliNumber(districtB.areaKm2)} বর্গ কিমি` : `${districtB.areaKm2.toLocaleString()} km²`}
                </span>
              </div>
            </div>

            {/* Must-Try Culinary Specialty */}
            <div className="grid grid-cols-2 p-3 bg-slate-50/50 dark:bg-slate-800/30">
              <div>
                <span className="text-slate-400 block font-medium">
                  {languageMode === 'bn' ? 'বিশেষ খাবার' : 'Must-Try Food'}
                </span>
                <span className="font-bold text-amber-600 dark:text-amber-400">{districtA.quickFacts.mustTryDish}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">
                  {languageMode === 'bn' ? 'বিশেষ খাবার' : 'Must-Try Food'}
                </span>
                <span className="font-bold text-amber-600 dark:text-amber-400">{districtB.quickFacts.mustTryDish}</span>
              </div>
            </div>

            {/* Top Tourist Spots Count */}
            <div className="grid grid-cols-2 p-3">
              <div>
                <span className="text-slate-400 block font-medium">
                  {languageMode === 'bn' 
                    ? `দর্শনীয় স্থান (${toBengaliNumber(districtA.touristSpots.length)}টি)`
                    : `Top Tourist Spots (${districtA.touristSpots.length})`}
                </span>
                <ul className="mt-1 space-y-0.5 text-slate-700 dark:text-slate-300">
                  {districtA.touristSpots.slice(0, 3).map((s) => (
                    <li key={s.name} className="truncate">
                      • {languageMode === 'bn' ? s.bnName : s.name}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">
                  {languageMode === 'bn' 
                    ? `দর্শনীয় স্থান (${toBengaliNumber(districtB.touristSpots.length)}টি)`
                    : `Top Tourist Spots (${districtB.touristSpots.length})`}
                </span>
                <ul className="mt-1 space-y-0.5 text-slate-700 dark:text-slate-300">
                  {districtB.touristSpots.slice(0, 3).map((s) => (
                    <li key={s.name} className="truncate">
                      • {languageMode === 'bn' ? s.bnName : s.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Famous For */}
            <div className="grid grid-cols-2 p-3 bg-slate-50/50 dark:bg-slate-800/30">
              <div>
                <span className="text-slate-400 block font-medium">
                  {languageMode === 'bn' ? 'বিখ্যাত যে কারণে' : 'Famous For'}
                </span>
                <p className="mt-0.5 text-slate-700 dark:text-slate-300 leading-relaxed">{districtA.quickFacts.famousFor}</p>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">
                  {languageMode === 'bn' ? 'বিখ্যাত যে কারণে' : 'Famous For'}
                </span>
                <p className="mt-0.5 text-slate-700 dark:text-slate-300 leading-relaxed">{districtB.quickFacts.famousFor}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Jump buttons */}
        <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={() => {
              onSelectDistrict(districtA);
              onClose();
            }}
            className="py-2 px-3 text-xs font-semibold rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>
              {languageMode === 'bn' ? `${districtA.bnName} অন্বেষণ করুন` : `Explore ${districtA.name}`}
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-500" />
          </button>

          <button
            onClick={() => {
              onSelectDistrict(districtB);
              onClose();
            }}
            className="py-2 px-3 text-xs font-semibold rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>
              {languageMode === 'bn' ? `${districtB.bnName} অন্বেষণ করুন` : `Explore ${districtB.name}`}
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-500" />
          </button>
        </div>
      </div>
    </div>
  );
};
