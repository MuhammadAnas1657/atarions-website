import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../components/Reveal";
import AmbientBlobs from "../components/AmbientBlobs";
import TiltCard from "../components/TiltCard";
import useReducedMotion from "../hooks/useReducedMotion";

const PROJECTS = [
  {
    title: "Fintech Insight Dashboard",
    tag: "Data Science",
    gradient: "from-electric/30 to-violet/40",
  },
  {
    title: "Predictive Maintenance Engine",
    tag: "Machine Learning",
    gradient: "from-pulse/25 to-electric/30",
  },
  {
    title: "Retail Commerce Platform",
    tag: "Web Development",
    gradient: "from-violet/35 to-pulse/20",
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

export default function Projects() {
  const reduced = useReducedMotion();

  return (
    <section id="projects" className="relative bg-void py-28 lg:py-36 overflow-hidden">
      <AmbientBlobs opacity={0.16} />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold tracking-widest text-pulse uppercase mb-4">
            Selected Work
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-cloud">
            Projects we&rsquo;re proud of
          </h2>
        </Reveal>

        <motion.div
          variants={gridContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-16 grid md:grid-cols-3 gap-6"
        >
          {PROJECTS.map(({ title, tag, gradient }, i) => (
            <motion.a href="#contact" key={title} variants={cardVariant} className="block h-full">
              <TiltCard className="group rounded-3xl border border-white/10 bg-cosmos overflow-hidden transition-shadow duration-300 hover:shadow-[0_20px_55px_-15px_rgba(0,229,199,0.35)] hover:border-pulse/30">
                <div className={`h-44 bg-gradient-to-br ${gradient} relative overflow-hidden`}>
                  <motion.div
                    animate={
                      reduced
                        ? {}
                        : { backgroundPosition: ["0px 0px", "32px 32px"] }
                    }
                    transition={{ duration: 7, repeat: Infinity, ease: "linear", delay: i * 0.4 }}
                    className="absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(255,255,255,0.25)_1px,transparent_1px)] [background-size:16px_16px]"
                  />
                </div>
                <div className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold tracking-widest text-pulse uppercase mb-1">{tag}</p>
                    <h3 className="font-display text-lg font-semibold text-cloud">{title}</h3>
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="text-cloud-dim transition-all duration-300 group-hover:text-pulse group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>
              </TiltCard>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
