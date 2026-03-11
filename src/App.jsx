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

const WALL_H_MM  = 2500;  // 2400 wall + 100 filler headroom for tall/pantry units
const KICK_H_MM  = 150;   // kick plate height on all floor-standing units
const FILLER_H_MM = 100;   // top filler strip on tall/pantry units (connects to ceiling)
const FLOOR_H_MM = 870;   // total height including kick plate
const UPPER_H_MM = 720;
const TALL_H_MM  = 2400;  // filler(100) + body(2150) + kick(150) = wall height exactly
const SNAP_MM    = 100;

// Corner rotation: 0=top-left, 1=top-right, 2=bottom-right, 3=bottom-left
const CORNER_ROTATIONS = ["↖ Top-Left","↗ Top-Right","↘ Bottom-Right","↙ Bottom-Left"];

// ─── Project-level materials ───────────────────────────────────────────────────
const COUNTERTOP_TYPES = [
  { id:"marble",   label:"Marble",   subtitle:"Natural / Engineered stone" },
  { id:"quartz",   label:"Quartz",   subtitle:"Engineered stone — consistent & durable" },
  { id:"melamine", label:"Formica",  subtitle:"Laminate board surface — wide colour range" },
];

const COUNTERTOP_COLOURS = [
  // Shared / general
  { id:"ct-white",              label:"White / Off-white",    color:"#F5F2EC", pattern:null,              types:["marble"] },
  { id:"ct-grey",               label:"Light Grey / Concrete",color:"#C8C8C4", pattern:"concrete",        types:["marble"] },
  { id:"ct-black",              label:"Black / Nero",          color:"#1E1E1E", pattern:null,             types:["marble"] },
  { id:"ct-marble",             label:"Marble / Stone look",   color:"#EAE6E0", pattern:"marble",         types:["marble"] },
  // Formica colours (actual sample range)
  { id:"ct-f-walnut",           label:"Walnut Oak",            color:"#7A5C3C", pattern:"formica-wood-warm",  types:["melamine"] },
  { id:"ct-f-ash",              label:"Ash Grey",              color:"#B8AFA0", pattern:"formica-wood-ash",   types:["melamine"] },
  { id:"ct-f-ebony",            label:"Ebony Grain",           color:"#2E2A28", pattern:"formica-wood-dark",  types:["melamine"] },
  { id:"ct-f-matte-black",      label:"Matte Black",           color:"#1E1E20", pattern:"formica-solid-black",types:["melamine"] },
  { id:"ct-f-white-sparkle",    label:"White Sparkle",         color:"#EEECEA", pattern:"formica-sparkle-wht",types:["melamine"] },
  { id:"ct-f-grey-slate",       label:"Grey Slate",            color:"#B0B4B8", pattern:"formica-slate",      types:["melamine"] },
  { id:"ct-f-salt-pepper",      label:"Salt & Pepper",         color:"#C0BCBA", pattern:"formica-speckle-lt", types:["melamine"] },
  { id:"ct-f-blue-granite",     label:"Blue Granite",          color:"#484C54", pattern:"formica-speckle-dk", types:["melamine"] },
  { id:"ct-f-emperador",        label:"Emperador Dark",        color:"#2A2420", pattern:"formica-emperador",  types:["melamine"] },
  { id:"ct-f-grey-stone",       label:"Grey Stone",            color:"#A4A8AC", pattern:"formica-stone-grey", types:["melamine"] },
  // Quartz — Whites & Creams
  { id:"ct-q-iceberg",          label:"Iceberg",               color:"#F8F8F6", pattern:"quartz-white",   types:["quartz"] },
  { id:"ct-q-magnolia",         label:"Magnolia",              color:"#F5F0E8", pattern:"quartz-cream",   types:["quartz"] },
  { id:"ct-q-macadamia",        label:"Macadamia",             color:"#E8E0CC", pattern:"quartz-sparkle", types:["quartz"] },
  { id:"ct-q-sparkle",          label:"Sparkle",               color:"#ECEAE4", pattern:"quartz-sparkle", types:["quartz"] },
  { id:"ct-q-stratus",          label:"Stratus",               color:"#F2F0E8", pattern:"quartz-white",   types:["quartz"] },
  { id:"ct-q-bianco-cloud",     label:"Bianco Cloud",          color:"#F4F2EE", pattern:"quartz-white",   types:["quartz"] },
  { id:"ct-q-aurelia",          label:"Aurelia",               color:"#F0EDE6", pattern:"quartz-white",   types:["quartz"] },
  { id:"ct-q-noble-white",      label:"Noble White",           color:"#F6F4F2", pattern:"quartz-vein-fine",types:["quartz"] },
  // Quartz — Stones & Neutrals
  { id:"ct-q-beach",            label:"Beach",                 color:"#D8CEBC", pattern:"quartz-stone",   types:["quartz"] },
  { id:"ct-q-dazzle",           label:"Dazzle",                color:"#DDD8CC", pattern:"quartz-stone",   types:["quartz"] },
  { id:"ct-q-misty-pearl",      label:"Misty Pearl",           color:"#D4D0C4", pattern:"quartz-stone",   types:["quartz"] },
  { id:"ct-q-dusty-stone",      label:"Dusty Stone",           color:"#C8C4B8", pattern:"quartz-stone",   types:["quartz"] },
  { id:"ct-q-cremalat",         label:"Cremalat",              color:"#C8C4B0", pattern:"quartz-stone",   types:["quartz"] },
  { id:"ct-q-bianco-sup",       label:"Bianco Supremo",        color:"#EEE8DC", pattern:"quartz-vein-fine",types:["quartz"] },
  // Quartz — Greys & Dark
  { id:"ct-q-platinum",         label:"Platinum",              color:"#A8A8A4", pattern:"quartz-sparkle-grey",types:["quartz"] },
  { id:"ct-q-grey-river",       label:"Grey River",            color:"#B8B4AC", pattern:"quartz-sparkle-grey",types:["quartz"] },
  { id:"ct-q-slate",            label:"Slate",                 color:"#6E7068", pattern:"quartz-grey",    types:["quartz"] },
  { id:"ct-q-charcoal-grey",    label:"Charcoal Grey",         color:"#5A5C54", pattern:"quartz-grey",    types:["quartz"] },
  { id:"ct-q-fawn",             label:"Fawn",                  color:"#9A9484", pattern:"quartz-grey",    types:["quartz"] },
  { id:"ct-q-grigio-cem",       label:"Grigio Cemento",        color:"#888882", pattern:"quartz-cement",  types:["quartz"] },
  { id:"ct-q-wrought-iron",     label:"Wrought Iron",          color:"#7A7870", pattern:"quartz-cement",  types:["quartz"] },
  { id:"ct-q-pietra-tempesta",  label:"Pietra Tempesta",       color:"#707070", pattern:"quartz-grey",    types:["quartz"] },
  { id:"ct-q-thunder",          label:"Thunder",               color:"#6A6860", pattern:"quartz-cement",  types:["quartz"] },
  { id:"ct-q-galaxy",           label:"Galaxy",                color:"#1A1A1A", pattern:"quartz-sparkle-dark",types:["quartz"] },
  { id:"ct-q-nero",             label:"Nero",                  color:"#161616", pattern:"quartz-black",   types:["quartz"] },
  // Quartz — Veined / Statement
  { id:"ct-q-calacatta-fine",   label:"Calacatta Fine",        color:"#F4F2EE", pattern:"quartz-vein-fine",types:["quartz"] },
  { id:"ct-q-bianco-venato",    label:"Bianco Venato",         color:"#F2F0EC", pattern:"quartz-vein-fine",types:["quartz"] },
  { id:"ct-q-calacatta-gold",   label:"Calacatta Gold",        color:"#F5F0E4", pattern:"quartz-vein-gold",types:["quartz"] },
  { id:"ct-q-blanco-steel",     label:"Blanco Steel",          color:"#E8E4E0", pattern:"quartz-vein-fine",types:["quartz"] },
  { id:"ct-q-blanco-bronze",    label:"Blanco Bronze",         color:"#F0EDE4", pattern:"quartz-vein-bronze",types:["quartz"] },
  { id:"ct-q-blanco-pewter",    label:"Blanco Pewter",         color:"#E0DCDA", pattern:"quartz-vein-grey",types:["quartz"] },
  { id:"ct-q-whisper",          label:"Whisper",               color:"#F6F4F2", pattern:"quartz-vein-fine",types:["quartz"] },
  { id:"ct-q-bianco-stat",      label:"Bianco Statuario",      color:"#F0EEEA", pattern:"quartz-vein-fine",types:["quartz"] },
  { id:"ct-q-bianco-calac",     label:"Bianco Calacatta",      color:"#F2F0EC", pattern:"quartz-vein-fine",types:["quartz"] },
  { id:"ct-q-nero-venato",      label:"Nero Venato",           color:"#1C1C1C", pattern:"quartz-vein-dark",types:["quartz"] },
  { id:"ct-q-calacatta-zara",   label:"Calacatta Zara",        color:"#111210", pattern:"quartz-vein-dark",types:["quartz"] },
  { id:"ct-q-bianco-carb",      label:"Bianco Carbonio",       color:"#F0EEE8", pattern:"quartz-vein-fine",types:["quartz"] },
];

