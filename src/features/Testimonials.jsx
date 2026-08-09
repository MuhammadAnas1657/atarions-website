import { useState } from "react";
import { motion } from "framer-motion";
import { Quote, ChevronDown } from "lucide-react";
import Reveal from "../components/Reveal";
import AmbientBlobs from "../components/AmbientBlobs";
import useReducedMotion from "../hooks/useReducedMotion";

const TESTIMONIALS = [
  {
    quote:
      "Excellent software development service — delivered a high-quality, scalable solution on time. The team was professional, responsive, and easy to work with.",
    name: "CEO, Atarion Solutions",
    role: "Real Estate",
  },
  {
    quote:
      "Their expertise helped us scale efficiently. Communication was clear and the process was smooth throughout.",
    name: "CTO, Tech Systems",
    role: "Finance",
  },
  {
    quote:
      "The dedication and technical proficiency were outstanding. We achieved more than expected in less time.",
    name: "Founder, Sky Digital",
    role: "E-Commerce",
  },
  {
    quote:
      "They understood our workflow quickly and shipped a solution that actually fit how our team operates day to day.",
    name: "COO, Northline Logistics",
    role: "Supply Chain",
  },
  {
    quote:
      "Reliable, fast, and transparent about progress the whole way through. Exactly what we needed for a tight deadline.",
    name: "Product Lead, Vantek",
    role: "SaaS",
  },
  {
    quote:
      "A great partner for AI work — they explained tradeoffs clearly and helped us pick the right approach, not just the fanciest one.",
    name: "Director, Meridian Health",
    role: "Healthcare",
  },
];

const INITIAL_COUNT = 3;

const gridContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function Testimonials() {
  const reduced = useReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? TESTIMONIALS : TESTIMONIALS.slice(0, INITIAL_COUNT);

  return (
    <section className="relative bg-void py-28 lg:py-36 overflow-hidden">
      <AmbientBlobs opacity={0.16} />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold tracking-widest text-pulse uppercase mb-4">
            Client Voices
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-cloud">
            Trusted by teams who ship
          </h2>
        </Reveal>

        <motion.div
          variants={gridContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-16 grid md:grid-cols-3 gap-6"
        >
          {visible.map(({ quote, name, role }, i) => (
            <motion.figure
              key={name}
              variants={cardVariant}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-3xl border border-white/10 bg-cosmos p-8 flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-[0_20px_55px_-15px_rgba(0,229,199,0.3)] hover:border-pulse/30"
            >
              <motion.div
                animate={
                  reduced
                    ? {}
                    : { rotate: [0, -8, 8, 0], scale: [1, 1.08, 1] }
                }
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
              >
                <Quote className="text-electric mb-5" size={28} strokeWidth={1.5} />
              </motion.div>
              <blockquote className="text-cloud-dim leading-relaxed flex-1">
                &ldquo;{quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 pt-6 border-t border-white/10">
                <p className="font-display font-semibold text-cloud">{name}</p>
                <p className="text-sm text-cloud-dim">{role}</p>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>

        {TESTIMONIALS.length > INITIAL_COUNT && (
          <div className="mt-12 flex justify-center">
            <motion.button
              onClick={() => setExpanded((e) => !e)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full border border-electric/40 bg-electric/10 px-6 py-3 text-sm font-semibold text-cloud transition-colors duration-300 hover:border-electric hover:bg-electric/20"
            >
              {expanded ? "Show Less" : "View More Reviews"}
              <motion.span
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={16} />
              </motion.span>
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}
