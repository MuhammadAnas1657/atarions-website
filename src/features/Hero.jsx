import { lazy, Suspense, useId } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import NetworkCanvas from "../components/NetworkCanvas";
import useReducedMotion from "../hooks/useReducedMotion";

const HeroScene = lazy(() => import("../components/three/HeroScene"));

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.16, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

// Soft rounded-corner outlines so the shapes read as glass shards rather
// than sharp polygons.
const PATHS = {
  prism:
    "M50,5 C55,5 58,8 60,13 L92,63 C95,68 93,75 87,78 C85,79 83,80 81,80 L19,80 C13,80 8,75 8,69 C8,66 9,63 11,61 L40,13 C42,8 45,5 50,5 Z",
  orb:
    "M50,8 C54,8 57,10 59,14 L88,45 C93,48 93,52 88,55 L59,86 C57,90 54,92 50,92 C46,92 43,90 41,86 L12,55 C7,52 7,48 12,45 L41,14 C43,10 46,8 50,8 Z",
};

// Frosted-glass "crystal" shard: layered SVG gradient + glossy sheen +
// ambient glow, independently spinning inside its own floating orbit.
function GlassShape({ variant, palette, glow }) {
  const uid = useId();
  const path = PATHS[variant];

  return (
    <div className="relative w-full h-full">
      <div
        className="absolute -inset-4 blur-2xl opacity-60"
        style={{ background: `radial-gradient(circle, ${glow}, transparent 70%)` }}
      />
      {/* Bounding-box blur so whatever sits behind the shard (network lines,
          other shards) genuinely diffracts through the glass. */}
      <div className="absolute inset-0 backdrop-blur-[2px]" />
      <svg
        viewBox="0 0 100 100"
        className="relative w-full h-full"
        style={{ filter: "drop-shadow(0 10px 22px rgba(0,0,0,0.5))" }}
      >
        <defs>
          {/* Body is mostly transparent — color only lives at the edges,
              like light catching the rim of real glass. */}
          <linearGradient id={`grad-${uid}`} x1="10%" y1="0%" x2="90%" y2="100%">
            <stop offset="0%" stopColor={palette[0]} stopOpacity="0.28" />
            <stop offset="45%" stopColor={palette[1]} stopOpacity="0.06" />
            <stop offset="100%" stopColor={palette[2]} stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id={`rim-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={palette[0]} stopOpacity="0.9" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.5" />
            <stop offset="100%" stopColor={palette[2]} stopOpacity="0.9" />
          </linearGradient>
          <radialGradient id={`sheen-${uid}`} cx="28%" cy="20%" r="38%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`bounce-${uid}`} cx="72%" cy="80%" r="34%">
            <stop offset="0%" stopColor={palette[2]} stopOpacity="0.35" />
            <stop offset="100%" stopColor={palette[2]} stopOpacity="0" />
          </radialGradient>
        </defs>
        <path d={path} fill="rgba(255,255,255,0.045)" />
        <path d={path} fill={`url(#grad-${uid})`} />
        <path d={path} fill={`url(#bounce-${uid})`} />
        <path d={path} fill={`url(#sheen-${uid})`} />
        <path d={path} fill="none" stroke={`url(#rim-${uid})`} strokeWidth="1.4" strokeOpacity="0.8" />
      </svg>
    </div>
  );
}

// Kept clear of the left-aligned copy block: parked along the top/bottom
// edges and the right half of the section.
const SHAPES = [
  { variant: "prism", palette: ["#7dd3fc", "#4c1d95", "#d946ef"], pos: "top-[6%] left-[4%] w-16 h-16", glow: "#6c4ff0", dur: 11, xr: 16, yr: 22, spin: 26 },
  { variant: "orb", palette: ["#00e5c7", "#3d2c8d", "#6c4ff0"], pos: "bottom-[8%] left-[8%] w-12 h-12", glow: "#00e5c7", dur: 14, xr: 12, yr: 18, spin: 22 },
  { variant: "prism", palette: ["#a5f3fc", "#6c4ff0", "#f472b6"], pos: "top-[16%] right-[10%] w-24 h-24", glow: "#3d2c8d", dur: 16, xr: 20, yr: 18, spin: 32 },
  { variant: "orb", palette: ["#67e8f9", "#4c1d95", "#e879f9"], pos: "bottom-[16%] right-[16%] w-16 h-16", glow: "#00e5c7", dur: 12, xr: 16, yr: 22, spin: 20 },
  { variant: "orb", palette: ["#00e5c7", "#6c4ff0", "#a78bfa"], pos: "top-[46%] right-[4%] w-11 h-11", glow: "#6c4ff0", dur: 10, xr: 12, yr: 16, spin: 18 },
  { variant: "prism", palette: ["#7dd3fc", "#3d2c8d", "#d946ef"], pos: "bottom-[4%] right-[32%] w-12 h-12", glow: "#3d2c8d", dur: 13, xr: 14, yr: 18, spin: 28 },
  { variant: "orb", palette: ["#a5f3fc", "#6c4ff0", "#f472b6"], pos: "top-[4%] right-[32%] w-10 h-10", glow: "#00e5c7", dur: 15, xr: 10, yr: 14, spin: 24 },
  { variant: "prism", palette: ["#00e5c7", "#4c1d95", "#a78bfa"], pos: "top-[62%] right-[2%] w-9 h-9", glow: "#6c4ff0", dur: 9, xr: 10, yr: 14, spin: 19 },
];

function FloatingShape({ variant, palette, pos, glow, dur, xr, yr, spin, reduced, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={
        reduced
          ? { opacity: 1, scale: 1 }
          : {
              opacity: 1,
              scale: 1,
              x: [0, xr, -xr * 0.6, 0],
              y: [0, -yr, yr * 0.5, 0],
            }
      }
      transition={
        reduced
          ? { duration: 0.6, delay }
          : {
              opacity: { duration: 0.6, delay },
              scale: { duration: 0.6, delay },
              x: { duration: dur, repeat: Infinity, ease: "easeInOut", delay },
              y: { duration: dur, repeat: Infinity, ease: "easeInOut", delay },
            }
      }
      className={`absolute ${pos} pointer-events-none`}
    >
      <motion.div
        className="w-full h-full"
        animate={reduced ? {} : { rotate: 360 }}
        transition={reduced ? {} : { duration: spin, repeat: Infinity, ease: "linear" }}
      >
        <GlassShape variant={variant} palette={palette} glow={glow} />
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-void"
    >
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(55% 45% at 20% 15%, rgba(61,44,141,0.4) 0%, rgba(11,15,46,0) 70%)",
        }}
      />
      <NetworkCanvas className="absolute inset-0 w-full h-full" />

      {!reduced && (
        <div className="hidden lg:block absolute top-0 right-0 w-[58%] h-full [mask-image:linear-gradient(to_right,transparent,black_22%,black_88%,transparent),linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] [mask-composite:intersect]">
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </div>
      )}

      <div className="absolute inset-0">
        {SHAPES.map((shape, i) => (
          <FloatingShape key={i} {...shape} reduced={reduced} delay={0.2 + i * 0.08} />
        ))}
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-3xl px-6 lg:px-16 pt-16"
      >
        <motion.div variants={item} className="flex items-center gap-3 mb-7">
          <span className="h-px w-8 bg-pulse" />
          <span className="font-mono text-xs tracking-[0.25em] uppercase text-pulse">
            AI Innovation · Software Engineering · Consulting
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="font-display text-5xl sm:text-6xl lg:text-[4.5rem] font-bold leading-[1.05] tracking-tight text-cloud"
        >
          Engineering the{" "}
          <span
            className="text-transparent"
            style={{ WebkitTextStroke: "1.5px #6c4ff0" }}
          >
            future
          </span>
          <span className="block bg-gradient-to-r from-electric via-[#9b7fff] to-pulse bg-clip-text text-transparent">
            of intelligent software.
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-7 max-w-xl text-lg text-cloud-dim leading-relaxed"
        >
          Atarion Solutions builds secure, accessible, and intelligent software —
          blending creativity with technical excellence across web, AI, and data.
        </motion.p>

        <motion.p
          variants={item}
          className="mt-5 font-mono text-xs tracking-[0.2em] uppercase text-pulse flex items-center gap-2"
        >
          <ArrowRight size={14} />
          We design it, build it, and scale it.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-col sm:flex-row items-start gap-5">
          <motion.a
            href="#contact"
            style={{ clipPath: "polygon(4% 0, 100% 0, 96% 100%, 0 100%)" }}
            animate={
              reduced
                ? {}
                : {
                    boxShadow: [
                      "0 0 10px 1px rgba(0,229,199,0.35), inset 0 0 12px rgba(0,229,199,0.08)",
                      "0 0 22px 4px rgba(0,229,199,0.6), inset 0 0 16px rgba(0,229,199,0.15)",
                      "0 0 10px 1px rgba(0,229,199,0.35), inset 0 0 12px rgba(0,229,199,0.08)",
                    ],
                  }
            }
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 0 34px 8px rgba(0,229,199,0.8), inset 0 0 20px rgba(0,229,199,0.2)",
            }}
            whileTap={{ scale: 0.96 }}
            className="w-full sm:w-auto px-9 py-3.5 text-sm font-bold text-white bg-void/60 border-2 border-pulse backdrop-blur-sm"
          >
            Let&rsquo;s Plan Your Business
          </motion.a>
          <a
            href="#services"
            style={{ clipPath: "polygon(4% 0, 100% 0, 96% 100%, 0 100%)" }}
            className="w-full sm:w-auto px-9 py-3.5 text-sm font-bold text-cloud bg-white/5 border border-electric/40 backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_28px_4px_rgba(108,79,240,0.4)] hover:border-electric hover:text-electric active:scale-95"
          >
            Build With Us
          </a>
        </motion.div>

        <motion.div variants={item} className="hidden sm:flex mt-14 items-center gap-3">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-cloud-dim">
            Scroll
          </span>
          <motion.span
            animate={reduced ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-pulse to-transparent"
          />
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-void to-transparent" />
    </section>
  );
}
