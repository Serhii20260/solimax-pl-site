import { useEffect, useRef, useState, type ReactNode } from "react";

const C = {
  yellow: "#F5C518", green: "#22c55e", blue: "#3b82f6",
  red: "#ef4444", purple: "#8b5cf6", gray: "#94a3b8",
  bg: "#ffffff", card: "#f8fafc", border: "#e2e8f0",
  text: "#0f172a", sub: "#64748b",
};

// SVG icon paths
const Icons: Record<string, ReactNode> = {
  sun: (
    <g>
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2"/>
      {[0,45,90,135,180,225,270,315].map((a,i)=>{
        const r=a*Math.PI/180, x1=12+7*Math.cos(r), y1=12+7*Math.sin(r), x2=12+9.5*Math.cos(r), y2=12+9.5*Math.sin(r);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>;
      })}
    </g>
  ),
  bolt: (
    <polyline points="13,2 13,9 19,9 11,22 11,15 5,15 13,2" fill="currentColor" stroke="none"/>
  ),
  battery: (
    <g>
      <rect x="2" y="7" width="18" height="11" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
      <line x1="22" y1="11" x2="22" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <rect x="4" y="9" width="10" height="7" rx="1" fill="currentColor"/>
    </g>
  ),
  home: (
    <g>
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" fill="none" stroke="currentColor" strokeWidth="2"/>
      <polyline points="9,22 9,12 15,12 15,22" fill="none" stroke="currentColor" strokeWidth="2"/>
    </g>
  ),
  grid: (
    <g>
      <rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
      <line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="3" y1="15" x2="21" y2="15" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="9" y1="3" x2="9" y2="21" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="15" y1="3" x2="15" y2="21" stroke="currentColor" strokeWidth="1.5"/>
    </g>
  ),
  thermometer: (
    <g>
      <path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="11.5" cy="19" r="2" fill="currentColor"/>
    </g>
  ),
  car: (
    <g>
      <rect x="1" y="8" width="22" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M5 8l2-4h10l2 4" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="7" cy="18" r="2" fill="currentColor"/>
      <circle cx="17" cy="18" r="2" fill="currentColor"/>
      <line x1="9" y1="13" x2="15" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </g>
  ),
  cpu: (
    <g>
      <rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
      <rect x="8" y="8" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      {[[4,9],[4,12],[4,15],[20,9],[20,12],[20,15],[9,4],[12,4],[15,4],[9,20],[12,20],[15,20]].map(([x,y],i)=>(
        <line key={i} x1={x<10?x-2:x>15?x+2:x} y1={y<10?y-2:y>15?y+2:y} x2={x} y2={y}
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      ))}
    </g>
  ),
};

interface NodeDataItem {
  label: string;
  sub: string;
  icon: string;
  color: string;
}

const nodeData: Record<string, NodeDataItem> = {
  pv:    { label:"Solar PV",      sub:"Rooftop panels",      icon:"sun",         color:C.yellow },
  inv:   { label:"Inverter",      sub:"Hybrid / AC bus",     icon:"bolt",        color:C.yellow },
  bat:   { label:"Battery",       sub:"Energy storage",      icon:"battery",     color:C.green  },
  grid:  { label:"Grid",          sub:"Import / Export",     icon:"grid",        color:C.gray   },
  house: { label:"Home",          sub:"AC consumers",        icon:"home",        color:C.blue   },
  pump:  { label:"Heat Pump",     sub:"Heating & cooling",   icon:"thermometer", color:C.red    },
  ev:    { label:"EV Charger",    sub:"Electric vehicle",    icon:"car",         color:C.purple },
  ems:   { label:"EMS",           sub:"Smart control",       icon:"cpu",         color:C.gray   },
};

const NW = 108, NH = 76;
const pos: Record<string, { x: number; y: number }> = {
  pv:    { x: 60,  y: 40  },
  inv:   { x: 286, y: 162 },
  bat:   { x: 60,  y: 200 },
  grid:  { x: 512, y: 40  },
  house: { x: 512, y: 162 },
  pump:  { x: 512, y: 290 },
  ev:    { x: 286, y: 310 },
  ems:   { x: 60,  y: 320 },
};

const ncx = (id: string) => pos[id].x + NW / 2;
const ncy = (id: string) => pos[id].y + NH / 2;

interface EdgeData {
  from: string;
  to: string;
  color: string;
  label: string;
  bi: boolean;
  speed: number;
}

const edges: EdgeData[] = [
  { from:"pv",  to:"inv",   color:C.yellow, label:"DC",     bi:false, speed:1600 },
  { from:"bat", to:"inv",   color:C.green,  label:"↔",      bi:true,  speed:2200 },
  { from:"inv", to:"grid",  color:C.gray,   label:"↔ AC",   bi:true,  speed:3200 },
  { from:"inv", to:"house", color:C.blue,   label:"AC",     bi:false, speed:1500 },
  { from:"inv", to:"pump",  color:C.red,    label:"AC",     bi:false, speed:2000 },
  { from:"inv", to:"ev",    color:C.purple, label:"AC",     bi:false, speed:1800 },
  { from:"ems", to:"inv",   color:C.gray,   label:"ctrl",   bi:false, speed:3500 },
];

