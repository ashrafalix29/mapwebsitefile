import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import * as d3Geo from 'd3-geo';
import L from 'leaflet';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  MapPin, 
  Layers, 
  Eye, 
  Compass, 
  Info
} from 'lucide-react';
import { District, DivisionName, LanguageMode, ViewMode } from '../types';
import { DIVISIONS } from '../data/divisions';
import { UI_TEXTS, DIVISION_BN_NAMES } from '../utils/localization';

interface InteractiveMapProps {
  geoJsonData: any;
  districts: District[];
  selectedDistrict: District | null;
  onSelectDistrict: (district: District) => void;
  selectedDivision: DivisionName | 'All';
  languageMode: LanguageMode;
  viewMode: ViewMode;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  geoJsonData,
  districts,
  selectedDistrict,
  onSelectDistrict,
  selectedDivision,
  languageMode,
  viewMode
}) => {
  // Container ref
  const containerRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const leafletGeoJsonLayerRef = useRef<L.GeoJSON | null>(null);
  const [leafletTileType, setLeafletTileType] = useState<'blank' | 'osm'>('blank');

  // Vector SVG Zoom & Pan state
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Hover state (polygon highlight only, no mouse-following popup)
  const [hoveredDistrict, setHoveredDistrict] = useState<District | null>(null);

  // District lookup map by GeoJSON ADM2_EN name
  // Use district id as primary key to avoid collisions from duplicate lowercase names
  const geoDistrictMap = useMemo(() => {
    const map = new Map<string, District>();
    districts.forEach((d) => {
      map.set(d.id, d);
      map.set(d.geoName.toLowerCase(), d);
      map.set(d.name.toLowerCase(), d);
    });
    return map;
  }, [districts]);

  // Width & height of SVG canvas
  const [dimensions, setDimensions] = useState({ width: 800, height: 700 });

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          setDimensions({ width, height });
        }
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Compute D3 Mercator projection fitted to Bangladesh GeoJSON
  const projection = useMemo(() => {
    if (!geoJsonData) return null;
    const proj = d3Geo.geoMercator();
    proj.fitSize([dimensions.width, dimensions.height], geoJsonData);
    return proj;
  }, [geoJsonData, dimensions]);

  const pathGenerator = useMemo(() => {
    if (!projection) return null;
    return d3Geo.geoPath().projection(projection);
  }, [projection]);

  const labelFontSize = Math.max(
    5,
    Math.min(7.2, Math.min(dimensions.width, dimensions.height) / 100)
  );
  const labelMaxWidth = Math.max(30, Math.min(88, dimensions.width * 0.11));

  // Precompute visual centroids for all 64 districts
  const districtCentroids = useMemo(() => {
    const map = new Map<string, [number, number]>();
    if (!geoJsonData || !pathGenerator || !projection) return map;

    geoJsonData.features.forEach((feature: any) => {
      const adm2 = (feature?.properties?.ADM2_EN || '').toLowerCase();
      const centroid = pathGenerator.centroid(feature);
      if (centroid && Number.isFinite(centroid[0]) && Number.isFinite(centroid[1])) {
        map.set(adm2, centroid as [number, number]);
      }
    });

    districts.forEach((d) => {
      const k1 = d.geoName.toLowerCase();
      const k2 = d.name.toLowerCase();
      if (!map.has(k1) && !map.has(k2)) {
        const pt = projection([d.lng, d.lat]);
        if (pt && Number.isFinite(pt[0]) && Number.isFinite(pt[1])) {
          map.set(k1, pt as [number, number]);
          map.set(k2, pt as [number, number]);
        }
      }
    });

    return map;
  }, [geoJsonData, pathGenerator, projection, districts]);

  const districtBounds = useMemo(() => {
    const map = new Map<string, [[number, number], [number, number]]>();
    if (!geoJsonData || !pathGenerator) return map;

    geoJsonData.features.forEach((feature: any) => {
      const adm2 = (feature?.properties?.ADM2_EN || '').toLowerCase();
      const bounds = pathGenerator.bounds(feature);
      if (bounds?.[0] && bounds?.[1]) {
        map.set(adm2, bounds as [[number, number], [number, number]]);
      }
    });

    return map;
  }, [geoJsonData, pathGenerator]);

  // Reset SVG view
  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Zoom handlers
  const handleZoomIn = () => setZoom((z) => Math.min(z * 1.3, 4.5));
  const handleZoomOut = () => setZoom((z) => Math.max(z / 1.3, 0.65));

  // Mouse drag handlers for Vector Map pan
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  // Wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.15 : 0.88;
    setZoom((z) => Math.min(Math.max(z * factor, 0.6), 5));
  };

  // -------------------------------------------------------------
  // LEAFLET MAP INITIALIZATION & SYNC
  // -------------------------------------------------------------
  const leafletContainerRef = useRef<HTMLDivElement>(null);

  // Compute Leaflet polygon style based on selection and division filter
  const getLeafletFeatureStyle = useCallback(
    (feature: any) => {
      const adm2 = feature?.properties?.ADM2_EN || '';
      const district = geoDistrictMap.get(adm2.toLowerCase());
      const isSelected = selectedDistrict?.id === district?.id;
      const division = district?.division;
      const divInfo = division ? DIVISIONS[division] : null;
      const baseColor = divInfo?.color || '#006A4E';

      const isDivisionFiltered = selectedDivision !== 'All' && district?.division !== selectedDivision;

      return {
        fillColor: baseColor,
        fillOpacity: isSelected ? 0.85 : isDivisionFiltered ? 0.15 : 0.55,
        color: isSelected ? '#0f172a' : '#ffffff',
        weight: isSelected ? 3 : 1.2,
        opacity: 1,
        dashArray: isSelected ? '' : '1, 1'
      };
    },
    [geoDistrictMap, selectedDistrict, selectedDivision]
  );

  // 1. Initialize Map once when component mounts
  useEffect(() => {
    if (!leafletContainerRef.current) return;

    if (!leafletMapRef.current) {
      // Center of Bangladesh roughly lat 23.85, lng 90.15
      const map = L.map(leafletContainerRef.current, {
        center: [23.85, 90.15],
        zoom: 7,
        zoomControl: false,
        attributionControl: false
      });

      L.control.zoom({ position: 'bottomright' }).addTo(map);
      leafletMapRef.current = map;
    }

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
        leafletGeoJsonLayerRef.current = null;
      }
    };
  }, []);

  // 2. Handle base tile layer changes ('blank' vs 'osm')
  useEffect(() => {
    const map = leafletMapRef.current;
    if (!map) return;

    // Clear existing tile layers
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    if (leafletTileType === 'osm') {
      const tileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors'
      });
      tileLayer.addTo(map);
      if (leafletGeoJsonLayerRef.current) {
        leafletGeoJsonLayerRef.current.bringToFront();
      }
    }
  }, [leafletTileType]);

  // 3. Load GeoJSON layer once when geoJsonData is ready
  useEffect(() => {
    const map = leafletMapRef.current;
    if (!map || !geoJsonData) return;

    if (leafletGeoJsonLayerRef.current) {
      map.removeLayer(leafletGeoJsonLayerRef.current);
      leafletGeoJsonLayerRef.current = null;
    }

    const geoJsonLayer = L.geoJSON(geoJsonData, {
      style: (feature: any) => getLeafletFeatureStyle(feature),
      onEachFeature: (feature: any, layer: any) => {
        const adm2 = feature?.properties?.ADM2_EN || '';
        const district = geoDistrictMap.get(adm2.toLowerCase());

        if (district) {
          const tooltipContent = languageMode === 'en'
            ? `<strong>${district.name}</strong>`
            : languageMode === 'bn'
              ? `<strong>${district.bnName}</strong>`
              : `<strong>${district.name}</strong> (${district.bnName})`;

          layer.bindTooltip(
            `<div style="text-align:center; font-family:'Plus Jakarta Sans','Hind Siliguri',sans-serif; font-size:12px;">${tooltipContent}<br/><span style="color:${DIVISIONS[district.division].color}; font-weight:600;">● ${languageMode === 'bn' ? district.divisionBn : district.division}</span></div>`,
            { sticky: false, direction: 'center', className: 'leaflet-custom-tooltip' }
          );

          layer.on({
            mouseover: (e: any) => {
              const target = e.target;
              target.setStyle({
                weight: 3,
                color: '#ffffff',
                fillOpacity: 0.9
              });
              setHoveredDistrict(district);
            },
            mouseout: () => {
              if (leafletGeoJsonLayerRef.current) {
                leafletGeoJsonLayerRef.current.resetStyle(layer);
              }
              setHoveredDistrict(null);
            },
            click: (e: any) => {
              L.DomEvent.stopPropagation(e);
              onSelectDistrict(district);
            }
          });
        }
      }
    });

    geoJsonLayer.addTo(map);
    leafletGeoJsonLayerRef.current = geoJsonLayer;
  }, [geoJsonData, geoDistrictMap, onSelectDistrict, getLeafletFeatureStyle]);

  // 4. Update polygon styles smoothly without reconstructing layers
  useEffect(() => {
    if (leafletGeoJsonLayerRef.current) {
      leafletGeoJsonLayerRef.current.setStyle((feature: any) => getLeafletFeatureStyle(feature));
    }
  }, [getLeafletFeatureStyle]);

  // 5. Invalidate map size whenever viewMode switches to Leaflet
  useEffect(() => {
    if (viewMode === 'leaflet' && leafletMapRef.current) {
      const map = leafletMapRef.current;
      const timer = setTimeout(() => {
        try {
          map.invalidateSize();
        } catch {
          // ignore
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [viewMode]);

  // 6. Safely pan/fly to selected district in Leaflet mode without animation collision or NaN coordinates
  useEffect(() => {
    if (viewMode === 'leaflet' && leafletMapRef.current && selectedDistrict) {
      const map = leafletMapRef.current;
      const lat = selectedDistrict.lat;
      const lng = selectedDistrict.lng;

      if (typeof lat === 'number' && Number.isFinite(lat) && typeof lng === 'number' && Number.isFinite(lng)) {
        const timer = setTimeout(() => {
          try {
            map.stop();
            map.invalidateSize();
            const size = map.getSize();
            if (size.x > 0 && size.y > 0) {
              map.flyTo([lat, lng], 9, {
                duration: 0.8
              });
            } else {
              map.setView([lat, lng], 9);
            }
          } catch (err) {
            console.warn('Leaflet navigation error:', err);
          }
        }, 50);
        return () => clearTimeout(timer);
      }
    }
  }, [selectedDistrict, viewMode]);

  return (
    <div 
      ref={containerRef}
      id="map-canvas-container"
      className="relative w-full h-full min-h-0 md:min-h-[640px] bg-slate-50 dark:bg-slate-950 overflow-hidden select-none border-slate-200 dark:border-slate-800"
    >
      {/* ----------------- VECTOR SVG MAP ----------------- */}
      <div
        className={`w-full h-full cursor-grab active:cursor-grabbing relative overflow-hidden ${
          viewMode === 'vector' ? 'block' : 'hidden'
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          setIsDragging(false);
          setHoveredDistrict(null);
        }}
        onWheel={handleWheel}
      >
          {pathGenerator && geoJsonData ? (
            <svg
              id="bangladesh-vector-map-svg"
              width="100%"
              height="100%"
              viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
              className="w-full h-full"
            >
              {/* Filter definitions for shadows and glow */}
              <defs>
                <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000000" floodOpacity="0.25" />
                </filter>
                <filter id="active-glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#059669" floodOpacity="0.4" />
                </filter>
              </defs>

              {/* Pan and Zoom Layer */}
              <g
                transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}
                style={{
                  transformOrigin: `${dimensions.width / 2}px ${dimensions.height / 2}px`,
                  transition: isDragging ? 'none' : 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {/* 64 District Polygons */}
                {geoJsonData.features.map((feature: any, idx: number) => {
                  const adm2 = feature?.properties?.ADM2_EN || '';
                  const district = geoDistrictMap.get(adm2.toLowerCase());
                  const pathData = pathGenerator(feature);
                  if (!pathData) return null;

                  const isSelected = selectedDistrict?.id === district?.id;
                  const isHovered = hoveredDistrict?.id === district?.id;
                  const divInfo = district ? DIVISIONS[district.division] : null;
                  const baseColor = divInfo?.color || '#006A4E';

                  const isDivisionFiltered = selectedDivision !== 'All' && district?.division !== selectedDivision;

                  return (
                    <path
                      key={`district-path-${idx}-${adm2}`}
                      id={`district-polygon-${district?.id || adm2}`}
                      d={pathData}
                      fill={baseColor}
                      fillOpacity={
                        isSelected 
                          ? 0.95 
                          : isHovered 
                            ? 0.85 
                            : isDivisionFiltered 
                              ? 0.15 
                              : 0.65
                      }
                      stroke={isSelected ? '#0f172a' : isHovered ? '#ffffff' : '#ffffff'}
                      strokeWidth={isSelected ? 2.5 : isHovered ? 2 : 0.75}
                      className="transition-all duration-150 cursor-pointer"
                      style={{
                        filter: isSelected ? 'url(#active-glow)' : isHovered ? 'url(#glow-filter)' : 'none'
                      }}
                      onMouseEnter={() => district && setHoveredDistrict(district)}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (district) {
                          onSelectDistrict(district);
                        }
                      }}
                    />
                  );
                })}

                {/* District Name Labels Directly On Map (Compact and Clean) */}
                {districts
                  .filter((d) => (selectedDivision === 'All' || d.division === selectedDivision) && selectedDistrict?.id !== d.id)
                  .map((d) => {
                    const centroid = districtCentroids.get(d.geoName.toLowerCase()) ||
                                     districtCentroids.get(d.name.toLowerCase());
                    if (!centroid) return null;
                    const isSelected = selectedDistrict?.id === d.id;
                    const isHovered = hoveredDistrict?.id === d.id;

                    const labelText = languageMode === 'en'
                      ? d.name
                      : languageMode === 'bn'
                        ? d.bnName
                        : `${d.bnName} / ${d.name}`;
                    const fontSize = labelFontSize * (isSelected ? 1.18 : isHovered ? 1.08 : 1);
                    const estimatedWidth = labelText.length * fontSize * 0.55;
                    const bounds = districtBounds.get(d.geoName.toLowerCase()) ||
                                   districtBounds.get(d.name.toLowerCase());
                    const districtWidth = bounds ? bounds[1][0] - bounds[0][0] : labelMaxWidth;
                    const fittedWidth = Math.min(estimatedWidth, labelMaxWidth, Math.max(24, districtWidth * 0.72));

                    return (
                      <g 
                        key={`label-${d.id}`}
                        transform={`translate(${centroid[0]}, ${centroid[1]})`}
                        className="pointer-events-none transition-transform duration-100"
                      >
                        <text
                          x={0}
                          y={2.5}
                          textAnchor="middle"
                          fontSize={fontSize}
                          textLength={estimatedWidth > labelMaxWidth ? fittedWidth : undefined}
                          lengthAdjust={estimatedWidth > labelMaxWidth ? "spacingAndGlyphs" : undefined}
                          fontWeight={isSelected ? "800" : isHovered ? "700" : "600"}
                          fill={isSelected ? "#064e3b" : "#0f172a"}
                          opacity={isHovered ? 0.65 : 0.5}
                          stroke="#ffffff"
                          strokeWidth="0.8"
                          paintOrder="stroke"
                          className="select-none district-map-label"
                        >
                          {labelText}
                        </text>
                      </g>
                    );
                  })}

                {/* Anchored Selected District Marker (Fixed to Map Spot, Never Moves With Mouse) */}
                {selectedDistrict && (() => {
                  const centroid = districtCentroids.get(selectedDistrict.geoName.toLowerCase()) ||
                                   districtCentroids.get(selectedDistrict.name.toLowerCase());
                  if (!centroid) return null;

                  const displayName = languageMode === 'en'
                    ? selectedDistrict.name
                    : languageMode === 'bn'
                      ? selectedDistrict.bnName
                      : `${selectedDistrict.bnName} / ${selectedDistrict.name}`;
                  const displayInfo = languageMode === 'bn'
                    ? `${selectedDistrict.areaKm2.toLocaleString()} কিমি² • ${selectedDistrict.divisionBn}`
                    : languageMode === 'en'
                      ? `${selectedDistrict.areaKm2.toLocaleString()} km² • ${selectedDistrict.division}`
                      : `${selectedDistrict.areaKm2.toLocaleString()} km² • ${selectedDistrict.divisionBn}`;
                  const summarySource = languageMode === 'en'
                    ? selectedDistrict.tagline
                    : selectedDistrict.taglineBn;
                  const displaySummary = summarySource.length > 42
                    ? `${summarySource.slice(0, 42)}...`
                    : summarySource;
                  const nameWidth = displayName.length * 4.2;
                  const infoWidth = displayInfo.length * 2.5;
                  const summaryWidth = displaySummary.length * 1.8;
                  const badgeWidth = Math.min(150, Math.max(100, nameWidth, infoWidth + 10, summaryWidth + 10));

                  return (
                    <g 
                      key={`anchored-pin-${selectedDistrict.id}`}
                      transform={`translate(${centroid[0]}, ${centroid[1]})`}
                      className="pointer-events-none animate-in fade-in zoom-in-95 duration-150"
                    >
                      {/* Pulsing Beacon Ring */}
                      <circle r={9} fill="#10b981" fillOpacity={0.35} className="animate-ping" />
                      {/* Center Point */}
                      <circle r={3.5} fill="#059669" stroke="#ffffff" strokeWidth={1.5} />
                      <circle r={1.5} fill="#ffffff" />

                      {/* In-Place Anchored Badge Above Spot */}
                      <g transform="translate(0, -11)">
                        <rect
                          x={-badgeWidth / 2}
                          y={-38}
                          width={badgeWidth}
                          height={39}
                          rx={8}
                          fill="#0f172a"
                          fillOpacity={0.92}
                          stroke="#10b981"
                          strokeWidth={1}
                        />
                        <text
                          x={0}
                          y={-25}
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="8"
                          fontWeight="700"
                          textLength={nameWidth > badgeWidth - 10 ? badgeWidth - 10 : undefined}
                          lengthAdjust="spacingAndGlyphs"
                          className="district-map-label"
                        >
                          {displayName}
                        </text>
                        <text
                          x={0}
                          y={-15}
                          textAnchor="middle"
                          fill="#a7f3d0"
                          fontSize="5"
                          fontWeight="600"
                          textLength={infoWidth > badgeWidth - 10 ? badgeWidth - 10 : undefined}
                          lengthAdjust="spacingAndGlyphs"
                          className="district-map-label"
                        >
                          {displayInfo}
                        </text>
                        <text
                          x={0}
                          y={-5}
                          textAnchor="middle"
                          fill="#d1fae5"
                          fontSize="3.8"
                          fontWeight="500"
                          textLength={summaryWidth > badgeWidth - 10 ? badgeWidth - 10 : undefined}
                          lengthAdjust="spacingAndGlyphs"
                          className="district-map-label"
                        >
                          {displaySummary}
                        </text>
                      </g>
                    </g>
                  );
                })()}
              </g>
            </svg>
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400">
              <div className="text-center space-y-2">
                <Compass className="w-8 h-8 animate-spin mx-auto text-emerald-600" />
                <p className="text-sm">Loading Bangladesh Map Polygons...</p>
              </div>
            </div>
          )}
        </div>

        {/* ----------------- LEAFLET MAP VIEW ----------------- */}
        <div className={`w-full h-full relative bg-slate-100 dark:bg-slate-950 ${viewMode === 'leaflet' ? 'block' : 'hidden'}`}>
          <div ref={leafletContainerRef} id="leaflet-map-canvas" className="w-full h-full bg-slate-100 dark:bg-slate-950" />
          
          {/* Leaflet Mode Controls */}
          <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-0.5 sm:p-1 rounded-lg sm:rounded-xl shadow-md border border-slate-200 dark:border-slate-800 flex items-center gap-0.5 sm:gap-1">
            <button
              id="tile-blank-btn"
              type="button"
              onClick={() => setLeafletTileType('blank')}
              className={`px-1.5 sm:px-2.5 py-1 text-[10px] sm:text-xs rounded-md sm:rounded-lg font-medium transition-all ${
                leafletTileType === 'blank'
                  ? 'bg-emerald-600 text-white shadow-2xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <span className="sm:hidden">Blank</span>
              <span className="hidden sm:inline">Blank Canvas (Pure BD)</span>
            </button>
            <button
              id="tile-osm-btn"
              type="button"
              onClick={() => setLeafletTileType('osm')}
              className={`px-1.5 sm:px-2.5 py-1 text-[10px] sm:text-xs rounded-md sm:rounded-lg font-medium transition-all ${
                leafletTileType === 'osm'
                  ? 'bg-emerald-600 text-white shadow-2xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <span className="sm:hidden">OSM</span>
              <span className="hidden sm:inline">OpenStreetMap</span>
            </button>
          </div>
        </div>

      {/* Floating Zoom & Controls (Vector Mode) */}
      {viewMode === 'vector' && (
        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-20 flex flex-col gap-0 sm:gap-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-0.5 sm:p-1.5 rounded-md sm:rounded-xl border border-slate-200/80 dark:border-slate-800/80 shadow-md">
          <button
            id="map-zoom-in-button"
            onClick={handleZoomIn}
            title="Zoom In"
            className="p-1 sm:p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded sm:rounded-lg transition-all"
          >
            <ZoomIn className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
          <button
            id="map-zoom-out-button"
            onClick={handleZoomOut}
            title="Zoom Out"
            className="p-1 sm:p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded sm:rounded-lg transition-all"
          >
            <ZoomOut className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
          <button
            id="map-reset-button"
            onClick={handleResetView}
            title="Reset Map View"
            className="p-1 sm:p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded sm:rounded-lg transition-all"
          >
            <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>
      )}

      {/* Bottom Floating Legend */}
      <div 
        id="division-legend-pill"
        className="absolute bottom-4 left-4 z-20 hidden md:flex items-center gap-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-200/80 dark:border-slate-800/80 shadow-md text-xs"
      >
        <span className="font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-slate-500" />
          <span>{UI_TEXTS[languageMode].divisionsLegend}</span>
        </span>
        <div className="flex items-center gap-2.5">
          {Object.values(DIVISIONS).map((d) => (
            <div key={d.name} className="flex items-center gap-1">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: d.color }}
              />
              <span className="text-slate-600 dark:text-slate-400 text-[11px]">
                {languageMode === 'en' ? d.name : languageMode === 'bn' ? d.bnName : `${d.name} (${d.bnName})`}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Prompt banner if no district is selected (Vector Mode) */}
      {!selectedDistrict && viewMode === 'vector' && (
        <div className="absolute top-4 right-4 z-10 hidden sm:flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 px-3.5 py-2 rounded-xl text-xs font-medium shadow-xs">
          <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>{UI_TEXTS[languageMode].mapHint}</span>
        </div>
      )}
    </div>
  );
};
