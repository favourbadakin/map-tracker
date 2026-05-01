"use client";

import { useState, useEffect } from "react";
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
};

const today = new Date().getDay();
const dayIndex = today === 0 ? 0 : today - 1;
const initialDay = Math.min(dayIndex, 5);

export default function Home() {
  const [activeDay, setActiveDay] = useState(initialDay);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const schedule = weekSchedule[activeDay];
  const locations = schedule.locations;

  useEffect(() => {
    setSelectedId(null);
  }, [activeDay]);

  const openGoogleMaps = (loc: Location) => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}`,
      "_blank"
    );
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <header style={{ padding: "20px 28px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 40, height: 40,
            background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
            borderRadius: 12,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20
          }}>📍</div>
          <div>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, letterSpacing: "-0.03em", color: "var(--text)" }}>WorkRoute</h1>
            <p style={{ margin: 0, fontSize: 11, color: "var(--muted)" }}>Asake's weekly field map</p>
          </div>
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          background: "var(--surface)", border: "1px solid var(--border)",
          borderRadius: 10, padding: "7px 14px"
        }}>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>
            📅 {new Date().toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })}
          </span>
        </div>
      </header>

      {/* Day Tabs */}
      <div style={{ padding: "16px 28px 0", display: "flex", gap: 8 }}>
        {weekSchedule.map((s, i) => {
          const isActive = i === activeDay;
          const isToday = i === initialDay;
          return (
            <button key={s.day} onClick={() => setActiveDay(i)} style={{
              flex: 1, padding: "10px 4px", borderRadius: 12,
              border: isActive ? "1.5px solid var(--accent)" : "1.5px solid var(--border)",
              background: isActive ? "rgba(59,130,246,0.12)" : "var(--surface)",
              color: isActive ? "var(--accent)" : "var(--muted)",
              cursor: "pointer", transition: "all 0.2s",
              position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 3
            }}>
              <span style={{ fontSize: 11, fontWeight: 700 }}>{s.shortDay}</span>
              <span style={{
                fontSize: 10,
                background: isActive ? "var(--accent)" : "var(--surface2)",
                color: isActive ? "white" : "var(--muted)",
                borderRadius: 20, padding: "1px 7px", fontWeight: 700
              }}>{s.locations.length}</span>
              {isToday && (
                <div style={{
                  position: "absolute", top: 4, right: 6,
                  width: 5, height: 5, borderRadius: "50%", background: "#22c55e"
                }} />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1, display: "flex", gap: 16,
        padding: "16px 28px 24px",
        height: "calc(100vh - 158px)"
      }}>
        {/* Sidebar */}
        <div style={{ width: 290, flexShrink: 0, display: "flex", flexDirection: "column", gap: 10, overflowY: "auto" }}>
          <div style={{ fontSize: 11, color: "var(--muted)", fontWeight: 700, letterSpacing: "0.06em" }}>
            {schedule.day.toUpperCase()} — {locations.length} LOCATION{locations.length !== 1 ? "S" : ""}
          </div>

          {locations.map((loc, idx) => {
            const color = categoryColors[loc.category];
            const isSelected = selectedId === loc.id;
            return (
              <div key={loc.id} onClick={() => setSelectedId(isSelected ? null : loc.id)}
                className="fade-up"
                style={{
                  animationDelay: `${idx * 60}ms`,
                  background: isSelected ? "var(--surface2)" : "var(--surface)",
                  border: isSelected ? `1.5px solid ${color}66` : "1.5px solid var(--border)",
                  borderRadius: 14, padding: 14, cursor: "pointer", transition: "all 0.2s",
                  boxShadow: isSelected ? `0 4px 24px ${color}22` : "none"
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: 8,
                    background: `${color}22`, border: `1.5px solid ${color}44`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, color, fontSize: 13, fontWeight: 800
                  }}>{idx + 1}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 13, color: "var(--text)", marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {loc.name}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 6 }}>{loc.address}</div>
                    <span style={{
                      display: "inline-flex", alignItems: "center", gap: 4,
                      fontSize: 10, fontWeight: 700, color,
                      background: `${color}18`, padding: "2px 8px", borderRadius: 20
                    }}>
                      {categoryIcons[loc.category]} {categoryLabels[loc.category]}
                    </span>
                    {loc.note && (
                      <div style={{
                        marginTop: 8, fontSize: 11, color: "var(--muted)",
                        background: "var(--surface2)", borderRadius: 8, padding: "5px 8px"
                      }}>
                        ℹ️ {loc.note}
                      </div>
                    )}
                  </div>
                </div>

                <button onClick={(e) => { e.stopPropagation(); openGoogleMaps(loc); }} style={{
                  marginTop: 10, width: "100%",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  padding: "8px",
                  background: `${color}18`, border: `1px solid ${color}33`,
                  borderRadius: 8, color, fontSize: 11, fontWeight: 700, cursor: "pointer",
                  transition: "all 0.2s"
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = `${color}30`)}
                  onMouseLeave={e => (e.currentTarget.style.background = `${color}18`)}
                >
                  🧭 Navigate in Google Maps →
                </button>
              </div>
            );
          })}

          {/* Legend */}
          <div style={{ padding: "10px 14px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12 }}>
            <p style={{ margin: "0 0 8px", fontSize: 10, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.06em" }}>LEGEND</p>
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

        {/* Map */}
        <div style={{
          flex: 1, borderRadius: 16, overflow: "hidden",
          border: "1px solid var(--border)", position: "relative", minHeight: 400
        }}>
          <WorkMap locations={locations} selectedId={selectedId} onSelect={setSelectedId} />
          <div style={{
            position: "absolute", top: 14, left: 14,
            background: "rgba(10,15,30,0.88)", border: "1px solid var(--border)",
            borderRadius: 10, padding: "6px 14px", backdropFilter: "blur(8px)",
            zIndex: 999, display: "flex", alignItems: "center", gap: 8
          }}>
            <span style={{ fontSize: 12, color: "var(--text)", fontWeight: 700 }}>
              📍 {schedule.day} — {locations.length} stop{locations.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
