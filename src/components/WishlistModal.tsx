import React from 'react';
import { X, Heart, CheckCircle2, Trash2, Trophy, Compass } from 'lucide-react';
import { District, LanguageMode } from '../types';
import { toBengaliNumber } from '../utils/localization';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: string[]; // district IDs
  visited: string[]; // district IDs
  allDistricts: District[];
  onSelectDistrict: (district: District) => void;
  onRemoveWishlist: (id: string) => void;
  onRemoveVisited: (id: string) => void;
  languageMode: LanguageMode;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlist,
  visited,
  allDistricts,
  onSelectDistrict,
  onRemoveWishlist,
  onRemoveVisited,
  languageMode
}) => {
  const [activeTab, setActiveTab] = React.useState<'visited' | 'wishlist'>('visited');

  if (!isOpen) return null;

  const districtMap = new Map(allDistricts.map((d) => [d.id, d]));
  const visitedDistricts = visited.map((id) => districtMap.get(id)).filter(Boolean) as District[];
  const wishlistDistricts = wishlist.map((id) => districtMap.get(id)).filter(Boolean) as District[];

  const progressPct = Math.round((visited.length / 64) * 100);

  const getDistrictName = (d: District) => {
    if (languageMode === 'en') return d.name;
    if (languageMode === 'bn') return d.bnName;
    return `${d.name} (${d.bnName})`;
  };

  const getDivisionName = (d: District) => {
    if (languageMode === 'bn') return `${d.divisionBn} বিভাগ`;
    return `${d.division} Division`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
      <div 
        id="wishlist-modal-card"
        className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                {languageMode === 'bn' ? 'ভ্রমণ অগ্রগতি ও প্রিয় তালিকা' : 'Explorer Progress & Bucket List'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {languageMode === 'bn'
                  ? 'বাংলাদেশের ৬৪ জেলায় আপনার ভ্রমণের অগ্রগতি ট্র্যাক করুন'
                  : 'Track your journey across all 64 districts of Bangladesh'}
              </p>
            </div>
          </div>

          <button
            id="close-wishlist-modal-btn"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-5 py-4 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
            <span className="text-slate-700 dark:text-slate-300">
              {languageMode === 'bn'
                ? `বাংলাদেশ ভ্রমণ: ${toBengaliNumber(visited.length)} / ৬৪ জেলা`
                : `Bangladesh Explored: ${visited.length} / 64 Districts`}
            </span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">
              {languageMode === 'bn' ? `${toBengaliNumber(progressPct)}%` : `${progressPct}%`}
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800">
          <button
            id="wishlist-tab-visited"
            onClick={() => setActiveTab('visited')}
            className={`flex-1 py-3 text-xs font-semibold flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'visited'
                ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>
              {languageMode === 'bn' 
                ? `ভ্রমণ সম্পন্ন (${toBengaliNumber(visited.length)})` 
                : `Visited (${visited.length})`}
            </span>
          </button>

          <button
            id="wishlist-tab-wishlist"
            onClick={() => setActiveTab('wishlist')}
            className={`flex-1 py-3 text-xs font-semibold flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'wishlist'
                ? 'border-rose-500 text-rose-600 dark:text-rose-400 bg-rose-50/50 dark:bg-rose-950/20'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>
              {languageMode === 'bn' 
                ? `ইচ্ছেতালিকা (${toBengaliNumber(wishlist.length)})` 
                : `Wishlist (${wishlist.length})`}
            </span>
          </button>
        </div>

        {/* List Content */}
        <div className="p-4 overflow-y-auto flex-1 divide-y divide-slate-100 dark:divide-slate-800/60">
          {activeTab === 'visited' ? (
            visitedDistricts.length === 0 ? (
              <div className="text-center py-10 text-slate-400 space-y-2">
                <Compass className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-600 animate-bounce" />
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {languageMode === 'bn'
                    ? 'এখনও কোনো জেলা ভ্রমণ সম্পন্ন হিসেবে চিহ্নিত করা হয়নি!'
                    : 'No districts marked as visited yet!'}
                </p>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  {languageMode === 'bn'
                    ? 'ম্যাপ থেকে যেকোনো জেলায় ক্লিক করে টিকমার্ক বাটনে চাপ দিন।'
                    : 'Click on any district from the map and tap the checkmark icon to log your journeys.'}
                </p>
              </div>
            ) : (
              visitedDistricts.map((d) => (
                <div
                  key={d.id}
                  className="py-2.5 flex items-center justify-between gap-3 group"
                >
                  <button
                    onClick={() => {
                      onSelectDistrict(d);
                      onClose();
                    }}
                    className="flex items-center gap-3 text-left flex-1 min-w-0 cursor-pointer"
                  >
                    <img
                      src={d.coverImage}
                      alt={d.name}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1588083949404-c4f1ed1323b3?w=800&auto=format&fit=crop&q=80';
                      }}
                      className="w-10 h-10 rounded-lg object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 truncate">
                          {getDistrictName(d)}
                        </span>
                        {languageMode === 'both' && (
                          <span className="text-xs text-slate-400 font-bangla shrink-0">
                            ({d.bnName})
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block truncate">
                        {getDivisionName(d)} • {d.quickFacts.famousFor}
                      </span>
                    </div>
                  </button>

                  <button
                    onClick={() => onRemoveVisited(d.id)}
                    title={languageMode === 'bn' ? 'তালিকা থেকে মুছুন' : 'Remove from visited'}
                    className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg transition-colors shrink-0 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )
          ) : (
            wishlistDistricts.length === 0 ? (
              <div className="text-center py-10 text-slate-400 space-y-2">
                <Heart className="w-10 h-10 mx-auto text-rose-300 dark:text-rose-900" />
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {languageMode === 'bn'
                    ? 'আপনার ভ্রমণ ইচ্ছেতালিকা ফাঁকা!'
                    : 'Your travel wishlist is empty!'}
                </p>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  {languageMode === 'bn'
                    ? 'যেকোনো জেলার সাইডবারে থাকা হার্ট আইকনে ক্লিক করে পরবর্তী ভ্রমণের জন্য সেভ করুন।'
                    : 'Click the heart icon on any district to save it to your future travel itinerary.'}
                </p>
              </div>
            ) : (
              wishlistDistricts.map((d) => (
                <div
                  key={d.id}
                  className="py-2.5 flex items-center justify-between gap-3 group"
                >
                  <button
                    onClick={() => {
                      onSelectDistrict(d);
                      onClose();
                    }}
                    className="flex items-center gap-3 text-left flex-1 min-w-0 cursor-pointer"
                  >
                    <img
                      src={d.coverImage}
                      alt={d.name}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1588083949404-c4f1ed1323b3?w=800&auto=format&fit=crop&q=80';
                      }}
                      className="w-10 h-10 rounded-lg object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-rose-600 truncate">
                          {getDistrictName(d)}
                        </span>
                        {languageMode === 'both' && (
                          <span className="text-xs text-slate-400 font-bangla shrink-0">
                            ({d.bnName})
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block truncate">
                        {getDivisionName(d)} • {languageMode === 'bn' ? 'বিশেষ পদ:' : 'Must try:'} {d.quickFacts.mustTryDish}
                      </span>
                    </div>
                  </button>

                  <button
                    onClick={() => onRemoveWishlist(d.id)}
                    title={languageMode === 'bn' ? 'ইচ্ছেতালিকা থেকে মুছুন' : 'Remove from wishlist'}
                    className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg transition-colors shrink-0 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )
          )}
        </div>

        {/* Footer info */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 text-center">
          <p className="text-xs text-slate-400">
            {languageMode === 'bn'
              ? 'আপনার ভ্রমণ তালিকা স্বয়ংক্রিয়ভাবে ব্রাউজারে সংরক্ষিত থাকবে।'
              : 'Progress is automatically saved in your browser storage.'}
          </p>
        </div>
      </div>
    </div>
  );
};
