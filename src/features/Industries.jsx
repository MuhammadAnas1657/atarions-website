import { motion } from "framer-motion";
import {
  ShoppingBag,
  HeartPulse,
  HardHat,
  Landmark,
  Cpu,
  Megaphone,
} from "lucide-react";
import Reveal from "../components/Reveal";
import AmbientBlobs from "../components/AmbientBlobs";
import TiltCard from "../components/TiltCard";

const INDUSTRIES = [
  {
    Icon: ShoppingBag,
    title: "Retail & E-commerce",
    desc: "Empowering businesses with digital solutions that enhance customer experience and drive online growth.",
  },
  {
    Icon: HeartPulse,
    title: "Healthcare",
    desc: "Delivering intelligent systems that improve patient care, streamline operations, and ensure data security.",
  },
  {
    Icon: HardHat,
    title: "Construction",
    desc: "Building smarter, tech-driven management tools that optimize projects from planning to completion.",
  },
  {
    Icon: Landmark,
    title: "Finance & Banking",
    desc: "Innovating secure and data-driven financial solutions that enhance efficiency and trust.",
  },
  {
    Icon: Cpu,
    title: "Technology",
    desc: "Innovating secure and data-driven technological solutions that enhance efficiency and trust.",
  },
  {
    Icon: Megaphone,
    title: "Marketing & Sales",
    desc: "Driving performance through automation, analytics, and AI to maximize conversions and engagement.",
  },
];

const gridContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function Industries() {
  return (
    <section className="relative bg-void py-28 lg:py-36 overflow-hidden">
      <AmbientBlobs opacity={0.16} />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold tracking-widest text-pulse uppercase mb-4">
            Who We Work With
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-cloud">
            Industries we serve
          </h2>
        </Reveal>

        <motion.div
          variants={gridContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {INDUSTRIES.map(({ Icon, title, desc }) => (
            <motion.div key={title} variants={cardVariant} className="h-full">
              <TiltCard className="rounded-3xl border border-white/10 bg-cosmos p-8 transition-shadow duration-300 hover:shadow-[0_20px_55px_-15px_rgba(108,79,240,0.4)] hover:border-electric/30">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-electric/20 to-pulse/10 mb-6">
                  <Icon size={26} strokeWidth={1.6} className="text-pulse" />
                </div>
                <h3 className="font-display text-lg font-semibold text-cloud mb-2">{title}</h3>
                <p className="text-cloud-dim text-sm leading-relaxed">{desc}</p>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
