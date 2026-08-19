import { useState, useEffect } from "react";

function useCountUp(target: number, duration: number, start: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let t0: number | null = null;
    const tick = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [start, target, duration]);
  return val;
}

const C = { green:"#22c55e", teal:"#14b8a6", yellow:"#F5C518", blue:"#3b82f6", purple:"#8b5cf6" };

function Donut({ pct, color, size=78, stroke=9 }: { pct: number; color: string; size?: number; stroke?: number }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform:"rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#e2e8f0" strokeWidth={stroke}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        style={{ transition:"stroke-dasharray 1.2s cubic-bezier(0.34,1.56,0.64,1)" }}/>
    </svg>
  );
}

interface DonutCardProps {
  label: string;
  value: number;
  unit: string;
  pct: number;
  color: string;
  visible: boolean;
  idx: number;
  desc: string;
}

function DonutCard({ label, value, unit, pct, color, visible, idx, desc }: DonutCardProps) {
  const num = useCountUp(value, 1400 + idx*150, visible);
  return (
    <div style={{
      background:"#fff", border:"1px solid #e2e8f0", borderRadius:12,
      padding:"12px 10px", display:"flex", flexDirection:"column",
      alignItems:"center", gap:5,
      flex:"1 1 calc(50% - 4px)",
      minWidth:120,
      boxSizing:"border-box",
      opacity:visible?1:0, transform:visible?"translateY(0)":"translateY(14px)",
      transition:`opacity 0.5s ${idx*100}ms, transform 0.5s ${idx*100}ms`,
    }}>
      <div style={{ fontSize:9, fontWeight:700, color, letterSpacing:"0.1em",
        textTransform:"uppercase", textAlign:"center" }}>{label}</div>
      <div style={{ position:"relative", width:78, height:78 }}>
        <Donut pct={visible?pct:0} color={color}/>
        <div style={{ position:"absolute", inset:0, display:"flex",
          flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
          <span style={{ fontSize:18, fontWeight:800, color:"#0f172a",
            fontFamily:"'Barlow Condensed', sans-serif", lineHeight:1 }}>{num}</span>
          <span style={{ fontSize:9, color:"#94a3b8" }}>{unit}</span>
        </div>
      </div>
      <div style={{ fontSize:9, color:"#64748b", textAlign:"center", lineHeight:1.4 }}>{desc}</div>
    </div>
  );
}

// Full-width asset value chart with annotations
function AssetChart({ visible }: { visible: boolean }) {
  const years = ["Y1","Y2","Y3","Y4","Y5","Y6","Y7","Y8","Y9","Y10"];
  const vals  = [100,108,117,127,138,150,163,178,194,211];
  return (
    <div style={{ display:"flex", alignItems:"flex-end", gap:6, height:72, padding:"0 4px" }}>
      {vals.map((v,i) => (
        <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}>
          <div style={{
            width:"100%",
            height: visible ? `${(v/220)*66}px` : "2px",
            background: i===9 ? C.yellow : i>=6 ? C.green : "#cbd5e1",
            borderRadius:"3px 3px 0 0",
            transition:`height 0.8s ${i*60}ms cubic-bezier(0.34,1.56,0.64,1)`,
          }}/>
          <span style={{ fontSize:7, color:"#94a3b8" }}>{years[i]}</span>
        </div>
      ))}
    </div>
  );
}

// CO2 roadmap full-width
function CO2Roadmap({ visible }: { visible: boolean }) {
  const steps = [
    { year:"2025", val:100, label:"Baseline" },
    { year:"2026", val:72,  label:"−28%" },
    { year:"2027", val:55,  label:"−45%" },
    { year:"2028", val:40,  label:"−60%" },
    { year:"2029", val:28,  label:"−72%" },
    { year:"2030", val:15,  label:"−85%" },
  ];
  return (
    <div style={{ display:"flex", alignItems:"flex-end", gap:10, height:68 }}>
      {steps.map((s,i) => (
        <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
          <span style={{ fontSize:9, fontWeight:700,
            color: i===0 ? "#ef4444" : C.teal }}>{s.label}</span>
          <div style={{
            width:"100%",
            height: visible ? `${(s.val/100)*52}px` : "2px",
            background: i===0 ? "#fca5a5" : `hsl(${160+i*8}, 70%, ${45+i*4}%)`,
            borderRadius:"3px 3px 0 0",
            transition:`height 0.9s ${i*100}ms cubic-bezier(0.34,1.56,0.64,1)`,
          }}/>
          <span style={{ fontSize:8, color:"#64748b", fontWeight:700 }}>{s.year}</span>
        </div>
      ))}
    </div>
  );
}

const esgMetrics = [
  { label:"CO₂ Avoided",    value:142, unit:"t/yr", pct:78, color:C.teal,   desc:"per 100 kWp installed"  },
  { label:"Clean Energy",   value:180, unit:"MWh",  pct:87, color:C.green,  desc:"annual production"       },
  { label:"Grid Reduction", value:61,  unit:"%",    pct:61, color:C.blue,   desc:"import cost decrease"    },
  { label:"ESG Score",      value:84,  unit:"pts",  pct:84, color:C.purple, desc:"corporate rating boost"  },
];

const stats = [
  { val:"↑ 12%", label:"energy prices / yr",       color:C.green  },
  { val:"+15%",  label:"property value increase",   color:C.yellow },
  { val:"20 yr", label:"panel warranty",            color:C.teal   },
  { val:"€ 0",   label:"grid dependency goal",      color:C.blue   },
  { val:"−70%",  label:"average bill reduction",    color:C.green  },
  { val:"6 yr",  label:"typical payback period",    color:C.yellow },
];

export default function ESGDashboard() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 300); return () => clearTimeout(t); }, []);

  return (
    <div style={{
      width:"100%", height:"100%", background:"#f1f5f9",
      borderRadius:12, padding:14, boxSizing:"border-box",
      display:"flex", flexDirection:"column", gap:10,
      fontFamily:"system-ui, sans-serif",
    }}>

      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:8,
        opacity:visible?1:0, transition:"opacity 0.5s" }}>
        <div>
          <div style={{ fontSize:9, letterSpacing:"0.18em", color:C.yellow,
            fontWeight:700, textTransform:"uppercase" }}>SOLIMAX BUSINESS</div>
          <div style={{ fontSize:13, fontWeight:700, color:"#0f172a" }}>Finance & ESG Dashboard</div>
        </div>
        <div style={{ display:"none" }}>
          {[{c:C.green,l:"Environmental"},{c:C.blue,l:"Financial"},{c:C.purple,l:"ESG"}].map((x,i)=>(
            <div key={i} style={{ display:"flex", alignItems:"center", gap:3 }}>
              <div style={{ width:6, height:6, borderRadius:"50%", background:x.c }}/>
              <span style={{ fontSize:8, color:"#64748b" }}>{x.l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Donut cards - wraps to 2x2 on mobile */}
      <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
        {esgMetrics.map((m,i) => <DonutCard key={i} {...m} visible={visible} idx={i}/>)}
      </div>

      {/* Asset value — full width */}
      <div style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:12,
        padding:"12px 14px", flex:1, opacity:visible?1:0, transition:"opacity 0.6s 200ms" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", flexWrap:"wrap", gap:4, marginBottom:6 }}>
          <div>
            <div style={{ fontSize:9, fontWeight:700, color:C.yellow,
              letterSpacing:"0.1em", textTransform:"uppercase" }}>Asset Value Growth</div>
            <div style={{ fontSize:9, color:"#94a3b8" }}>indexed · base 100 · 10-year horizon</div>
          </div>
          <div style={{ fontSize:18, fontWeight:800, color:C.green,
            fontFamily:"'Barlow Condensed', sans-serif" }}>+111%</div>
        </div>
        <AssetChart visible={visible}/>
      </div>

      {/* CO2 roadmap — full width */}
      <div style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:12,
        padding:"12px 14px", flex:1, opacity:visible?1:0, transition:"opacity 0.6s 300ms" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", flexWrap:"wrap", gap:4, marginBottom:6 }}>
          <div>
            <div style={{ fontSize:9, fontWeight:700, color:C.teal,
              letterSpacing:"0.1em", textTransform:"uppercase" }}>CO₂ Reduction</div>
            <div style={{ fontSize:9, color:"#94a3b8" }}>indexed · baseline 2025 = 100</div>
          </div>
          <div style={{ fontSize:18, fontWeight:800, color:C.teal,
            fontFamily:"'Barlow Condensed', sans-serif" }}>−85%</div>
        </div>
        <CO2Roadmap visible={visible}/>
      </div>

      {/* Key stats — wraps to 2 rows on mobile */}
      <div style={{ display:"flex", flexWrap:"wrap", gap:8, opacity:visible?1:0, transition:"opacity 0.6s 400ms" }}>
        {stats.map((s,i) => (
          <div key={i} style={{
            flex:"1 1 calc(33.333% - 6px)", minWidth:80, background:"#fff", border:"1px solid #e2e8f0", borderRadius:10,
            padding:"8px 6px", textAlign:"center", boxSizing:"border-box",
          }}>
            <div style={{ fontSize:16, fontWeight:800, color:s.color,
              fontFamily:"'Barlow Condensed', sans-serif", lineHeight:1 }}>{s.val}</div>
            <div style={{ fontSize:8, color:"#94a3b8", marginTop:3, lineHeight:1.3 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
