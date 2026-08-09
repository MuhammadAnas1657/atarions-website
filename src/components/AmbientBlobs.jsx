import { motion } from "framer-motion";
import useReducedMotion from "../hooks/useReducedMotion";

const DEFAULT_BLOBS = [
  { color: "#6c4ff0", size: 340, top: "-10%", left: "-6%", duration: 16 },
  { color: "#00e5c7", size: 300, top: "40%", right: "-8%", duration: 20 },
  { color: "#3d2c8d", size: 380, bottom: "-15%", left: "30%", duration: 18 },
];

export default function AmbientBlobs({ blobs = DEFAULT_BLOBS, opacity = 0.22 }) {
  const reduced = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          animate={
            reduced
              ? {}
              : {
                  x: [0, 20, -16, 0],
                  y: [0, -16, 14, 0],
                  scale: [1, 1.08, 0.94, 1],
                }
          }
          transition={{ duration: b.duration, repeat: Infinity, ease: "easeInOut" }}
          className="absolute rounded-full blur-[90px]"
          style={{
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            right: b.right,
            bottom: b.bottom,
            opacity,
            background: `radial-gradient(circle, ${b.color}, transparent 70%)`,
          }}
        />
      ))}
    </div>
  );
}
