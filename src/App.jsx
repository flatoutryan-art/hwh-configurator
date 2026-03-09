import { useState, useRef, useEffect, useCallback } from "react";

// ─── Responsive hook ──────────────────────────────────────────────────────────
function useWindowSize() {
  const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight });
  useEffect(() => {
    const fn = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return size;
}

const C = {
  black:  "#251917",
  orange: "#D96339",
  gold:   "#EBBD46",
  white:  "#FFFFFF",
  darkbg: "#1E1410",
  panel:  "#2A1D16",
  border: "#3D2A1F",
};

const LOGO_SRC = "data:image/png;base64,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";

const WALL_H_MM  = 2400;
const KICK_H_MM  = 150;   // kick plate height on all floor-standing units
const FLOOR_H_MM = 870;   // total height including kick plate
const UPPER_H_MM = 720;
const TALL_H_MM  = 2450;
const SNAP_MM    = 100;

// Corner rotation: 0=top-left, 1=top-right, 2=bottom-right, 3=bottom-left
const CORNER_ROTATIONS = ["↖ Top-Left","↗ Top-Right","↘ Bottom-Right","↙ Bottom-Left"];

// ─── Project-level materials ───────────────────────────────────────────────────
const COUNTERTOP_TYPES = [
  { id:"marble",   label:"Marble",   subtitle:"Natural / Engineered stone" },
  { id:"granite",  label:"Granite",  subtitle:"Natural stone — very durable" },
  { id:"melamine", label:"Melamine", subtitle:"Laminate board surface"     },
];

const COUNTERTOP_COLOURS = [
  // Shared / general
  { id:"ct-white",       label:"White / Off-white",    color:"#F5F2EC", pattern:null,       types:["marble","melamine"] },
  { id:"ct-grey",        label:"Light Grey / Concrete", color:"#C8C8C4", pattern:"concrete", types:["marble","melamine"] },
  { id:"ct-black",       label:"Black / Nero",          color:"#1E1E1E", pattern:null,       types:["marble","granite","melamine"] },
  { id:"ct-marble",      label:"Marble / Stone look",   color:"#EAE6E0", pattern:"marble",   types:["marble"] },
  { id:"ct-timber",      label:"Timber / Wood look",    color:"#C4935A", pattern:"wood",     types:["melamine"] },
  // Granite specific
  { id:"ct-gran-black",  label:"Absolute Black",        color:"#1A1A1A", pattern:"granite-dark",  types:["granite"] },
  { id:"ct-gran-grey",   label:"Steel Grey",            color:"#6E7A80", pattern:"granite-grey",  types:["granite"] },
  { id:"ct-gran-white",  label:"Colonial White",        color:"#EDE8DF", pattern:"granite-light", types:["granite"] },
  { id:"ct-gran-brown",  label:"Tan Brown",             color:"#7A4A30", pattern:"granite-brown", types:["granite"] },
  { id:"ct-gran-green",  label:"Verde Butterfly",       color:"#4A6A50", pattern:"granite-green", types:["granite"] },
  { id:"ct-gran-blue",   label:"Blue Pearl",            color:"#3A4A6A", pattern:"granite-blue",  types:["granite"] },
];

const CARCASS_TYPES_MATERIAL = [
  { id:"solid",    label:"Solid Wood",  subtitle:"Hardwood carcass — premium" },
  { id:"melamine", label:"Melamine",    subtitle:"MDF / chipboard laminate"   },
];

const DRAWER_H_MM = 870; // same footprint as base, but drawn with drawer stacks

// Floor-standing types that get a kick plate
const FLOOR_TYPES = ["base","drawer","tall-single","tall-double","tall-double-v","corner"];

const CARCASS_TYPES = [
  // Base units
  { id:"base-450",         type:"base",        label:"Base Unit",          width:450, height:FLOOR_H_MM, desc:"450mm",   icon:"▬", bg:"#3D2A1F" },
  { id:"base-600",         type:"base",        label:"Base Unit",          width:600, height:FLOOR_H_MM, desc:"600mm",   icon:"▬", bg:"#3D2A1F" },
  { id:"base-800",         type:"base",        label:"Base Unit",          width:800, height:FLOOR_H_MM, desc:"800mm",   icon:"▬", bg:"#3D2A1F" },
  // Drawer units
  { id:"drawer-450",       type:"drawer",      label:"Drawer Unit",        width:450, height:DRAWER_H_MM,desc:"450mm",   icon:"▤", bg:"#3A2A20" },
  { id:"drawer-600",       type:"drawer",      label:"Drawer Unit",        width:600, height:DRAWER_H_MM,desc:"600mm",   icon:"▤", bg:"#3A2A20" },
  { id:"drawer-800",       type:"drawer",      label:"Drawer Unit",        width:800, height:DRAWER_H_MM,desc:"800mm",   icon:"▤", bg:"#3A2A20" },
  // Wall cabinets (no kick plate)
  { id:"upper-450",        type:"upper",       label:"Wall Cabinet",       width:450, height:UPPER_H_MM, desc:"450mm",   icon:"▭", bg:"#2A1D16" },
  { id:"upper-600",        type:"upper",       label:"Wall Cabinet",       width:600, height:UPPER_H_MM, desc:"600mm",   icon:"▭", bg:"#2A1D16" },
  { id:"upper-800",        type:"upper",       label:"Wall Cabinet",       width:800, height:UPPER_H_MM, desc:"800mm",   icon:"▭", bg:"#2A1D16" },
  // Tall — single full-height door (1 door, 3 hinges)
  { id:"tall-single-450",  type:"tall-single", label:"Tall — Single Door", width:450, height:TALL_H_MM,  desc:"450mm · 1 door", icon:"▮", bg:"#321E14" },
  { id:"tall-single-600",  type:"tall-single", label:"Tall — Single Door", width:600, height:TALL_H_MM,  desc:"600mm · 1 door", icon:"▮", bg:"#321E14" },
  { id:"tall-single-800",  type:"tall-single", label:"Tall — Single Door", width:800, height:TALL_H_MM,  desc:"800mm · 1 door", icon:"▮", bg:"#321E14" },
  // Tall — double stacked doors (2 doors, 4 hinges total — 2 per door)
  { id:"tall-double-450",  type:"tall-double", label:"Tall — Double Door",  width:450, height:TALL_H_MM,  desc:"450mm · 2 doors", icon:"▯", bg:"#2C1C12" },
  { id:"tall-double-600",  type:"tall-double", label:"Tall — Double Door",  width:600, height:TALL_H_MM,  desc:"600mm · 2 doors", icon:"▯", bg:"#2C1C12" },
  { id:"tall-double-800",  type:"tall-double", label:"Tall — Double Door",  width:800, height:TALL_H_MM,  desc:"800mm · 2 doors", icon:"▯", bg:"#2C1C12" },
  // Tall — vertical divide (2 side-by-side doors, left + right hinged)
  { id:"tall-dv-450",  type:"tall-double-v", label:"Tall — Split Door",   width:450, height:TALL_H_MM,  desc:"450mm · L+R doors", icon:"▥", bg:"#281A10" },
  { id:"tall-dv-600",  type:"tall-double-v", label:"Tall — Split Door",   width:600, height:TALL_H_MM,  desc:"600mm · L+R doors", icon:"▥", bg:"#281A10" },
  { id:"tall-dv-800",  type:"tall-double-v", label:"Tall — Split Door",   width:800, height:TALL_H_MM,  desc:"800mm · L+R doors", icon:"▥", bg:"#281A10" },
  // Corner units
  { id:"corner-900",       type:"corner",      label:"Corner Unit",        width:900, height:FLOOR_H_MM, desc:"900×900", icon:"◣", bg:"#2D1C13" },
];

// ─── Hinges ───────────────────────────────────────────────────────────────────
const HINGES = [
  { id:"hinge-std",   label:"Standard Hinge",    subtitle:"Adjustable overlay hinge",    icon:"⬡" },
  { id:"hinge-soft",  label:"Soft-Close Hinge",  subtitle:"Dampened soft-close action",  icon:"⬡" },
];
const DEFAULT_HINGE = "hinge-std";

// Hinge count rules — returns { doors, hingesPerDoor, total }
function hingeCount(unit) {
  const t = unit.type;
  if (t === "drawer")      return { doors:0, hingesPerDoor:0, total:0 };
  if (t === "base")        return { doors: unit.width >= 600 ? 2 : 1, hingesPerDoor:2, total: unit.width >= 600 ? 4 : 2 };
  if (t === "upper")       return { doors: unit.width >= 600 ? 2 : 1, hingesPerDoor:2, total: unit.width >= 600 ? 4 : 2 };
  if (t === "corner")      return { doors:1, hingesPerDoor:2, total:2 };
  if (t === "tall-single") return { doors:1, hingesPerDoor:3, total:3 };   // 1 tall door needs 3 hinges
  if (t === "tall-double") return { doors:2, hingesPerDoor:2, total:4 };   // 2 stacked doors, 2 hinges each
  if (t === "tall-double-v") return { doors:2, hingesPerDoor:2, total:4 };  // 2 side-by-side doors, 2 hinges each
  return { doors:0, hingesPerDoor:0, total:0 };
}

// ─── Runners ─────────────────────────────────────────────────────────────────
const RUNNERS = [
  { id:"runner-std",  label:"Standard Runner",   subtitle:"Side-mount steel runner",      icon:"⇒" },
  { id:"runner-soft", label:"Soft-Close Runner", subtitle:"Dampened soft-close action",   icon:"⇒" },
];
const DEFAULT_RUNNER = "runner-std";

// Drawer count per unit
function drawerCount(unit) {
  if (unit.type !== "drawer") return 0;
  return unit.width <= 450 ? 3 : 4;
}

const FINISHES = [
  { id:"matte-white",    label:"Matte White",   color:"#F5F5F0", type:"matte" },
  { id:"matte-cream",    label:"Matte Cream",   color:"#EDE8DC", type:"matte" },
  { id:"matte-sage",     label:"Sage Green",    color:"#8A9E85", type:"matte" },
  { id:"matte-charcoal", label:"Charcoal",      color:"#4A4A4A", type:"matte" },
  { id:"matte-navy",     label:"Navy Blue",     color:"#2C3E6B", type:"matte" },
  { id:"matte-clay",     label:"Clay",          color:"#C4724A", type:"matte" },
  { id:"matte-dustpink", label:"Dusty Rose",    color:"#C9A49A", type:"matte" },
  { id:"matte-slate",    label:"Slate Grey",    color:"#7A8A96", type:"matte" },
  { id:"gloss-white",    label:"Gloss White",   color:"#FAFAFA", type:"gloss" },
  { id:"gloss-black",    label:"Gloss Black",   color:"#1A1A1A", type:"gloss" },
  { id:"gloss-champ",    label:"Champagne",     color:"#D4B896", type:"gloss" },
  { id:"wood-oak",       label:"Natural Oak",   color:"#C8A870", type:"wood"  },
  { id:"wood-walnut",    label:"Dark Walnut",   color:"#5C3D2E", type:"wood"  },
  { id:"wood-ash",       label:"Ash Grey",      color:"#A8A8A0", type:"wood"  },
  { id:"wood-pine",      label:"Light Pine",    color:"#DEC48A", type:"wood"  },
];

const HARDWARE = [
  { id:"none",   label:"Push-Open",    color:null      },
  { id:"gold",   label:"Brushed Gold", color:"#C9A84C" },
  { id:"silver", label:"Chrome Silver",color:"#C0C0C0" },
  { id:"black",  label:"Matte Black",  color:"#2A2A2A" },
  { id:"bronze", label:"Oil Bronze",   color:"#614E3A" },
];


// ─── Pricing Catalog (ingested from hwh_pricing_catalog.xlsx) ─────────────────
// ── EmailJS configuration — initialised via CDN in index.html ────────────────
const EMAILJS_SERVICE_ID  = "service_30616fj";
const EMAILJS_TEMPLATE_ID = "template_i1gwlja";

const PRICING = {
  // 1. Carcass units — price per unit (R)
  carcass: {
    "base-450": 450,   "base-600": 550,   "base-800": 720,
    "drawer-450": 950, "drawer-600": 1150,"drawer-800": 1450,
    "upper-450": 450,  "upper-600": 550,  "upper-800": 720,
    "tall-single-450": 1150, "tall-single-600": 1450, "tall-single-800": 1950,
    "tall-double-450": 1150, "tall-double-600": 1450, "tall-double-800": 1950,
    "tall-dv-450": 1150, "tall-dv-600": 1450, "tall-dv-800": 1950,
    "corner-900": 1650,
  },
  // 2. Countertops — price per linear metre (R/lm), keyed by ctColour id
  countertop: {
    "ct-white":      2350,  // Marble White
    "ct-grey":       2350,  // Marble Light Grey
    "ct-black":      2450,  // Marble/Granite/Melamine Black
    "ct-marble":     2600,  // Marble / Stone look
    "ct-timber":      850,  // Melamine Timber
    "ct-gran-black": 1850,
    "ct-gran-grey":  2100,
    "ct-gran-white": 2100,
    "ct-gran-brown": 2410,
    "ct-gran-green": 2600,
    "ct-gran-blue":  2100,
    "ct-mel-wht":     850,
    "ct-mel-gry":     850,
    "ct-mel-blk":     850,
    "ct-mel-tmb":     850,
  },
  // 3. Carcass build upcharge per unit (R) — added on top of carcass base price
  carcassBuild: { "melamine": 650, "solid": 950 },
  // 4. Door finishes — price per door leaf (R), keyed by finish id
  finish: {
    "matte-white": 650,  "matte-cream": 650,  "matte-sage": 650,
    "matte-charcoal": 650, "matte-navy": 650, "matte-clay": 650,
    "matte-dustpink": 650, "matte-slate": 650,
    "gloss-white": 950, "gloss-black": 950, "gloss-champ": 950,
    "wood-oak": 1100, "wood-walnut": 1600, "wood-ash": 1100, "wood-pine": 1100,
  },
  // 5. Handles — price per handle (R), keyed by hardware id
  hardware: { "none": 110, "gold": 25, "silver": 25, "black": 25, "bronze": 25 },
  // 6. Hinges — price per hinge (R)
  hinge: { "hinge-std": 75, "hinge-soft": 115 },
  // 7. Drawer runners — price per pair (R)
  runner: { "runner-std": 145, "runner-soft": 195 },
  // 8. Kick plate — price per linear metre (R/lm)
  kickPlate: 85,
};

// ── Calculate total price for the full job ─────────────────────────────────────
function calcJobTotal(units, materials) {
  let total = 0;
  const carcassBuildUpcharge = PRICING.carcassBuild[materials.carcass] || 0;

  // Floor run in metres (for countertop + kick plate)
  const floorRunM = units
    .filter(u => ["base","drawer","tall-single","tall-double","tall-double-v","corner"].includes(u.type))
    .reduce((s, u) => s + u.width, 0) / 1000;

  // Base-only run for countertop (base + drawer units only)
  const countertopRunM = units
    .filter(u => ["base","drawer","corner"].includes(u.type))
    .reduce((s, u) => s + u.width, 0) / 1000;

  units.forEach(u => {
    const carcassKey = `${u.type}-${u.width}`;
    const carcassPrice = PRICING.carcass[carcassKey] || 0;
    total += carcassPrice + carcassBuildUpcharge;

    // Door finish cost (price per door leaf × door count)
    const hc = hingeCount(u);
    const finishPricePerDoor = PRICING.finish[u.finish || DEFAULT_FINISH] || 0;
    total += finishPricePerDoor * hc.doors;

    // Handle cost (1 per door leaf + 1 per drawer face)
    const dc = drawerCount(u);
    const handlePrice = PRICING.hardware[u.hardware || DEFAULT_HW] || 0;
    total += handlePrice * (hc.doors + dc);

    // Hinge cost
    const hingePrice = PRICING.hinge[u.hinge || DEFAULT_HINGE] || 0;
    total += hingePrice * hc.total;

    // Runner cost (per pair)
    const runnerPrice = PRICING.runner[u.runner || DEFAULT_RUNNER] || 0;
    total += runnerPrice * dc;
  });

  // Countertop (base + drawer floor run)
  const ctPrice = PRICING.countertop[materials.ctColour] || 0;
  total += ctPrice * countertopRunM;

  // Kick plate (all floor units)
  total += PRICING.kickPlate * floorRunM;

  // Apply build markup: melamine +30%, solid wood +60%
  const markup = materials.carcass === "solid" ? 1.60 : 1.30;
  return Math.round(total * markup);
}

const DEFAULT_FINISH = "matte-white";
const DEFAULT_HW     = "gold";

const snapMm    = v => Math.round(v / SNAP_MM) * SNAP_MM;
const getFinish = id => FINISHES.find(f => f.id === id) || FINISHES[0];

function finishBg(id) {
  const f = getFinish(id);
  if (f.type === "wood")  return `repeating-linear-gradient(90deg,${f.color}CC 0,${f.color} 2px,${f.color}88 5px,${f.color} 8px)`;
  if (f.type === "gloss") return `linear-gradient(145deg,${f.color} 55%,#fff5 100%)`;
  return f.color;
}

function countertopBg(ct) {
  if (!ct) return "transparent";
  switch(ct.pattern) {
    case "marble":        return `linear-gradient(135deg,#EAE6E0 38%,#D8D4CE 40%,#EAE6E0 42%,#E0DCD5 58%,#EAE6E0 60%,#D4D0CA 78%,#EAE6E0 80%)`;
    case "concrete":      return `radial-gradient(ellipse at 30% 40%,#C0C0BC 0%,#C8C8C4 40%,#BEBEBA 100%)`;
    case "wood":          return `repeating-linear-gradient(90deg,#C4935A 0,#B8864E 2px,#C4935A 5px,#BE8D54 8px)`;
    case "granite-dark":  return `radial-gradient(ellipse at 20% 30%,#2A2A2A 0%,#1A1A1A 50%,#242424 100%)`;
    case "granite-grey":  return `radial-gradient(ellipse at 60% 40%,#7A8690 0%,#6E7A80 50%,#626E74 100%)`;
    case "granite-light": return `radial-gradient(ellipse at 30% 60%,#F0EBE2 0%,#EDE8DF 50%,#E4DFD4 100%)`;
    case "granite-brown": return `radial-gradient(ellipse at 70% 30%,#8A5438 0%,#7A4A30 50%,#6A3E28 100%)`;
    case "granite-green": return `radial-gradient(ellipse at 40% 50%,#567860 0%,#4A6A50 50%,#3E5C44 100%)`;
    case "granite-blue":  return `radial-gradient(ellipse at 50% 40%,#46567A 0%,#3A4A6A 50%,#2E3E5A 100%)`;
    default:              return ct.color;
  }
}

// Returns corner polygon points based on rotation (0-3)
function cornerPoints(W, H, rot) {
  const cx = W * 0.38, cy = H * 0.38;
  switch(rot % 4) {
    case 0: return `0,0 ${W},0 ${W},${H} ${cx},${H} 0,${H-cy}`; // top-left notch
    case 1: return `0,0 ${W},0 ${W},${H-cy} ${W-cx},${H} 0,${H}`; // top-right notch
    case 2: return `${W-cx},0 ${W},${cy} ${W},${H} 0,${H} 0,0`; // bottom-right notch
    case 3: return `0,${cy} ${cx},0 ${W},0 ${W},${H} 0,${H}`; // bottom-left notch
    default: return `0,0 ${W},0 ${W},${H} ${cx},${H} 0,${H-cy}`;
  }
}

// ─── Cabinet SVG ──────────────────────────────────────────────────────────────
function CabinetSVG({ unit, pxPerMm, selected, ctColour }) {
  const W           = unit.width  * pxPerMm;
  const H           = unit.height * pxPerMm;
  const f           = getFinish(unit.finish || DEFAULT_FINISH);
  const hw          = HARDWARE.find(h => h.id === (unit.hardware || DEFAULT_HW));
  const isWood      = f.type === "wood";
  const isGloss     = f.type === "gloss";
  const isBase      = unit.type === "base";
  const isDrawer    = unit.type === "drawer";
  const isCorner    = unit.type === "corner";
  const isTallSingle = unit.type === "tall-single";
  const isTallDouble = unit.type === "tall-double";
  const isTallDoubleV= unit.type === "tall-double-v";
  const isTall       = isTallSingle || isTallDouble || isTallDoubleV;
  const isFloor     = FLOOR_TYPES.includes(unit.type);
  const uid         = unit.id;

  // Door count: base/upper 450=1, 600/800=2; tall-single always 1; tall-double always 2; corner=1
  const doors = isTallSingle ? 1
              : (isTallDouble || isTallDoubleV) ? 2
              : unit.width >= 600 ? 2 : 1;

  const kickH    = isFloor ? KICK_H_MM * pxPerMm : 0;
  const topH     = H - kickH;
  const countTop = (isBase || isDrawer) ? 38 * pxPerMm : 0;
  const pad      = Math.max(3, W * 0.045);
  const topPad   = pad + countTop;
  const bodyH    = topH - topPad - pad;
  const dw       = (W - pad * 2) / doors;
  const rot      = unit.rotation || 0;

  return (
    <svg width={W} height={H} style={{ display:"block", overflow:"visible", pointerEvents:"none" }}>
      <defs>
        {isWood && (
          <pattern id={`g${uid}`} patternUnits="userSpaceOnUse" width="8" height="200">
            <rect width="8" height="200" fill={f.color}/>
            <line x1="2" y1="0" x2="2" y2="200" stroke={f.color+"66"} strokeWidth="0.7"/>
            <line x1="5" y1="0" x2="5" y2="200" stroke={f.color+"44"} strokeWidth="1"/>
          </pattern>
        )}
        {isGloss && (
          <linearGradient id={`gs${uid}`} x1="0" y1="0" x2="0.2" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.22"/>
            <stop offset="60%" stopColor="#fff" stopOpacity="0"/>
          </linearGradient>
        )}
        {selected && (
          <filter id={`sel${uid}`} x="-12%" y="-12%" width="124%" height="124%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor={C.orange} floodOpacity="1"/>
          </filter>
        )}
      </defs>

      {isCorner ? (
        <>
          <polygon points={cornerPoints(W, topH, rot)}
            fill={isWood ? `url(#g${uid})` : f.color}
            stroke={selected ? C.orange : "#00000044"}
            strokeWidth={selected ? 2.5 : 1}
            filter={selected ? `url(#sel${uid})` : undefined}/>
          {isGloss && <polygon points={cornerPoints(W, topH, rot)} fill={`url(#gs${uid})`}/>}
          <rect x={0} y={topH} width={W} height={kickH} fill="#1A1210" rx={1}/>
          <rect x={4} y={topH+2} width={W-8} height={kickH-4} fill="#222" rx={1}/>
          <text x={W/2} y={topH/2+4} textAnchor="middle" fontSize={Math.max(9, pxPerMm*28)}
            fill="rgba(255,255,255,0.4)" fontFamily="sans-serif">{["↖","↗","↘","↙"][rot % 4]}</text>
          <rect x={W/2-22} y={topH-16} width={44} height={13} rx={3} fill="rgba(0,0,0,0.55)"/>
          <text x={W/2} y={topH-6} textAnchor="middle" fontSize={Math.max(7, pxPerMm*30)}
            fill={C.gold} fontFamily="sans-serif">900mm</text>
        </>
      ) : (
        <>
          {/* Carcass body */}
          <rect x={0} y={0} width={W} height={topH} rx={1.5}
            fill={isWood ? `url(#g${uid})` : f.color}
            stroke={selected ? C.orange : "#00000044"}
            strokeWidth={selected ? 2.5 : 1}
            filter={selected ? `url(#sel${uid})` : undefined}/>
          {isGloss && <rect x={0} y={0} width={W} height={topH} rx={1.5} fill={`url(#gs${uid})`}/>}

          {/* Countertop on base/drawer */}
          {(isBase || isDrawer) && (() => {
            const ctBg = ctColour ? countertopBg(ctColour) : "#CEBFAE";
            return (<>
              <rect x={0} y={0} width={W} height={countTop} rx={1.5} fill={ctBg}/>
              <rect x={0} y={countTop-3} width={W} height={3} fill="rgba(0,0,0,0.2)"/>
            </>);
          })()}

          {/* Kick plate */}
          {isFloor && (<>
            <rect x={0} y={topH} width={W} height={kickH} fill="#1A1210" rx={1}/>
            <rect x={4} y={topH+2} width={W-8} height={kickH-4} fill="#222" rx={1}/>
          </>)}

          {/* Drawer stacks */}
          {isDrawer && (() => {
            const numD = unit.width <= 450 ? 3 : 4;
            const dH   = bodyH / numD;
            return Array.from({length:numD}).map((_,i) => (
              <g key={i}>
                <rect x={pad+2} y={topPad+i*dH+2} width={W-pad*2-4} height={dH-4}
                  fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth={1} rx={1}/>
                {hw?.color && <rect x={W/2-18} y={topPad+i*dH+dH*0.44} width={36} height={4} rx={2} fill={hw.color}/>}
              </g>
            ));
          })()}

          {/* Door panels — tall-double gets two stacked doors with a mid-rail */}
          {!isDrawer && (() => {
            if (isTallDouble) {
              // Two stacked doors separated by a mid-rail at 50% body height
              const halfH = bodyH / 2;
              const railY  = topPad + halfH;
              return (<>
                {/* Top door */}
                <rect x={pad+3} y={topPad+3} width={W-pad*2-6} height={halfH-6}
                  fill="none" stroke="rgba(0,0,0,0.13)" strokeWidth={1} rx={1}/>
                {hw?.color && <rect x={W/2-10} y={topPad+halfH*0.5} width={20} height={4} rx={2} fill={hw.color}/>}
                {/* Mid rail */}
                <rect x={0} y={railY-2} width={W} height={4} fill="rgba(0,0,0,0.25)"/>
                {/* Bottom door */}
                <rect x={pad+3} y={railY+3} width={W-pad*2-6} height={halfH-6}
                  fill="none" stroke="rgba(0,0,0,0.13)" strokeWidth={1} rx={1}/>
                {hw?.color && <rect x={W/2-10} y={railY+halfH*0.5} width={20} height={4} rx={2} fill={hw.color}/>}
                {/* Double-door label badge */}
                <rect x={W/2-14} y={topH-28} width={28} height={10} rx={2} fill={C.orange+"44"}/>
                <text x={W/2} y={topH-20} textAnchor="middle" fontSize={Math.max(6, pxPerMm*18)}
                  fill={C.gold} fontFamily="sans-serif">2-door</text>
              </>);
            }
            // Tall double vertical — 2 side-by-side doors with centre stile
            if (isTallDoubleV) {
              const halfW = (W - pad*2) / 2;
              return (<>
                {/* Left door */}
                <rect x={pad+3} y={topPad+3} width={halfW-6} height={bodyH-6}
                  fill="none" stroke="rgba(0,0,0,0.13)" strokeWidth={1} rx={1}/>
                {hw?.color && <rect x={pad+halfW*0.5-10} y={topPad+bodyH*0.5} width={20} height={4} rx={2} fill={hw.color}/>}
                {/* Centre stile */}
                <rect x={pad+halfW-2} y={topPad} width={4} height={bodyH} fill="rgba(0,0,0,0.25)"/>
                {/* Right door */}
                <rect x={pad+halfW+3} y={topPad+3} width={halfW-6} height={bodyH-6}
                  fill="none" stroke="rgba(0,0,0,0.13)" strokeWidth={1} rx={1}/>
                {hw?.color && <rect x={pad+halfW+halfW*0.5-10} y={topPad+bodyH*0.5} width={20} height={4} rx={2} fill={hw.color}/>}
                {/* Split-door label */}
                <rect x={W/2-16} y={topH-28} width={32} height={10} rx={2} fill={C.orange+"44"}/>
                <text x={W/2} y={topH-20} textAnchor="middle" fontSize={Math.max(6, pxPerMm*18)}
                  fill={C.gold} fontFamily="sans-serif">L+R</text>
              </>);
            }
            // Single-door or standard multi-door (base/upper)
            return Array.from({length:doors}).map((_,i) => (
              <g key={i}>
                <rect x={pad+i*dw+3} y={topPad+3} width={dw-6} height={bodyH-6}
                  fill="none" stroke="rgba(0,0,0,0.13)" strokeWidth={1} rx={1}/>
                {hw?.color && <rect x={pad+i*dw+dw/2-10} y={topPad+bodyH*0.5}
                  width={20} height={4} rx={2} fill={hw.color}/>}
              </g>
            ));
          })()}

          {/* Dimension chip */}
          <rect x={W/2-22} y={topH-16} width={44} height={13} rx={3} fill="rgba(0,0,0,0.55)"/>
          <text x={W/2} y={topH-6} textAnchor="middle" fontSize={Math.max(7, pxPerMm*30)}
            fill={C.gold} fontFamily="sans-serif">{unit.width}mm</text>
        </>
      )}
    </svg>
  );
}

// ─── HWH Logo SVG ─────────────────────────────────────────────────────────────
function HWHLogo({ size = 36 }) {
  const r = size / 2;
  const circles = [
    { bg:C.orange, diamond:C.gold,  dot:C.black },
    { bg:C.black,  diamond:C.white, dot:C.orange },
    { bg:C.gold,   diamond:C.orange,dot:C.black },
  ];
  const totalW = size*3 + 4;
  return (
    <svg width={totalW} height={size} viewBox={`0 0 ${totalW} ${size}`}>
      {circles.map((col, i) => {
        const cx = r + i*(size+2), cy = r, d = r*0.58;
        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r={r} fill={col.bg}/>
            <polygon points={`${cx},${cy-d} ${cx+d},${cy} ${cx},${cy+d} ${cx-d},${cy}`} fill={col.diamond}/>
            <circle cx={cx} cy={cy} r={r*0.2} fill={col.dot}/>
          </g>
        );
      })}
    </svg>
  );
}

