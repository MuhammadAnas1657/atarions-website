import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  BarChart3,
  Filter,
  BrainCircuit,
  Terminal,
  Layers,
} from "lucide-react";
import AmbientBlobs from "../components/AmbientBlobs";

const services = [
  {
    id: 1,
    name: "Web Development",
    description:
      "We build responsive, fast, and scalable websites tailored to your business needs using modern technologies like React, Next.js, and Tailwind CSS.",
    features: [
      "Responsive and mobile-friendly design",
      "SEO optimization for better visibility",
      "Fast and secure performance",
      "Integration with modern tech stacks like React and Next.js",
      "Custom UI/UX tailored to client needs",
    ],
    color: "cyan",
    Icon: Code2,
  },
  {
    id: 2,
    name: "Data Science",
    description:
      "Turn raw data into meaningful insights through advanced statistical analysis, data visualization, and predictive modeling.",
    features: [
      "Data-driven decision-making",
      "Advanced data visualization and storytelling",
      "Predictive modeling for future insights",
      "Automated reporting and dashboards",
      "Increased efficiency through smart data use",
    ],
    color: "purple",
    Icon: BarChart3,
  },
  {
    id: 3,
    name: "Data Preprocessing",
    description:
      "Clean, normalize, and structure your data to ensure it's ready for accurate analysis or machine learning workflows.",
    features: [
      "Improved model accuracy and reliability",
      "Automated handling of missing or noisy data",
      "Feature selection and scaling techniques",
      "Data transformation and normalization",
      "Enhanced training performance for ML models",
    ],
    color: "pink",
    Icon: Filter,
  },
  {
    id: 4,
    name: "Machine Learning",
    description:
      "Develop intelligent systems using supervised and unsupervised learning models that adapt and improve with your data.",
    features: [
      "Predictive analytics for business growth",
      "Real-time classification and recommendation systems",
      "Custom-trained models for specific domains",
      "Scalable model deployment and monitoring",
      "Automation of repetitive and complex tasks",
    ],
    color: "green",
    Icon: BrainCircuit,
  },
  {
    id: 5,
    name: "Python",
    description:
      "From scripting to full-stack development and automation, we leverage Python's flexibility to build robust, maintainable solutions.",
    features: [
      "Fast prototyping with readable syntax",
      "Wide range of libraries (Pandas, NumPy, TensorFlow, etc.)",
      "Cross-domain utility: web, AI, automation, scripting",
      "Strong community support and documentation",
      "Scalable from simple scripts to complex systems",
    ],
    color: "orange",
    Icon: Terminal,
  },
  {
    id: 6,
    name: "Software Development",
    description:
      "From scripting to full-stack development and automation, we aim to build robust, maintainable solutions.",
    features: [
      "End-to-end custom software solutions",
      "Agile development process",
      "Rigorous testing and quality assurance",
      "Ongoing support and maintenance",
    ],
    color: "blue",
    Icon: Layers,
  },
];

const COLORS = {
  cyan: {
    hex: "#22d3ee",
    text: "text-cyan-400",
    bg: "bg-cyan-400",
    gradient: "from-cyan-400 to-cyan-600",
    glow: "rgba(34,211,238,0.55)",
    border: "border-cyan-400/60",
  },
  purple: {
    hex: "#a855f7",
    text: "text-purple-400",
    bg: "bg-purple-400",
    gradient: "from-purple-400 to-purple-600",
    glow: "rgba(168,85,247,0.55)",
    border: "border-purple-400/60",
  },
  pink: {
    hex: "#ec4899",
    text: "text-pink-400",
    bg: "bg-pink-400",
    gradient: "from-pink-400 to-pink-600",
    glow: "rgba(236,72,153,0.55)",
    border: "border-pink-400/60",
  },
  green: {
    hex: "#22c55e",
    text: "text-green-400",
    bg: "bg-green-400",
    gradient: "from-green-400 to-green-600",
    glow: "rgba(34,197,94,0.55)",
    border: "border-green-400/60",
  },
  orange: {
    hex: "#f97316",
    text: "text-orange-400",
    bg: "bg-orange-400",
    gradient: "from-orange-400 to-orange-600",
    glow: "rgba(249,115,22,0.55)",
    border: "border-orange-400/60",
  },
  blue: {
    hex: "#3b82f6",
    text: "text-blue-400",
    bg: "bg-blue-400",
    gradient: "from-blue-400 to-blue-600",
    glow: "rgba(59,130,246,0.55)",
    border: "border-blue-400/60",
  },
};

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

const ORBIT_RADIUS = 42; // percentage of viewBox (0-100)
const NODE_RADIUS = 40; // percentage offset for node placement

function nodePosition(index, total) {
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
  const x = 50 + NODE_RADIUS * Math.cos(angle);
  const y = 50 + NODE_RADIUS * Math.sin(angle);
  return { x, y };
}

const wheelContainerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const wheelItemVariants = {
  hidden: { opacity: 0, scale: 0.7 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function EcosystemWheel() {
  const [activeId, setActiveId] = useState(services[0].id);
  const reducedMotion = useReducedMotion();
  const active = useMemo(
    () => services.find((s) => s.id === activeId) ?? services[0],
    [activeId]
  );
  const activeIndex = services.findIndex((s) => s.id === activeId);
  const activeColor = COLORS[active.color];

  return (
    <section className="relative min-h-screen w-full bg-[#0A0A12] text-white flex items-center py-16 px-6 overflow-hidden">
      <AmbientBlobs opacity={0.2} />
      <div className="relative max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
        {/* WHEEL */}
        <motion.div
          variants={wheelContainerVariants}
          initial="hidden"
          animate="show"
          className="relative mx-auto w-full max-w-[380px] sm:max-w-[430px] lg:max-w-[500px] aspect-square"
        >
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="orbitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                {services.map((s, i) => (
                  <stop
                    key={s.id}
                    offset={`${(i / (services.length - 1)) * 100}%`}
                    stopColor={COLORS[s.color].hex}
                  />
                ))}
              </linearGradient>
              <filter id="dotGlow" x="-200%" y="-200%" width="500%" height="500%">
                <feGaussianBlur stdDeviation="1.6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <motion.circle
              variants={wheelItemVariants}
              cx="50"
              cy="50"
              r={ORBIT_RADIUS}
              fill="none"
              stroke="url(#orbitGradient)"
              strokeWidth="0.4"
              strokeDasharray="2.2 2.2"
              strokeLinecap="round"
              opacity="0.7"
            />

            <path
              id="orbitMotionPath"
              d={`M 50 ${50 - ORBIT_RADIUS} A ${ORBIT_RADIUS} ${ORBIT_RADIUS} 0 1 1 49.99 ${
                50 - ORBIT_RADIUS
              } Z`}
              fill="none"
              stroke="none"
            />

            <circle r="1.7" fill={activeColor.hex} filter="url(#dotGlow)">
              {!reducedMotion && (
                <animateMotion dur="18s" repeatCount="indefinite" rotate="auto">
                  <mpath href="#orbitMotionPath" />
                </animateMotion>
              )}
            </circle>
          </svg>

          {/* Center hub */}
          <motion.div
            variants={wheelItemVariants}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] aspect-square rounded-full bg-[#12121c] border border-white/10 flex flex-col items-center justify-center shadow-[0_0_40px_rgba(0,0,0,0.6)]"
          >
            <span className="font-bold text-base sm:text-xl leading-none">OUR</span>
            <span className="text-[9px] sm:text-[11px] tracking-[0.2em] text-gray-500 mt-1">
              SERVICES
            </span>
          </motion.div>

          {/* Nodes */}
          {services.map((service, i) => {
            const { x, y } = nodePosition(i, services.length);
            const isActive = service.id === activeId;
            const color = COLORS[service.color];
            const Icon = service.Icon;
            return (
              <motion.button
                key={service.id}
                variants={wheelItemVariants}
                onClick={() => setActiveId(service.id)}
                aria-pressed={isActive}
                aria-label={service.name}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 group focus:outline-none"
                style={{ left: `${x}%`, top: `${y}%` }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative w-12 h-12 sm:w-14 sm:h-14">
                  {isActive && (
                    <motion.div
                      animate={
                        reducedMotion
                          ? {}
                          : { scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }
                      }
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 rounded-full"
                      style={{ background: color.glow }}
                    />
                  )}
                  <motion.div
                    animate={{
                      scale: isActive ? 1.35 : 1,
                      boxShadow: isActive
                        ? `0 0 0 4px ${color.glow}, 0 0 28px 6px ${color.glow}`
                        : "0 0 0 0 rgba(0,0,0,0)",
                      opacity: isActive ? 1 : 0.55,
                    }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br ${color.gradient} flex items-center justify-center ring-2 ring-white/10`}
                  >
                    <Icon
                      size={20}
                      strokeWidth={2}
                      className="text-white transition-transform duration-300 group-hover:scale-110"
                    />
                  </motion.div>
                </div>
                <span
                  className={`text-[11px] sm:text-xs font-medium text-center max-w-[80px] sm:max-w-[96px] leading-tight transition-colors duration-300 ${
                    isActive ? "text-white" : "text-gray-500"
                  }`}
                >
                  {service.name}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* DETAIL PANEL */}
        <div className="relative min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <p
                className={`font-mono text-xs tracking-[0.2em] uppercase mb-4 ${activeColor.text}`}
              >
                0{activeIndex + 1} · {active.name}
              </p>

              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-5">
                {active.name}
              </h2>

              <p className="text-gray-400 leading-relaxed max-w-lg mb-8">
                {active.description}
              </p>

              <h3 className="font-bold text-white mb-4">Why Choose Us?</h3>
              <ul className="space-y-3 mb-9">
                {active.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span
                      className={`mt-1.5 w-1.5 h-1.5 shrink-0 ${activeColor.bg} rounded-[2px]`}
                    />
                    <span className="text-sm text-gray-300 leading-relaxed">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`group inline-flex items-center gap-2 font-semibold ${activeColor.text}`}
              >
                Get Started
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
