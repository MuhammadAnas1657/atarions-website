import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import useReducedMotion from "../hooks/useReducedMotion";

// Reusable 3D perspective tilt surface with a cursor-tracked glare sweep.
// Falls back to a static (untilted) card on touch devices and when the
// user prefers reduced motion.
export default function TiltCard({
  children,
  className = "",
  intensity = 10,
  glare = true,
  lift = 10,
}) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 160, damping: 18, mass: 0.6 };
  const rx = useSpring(useTransform(py, [0, 1], [intensity, -intensity]), spring);
  const ry = useSpring(useTransform(px, [0, 1], [-intensity, intensity]), spring);
  const gx = useSpring(useTransform(px, [0, 1], ["0%", "100%"]), spring);
  const gy = useSpring(useTransform(py, [0, 1], ["0%", "100%"]), spring);

  const onMove = (e) => {
    if (reduced || e.pointerType === "touch") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={reset} style={{ perspective: 1100 }} className="group/tilt relative h-full w-full">
      <motion.div
        style={reduced ? undefined : { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        whileHover={reduced ? undefined : { translateZ: lift }}
        transition={{ type: "spring", ...spring }}
        className={`relative h-full ${className}`}
      >
        {children}
        {glare && !reduced ? (
          <motion.span
            aria-hidden
            style={{
              background: `radial-gradient(220px circle at var(--gx) var(--gy), rgba(255,255,255,0.16), transparent 70%)`,
              "--gx": gx,
              "--gy": gy,
            }}
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/tilt:opacity-100"
          />
        ) : null}
      </motion.div>
    </div>
  );
}