// ─── Left Panel: smart panel switches between palette & finish editor ──────────
function LeftPanel({ phase, units, selected, setSelected, setUnits, onClearAll, onPaletteDragStart, onTapAdd, totalFloor, onNext }) {
  const [openGroup, setOpenGroup] = useState(null);
  const PALETTE_GROUPS = [
    { key:"base",   label:"Base Units",   icon:"▬", types:["base"],         floor:true  },
    { key:"drawer", label:"Drawer Units", icon:"▤", types:["drawer"],       floor:true  },
    { key:"upper",  label:"Wall Cabinets",icon:"▭", types:["upper"],        floor:false },
    { key:"tall",   label:"Tall / Pantry",icon:"▮", types:["tall-single","tall-double","tall-double-v"], floor:true },
    { key:"corner", label:"Corner Units", icon:"◣", types:["corner"],       floor:true  },
  ];
  const selUnit   = units.find(u => u.id === selected);
  const updateSel = patch => setUnits(p => p.map(u => u.id===selected ? {...u,...patch} : u));
  const applyAll      = patch => setUnits(p => p.map(u => ({...u,...patch})));
  const applyType     = patch => setUnits(p => p.map(u => u.type===selUnit?.type ? {...u,...patch} : u));
  const applyAllHinge  = hid  => setUnits(p => p.map(u => u.type !== "drawer" ? {...u, hinge:hid} : u));
  const applyAllRunner = rid  => setUnits(p => p.map(u => u.type === "drawer" ? {...u, runner:rid} : u));
  const removeSel = ()    => { setUnits(p => p.filter(u => u.id!==selected)); setSelected(null); };

  // Show finish editor if something is selected AND we're in finish phase
  const showFinishes = phase === "finish" && selUnit;
  // Show unit list in finish phase but nothing selected
  const showUnitList = phase === "finish" && !selUnit;

  return (
    <aside style={{ width:220, background:C.panel, display:"flex", flexDirection:"column", height:"100%", overflow:"hidden" }}>

      {/* Panel header */}
      <div style={{ padding:"10px 14px", fontSize:8, letterSpacing:3, color:C.orange, textTransform:"uppercase", borderBottom:`1px solid ${C.border}`, background:C.black, flexShrink:0 }}>
        {showFinishes
          ? (() => {
              const ct = CARCASS_TYPES.find(c=>c.type===selUnit.type&&c.width===selUnit.width);
              const isDrawer = selUnit.type === "drawer";
              return (
                <span>
                  {isDrawer ? "⇒ " : "⬡ "}
                  {ct?.label || selUnit.type} · {selUnit.width}mm
                  <span style={{ color:"#555", marginLeft:6, fontSize:7 }}>
                    {isDrawer ? `${drawerCount(selUnit)} drawers` : `${hingeCount(selUnit).total} hinges`}
                  </span>
                </span>
              );
            })()
          : showUnitList ? "③ Tap a unit below to edit"
          : "① Add Cabinets"}
      </div>

      <div style={{ flex:1, overflowY:"auto", minHeight:0 }}>

        {/* ── PALETTE (layout phase) ── */}
        {phase === "layout" && (
          <>
            {PALETTE_GROUPS.map(group => {
              const items   = CARCASS_TYPES.filter(c => group.types.includes(c.type));
              const isOpen  = openGroup === group.key;
              return (
                <div key={group.key} style={{ borderBottom:`1px solid ${C.border}22` }}>
                  {/* Accordion header */}
                  <button onClick={()=>setOpenGroup(isOpen ? null : group.key)} style={{
                    width:"100%", padding:"10px 12px", background: isOpen ? C.orange+"18" : "transparent",
                    border:"none", borderLeft: isOpen ? `3px solid ${C.orange}` : "3px solid transparent",
                    cursor:"pointer", display:"flex", alignItems:"center", gap:10, fontFamily:"inherit",
                    transition:"all 0.15s",
                  }}>
                    <span style={{ fontSize:15, color: isOpen ? C.gold : "#555", flexShrink:0 }}>{group.icon}</span>
                    <div style={{ flex:1, textAlign:"left" }}>
                      <div style={{ fontSize:10, color: isOpen ? C.white : "#888", fontWeight: isOpen?"bold":"normal" }}>{group.label}</div>
                      {group.floor && <div style={{ fontSize:7, color:C.orange+"55", marginTop:1 }}>+ kick plate</div>}
                    </div>
                    <span style={{ fontSize:10, color: isOpen ? C.orange : "#444", transition:"transform 0.2s", display:"inline-block", transform: isOpen?"rotate(90deg)":"rotate(0deg)" }}>›</span>
                  </button>
                  {/* Accordion body */}
                  {isOpen && (
                    <div style={{ paddingBottom:6, background:"rgba(0,0,0,0.15)" }}>
                      {items.map(c => (
                        <div key={c.id} draggable onDragStart={e=>onPaletteDragStart(e,c)}
                          style={{ margin:"3px 8px", padding:"8px 10px", background:c.bg, border:`1px solid ${C.border}`, borderRadius:5, cursor:"grab", display:"flex", alignItems:"center", gap:10, userSelect:"none", transition:"border-color 0.1s, transform 0.1s" }}
                          onMouseEnter={e=>{e.currentTarget.style.borderColor=C.orange;e.currentTarget.style.transform="translateX(2px)";}}
                          onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.transform="none";}}
                        >
                          <span style={{ fontSize:14, color:C.gold, opacity:0.8, flexShrink:0 }}>{c.icon}</span>
                          <div style={{ flex:1 }}>
                            <div style={{ fontSize:10, color:C.white }}>{c.desc}</div>
                          </div>
                          {onTapAdd
                            ? <button onClick={()=>onTapAdd(c)} style={{ background:C.orange, border:"none", borderRadius:4, color:C.white, width:26, height:26, fontSize:16, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>＋</button>
                            : <span style={{ fontSize:8, color:C.orange+"99" }}>drag</span>
                          }
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            {units.length>0 && (
              <div style={{ margin:"12px 8px 0", paddingTop:10, borderTop:`1px solid ${C.border}` }}>
                <div style={{ fontSize:10, color:"#666" }}><span style={{color:C.white}}>{units.length}</span> unit{units.length!==1?"s":""} placed</div>
                <div style={{ fontSize:10, color:"#666", marginTop:3 }}>Floor run: <span style={{color:C.gold}}>{totalFloor}mm</span></div>
                <button onClick={onClearAll} style={{ ...sBtn("transparent","#C55"), marginTop:8, padding:"5px 8px", fontSize:9, width:"100%" }}>Clear All</button>
              </div>
            )}
          </>
        )}

        {/* ── UNIT LIST (finish phase, nothing selected) ── */}
        {showUnitList && (
          <>
            <div style={{ padding:"10px 12px 4px", fontSize:10, color:"#555" }}>
              Select a cabinet to edit its finish:
            </div>
            {units.map(u => {
              const f  = getFinish(u.finish);
              const ct = CARCASS_TYPES.find(c => c.type===u.type && c.width===u.width);
              const isDrawer = u.type === "drawer";
              const hc = hingeCount(u);
              const dc = drawerCount(u);
              return (
                <button key={u.id} onClick={()=>setSelected(u.id)} style={{
                  width:"100%", padding:"9px 10px", border:"none",
                  borderLeft:`3px solid transparent`,
                  background:"transparent", color:"#888",
                  textAlign:"left", cursor:"pointer", display:"flex", alignItems:"center", gap:9,
                }}>
                  <div style={{ width:20, height:20, borderRadius:3, flexShrink:0, border:`1px solid ${C.border}`, background:finishBg(u.finish) }}/>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:10, color:C.white }}>{ct?.label || u.type} · {u.width}mm</div>
                    <div style={{ fontSize:8, color:"#555", marginTop:1 }}>
                      {isDrawer
                        ? `${dc} drawers · ${RUNNERS.find(r=>r.id===(u.runner||DEFAULT_RUNNER))?.label}`
                        : `${hc.total} hinges · ${HINGES.find(h=>h.id===(u.hinge||DEFAULT_HINGE))?.label}`
                      }
                    </div>
                  </div>
                </button>
              );
            })}
          </>
        )}

        {/* ── FINISH EDITOR (finish phase, unit selected) ── */}
        {showFinishes && (
          <div style={{ padding:"10px 12px" }}>

            {/* Unit switcher strip — tap to jump between units */}
            {units.length > 1 && (
              <div style={{ marginBottom:10, display:"flex", gap:4, overflowX:"auto", paddingBottom:2 }}>
                {units.map(u => {
                  const ct       = CARCASS_TYPES.find(c=>c.type===u.type&&c.width===u.width);
                  const isDrawer = u.type === "drawer";
                  const isSel    = selected === u.id;
                  return (
                    <button key={u.id} onClick={()=>setSelected(u.id)} title={`${ct?.label} ${u.width}mm`} style={{
                      flexShrink:0, padding:"4px 8px", borderRadius:12, cursor:"pointer",
                      border: isSel ? `1.5px solid ${C.orange}` : `1px solid ${C.border}`,
                      background: isSel ? C.orange+"22" : "rgba(255,255,255,0.03)",
                      color: isSel ? C.white : "#555",
                      fontSize:9, fontFamily:"inherit", whiteSpace:"nowrap",
                      display:"flex", alignItems:"center", gap:4,
                    }}>
                      <div style={{ width:8, height:8, borderRadius:1, background:finishBg(u.finish), flexShrink:0 }}/>
                      {u.width}
                      <span style={{ fontSize:7, color: isSel ? C.gold : "#444" }}>{isDrawer?"⇒":"⬡"}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Panel sub-header showing unit type clearly */}
            <div style={{ marginBottom:12, padding:"8px 10px", background:"rgba(0,0,0,0.3)", borderRadius:5, border:`1px solid ${C.border}33` }}>
              <div style={{ fontSize:9, color:C.orange, letterSpacing:1.5, textTransform:"uppercase" }}>
                {CARCASS_TYPES.find(c=>c.type===selUnit.type&&c.width===selUnit.width)?.label || selUnit.type}
              </div>
              <div style={{ fontSize:8, color:"#555", marginTop:2 }}>
                {selUnit.width}mm
                {selUnit.type==="drawer" ? ` · ${drawerCount(selUnit)} drawers · Runners ↓` : ` · ${hingeCount(selUnit).total} hinges · Hinges ↓`}
              </div>
            </div>

            {/* ── GLOBAL FITTINGS — shown when layout has door or drawer units ── */}
            {(() => {
              const hasDoorUnits   = units.some(u => u.type !== "drawer");
              const hasDrawerUnits = units.some(u => u.type === "drawer");
              if (!hasDoorUnits && !hasDrawerUnits) return null;
              // Current global selections (from first matching unit)
              const curHinge  = units.find(u => u.type !== "drawer")?.hinge  || DEFAULT_HINGE;
              const curRunner = units.find(u => u.type === "drawer")?.runner || DEFAULT_RUNNER;
              const totalHingeCount  = units.filter(u=>u.type!=="drawer").reduce((s,u)=>s+hingeCount(u).total,0);
              const totalRunnerCount = units.filter(u=>u.type==="drawer").reduce((s,u)=>s+drawerCount(u),0);
              return (
                <div style={{ marginBottom:14, padding:"10px 12px", background:"rgba(0,0,0,0.25)", borderRadius:6, border:`1px solid ${C.border}33` }}>
                  <div style={{ fontSize:8, letterSpacing:2, color:C.orange, textTransform:"uppercase", marginBottom:10 }}>Fittings — All Units</div>

                  {/* Hinges */}
                  {hasDoorUnits && (
                    <div style={{ marginBottom: hasDrawerUnits ? 10 : 0 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:6 }}>
                        <div style={{ fontSize:8, color:"#666", letterSpacing:1, textTransform:"uppercase" }}>Door Hinges</div>
                        <div style={{ fontSize:8, color:C.gold }}>{totalHingeCount} hinges</div>
                      </div>
                      <div style={{ display:"flex", gap:6 }}>
                        {HINGES.map(h => {
                          const isSel = curHinge === h.id;
                          return (
                            <button key={h.id} onClick={()=>applyAllHinge(h.id)} style={{
                              flex:1, padding:"8px 6px", borderRadius:5, cursor:"pointer",
                              border: isSel ? `2px solid ${C.orange}` : `1px solid ${C.border}`,
                              background: isSel ? C.orange+"22" : "rgba(255,255,255,0.02)",
                              fontFamily:"inherit", textAlign:"center",
                            }}>
                              <div style={{ fontSize:10, color: isSel ? C.white : "#888", fontWeight: isSel?"bold":"normal" }}>
                                {h.id === "hinge-std" ? "Standard" : "Soft-Close"}
                              </div>
                              <div style={{ fontSize:7, color: isSel ? C.gold : "#555", marginTop:2 }}>
                                {h.id === "hinge-std" ? "R75 ea" : "R115 ea"}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Runners */}
                  {hasDrawerUnits && (
                    <div>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:6 }}>
                        <div style={{ fontSize:8, color:"#666", letterSpacing:1, textTransform:"uppercase" }}>Drawer Runners</div>
                        <div style={{ fontSize:8, color:C.gold }}>{totalRunnerCount} pairs</div>
                      </div>
                      <div style={{ display:"flex", gap:6 }}>
                        {RUNNERS.map(r => {
                          const isSel = curRunner === r.id;
                          return (
                            <button key={r.id} onClick={()=>applyAllRunner(r.id)} style={{
                              flex:1, padding:"8px 6px", borderRadius:5, cursor:"pointer",
                              border: isSel ? `2px solid ${C.orange}` : `1px solid ${C.border}`,
                              background: isSel ? C.orange+"22" : "rgba(255,255,255,0.02)",
                              fontFamily:"inherit", textAlign:"center",
                            }}>
                              <div style={{ fontSize:10, color: isSel ? C.white : "#888", fontWeight: isSel?"bold":"normal" }}>
                                {r.id === "runner-std" ? "Standard" : "Soft-Close"}
                              </div>
                              <div style={{ fontSize:7, color: isSel ? C.gold : "#555", marginTop:2 }}>
                                {r.id === "runner-std" ? "R145/pr" : "R195/pr"}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Corner rotation */}
            {selUnit.type === "corner" && (
              <div style={{ marginBottom:14 }}>
                <div style={{ fontSize:8, letterSpacing:2, color:"#666", textTransform:"uppercase", marginBottom:8 }}>Rotation</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:4 }}>
                  {CORNER_ROTATIONS.map((label, i) => (
                    <button key={i} onClick={()=>updateSel({rotation:i})} style={{
                      padding:"6px 4px", borderRadius:4, cursor:"pointer", fontSize:10,
                      border:(selUnit.rotation||0)===i?`1.5px solid ${C.orange}`:`1px solid ${C.border}`,
                      background:(selUnit.rotation||0)===i?C.orange+"22":"rgba(255,255,255,0.02)",
                      color:(selUnit.rotation||0)===i?C.white:"#666",
                      fontFamily:"inherit", textAlign:"center",
                    }}>{label}</button>
                  ))}
                </div>
              </div>
            )}

            {/* ── DRAWERS: Runners first, then handle, then finish ── */}
            {selUnit.type === "drawer" && (() => {
              const dc = drawerCount(selUnit);
              return (<>
                {/* Handle */}
                <div style={{ marginBottom:12, paddingTop:10, borderTop:`1px solid ${C.border}33` }}>
                  <div style={{ fontSize:8, letterSpacing:2, color:"#666", textTransform:"uppercase", marginBottom:7 }}>Handle / Pull</div>
                  {HARDWARE.map(hw=>(
                    <button key={hw.id} onClick={()=>updateSel({hardware:hw.id})} style={{
                      width:"100%", marginBottom:4, padding:"7px 8px", borderRadius:4, cursor:"pointer",
                      border:selUnit.hardware===hw.id?`1px solid ${C.orange}`:`1px solid ${C.border}`,
                      background:selUnit.hardware===hw.id?C.orange+"18":"rgba(255,255,255,0.02)",
                      color:selUnit.hardware===hw.id?C.white:"#666",
                      textAlign:"left", display:"flex", alignItems:"center", gap:8, fontSize:10, fontFamily:"inherit",
                    }}>
                      {hw.color
                        ? <div style={{width:22,height:5,borderRadius:3,background:hw.color,flexShrink:0}}/>
                        : <div style={{width:22,textAlign:"center",color:"#444",fontSize:13,flexShrink:0}}>—</div>}
                      {hw.label}
                    </button>
                  ))}
                </div>

                {/* Finish swatches (drawer carcass colour) */}
                <div style={{ paddingTop:10, borderTop:`1px solid ${C.border}33` }}>
                  <div style={{ fontSize:8, letterSpacing:2, color:"#666", textTransform:"uppercase", marginBottom:8 }}>Carcass Finish</div>
                  {["matte","gloss","wood"].map(type => (
                    <div key={type} style={{ marginBottom:10 }}>
                      <div style={{ fontSize:7, letterSpacing:1.5, color:"#444", textTransform:"uppercase", marginBottom:5 }}>
                        {type==="wood"?"Wood Grain":type[0].toUpperCase()+type.slice(1)}
                      </div>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                        {FINISHES.filter(f=>f.type===type).map(f=>(
                          <div key={f.id} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}>
                            <button onClick={()=>updateSel({finish:f.id})} title={f.label} style={{
                              width:26, height:26, borderRadius:4, cursor:"pointer",
                              border:selUnit.finish===f.id?`2.5px solid ${C.orange}`:`1.5px solid ${C.border}`,
                              boxShadow:selUnit.finish===f.id?`0 0 0 2px ${C.orange}44`:"none",
                              transform:selUnit.finish===f.id?"scale(1.12)":"scale(1)",
                              transition:"all 0.12s", background:finishBg(f.id),
                            }}/>
                            <span style={{ fontSize:6, color:"#555", textAlign:"center", maxWidth:26, lineHeight:1.2 }}>{f.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </>);
            })()}

            {/* ── DOOR UNITS: Finish swatches, handle, then hinges ── */}
            {selUnit.type !== "drawer" && (<>

              {/* Finish swatches */}
              {["matte","gloss","wood"].map(type => (
                <div key={type} style={{ marginBottom:12 }}>
                  <div style={{ fontSize:8, letterSpacing:2, color:"#666", textTransform:"uppercase", marginBottom:7 }}>
                    {type==="wood"?"Wood Grain":type[0].toUpperCase()+type.slice(1)}
                  </div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                    {FINISHES.filter(f=>f.type===type).map(f=>(
                      <div key={f.id} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}>
                        <button onClick={()=>updateSel({finish:f.id})} title={f.label} style={{
                          width:28, height:28, borderRadius:4, cursor:"pointer",
                          border:selUnit.finish===f.id?`2.5px solid ${C.orange}`:`1.5px solid ${C.border}`,
                          boxShadow:selUnit.finish===f.id?`0 0 0 2px ${C.orange}44`:"none",
                          transform:selUnit.finish===f.id?"scale(1.12)":"scale(1)",
                          transition:"all 0.12s", background:finishBg(f.id),
                        }}/>
                        <span style={{ fontSize:7, color:"#555", textAlign:"center", maxWidth:28, lineHeight:1.2 }}>{f.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Handle / Pull */}
              <div style={{ marginBottom:12, paddingTop:4, borderTop:`1px solid ${C.border}22` }}>
                <div style={{ fontSize:8, letterSpacing:2, color:"#666", textTransform:"uppercase", marginBottom:7 }}>Handle / Pull</div>
                {HARDWARE.map(hw=>(
                  <button key={hw.id} onClick={()=>updateSel({hardware:hw.id})} style={{
                    width:"100%", marginBottom:4, padding:"7px 8px", borderRadius:4, cursor:"pointer",
                    border:selUnit.hardware===hw.id?`1px solid ${C.orange}`:`1px solid ${C.border}`,
                    background:selUnit.hardware===hw.id?C.orange+"18":"rgba(255,255,255,0.02)",
                    color:selUnit.hardware===hw.id?C.white:"#666",
                    textAlign:"left", display:"flex", alignItems:"center", gap:8, fontSize:10, fontFamily:"inherit",
                  }}>
                    {hw.color
                      ? <div style={{width:22,height:5,borderRadius:3,background:hw.color,flexShrink:0}}/>
                      : <div style={{width:22,textAlign:"center",color:"#444",fontSize:13,flexShrink:0}}>—</div>}
                    {hw.label}
                  </button>
                ))}
              </div>

            </>)}

            {/* Bulk actions */}
            <div style={{ display:"flex", flexDirection:"column", gap:4, marginTop:12, paddingTop:10, borderTop:`1px solid ${C.border}` }}>
              <button onClick={()=>applyAll({finish:selUnit.finish,hardware:selUnit.hardware,hinge:selUnit.hinge,runner:selUnit.runner})} style={sBtn(C.gold+"22",C.gold)}>Apply to All</button>
              <button onClick={()=>applyType({finish:selUnit.finish,hardware:selUnit.hardware,hinge:selUnit.hinge,runner:selUnit.runner})} style={sBtn("transparent","#777")}>Apply to Same Type</button>
              <button onClick={()=>{ setSelected(null); }} style={sBtn("transparent","#888")}>← Back to List</button>
              <button onClick={removeSel} style={sBtn("transparent","#C55")}>Remove Unit</button>
            </div>
          </div>
        )}
      </div>

      {/* ── Bottom CTA — always visible ── */}
      <div style={{ padding:"10px 10px 10px", borderTop:`1px solid ${C.border}`, background:C.black, flexShrink:0, display:"flex", flexDirection:"column", gap:6 }}>

        {phase === "layout" && (
          <>
            {units.length > 0 && (
              <button onClick={onNext} style={{
                background:C.orange, color:C.white, border:"none", borderRadius:6,
                width:"100%", padding:"11px 10px", cursor:"pointer",
                fontSize:11, fontWeight:"bold", letterSpacing:1.5,
                textTransform:"uppercase", fontFamily:"inherit",
                display:"flex", alignItems:"center", justifyContent:"center", gap:6,
                boxShadow:`0 3px 12px ${C.orange}55`,
              }}>
                To Materials <span style={{fontSize:14}}>›</span>
              </button>
            )}
            {units.length === 0 && (
              <div style={{ fontSize:9, color:"#444", textAlign:"center", padding:"6px 0", letterSpacing:1 }}>
                Add cabinets to continue
              </div>
            )}
          </>
        )}

        {phase === "finish" && (
          <>
            <button onClick={onNext} style={{
              background:C.orange, color:C.white, border:"none", borderRadius:6,
              width:"100%", padding:"11px 10px", cursor:"pointer",
              fontSize:11, fontWeight:"bold", letterSpacing:1.5,
              textTransform:"uppercase", fontFamily:"inherit",
              display:"flex", alignItems:"center", justifyContent:"center", gap:6,
              boxShadow:`0 3px 12px ${C.orange}55`,
            }}>
              Get Quote <span style={{fontSize:14}}>›</span>
            </button>
            {!showFinishes && (
              <div style={{ fontSize:9, color:"#444", textAlign:"center", letterSpacing:1 }}>
                Click a cabinet above to edit its finish
              </div>
            )}
          </>
        )}
      </div>
    </aside>
  );
}

// ─── Materials Panel ──────────────────────────────────────────────────────────
function MaterialsPanel({ materials, setMaterials, onNext, onBack }) {
  const set = patch => setMaterials(m => ({ ...m, ...patch }));

  // When type changes, clear colour if it doesn't belong to new type
  function selectType(id) {
    const currentColour = materials.ctColour;
    const colourStillValid = currentColour &&
      COUNTERTOP_COLOURS.find(c => c.id === currentColour)?.types?.includes(id);
    set({ ctType: id, ctColour: colourStillValid ? currentColour : null });
  }

  // Only show colours relevant to selected type
  const visibleColours = materials.ctType
    ? COUNTERTOP_COLOURS.filter(c => c.types.includes(materials.ctType))
    : COUNTERTOP_COLOURS;

  function CtSwatch({ ct }) {
    const sel = materials.ctColour === ct.id;
    return (
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
        <button onClick={() => set({ ctColour: ct.id })} title={ct.label} style={{
          width:50, height:34, borderRadius:5, cursor:"pointer",
          border: sel ? `2.5px solid ${C.orange}` : `1.5px solid ${C.border}`,
          boxShadow: sel ? `0 0 0 2px ${C.orange}44` : "none",
          transform: sel ? "scale(1.1)" : "scale(1)",
          transition:"all 0.12s",
          background: countertopBg(ct),
          flexShrink: 0,
        }}/>
        <span style={{ fontSize:7, color: sel ? C.white : "#666", textAlign:"center", maxWidth:52, lineHeight:1.3 }}>{ct.label}</span>
      </div>
    );
  }

  const ready = materials.ctType && materials.ctColour && materials.carcass;
  const isPremiumTop = ["marble","granite"].includes(materials.ctType);
  const isPremiumAll = materials.carcass==="solid" && isPremiumTop;
  const isMid        = materials.carcass==="solid" || isPremiumTop;

  return (
    <aside style={{ width:220, background:C.panel, display:"flex", flexDirection:"column", height:"100%", overflow:"hidden" }}>
      <div style={{ padding:"10px 14px", fontSize:8, letterSpacing:3, color:C.orange, textTransform:"uppercase", borderBottom:`1px solid ${C.border}`, background:C.black, flexShrink:0 }}>
        ② Materials · <span style={{ color:"#555" }}>preview live on wall</span>
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"12px 12px" }}>

        {/* ── Countertop type ── */}
        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:8, letterSpacing:2, color:"#888", textTransform:"uppercase", marginBottom:8 }}>Countertop Type</div>
          <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
            {COUNTERTOP_TYPES.map(t => {
              const sel = materials.ctType === t.id;
              return (
                <button key={t.id} onClick={() => selectType(t.id)} style={{
                  padding:"9px 11px", borderRadius:5, cursor:"pointer", textAlign:"left",
                  border: sel ? `1.5px solid ${C.orange}` : `1px solid ${C.border}`,
                  background: sel ? C.orange+"20" : "rgba(255,255,255,0.02)",
                  fontFamily:"inherit", transition:"all 0.12s",
                }}>
                  <div style={{ fontSize:11, color: sel ? C.white : "#AAA", fontWeight: sel ? "bold" : "normal" }}>{t.label}</div>
                  <div style={{ fontSize:8, color: sel ? C.gold : "#555", marginTop:2 }}>{t.subtitle}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Countertop colour — filtered by type ── */}
        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:8, letterSpacing:2, color:"#888", textTransform:"uppercase", marginBottom:8 }}>
            Countertop Colour
            {!materials.ctType && <span style={{ color:"#444", marginLeft:6 }}>— pick type first</span>}
          </div>
          {materials.ctType ? (
            <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
              {visibleColours.map(ct => <CtSwatch key={ct.id} ct={ct}/>)}
            </div>
          ) : (
            <div style={{ fontSize:9, color:"#444", fontStyle:"italic" }}>Select a countertop type above to see colour options.</div>
          )}
        </div>

        {/* Divider */}
        <div style={{ height:1, background:C.border, margin:"4px 0 14px" }}/>

        {/* ── Carcass material ── */}
        <div style={{ marginBottom:12 }}>
          <div style={{ fontSize:8, letterSpacing:2, color:"#888", textTransform:"uppercase", marginBottom:8 }}>Carcass Build</div>
          <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
            {CARCASS_TYPES_MATERIAL.map(t => {
              const sel = materials.carcass === t.id;
              return (
                <button key={t.id} onClick={() => set({ carcass: t.id })} style={{
                  padding:"9px 11px", borderRadius:5, cursor:"pointer", textAlign:"left",
                  border: sel ? `1.5px solid ${C.orange}` : `1px solid ${C.border}`,
                  background: sel ? C.orange+"20" : "rgba(255,255,255,0.02)",
                  fontFamily:"inherit", transition:"all 0.12s",
                }}>
                  <div style={{ fontSize:11, color: sel ? C.white : "#AAA", fontWeight: sel ? "bold" : "normal" }}>{t.label}</div>
                  <div style={{ fontSize:8, color: sel ? C.gold : "#555", marginTop:2 }}>{t.subtitle}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Pricing tier */}
        {materials.carcass && materials.ctType && (
          <div style={{ background:"rgba(0,0,0,0.3)", border:`1px solid ${C.border}`, borderRadius:5, padding:"9px 11px" }}>
            <div style={{ fontSize:7, letterSpacing:2, color:C.gold, textTransform:"uppercase", marginBottom:5 }}>Pricing Tier</div>
            <div style={{ fontSize:10, color:"#AAA" }}>
              {isPremiumAll
                ? <span style={{color:C.orange}}>★ Premium — solid carcass + {materials.ctType} top</span>
                : isMid
                ? <span style={{color:C.gold}}>◆ Mid-range — one premium element</span>
                : <span style={{color:"#888"}}>● Standard — melamine throughout</span>
              }
            </div>
            <div style={{ fontSize:8, color:"#555", marginTop:4 }}>Final pricing confirmed on quote.</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <div style={{ padding:"10px 10px 10px", borderTop:`1px solid ${C.border}`, background:C.black, flexShrink:0, display:"flex", flexDirection:"column", gap:6 }}>
        <button onClick={onNext} disabled={!ready} style={{
          background: ready ? C.orange : "#2A1A10",
          color: ready ? C.white : "#444",
          border:"none", borderRadius:6, width:"100%", padding:"11px 10px",
          cursor: ready ? "pointer" : "not-allowed",
          fontSize:11, fontWeight:"bold", letterSpacing:1.5, textTransform:"uppercase",
          fontFamily:"inherit",
          display:"flex", alignItems:"center", justifyContent:"center", gap:6,
          boxShadow: ready ? `0 3px 12px ${C.orange}55` : "none",
          transition:"all 0.15s",
        }}>
          To Finishes <span style={{fontSize:14}}>›</span>
        </button>
        {!ready && (
          <div style={{ fontSize:9, color:"#444", textAlign:"center", letterSpacing:1 }}>
            Complete all selections above
          </div>
        )}
        <button onClick={onBack} style={{
          background:"transparent", color:"#555", border:`1px solid ${C.border}44`,
          borderRadius:5, width:"100%", padding:"7px 8px", cursor:"pointer",
          fontSize:9, letterSpacing:1, textTransform:"uppercase", fontFamily:"inherit",
        }}>← Back to Layout</button>
      </div>
    </aside>
  );
}

// ─── Step Indicator ───────────────────────────────────────────────────────────
function StepIndicator({ phase, setPhase }) {
  const steps = [
    ["layout",   "01", "Layout"],
    ["materials","02", "Materials"],
    ["finish",   "03", "Finishes"],
  ];
  const order = steps.map(s => s[0]);
  const cur   = order.indexOf(phase);
  return (
    <div style={{ display:"flex", alignItems:"center", gap:0 }}>
      {steps.map(([p, num, lbl], i) => {
        const active = phase === p;
        const done   = order.indexOf(p) < cur;
        return (
          <div key={p} style={{ display:"flex", alignItems:"center" }}>
            <button onClick={() => setPhase(p)} style={{
              display:"flex", alignItems:"center", gap:7, padding:"7px 13px",
              background: active ? C.orange : done ? C.black+"88" : "transparent",
              border: active ? "none" : `1px solid ${C.border}`,
              borderRadius:5, cursor:"pointer",
              color: active ? C.white : done ? C.gold : "#666",
              fontFamily:"inherit", fontSize:10, letterSpacing:1.2, textTransform:"uppercase",
            }}>
              <span style={{
                width:18, height:18, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center",
                background: active ? C.white : done ? C.gold : C.border,
                color: active ? C.orange : done ? C.black : "#666",
                fontSize:8, fontWeight:"bold", flexShrink:0,
              }}>{done ? "✓" : num}</span>
              {lbl}
            </button>
            {i < steps.length-1 && <div style={{ width:16, height:1, background:C.border, margin:"0 2px" }}/>}
          </div>
        );
      })}
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [phase,    setPhase]    = useState("layout");
  const [units,    setUnits]    = useState([]);
  const [selected, setSelected] = useState(null);
  const [drag,     setDrag]     = useState(null);
  const [zoom,     setZoom]     = useState(1);
  const [roomW,    setRoomW]    = useState(4200);
  const [materials, setMaterials] = useState({ ctType: null, ctColour: null, carcass: null });
  const [showQuote,  setShowQuote]  = useState(false);

  // Live job total — recalculates whenever units or materials change
  const jobTotal = (units.length > 0 && materials.ctColour && materials.carcass)
    ? calcJobTotal(units, materials)
    : null;
  const [quoteSent,  setQuoteSent]  = useState(false);
  const [priceRevealed, setPriceRevealed] = useState(false);
  const [quoteSending, setQuoteSending] = useState(false);
  const [quoteError,   setQuoteError]   = useState("");
  const [cName,   setCName]   = useState("");
  const [cEmail,  setCEmail]  = useState("");
  const [cPhone,  setCPhone]  = useState("");

  const canvasRef = useRef(null);
  const idRef     = useRef(1);
  const [canvasW, setCanvasW] = useState(800); // actual rendered canvas px width

  // Measure canvas width whenever window or panel changes
  useEffect(() => {
    if (!canvasRef.current) return;
    const ro = new ResizeObserver(entries => {
      const w = entries[0]?.contentRect?.width;
      if (w && w > 10) setCanvasW(w);
    });
    ro.observe(canvasRef.current);
    return () => ro.disconnect();
  }, []);

  const { w: winW, h: winH } = useWindowSize();
  const isPhone  = winW < 640;
  const isTablet = winW >= 640 && winW < 1024;
  const isMobile = winW < 1024;  // phone or tablet

  // Panel is hidden on phone (shown as bottom sheet instead) or shown as sidebar on tablet+
  const PANEL_W  = isMobile ? 0 : 210;

  // Canvas fills available width minus panel, minus padding
  const canvasPad = isPhone ? 8 : 16;

  // Mobile: left panel slides up from bottom as a drawer
  const [panelOpen,   setPanelOpen]   = useState(false);
  const [panelHidden, setPanelHidden] = useState(false);
  const pxPerMm     = (canvasW / roomW) * zoom;
  const scaledW     = roomW     * pxPerMm;
  const scaledH     = WALL_H_MM * pxPerMm;
  const FLOOR_Y     = scaledH - 60*pxPerMm;

  function unitTop(unit) {
    if (unit.type === "upper")
      return FLOOR_Y - FLOOR_H_MM*pxPerMm - 250*pxPerMm - UPPER_H_MM*pxPerMm;
    return FLOOR_Y - unit.height*pxPerMm;
  }

  // Returns the next free x position (right edge of all units), clamped to room width
  function nextAvailableX(newWidth) {
    if (units.length === 0) return 0;
    const rightEdge = Math.max(...units.map(u => u.xMm + u.width));
    return Math.min(rightEdge, roomW - newWidth);
  }

  // Resolve overlaps per row — upper and floor rows pack independently.
  // Tall units block both rows, so upper cabinets skip over tall unit x-spans.
  const TALL_TYPES = ["tall-single","tall-double","tall-double-v"];
  function packUnits(unitList) {
    // ── Pack floor row (all non-upper units together) ──
    const floorUnits  = unitList.filter(u => u.type !== "upper");
    const upperUnits  = unitList.filter(u => u.type === "upper");
    const tallBlocks  = floorUnits.filter(u => TALL_TYPES.includes(u.type));

    // Floor row: sort and pack left-to-right
    const floorSorted = [...floorUnits].sort((a,b) => a.xMm - b.xMm);
    let cursor = 0;
    const packedFloor = floorSorted.map(u => {
      const placed = { ...u, xMm: cursor };
      cursor += u.width;
      return placed;
    });


    // Upper row: pack freely left-to-right, only preventing overlap with each other
    // Wall cabinets may sit above any floor unit including tall units — user decides placement
    const upperSorted = [...upperUnits].sort((a,b) => a.xMm - b.xMm);
    let upCursor = 0;
    const packedUpper = upperSorted.map(u => {
      const placed = { ...u, xMm: upCursor };
      upCursor += u.width;
      return placed;
    });

    return [...packedFloor, ...packedUpper];
  }

  function paletteDragStart(e, c) {
    e.dataTransfer.effectAllowed = "copy";
    e.dataTransfer.setData("cid", c.id);
  }
  function canvasDragOver(e) { e.preventDefault(); }
  function canvasDrop(e) {
    e.preventDefault();
    const cid = e.dataTransfer.getData("cid");
    const c   = CARCASS_TYPES.find(x => x.id===cid);
    if (!c) return;
    // Always append to right edge — no overlap allowed
    const rowUnits = units.filter(u => (c.type === "upper") === (u.type === "upper"));
    const afterRow = rowUnits.length > 0 ? Math.max(...rowUnits.map(u => u.xMm + u.width)) : 0;
    const xPos = Math.min(afterRow, roomW - c.width);
    const nu   = { id:idRef.current++, type:c.type, width:c.width, height:c.height, xMm:xPos, finish:DEFAULT_FINISH, hardware:DEFAULT_HW, hinge:DEFAULT_HINGE, runner:DEFAULT_RUNNER, rotation:0 };
    setUnits(p => packUnits([...p, nu]));
    setSelected(nu.id);
  }

  function unitPointerDown(e, unit) {
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    setSelected(unit.id);
    const rect = canvasRef.current.getBoundingClientRect();
    const xPx  = e.clientX - rect.left + canvasRef.current.scrollLeft;
    setDrag({ unitId:unit.id, offsetMm: xPx/pxPerMm - unit.xMm });
  }
  function canvasPtrMove(e) {
    if (!drag) return;
    const rect  = canvasRef.current.getBoundingClientRect();
    const xPx   = e.clientX - rect.left + canvasRef.current.scrollLeft;
    const unit  = units.find(u => u.id===drag.unitId);
    if (!unit) return;
    const rawX     = snapMm(xPx/pxPerMm - drag.offsetMm);
    const clampedX = Math.max(0, Math.min(rawX, roomW - unit.width));

    // Move the dragged unit freely to wherever the user places it.
    // Only push same-row neighbours away if they'd overlap — don't re-sort the whole row.
    const isUpper  = unit.type === "upper";
    const sameRow  = units.filter(u => u.id !== drag.unitId && (u.type === "upper") === isUpper);

    setUnits(prev => prev.map(u => {
      if (u.id === drag.unitId) return { ...u, xMm: clampedX };
      // Only nudge same-row neighbours that collide
      if ((u.type === "upper") !== isUpper) return u;
      // Push neighbour right if dragged unit overlaps its left side
      if (clampedX < u.xMm + u.width && clampedX + unit.width > u.xMm) {
        // If dragged from left: push neighbour right
        if (clampedX <= u.xMm) return { ...u, xMm: Math.min(clampedX + unit.width, roomW - u.width) };
        // If dragged from right: push neighbour left
        return { ...u, xMm: Math.max(clampedX - u.width, 0) };
      }
      return u;
    }));
  }
  function canvasPtrUp() { setDrag(null); }

  useEffect(() => {
    const fn = e => {
      if ((e.key==="Delete"||e.key==="Backspace") && selected) {
        setUnits(p => p.filter(u => u.id!==selected));
        setSelected(null);
      }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [selected]);

  function tapAdd(c) {
    // Always append to the right edge of existing units — no overlap
    const rowUnits = units.filter(u => (c.type === "upper") === (u.type === "upper"));
    const afterRow = rowUnits.length > 0 ? Math.max(...rowUnits.map(u => u.xMm + u.width)) : 0;
    const xPos = Math.min(afterRow, roomW - c.width);
    const nu = { id:idRef.current++, type:c.type, width:c.width, height:c.height, xMm:xPos, finish:DEFAULT_FINISH, hardware:DEFAULT_HW, hinge:DEFAULT_HINGE, runner:DEFAULT_RUNNER, rotation:0 };
    setUnits(p => packUnits([...p, nu]));
    setSelected(nu.id);
  }

  // Layout → Materials
  function goToMaterials() {
    setPhase("materials");
    setSelected(null);
  }
  // Materials → Finishes
  function goToFinish() {
    setPhase("finish");
    if (units.length > 0) setSelected(units[0].id);
  }

  const totalFloor = units.reduce((s,u) =>
    ["base","drawer","tall-single","tall-double","tall-double-v","corner"].includes(u.type) ? s+u.width : s, 0);
  const totalWall  = units.reduce((s,u) => u.type === "upper" ? s+u.width : s, 0);
  const matCtType   = COUNTERTOP_TYPES.find(t => t.id === materials.ctType);
  const matCtColour = COUNTERTOP_COLOURS.find(t => t.id === materials.ctColour);
  const matCarcass  = CARCASS_TYPES_MATERIAL.find(t => t.id === materials.carcass);

  // Build enriched BOM with fittings
  const bom = units.map(u => {
    const ct   = CARCASS_TYPES.find(c => c.type===u.type && c.width===u.width);
    const hc   = hingeCount(u);
    const dc   = drawerCount(u);
    const hingeLabel  = HINGES.find(h=>h.id===(u.hinge||DEFAULT_HINGE))?.label || "";
    const runnerLabel = RUNNERS.find(r=>r.id===(u.runner||DEFAULT_RUNNER))?.label || "";
    return {
      label:       ct?.label || u.type,
      width:       u.width,
      finish:      getFinish(u.finish).label,
      hw:          HARDWARE.find(h=>h.id===u.hardware)?.label,
      rot:         u.type==="corner" ? CORNER_ROTATIONS[u.rotation||0] : null,
      hinges:      hc.total,
      hingeLabel,
      drawers:     dc,
      runnerLabel,
      hasDoors:    hc.total > 0,
      hasDrawers:  dc > 0,
    };
  });

  // Fitting totals for quote summary
  const totalHingesStd  = bom.filter(b=>b.hingeLabel.includes("Standard")).reduce((s,b)=>s+b.hinges,0);
  const totalHingesSoft = bom.filter(b=>b.hingeLabel.includes("Soft")).reduce((s,b)=>s+b.hinges,0);
  const totalHinges     = totalHingesStd + totalHingesSoft;
  const totalRunnersStd  = bom.filter(b=>b.runnerLabel.includes("Standard")).reduce((s,b)=>s+b.drawers,0);
  const totalRunnersSoft = bom.filter(b=>b.runnerLabel.includes("Soft")).reduce((s,b)=>s+b.drawers,0);
  const totalRunners     = totalRunnersStd + totalRunnersSoft;

  const clampZoom = v => setZoom(Math.min(3, Math.max(0.5, +v.toFixed(2))));
  // ── Build plain-text quote summary (used for email body + WhatsApp) ─────────
  function buildQuoteSummary() {
    const lines = [];
    lines.push("HWH DESIGNS — QUOTE REQUEST");
    lines.push("============================");
    lines.push(`Client:  ${cName}`);
    lines.push(`Email:   ${cEmail}`);
    lines.push(`Phone:   ${cPhone || "—"}`);
    lines.push("");
    lines.push("CABINET LAYOUT");
    lines.push("--------------");
    bom.forEach((item, i) => {
      let line = `${i+1}. ${item.label} ${item.width}mm — ${item.finish}`;
      if (item.rot)        line += ` (${item.rot})`;
      if (item.hasDoors)   line += ` | ${item.hinges}× ${item.hingeLabel}`;
      if (item.hasDrawers) line += ` | ${item.drawers} pairs ${item.runnerLabel}`;
      lines.push(line);
    });
    lines.push("");
    lines.push(`Total floor run:        ${totalFloor}mm (${(totalFloor/1000).toFixed(2)}m)`);
    if (totalWall > 0) lines.push(`Total wall cabinet run: ${totalWall}mm (${(totalWall/1000).toFixed(2)}m)`);
    lines.push("");
    if (matCarcass || matCtType || matCtColour) {
      lines.push("MATERIALS");
      lines.push("---------");
      if (matCarcass)  lines.push(`Carcass build:     ${matCarcass.label}`);
      if (matCtType)   lines.push(`Countertop type:   ${matCtType.label}`);
      if (matCtColour) lines.push(`Countertop colour: ${matCtColour.label}`);
      const ctRunM = units.filter(u=>["base","drawer","corner"].includes(u.type)).reduce((s,u)=>s+u.width,0)/1000;
      if (ctRunM > 0) lines.push(`Countertop area:   ${ctRunM.toFixed(2)}m run × 0.60m depth = ${(ctRunM*0.6).toFixed(2)}m²`);
      lines.push("");
    }
    if (totalHinges > 0 || totalRunners > 0) {
      lines.push("FITTINGS SUMMARY");
      lines.push("----------------");
      if (totalHingesStd)   lines.push(`Standard Hinges:         x ${totalHingesStd}`);
      if (totalHingesSoft)  lines.push(`Soft-Close Hinges:       x ${totalHingesSoft}`);
      if (totalHinges)      lines.push(`Total Hinges:            x ${totalHinges}`);
      if (totalRunnersStd)  lines.push(`Standard Runner Pairs:   x ${totalRunnersStd}`);
      if (totalRunnersSoft) lines.push(`Soft-Close Runner Pairs: x ${totalRunnersSoft}`);
      if (totalRunners)     lines.push(`Total Runner Pairs:      x ${totalRunners}`);
    }
    if (jobTotal !== null) {
      lines.push("");
      lines.push("ESTIMATED TOTAL");
      lines.push("---------------");
      lines.push(`R ${jobTotal.toLocaleString("en-ZA")} (excl. VAT)`);
      lines.push("* Disclaimer — Final pricing could change — to be issued on job measurement confirmed and sign off by client");
    }
    return lines.join("\n");
  }

  // ── Submit: EmailJS email + pre-filled WhatsApp notification ─────────────────
  async function handleSubmitQuote() {
    setQuoteError("");
    setQuoteSending(true);
    const summary = buildQuoteSummary();

    // EmailJS send — configure Service ID + Template ID in emailjs.com dashboard
    // Template variables: to_email, client_name, client_email,
    //   client_phone, quote_summary, units_count, floor_run
    try {
      await window.emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_email:      "kim@hwhdesigns.co.za",
          client_name:   cName,
          client_email:  cEmail,
          client_phone:  cPhone || "—",
          quote_summary: summary,
          units_count:   String(bom.length),
          floor_run:     `${totalFloor}mm (${(totalFloor/1000).toFixed(2)}m)`,
        }
      );
    } catch (err) {
      console.error("EmailJS error:", err);
      setQuoteError("Email delivery failed — please try again or contact us directly.");
      setQuoteSending(false);
      return;
    }

    // WhatsApp deep link — opens WhatsApp with pre-filled message, user taps Send
    const waLines = [
      "Hi Kim! I just submitted a quote via the HWH Designs configurator.",
      "",
      `*Client:* ${cName}`,
      `*Email:* ${cEmail}`,
      `*Phone:* ${cPhone || "—"}`,
      "",
      `*${bom.length} unit${bom.length!==1?"s":""} | ${(totalFloor/1000).toFixed(2)}m floor run*`,
      "",
      "Full spec emailed to kim@hwhdesigns.co.za"
    ].join("\n");
    window.open("https://wa.me/27828899787?text=" + encodeURIComponent(waLines), "_blank");

    setQuoteSending(false);
    setQuoteSent(true);
    setPriceRevealed(true);
    setTimeout(() => {
      setShowQuote(false);
      setQuoteSent(false);
      setCName(""); setCEmail(""); setCPhone("");
    }, 4000);
  }

  return (
    <div style={{ height:"100vh", background:C.darkbg, fontFamily:"'Trebuchet MS',sans-serif", color:C.white, display:"flex", flexDirection:"column", overflow:"hidden" }}>

      {/* ── Header ── */}
      <header style={{ padding:`0 ${isPhone?10:20}px`, borderBottom:`3px solid ${C.orange}`, background:C.black, display:"flex", alignItems:"center", gap:isPhone?8:16, height:isPhone?50:58, flexShrink:0 }}>

        {/* Logo */}
        <div style={{ display:"flex", alignItems:"center", gap:10, marginRight:"auto" }}>
          <HWHLogo size={isPhone?24:32}/>
          <div style={{ borderLeft:`2px solid ${C.orange}55`, paddingLeft:10 }}>
            <div style={{ fontSize:isPhone?12:14, fontWeight:"bold", letterSpacing:2, color:C.white, textTransform:"uppercase", lineHeight:1 }}>HWH</div>
            <div style={{ fontSize:isPhone?8:10, letterSpacing:3, color:C.gold, textTransform:"uppercase" }}>Designs</div>
          </div>
          {!isPhone && (
            <div style={{ borderLeft:`1px solid ${C.border}`, paddingLeft:12, marginLeft:2 }}>
              <div style={{ fontSize:9, letterSpacing:3, color:"#555", textTransform:"uppercase" }}>Built-in</div>
              <div style={{ fontSize:11, letterSpacing:2, color:"#999", textTransform:"uppercase" }}>Configurator</div>
            </div>
          )}
        </div>

        {/* Step indicator — icon-only on phone */}
        {isPhone ? (
          <div style={{ display:"flex", alignItems:"center", gap:4 }}>
            {[["layout","1"],["materials","2"],["finish","3"]].map(([p,n],i,arr) => {
              const order = arr.map(a=>a[0]);
              const cur   = order.indexOf(phase);
              const done  = order.indexOf(p) < cur;
              const active= phase===p;
              return (
                <div key={p} style={{ display:"flex", alignItems:"center" }}>
                  <button onClick={()=>setPhase(p)} style={{
                    width:24, height:24, borderRadius:"50%", border:"none", cursor:"pointer",
                    background: active ? C.orange : done ? C.gold : C.border,
                    color: active ? C.white : done ? C.black : "#555",
                    fontSize:9, fontWeight:"bold", display:"flex", alignItems:"center", justifyContent:"center",
                  }}>{done?"✓":n}</button>
                  {i<arr.length-1 && <div style={{width:10,height:1,background:C.border}}/>}
                </div>
              );
            })}
          </div>
        ) : (
          <StepIndicator phase={phase} setPhase={setPhase}/>
        )}

        {/* Controls */}
        <div style={{ display:"flex", gap:isPhone?6:8, alignItems:"center" }}>
          {/* Room selector — hidden on phone to save space */}
          {!isPhone && (
            <div style={{ display:"flex", alignItems:"center", gap:6 }}>
              <span style={{ fontSize:9, color:"#555", letterSpacing:1, textTransform:"uppercase" }}>Room</span>
              <select value={roomW} onChange={e=>setRoomW(+e.target.value)} style={{ background:C.panel, border:`1px solid ${C.border}`, color:C.white, padding:"4px 7px", borderRadius:4, fontSize:11, fontFamily:"inherit" }}>
                {[2400,3000,3600,4200,4800,5400,6000,6600,7200,7800,8400,9000,9600,10200,10800,11400,12000].map(w =>
                  <option key={w} value={w}>{(w/1000).toFixed(1)}m</option>)}
              </select>
            </div>
          )}

          {/* Zoom */}
          <div style={{ display:"flex", alignItems:"center", gap:2, background:C.panel, borderRadius:5, padding:"3px 6px", border:`1px solid ${C.border}` }}>
            <button onClick={()=>clampZoom(zoom-0.25)} style={ZB}>−</button>
            {!isPhone && <span style={{ fontSize:10, color:"#888", minWidth:28, textAlign:"center" }}>{Math.round(zoom*100)}%</span>}
            <button onClick={()=>clampZoom(zoom+0.25)} style={ZB}>+</button>
            <button onClick={()=>clampZoom(1)} style={{ ...ZB, fontSize:8, color:"#555", borderLeft:`1px solid ${C.border}`, paddingLeft:5, marginLeft:2 }}>FIT</button>
          </div>

          {/* Quote */}
          <button onClick={()=>setShowQuote(true)} style={{ background:C.orange, color:C.white, border:"none", borderRadius:5, padding:isPhone?"7px 10px":"8px 16px", cursor:"pointer", fontSize:isPhone?10:11, fontWeight:"bold", letterSpacing:1, textTransform:"uppercase", fontFamily:"inherit", whiteSpace:"nowrap", display:"flex", alignItems:"center", gap:6 }}>
            {isPhone ? "Quote" : "Get Quote"}
            {jobTotal !== null && (
              priceRevealed
                ? <span style={{ background:"rgba(0,0,0,0.25)", borderRadius:3, padding:"2px 6px", fontSize:isPhone?9:10, fontWeight:"bold", letterSpacing:0 }}>R {jobTotal.toLocaleString("en-ZA")}</span>
                : <span style={{ background:"rgba(0,0,0,0.25)", borderRadius:3, padding:"2px 6px", fontSize:isPhone?9:10, fontWeight:"bold", letterSpacing:0, color:C.gold, cursor:"pointer" }} onClick={()=>setShowQuote(true)}>View Price</span>
            )}
          </button>
        </div>
      </header>

      {/* ── Phone: room selector row below header ── */}
      {isPhone && (
        <div style={{ background:C.black, borderBottom:`1px solid ${C.border}`, padding:"6px 10px", display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
          <span style={{ fontSize:9, color:"#555", letterSpacing:1, textTransform:"uppercase" }}>Room width</span>
          <select value={roomW} onChange={e=>setRoomW(+e.target.value)} style={{ background:C.panel, border:`1px solid ${C.border}`, color:C.white, padding:"4px 8px", borderRadius:4, fontSize:11, fontFamily:"inherit", flex:1 }}>
            {[2400,3000,3600,4200,4800,5400,6000,6600,7200,7800,8400,9000,9600,10200,10800,11400,12000].map(w =>
              <option key={w} value={w}>{(w/1000).toFixed(1)}m</option>)}
          </select>
        </div>
      )}

      {/* ── Body ── */}
      <div style={{ display:"flex", flex:1, overflow:"hidden" }}>

        {/* ══ Collapsible sidebar — always present on desktop ══ */}
        {!isMobile && (
          <div style={{
            position:"relative", flexShrink:0,
            width: panelHidden ? 0 : 220,
            transition:"width 0.22s cubic-bezier(.4,0,0.2,1)",
            overflow:"visible",
          }}>
            {/* Panel body */}
            <div style={{
              position:"absolute", top:0, left:0, bottom:0,
              width:220, background:C.panel,
              borderRight:`1px solid ${C.border}`,
              display:"flex", flexDirection:"column",
              transform: panelHidden ? "translateX(-220px)" : "translateX(0)",
              transition:"transform 0.22s cubic-bezier(.4,0,0.2,1)",
              overflow:"hidden",
              zIndex:10,
            }}>
              {/* Phase-specific content */}
              {phase === "layout" && (
                <LeftPanel
                  phase={phase} units={units} selected={selected}
                  setSelected={setSelected} setUnits={setUnits}
                  onClearAll={()=>{setUnits([]);setSelected(null);}}
                  onPaletteDragStart={paletteDragStart}
                  totalFloor={totalFloor}
                  onNext={goToMaterials}
                />
              )}
              {phase === "materials" && (
                <MaterialsPanel
                  materials={materials} setMaterials={setMaterials}
                  onNext={goToFinish} onBack={()=>setPhase("layout")}
                />
              )}
              {phase === "finish" && (
                <LeftPanel
                  phase={phase} units={units} selected={selected}
                  setSelected={setSelected} setUnits={setUnits}
                  onClearAll={()=>{setUnits([]);setSelected(null);}}
                  onPaletteDragStart={paletteDragStart}
                  totalFloor={totalFloor}
                  onNext={()=>setShowQuote(true)}
                />
              )}
            </div>

            {/* ── Hide/Show tab — sits on the right edge of the sidebar ── */}
            <button
              onClick={()=>setPanelHidden(h=>!h)}
              title={panelHidden ? "Show panel" : "Hide panel"}
              style={{
                position:"absolute",
                top:"50%", right:0,
                transform:"translateY(-50%) translateX(100%)",
                background:C.black,
                border:`1px solid ${C.border}`,
                borderLeft:"none",
                borderRadius:"0 6px 6px 0",
                color: panelHidden ? C.orange : "#666",
                cursor:"pointer",
                padding:"14px 5px",
                zIndex:20,
                display:"flex", flexDirection:"column", alignItems:"center", gap:4,
                writingMode:"vertical-rl",
                fontSize:8, letterSpacing:1.5, textTransform:"uppercase",
                fontFamily:"inherit",
                transition:"color 0.15s",
              }}
              onMouseEnter={e=>e.currentTarget.style.color=C.orange}
              onMouseLeave={e=>e.currentTarget.style.color=panelHidden?C.orange:"#666"}
            >
              {panelHidden ? "▶ Show" : "◀ Hide"}
            </button>
          </div>
        )}

          {/* ── Canvas ── */}
          <main style={{ flex:1, background:C.darkbg, display:"flex", flexDirection:"column", padding:`${canvasPad}px`, overflow:"hidden", minWidth:0 }}>
            <div style={{ fontSize:8, color: phase==="layout"?"#3A2E28":C.orange+"55", marginBottom:6, letterSpacing:1.5, textTransform:"uppercase", textAlign:"center" }}>
              {phase==="layout"
                ? isMobile ? "Tap ＋ panel · tap to place · drag to move" : "Drag units from the panel · drop on wall · drag to reposition · Delete to remove"
                : phase==="materials"
                ? "Adjust materials in the panel — changes preview live on the wall"
                : "Select a cabinet in the panel — finish changes preview live on the wall"}
            </div>

            <div style={{ width:"100%", height:3, background:`linear-gradient(90deg,${C.orange},${C.gold})`, borderRadius:"2px 2px 0 0", flexShrink:0 }}/>

            <div ref={canvasRef}
              onDrop={canvasDrop} onDragOver={canvasDragOver}
              onPointerMove={canvasPtrMove} onPointerUp={canvasPtrUp}
              onClick={()=>setSelected(null)}
              style={{
                width:"100%", flex:1, overflow:"auto",
                border:`1px solid ${C.border}`, borderTop:"none",
                background:"linear-gradient(180deg,#2C2018 0%,#221A10 55%,#1A1408 100%)",
                cursor:drag?"grabbing":"default",
                boxShadow:"0 8px 32px rgba(0,0,0,0.7)",
              }}
            >
              <div style={{ position:"relative", width:scaledW, height:scaledH }}>
                {Array.from({length:Math.ceil(roomW/200)+1}).map((_,i)=>(
                  <div key={i} style={{ position:"absolute", left:i*200*pxPerMm, top:0, bottom:0, width:1,
                    background:i%5===0?C.orange+"10":"rgba(255,255,255,0.02)", pointerEvents:"none" }}/>
                ))}
                <div style={{ position:"absolute", left:0, right:0, bottom:0, height:60*pxPerMm,
                  background:"rgba(0,0,0,0.5)", borderTop:`2px solid ${C.gold}30`, pointerEvents:"none" }}/>
                {Array.from({length:Math.floor(roomW/600)+1}).map((_,i)=>(
                  <div key={i} style={{ position:"absolute", left:i*600*pxPerMm, bottom:52*pxPerMm, pointerEvents:"none" }}>
                    <div style={{ width:1, height:6, background:C.orange+"33" }}/>
                    {i>0 && <div style={{ fontSize:7, color:C.orange+"55", marginTop:1, whiteSpace:"nowrap" }}>{i*600}mm</div>}
                  </div>
                ))}
                <div style={{ position:"absolute", top:7, left:10, fontSize:8, color:C.gold+"44", letterSpacing:2, textTransform:"uppercase", pointerEvents:"none" }}>
                  {(roomW/1000).toFixed(1)}m × {(WALL_H_MM/1000).toFixed(1)}m
                </div>
                {units.length===0 && (
                  <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:10, pointerEvents:"none" }}>
                    <HWHLogo size={isPhone?30:44}/>
                    <div style={{ fontSize:isPhone?9:11, color:"rgba(255,255,255,0.07)", letterSpacing:2, textTransform:"uppercase", marginTop:4, textAlign:"center" }}>
                      {isMobile ? "Tap + below to add cabinets" : "Drag cabinets onto the wall"}
                    </div>
                  </div>
                )}
                {units.map(unit => (
                  <div key={unit.id}
                    onPointerDown={e=>unitPointerDown(e,unit)}
                    style={{ position:"absolute", left:unit.xMm*pxPerMm, top:unitTop(unit), width:unit.width*pxPerMm, height:unit.height*pxPerMm, cursor:drag?.unitId===unit.id?"grabbing":"grab", zIndex:selected===unit.id?20:5, touchAction:"none" }}
                  >
                    <CabinetSVG unit={unit} pxPerMm={pxPerMm} selected={selected===unit.id}
                      ctColour={matCtColour}
                    />
                    {selected===unit.id && unit.type==="corner" && (
                      <button
                        onPointerDown={e=>e.stopPropagation()}
                        onClick={e=>{ e.stopPropagation(); setUnits(p=>p.map(u=>u.id===unit.id?{...u,rotation:((u.rotation||0)+1)%4}:u)); }}
                        title="Rotate 90°"
                        style={{ position:"absolute", top:4, right:4, background:C.orange, color:C.white, border:"none", borderRadius:4, width:26, height:26, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:"bold", boxShadow:"0 2px 6px rgba(0,0,0,0.5)", zIndex:30 }}
                      >↻</button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ width:"100%", height:2, background:`linear-gradient(90deg,${C.gold},${C.orange})`, borderRadius:"0 0 2px 2px", flexShrink:0 }}/>
            {/* Spacer so canvas content isn't hidden behind fixed button on mobile */}
            {isMobile && <div style={{ height:80, flexShrink:0 }}/>}

            {/* Mobile: open panel button — fixed above browser chrome */}
            {isMobile && (
              <div style={{
                position:"fixed", bottom:0, left:0, right:0, zIndex:90,
                display:"flex", justifyContent:"center",
                padding:"12px 20px 28px",
                background:"linear-gradient(to top, rgba(26,20,8,0.98) 60%, transparent)",
                pointerEvents:"none",
              }}>
                <button onClick={()=>setPanelOpen(true)} style={{
                  background:C.orange, color:C.white, border:"none", borderRadius:30,
                  padding:"14px 36px", cursor:"pointer", fontSize:13, fontWeight:"bold",
                  letterSpacing:1.5, textTransform:"uppercase", fontFamily:"inherit",
                  boxShadow:"0 4px 20px rgba(217,99,57,0.55)",
                  pointerEvents:"all",
                  width:"100%", maxWidth:340,
                }}>
                  {phase==="layout" ? "＋ Add Cabinets"
                   : phase==="materials" ? "⚙ Choose Materials"
                   : "🎨 Apply Finishes"}
                </button>
              </div>
            )}
          </main>

        {/* ── Mobile bottom sheet panel ── */}
        {isMobile && panelOpen && (
          <>
            {/* Backdrop */}
            <div onClick={()=>setPanelOpen(false)} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.6)", zIndex:100 }}/>
            {/* Sheet */}
            <div style={{
              position:"fixed", left:0, right:0, bottom:0,
              background:C.panel, borderTop:`3px solid ${C.orange}`,
              borderRadius:"16px 16px 0 0",
              zIndex:101, maxHeight:"72vh", display:"flex", flexDirection:"column",
              boxShadow:"0 -8px 40px rgba(0,0,0,0.7)",
            }}>
              {/* Sheet handle + header */}
              <div style={{ padding:"12px 16px 8px", borderBottom:`1px solid ${C.border}`, flexShrink:0 }}>
                {/* Drag handle */}
                <div style={{ width:40, height:4, borderRadius:2, background:C.border, margin:"0 auto 10px" }}/>

                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ fontSize:11, letterSpacing:2, color:C.orange, textTransform:"uppercase" }}>
                    {phase==="layout" ? "① Add Cabinets" : phase==="materials" ? "② Materials" : "③ Finishes"}
                  </div>
                  <button onClick={()=>setPanelOpen(false)} style={{ marginLeft:"auto", background:"none", border:"none", color:"#666", fontSize:20, cursor:"pointer" }}>✕</button>
                </div>

                {/* ── Unit switcher — only shown in finish phase ── */}
                {phase === "finish" && units.length > 0 && (
                  <div style={{ marginTop:10, display:"flex", gap:6, overflowX:"auto", paddingBottom:2 }}>
                    {units.map((u, i) => {
                      const ct      = CARCASS_TYPES.find(c => c.type===u.type && c.width===u.width);
                      const isDrawer = u.type === "drawer";
                      const isSel   = selected === u.id;
                      const shortLabel = isDrawer ? `Drw ${u.width}` : ct?.label?.replace(" Unit","").replace(" Cabinet","").replace(" — "," ") + ` ${u.width}`;
                      return (
                        <button key={u.id} onClick={()=>setSelected(u.id)} style={{
                          flexShrink:0,
                          padding:"6px 10px", borderRadius:20, cursor:"pointer",
                          border: isSel ? `1.5px solid ${C.orange}` : `1px solid ${C.border}`,
                          background: isSel ? C.orange+"22" : "rgba(255,255,255,0.04)",
                          color: isSel ? C.white : "#666",
                          fontSize:10, fontFamily:"inherit", whiteSpace:"nowrap",
                          display:"flex", alignItems:"center", gap:5,
                        }}>
                          <div style={{ width:10, height:10, borderRadius:2, background:finishBg(u.finish), flexShrink:0, border:`1px solid ${C.border}` }}/>
                          {shortLabel}
                          {isDrawer && <span style={{ fontSize:8, color: isSel ? C.gold : "#444" }}>⇒</span>}
                          {!isDrawer && <span style={{ fontSize:8, color: isSel ? C.gold : "#444" }}>⬡</span>}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Sheet content — reuses existing panels */}
              <div style={{ flex:1, overflowY:"auto" }}>
                {phase === "materials"
                  ? <MaterialsPanel
                      materials={materials} setMaterials={setMaterials}
                      onNext={()=>{ setPanelOpen(false); goToFinish(); }}
                      onBack={()=>{ setPanelOpen(false); setPhase("layout"); }}
                    />
                  : <LeftPanel
                      phase={phase} units={units} selected={selected}
                      setSelected={setSelected} setUnits={setUnits}
                      onClearAll={()=>{setUnits([]);setSelected(null);}}
                      onPaletteDragStart={paletteDragStart}
                      onTapAdd={c=>{ tapAdd(c); setPanelOpen(false); }}
                      totalFloor={totalFloor}
                      onNext={phase==="layout"
                        ? ()=>{ setPanelOpen(false); goToMaterials(); }
                        : ()=>{ setPanelOpen(false); setShowQuote(true); }
                      }
                    />
                }
              </div>
            </div>
          </>
        )}
      </div>

      {/* Quote modal */}
      {showQuote && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.85)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:300 }}>
          <div style={{ background:C.black, border:`2px solid ${C.orange}`, borderRadius:10, padding:26, width:430, maxWidth:"92vw", maxHeight:"88vh", overflowY:"auto" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:18, paddingBottom:14, borderBottom:`1px solid ${C.border}` }}>
              <HWHLogo size={26}/>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:"bold" }}>Request a Quote</div>
                <div style={{ fontSize:9, color:C.orange, letterSpacing:2, textTransform:"uppercase" }}>HWH Designs · Custom Carpentry</div>
              </div>
              <button onClick={()=>setShowQuote(false)} style={{ background:"none", border:"none", color:"#666", cursor:"pointer", fontSize:20 }}>✕</button>
            </div>

            {quoteSent ? (
              <div style={{ textAlign:"center", padding:"24px 0" }}>
                <div style={{ width:56, height:56, borderRadius:"50%", background:C.orange, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px", fontSize:22 }}>✓</div>
                <div style={{ fontSize:15, marginBottom:8, fontWeight:"bold" }}>Quote Request Sent!</div>
                <div style={{ fontSize:11, color:"#888", marginBottom:16 }}>Email delivered to kim@hwhdesigns.co.za</div>
                <div style={{ background:"#1A3A1A", border:"1px solid #2D6A2D", borderRadius:8, padding:"12px 16px", display:"inline-flex", alignItems:"center", gap:10 }}>
                  <span style={{ fontSize:18 }}>💬</span>
                  <div style={{ textAlign:"left" }}>
                    <div style={{ fontSize:11, color:"#5DBF5D", fontWeight:"bold" }}>WhatsApp opened</div>
                    <div style={{ fontSize:9, color:"#4A8A4A" }}>Tap Send to notify Kim directly</div>
                  </div>
                </div>
              </div>
            ) : (<>
              <div style={{ marginBottom:10 }}>
                <label style={LBL}>Full Name</label>
                <input value={cName} onChange={e=>setCName(e.target.value)} placeholder="Jane Smith" style={INP}/>
              </div>
              <div style={{ marginBottom:10 }}>
                <label style={LBL}>Email Address</label>
                <input value={cEmail} onChange={e=>setCEmail(e.target.value)} placeholder="jane@example.com" style={INP}/>
              </div>
              <div style={{ marginBottom:16 }}>
                <label style={LBL}>Phone Number</label>
                <input value={cPhone} onChange={e=>setCPhone(e.target.value)} placeholder="+27 11 000 0000" style={INP}/>
              </div>

              <div style={{ background:"rgba(0,0,0,0.4)", borderRadius:6, padding:12, marginBottom:16, border:`1px solid ${C.border}` }}>
                <div style={{ fontSize:8, letterSpacing:2, color:C.orange, textTransform:"uppercase", marginBottom:8 }}>
                  Specification — {bom.length} unit{bom.length!==1?"s":""}
                </div>
                {bom.length===0
                  ? <div style={{ color:"#444", fontSize:11 }}>No cabinets placed.</div>
                  : bom.map((item,i)=>(
                    <div key={i} style={{ padding:"5px 0", borderBottom:`1px solid ${C.border}33` }}>
                      <div style={{ display:"flex", justifyContent:"space-between", fontSize:10, color:"#C0B89A" }}>
                        <span>{item.label} · <span style={{color:C.gold}}>{item.width}mm</span>{item.rot?` · ${item.rot}`:""}</span>
                        <span style={{ color:"#666" }}>{item.finish}</span>
                      </div>
                      <div style={{ display:"flex", gap:12, marginTop:2 }}>
                        {item.hasDoors && (
                          <span style={{ fontSize:8, color:"#555" }}>
                            ⬡ {item.hinges} hinge{item.hinges!==1?"s":""} · {item.hingeLabel}
                          </span>
                        )}
                        {item.hasDrawers && (
                          <span style={{ fontSize:8, color:"#555" }}>
                            ⇒ {item.drawers} runner pair{item.drawers!==1?"s":""} · {item.runnerLabel}
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                }
                <div style={{ marginTop:8, fontSize:10, color:"#666", display:"flex", justifyContent:"space-between" }}>
                  <span>Total floor run</span>
                  <span style={{ color:C.gold, fontWeight:"bold" }}>{totalFloor}mm ({(totalFloor/1000).toFixed(2)}m)</span>
                </div>
                {totalFloor > 0 && (
                  <div style={{ marginTop:4, fontSize:9, color:"#555", display:"flex", justifyContent:"space-between" }}>
                    <span>Kick plate (150mm) on all floor units</span>
                    <span style={{ color:"#666" }}>{(totalFloor/1000).toFixed(2)}m run</span>
                  </div>
                )}
                {totalWall > 0 && (
                  <div style={{ marginTop:4, fontSize:10, color:"#666", display:"flex", justifyContent:"space-between" }}>
                    <span>Total wall cabinet run</span>
                    <span style={{ color:C.gold, fontWeight:"bold" }}>{totalWall}mm ({(totalWall/1000).toFixed(2)}m)</span>
                  </div>
                )}

                {/* Fittings totals */}
                {(totalHinges > 0 || totalRunners > 0) && (
                  <div style={{ marginTop:10, paddingTop:8, borderTop:`1px solid ${C.border}` }}>
                    <div style={{ fontSize:8, letterSpacing:2, color:C.orange, textTransform:"uppercase", marginBottom:6 }}>Fittings Summary</div>
                    {totalHingesStd > 0 && (
                      <div style={{ display:"flex", justifyContent:"space-between", fontSize:9, color:"#999", padding:"2px 0" }}>
                        <span>Standard Hinges</span><span style={{color:C.gold}}>× {totalHingesStd}</span>
                      </div>
                    )}
                    {totalHingesSoft > 0 && (
                      <div style={{ display:"flex", justifyContent:"space-between", fontSize:9, color:"#999", padding:"2px 0" }}>
                        <span>Soft-Close Hinges</span><span style={{color:C.gold}}>× {totalHingesSoft}</span>
                      </div>
                    )}
                    {totalHinges > 0 && (
                      <div style={{ display:"flex", justifyContent:"space-between", fontSize:10, color:"#C0B89A", padding:"3px 0", borderTop:`1px solid ${C.border}33`, marginTop:2 }}>
                        <span style={{fontWeight:"bold"}}>Total Hinges</span><span style={{color:C.gold,fontWeight:"bold"}}>× {totalHinges}</span>
                      </div>
                    )}
                    {totalRunnersStd > 0 && (
                      <div style={{ display:"flex", justifyContent:"space-between", fontSize:9, color:"#999", padding:"2px 0", marginTop:4 }}>
                        <span>Standard Runner Pairs</span><span style={{color:C.gold}}>× {totalRunnersStd}</span>
                      </div>
                    )}
                    {totalRunnersSoft > 0 && (
                      <div style={{ display:"flex", justifyContent:"space-between", fontSize:9, color:"#999", padding:"2px 0" }}>
                        <span>Soft-Close Runner Pairs</span><span style={{color:C.gold}}>× {totalRunnersSoft}</span>
                      </div>
                    )}
                    {totalRunners > 0 && (
                      <div style={{ display:"flex", justifyContent:"space-between", fontSize:10, color:"#C0B89A", padding:"3px 0", borderTop:`1px solid ${C.border}33`, marginTop:2 }}>
                        <span style={{fontWeight:"bold"}}>Total Runner Pairs</span><span style={{color:C.gold,fontWeight:"bold"}}>× {totalRunners}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Materials summary */}
                {(matCtType || matCtColour || matCarcass) && (
                  <div style={{ marginTop:12, paddingTop:10, borderTop:`1px solid ${C.border}` }}>
                    <div style={{ fontSize:8, letterSpacing:2, color:C.orange, textTransform:"uppercase", marginBottom:8 }}>Materials</div>
                    {matCarcass && (
                      <div style={{ display:"flex", justifyContent:"space-between", fontSize:10, color:"#C0B89A", padding:"3px 0" }}>
                        <span style={{color:"#777"}}>Carcass build</span>
                        <span style={{color:C.gold}}>{matCarcass.label}</span>
                      </div>
                    )}
                    {matCtType && (
                      <div style={{ display:"flex", justifyContent:"space-between", fontSize:10, color:"#C0B89A", padding:"3px 0" }}>
                        <span style={{color:"#777"}}>Countertop type</span>
                        <span style={{color:C.gold}}>{matCtType.label}</span>
                      </div>
                    )}
                    {matCtColour && (
                      <div style={{ display:"flex", justifyContent:"space-between", fontSize:10, color:"#C0B89A", padding:"3px 0" }}>
                        <span style={{color:"#777"}}>Countertop colour</span>
                        <span style={{color:C.gold}}>{matCtColour.label}</span>
                      </div>
                    )}
                    {(() => {
                      const ctRunM = units.filter(u=>["base","drawer","corner"].includes(u.type)).reduce((s,u)=>s+u.width,0)/1000;
                      const sqm = (ctRunM * 0.6).toFixed(2);
                      return ctRunM > 0 ? (
                        <div style={{ display:"flex", justifyContent:"space-between", fontSize:10, color:"#C0B89A", padding:"3px 0" }}>
                          <span style={{color:"#777"}}>Countertop area</span>
                          <span style={{color:C.gold}}>{ctRunM.toFixed(2)}m × 0.60m = <strong>{sqm}m²</strong></span>
                        </div>
                      ) : null;
                    })()}
                    {matCarcass && matCtType && (
                      <div style={{ marginTop:6, padding:"6px 8px", background: materials.carcass==="solid"&&materials.ctType==="marble" ? C.orange+"22" : materials.carcass==="solid"||materials.ctType==="marble" ? C.gold+"15" : "rgba(255,255,255,0.03)", borderRadius:4, fontSize:9, color: materials.carcass==="solid"&&materials.ctType==="marble" ? C.orange : materials.carcass==="solid"||materials.ctType==="marble" ? C.gold : "#555" }}>
                        {(materials.carcass==="solid" && ["marble","granite"].includes(materials.ctType)) ? "★ Premium tier" : (materials.carcass==="solid" || ["marble","granite"].includes(materials.ctType)) ? "◆ Mid-range tier" : "● Standard tier"}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Job total — shown after submission only */}
              {jobTotal !== null && (
                priceRevealed ? (
                  <div style={{ margin:"0 0 14px", padding:"14px 16px", background:`linear-gradient(135deg,${C.orange}22,${C.gold}11)`, border:`1.5px solid ${C.orange}`, borderRadius:8 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <div>
                        <div style={{ fontSize:9, letterSpacing:2, color:C.orange, textTransform:"uppercase" }}>Estimated Total</div>
                        <div style={{ fontSize:8, color:"#555", marginTop:2 }}>* Disclaimer — Final pricing could change — to be issued on job measurement confirmed and sign off by client</div>
                      </div>
                      <div style={{ fontSize:22, fontWeight:"bold", color:C.gold }}>
                        R {jobTotal.toLocaleString("en-ZA")}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{ margin:"0 0 14px", padding:"14px 16px", background:"rgba(255,255,255,0.03)", border:`1.5px dashed ${C.border}`, borderRadius:8 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                      <div style={{ fontSize:22, color:C.orange, flexShrink:0 }}>🔒</div>
                      <div>
                        <div style={{ fontSize:10, color:C.white, lineHeight:1.5 }}>
                          Your estimated layout price will be visible here once your details have been submitted.
                        </div>
                        <div style={{ fontSize:8, color:"#555", marginTop:5 }}>Complete your name, email and phone above, then tap Submit.</div>
                      </div>
                    </div>
                  </div>
                )
              )}

              {quoteError && (
                <div style={{ marginBottom:10, padding:"10px 12px", background:"rgba(200,50,50,0.15)", border:"1px solid rgba(200,50,50,0.4)", borderRadius:6, fontSize:10, color:"#E08080" }}>
                  {quoteError}
                </div>
              )}

              <button
                onClick={handleSubmitQuote}
                disabled={!cName||!cEmail||units.length===0||quoteSending}
                style={{ background:C.orange, color:C.white, border:"none", borderRadius:6, width:"100%", padding:13, fontSize:12, fontWeight:"bold", letterSpacing:2, textTransform:"uppercase", cursor:"pointer", fontFamily:"inherit", opacity:(!cName||!cEmail||units.length===0||quoteSending)?0.45:1, display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
                {quoteSending
                  ? <><span style={{ fontSize:14, animation:"spin 1s linear infinite" }}>⟳</span> Sending…</>
                  : <><span>📧</span> Submit & Notify via WhatsApp</>
                }
              </button>
              <div style={{ marginTop:8, fontSize:9, color:"#444", textAlign:"center", lineHeight:1.6 }}>
                Sends spec to <span style={{color:C.orange}}>kim@hwhdesigns.co.za</span> · Opens WhatsApp to +27 82 889 9787
              </div>
            </>)}
          </div>
        </div>
      )}
    </div>
  );
}

const sBtn = (bg, color) => ({ background:bg, color, border:`1px solid ${color}44`, borderRadius:4, padding:"7px 8px", cursor:"pointer", fontSize:9, letterSpacing:1, textTransform:"uppercase", fontFamily:"inherit", width:"100%" });
const ZB   = { background:"none", border:"none", color:"#A09080", cursor:"pointer", fontSize:15, padding:"0 4px", lineHeight:1 };
const LBL  = { fontSize:9, letterSpacing:2, color:"#D96339", textTransform:"uppercase", display:"block", marginBottom:4 };
const INP  = { width:"100%", padding:"9px 11px", boxSizing:"border-box", background:"rgba(255,255,255,0.05)", border:"1px solid #3D2A1F", borderRadius:5, color:"#E8E4DC", fontSize:12, fontFamily:"inherit" };
