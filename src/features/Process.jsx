import { motion } from "framer-motion";
import { Search, PenTool, Code2, Plug, FlaskConical, Rocket } from "lucide-react";
import Reveal from "../components/Reveal";
import AmbientBlobs from "../components/AmbientBlobs";
import useReducedMotion from "../hooks/useReducedMotion";

const STEPS = [
  { n: "01", Icon: Search, title: "Structure", subtitle: "Organize and clean your data pipelines" },
  { n: "02", Icon: PenTool, title: "AI Strategy", subtitle: "Architecture Design" },
  { n: "03", Icon: Code2, title: "Model Development", subtitle: "Training & Building" },
  { n: "04", Icon: Plug, title: "Integration", subtitle: "Automation Setup" },
  { n: "05", Icon: FlaskConical, title: "Testing", subtitle: "Optimization & Validation" },
  { n: "06", Icon: Rocket, title: "Deployment", subtitle: "Continuous Improvement" },
];

const gridContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const stepVariant = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function Process() {
  const reduced = useReducedMotion();

  return (
    <section className="relative bg-cosmos py-28 lg:py-36 overflow-hidden">
      <AmbientBlobs opacity={0.16} />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold tracking-widest text-pulse uppercase mb-4">
            How We Work
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-cloud">
            Our AI Delivery Process
          </h2>
          <p className="mt-5 text-cloud-dim">
            A structured approach to delivering AI solutions that create real business impact.
          </p>
        </Reveal>

        <motion.div
          variants={gridContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="relative mt-20 grid grid-cols-2 gap-x-6 gap-y-14 sm:grid-cols-3 lg:flex lg:items-start lg:justify-between lg:gap-4"
        >
          {/* Connecting line behind the icons, lg+ only. Draws in from the
              left as the row scrolls into view, then keeps flowing to read
              as an active pipeline rather than a static rule. */}
          <motion.div
            initial={{ scaleX: 0, backgroundPositionX: "0px" }}
            whileInView={{
              scaleX: 1,
              backgroundPositionX: reduced ? "0px" : ["0px", "-16px"],
            }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              scaleX: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
              backgroundPositionX: reduced
                ? { duration: 0 }
                : { duration: 0.8, repeat: Infinity, ease: "linear", delay: 1.2 },
            }}
            style={{ originX: 0 }}
            className="hidden lg:block absolute top-9 left-0 right-0 h-px bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.25)_0_8px,transparent_8px_16px)]"
          />

          {STEPS.map(({ n, Icon, title, subtitle }) => (
            <motion.div
              key={n}
              variants={stepVariant}
              className="relative flex flex-col items-center text-center lg:flex-1"
            >
              <div className="relative">
                <motion.div
                  whileHover={{ y: -4, scale: 1.05 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 flex h-18 w-18 items-center justify-center rounded-2xl border border-white/10 bg-void shadow-[0_10px_30px_-10px_rgba(108,79,240,0.5)]"
                >
                  <Icon size={26} className="text-pulse" />
                </motion.div>
                <span className="absolute -top-2.5 -right-2.5 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-electric to-pulse text-[11px] font-bold text-white shadow-[0_0_12px_rgba(0,229,199,0.5)]">
                  {n}
                </span>
              </div>

              <h3 className="mt-5 font-display text-base font-semibold text-cloud">
                {title}
              </h3>
              <p className="mt-1.5 text-xs text-cloud-dim leading-relaxed max-w-[9rem]">
                {subtitle}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
