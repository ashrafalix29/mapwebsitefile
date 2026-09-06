import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { InteractiveMap } from './components/InteractiveMap';
import { DistrictSidebar } from './components/DistrictSidebar';
import { WishlistModal } from './components/WishlistModal';
import { CompareModal } from './components/CompareModal';
import { CatalogDrawer } from './components/CatalogDrawer';
import { DISTRICTS, getDistrictsByDivision } from './data/districts';
import { District, DivisionName, LanguageMode, ViewMode } from './types';
import { Grid, Trophy, Compass, MapPin } from 'lucide-react';

export default function App() {
  const [geoJsonData, setGeoJsonData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const [selectedDivision, setSelectedDivision] = useState<DivisionName | 'All'>('All');
  const [languageMode, setLanguageMode] = useState<LanguageMode>('bn');
  const [viewMode, setViewMode] = useState<ViewMode>('vector');

  // Modals state
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  // Local storage for Wishlist & Visited
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('explore_bd_wishlist');
      return saved ? JSON.parse(saved) : ['coxs-bazar', 'sylhet', 'bandarban'];
    } catch {
      return ['coxs-bazar', 'sylhet', 'bandarban'];
    }
  });

  const [visited, setVisited] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('explore_bd_visited');
      return saved ? JSON.parse(saved) : ['dhaka'];
    } catch {
      return ['dhaka'];
    }
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('explore_bd_wishlist', JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('explore_bd_visited', JSON.stringify(visited));
    } catch {}
  }, [visited]);

  // Load GeoJSON data with fallback
  useEffect(() => {
    let isMounted = true;
    async function loadGeoJson() {
      try {
        setLoading(true);
        // Try paths in order
        const candidateUrls = [
          '/data/bd-districts-64.json',
          './data/bd-districts-64.json',
          '/data/bd-districts.json',
          './data/bd-districts.json'
        ];

        let loadedData: any = null;
        for (const url of candidateUrls) {
          try {
            const res = await fetch(url);
            if (!res.ok) continue;
            const text = await res.text();
            // Verify it's JSON not HTML fallback
            if (text.trim().startsWith('{')) {
              loadedData = JSON.parse(text);
              if (loadedData?.features?.length) break;
            }
          } catch {
            // try next candidate
          }
        }

        if (isMounted) {
          if (loadedData) {
            setGeoJsonData(loadedData);
          } else {
            console.warn('Could not load GeoJSON from standard paths, fallback initiated');
          }
        }
      } catch (err) {
        console.error('Failed to load Bangladesh GeoJSON:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    loadGeoJson();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filtered districts according to division
  const currentDistricts = useMemo(() => {
    return getDistrictsByDivision(selectedDivision);
  }, [selectedDivision]);

  // Toggle wishlist
  const handleToggleWishlist = useCallback((d: District) => {
    setWishlist((prev) => 
      prev.includes(d.id) ? prev.filter((id) => id !== d.id) : [...prev, d.id]
    );
  }, []);

  // Toggle visited
  const handleToggleVisited = useCallback((d: District) => {
    setVisited((prev) => 
      prev.includes(d.id) ? prev.filter((id) => id !== d.id) : [...prev, d.id]
    );
  }, []);

  // Previous / Next District navigation
  const handleSelectPrevious = useCallback(() => {
    if (!DISTRICTS.length) return;
    const pool = currentDistricts.length ? currentDistricts : DISTRICTS;
    if (!selectedDistrict) {
      setSelectedDistrict(pool[0]);
      return;
    }
    const idx = pool.findIndex((d) => d.id === selectedDistrict.id);
    const prevIdx = (idx - 1 + pool.length) % pool.length;
    setSelectedDistrict(pool[prevIdx]);
  }, [selectedDistrict, currentDistricts]);

  const handleSelectNext = useCallback(() => {
    if (!DISTRICTS.length) return;
    const pool = currentDistricts.length ? currentDistricts : DISTRICTS;
    if (!selectedDistrict) {
      setSelectedDistrict(pool[0]);
      return;
    }
    const idx = pool.findIndex((d) => d.id === selectedDistrict.id);
    const nextIdx = (idx + 1) % pool.length;
    setSelectedDistrict(pool[nextIdx]);
  }, [selectedDistrict, currentDistricts]);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.key === 'Escape') {
        setSelectedDistrict(null);
        setIsWishlistOpen(false);
        setIsCompareOpen(false);
        setIsCatalogOpen(false);
      } else if (e.key === 'ArrowRight') {
        handleSelectNext();
      } else if (e.key === 'ArrowLeft') {
        handleSelectPrevious();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSelectNext, handleSelectPrevious]);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      
      {/* Top Navigation Bar */}
      <Navbar
        selectedDistrict={selectedDistrict}
        onSelectDistrict={(d) => setSelectedDistrict(d)}
        selectedDivision={selectedDivision}
        onSelectDivision={(div) => setSelectedDivision(div)}
        languageMode={languageMode}
        onChangeLanguageMode={setLanguageMode}
        viewMode={viewMode}
        onChangeViewMode={setViewMode}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        wishlistCount={wishlist.length}
        visitedCount={visited.length}
        onOpenCompare={() => setIsCompareOpen(true)}
        allDistricts={DISTRICTS}
      />

      {/* Main Content Area (Split screen: Map Canvas on Left, Details on Right) */}
      <main className="flex-1 flex flex-col lg:flex-row relative overflow-hidden">
        
        {/* Interactive Map Canvas */}
        <div className="flex-1 h-full relative overflow-hidden flex flex-col">
          {loading ? (
            <div className="flex-1 flex items-center justify-center bg-slate-100 dark:bg-slate-900">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {languageMode === 'bn' ? '৬৪ জেলার মানচিত্র লোড হচ্ছে...' : 'Initializing 64 Districts Map...'}
                </p>
              </div>
            </div>
          ) : (
            <InteractiveMap
              geoJsonData={geoJsonData}
              districts={DISTRICTS}
              selectedDistrict={selectedDistrict}
              onSelectDistrict={(d) => {
                setSelectedDistrict((current) => current?.id === d.id ? null : d);
              }}
              selectedDivision={selectedDivision}
              languageMode={languageMode}
              viewMode={viewMode}
            />
          )}

          {/* Quick Floating Action: Gallery Drawer button */}
          <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
            <button
              id="open-catalog-floating-btn"
              onClick={() => setIsCatalogOpen(true)}
              className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500/50 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Grid className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="hidden sm:inline">{languageMode === 'bn' ? 'সকল ৬৪ জেলা দেখুন' : 'Browse All 64 Districts'}</span>
            </button>
          </div>
        </div>

        {/* Right Details Sidebar (Desktop responsive / Mobile slide-over) */}
        {selectedDistrict && (
          <div className="fixed lg:relative inset-x-0 bottom-0 top-16 lg:top-0 z-40 lg:z-10 flex flex-col lg:h-full bg-black/40 lg:bg-transparent backdrop-blur-xs lg:backdrop-blur-none animate-in fade-in">
            <div className="h-full ml-auto w-full lg:w-auto">
              <DistrictSidebar
                district={selectedDistrict}
                onClose={() => setSelectedDistrict(null)}
                languageMode={languageMode}
                isWishlisted={wishlist.includes(selectedDistrict.id)}
                isVisited={visited.includes(selectedDistrict.id)}
                onToggleWishlist={handleToggleWishlist}
                onToggleVisited={handleToggleVisited}
                onSelectPrevious={handleSelectPrevious}
                onSelectNext={handleSelectNext}
              />
            </div>
          </div>
        )}

      </main>

      {/* Modals */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        visited={visited}
        allDistricts={DISTRICTS}
        onSelectDistrict={(d) => setSelectedDistrict(d)}
        onRemoveWishlist={(id) => setWishlist((prev) => prev.filter((i) => i !== id))}
        onRemoveVisited={(id) => setVisited((prev) => prev.filter((i) => i !== id))}
        languageMode={languageMode}
      />

      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        allDistricts={DISTRICTS}
        initialDistrictA={selectedDistrict}
        onSelectDistrict={(d) => setSelectedDistrict(d)}
        languageMode={languageMode}
      />

      <CatalogDrawer
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
        districts={DISTRICTS}
        onSelectDistrict={(d) => setSelectedDistrict(d)}
        languageMode={languageMode}
        selectedDivision={selectedDivision}
        onSelectDivision={setSelectedDivision}
      />

    </div>
  );
}
