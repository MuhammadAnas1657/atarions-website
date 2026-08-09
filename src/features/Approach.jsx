import { motion } from "framer-motion";
import Reveal from "../components/Reveal";
import useReducedMotion from "../hooks/useReducedMotion";

export default function Approach() {
  const reduced = useReducedMotion();

  return (
    <section id="about" className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-void py-14 sm:py-20">
      <div className="absolute top-1/3 -left-10 h-60 w-60 rounded-full bg-yellow-300/60 opacity-100 blur-[2px] sm:h-80 sm:w-80 md:h-97 md:w-97" />
      <div className="absolute top-1/9 right-20 h-60 w-60 rounded-full bg-electric/60 opacity-80 blur-[2px] sm:h-80 sm:w-80 md:h-80 md:w-80" />
      <div className="absolute right-1/8 bottom-5 h-40 w-40 rounded-full bg-pulse/50 opacity-100 blur-[2px] sm:h-50 sm:w-50 md:h-50 md:w-50" />

      <div className="relative z-20 mb-6 sm:mb-8 text-center">
        <p className="text-sm font-semibold tracking-widest text-pulse uppercase">
          Our Story
        </p>
      </div>

      <Reveal className="relative z-20 w-[92%] max-w-6xl">
        <div className="flex flex-col items-center justify-center rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 px-5 py-8 shadow-[0_0_30px_rgba(255,255,255,0.15)] backdrop-blur-2xl sm:px-10 sm:py-12 md:flex-row">
          <div className="mb-8 space-y-6 text-white md:mr-18 md:mb-0 md:w-2/3">
            <p className="text-justify text-sm leading-relaxed text-cloud-dim sm:text-base md:text-lg">
              What began as a small team of passionate innovators has evolved
              into a powerhouse of creativity and technology. Founded on the
              belief that technology should empower, not complicate, Atarion
              Solutions has grown by partnering with clients across
              industries — transforming challenges into intelligent, scalable
              outcomes.
            </p>

            <div>
              <p className="text-sm font-semibold tracking-widest text-pulse uppercase mb-3">
                Our Mission
              </p>
              <p className="text-justify text-sm leading-relaxed text-cloud-dim sm:text-base md:text-lg">
                To empower businesses with innovative, AI-driven digital
                solutions that inspire growth, enhance efficiency, and
                elevate user experiences.
              </p>
            </div>
          </div>

          <div className="relative flex w-full items-center justify-center md:w-1/3">
            <div className="absolute top-2 left-2 h-[260px] w-[88%] skew-x-14 rounded-md bg-pulse sm:h-[300px] sm:w-[90%] md:h-[350px]" />

            <div className="relative h-[260px] w-[88%] skew-x-14 overflow-visible rounded-md border-2 border-pulse bg-cosmos shadow-2xl sm:h-[300px] sm:w-[90%] md:h-[350px]">
              <CodeWindowMock reduced={reduced} />
              <StatCardMock reduced={reduced} />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function CodeWindowMock({ reduced }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="absolute bottom-0 left-0 h-[140px] w-full -skew-x-14 rounded-b-md bg-void/80 p-3 sm:h-[180px] md:h-[200px]"
    >
      <div className="flex items-center gap-1.5 mb-3">
        <span className="w-2 h-2 rounded-full bg-red-400/70" />
        <span className="w-2 h-2 rounded-full bg-yellow-300/70" />
        <span className="w-2 h-2 rounded-full bg-green-400/70" />
      </div>
      <motion.div
        animate={reduced ? {} : { opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="space-y-1.5"
      >
        <div className="h-2 w-3/4 rounded-full bg-electric/80" />
        <div className="h-2 w-1/2 rounded-full bg-pulse/80" />
        <div className="h-2 w-5/6 rounded-full bg-white/40" />
        <div className="h-2 w-2/3 rounded-full bg-electric/70" />
      </motion.div>
    </motion.div>
  );
}

function StatCardMock({ reduced }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay: 0.35 }}
      className="absolute -top-8 -right-4 h-[130px] w-[180px] sm:top-12 sm:-right-10 sm:h-[150px] sm:w-[220px] md:h-[170px] md:w-[250px]"
    >
      <motion.div
        animate={reduced ? {} : { y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="h-full w-full -skew-x-14 rounded-lg border-t-2 border-r-2 border-b-[6px] border-l-[6px] border-pulse bg-void p-3 shadow-2xl"
      >
        <p className="text-[10px] tracking-widest uppercase text-cloud-dim">Sprint Velocity</p>
        <p className="mt-1 font-display text-2xl font-bold text-pulse">+34%</p>
        <div className="mt-2 flex items-end gap-1 h-8">
          {[40, 65, 50, 80, 60, 95].map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-sm bg-gradient-to-t from-electric to-pulse"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
