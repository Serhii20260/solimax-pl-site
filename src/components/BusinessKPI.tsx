import { useState, useEffect } from "react";

function useCountUp(target: number, duration: number, start: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let t0: number | null = null;
    const tick = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(e * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [start, target, duration]);
  return val;
}

interface KpiItem {
  id: string;
  label: string;
  value: number;
  suffix: string;
  color: string;
  desc: string;
}

interface DetailItem {
  label: string;
  val: string;
  sub: string;
  color: string;
}

const kpis: KpiItem[] = [
  { id: "savings", label: "Monthly savings",    value: 4800, suffix: "€",   color: "#22c55e", desc: "avg. per facility"   },
  { id: "roi",     label: "ROI period",          value: 5,    suffix: " yr", color: "#F5C518", desc: "typical B2B project" },
  { id: "co2",     label: "CO₂ avoided",         value: 38,   suffix: " t",  color: "#14b8a6", desc: "per year / 100 kWp"  },
  { id: "self",    label: "Energy independence", value: 72,   suffix: "%",   color: "#3b82f6", desc: "daytime self-supply"  },
];

const details: DetailItem[] = [
  { label: "Peak shaving",     val: "−34%",   sub: "demand charges",       color: "#F5C518" },
  { label: "Grid import cost", val: "−61%",   sub: "annual reduction",      color: "#22c55e" },
  { label: "System capacity",  val: "50–500", sub: "kWp scalable",          color: "#3b82f6" },
  { label: "EPC turnkey",      val: "100%",   sub: "design to commission",  color: "#14b8a6" },
  { label: "ESG reporting",    val: "✓",      sub: "CO₂ certificates",      color: "#a78bfa" },
  { label: "Monitoring 24/7",  val: "EMS",    sub: "real-time dashboard",   color: "#f97316" },
];

function Spark({ color }: { color: string }) {
  const h = [40, 55, 35, 70, 60, 85, 75, 90];
  return (
    <svg viewBox="0 0 64 32" width="64" height="32" style={{ display: "block" }}>
      {h.map((v, i) => (
        <rect key={i} x={i * 8} y={32 - v * 0.32} width={5} height={v * 0.32}
          rx={2} fill={color} opacity={i === 7 ? 1 : 0.3 + i * 0.08} />
      ))}
    </svg>
  );
}

function KpiCard({ kpi, visible, idx }: { kpi: KpiItem; visible: boolean; idx: number }) {
  const num = useCountUp(kpi.value, 1600 + idx * 200, visible);
  return (
    <div style={{
      background: "#fff",
      border: "1px solid #e2e8f0",
      borderTop: `3px solid ${kpi.color}`,
      borderRadius: "0 0 10px 10px",
      padding: "16px 14px 12px",
      display: "flex", flexDirection: "column", gap: 4,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(16px)",
      transition: `opacity 0.5s ${idx * 100}ms, transform 0.5s ${idx * 100}ms`,
      flex: "1 1 calc(50% - 4px)",
      minWidth: 130,
      boxSizing: "border-box",
    }}>
      <div style={{ fontSize: 9, fontWeight: 700, color: kpi.color,
        letterSpacing: "0.1em", textTransform: "uppercase" }}>{kpi.label}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 2, margin: "4px 0" }}>
        <span style={{ fontSize: 34, fontWeight: 800, color: "#0f172a", lineHeight: 1,
          fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "-1px" }}>
          {num.toLocaleString()}
        </span>
        <span style={{ fontSize: 13, color: "#64748b", fontWeight: 600 }}>{kpi.suffix}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <span style={{ fontSize: 10, color: "#94a3b8" }}>{kpi.desc}</span>
        <Spark color={kpi.color} />
      </div>
    </div>
  );
}

function DetailRow({ item, visible, idx }: { item: DetailItem; visible: boolean; idx: number }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10,
      padding: "9px 12px",
      background: "#f8fafc",
      borderRadius: 8,
      borderLeft: `3px solid ${item.color}`,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateX(0)" : "translateX(-12px)",
      transition: `opacity 0.4s ${200 + idx * 60}ms, transform 0.4s ${200 + idx * 60}ms`,
    }}>
      <div style={{ fontSize: 17, fontWeight: 800, color: item.color,
        fontFamily: "'Barlow Condensed', sans-serif", minWidth: 54 }}>{item.val}</div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#1e293b" }}>{item.label}</div>
        <div style={{ fontSize: 10, color: "#94a3b8" }}>{item.sub}</div>
      </div>
    </div>
  );
}

export default function BusinessKPI() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 300); return () => clearTimeout(t); }, []);

  return (
    <div style={{
      width: "100%", background: "#f1f5f9", borderRadius: 12,
      padding: 16, boxSizing: "border-box",
      display: "flex", flexDirection: "column", gap: 12,
      fontFamily: "system-ui, sans-serif", minHeight: 420,
    }}>

      {/* Header */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        opacity: visible ? 1 : 0, transition: "opacity 0.5s"
      }}>
        <div>
          <div style={{ fontSize: 9, letterSpacing: "0.18em", color: "#F5C518",
            fontWeight: 700, textTransform: "uppercase" }}>SOLIMAX BUSINESS</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>
            Energy performance dashboard
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e",
            boxShadow: "0 0 0 3px #22c55e33" }}/>
          <span style={{ fontSize: 10, color: "#64748b" }}>Live data</span>
        </div>
      </div>

      {/* KPI row - wraps to 2x2 on mobile */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {kpis.map((k, i) => <KpiCard key={k.id} kpi={k} visible={visible} idx={i} />)}
      </div>

      {/* Detail grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {details.map((item, i) => <DetailRow key={i} item={item} visible={visible} idx={i} />)}
      </div>
    </div>
  );
}
