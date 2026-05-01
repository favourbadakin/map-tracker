"use client";

import { useEffect, useRef } from "react";
import type { Location } from "../data/locations";
import { categoryColors } from "../data/locations";

type Props = {
  locations: Location[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export default function WorkMap({ locations, selectedId, onSelect }: Props) {
  const mapRef = useRef<any>(null);
  const containerId = "map-container";
  const markersRef = useRef<any[]>([]);
  const userMarkerRef = useRef<any>(null);
  const watchIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const init = async () => {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }

      const container = document.getElementById(containerId);
      if (!container) return;

      const map = L.map(containerId, {
        center: [6.5244, 3.3792],
        zoom: 11,
        zoomControl: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
        maxZoom: 19,
      }).addTo(map);

      L.control.zoom({ position: "bottomright" }).addTo(map);

      mapRef.current = map;
      markersRef.current = [];

      locations.forEach((loc) => {
        const color = categoryColors[loc.category];
        const isSelected = loc.id === selectedId;

        const svgIcon = L.divIcon({
          className: "",
          html: `
            <div style="display:flex;flex-direction:column;align-items:center;cursor:pointer">
              <div style="
                position:relative;
                width:${isSelected ? 40 : 32}px;
                height:${isSelected ? 40 : 32}px;
                background:${color};
                border-radius:50% 50% 50% 0;
                transform:rotate(-45deg);
                border:3px solid white;
                box-shadow:0 4px 20px ${color}88;
                transition:all 0.2s;
              ">
                <div style="
                  position:absolute;
                  inset:0;
                  display:flex;
                  align-items:center;
                  justify-content:center;
                  transform:rotate(45deg);
                ">
                  <div style="width:10px;height:10px;background:white;border-radius:50%;"></div>
                </div>
              </div>
              <div style="
                width:10px;height:5px;
                background:rgba(0,0,0,0.25);
                border-radius:50%;
                margin-top:2px;
              "></div>
            </div>
          `,
          iconSize: [40, 50],
          iconAnchor: [20, 50],
          popupAnchor: [0, -52],
        });

        const marker = L.marker([loc.lat, loc.lng], { icon: svgIcon }).addTo(map);

        const popupContent = `
          <div style="font-family:'DM Sans',sans-serif;min-width:200px;">
            <div style="font-weight:700;font-size:14px;color:#0f172a;margin-bottom:4px;">${loc.name}</div>
            <div style="font-size:12px;color:#64748b;margin-bottom:8px;">${loc.address}</div>
            ${loc.note ? `<div style="font-size:12px;background:#f1f5f9;padding:6px 8px;border-radius:6px;color:#475569;margin-bottom:8px;">${loc.note}</div>` : ""}
            <a 
              href="https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}"
              target="_blank"
              rel="noopener noreferrer"
              style="
                display:inline-flex;align-items:center;gap:6px;
                background:${color};color:white;
                padding:6px 12px;border-radius:8px;
                font-size:12px;font-weight:600;
                text-decoration:none;
                margin-top:4px;
              "
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
              Navigate in Google Maps
            </a>
          </div>
        `;

        marker.bindPopup(popupContent, {
          maxWidth: 260,
          className: "custom-popup",
        });

        marker.on("click", () => onSelect(loc.id));
        markersRef.current.push({ id: loc.id, marker });
      });

      if (locations.length > 0) {
        const bounds = L.latLngBounds(locations.map((l) => [l.lat, l.lng]));
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    };

    init();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locations]);

  // Geolocation watcher — pulsing blue dot
  useEffect(() => {
    if (typeof window === "undefined" || !navigator.geolocation) return;

    const placeOrMoveUserMarker = async (lat: number, lng: number) => {
      if (!mapRef.current) return;
      const L = (await import("leaflet")).default;

      const icon = L.divIcon({
        className: "",
        html: `<div class="user-location-dot"></div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      });

      if (userMarkerRef.current) {
        userMarkerRef.current.setLatLng([lat, lng]);
      } else {
        userMarkerRef.current = L.marker([lat, lng], { icon, zIndexOffset: 1000 })
          .addTo(mapRef.current)
          .bindTooltip("You are here", { direction: "top", offset: [0, -10] });
      }
    };

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => placeOrMoveUserMarker(pos.coords.latitude, pos.coords.longitude),
      () => {}, // silently ignore errors — dot simply won't appear
      { enableHighAccuracy: true, maximumAge: 10000 }
    );

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
      if (userMarkerRef.current && mapRef.current) {
        userMarkerRef.current.remove();
        userMarkerRef.current = null;
      }
    };
  }, []);

  // Open popup when selectedId changes
  useEffect(() => {
    if (!selectedId || !mapRef.current) return;
    const entry = markersRef.current.find((m) => m.id === selectedId);
    if (entry) {
      entry.marker.openPopup();
      const currentZoom = mapRef.current.getZoom();
      mapRef.current.setView(entry.marker.getLatLng(), currentZoom, { animate: true });
    }
  }, [selectedId]);

  return (
    <div
      id={containerId}
      style={{ height: "100%", width: "100%", borderRadius: "16px" }}
    />
  );
}
