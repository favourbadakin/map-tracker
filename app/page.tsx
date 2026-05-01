"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import {
  weekSchedule,
  categoryColors,
  categoryLabels,
  type Location,
} from "./data/locations";

const WorkMap = dynamic(() => import("./components/WorkMap"), { ssr: false });

const categoryIcons: Record<Location["category"], string> = {
  office: "🏢",
  client: "👥",
  site: "🏗️",
  partner: "🤝",
  //"": "🏪",
};

// weekSchedule order: Mon=0, Tue=1, Wed=2, Thu=3, Fri=4, Sat=5
// JS getDay(): 0=Sun,1=Mon,2=Tue,3=Wed,4=Thu,5=Fri,6=Sat
// Only Sunday is not in the schedule — defaults to index 0 (Monday)
const jsDayToScheduleIndex: Record<number, number> = {
  1: 1, // Monday
  2: 2, // Tuesday
  3: 3, // Wednesday
  4: 4, // Thursday
  5: 5, // Friday
  6: 0, // Saturday
};

function getTodayIndex() {
  return jsDayToScheduleIndex[new Date().getDay()] ?? 0;
}

// Haversine distance in km
function haversine(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

type NearbyLoc = Location & { distance: number; dayLabel: string };
type ActiveView = "schedule" | "nearby";
type GeoState = "idle" | "loading" | "success" | "error";

export default function Home() {
  const [activeDay, setActiveDay] = useState(() => getTodayIndex());
  const [todayIndex] = useState(() => getTodayIndex());
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<ActiveView>("schedule");
  const [geoState, setGeoState] = useState<GeoState>("idle");
  const [userPos, setUserPos] = useState<{ lat: number; lng: number } | null>(null);
  const [nearbyLocs, setNearbyLocs] = useState<NearbyLoc[]>([]);

  const schedule = weekSchedule[activeDay];
  const locations = schedule.locations;

  useEffect(() => { setSelectedId(null); }, [activeDay]);

  // Compute nearest 3 from the selected day only
  useEffect(() => {
    if (!userPos) return;
    const ranked = locations
      .map((loc) => ({
        ...loc,
        distance: haversine(userPos.lat, userPos.lng, loc.lat, loc.lng),
        dayLabel: schedule.shortDay,
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3);
    setNearbyLocs(ranked);
  }, [userPos, activeDay]);

  const fetchLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setGeoState("error");
      return;
    }
    setGeoState("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPos({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setGeoState("success");
        setActiveView("nearby");
      },
      () => setGeoState("error"),
      { timeout: 10000 }
    );
  }, []);

  const openGoogleMaps = (loc: Location) => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}`,
      "_blank"
    );
  };

  const rankMedals = ["🥇", "🥈", "🥉"];

  // Shared location card renderer
  const renderLocationCard = (
    loc: Location,
    idx: number,
    opts?: { nearby?: NearbyLoc; showDay?: boolean }
  ) => {
    const color = categoryColors[loc.category];
    const isSelected = selectedId === loc.id;
    const nearby = opts?.nearby;

    return (
      <div
        key={loc.id}
        onClick={() => setSelectedId(isSelected ? null : loc.id)}
        className={`fade-up ${nearby ? `nearby-rank-${idx + 1}` : ""}`}
        style={{
          animationDelay: `${idx * 60}ms`,
          background: isSelected ? "var(--surface2)" : "var(--surface)",
          border: isSelected
            ? `1.5px solid ${color}66`
            : "1.5px solid var(--border)",
          borderRadius: 14,
          padding: 14,
          cursor: "pointer",
          transition: "all 0.2s",
          boxShadow: isSelected ? `0 4px 24px ${color}22` : "none",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
          <div
            style={{
              width: 30, height: 30, borderRadius: 8,
              background: `${color}22`, border: `1.5px solid ${color}44`,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, fontSize: nearby ? 16 : 13, fontWeight: 800,
              color: nearby ? undefined : color,
            }}
          >
            {nearby ? rankMedals[idx] : idx + 1}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
              <div
                style={{
                  fontWeight: 700, fontSize: 13, color: "var(--text)",
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                }}
              >
                {loc.name}
              </div>
              {opts?.showDay && nearby && (
                <span style={{
                  fontSize: 10, fontWeight: 700,
                  background: "var(--surface2)", color: "var(--muted)",
                  padding: "1px 6px", borderRadius: 20, flexShrink: 0,
                }}>
                  {nearby.dayLabel}
                </span>
              )}
            </div>
            <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 6 }}>
              {loc.address}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 4,
                fontSize: 10, fontWeight: 700, color,
                background: `${color}18`, padding: "2px 8px", borderRadius: 20,
              }}>
                {categoryIcons[loc.category]} {categoryLabels[loc.category]}
              </span>
              {nearby && (
                <span style={{
                  fontSize: 10, fontWeight: 700,
                  color: "#22c55e", background: "#22c55e18",
                  padding: "2px 8px", borderRadius: 20,
                }}>
                  📏 {nearby.distance < 1
                    ? `${Math.round(nearby.distance * 1000)}m`
                    : `${nearby.distance.toFixed(1)}km`}
                </span>
              )}
            </div>
            {loc.note && (
              <div style={{
                marginTop: 8, fontSize: 11, color: "var(--muted)",
                background: "var(--surface2)", borderRadius: 8, padding: "5px 8px",
              }}>
                ℹ️ {loc.note}
              </div>
            )}
          </div>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); openGoogleMaps(loc); }}
          style={{
            marginTop: 10, width: "100%",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            padding: "8px",
            background: `${color}18`, border: `1px solid ${color}33`,
            borderRadius: 8, color, fontSize: 11, fontWeight: 700, cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = `${color}30`)}
          onMouseLeave={e => (e.currentTarget.style.background = `${color}18`)}
        >
          🧭 Navigate in Google Maps →
        </button>
      </div>
    );
  };

  // Nearby panel content
  const NearbyPanel = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {geoState === "idle" && (
        <div style={{
          textAlign: "center", padding: "32px 16px",
          background: "var(--surface)", border: "1px solid var(--border)",
          borderRadius: 14,
        }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>📡</div>
          <p style={{ color: "var(--muted)", fontSize: 13, marginBottom: 16, margin: "0 0 16px" }}>
            Find the 3 nearest work locations to where you are right now.
          </p>
          <button
            onClick={fetchLocation}
            style={{
              padding: "10px 20px",
              background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
              color: "white", border: "none", borderRadius: 10,
              fontSize: 13, fontWeight: 700, cursor: "pointer",
            }}
          >
            Use My Location
          </button>
        </div>
      )}

      {geoState === "loading" && (
        <div style={{
          textAlign: "center", padding: "32px 16px",
          background: "var(--surface)", border: "1px solid var(--border)",
          borderRadius: 14,
        }}>
          <div className="nearby-dot" style={{
            width: 16, height: 16, borderRadius: "50%",
            background: "#3b82f6", margin: "0 auto 12px",
          }} />
          <p style={{ color: "var(--muted)", fontSize: 13, margin: 0 }}>Getting your location…</p>
        </div>
      )}

      {geoState === "error" && (
        <div style={{
          textAlign: "center", padding: "24px 16px",
          background: "var(--surface)", border: "1px solid #f43f5e44",
          borderRadius: 14,
        }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>⚠️</div>
          <p style={{ color: "#f43f5e", fontSize: 13, marginBottom: 12, margin: "0 0 12px" }}>
            Location access denied or unavailable.
          </p>
          <button onClick={fetchLocation} style={{
            padding: "8px 16px", background: "var(--surface2)",
            color: "var(--text)", border: "1px solid var(--border)",
            borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer",
          }}>
            Try Again
          </button>
        </div>
      )}

      {geoState === "success" && nearbyLocs.length > 0 && (
        <>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <span style={{ fontSize: 11, color: "var(--muted)", fontWeight: 700, letterSpacing: "0.06em" }}>
              3 NEAREST LOCATIONS
            </span>
            <button onClick={fetchLocation} style={{
              fontSize: 10, color: "var(--accent)", background: "transparent",
              border: "none", cursor: "pointer", fontWeight: 700,
            }}>
              🔄 Refresh
            </button>
          </div>
          {nearbyLocs.map((loc, i) =>
            renderLocationCard(loc, i, { nearby: loc, showDay: true })
          )}
        </>
      )}
    </div>
  );

  // Sidebar schedule content
  const SchedulePanel = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ fontSize: 11, color: "var(--muted)", fontWeight: 700, letterSpacing: "0.06em" }}>
        {schedule.day.toUpperCase()} — {locations.length} LOCATION{locations.length !== 1 ? "S" : ""}
      </div>
      {locations.map((loc, idx) => renderLocationCard(loc, idx))}
      {/* Legend */}
      <div style={{
        padding: "10px 14px", background: "var(--surface)",
        border: "1px solid var(--border)", borderRadius: 12,
      }}>
        <p style={{ margin: "0 0 8px", fontSize: 10, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.06em" }}>
          LEGEND
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 14px" }}>
          {(Object.keys(categoryColors) as Array<Location["category"]>).map(cat => (
            <div key={cat} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--muted)" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: categoryColors[cat] }} />
              {categoryLabels[cat]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <header className="header-pad" style={{ padding: "20px 28px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 40, height: 40,
            background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
            borderRadius: 12,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20,
          }}>📍</div>
          <div>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text)" }}>WorkRoute</h1>
            <p style={{ margin: 0, fontSize: 11, color: "var(--muted)" }}>Your weekly field map</p>
          </div>
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          background: "var(--surface)", border: "1px solid var(--border)",
          borderRadius: 10, padding: "7px 14px",
        }}>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>
            📅 {new Date().toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })}
          </span>
        </div>
      </header>

      {/* Day Tabs */}
      <div className="day-tabs-pad" style={{ padding: "16px 28px 0", display: "flex", gap: 8 }}>
        {weekSchedule.map((s, i) => {
          const isActive = i === activeDay;
          const isToday = i === todayIndex;
          return (
            <button key={s.day} onClick={() => { setActiveDay(i); setActiveView("schedule"); }} style={{
              flex: 1, padding: "10px 4px", borderRadius: 12,
              border: isActive ? "1.5px solid var(--accent)" : "1.5px solid var(--border)",
              background: isActive ? "rgba(59,130,246,0.12)" : "var(--surface)",
              color: isActive ? "var(--accent)" : "var(--muted)",
              cursor: "pointer", transition: "all 0.2s",
              position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
            }}>
              <span style={{ fontSize: 11, fontWeight: 700 }}>{s.shortDay}</span>
              <span style={{
                fontSize: 10,
                background: isActive ? "var(--accent)" : "var(--surface2)",
                color: isActive ? "white" : "var(--muted)",
                borderRadius: 20, padding: "1px 7px", fontWeight: 700,
              }}>{s.locations.length}</span>
              {isToday && (
                <div style={{
                  position: "absolute", top: 4, right: 6,
                  width: 5, height: 5, borderRadius: "50%", background: "#22c55e",
                }} />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Content */}
      <div
        className="main-layout"
        style={{
          flex: 1, display: "flex", gap: 16,
          padding: "16px 28px 24px",
          height: "calc(100vh - 158px)",
        }}
      >
        {/* Desktop Sidebar */}
        <div
          className="desktop-sidebar sidebar"
          style={{
            width: 290, flexShrink: 0,
            flexDirection: "column", gap: 10, overflowY: "auto",
          }}
        >
          {/* Desktop view toggle */}
          <div style={{
            display: "flex", gap: 4,
            background: "var(--surface)", border: "1px solid var(--border)",
            borderRadius: 10, padding: 4,
          }}>
            {(["schedule", "nearby"] as ActiveView[]).map(v => (
              <button key={v} onClick={() => { setActiveView(v); if (v === "nearby" && geoState === "idle") fetchLocation(); }}
                style={{
                  flex: 1, padding: "6px 0",
                  borderRadius: 7, border: "none",
                  background: activeView === v ? "var(--accent)" : "transparent",
                  color: activeView === v ? "white" : "var(--muted)",
                  fontSize: 11, fontWeight: 700, cursor: "pointer", transition: "all 0.2s",
                  textTransform: "capitalize",
                }}
              >
                {v === "nearby" ? "📡 Nearby" : "📅 Schedule"}
              </button>
            ))}
          </div>
          {activeView === "schedule" ? <SchedulePanel /> : <NearbyPanel />}
        </div>

        {/* Map */}
        <div
          className="map-container"
          style={{
            flex: 1, borderRadius: 16, overflow: "hidden",
            border: "1px solid var(--border)", position: "relative", minHeight: 400,
          }}
        >
          <WorkMap locations={locations} selectedId={selectedId} onSelect={setSelectedId} />
          <div style={{
            position: "absolute", top: 14, left: 14,
            background: "rgba(10,15,30,0.88)", border: "1px solid var(--border)",
            borderRadius: 10, padding: "6px 14px", backdropFilter: "blur(8px)",
            zIndex: 999, display: "flex", alignItems: "center", gap: 8,
          }}>
            <span style={{ fontSize: 12, color: "var(--text)", fontWeight: 700 }}>
              📍 {schedule.day} — {locations.length} stop{locations.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Mobile bottom panel */}
        <div
          className="mobile-panel sidebar"
          style={{
            display: "none", flexDirection: "column", gap: 10,
            width: "100%", overflowY: "visible",
          }}
        >
          {/* Mobile view toggle */}
          <div style={{
            display: "flex", gap: 4,
            background: "var(--surface)", border: "1px solid var(--border)",
            borderRadius: 10, padding: 4,
          }}>
            {(["schedule", "nearby"] as ActiveView[]).map(v => (
              <button key={v} onClick={() => { setActiveView(v); if (v === "nearby" && geoState === "idle") fetchLocation(); }}
                style={{
                  flex: 1, padding: "8px 0",
                  borderRadius: 7, border: "none",
                  background: activeView === v ? "var(--accent)" : "transparent",
                  color: activeView === v ? "white" : "var(--muted)",
                  fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 0.2s",
                }}
              >
                {v === "nearby" ? "📡 Nearby" : "📅 Schedule"}
              </button>
            ))}
          </div>
          {activeView === "schedule" ? <SchedulePanel /> : <NearbyPanel />}
        </div>
      </div>
    </div>
  );
}