function useTick() {
  const [t, setT] = useState(0);
  const raf = useRef<number | null>(null);
  useEffect(() => {
    const loop = (ts: number) => { setT(ts); raf.current = requestAnimationFrame(loop); };
    raf.current = requestAnimationFrame(loop);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, []);
  return t;
}

function Particle({ x1, y1, x2, y2, color, phase, speed, t }: {
  x1: number; y1: number; x2: number; y2: number;
  color: string; phase: number; speed: number; t: number;
}) {
  const p = ((t / speed + phase) % 1);
  return <circle cx={x1+(x2-x1)*p} cy={y1+(y2-y1)*p} r={4} fill={color} opacity={0.9} />;
}

function Edge({ edge }: { edge: EdgeData }) {
  const t = useTick();
  const { from, to, color, label, bi, speed } = edge;
  const x1=ncx(from), y1=ncy(from), x2=ncx(to), y2=ncy(to);
  const mx=(x1+x2)/2, my=(y1+y2)/2;
  const isDashed = edge.from==="ems";
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={color} strokeWidth={2}
        strokeDasharray={isDashed?"5 4":"none"} opacity={0.2} />
      <rect x={mx-15} y={my-8} width={30} height={16} rx={8}
        fill="white" stroke={color} strokeWidth={1} />
      <text x={mx} y={my+4} textAnchor="middle" fontSize={8}
        fontWeight="700" fill={color}>{label}</text>
      <Particle x1={x1} y1={y1} x2={x2} y2={y2} color={color} phase={0}    speed={speed} t={t}/>
      <Particle x1={x1} y1={y1} x2={x2} y2={y2} color={color} phase={0.5}  speed={speed} t={t}/>
      {bi && <>
        <Particle x1={x2} y1={y2} x2={x1} y2={y1} color={color} phase={0.25} speed={speed+500} t={t}/>
        <Particle x1={x2} y1={y2} x2={x1} y2={y1} color={color} phase={0.75} speed={speed+500} t={t}/>
      </>}
    </g>
  );
}

function Node({ id }: { id: string }) {
  const n = nodeData[id];
  const p = pos[id];
  return (
    <g>
      {/* Shadow */}
      <rect x={p.x+2} y={p.y+3} width={NW} height={NH} rx={12} fill={n.color} opacity={0.08}/>
      {/* Card */}
      <rect x={p.x} y={p.y} width={NW} height={NH} rx={12}
        fill="white" stroke={n.color} strokeWidth={1.5}/>
      {/* Icon bg circle */}
      <circle cx={p.x+22} cy={p.y+NH/2} r={18} fill={n.color} opacity={0.1}/>
      {/* SVG Icon */}
      <svg x={p.x+10} y={p.y+NH/2-12} width={24} height={24}
        viewBox="0 0 24 24" style={{color: n.color}}>
        {Icons[n.icon]}
      </svg>
      {/* Text */}
      <text x={p.x+46} y={p.y+NH/2-6} fontSize={11} fontWeight="700" fill={C.text}>{n.label}</text>
      <text x={p.x+46} y={p.y+NH/2+10} fontSize={9} fill={C.sub}>{n.sub}</text>
      {/* Status dot */}
      <circle cx={p.x+NW-12} cy={p.y+12} r={3.5} fill={n.color}/>
    </g>
  );
}

export default function EnergySchema() {
  return (
    <div style={{
      background: "#f8fafc",
      borderRadius: 14,
      padding: "16px 12px 10px",
      width: "100%",
      aspectRatio: "4/3",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      fontFamily: "'Inter', system-ui, sans-serif",
      border: "1px solid #e2e8f0",
    }}>
      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8, padding:"0 4px" }}>
        <div>
          <span style={{ fontSize:9, letterSpacing:"0.18em", color:C.yellow, fontWeight:700 }}>SOLIMAX</span>
          <span style={{ fontSize:12, color:C.text, fontWeight:600, marginLeft:10 }}>Energy Flow Diagram</span>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          {[
            {color:C.yellow, label:"Solar"},
            {color:C.green,  label:"Battery"},
            {color:C.blue,   label:"Home"},
            {color:C.gray,   label:"Grid"},
          ].map((l,i)=>(
            <div key={i} style={{ display:"flex", alignItems:"center", gap:4 }}>
              <div style={{ width:7, height:7, borderRadius:"50%", background:l.color }}/>
              <span style={{ fontSize:9, color:C.sub }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      <svg viewBox="0 0 680 430" width="100%" style={{ flex:1 }}>
        {/* AC Bus highlight */}
        <rect x={340} y={152} width={220} height={96} rx={10}
          fill={C.blue} opacity={0.04} stroke={C.blue} strokeWidth={1}
          strokeDasharray="5 4"/>
        <text x={450} y={147} textAnchor="middle" fontSize={9}
          fill={C.blue} fontWeight="700" opacity={0.6} letterSpacing="2">AC BUS</text>

        {edges.map((e,i) => <Edge key={i} edge={e}/>)}
        {Object.keys(nodeData).map(id => <Node key={id} id={id}/>)}

        {/* Legend row */}
        <g transform="translate(12,416)">
          {[
            {color:C.yellow, label:"PV generation"},
            {color:C.green,  label:"Battery ↔ charge/discharge"},
            {color:C.blue,   label:"AC loads (home)"},
            {color:C.red,    label:"Heat pump"},
            {color:C.purple, label:"EV charging"},
            {color:C.gray,   label:"Grid / EMS control"},
          ].map((l,i)=>(
            <g key={i} transform={`translate(${i*108},0)`}>
              <circle cx={4} cy={0} r={3} fill={l.color}/>
              <text x={11} y={4} fontSize={8} fill={C.sub}>{l.label}</text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