const CARCASS_TYPES_MATERIAL = [
  { id:"solid",    label:"Solid Wood",  subtitle:"Premium hardwood carcass build" },
  { id:"melamine", label:"Melamine",    subtitle:"Standard board — durable & cost-effective" },
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
  // Supamatt — solid matte boards
  { id:"matte-folkstone",  label:"Folkstone Grey",  color:"#C4D0D4", type:"matte" },
  // Supagloss — solid gloss boards
  { id:"gloss-iceberg",    label:"Iceberg White",   color:"#EAF0F0", type:"gloss" },
  { id:"gloss-cappuccino", label:"Cappuccino",      color:"#C8C4A8", type:"gloss" },
  { id:"gloss-dunblane",   label:"Dunblane Grey",   color:"#9A9C9C", type:"gloss" },
  { id:"gloss-storm",      label:"Storm Grey",      color:"#4A5158", type:"gloss" },
  { id:"gloss-caraz",      label:"Caraz",           color:"#7A9488", type:"gloss" },
  { id:"gloss-petrol",     label:"Petrol Blue",     color:"#1E3A50", type:"gloss" },
  // Melawood / Supatexture — wood grain boards
  { id:"wood-shale",       label:"Shale Oak",       color:"#C0B09C", type:"wood"  },
  { id:"wood-treviso",     label:"Treviso",         color:"#9A9084", type:"wood"  },
  { id:"wood-alegria",     label:"Alegria",         color:"#6E5C48", type:"wood"  },
  { id:"wood-cherry",      label:"Harvard Cherry",  color:"#A07868", type:"wood"  },
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
    "ct-black":      2450,  // Marble Black
    "ct-marble":     2600,  // Marble / Stone look
    "ct-timber":      850,  // legacy (unused)
    // Formica
    "ct-f-walnut": 950, "ct-f-ash": 850, "ct-f-ebony": 950,
    "ct-f-matte-black": 850, "ct-f-white-sparkle": 850, "ct-f-grey-slate": 950,
    "ct-f-salt-pepper": 850, "ct-f-blue-granite": 950,
    "ct-f-emperador": 1050, "ct-f-grey-stone": 850,
    // Quartz — Whites & Creams
    "ct-q-iceberg": 1950, "ct-q-magnolia": 1950, "ct-q-macadamia": 2050,
    "ct-q-sparkle": 2050, "ct-q-stratus": 1950, "ct-q-bianco-cloud": 1950,
    "ct-q-aurelia": 2050, "ct-q-noble-white": 2150,
    // Quartz — Stones & Neutrals
    "ct-q-beach": 2050, "ct-q-dazzle": 2050, "ct-q-misty-pearl": 2050,
    "ct-q-dusty-stone": 2050, "ct-q-cremalat": 2050, "ct-q-bianco-sup": 2150,
    // Quartz — Greys & Darks
    "ct-q-platinum": 2100, "ct-q-grey-river": 2100, "ct-q-slate": 2100,
    "ct-q-charcoal-grey": 2100, "ct-q-fawn": 2100, "ct-q-grigio-cem": 2150,
    "ct-q-wrought-iron": 2150, "ct-q-pietra-tempesta": 2200, "ct-q-thunder": 2150,
    "ct-q-galaxy": 2350, "ct-q-nero": 2350,
    // Quartz — Veined / Statement
    "ct-q-calacatta-fine": 2450, "ct-q-bianco-venato": 2350, "ct-q-calacatta-gold": 2650,
    "ct-q-blanco-steel": 2350, "ct-q-blanco-bronze": 2550, "ct-q-blanco-pewter": 2450,
    "ct-q-whisper": 2250, "ct-q-bianco-stat": 2450, "ct-q-bianco-calac": 2450,
    "ct-q-nero-venato": 2550, "ct-q-calacatta-zara": 2750, "ct-q-bianco-carb": 2350,
  },
  // 3. Carcass build upcharge per unit (R) — added on top of carcass base price
  carcassBuild: { "melamine": 650, "solid": 950 },
  // 4. Door finishes — price per door leaf (R), keyed by finish id
  finish: {
    // Supamatt
    "matte-folkstone": 650,
    // Supagloss
    "gloss-iceberg": 950, "gloss-cappuccino": 950, "gloss-dunblane": 950,
    "gloss-storm": 950, "gloss-caraz": 950, "gloss-petrol": 950,
    // Melawood / Supatexture wood grain
    "wood-shale": 1100, "wood-treviso": 1100, "wood-alegria": 1100, "wood-cherry": 1100,
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

  // Tall unit run in metres (for top filler strip)
  const tallRunM = units
    .filter(u => ["tall-single","tall-double","tall-double-v"].includes(u.type))
    .reduce((s, u) => s + u.width, 0) / 1000;

  // Base-only run for countertop (base + drawer units only)
  const countertopRunM = units
    .filter(u => ["base","drawer","corner"].includes(u.type))
    .reduce((s, u) => s + u.width, 0) / 1000;

  // Carcass markup: 3.5x melamine, 6x solid wood — applied to carcass cost only
  const carcassMarkup = materials.carcass === "solid" ? 6.0 : 3.5;

  units.forEach(u => {
    const carcassKey   = `${u.type}-${u.width}`;
    const carcassPrice = PRICING.carcass[carcassKey] || 0;
    // Apply markup to carcass + build upcharge only
    total += (carcassPrice + carcassBuildUpcharge) * carcassMarkup;

    // Door finish cost — at catalog rate (no markup)
    const hc = hingeCount(u);
    const finishPricePerDoor = PRICING.finish[u.finish || DEFAULT_FINISH] || 0;
    total += finishPricePerDoor * hc.doors;

    // Handle cost — at catalog rate
    const dc = drawerCount(u);
    const handlePrice = PRICING.hardware[u.hardware || DEFAULT_HW] || 0;
    total += handlePrice * (hc.doors + dc);

    // Hinge cost — at catalog rate
    const hingePrice = PRICING.hinge[u.hinge || DEFAULT_HINGE] || 0;
    total += hingePrice * hc.total;

    // Runner cost — at catalog rate
    const runnerPrice = PRICING.runner[u.runner || DEFAULT_RUNNER] || 0;
    total += runnerPrice * dc;
  });

  // Countertop — at catalog rate
  const ctPrice = PRICING.countertop[materials.ctColour] || 0;
  total += ctPrice * countertopRunM;

  // Kick plate — at catalog rate
  total += PRICING.kickPlate * floorRunM;

  // Top filler strip on tall units — same rate as kick plate
  total += PRICING.kickPlate * tallRunM;

  return Math.round(total);
}

const DEFAULT_FINISH = "gloss-iceberg";
const DEFAULT_HW     = "gold";

const snapMm    = v => Math.round(v / SNAP_MM) * SNAP_MM;
const getFinish = id => FINISHES.find(f => f.id === id) || FINISHES[0];

function finishBg(id) {
  const f = getFinish(id);
  if (f.type === "wood") {
    // Each wood grain rendered distinctly to match real sample character
    if (f.id === "wood-shale")   return `repeating-linear-gradient(180deg,#C8BCA8 0,#C0B09C 3px,#B8A890 6px,#C4B49E 9px,#BCAC96 14px,#C0B09C 18px)`;
    if (f.id === "wood-treviso") return `repeating-linear-gradient(180deg,#A09488 0,#9A9084 2px,#928878 5px,#9E9282 8px,#888070 12px,#9A9084 16px)`;
    if (f.id === "wood-alegria") return `repeating-linear-gradient(180deg,#7A6650 0,#6E5C48 2px,#624E3E 5px,#705A44 9px,#584436 13px,#6E5C48 18px)`;
    if (f.id === "wood-cherry")  return `repeating-linear-gradient(180deg,#B08878 0,#A07868 3px,#986C60 6px,#AC8070 10px,#947060 14px,#A07868 18px)`;
    return `repeating-linear-gradient(90deg,${f.color}CC 0,${f.color} 2px,${f.color}88 5px,${f.color} 8px)`;
  }
  if (f.type === "gloss") return `linear-gradient(145deg,${f.color}EE 0%,${f.color} 40%,${f.color}CC 70%,${f.color}AA 100%)`;
  return f.color;
}

