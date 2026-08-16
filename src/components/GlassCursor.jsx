import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import useReducedMotion from "../hooks/useReducedMotion";

const INTERACTIVE_SELECTOR =
  "a, button, [role='button'], input, textarea, select, summary, .cursor-hover";

// Frosted-glass custom cursor: a blurred, bordered ring trails the pointer
// with spring easing while a small solid dot tracks it exactly, so aiming
// still feels precise. Disabled on touch devices and reduced-motion.
export default function GlassCursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const spring = { stiffness: 300, damping: 28, mass: 0.6 };
  const ringX = useSpring(x, spring);
  const ringY = useSpring(y, spring);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    setEnabled(fine && !reduced);
  }, [reduced]);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("glass-cursor-active");

    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const onLeave = () => setVisible(false);
    const onOver = (e) => {
      setHovering(!!e.target.closest(INTERACTIVE_SELECTOR));
    };

    window.addEventListener("pointermove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("pointerover", onOver);

    return () => {
      document.documentElement.classList.remove("glass-cursor-active");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("pointerover", onOver);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        style={{ left: ringX, top: ringY }}
        animate={{
          scale: hovering ? 2.1 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{ scale: { type: "spring", stiffness: 260, damping: 20 }, opacity: { duration: 0.2 } }}
        className="pointer-events-none fixed z-[999] -translate-x-1/2 -translate-y-1/2 size-9 rounded-full border border-white/30 bg-white/10 backdrop-blur-md shadow-[0_0_18px_rgba(0,229,199,0.35)]"
      />
      <motion.div
        aria-hidden
        style={{ left: x, top: y }}
        animate={{ opacity: visible ? (hovering ? 0 : 1) : 0 }}
        transition={{ duration: 0.15 }}
        className="pointer-events-none fixed z-[999] -translate-x-1/2 -translate-y-1/2 size-1.5 rounded-full bg-pulse shadow-[0_0_8px_var(--color-pulse)]"
      />
    </>
  );
}
