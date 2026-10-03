import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

export default function InteractiveMap({ 
  workerLat = 18.5590, 
  workerLng = 73.7868, 
  destLat = 18.5620, 
  destLng = 73.7990, 
  destTitle = "Customer Location",
  height = "260px",
  showRoute = true
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Clean up previous map instance if any
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    try {
      const centerLat = (workerLat + destLat) / 2;
      const centerLng = (workerLng + destLng) / 2;

      const map = L.map(mapContainerRef.current, {
        center: [centerLat, centerLng],
        zoom: 14,
        zoomControl: false,
        attributionControl: false
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(map);

      // Add Zoom Control at bottom right
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // Custom Worker Icon
      const workerIcon = L.divIcon({
        className: 'custom-worker-pin',
        html: `<div style="
          width: 32px; 
          height: 32px; 
          background: #2563eb; 
          border: 3px solid #ffffff; 
          border-radius: 50%; 
          box-shadow: 0 4px 12px rgba(37,99,235,0.6); 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          color: white; 
          font-weight: 900; 
          font-size: 13px;
          animation: radar-pulse 2s infinite;
        ">⚡</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      // Custom Destination Icon
      const destIcon = L.divIcon({
        className: 'custom-dest-pin',
        html: `<div style="
          width: 32px; 
          height: 32px; 
          background: #e11d48; 
          border: 3px solid #ffffff; 
          border-radius: 50%; 
          box-shadow: 0 4px 12px rgba(225,29,72,0.6); 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          color: white; 
          font-size: 14px;
        ">📍</div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 30]
      });

      // Add Markers
      const workerMarker = L.marker([workerLat, workerLng], { icon: workerIcon })
        .addTo(map)
        .bindPopup(`<strong>Your Simulated Position</strong><br>Pune Sector 4 Hub`);

      const destMarker = L.marker([destLat, destLng], { icon: destIcon })
        .addTo(map)
        .bindPopup(`<strong>${destTitle}</strong>`);

      // Add polyline route if enabled
      if (showRoute) {
        const midPointLat = (workerLat + destLat) / 2 + 0.001;
        const midPointLng = (workerLng + destLng) / 2 - 0.001;
        const routePoints = [
          [workerLat, workerLng],
          [midPointLat, midPointLng],
          [destLat, destLng]
        ];

        L.polyline(routePoints, {
          color: '#2563eb',
          weight: 4,
          opacity: 0.85,
          dashArray: '8, 8',
          lineCap: 'round'
        }).addTo(map);

        // Fit bounds
        const group = new L.featureGroup([workerMarker, destMarker]);
        map.fitBounds(group.getBounds().pad(0.25));
      }

      mapInstanceRef.current = map;
    } catch (e) {
      console.warn("Leaflet map init warning:", e);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [workerLat, workerLng, destLat, destLng, destTitle, showRoute]);

  const handleOpenGoogleMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${workerLat},${workerLng}&destination=${destLat},${destLng}&travelmode=driving`;
    window.open(url, '_blank');
  };

  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-inner group">
      <div 
        ref={mapContainerRef} 
        style={{ height, width: '100%' }}
        className="z-0"
      />
      
      {/* Floating Map Controls & Badges */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-900/85 text-white backdrop-blur-md border border-white/10 shadow-sm flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
          Live GPS Route Preview
        </span>
      </div>

      <div className="absolute bottom-3 left-3 z-10">
        <button
          type="button"
          onClick={handleOpenGoogleMaps}
          className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <span>Open Navigation</span>
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </button>
      </div>
    </div>
  );
}
