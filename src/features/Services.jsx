import { motion } from "framer-motion";
import {
  Code2,
  BarChart3,
  Filter,
  BrainCircuit,
  Terminal,
  Layers,
} from "lucide-react";
import Reveal from "../components/Reveal";
import AmbientBlobs from "../components/AmbientBlobs";
import TiltCard from "../components/TiltCard";
import useReducedMotion from "../hooks/useReducedMotion";

const SERVICES = [
  {
    Icon: Code2,
    title: "Web Development",
    desc: "Fast, responsive, accessible web apps built on modern frameworks and clean architecture.",
  },
  {
    Icon: BrainCircuit,
    title: "AI / Machine Learning",
    desc: "Custom models and intelligent features that turn data into decisions and automation.",
  },
  {
    Icon: BarChart3,
    title: "Data Science",
    desc: "Analytics and insight pipelines that reveal what your data has been trying to tell you.",
  },
  {
    Icon: Filter,
    title: "Data Preprocessing",
    desc: "Clean, structured, model-ready datasets built on rigorous validation and pipelines.",
  },
  {
    Icon: Terminal,
    title: "Python Development",
    desc: "Robust Python systems — from automation scripts to production-grade backends.",
  },
  {
    Icon: Layers,
    title: "Software Development",
    desc: "End-to-end software engineering, from architecture to deployment and beyond.",
  },
];

const gridContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function Services() {
  const reduced = useReducedMotion();

  return (
    <section id="services" className="relative bg-cosmos py-28 lg:py-36 overflow-hidden">
      <AmbientBlobs />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold tracking-widest text-pulse uppercase mb-4">
            What We Do
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-cloud">
            Services built to move you forward
          </h2>
        </Reveal>

        <motion.div
          variants={gridContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SERVICES.map(({ Icon, title, desc }, i) => (
            <motion.div key={title} variants={cardVariant} className="h-full">
              <TiltCard className="group relative rounded-3xl border border-white/10 bg-void p-8 shadow-[0_0_0_0_rgba(0,0,0,0)] transition-shadow duration-300 hover:shadow-[0_20px_60px_-12px_rgba(108,79,240,0.45)] hover:border-electric/40 overflow-hidden">
                <motion.div
                  animate={
                    reduced
                      ? {}
                      : { opacity: [0.5, 1, 0.5], scale: [1, 1.06, 1] }
                  }
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                  className="absolute -top-6 -right-6 w-28 h-28 rounded-full blur-2xl bg-electric/25 pointer-events-none"
                />

                <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-electric/20 to-pulse/10 mb-6">
                  <motion.div
                    animate={
                      reduced
                        ? {}
                        : { y: [0, -3, 0] }
                    }
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                  >
                    <Icon
                      size={26}
                      strokeWidth={1.6}
                      className="text-pulse transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6"
                    />
                  </motion.div>
                </div>
                <h3 className="font-display text-xl font-semibold text-cloud mb-2">{title}</h3>
                <p className="text-cloud-dim text-sm leading-relaxed">{desc}</p>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
