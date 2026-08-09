import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Reveal from "../components/Reveal";
import AmbientBlobs from "../components/AmbientBlobs";
import useReducedMotion from "../hooks/useReducedMotion";

const POSTS = [
  {
    title: "Mastering the Art of Data Preprocessing",
    tag: "Data Preprocessing",
    gradient: "from-pulse/30 to-electric/35",
  },
  {
    title: "Convert RGB Image to Greyscale",
    tag: "Python",
    gradient: "from-electric/40 to-violet/50",
  },
];

const gridContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function Blog() {
  const reduced = useReducedMotion();

  return (
    <section id="blogs" className="relative bg-cosmos py-28 lg:py-36 overflow-hidden">
      <AmbientBlobs />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold tracking-widest text-pulse uppercase mb-4">
            From the Blog
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-cloud">
            Ideas worth building on
          </h2>
        </Reveal>

        <motion.div
          variants={gridContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-16 grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto"
        >
          {POSTS.map(({ title, tag, gradient }, i) => (
            <motion.a
              href="#"
              key={title}
              variants={cardVariant}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="group rounded-3xl border border-white/10 bg-void overflow-hidden block transition-shadow duration-300 hover:shadow-[0_20px_55px_-15px_rgba(108,79,240,0.4)] hover:border-electric/30"
            >
              <div className={`relative h-48 bg-gradient-to-br ${gradient} overflow-hidden`}>
                <motion.div
                  animate={
                    reduced
                      ? {}
                      : { backgroundPosition: ["0px 0px", "28px 28px"] }
                  }
                  transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
                  className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-110 [background-image:radial-gradient(rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:14px_14px]"
                />
              </div>
              <div className="p-6">
                <p className="text-xs font-semibold tracking-widest text-pulse uppercase mb-2">{tag}</p>
                <h3 className="font-display text-lg font-semibold text-cloud leading-snug">{title}</h3>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-cloud-dim transition-colors group-hover:text-pulse">
                  Read more
                  <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