function countertopBg(ct) {
  if (!ct) return "transparent";
  switch(ct.pattern) {
    case "marble":        return `linear-gradient(135deg,#EAE6E0 38%,#D8D4CE 40%,#EAE6E0 42%,#E0DCD5 58%,#EAE6E0 60%,#D4D0CA 78%,#EAE6E0 80%)`;
    case "concrete":      return `radial-gradient(ellipse at 30% 40%,#C0C0BC 0%,#C8C8C4 40%,#BEBEBA 100%)`;
    case "wood":          return `repeating-linear-gradient(90deg,#C4935A 0,#B8864E 2px,#C4935A 5px,#BE8D54 8px)`;
    // Quartz patterns
    case "quartz-white":        return ct.color;
    case "quartz-cream":        return `linear-gradient(135deg,${ct.color} 60%,${ct.color}CC 100%)`;
    case "quartz-sparkle":      return `radial-gradient(ellipse at 30% 40%,${ct.color}EE 0%,${ct.color} 40%,${ct.color}CC 100%)`;
    case "quartz-sparkle-grey": return `radial-gradient(ellipse at 60% 30%,#C0C0BC 0%,#B8B4AC 50%,#B0ACA4 100%)`;
    case "quartz-sparkle-dark": return `radial-gradient(ellipse at 40% 40%,#242424 0%,#1A1A1A 50%,#101010 100%)`;
    case "quartz-stone":        return `radial-gradient(ellipse at 40% 50%,${ct.color}EE 0%,${ct.color} 50%,${ct.color}BB 100%)`;
    case "quartz-grey":         return ct.color;
    case "quartz-grey-dark":    return ct.color;
    case "quartz-cement":       return `radial-gradient(ellipse at 30% 30%,${ct.color}EE 0%,${ct.color} 60%,${ct.color}CC 100%)`;
    case "quartz-black":        return "#161616";
    case "quartz-vein-fine":    return `linear-gradient(125deg,${ct.color} 38%,rgba(180,180,175,0.4) 40%,${ct.color} 42%,${ct.color} 65%,rgba(190,188,184,0.3) 67%,${ct.color} 69%)`;
    case "quartz-vein-gold":    return `linear-gradient(130deg,#F8F4EC 30%,#C8A860 32%,#F5F0E4 34%,#F5F0E4 55%,#D4B070 57%,#F5F0E4 59%)`;
    case "quartz-vein-bronze":  return `linear-gradient(140deg,#F4F0E8 35%,#A07840 37%,#F0EDE4 39%,#F0EDE4 60%,#8A6838 62%,#F0EDE4 64%)`;
    case "quartz-vein-grey":    return `linear-gradient(130deg,#E8E4E2 40%,#9A9894 42%,#E0DCDA 44%,#E0DCDA 62%,#A8A6A2 64%,#E0DCDA 66%)`;
    case "quartz-vein-dark":    return `linear-gradient(135deg,#1C1C1C 35%,#3A3A38 37%,#1A1A18 39%,#141412 60%,#2E2E2C 62%,#121210 64%)`;
    // Formica patterns
    case "formica-wood-warm":   return `linear-gradient(180deg,#8A6844 0%,#7A5C3C 15%,#6E5234 30%,#7E6040 45%,#8A6844 60%,#6A4E30 75%,#7A5C3C 100%)`;
    case "formica-wood-ash":    return `linear-gradient(180deg,#C4BAA8 0%,#B8AFA0 20%,#C0B5A4 40%,#ACAA9A 60%,#B8AFA0 80%,#BEB4A4 100%)`;
    case "formica-wood-dark":   return `linear-gradient(180deg,#343030 0%,#2E2A28 12%,#383432 25%,#2A2624 40%,#302C2A 55%,#262220 70%,#2E2A28 85%,#343030 100%)`;
    case "formica-solid-black": return `#1E1E20`;
    case "formica-sparkle-wht": return `radial-gradient(ellipse at 30% 40%,#F4F2F0 0%,#EEECEA 40%,#E8E6E4 100%)`;
    case "formica-slate":       return `linear-gradient(145deg,#B8BCC0 30%,#222222 32%,#B0B4B8 34%,#B0B4B8 58%,#1A1A1A 60%,#AEB2B6 62%)`;
    case "formica-speckle-lt":  return `radial-gradient(ellipse at 40% 50%,#D0CCCA 0%,#C0BCBA 40%,#B4B0AE 100%)`;
    case "formica-speckle-dk":  return `radial-gradient(ellipse at 50% 40%,#54585E 0%,#484C54 40%,#3C4048 100%)`;
    case "formica-emperador":   return `radial-gradient(ellipse at 30% 30%,#3A302C 0%,#2A2420 50%,#1E1A18 100%)`;
    case "formica-stone-grey":  return `radial-gradient(ellipse at 50% 40%,#B0B4B8 0%,#A4A8AC 50%,#9CA0A4 100%)`;
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
  const fillerH  = isTall ? FILLER_H_MM * pxPerMm : 0;
  const topH     = H - kickH;          // bottom of carcass body (above kick plate)
  const carcassY = fillerH;            // carcass body starts BELOW filler on tall units
  const carcassH = topH - fillerH;     // carcass body height (shrunk by filler on tall units)
  const countTop = (isBase || isDrawer) ? 38 * pxPerMm : 0;
  const pad      = Math.max(3, W * 0.045);
  const topPad   = carcassY + pad + countTop;   // door area starts after filler + top pad
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
          {/* Carcass body — starts below filler on tall units */}
          <rect x={0} y={carcassY} width={W} height={carcassH} rx={1.5}
            fill={isWood ? `url(#g${uid})` : f.color}
            stroke={selected ? C.orange : "#00000044"}
            strokeWidth={selected ? 2.5 : 1}
            filter={selected ? `url(#sel${uid})` : undefined}/>
          {isGloss && <rect x={0} y={carcassY} width={W} height={carcassH} rx={1.5} fill={`url(#gs${uid})`}/>}

          {/* Countertop on base/drawer — foreignObject so CSS gradients work */}
          {(isBase || isDrawer) && (() => {
            const ctBg = ctColour ? countertopBg(ctColour) : "#CEBFAE";
            return (<>
              <foreignObject x={0} y={0} width={W} height={countTop}>
                <div xmlns="http://www.w3.org/1999/xhtml"
                  style={{ width:"100%", height:"100%", background:ctBg, borderRadius:"1.5px 1.5px 0 0" }}/>
              </foreignObject>
              <rect x={0} y={countTop-3} width={W} height={3} fill="rgba(0,0,0,0.2)"/>
            </>);
          })()}

          {/* Kick plate */}
          {isFloor && (<>
            <rect x={0} y={topH} width={W} height={kickH} fill="#1A1210" rx={1}/>
            <rect x={4} y={topH+2} width={W-8} height={kickH-4} fill="#222" rx={1}/>
          </>)}

          {/* Top filler strip — tall/pantry units connect to ceiling */}
          {isTall && (<>
            <rect x={0} y={0} width={W} height={fillerH} fill="#1A1210" rx={1}/>
            <rect x={4} y={2} width={W-8} height={fillerH-4} fill="#252220" rx={1}/>
            <line x1={0} x2={W} y1={fillerH} y2={fillerH} stroke="#000" strokeWidth={1.5}/>
            <text x={W/2} y={fillerH/2+3} textAnchor="middle" fontSize={Math.max(6, pxPerMm*20)}
              fill="rgba(255,255,255,0.3)" fontFamily="sans-serif" letterSpacing="0.5">FILLER</text>
          </>)}

          {/* Drawer stacks */}
          {isDrawer && (() => {
            const numD = unit.width <= 450 ? 3 : 4;
            const dH   = bodyH / numD;
            return Array.from({length:numD}).map((_,i) => (
              <g key={i}>
                <rect x={pad+2} y={topPad+i*dH+2} width={W-pad*2-4} height={dH-4}
                  fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth={1} rx={1}/>
                {hw?.color && (() => { const hw2=Math.min(36, (W-pad*2-4)*0.45); return <rect x={W/2-hw2/2} y={topPad+i*dH+dH*0.44} width={hw2} height={Math.max(3,pxPerMm*4)} rx={2} fill={hw.color}/>; })()}
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
                {hw?.color && (() => { const hw2=Math.min(20,(W-pad*2-6)*0.35); return <rect x={W/2-hw2/2} y={topPad+halfH*0.5} width={hw2} height={Math.max(3,pxPerMm*4)} rx={2} fill={hw.color}/>; })()}
                {/* Mid rail */}
                <rect x={0} y={railY-2} width={W} height={4} fill="rgba(0,0,0,0.25)"/>
                {/* Bottom door */}
                <rect x={pad+3} y={railY+3} width={W-pad*2-6} height={halfH-6}
                  fill="none" stroke="rgba(0,0,0,0.13)" strokeWidth={1} rx={1}/>
                {hw?.color && (() => { const hw2=Math.min(20,(W-pad*2-6)*0.35); return <rect x={W/2-hw2/2} y={railY+halfH*0.5} width={hw2} height={Math.max(3,pxPerMm*4)} rx={2} fill={hw.color}/>; })()}
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
                {hw?.color && (() => { const hw2=Math.min(20,(halfW-6)*0.45); return <rect x={pad+halfW*0.5-hw2/2} y={topPad+bodyH*0.5} width={hw2} height={Math.max(3,pxPerMm*4)} rx={2} fill={hw.color}/>; })()}
                {/* Centre stile */}
                <rect x={pad+halfW-2} y={topPad} width={4} height={bodyH} fill="rgba(0,0,0,0.25)"/>
                {/* Right door */}
                <rect x={pad+halfW+3} y={topPad+3} width={halfW-6} height={bodyH-6}
                  fill="none" stroke="rgba(0,0,0,0.13)" strokeWidth={1} rx={1}/>
                {hw?.color && (() => { const hw2=Math.min(20,(halfW-6)*0.45); return <rect x={pad+halfW+halfW*0.5-hw2/2} y={topPad+bodyH*0.5} width={hw2} height={Math.max(3,pxPerMm*4)} rx={2} fill={hw.color}/>; })()}
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
                {hw?.color && (() => { const hw2=Math.min(20,(dw-6)*0.45); return <rect x={pad+i*dw+dw/2-hw2/2} y={topPad+bodyH*0.5} width={hw2} height={Math.max(3,pxPerMm*4)} rx={2} fill={hw.color}/>; })()}
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
function LeftPanel({ phase, units, selected, setSelected, setUnits, onClearAll, onPaletteDragStart, onTapAdd, totalFloor, totalWall, onNext, globalHinge, setGlobalHinge, globalRunner, setGlobalRunner }) {
  const panelScrollRef = useRef(null);
  // Reset scroll to top whenever phase or selected unit changes
  useEffect(() => {
    if (panelScrollRef.current) panelScrollRef.current.scrollTop = 0;
  }, [phase, selected]);
  const [openGroup, setOpenGroup] = useState(null);
  const PALETTE_GROUPS = [
    { key:"base",   label:"Base Units",   icon:"▬", types:["base"],         floor:true  },
    { key:"drawer", label:"Drawer Units", icon:"▤", types:["drawer"],       floor:true  },
    { key:"upper",  label:"Wall Cabinets",icon:"▭", types:["upper"],        floor:false },
    { key:"tall",   label:"Tall / Pantry",icon:"▮", types:["tall-single","tall-double","tall-double-v"], floor:true, tall:true },
    { key:"corner", label:"Corner Units", icon:"◣", types:["corner"],       floor:true  },
  ];
  const selUnit   = units.find(u => u.id === selected);
  const updateSel = patch => setUnits(p => p.map(u => u.id===selected ? {...u,...patch} : u));
  const applyAll      = patch => setUnits(p => p.map(u => ({...u,...patch})));
  const applyType     = patch => setUnits(p => p.map(u => u.type===selUnit?.type ? {...u,...patch} : u));
  const applyAllHinge  = hid  => { setGlobalHinge(hid);  setUnits(p => p.map(u => u.type !== "drawer" ? {...u, hinge:hid}  : u)); };
  const applyAllRunner = rid  => { setGlobalRunner(rid); setUnits(p => p.map(u => u.type === "drawer" ? {...u, runner:rid} : u)); };
  const removeSel = ()    => { setUnits(p => p.filter(u => u.id!==selected)); setSelected(null); };

  // Show finish editor if something is selected AND we're in finish phase
  const showFinishes = phase === "finish" && selUnit;
  // Show unit list in finish phase but nothing selected
  const showUnitList = phase === "finish" && !selUnit;

  return (
    <aside style={{ width:"100%", background:C.panel, display:"flex", flexDirection:"column", height:"100%", overflow:"hidden" }}>

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
          : showUnitList ? "③ Finishes · Apply or edit individually"
          : "① Add Cabinets"}
      </div>

      <div ref={panelScrollRef} style={{ flex:1, overflowY:"auto", minHeight:0 }}>

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
                    width:"100%", padding:"16px 16px", background: isOpen ? C.orange+"18" : "transparent",
                    border:"none", borderLeft: isOpen ? `4px solid ${C.orange}` : "4px solid transparent",
                    cursor:"pointer", display:"flex", alignItems:"center", gap:14, fontFamily:"inherit",
                    transition:"all 0.15s",
                  }}>
                    <span style={{ fontSize:24, color: isOpen ? C.gold : "#666", flexShrink:0 }}>{group.icon}</span>
                    <div style={{ flex:1, textAlign:"left" }}>
                      <div style={{ fontSize:15, color: isOpen ? C.white : "#999", fontWeight: isOpen?"bold":"normal" }}>{group.label}</div>
                      {group.floor && <div style={{ fontSize:9, color:C.orange+"77", marginTop:2 }}>+ kick plate</div>}
                      {group.tall && <div style={{ fontSize:9, color:C.orange+"77", marginTop:2 }}>+ filler strip</div>}
                    </div>
                    <span style={{ fontSize:16, color: isOpen ? C.orange : "#444", transition:"transform 0.2s", display:"inline-block", transform: isOpen?"rotate(90deg)":"rotate(0deg)" }}>›</span>
                  </button>
                  {/* Accordion body */}
                  {isOpen && (
                    <div style={{ padding:"6px 8px 10px", background:"rgba(0,0,0,0.15)", display:"grid", gridTemplateColumns:"1fr 1fr", gap:7 }}>
                      {items.map(c => (
                        <div key={c.id} draggable onDragStart={e=>onPaletteDragStart(e,c)}
                          onClick={()=>onTapAdd && onTapAdd(c)}
                          style={{ padding:"14px 10px", background:c.bg, border:`1px solid ${C.border}`, borderRadius:9, cursor:"grab", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:7, userSelect:"none", transition:"border-color 0.15s", textAlign:"center", minHeight:80 }}
                          onMouseEnter={e=>e.currentTarget.style.borderColor=C.orange}
                          onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}
                        >
                          <span style={{ fontSize:22, color:C.gold, opacity:0.9 }}>{c.icon}</span>
                          <div style={{ fontSize:10, color:C.white, lineHeight:1.3 }}>{c.desc}</div>
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
                {totalWall > 0 && <div style={{ fontSize:10, color:"#666", marginTop:3 }}>Wall run: <span style={{color:C.gold}}>{totalWall}mm</span></div>}
                <button onClick={onClearAll} style={{ ...sBtn("transparent","#C55"), marginTop:8, padding:"5px 8px", fontSize:9, width:"100%" }}>Clear All</button>
              </div>
            )}
          </>
        )}

        {/* ── FINISHES: No unit selected — show global colour picker first ── */}
        {showUnitList && (
          <>
            {/* Global quick-apply colour grid */}
            <div style={{ padding:"10px 10px 4px" }}>
              <div style={{ fontSize:9, color:C.orange, letterSpacing:2, textTransform:"uppercase", marginBottom:2 }}>Choose a finish</div>
              <div style={{ fontSize:8, color:"#555", marginBottom:10 }}>Pick a colour below, then tap Apply to All — or select a unit to customise individually.</div>

              {/* Global fittings — hinges & runners */}
              {(() => {
                const hasDoorUnits   = units.some(u => u.type !== "drawer");
                const hasDrawerUnits = units.some(u => u.type === "drawer");
                if (!hasDoorUnits && !hasDrawerUnits) return null;
                const totalHingeCount  = units.filter(u=>u.type!=="drawer").reduce((s,u)=>s+hingeCount(u).total,0);
                const totalRunnerCount = units.filter(u=>u.type==="drawer").reduce((s,u)=>s+drawerCount(u),0);
                return (
                  <div style={{ marginBottom:10, padding:"8px 10px", background:"rgba(0,0,0,0.25)", borderRadius:6, border:`1px solid ${C.border}33` }}>
                    <div style={{ fontSize:8, letterSpacing:2, color:C.orange, textTransform:"uppercase", marginBottom:10 }}>Fittings — All Units</div>
                    {hasDoorUnits && (
                      <div style={{ marginBottom: hasDrawerUnits ? 10 : 0 }}>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:6 }}>
                          <div style={{ fontSize:8, color:"#666", letterSpacing:1, textTransform:"uppercase" }}>Door Hinges</div>
                          <div style={{ fontSize:8, color:C.gold }}>{totalHingeCount} hinges</div>
                        </div>
                        <div style={{ display:"flex", gap:6 }}>
                          {HINGES.map(h => {
                            const isSel = globalHinge === h.id;
                            return (
                              <button key={h.id} onClick={()=>applyAllHinge(h.id)} style={{
                                flex:1, padding:"14px 8px", borderRadius:7, cursor:"pointer",
                                border: isSel ? `2px solid ${C.orange}` : `1px solid ${C.border}`,
                                background: isSel ? C.orange+"22" : "rgba(255,255,255,0.02)",
                                fontFamily:"inherit", textAlign:"center",
                              }}>
                                <div style={{ fontSize:13, color: isSel ? C.white : "#888", fontWeight: isSel?"bold":"normal" }}>
                                  {h.id === "hinge-std" ? "Standard" : "Soft-Close"}
                                </div>
                                <div style={{ fontSize:10, color: isSel ? C.gold : "#555", marginTop:4 }}>
                                  {h.id === "hinge-std" ? "R75 ea" : "R115 ea"}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    {hasDrawerUnits && (
                      <div>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:6 }}>
                          <div style={{ fontSize:8, color:"#666", letterSpacing:1, textTransform:"uppercase" }}>Drawer Runners</div>
                          <div style={{ fontSize:8, color:C.gold }}>{totalRunnerCount} pairs</div>
                        </div>
                        <div style={{ display:"flex", gap:6 }}>
                          {RUNNERS.map(r => {
                            const isSel = globalRunner === r.id;
                            return (
                              <button key={r.id} onClick={()=>applyAllRunner(r.id)} style={{
                                flex:1, padding:"14px 8px", borderRadius:7, cursor:"pointer",
                                border: isSel ? `2px solid ${C.orange}` : `1px solid ${C.border}`,
                                background: isSel ? C.orange+"22" : "rgba(255,255,255,0.02)",
                                fontFamily:"inherit", textAlign:"center",
                              }}>
                                <div style={{ fontSize:13, color: isSel ? C.white : "#888", fontWeight: isSel?"bold":"normal" }}>
                                  {r.id === "runner-std" ? "Standard" : "Soft-Close"}
                                </div>
                                <div style={{ fontSize:10, color: isSel ? C.gold : "#555", marginTop:4 }}>
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

              {/* Global handle picker */}
              <div style={{ marginBottom:10, padding:"8px 10px", background:"rgba(0,0,0,0.25)", borderRadius:6, border:`1px solid ${C.border}33` }}>
                <div style={{ fontSize:8, letterSpacing:2, color:C.orange, textTransform:"uppercase", marginBottom:8 }}>Handle / Pull — All Units</div>
                {HARDWARE.map(hw => {
                  const anySelected = units.some(u => (u.hardware || DEFAULT_HW) === hw.id);
                  const allSelected = units.length > 0 && units.every(u => (u.hardware || DEFAULT_HW) === hw.id);
                  return (
                    <button key={hw.id} onClick={()=>setUnits(p=>p.map(u=>({...u,hardware:hw.id})))} style={{
                      width:"100%", marginBottom:4, padding:"9px 12px", borderRadius:6, cursor:"pointer",
                      border: allSelected ? `1.5px solid ${C.orange}` : `1px solid ${C.border}`,
                      background: allSelected ? C.orange+"18" : "rgba(255,255,255,0.02)",
                      color: allSelected ? C.white : "#666",
                      textAlign:"left", display:"flex", alignItems:"center", gap:10, fontSize:11, fontFamily:"inherit",
                    }}>
                      {hw.color
                        ? <div style={{width:30,height:8,borderRadius:4,background:hw.color,flexShrink:0}}/>
                        : <div style={{width:30,textAlign:"center",color:"#555",fontSize:16,flexShrink:0}}>—</div>}
                      {hw.label}
                    </button>
                  );
                })}
              </div>

              {/* Colour swatches */}
              {[{type:"matte",label:"Supamatt"},{type:"gloss",label:"Supagloss"},{type:"wood",label:"Wood Grain"}].map(({type,label}) => {
                // Detect if all units share one finish of this type
                const allFinish = units.length > 0 && units.every(u => (u.finish||DEFAULT_FINISH) === units[0].finish) ? units[0].finish : null;
                return (
                  <div key={type} style={{ marginBottom:10 }}>
                    <div style={{ fontSize:9, letterSpacing:1.5, color:"#555", textTransform:"uppercase", marginBottom:6 }}>{label}</div>
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8 }}>
                      {FINISHES.filter(f=>f.type===type).map(f => {
                        const isGlobalSel = units.length > 0 && units.every(u=>(u.finish||DEFAULT_FINISH)===f.id);
                        return (
                          <div key={f.id} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
                            <button onClick={()=>setUnits(p=>p.map(u=>({...u,finish:f.id})))} title={f.label} style={{
                              width:"100%", aspectRatio:"1", borderRadius:8, cursor:"pointer",
                              border: isGlobalSel ? `2.5px solid ${C.orange}` : `1.5px solid ${C.border}`,
                              boxShadow: isGlobalSel ? `0 0 0 2px ${C.orange}44` : "none",
                              transform: isGlobalSel ? "scale(1.12)" : "scale(1)",
                              transition:"all 0.12s", background:finishBg(f.id),
                            }}/>
                            <span style={{ fontSize:7, color:"#555", textAlign:"center", width:"100%", lineHeight:1.2 }}>{f.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Divider + unit list for individual editing */}
            <div style={{ padding:"8px 10px 4px", borderTop:`1px solid ${C.border}`, marginTop:4 }}>
              <div style={{ fontSize:8, color:"#555", letterSpacing:1, textTransform:"uppercase", marginBottom:6 }}>Or edit individually:</div>
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
                    <span style={{ fontSize:10, color:"#444" }}>›</span>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* ── FINISH EDITOR (finish phase, unit selected) ── */}
        {showFinishes && (
          <div style={{ padding:"8px 10px" }}>

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
            <div style={{ marginBottom:8, padding:"6px 9px", background:"rgba(0,0,0,0.3)", borderRadius:5, border:`1px solid ${C.border}33` }}>
              <div style={{ fontSize:9, color:C.orange, letterSpacing:1.5, textTransform:"uppercase" }}>
                {CARCASS_TYPES.find(c=>c.type===selUnit.type&&c.width===selUnit.width)?.label || selUnit.type}
              </div>
              <div style={{ fontSize:8, color:"#555", marginTop:2 }}>
                {selUnit.width}mm
                {selUnit.type==="drawer" ? ` · ${drawerCount(selUnit)} drawers · Runners below` : ` · ${hingeCount(selUnit).total} hinges · Hinges below`}
              </div>
              {/* Corner rotation inline */}
              {selUnit.type === "corner" && (
                <div style={{ marginTop:8 }}>
                  <div style={{ fontSize:8, letterSpacing:1.5, color:"#666", textTransform:"uppercase", marginBottom:6 }}>Corner orientation</div>
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
            </div>

            {/* ── GLOBAL FITTINGS — shown when layout has door or drawer units ── */}
            {(() => {
              const hasDoorUnits   = units.some(u => u.type !== "drawer");
              const hasDrawerUnits = units.some(u => u.type === "drawer");
              if (!hasDoorUnits && !hasDrawerUnits) return null;
              // Current global selections (from first matching unit)
              const curHinge  = globalHinge;
              const curRunner = globalRunner;
              const totalHingeCount  = units.filter(u=>u.type!=="drawer").reduce((s,u)=>s+hingeCount(u).total,0);
              const totalRunnerCount = units.filter(u=>u.type==="drawer").reduce((s,u)=>s+drawerCount(u),0);
              return (
                <div style={{ marginBottom:8, padding:"8px 10px", background:"rgba(0,0,0,0.25)", borderRadius:6, border:`1px solid ${C.border}33` }}>
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
                              flex:1, padding:"14px 8px", borderRadius:7, cursor:"pointer",
                              border: isSel ? `2px solid ${C.orange}` : `1px solid ${C.border}`,
                              background: isSel ? C.orange+"22" : "rgba(255,255,255,0.02)",
                              fontFamily:"inherit", textAlign:"center",
                            }}>
                              <div style={{ fontSize:13, color: isSel ? C.white : "#888", fontWeight: isSel?"bold":"normal" }}>
                                {h.id === "hinge-std" ? "Standard" : "Soft-Close"}
                              </div>
                              <div style={{ fontSize:10, color: isSel ? C.gold : "#555", marginTop:4 }}>
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
                              flex:1, padding:"14px 8px", borderRadius:7, cursor:"pointer",
                              border: isSel ? `2px solid ${C.orange}` : `1px solid ${C.border}`,
                              background: isSel ? C.orange+"22" : "rgba(255,255,255,0.02)",
                              fontFamily:"inherit", textAlign:"center",
                            }}>
                              <div style={{ fontSize:13, color: isSel ? C.white : "#888", fontWeight: isSel?"bold":"normal" }}>
                                {r.id === "runner-std" ? "Standard" : "Soft-Close"}
                              </div>
                              <div style={{ fontSize:10, color: isSel ? C.gold : "#555", marginTop:4 }}>
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

            {/* ── Sticky Apply to All — visible right after fittings, before swatches ── */}
            {units.length > 1 && (
              <div style={{ marginBottom:10, paddingBottom:10, borderBottom:`1px solid ${C.border}` }}>
                <button onClick={()=>{
                  setUnits(p => p.map(u => ({
                    ...u,
                    finish:   selUnit.finish,
                    hardware: selUnit.hardware,
                    ...(u.type !== "drawer" ? { hinge: globalHinge } : {}),
                    ...(u.type === "drawer" ? { runner: globalRunner } : {}),
                  })));
                }} style={{
                  width:"100%", padding:"12px", borderRadius:8, cursor:"pointer",
                  background:C.gold+"22", color:C.gold, border:`1.5px solid ${C.gold}66`,
                  fontSize:12, fontWeight:"bold", letterSpacing:1.5, textTransform:"uppercase", fontFamily:"inherit",
                  display:"flex", alignItems:"center", justifyContent:"center", gap:6,
                }}>
                  <span style={{fontSize:14}}>✦</span> Apply to All Units
                </button>
              </div>
            )}

            {/* ── DRAWERS: Runners first, then handle, then finish ── */}
            {selUnit.type === "drawer" && (() => {
              const dc = drawerCount(selUnit);
              return (<>
                {/* Handle */}
                <div style={{ marginBottom:12, paddingTop:10, borderTop:`1px solid ${C.border}33` }}>
                  <div style={{ fontSize:10, letterSpacing:2, color:"#666", textTransform:"uppercase", marginBottom:10 }}>Handle / Pull</div>
                  {HARDWARE.map(hw=>(
                    <button key={hw.id} onClick={()=>updateSel({hardware:hw.id})} style={{
                      width:"100%", marginBottom:4, padding:"7px 8px", borderRadius:4, cursor:"pointer",
                      border:selUnit.hardware===hw.id?`1px solid ${C.orange}`:`1px solid ${C.border}`,
                      background:selUnit.hardware===hw.id?C.orange+"18":"rgba(255,255,255,0.02)",
                      color:selUnit.hardware===hw.id?C.white:"#666",
                      textAlign:"left", display:"flex", alignItems:"center", gap:8, fontSize:10, fontFamily:"inherit",
                    }}>
                      {hw.color
                        ? <div style={{width:30,height:8,borderRadius:4,background:hw.color,flexShrink:0}}/>
                        : <div style={{width:30,textAlign:"center",color:"#555",fontSize:16,flexShrink:0}}>—</div>}
                      {hw.label}
                    </button>
                  ))}
                </div>

                {/* Finish swatches (drawer carcass colour) */}
                <div style={{ paddingTop:10, borderTop:`1px solid ${C.border}33` }}>
                  <div style={{ fontSize:10, letterSpacing:2, color:"#666", textTransform:"uppercase", marginBottom:10 }}>Carcass Finish</div>
                  {["matte","gloss","wood"].map(type => (
                    <div key={type} style={{ marginBottom:10 }}>
                      <div style={{ fontSize:7, letterSpacing:1.5, color:"#444", textTransform:"uppercase", marginBottom:5 }}>
                        {type==="wood"?"Wood Grain":type==="gloss"?"Supagloss":"Supamatt"}
                      </div>
                      <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:8 }}>
                        {FINISHES.filter(f=>f.type===type).map(f=>(
                          <div key={f.id} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
                            <button onClick={()=>updateSel({finish:f.id})} title={f.label} style={{
                              width:"100%", aspectRatio:"1", borderRadius:8, cursor:"pointer",
                              border:selUnit.finish===f.id?`2.5px solid ${C.orange}`:`1.5px solid ${C.border}`,
                              boxShadow:selUnit.finish===f.id?`0 0 0 2px ${C.orange}44`:"none",
                              transform:selUnit.finish===f.id?"scale(1.12)":"scale(1)",
                              transition:"all 0.12s", background:finishBg(f.id),
                            }}/>
                            <span style={{ fontSize:8, color:"#555", textAlign:"center", width:"100%", lineHeight:1.2 }}>{f.label}</span>
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
                <div key={type} style={{ marginBottom:7 }}>
                  <div style={{ fontSize:10, letterSpacing:2, color:"#666", textTransform:"uppercase", marginBottom:10 }}>
                    {type==="wood"?"Wood Grain":type==="gloss"?"Supagloss":"Supamatt"}
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:8 }}>
                    {FINISHES.filter(f=>f.type===type).map(f=>(
                      <div key={f.id} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
                        <button onClick={()=>updateSel({finish:f.id})} title={f.label} style={{
                          width:"100%", aspectRatio:"1", borderRadius:8, cursor:"pointer",
                          border:selUnit.finish===f.id?`2.5px solid ${C.orange}`:`1.5px solid ${C.border}`,
                          boxShadow:selUnit.finish===f.id?`0 0 0 2px ${C.orange}44`:"none",
                          transform:selUnit.finish===f.id?"scale(1.12)":"scale(1)",
                          transition:"all 0.12s", background:finishBg(f.id),
                        }}/>
                        <span style={{ fontSize:8, color:"#555", textAlign:"center", width:"100%", lineHeight:1.2 }}>{f.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Handle / Pull */}
              <div style={{ marginBottom:8, paddingTop:6, borderTop:`1px solid ${C.border}22` }}>
                <div style={{ fontSize:8, letterSpacing:2, color:"#666", textTransform:"uppercase", marginBottom:7 }}>Handle / Pull</div>
                {HARDWARE.map(hw=>(
                  <button key={hw.id} onClick={()=>updateSel({hardware:hw.id})} style={{
                    width:"100%", marginBottom:5, padding:"12px 14px", borderRadius:7, cursor:"pointer",
                    border:selUnit.hardware===hw.id?`1.5px solid ${C.orange}`:`1px solid ${C.border}`,
                    background:selUnit.hardware===hw.id?C.orange+"18":"rgba(255,255,255,0.02)",
                    color:selUnit.hardware===hw.id?C.white:"#888",
                    textAlign:"left", display:"flex", alignItems:"center", gap:12, fontSize:13, fontFamily:"inherit",
                  }}>
                    {hw.color
                      ? <div style={{width:30,height:8,borderRadius:4,background:hw.color,flexShrink:0}}/>
                      : <div style={{width:30,textAlign:"center",color:"#555",fontSize:16,flexShrink:0}}>—</div>}
                    {hw.label}
                  </button>
                ))}
              </div>

            </>)}

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
              Preview <span style={{fontSize:14}}>›</span>
            </button>
            {!showFinishes && (
              <div style={{ fontSize:9, color:"#444", textAlign:"center", letterSpacing:1 }}>
                Tap a cabinet on the wall to edit individually
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
          width:"100%", height:50, borderRadius:8, cursor:"pointer",
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

  const ready = materials.carcass; // countertop can be TBD — only carcass is required
  const isPremiumTop = ["marble","quartz"].includes(materials.ctType);
  const isPremiumAll = materials.carcass==="solid" && isPremiumTop;
  const isMid        = materials.carcass==="solid" || isPremiumTop;

  return (
    <aside style={{ width:"100%", background:C.panel, display:"flex", flexDirection:"column", height:"100%", overflow:"hidden" }}>
      <div style={{ padding:"10px 14px", fontSize:8, letterSpacing:3, color:C.orange, textTransform:"uppercase", borderBottom:`1px solid ${C.border}`, background:C.black, flexShrink:0 }}>
        ② Materials · <span style={{ color:"#555" }}>preview live on wall</span>
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:"12px 14px" }}>

        {/* ── Countertop type ── */}
        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:9, letterSpacing:2, color:"#888", textTransform:"uppercase", marginBottom:8 }}>Countertop Type</div>
          <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
            {COUNTERTOP_TYPES.map(t => {
              const sel = materials.ctType === t.id;
              return (
                <button key={t.id} onClick={() => selectType(t.id)} style={{
                  padding:"13px 14px", borderRadius:8, cursor:"pointer", textAlign:"left",
                  border: sel ? `2px solid ${C.orange}` : `1px solid ${C.border}`,
                  background: sel ? C.orange+"20" : "rgba(255,255,255,0.02)",
                  fontFamily:"inherit", transition:"all 0.12s",
                }}>
                  <div style={{ fontSize:13, color: sel ? C.white : "#AAA", fontWeight: sel ? "bold" : "normal" }}>{t.label}</div>
                  <div style={{ fontSize:10, color: sel ? C.gold : "#666", marginTop:3 }}>{t.subtitle}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Countertop colour — filtered by type ── */}
        <div style={{ marginBottom:14 }}>
          <div style={{ fontSize:8, letterSpacing:2, color:"#888", textTransform:"uppercase", marginBottom:8 }}>
            Countertop Colour
            {!materials.ctType && <span style={{ color:"#555", marginLeft:6 }}>— optional, can skip</span>}
          </div>
          {materials.ctType === "quartz" ? (
            // Quartz: grouped sub-sections
            <>
              {[
                { key:"whites",   label:"Whites & Creams",     ids:["ct-q-iceberg","ct-q-magnolia","ct-q-macadamia","ct-q-sparkle","ct-q-stratus","ct-q-bianco-cloud","ct-q-aurelia","ct-q-noble-white"] },
                { key:"stones",   label:"Stones & Neutrals",   ids:["ct-q-beach","ct-q-dazzle","ct-q-misty-pearl","ct-q-dusty-stone","ct-q-cremalat","ct-q-bianco-sup"] },
                { key:"greys",    label:"Greys & Darks",       ids:["ct-q-platinum","ct-q-grey-river","ct-q-slate","ct-q-charcoal-grey","ct-q-fawn","ct-q-grigio-cem","ct-q-wrought-iron","ct-q-pietra-tempesta","ct-q-thunder","ct-q-galaxy","ct-q-nero"] },
                { key:"veined",   label:"Veined & Statement",  ids:["ct-q-calacatta-fine","ct-q-bianco-venato","ct-q-calacatta-gold","ct-q-blanco-steel","ct-q-blanco-bronze","ct-q-blanco-pewter","ct-q-whisper","ct-q-bianco-stat","ct-q-bianco-calac","ct-q-nero-venato","ct-q-calacatta-zara","ct-q-bianco-carb"] },
              ].map(group => {
                const groupColours = group.ids.map(id => COUNTERTOP_COLOURS.find(c => c.id === id)).filter(Boolean);
                return (
                  <div key={group.key} style={{ marginBottom:12 }}>
                    <div style={{ fontSize:7, letterSpacing:1.5, color:"#555", textTransform:"uppercase", marginBottom:7, paddingBottom:4, borderBottom:`1px solid ${C.border}33` }}>
                      {group.label}
                    </div>
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8 }}>
                      {groupColours.map(ct => <CtSwatch key={ct.id} ct={ct}/>)}
                    </div>
                  </div>
                );
              })}
            </>
          ) : materials.ctType ? (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
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
                  padding:"13px 14px", borderRadius:8, cursor:"pointer", textAlign:"left",
                  border: sel ? `2px solid ${C.orange}` : `1px solid ${C.border}`,
                  background: sel ? C.orange+"20" : "rgba(255,255,255,0.02)",
                  fontFamily:"inherit", transition:"all 0.12s",
                }}>
                  <div style={{ fontSize:13, color: sel ? C.white : "#AAA", fontWeight: sel ? "bold" : "normal" }}>{t.label}</div>
                  <div style={{ fontSize:10, color: sel ? C.gold : "#666", marginTop:3 }}>{t.subtitle}</div>
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
            Select a carcass build to continue
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
    ["preview",  "04", "Preview"],
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
  const [globalHinge,  setGlobalHinge]  = useState(DEFAULT_HINGE);
  const [globalRunner, setGlobalRunner] = useState(DEFAULT_RUNNER);
  const [selected, setSelected] = useState(null);
  const [drag,     setDrag]     = useState(null);
  const [zoom,     setZoom]     = useState(1);
  const [roomW,    setRoomW]    = useState(4200);
  const [materials, setMaterials] = useState({ ctType: null, ctColour: null, carcass: null });
  const [showQuote,  setShowQuote]  = useState(false);

  // Live job total — recalculates whenever units or materials change
  const jobTotal = (units.length > 0 && materials.carcass)
    ? calcJobTotal(units, materials)
    : null;
  const [quoteSent,  setQuoteSent]  = useState(false);
  const [priceRevealed, setPriceRevealed] = useState(false);
  const [quoteSending, setQuoteSending] = useState(false);
  const [quoteError,   setQuoteError]   = useState("");
  const [cName,   setCName]   = useState("");
  const [cEmail,  setCEmail]  = useState("");
  const [cPhone,  setCPhone]  = useState("");

  const canvasRef     = useRef(null);
  const idRef         = useRef(1);
  const sheetScrollRef = useRef(null);

  // Reset sheet scroll whenever phase or selected unit changes
  useEffect(() => {
    setTimeout(() => { if (sheetScrollRef.current) sheetScrollRef.current.scrollTop = 0; }, 30);
  }, [phase, selected]);
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
    // Inherit global hinge/runner so newly added units match the user's chosen fittings
    const inheritHinge  = globalHinge;
    const inheritRunner = globalRunner;
    const inheritFinish = units.length > 0 ? units[units.length-1].finish : DEFAULT_FINISH;
    const inheritHW     = units.length > 0 ? units[units.length-1].hardware : DEFAULT_HW;
    const nu   = { id:idRef.current++, type:c.type, width:c.width, height:c.height, xMm:xPos, finish:inheritFinish, hardware:inheritHW, hinge:inheritHinge, runner:inheritRunner, rotation:0 };
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
    // Inherit global hinge/runner so newly added units match the user's chosen fittings
    const inheritHinge  = globalHinge;
    const inheritRunner = globalRunner;
    const inheritFinish = units.length > 0 ? units[units.length-1].finish : DEFAULT_FINISH;
    const inheritHW     = units.length > 0 ? units[units.length-1].hardware : DEFAULT_HW;
    const nu = { id:idRef.current++, type:c.type, width:c.width, height:c.height, xMm:xPos, finish:inheritFinish, hardware:inheritHW, hinge:inheritHinge, runner:inheritRunner, rotation:0 };
    setUnits(p => packUnits([...p, nu]));
    setSelected(nu.id);
  }

  // Layout → Materials
  function goToMaterials() {
    setPhase("materials");
    setSelected(null);
    setPanelOpen(true);
    setTimeout(() => { if (sheetScrollRef.current) sheetScrollRef.current.scrollTop = 0; }, 50);
  }
  function goToFinish() {
    setPhase("finish");
    if (units.length > 0) setSelected(units[0].id);
    setPanelOpen(true);
    setTimeout(() => { if (sheetScrollRef.current) sheetScrollRef.current.scrollTop = 0; }, 50);
  }
  function goToPreview() {
    setPhase("preview");
    setPanelOpen(false);  // just show the canvas — no sheet
  }

  const totalFloor = units.reduce((s,u) =>
    ["base","drawer","tall-single","tall-double","tall-double-v","corner"].includes(u.type) ? s+u.width : s, 0);
  const totalTall  = units.reduce((s,u) =>
    ["tall-single","tall-double","tall-double-v"].includes(u.type) ? s+u.width : s, 0);
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

    // ── Rate limit: max 3 submissions per email address per 24 hours ──
    const LIMIT = 3;
    const WINDOW_MS = 24 * 60 * 60 * 1000;
    const storageKey = `hwh_quotes_${cEmail.trim().toLowerCase()}`;
    try {
      const raw = localStorage.getItem(storageKey);
      const timestamps = raw ? JSON.parse(raw) : [];
      const now = Date.now();
      const recent = timestamps.filter(t => now - t < WINDOW_MS);
      if (recent.length >= LIMIT) {
        setQuoteError(`This email has already submitted ${LIMIT} quotes in the last 24 hours. Please contact kim@hwhdesigns.co.za directly.`);
        return;
      }
      // Record this submission
      localStorage.setItem(storageKey, JSON.stringify([...recent, now]));
    } catch(e) {
      // localStorage unavailable — allow submission
    }

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
          wall_run:      totalWall > 0 ? `${totalWall}mm (${(totalWall/1000).toFixed(2)}m)` : "None",
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
      `*${bom.length} unit${bom.length!==1?"s":""}*`,
      `*Floor run: ${(totalFloor/1000).toFixed(2)}m*${totalWall > 0 ? ` | *Wall run: ${(totalWall/1000).toFixed(2)}m*` : ""}`,
      "",
      "Full spec emailed to kim@hwhdesigns.co.za"
    ].join("\n");
    window.open("https://wa.me/27828805565?text=" + encodeURIComponent(waLines), "_blank");

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
          <div style={{ display:"flex", alignItems:"center", gap:3 }}>
            {[["layout","1"],["materials","2"],["finish","3"],["preview","4"]].map(([p,n],i,arr) => {
              const order = arr.map(a=>a[0]);
              const cur   = order.indexOf(phase);
              const done  = order.indexOf(p) < cur;
              const active= phase===p;
              return (
                <div key={p} style={{ display:"flex", alignItems:"center" }}>
                  <button onClick={()=>setPhase(p)} style={{
                    width:22, height:22, borderRadius:"50%", border:"none", cursor:"pointer",
                    background: active ? C.orange : done ? C.gold : C.border,
                    color: active ? C.white : done ? C.black : "#555",
                    fontSize:8, fontWeight:"bold", display:"flex", alignItems:"center", justifyContent:"center",
                  }}>{done?"✓":n}</button>
                  {i<arr.length-1 && <div style={{width:7,height:1,background:C.border}}/>}
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

          {/* Zoom — hidden on phone to save header space */}
          {!isPhone && (
            <div style={{ display:"flex", alignItems:"center", gap:2, background:C.panel, borderRadius:5, padding:"3px 6px", border:`1px solid ${C.border}` }}>
              <button onClick={()=>clampZoom(zoom-0.25)} style={ZB}>−</button>
              <span style={{ fontSize:10, color:"#888", minWidth:28, textAlign:"center" }}>{Math.round(zoom*100)}%</span>
              <button onClick={()=>clampZoom(zoom+0.25)} style={ZB}>+</button>
              <button onClick={()=>clampZoom(1)} style={{ ...ZB, fontSize:8, color:"#555", borderLeft:`1px solid ${C.border}`, paddingLeft:5, marginLeft:2 }}>FIT</button>
            </div>
          )}

          {/* Quote */}
          <button onClick={()=>setShowQuote(true)} style={{ background:C.orange, color:C.white, border:"none", borderRadius:5, padding:isPhone?"7px 12px":"8px 16px", cursor:"pointer", fontSize:isPhone?11:11, fontWeight:"bold", letterSpacing:1, textTransform:"uppercase", fontFamily:"inherit", whiteSpace:"nowrap", display:"flex", alignItems:"center", gap:6, flexShrink:0 }}>
            {isPhone ? "Quote" : "Get Quote"}
            {jobTotal !== null && (
              priceRevealed
                ? <span style={{ background:"rgba(0,0,0,0.25)", borderRadius:3, padding:"2px 6px", fontSize:isPhone?9:10, fontWeight:"bold", letterSpacing:0 }}>R {jobTotal.toLocaleString("en-ZA")}</span>
                : <span style={{ background:"rgba(0,0,0,0.25)", borderRadius:3, padding:"2px 6px", fontSize:isPhone?9:10, fontWeight:"bold", letterSpacing:0, color:C.gold, cursor:"pointer", textDecoration:"underline dotted" }} onClick={e=>{e.stopPropagation();setShowQuote(true);}}>R {jobTotal.toLocaleString("en-ZA")} 🔒</span>
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
                  totalWall={totalWall}
                  onNext={goToMaterials}
                  globalHinge={globalHinge} setGlobalHinge={setGlobalHinge}
                  globalRunner={globalRunner} setGlobalRunner={setGlobalRunner}
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
                  totalWall={totalWall}
                  onNext={goToPreview}
                  globalHinge={globalHinge} setGlobalHinge={setGlobalHinge}
                  globalRunner={globalRunner} setGlobalRunner={setGlobalRunner}
                />
              )}
              {phase === "preview" && (
                <aside style={{ width:"100%", background:C.panel, display:"flex", flexDirection:"column", height:"100%", overflow:"hidden" }}>
                  <div style={{ padding:"10px 14px", fontSize:8, letterSpacing:3, color:C.orange, textTransform:"uppercase", borderBottom:`1px solid ${C.border}`, background:C.black, flexShrink:0 }}>
                    ④ Preview · <span style={{ color:"#555" }}>final check</span>
                  </div>
                  <div style={{ flex:1, overflowY:"auto", padding:"14px 14px" }}>
                    <div style={{ fontSize:8, color:"#666", letterSpacing:1, textTransform:"uppercase", marginBottom:10 }}>Layout Summary</div>
                    <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:16 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", fontSize:10 }}><span style={{color:"#888"}}>Units</span><span style={{color:C.white}}>{units.length}</span></div>
                      <div style={{ display:"flex", justifyContent:"space-between", fontSize:10 }}><span style={{color:"#888"}}>Floor run</span><span style={{color:C.gold}}>{(totalFloor/1000).toFixed(2)}m</span></div>
                      {totalWall > 0 && <div style={{ display:"flex", justifyContent:"space-between", fontSize:10 }}><span style={{color:"#888"}}>Wall run</span><span style={{color:C.gold}}>{(totalWall/1000).toFixed(2)}m</span></div>}
                      <div style={{ display:"flex", justifyContent:"space-between", fontSize:10 }}><span style={{color:"#888"}}>Countertop</span><span style={{color:C.white,textAlign:"right",maxWidth:120}}>{COUNTERTOP_TYPES.find(t=>t.id===materials.ctType)?.label||"—"}</span></div>
                      <div style={{ display:"flex", justifyContent:"space-between", fontSize:10 }}><span style={{color:"#888"}}>Carcass</span><span style={{color:C.white}}>{materials.carcass==="solid"?"Solid Wood":"Melamine"}</span></div>
                    </div>
                    <div style={{ height:1, background:C.border, margin:"0 0 14px" }}/>
                    <div style={{ fontSize:8, color:"#666", letterSpacing:1, textTransform:"uppercase", marginBottom:8 }}>Unit Finishes</div>
                    {units.map((u,i) => {
                      const ct = CARCASS_TYPES.find(c=>c.type===u.type&&c.width===u.width);
                      return (
                        <div key={u.id} style={{ display:"flex", alignItems:"center", gap:7, marginBottom:6 }}>
                          <div style={{ width:14, height:14, borderRadius:3, background:finishBg(u.finish), border:`1px solid ${C.border}`, flexShrink:0 }}/>
                          <div style={{ fontSize:9, color:"#AAA", flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{ct?.label||u.type} {u.width}mm</div>
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ padding:"10px", borderTop:`1px solid ${C.border}`, background:C.black, flexShrink:0, display:"flex", flexDirection:"column", gap:6 }}>
                    <button onClick={()=>setShowQuote(true)} style={{ background:C.orange, color:C.white, border:"none", borderRadius:6, width:"100%", padding:"12px 10px", cursor:"pointer", fontSize:11, fontWeight:"bold", letterSpacing:1.5, textTransform:"uppercase", fontFamily:"inherit", boxShadow:`0 3px 12px ${C.orange}55` }}>
                      Get Quote ›
                    </button>
                    <button onClick={()=>{ setPhase("finish"); setPanelOpen(true); }} style={{ background:"transparent", color:"#555", border:`1px solid ${C.border}44`, borderRadius:5, width:"100%", padding:"7px 8px", cursor:"pointer", fontSize:9, letterSpacing:1, textTransform:"uppercase", fontFamily:"inherit" }}>← Back to Finishes</button>
                  </div>
                </aside>
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
                : phase==="finish"
                ? "Select a cabinet in the panel — finish changes preview live on the wall"
                : "Your completed layout — tap Get Quote when ready"}
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
                    <div style={{ fontSize:isPhone?9:11, color:"rgba(255,255,255,0.12)", letterSpacing:2, textTransform:"uppercase", marginTop:4, textAlign:"center" }}>
                      {isMobile ? "Tap + below to add cabinets" : "Drag cabinets from the left panel"}
                    </div>
                    <div style={{ fontSize:isPhone?8:10, color:"rgba(255,255,255,0.06)", letterSpacing:1, textTransform:"uppercase", textAlign:"center" }}>
                      Room width: {(roomW/1000).toFixed(1)}m — adjust above if needed
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
                    {selected===unit.id && (
                      <>
                        {/* Delete button — top left, always visible when selected */}
                        <button
                          onPointerDown={e=>e.stopPropagation()}
                          onClick={e=>{ e.stopPropagation(); setUnits(p=>p.filter(u=>u.id!==unit.id)); setSelected(null); }}
                          title="Remove unit"
                          style={{ position:"absolute", top:4, left:4, background:"rgba(180,40,40,0.85)", color:C.white, border:"none", borderRadius:4, width:22, height:22, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:"bold", boxShadow:"0 2px 6px rgba(0,0,0,0.5)", zIndex:30 }}
                        >✕</button>
                        {/* Corner rotate button */}
                        {unit.type==="corner" && (
                          <button
                            onPointerDown={e=>e.stopPropagation()}
                            onClick={e=>{ e.stopPropagation(); setUnits(p=>p.map(u=>u.id===unit.id?{...u,rotation:((u.rotation||0)+1)%4}:u)); }}
                            title="Rotate corner 90°"
                            style={{ position:"absolute", top:4, right:4, background:C.orange, color:C.white, border:"none", borderRadius:4, padding:"3px 7px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:"bold", boxShadow:"0 2px 6px rgba(0,0,0,0.5)", zIndex:30, gap:3 }}
                          >↻ Rotate</button>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ width:"100%", height:2, background:`linear-gradient(90deg,${C.gold},${C.orange})`, borderRadius:"0 0 2px 2px", flexShrink:0 }}/>
            {/* Spacer so canvas content isn't hidden behind fixed button on mobile */}
            {isMobile && <div style={{ height:80, flexShrink:0 }}/>}

            {/* Mobile: bottom nav bar */}
            {isMobile && (
              <div style={{
                position:"fixed", bottom:0, left:0, right:0, zIndex:90,
                background:"rgba(26,20,8,0.97)", borderTop:`2px solid ${C.orange}33`,
                padding:"10px 12px 26px",
                display:"flex", alignItems:"center", gap:8,
                boxShadow:"0 -4px 20px rgba(0,0,0,0.5)",
              }}>
                {/* Back button */}
                {phase !== "layout" && (
                  <button onClick={()=>{
                    if (phase==="materials") setPhase("layout");
                    else if (phase==="finish") { setPhase("materials"); setPanelOpen(true); }
                    else if (phase==="preview") { setPhase("finish"); setPanelOpen(true); }
                  }} style={{
                    background:"transparent", color:"#888", border:`1px solid ${C.border}`,
                    borderRadius:8, padding:"11px 14px", cursor:"pointer", fontSize:11,
                    fontFamily:"inherit", whiteSpace:"nowrap", flexShrink:0,
                  }}>
                    ‹ {phase==="materials" ? "Cabinets" : phase==="finish" ? "Materials" : "Finishes"}
                  </button>
                )}

                {/* Centre: open panel — hidden on preview step */}
                {phase !== "preview" && (
                  <button onClick={()=>setPanelOpen(true)} style={{
                    flex:1, background:C.panel, color:C.white, border:`1px solid ${C.border}`,
                    borderRadius:8, padding:"11px 14px", cursor:"pointer", fontSize:11,
                    fontWeight:"bold", letterSpacing:1, textTransform:"uppercase",
                    fontFamily:"inherit",
                  }}>
                    {phase==="layout" ? "＋ Cabinets"
                     : phase==="materials" ? "⚙ Materials"
                     : "🎨 Finishes"}
                  </button>
                )}
                {/* Preview step: show a simple label — canvas is visible behind */}
                {phase === "preview" && (
                  <div style={{ flex:1, padding:"9px 12px", background:"rgba(255,255,255,0.03)", borderRadius:8, border:`1px solid ${C.border}`, fontSize:11, color:"#666", textAlign:"center", letterSpacing:1 }}>
                    {units.length} unit{units.length!==1?"s":""} · {(totalFloor/1000).toFixed(2)}m floor{totalWall>0?` · ${(totalWall/1000).toFixed(2)}m wall`:""}
                  </div>
                )}

                {/* Forward button */}
                {phase === "preview" ? (
                  <button onClick={()=>setShowQuote(true)} style={{
                    background:C.orange, color:C.white, border:"none",
                    borderRadius:8, padding:"11px 16px", cursor:"pointer", fontSize:11,
                    fontWeight:"bold", letterSpacing:1, textTransform:"uppercase",
                    fontFamily:"inherit", whiteSpace:"nowrap", flexShrink:0,
                  }}>
                    Get Quote ›
                  </button>
                ) : (
                  <button
                    onClick={()=>{
                      if (phase==="layout") goToMaterials();
                      else if (phase==="materials") goToFinish();
                      else goToPreview();
                    }}
                    disabled={phase==="layout" && units.length===0}
                    style={{
                      background: (phase==="layout" && units.length===0) ? C.border : C.orange,
                      color: (phase==="layout" && units.length===0) ? "#555" : C.white,
                      border:"none", borderRadius:8, padding:"11px 16px", cursor:"pointer",
                      fontSize:11, fontWeight:"bold", letterSpacing:1, textTransform:"uppercase",
                      fontFamily:"inherit", whiteSpace:"nowrap", flexShrink:0,
                    }}>
                    {phase==="layout" ? "Materials ›" : phase==="materials" ? "Finishes ›" : "Preview ›"}
                  </button>
                )}
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
              zIndex:101, maxHeight:"88vh", display:"flex", flexDirection:"column",
              boxShadow:"0 -8px 40px rgba(0,0,0,0.7)",
            }}>
              {/* Sheet handle + header */}
              <div style={{ padding:"12px 16px 8px", borderBottom:`1px solid ${C.border}`, flexShrink:0 }}>
                {/* Drag handle */}
                <div style={{ width:40, height:4, borderRadius:2, background:C.border, margin:"0 auto 10px" }}/>

                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ fontSize:11, letterSpacing:2, color:C.orange, textTransform:"uppercase" }}>
                    {phase==="layout" ? "① Add Cabinets" : phase==="materials" ? "② Materials" : phase==="finish" ? "③ Finishes" : "④ Preview"}
                  </div>
                  <button onClick={()=>setPanelOpen(false)} style={{ marginLeft:"auto", background:"none", border:"none", color:"#666", fontSize:20, cursor:"pointer" }}>✕</button>
                </div>


              </div>

              {/* Sheet content — reuses existing panels */}
              <div ref={sheetScrollRef} style={{ flex:1, overflowY:"auto" }}>
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
                  totalWall={totalWall}
                      onNext={phase==="layout"
                        ? ()=>{ setPanelOpen(false); goToMaterials(); }
                        : ()=>{ setPanelOpen(false); goToPreview(); }
                      }
                      globalHinge={globalHinge} setGlobalHinge={setGlobalHinge}
                      globalRunner={globalRunner} setGlobalRunner={setGlobalRunner}
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
              {/* Job total — shown at top to incentivise form completion */}
              {jobTotal !== null && (
                priceRevealed ? (
                  <div style={{ margin:"0 0 16px", padding:"16px", background:`linear-gradient(135deg,${C.orange}22,${C.gold}11)`, border:`1.5px solid ${C.orange}`, borderRadius:8 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <div>
                        <div style={{ fontSize:9, letterSpacing:2, color:C.orange, textTransform:"uppercase" }}>Estimated Total</div>
                        <div style={{ fontSize:8, color:"#555", marginTop:2 }}>* Final pricing confirmed on job measurement & client sign-off</div>
                      </div>
                      <div style={{ fontSize:22, fontWeight:"bold", color:C.gold }}>R {jobTotal.toLocaleString("en-ZA")}</div>
                    </div>
                  </div>
                ) : (
                  <div style={{ margin:"0 0 16px", padding:"14px 16px", background:"rgba(217,99,57,0.08)", border:`1.5px dashed ${C.orange}66`, borderRadius:8 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                      <div style={{ fontSize:26, flexShrink:0 }}>🔒</div>
                      <div>
                        <div style={{ fontSize:11, color:C.white, fontWeight:"bold", lineHeight:1.4 }}>
                          Submit your details to reveal your estimated price
                        </div>
                        <div style={{ fontSize:9, color:"#666", marginTop:4 }}>Fill in your name, email and phone below, then tap Submit.</div>
                      </div>
                    </div>
                  </div>
                )
              )}

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

              <div style={{ background:"rgba(0,0,0,0.4)", borderRadius:8, padding:14, marginBottom:16, border:`1px solid ${C.border}` }}>
                <div style={{ fontSize:10, letterSpacing:2, color:C.orange, textTransform:"uppercase", marginBottom:10 }}>
                  Specification — {bom.length} unit{bom.length!==1?"s":""}
                </div>
                {bom.length===0
                  ? <div style={{ color:"#444", fontSize:12 }}>No cabinets placed.</div>
                  : bom.map((item,i)=>(
                    <div key={i} style={{ padding:"7px 0", borderBottom:`1px solid ${C.border}33` }}>
                      <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:"#C0B89A" }}>
                        <span>{item.label} · <span style={{color:C.gold}}>{item.width}mm</span>{item.rot?` · ${item.rot}`:""}</span>
                        <span style={{ color:"#888" }}>{item.finish}</span>
                      </div>
                      <div style={{ display:"flex", gap:12, marginTop:3 }}>
                        {item.hasDoors && (
                          <span style={{ fontSize:10, color:"#666" }}>
                            ⬡ {item.hinges} hinge{item.hinges!==1?"s":""} · {item.hingeLabel}
                          </span>
                        )}
                        {item.hasDrawers && (
                          <span style={{ fontSize:10, color:"#666" }}>
                            ⇒ {item.drawers} runner pair{item.drawers!==1?"s":""} · {item.runnerLabel}
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                }
                <div style={{ marginTop:10, fontSize:12, color:"#888", display:"flex", justifyContent:"space-between" }}>
                  <span>Total floor run</span>
                  <span style={{ color:C.gold, fontWeight:"bold" }}>{totalFloor}mm ({(totalFloor/1000).toFixed(2)}m)</span>
                </div>
                {totalFloor > 0 && (
                  <div style={{ marginTop:4, fontSize:11, color:"#666", display:"flex", justifyContent:"space-between" }}>
                    <span>Kick plate on all floor units</span>
                    <span style={{ color:"#666" }}>{(totalFloor/1000).toFixed(2)}m run</span>
                  </div>
                )}
                {totalTall > 0 && (
                  <div style={{ marginTop:4, fontSize:11, color:"#666", display:"flex", justifyContent:"space-between" }}>
                    <span>Top filler strip on tall / pantry units</span>
                    <span style={{ color:"#666" }}>{(totalTall/1000).toFixed(2)}m run</span>
                  </div>
                )}
                {totalWall > 0 && (
                  <div style={{ marginTop:4, fontSize:12, color:"#888", display:"flex", justifyContent:"space-between" }}>
                    <span>Total wall cabinet run</span>
                    <span style={{ color:C.gold, fontWeight:"bold" }}>{totalWall}mm ({(totalWall/1000).toFixed(2)}m)</span>
                  </div>
                )}

                {/* Fittings totals */}
                {(totalHinges > 0 || totalRunners > 0) && (
                  <div style={{ marginTop:12, paddingTop:10, borderTop:`1px solid ${C.border}` }}>
                    <div style={{ fontSize:10, letterSpacing:2, color:C.orange, textTransform:"uppercase", marginBottom:8 }}>Fittings Summary</div>
                    {totalHingesStd > 0 && (
                      <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:"#999", padding:"3px 0" }}>
                        <span>Standard Hinges</span><span style={{color:C.gold}}>× {totalHingesStd}</span>
                      </div>
                    )}
                    {totalHingesSoft > 0 && (
                      <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:"#999", padding:"3px 0" }}>
                        <span>Soft-Close Hinges</span><span style={{color:C.gold}}>× {totalHingesSoft}</span>
                      </div>
                    )}
                    {totalHinges > 0 && (
                      <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, color:"#C0B89A", padding:"4px 0", borderTop:`1px solid ${C.border}33`, marginTop:3 }}>
                        <span style={{fontWeight:"bold"}}>Total Hinges</span><span style={{color:C.gold,fontWeight:"bold"}}>× {totalHinges}</span>
                      </div>
                    )}
                    {totalRunnersStd > 0 && (
                      <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:"#999", padding:"3px 0", marginTop:6 }}>
                        <span>Standard Runner Pairs</span><span style={{color:C.gold}}>× {totalRunnersStd}</span>
                      </div>
                    )}
                    {totalRunnersSoft > 0 && (
                      <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:"#999", padding:"3px 0" }}>
                        <span>Soft-Close Runner Pairs</span><span style={{color:C.gold}}>× {totalRunnersSoft}</span>
                      </div>
                    )}
                    {totalRunners > 0 && (
                      <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, color:"#C0B89A", padding:"4px 0", borderTop:`1px solid ${C.border}33`, marginTop:3 }}>
                        <span style={{fontWeight:"bold"}}>Total Runner Pairs</span><span style={{color:C.gold,fontWeight:"bold"}}>× {totalRunners}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Materials summary */}
                {(matCtType || matCtColour || matCarcass) && (
                  <div style={{ marginTop:14, paddingTop:12, borderTop:`1px solid ${C.border}` }}>
                    <div style={{ fontSize:10, letterSpacing:2, color:C.orange, textTransform:"uppercase", marginBottom:10 }}>Materials</div>
                    {matCarcass && (
                      <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:"#C0B89A", padding:"4px 0" }}>
                        <span style={{color:"#888"}}>Carcass build</span>
                        <span style={{color:C.gold}}>{matCarcass.label}</span>
                      </div>
                    )}
                    {matCtType && (
                      <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:"#C0B89A", padding:"4px 0" }}>
                        <span style={{color:"#888"}}>Countertop type</span>
                        <span style={{color:C.gold}}>{matCtType.label}</span>
                      </div>
                    )}
                    {matCtColour && (
                      <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:"#C0B89A", padding:"4px 0" }}>
                        <span style={{color:"#888"}}>Countertop colour</span>
                        <span style={{color:C.gold}}>{matCtColour.label}</span>
                      </div>
                    )}
                    {(() => {
                      const ctRunM = units.filter(u=>["base","drawer","corner"].includes(u.type)).reduce((s,u)=>s+u.width,0)/1000;
                      const sqm = (ctRunM * 0.6).toFixed(2);
                      return ctRunM > 0 ? (
                        <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:"#C0B89A", padding:"4px 0" }}>
                          <span style={{color:"#888"}}>Countertop area</span>
                          <span style={{color:C.gold}}>{ctRunM.toFixed(2)}m × 0.60m = <strong>{sqm}m²</strong></span>
                        </div>
                      ) : null;
                    })()}
                    {matCarcass && matCtType && (
                      <div style={{ marginTop:8, padding:"8px 10px", background: materials.carcass==="solid"&&materials.ctType==="marble" ? C.orange+"22" : materials.carcass==="solid"||materials.ctType==="marble" ? C.gold+"15" : "rgba(255,255,255,0.03)", borderRadius:5, fontSize:11, color: materials.carcass==="solid"&&materials.ctType==="marble" ? C.orange : materials.carcass==="solid"||materials.ctType==="marble" ? C.gold : "#555" }}>
                        {(materials.carcass==="solid" && ["marble","quartz"].includes(materials.ctType)) ? "★ Premium tier" : (materials.carcass==="solid" || ["marble","quartz"].includes(materials.ctType)) ? "◆ Mid-range tier" : "● Standard tier"}
                      </div>
                    )}
                  </div>
                )}
              </div>



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
                Sends spec to <span style={{color:C.orange}}>kim@hwhdesigns.co.za</span> · Opens WhatsApp to +27 82 880 5565
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
